import React from 'react'
import { connect } from 'react-redux';
import '../index.css'

const NotificationSuccess = (props) => {

  return props.successNotification ? (
    <div className="success">{props.successNotification}</div>
  ) : null;
};

const mapStateToProps = (state) => {
  console.log('state in mapstatetoprops', state);
  return {
    successNotification: state.successNotification
  };
};

export default connect(mapStateToProps)(NotificationSuccess);
