import { createStore, combineReducers } from 'redux';

import successReducer from './reducers/successReducer'
import errorReducer from './reducers/errorReducer'
import blogReducer from './reducers/blogReducer'
import userReducer from './reducers/userReducer'
import allUsersReducer from './reducers/allUsersReducer'

const reducer = combineReducers({
  successNotification: successReducer,
  errorNotification: errorReducer,
  blogs: blogReducer,
  user: userReducer,
  allUsers: allUsersReducer
});

const store = createStore(reducer);

store.subscribe(() => console.log('store.subscribe: store.getState():',store.getState()))
store.subscribe(() => console.log(store.combineReducers))

export default store;
