const errorReducer = (state = null, action) => {
  console.log('notificationReducer runs')
  switch (action.type) {
  case 'SET_ERROR':
    return action.data.message;
  case 'CLEAR_NOTIFICATION':
    return null;
  default:
    return state;
  }
};


export const setErrorNotification = (message) => {
  return {
    type: 'SET_ERROR',
    data: { message }
  }
}

export const clearNotification = () => {
  return {
    type: 'CLEAR_NOTIFICATION'
  }
}

export default errorReducer