import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import {
  BrowserRouter as Router,
  Route, Link
} from 'react-router-dom'
import styled, { createGlobalStyle } from 'styled-components'

import loginService from './services/login';
import blogsService from './services/blogs';
import NotificationError from './components/NotificationError';
import NotificationSuccess from './components/NotificationSuccess';
import Blog from './components/Blog';
import CreateBlogForm from './components/createBlogForm';
import Togglable from './components/Toggleable';
import Users from './components/Users'
import User from './components/User'
import BlogMoreInfo from './components/BlogMoreInfo';

import { useField } from './hooks'
import { setErrorNotification } from './reducers/errorReducer'
import { setSuccessNotification } from './reducers/successReducer'
import { initializeBlogs, addBlog, updateBlog, deleteBlog } from './reducers/blogReducer'
import { setUser, clearUser } from './reducers/userReducer'
import { initializeUsers } from './reducers/allUsersReducer'

const StylishBlogForm = styled.div`
  width: 150px;
  margin: 0 auto;
`

const GlobalStyle = createGlobalStyle`
  body {
    min-height: 100%;
    background: linear-gradient(to top, black, #00025c);
    color: #e6e6eb;
    font-family: sans-serif;
  }
`

const Button = styled.button`
background: #fff870;
&:hover {
  background: #85015d
}
font-size: 0.9em;
margin: 1em;
padding: 0.25em 1em;
border: 2px solid #8f8d64;
border-radius: 3px;
`

const LoginDiv = styled.div`
  width: 150px;
  margin: 0 auto;
`

const H1 = styled.h1`
  margin-left: auto;
    margin-right: auto;
  display: inline-block;
  text-align: center;
  color: #ffadc6;
`

