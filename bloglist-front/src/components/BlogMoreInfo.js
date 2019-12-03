import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Redirect,
} from 'react-router-dom';
import styled from 'styled-components'

import { connect } from 'react-redux';
import CommentForm from './commentForm'
import blogsService from '../services/blogs'
import { useField } from '../hooks'
import { commentBlog } from '../reducers/blogReducer'

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
const Page = styled.div`
  width: 100%;
  margin: 0 auto;
  text-align: center;
`

const H2 = styled.h2`
  display: inline-block;
  text-align: center;
  color: #ffadc6;
`
const H3 = styled.h3`
  display: inline-block;
  text-align: center;
  color: #ffadc6;
`

const StyledLink = styled.div`
  color: white;
    &:link {
      color: white;
    }
    &:visited {
      color: green;
    }
`

const BlogMoreInfo = ({ blog, handleRemove, handleUpdate, user, commentBlog }) => {
  const createRandomId = () => {
    const id = Math.floor(Math.random()*1000000)
    return id
  }

  const comment = useField('text');

  const removeReset = (obj) => {
    // eslint-disable-next-line no-unused-vars
    const { reset, ...noReset } = obj;
    return noReset;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
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
      comment.reset();
    } catch (exception) {
      console.log('error', exception)
    }
  }

  // if logged in user === blog poster show delete btn, else dont show
  console.log('user:', user);
  console.log('blog:', blog);
  if (blog) {
    if (blog.user.id === user.id || blog.user === user.id) {
      return (
        <Page>
          <H2>
            {blog.title} - {blog.author}
          </H2>
          <a href={blog.url}> {blog.url} </a>
          <p>Likes: {blog.likes}</p>
          <Button data-cy="like_btn" onClick={() => handleUpdate(blog)}>Like</Button>
          <p>added by {user.name}</p>
          <Button onClick={() => handleRemove(blog)}>Delete</Button>
          <div>
            <CommentForm comment={removeReset(comment)} handleSubmit={handleSubmit} />
          </div>
          <div>
            <ul>
              {blog.comments.map(c => <li key={createRandomId()}>{c}</li>)}
            </ul>
          </div>
        </Page>
      );
    } else {
      return (
        <Page>
          <H2>
            {blog.title} - {blog.author}
          </H2>
          <a href={blog.url}> <StyledLink>{blog.url}</StyledLink> </a>
          <p>Likes: {blog.likes}</p>
          <Button data-cy="like_btn" onClick={() => handleUpdate(blog)}>Like</Button>
          <p>added by {blog.user.name}</p>
          <div>
            <CommentForm comment={removeReset(comment)} handleSubmit={handleSubmit} />
          </div>
          <div>
            <H3>Comments</H3>
            <ul>
              {blog.comments.map(c => <li key={c}>{c}</li>)}
            </ul>
          </div>
        </Page>
      );
    }
  } else {
    return (
      <Page>
        <Router>
          <div>
            <Route render={() => <Redirect to="/" />} />
          </div>
        </Router>
      </Page>
    );
  }
};

const mapDispatchToProps =  {
  commentBlog
}

export default connect(null, mapDispatchToProps)(BlogMoreInfo)