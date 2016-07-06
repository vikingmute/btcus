import {SELECT_TYPEA, SELECT_TYPEB} from '../actions';

const initialState = {
  version: 'A'
}

export default function version(state = initialState, action) {
  switch (action.type) {
    case SELECT_TYPEA:
      return Object.assign({}, state, {version: 'A'})
    case SELECT_TYPEB:
      return Object.assign({}, state, {version: 'B'})
    default:
      return state;
  }
}