const App = (props) => {

  const name = useField('text');
  const pass = useField('password');
  const title = useField('text');
  const author = useField('text');
  const url = useField('text');

  const createBlogFormRef = React.createRef();
  const { initializeBlogs, initializeUsers, setUser } = props;

  useEffect(() => {
    console.log('useEffect Runs');
    const fetchBlogs = async () => {
      const blogs = await blogsService.getAll();
      console.log('blogs in fetchblogs', blogs);
      initializeBlogs(blogs);
    };
    fetchBlogs();

    const fetchUsers = async () => {
      const users = await blogsService.getUsers();
      console.log('users in fetchUsers', users);
      initializeUsers(users);
    };
    fetchUsers();
  }, [initializeBlogs, initializeUsers]);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser');
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      console.log('user in useEffect', user);
      setUser(user);
      blogsService.setToken(user.token);
    }
  }, [setUser]);

  const handleLogin = async (event) => {
    event.preventDefault();
    let newUser = null;
    try {
      try {
        const username = name.value;
        const password = pass.value;
        newUser = await loginService.login({
          username,
          password
        });
      } catch (exception) {
        console.log('exception in handlelogin', exception);
      }
      if (
        newUser.toString().toUpperCase() ===
        'ERROR: REQUEST FAILED WITH STATUS CODE 401'
      ) {
        // setErrorMessage('Wrong username or password');
        props.setErrorNotification('Wrong username or password');
        setTimeout(() => {
          props.setErrorNotification(null);
        }, 4000);
      }
      if (newUser.username) {
        window.localStorage.setItem(
          'loggedBlogAppUser',
          JSON.stringify(newUser)
        );
        blogsService.setToken(newUser.token);
        props.setUser(newUser);
        name.reset();
        pass.reset();
        // setUsername('');
        // setPassword('');
      }
    } catch (exception) {
      props.setErrorNotification('Wrong username or password');
      setTimeout(() => {
        props.setErrorNotification(null);
      }, 4000);
    }
  };

  const handleLogOut = () => {
    window.localStorage.clear();
    props.clearUser();
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log('handleSubmit runs and so does c.c.toggleBisibility()');
    createBlogFormRef.current.toggleVisibility();
    try {
      const newBlog = {
        title: title.value,
        author: author.value,
        url: url.value
      };

      let createdBlog = null;
      try {
        createdBlog = await blogsService.create(newBlog);
      } catch (error) {
        console.log('error', error);
      }
      props.addBlog(createdBlog);

      props.setSuccessNotification(`${createdBlog.title} was added!`);
      author.reset();
      title.reset();
      url.reset();
      // setAuthor('');
      // setUrl('');
      // setTitle('');
      setTimeout(() => {
        props.setSuccessNotification(null);
      }, 4000);
    } catch (exception) {
      props.setErrorNotification('Blog creation failed');
      setTimeout(() => {
        props.setErrorNotification(null);
      }, 4000);
    }
  };

  const handleUpdate = async (blog) => {
    const updateBlog = {
      ...blog,
      likes: blog.likes + 1
    };

    try {
      const likedBlog = await blogsService.update(updateBlog);
      props.updateBlog(likedBlog);

    } catch (exception) {
      console.log(exception);
    }
  };

  const handleRemove = async (deleteBlog) => {
    if (
      window.confirm(
        `Do you want to delete blog: ${deleteBlog.title} by ${deleteBlog.author}?`
      )
    ) {
      try {
        await blogsService.remove(deleteBlog);
        props.deleteBlog(deleteBlog);
      } catch (exception) {
        console.log(exception);
      }
    }
  };

  const removeReset = (obj) => {
    // eslint-disable-next-line no-unused-vars
    const { reset, ...noReset } = obj;
    return noReset;
  };

  const sort = (blogs) => {
    const sortedBlogs = [...blogs].sort((a, b) => b.likes - a.likes);
    return sortedBlogs;
  };

  const userById = (id) => props.allUsers.find((user) => user.id === id);
  const blogById = (id) => props.blogs.find((blog) => blog.id === id);

  const linkStyle = {
    color: 'white',
    margin: '5px',
    padding: '3px',
    border: '2px solid black',
    borderRadius: '3px',
    display: 'inline-block',
    background: '#f20049'
  }

  if (props.user === null || props.user === undefined) {
    return (
      <React.Fragment>
        <GlobalStyle />
        <LoginDiv>
          <h2>Log in to application</h2>
          <NotificationError />
          <form onSubmit={handleLogin}>
            <div>
              username
              <input data-cy="username_input" {...removeReset(name)} />
            </div>
            <div>
              password
              <input data-cy="password_input" {...removeReset(pass)} />
            </div>
            <Button type="submit" data-cy="submit">login</Button>
          </form>
        </LoginDiv>
      </React.Fragment>
    );
  }

  return (
    <React.Fragment>
      <GlobalStyle />
      <div>
        <H1>Blogs</H1>
        <NotificationError />
        <NotificationSuccess />
        <h4>{props.user.name} logged in</h4>
        <Button onClick={handleLogOut}>Log Out</Button>
        <Router>
          <div>
            <div>
              <Link style={linkStyle} to="/">
                Blogs
              </Link>
              <Link data-cy="users_link" style={linkStyle} to="/users">
                Users
              </Link>
            </div>
            <Route
              exact
              path="/"
              render={() => (
                <div>
                  <StylishBlogForm>
                    <Togglable buttonLabel="new blog" ref={createBlogFormRef} >
                      <CreateBlogForm
                        handleSubmit={handleSubmit}
                        title={removeReset(title)}
                        author={removeReset(author)}
                        url={removeReset(url)}
                      />
                    </Togglable>
                  </StylishBlogForm>
                  {props.blogs
                    ? sort(props.blogs).map((blog) => (
                      <Blog
                        key={blog.id}
                        blog={blog}
                        handleUpdate={handleUpdate}
                        handleRemove={handleRemove}
                        user={props.user}
                      />
                    ))
                    : null}
                </div>
              )}
            />
            <Route
              exact
              path="/users"
              render={() => <Users allUsers={props.allUsers} />}
            />
            <Route
              exact
              path="/users/:id"
              render={({ match }) => <User user={userById(match.params.id)} />}
            />
            <Route
              exact
              path="/blogs/:id"
              render={({ match }) => (
                <BlogMoreInfo
                  blog={blogById(match.params.id)}
                  handleRemove={handleRemove}
                  handleUpdate={handleUpdate}
                  user={props.user}
                />
              )}
            />
          </div>
        </Router>
      </div>
    </React.Fragment>
  );
};
// export default App;

const mapStateToProps = (state) => {
  console.log('state in mapstatetoprops', state);
  return {
    blogs: state.blogs,
    user: state.user,
    allUsers: state.allUsers
  };
};

const mapDispatchToProps =  {
  setSuccessNotification,
  setErrorNotification,
  initializeBlogs,
  initializeUsers,
  addBlog,
  updateBlog,
  deleteBlog,
  setUser,
  clearUser
}

export default connect(mapStateToProps, mapDispatchToProps)(App)