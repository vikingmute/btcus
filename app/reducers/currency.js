import { FETCH_CURRENCY } from '../actions';

const initialState = {
  list: []
};

export default function currencyReducer(state = initialState, action) {
  switch (action.type) {
    case `${FETCH_CURRENCY}_FULFILLED`: {
      // set the data to localStorage
      window.localStorage.setItem('currencyList', JSON.stringify(action.payload));
      return Object.assign({}, state, { list: action.payload });
    }
    case 'GET_LOCAL_CURRENCY': {
      return Object.assign({}, state, { list: action.data });
    }
    default: {
      return state;
    }
  }
}
