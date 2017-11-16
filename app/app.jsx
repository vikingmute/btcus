import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunkMiddleware from 'redux-thunk';

import Main from './containers/Main';
import Detail from './containers/Detail';
import Config from './containers/Config';
import rootReducer from './reducers';

import './scss/app.scss';
const img = require('./imgs/settings.png');

const store = applyMiddleware(thunkMiddleware)(createStore)(rootReducer);

const container = document.body.appendChild(
  document.createElement('div')
);

render(
  <Provider store={store}>
    <Router>
      <div className="main">
        <header>
          <h2><Link to="/">BTC1.us</Link></h2>
          <Link to="/configuration">
            <span className="gear"><img src={img} alt="configuration" /></span>
          </Link>
        </header>
        <section className="container">
          <Route exact path="/" component={Main} />
          <Route path="/detail/:coin" component={Detail} />
          <Route path="/configuration" component={Config} />
        </section>
        <footer>
          <ul>
            <li>Hand coded by <a href="https://github.com/vikingmute/btcus">vikingmute</a></li>
            <li>
              Powered by <a href="https://www.cryptocompare.com">Cryptocompare</a>
            </li>
            <li>
              Icons by <a href="http://www.flaticon.com/packs/countrys-flags">Freepik</a> & <a href="https://github.com/cjdowner/cryptocurrency-icons">cryptocurrency-icons</a>
            </li>
          </ul>
        </footer>
      </div>
    </Router>
  </Provider>,
  container
);
