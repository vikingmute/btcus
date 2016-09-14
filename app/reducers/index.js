import { combineReducers } from 'redux';
import current from './current';
import history from './history';

const rootReducer = combineReducers({
  current,
  history
});

export default rootReducer;
