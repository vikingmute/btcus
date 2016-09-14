import { FETCH_HISTORY, SHOW_TOOLTIP, HIDE_TOOLTIP } from '../actions';

const initialState = {
  data: [],
  time: null,
  loading: false,
  loaded: false,
  tooltip: false,
  tipData: {}
};

function parseDataFormat(obj) {
  return Object.keys(obj).map((item) => {
    const lbj = { date: item, price: obj[item].toFixed(2) };
    return lbj;
  });
}

export default function historyReducer(state = initialState, action) {
  switch (action.type) {
    case `${FETCH_HISTORY}_PENDING`: {
      return Object.assign({}, state, { loading: true, loaded: false });
    }
    case `${FETCH_HISTORY}_FULFILLED`: {
      const { history, time } = action.payload;
      const newData = {
        data: parseDataFormat(history),
        time: time.updatedISO,
        loading: false,
        loaded: true
      };
      return Object.assign({}, state, newData);
    }
    case SHOW_TOOLTIP: {
      const tipData = action.tipData;
      return Object.assign({}, state, { tooltip: true, tipData });
    }
    case HIDE_TOOLTIP: {
      return Object.assign({}, state, { tooltip: false });
    }
    default: {
      return state;
    }
  }
}
