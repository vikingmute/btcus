import { combineReducers } from 'redux';
import current from './current';
import history from './history';
import currency from './currency';

const rootReducer = combineReducers({
  current,
  history,
  currency
});

export default rootReducer;
