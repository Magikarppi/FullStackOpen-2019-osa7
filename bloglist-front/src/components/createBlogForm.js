import React from 'react';
import PropTypes from 'prop-types'
import styled from 'styled-components'

const StylishButton = styled.button`
    background: #fff870;
&:hover {
  background: #85015d
}
font-size: 0.9em;
margin: 1em;
padding: 0.25em 1em;
border: 2px solid #8f8d64;
border-radius: 3px;
text-align: center;
`

const CreateBlogForm = ({ handleSubmit, title, url, author }) => {

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          title
          <input data-cy="title_input" {...title} />
        </div>
        <div>
          author
          <input data-cy="author_input" {...author} />
        </div>
        <div>
          url
          <input data-cy="url_input" {...url} />
        </div>
        <StylishButton type="submit" data-cy="submit">Create</StylishButton>
      </form>
    </div>
  );
};

CreateBlogForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  title: PropTypes.object.isRequired,
  url: PropTypes.object.isRequired,
  author: PropTypes.object.isRequired
}

export default CreateBlogForm;
