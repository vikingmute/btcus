import { CHANGE_VALUE, CHANGE_CURRENCY,
          CHANGE_TOTAL, FETCH_LASTEST, TOGGLE_MODAL } from '../actions';

const initialState = {
  currency: 'CNY',
  amount: 1,
  rate: 0,
  total: 0,
  loading: false,
  previous: 0,
  arrow: null,
  modal: false
};
function changeTitle(data) {
  const title = `${data.rate} ${data.currency} | BTC.us`;
  document.title = title;
}
function generateData(payload, state) {
  const current = payload.current;
  const previousValue = state.rate;
  const rate = current.rate_float.toFixed(2);
  const total = state.amount * rate;
  const data = {
    currency: current.code,
    rate,
    total,
    loading: false
  };
  if (previousValue) {
    if (current.rate_float > previousValue) {
      data.arrow = 'up';
    } else {
      data.arrow = 'down';
    }
    data.previous = previousValue;
  }
  if (state.currency !== data.currency) {
    data.arrow = null;
  }
  return data;
}
export default function currentReducer(state = initialState, action) {
  switch (action.type) {
    case CHANGE_VALUE: {
      const totalMoney = (action.val * state.rate).toFixed(2);
      return Object.assign({}, state, { amount: action.val, total: totalMoney });
    }
    case CHANGE_TOTAL: {
      const amount = (action.val / state.rate).toFixed(2);
      return Object.assign({}, state, { total: action.val, amount });
    }
    case TOGGLE_MODAL: {
      return Object.assign({}, state, { modal: !state.modal });
    }

    case `${CHANGE_CURRENCY}_FULFILLED`: {
      return Object.assign({}, state, { previous: 0, arrow: null });
    }
    case `${FETCH_LASTEST}_PENDING`: {
      return Object.assign({}, state, { loading: true, modal: false });
    }
    case `${FETCH_LASTEST}_FULFILLED`: {
      const data = generateData(action.payload, state);
      changeTitle(data);
      return Object.assign({}, state, data);
    }
    default: {
      return state;
    }
  }
}
