import React from 'react';
import { render } from 'react-dom';
import { bindActionCreators, createStore, applyMiddleware } from 'redux';
import { connect, Provider } from 'react-redux';
import thunkMiddleware from 'redux-thunk';
import promiseMiddleware from 'redux-promise-middleware';

import Main from './containers/Main';
import rootReducer from './reducers';
import * as actionCreators from './actions';

import './scss/app.scss';

const store = applyMiddleware(
  thunkMiddleware,
  promiseMiddleware()
)(createStore)(rootReducer);

const App = connect(
  state => ({ state }),
  dispatch => ({
    actions: bindActionCreators(actionCreators, dispatch)
  })
)(Main);


const container = document.body.appendChild(
  document.createElement('div')
);

render(
  <Provider store={store}>
    <App />
  </Provider>,
  container
);
