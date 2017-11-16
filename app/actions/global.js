import * as Async from '../utils/async';
import { fullfilled, rejected } from '../utils/helper';

export const FETCHING_ALL_CURRENCIES = 'FETCHING_ALL_CURRENCIES'
export const SAVE_GLOABL_SETTINGS = 'SAVE_GLOABL_SETTINGS'

export function fetchAllCurrencies() {
  return (dispatch) => {
    dispatch({ type: FETCHING_ALL_CURRENCIES })
    Async.getCurrencyData().then(data => {
      window.localStorage.setItem('allCurrencies', JSON.stringify(data))
      dispatch({ type: fullfilled(FETCHING_ALL_CURRENCIES), data })
    }, err => {
      dispatch({ type: rejected(FETCHING_ALL_CURRENCIES), err })
    })
  }
}

export function saveGlobalSettings(selectedCoins, selectedCurrency) {
  return { type: SAVE_GLOABL_SETTINGS, selectedCoins, selectedCurrency }
}
