const successReducer = (state = null, action) => {
  console.log('notificationReducer runs')
  switch (action.type) {
  case 'SET_SUCCESS':
    console.log('action.data.message', action.data.message)
    return action.data.message;
  case 'CLEAR_NOTIFICATION':
    return null;
  default:
    return state;
  }
};

export const setSuccessNotification = (message) => {
  console.log('setSuccessNoti action creator runs with message:', message)
  return {
    type: 'SET_SUCCESS',
    data: { message }
  }
}

export const clearNotification = () => {
  return {
    type: 'CLEAR_NOTIFICATION'
  }
}

export default successReducer