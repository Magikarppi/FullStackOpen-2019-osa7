import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import {
  BrowserRouter as Router,
  Route, Link, Redirect, withRouter
} from 'react-router-dom'

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

const App = (props) => {
  // ************TARKISTA JA KORJAA FULL-OSA-7 ROUTED-ANECDOTES A HREFIT LINK TO *************************

  // const [username, setUsername] = useState('');
  // const [password, setPassword] = useState('');
  // const [user, setUser] = useState(null);
  // const [blogs, setBlogs] = useState([]);
  // const [title, setTitle] = useState('');
  // const [author, setAuthor] = useState('');
  // const [url, setUrl] = useState('');
  const name = useField('text');
  const pass = useField('password');
  const title = useField('text');
  const author = useField('text');
  const url = useField('text');
  // const [errorMessage, setErrorMessage] = useState('');
  // const [successMessage, setSuccessMessage] = useState('');

  const createBlogFormRef = React.createRef();
  const { initializeBlogs, initializeUsers, setUser } = props;

  useEffect(() => {
    console.log('useEffect Runs');
    const fetchBlogs = async () => {
      const blogs = await blogsService.getAll();
      console.log('blogs in fetchblogs', blogs);
      initializeBlogs(blogs);
      // setBlogs(blogs.sort((a, b) => b.likes - a.likes));
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
      // const updatedBlogs = [...props.blogs, createdBlog];
      // setBlogs(updatedBlogs.sort((a, b) => b.likes - a.likes));
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
      // const filteredBlogs = props.blogs.filter(blog => blog.id !== likedBlog.id);
      // const updatedBlogs = [...filteredBlogs, likedBlog];
      // setBlogs(updatedBlogs.sort((a, b) => b.likes - a.likes));
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
        // setBlogs(props.blogs.filter(blog => blog.id !== deleteBlog.id))
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

  const padding = { padding: 5 };

  console.log('createBlogFormRef.current', createBlogFormRef.current);

  // const Home = ({ title, author, url, handleSubmit }) => {

  //   console.log('Home component renders')
  //   return (
  //     <div>
  //       <Togglable buttonLabel="new blog" ref={createBlogFormRef}>
  //         <CreateBlogForm
  //           handleSubmit={handleSubmit}
  //           title={removeReset(title)}
  //           author={removeReset(author)}
  //           url={removeReset(url)}
  //         />
  //       </Togglable>
  //       {props.blogs
  //         ? sort(props.blogs).map((blog) => (
  //           <Blog
  //             key={blog.id}
  //             blog={blog}
  //             handleUpdate={handleUpdate}
  //             handleRemove={handleRemove}
  //             user={props.user}
  //           />
  //         ))
  //         : null}
  //     </div>
  //   );
  // };

  console.log('props.blogs', props.blogs);
  console.log('props.user', props.user);

  if (props.user === null || props.user === undefined) {
    return (
      <div className="loginFormView">
        <h2>Log in to application</h2>
        <NotificationError />
        <form onSubmit={handleLogin}>
          <div>
            username
            <input {...removeReset(name)} />
          </div>
          <div>
            password
            <input {...removeReset(pass)} />
          </div>
          <button type="submit">login</button>
        </form>
      </div>
    );
  }

  return (
    <div className="loggedInView">
      <h2>Blogs</h2>
      <NotificationError />
      <NotificationSuccess />
      <h4>{props.user.name} logged in</h4>
      <button onClick={handleLogOut}>Log Out</button>
      <Router>
        <div>
          <div>
            <Link style={padding} to="/">
              Blogs
            </Link>
            <Link style={padding} to="/users">
              users
            </Link>
          </div>
          <Route
            exact
            path="/"
            render={() => (
              <div>
                <Togglable buttonLabel="new blog" ref={createBlogFormRef}>
                  <CreateBlogForm
                    handleSubmit={handleSubmit}
                    title={removeReset(title)}
                    author={removeReset(author)}
                    url={removeReset(url)}
                  />
                </Togglable>
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