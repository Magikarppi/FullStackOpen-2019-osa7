import React from 'react'
import { connect } from 'react-redux';
import '../index.css'

const NotificationError = (props) => {
  console.log('props.errornotification', props.errorNotification);
  return props.errorNotification ? (
    <div className="error">{props.errorNotification}</div>
  ) : null;
};

const mapStateToProps = (state) => {
  console.log('state', state)
  return {
    errorNotification: state.errorNotification
  };
};

export default connect(mapStateToProps)(NotificationError);
