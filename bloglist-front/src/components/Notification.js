import React from 'react'
import { connect } from 'react-redux';

const Notification = (props) => {
  return props.notification ? (
    <div>{props.notification}</div>
  ) : null;
}

const mapStateToProps = (state) => {
  return {
    notification: state.notification
  };
};

export default connect(mapStateToProps)(Notification)