
import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { Provider } from 'react-redux'
// import { createStore } from 'redux'
// import notificationReducer from './reducers/notificationReducer'
import store from './store'



const render = () => {
  ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
    document.getElementById('root')
  );
};
// ReactDOM.render(<App />, document.getElementById('root'))

render()
store.subscribe(render)