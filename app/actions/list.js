import * as Async from '../utils/async';
import { fullfilled, rejected } from '../utils/helper';
export const FETCHING_LIST = 'FETCHING_LIST';

export function fetchListData(currency = 'CNY', coins = ['BTC']) {
  return (dispatch) => {
    dispatch({ type: FETCHING_LIST})
    Async.getListPrice(currency, coins).then((data) => {
      const formatData = {}
      Object.keys(data).forEach((item) => {
        formatData[item] =  { coin: item, currency, ...data[item][currency] }
      })
      dispatch({type: fullfilled(FETCHING_LIST), data: formatData});
    }, (err) => {
      dispatch({type: rejected(FETCHING_LIST), err});
    })
  }
}