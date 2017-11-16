import * as Async from '../utils/async';
import { fullfilled, rejected } from '../utils/helper';

export const CHANGE_VALUE = 'CHANGE_VALUE';
export const CHANGE_CURRENCY = 'CHANGE_CURRENCY';
export const CHANGE_TOTAL = 'CHANGE_TOTAL';
export const CHANGE_COIN = 'CHANGE_COIN';

export const FETCHING_CURRENT = 'FETCHING_CURRENT';
export const FETCHING_HISTORY = 'FETCHING_HISTORY';
export const FETCHING_CURRENT_DETAIL = 'FETCHING_CURRENT_DETAIL';

// fetch the lastest current coin details
export function fetchCurrentPrice(currency = 'CNY', coin = 'BTC') {
  return (dispatch) => {
    dispatch({ type: FETCHING_CURRENT, coin })
    return Async.getCurrentPrice(currency, coin).then((data) => {
      dispatch({ type: fullfilled(FETCHING_CURRENT), data, coin });
    }, (err) => {
      dispatch({ type: rejected(FETCHING_CURRENT), err });
    })
  }
}

// fetch the history data based on given coin and currency
export function fetchHistoryPrice(currency = 'CNY', coin = 'BTC', range = 'day') {
  return (dispatch) => {
    dispatch({ type: FETCHING_HISTORY })
    return Async.getHistoryData(currency, coin, range).then(data => {
      dispatch({ type: fullfilled(FETCHING_HISTORY), data, range })
    }, (err) => {
      dispatch({ type: rejected(FETCHING_HISTORY), err })
    })
  }
}

// fetch both current coin price and history price for current page
export function fetchDetailData(currency = 'CNY',
                                coin = { currency: 'BTC', country: 'Bitcoin' },
                                range = 'day') {
  return (dispatch) => {
    dispatch({ type: FETCHING_CURRENT_DETAIL, coin })
    Promise.all([
      dispatch(fetchCurrentPrice(currency, coin.currency)),
      dispatch(fetchHistoryPrice(currency, coin.currency, range))
    ]).then(() => {
      dispatch({ type: fullfilled(FETCHING_CURRENT_DETAIL) })
    }).catch(err => {
      dispatch({ type: rejected(FETCHING_CURRENT_DETAIL), err })
    })
  }
}
// fetch the specific history day price for compare
export const FETCHING_DAY = 'FETCHING_DAY';
export const FETCHING_DAY_FULLFILLED = 'FETCHING_DAY_FULLFILLED';
export const FETCHING_DAY_REJECTED = 'FETCHING_DAY_REJECTED';

export function fetchDayPrice(currency = 'CNY', coin = 'BTC', date = '2017-01-01') {
  return (dispatch) => {
    dispatch({ type: FETCHING_DAY });
    Async.getDayPrice(currency, coin, date).then((data) => {
      dispatch({ type: FETCHING_DAY_FULLFILLED, data });
    }, (err) => {
      dispatch({ type: FETCHING_DAY_REJECTED, err });
    });
  }
}
