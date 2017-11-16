import { FETCHING_LIST, fetchListData } from '../actions/list'
import { FETCHING_CURRENT } from '../actions/current'
import { fullfilled, rejected } from '../utils/helper';

const initialState = {
  isFetching: false,
  isLoaded: false,
  data: {},
}
export default function ListReducer(state = initialState, action) {
  switch(action.type) {
    case FETCHING_LIST: {
      return Object.assign({}, state, { isFetching: true })
    }
    case fullfilled(FETCHING_LIST): {
      return Object.assign({}, state, { isFetching: false, isLoaded: true, data: action.data })
    }
    case rejected(FETCHING_LIST): {

    }
    case FETCHING_CURRENT: {
      return Object.assign({}, state, { isFetching: true })
    }
    case fullfilled(FETCHING_CURRENT): {
      const newData = { ...state.data, [ action.coin ]: { coin: action.coin, ...action.data }}
      return Object.assign({}, state, { isFetching: false, isLoaded: true, data: newData })
    }
    default: {
      return state;
    }
  }
}