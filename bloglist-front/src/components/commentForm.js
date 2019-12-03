import React from 'react';
import PropTypes from 'prop-types'
import styled from 'styled-components'

const CommentSection = styled.div`
width: 200px;
background: #4935b0;
margin: 0 auto;
padding: 0.25em 1em;
border: 3px solid #8f8d64;
border-radius: 5px;
`

const Button = styled.button`
background: #fff870;
font-size: 0.9em;
margin: 1em;
padding: 0.25em 1em;
border: 1px solid #8f8d64;
border-radius: 3px;
`

const CommentForm = ({ handleSubmit, comment }) => {

  return (
    <CommentSection>
      <form onSubmit={handleSubmit}>
        <div>
          comment
          <input data-cy='comment_input'{...comment} />
        </div>
        <Button data-cy='submit' type="submit">Comment</Button>
      </form>
    </CommentSection>
  );
};

CommentForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  comment: PropTypes.object.isRequired
}

export default CommentForm;
