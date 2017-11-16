import { combineReducers } from 'redux';
import current from './current';
import history from './history';
import currency from './currency';
import list from './list';
import global from './global';

const rootReducer = combineReducers({
  current,
  history,
  currency,
  list,
  global,
});

export default rootReducer;
