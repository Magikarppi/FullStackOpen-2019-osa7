const userReducer = (state = null, action) => {
  console.log('userReducer runs')
  switch (action.type) {
  case 'SET_USER':
    console.log('action.data.user', action.data.user)
    return action.data.user;
  case 'CLEAR_USER':
    return null;
  default:
    return state;
  }
};

export const setUser = (user) => {
  console.log('setUser action creator runs with user:', user)
  return {
    type: 'SET_USER',
    data: { user }
  }
}

export const clearUser = () => {
  return {
    type: 'CLEAR_USER'
  }
}

export default userReducer