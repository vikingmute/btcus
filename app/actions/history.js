import * as Async from '../utils/async';

export const FETCHING_HISTORY = 'FETCHING_CURRENT';
export const FETCHING_HISTORY_FULLFILLED = 'FETCHING_CURRENT_FULLFILLED';
export const FETCHING_HISTORY_REJECTED = 'FETCHING_CURRENT_REJECTED';

// fetch the lastest current coin details
export function fetchHistoryPrice(currency = 'CNY', coin = 'BTC', range = 'week') {
  return (dispatch) => {
    dispatch({ type: FETCHING_HISTORY });
    Async.getCurrentPrice(coin, currency).then((data) => {
      dispatch({type: FETCHING_HISTORY_FULLFILLED, data});
    }, (err) => {
      dispatch({type: FETCHING_HISTORY_REJECTED, err});
    })
  }
}