import React, { useState } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,
  withRouter
} from 'react-router-dom';
import { connect } from 'react-redux';
import CommentForm from './commentForm'
import blogsService from '../services/blogs'
import { useField } from '../hooks'
import { commentBlog } from '../reducers/blogReducer'

const BlogMoreInfo = ({ blog, handleRemove, handleUpdate, user, commentBlog }) => {
  // ***************** TSEKKAA COMMENTTIEN LI KEY**********************'
  console.log('blog in BlogMoreInfo', blog)
  const comment = useField('text');
  console.log('comment usefield in blog more infro', comment)

  const removeReset = (obj) => {
    // eslint-disable-next-line no-unused-vars
    const { reset, ...noReset } = obj;
    return noReset;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      // const newComment = {
      //   comment: comment.value
      // };
      // const blogCopy = { ... blog }
      const blogToComment = {
        ...blog,
        comments: blog.comments.concat(comment.value)
      }
      console.log('blog after push', blog)
      console.log('blogToComment in handlesubmit', blogToComment)

      let commentedBlog = null;
      try {
        commentedBlog = await blogsService.update(blogToComment);
        console.log('commentedBlog', commentedBlog)
      } catch (error) {
        console.log('error', error);
      }
      commentBlog(commentedBlog);
      // const updatedBlogs = [...props.blogs, createdBlog];
      // setBlogs(updatedBlogs.sort((a, b) => b.likes - a.likes));
      // props.setSuccessNotification(`${createdBlog.title} was added!`);
      comment.reset();
      // setAuthor('');
      // setUrl('');
      // setTitle('');
      // setTimeout(() => {
      //   props.setSuccessNotification(null);
      // }, 4000);
    } catch (exception) {
      // props.setErrorNotification('Blog creation failed');
      // setTimeout(() => {
      //   props.setErrorNotification(null);
      // }, 4000);
      console.log('error', exception)
    }
  }

  // if logged in user === blog poster show delete btn, else dont show
  console.log('user:', user);
  console.log('blog:', blog);
  if (blog) {
    if (blog.user.id === user.id || blog.user === user.id) {
      return (
        <div>
          <h2>
            {blog.title} - {blog.author}
          </h2>
          <a href={blog.url}> {blog.url} </a>
          <p>Likes: {blog.likes}</p>
          <button onClick={() => handleUpdate(blog)}>Like</button>
          <p>added by {user.name}</p>
          <button onClick={() => handleRemove(blog)}>Delete</button>
          <div>
            <CommentForm comment={removeReset(comment)} handleSubmit={handleSubmit} />
          </div>
          <div>
            <ul>
              {blog.comments.map(c => <li key={c}>{c}</li>)}
            </ul>
          </div>
        </div>
      );
    } else {
      return (
        <div>
          <h2>
            {blog.title} - {blog.author}
          </h2>
          <a href={blog.url}> {blog.url} </a>
          <p>Likes: {blog.likes}</p>
          <button onClick={() => handleUpdate(blog)}>Like</button>
          <p>added by {blog.user.name}</p>
          <div>
            <CommentForm comment={removeReset(comment)} handleSubmit={handleSubmit} />
          </div>
          <div>
            <ul>
              {blog.comments.map(c => <li key={c}>{c}</li>)}
            </ul>
          </div>
        </div>
      );
    }
  } else {
    return (
      <div>
        <Router>
          <div>
            <Route render={() => <Redirect to="/" />} />
          </div>
        </Router>
      </div>
    );
  }
};

// export default BlogMoreInfo;

// const mapStateToProps = (state) => {
//   console.log('state in mapstatetoprops', state);
//   return {
//     blogs: state.blogs,
//     user: state.user,
//     allUsers: state.allUsers
//   };
// };

const mapDispatchToProps =  {
  commentBlog
}

export default connect(null, mapDispatchToProps)(BlogMoreInfo)