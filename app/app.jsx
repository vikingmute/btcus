import React from 'react';
import { render } from 'react-dom';
import { bindActionCreators, createStore, applyMiddleware } from 'redux';
import { connect, Provider } from 'react-redux';

import Modal from './Modal';
import rootReducer from 'reducers';
import * as actionCreators from 'actions';

const store = createStore(rootReducer);

const App = connect(
  state => ({ state }),
  dispatch => ({
    actions: bindActionCreators(actionCreators, dispatch),
  })
)(Modal);


const container = document.body.appendChild(
  document.createElement('div')
);

render(
  <Provider store={store}>
    <App />
  </Provider>,
  container
);
