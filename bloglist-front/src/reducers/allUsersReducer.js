const allUsersReducer = (state = [], action) => {
  console.log('userReducer runs')
  switch (action.type) {
  case 'INITIALIZE_USERS':
    console.log('action.data.users', action.data.users)
    return action.data.users;
  default:
    return state;
  }
};

export const initializeUsers = (users) => {
  console.log('initializeUsers runs with users', users)
  return {
    type: 'INITIALIZE_USERS',
    data: { users }
  }
}

export default allUsersReducer