import * as Async from '../utils/async';

export const CHANGE_VALUE = 'CHANGE_VALUE';
export const CHANGE_CURRENCY = 'CHANGE_CURRENCY';
export const CHANGE_TOTAL = 'CHANGE_TOTAL';

export function changeValue(val) {
  return { type: CHANGE_VALUE, val };
}


export function changeTotal(val) {
  return { type: CHANGE_TOTAL, val };
}

export const FETCH_LASTEST = 'FETCH_LASTEST';

export function fetchLastest(currency = 'CNY') {
  return {
    type: FETCH_LASTEST,
    payload: Async.getLastestPrice(currency)
  };
}
export const TOGGLE_MODAL = 'TOGGLE_MODAL';
export function toggleModal() {
  return {
    type: TOGGLE_MODAL
  };
}
export const FETCH_HISTORY = 'FETCH_HISTORY';

export function fetchHistory(currency = 'CNY') {
  return {
    type: FETCH_HISTORY,
    payload: Async.getHistoryData(currency)
  };
}

export function changeCurreny(val) {
  return (dispatch) =>
    dispatch({
      type: CHANGE_CURRENCY,
      payload: Promise.all([
        dispatch(fetchLastest(val)),
        dispatch(fetchHistory(val))
      ])
    });
}

export const SHOW_TOOLTIP = 'SHOW_TOOLTIP';
export function showTooltip(d, e) {
  const tipData = {
    top: `${e.clientY + 15}px`,
    left: `${e.clientX - 50}px`,
    y: d.y,
    x: d.x
  };
  return {
    type: SHOW_TOOLTIP,
    tipData
  };
}

export const HIDE_TOOLTIP = 'HIDE_TOOLTIP';


export function hideTooltip() {
  return {
    type: HIDE_TOOLTIP
  };
}
