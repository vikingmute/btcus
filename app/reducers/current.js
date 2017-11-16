import { FETCHING_HISTORY, FETCHING_CURRENT, FETCHING_CURRENT_DETAIL } from '../actions/current';
import { fullfilled } from '../utils/helper';

const initialState = {
  selectedCoin: {},
  history: [],
  isLoading: false,
  isLoaded: false,
  selectedRange: 'day',
  prevPrice: ''
};
export default function currentReducer(state = initialState, action) {
  switch (action.type) {
    case FETCHING_HISTORY: {
      return Object.assign({}, state, { isLoading: true, isLoaded: false })
    }
    case fullfilled(FETCHING_HISTORY): {
      const prevPrice = action.data[0].close
      return Object.assign({}, state, { history: action.data, selectedRange: action.range, prevPrice })
    }
    case FETCHING_CURRENT_DETAIL: {
      return Object.assign({}, state, { isLoading: true, selectedCoin: action.coin })
    }
    case fullfilled(FETCHING_CURRENT_DETAIL): {
      return Object.assign({}, state, { isLoading: false, isLoaded: true })
    }
    default: {
      return state;
    }
  }
}
