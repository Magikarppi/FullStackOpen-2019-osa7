import React from 'react';
import PropTypes from 'prop-types'

const CommentForm = ({ handleSubmit, comment }) => {
  console.log('CommentForm renders')

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          comment
          <input {...comment} />
        </div>
        <button type="submit">Comment</button>
      </form>
    </div>
  );
};

CommentForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  comment: PropTypes.object.isRequired
}

export default CommentForm;
