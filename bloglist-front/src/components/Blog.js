import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Blog = ({ blog }) => {
  const StylishBlog = styled.div`
    width: 550px;
    height: 30px;
    text-align: center;
    margin: 0 auto;
    padding-top: 10;
    padding-left: 2;
    border: 2px solid #8f8d64;
    border-width: 1;
    margin-bottom: 5;
    display: block;
    background: #85015d;
    &:hover {
      background: #f20049;
    }
    color: white;
  `;
  const StylishLink = styled.div`
    color: white;
    &:link {
      color: white;
    }
    &:visited {
      color: green;
    }
  `;

  return (
    <StylishBlog>
      <Link to={`/blogs/${blog.id}`}>
        <StylishLink>
          {blog.title} - {blog.author}
        </StylishLink>
      </Link>
    </StylishBlog>
  );
};

export default Blog;
