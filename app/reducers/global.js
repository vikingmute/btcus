import { FETCHING_ALL_CURRENCIES, SAVE_GLOABL_SETTINGS } from '../actions/global';
import { fullfilled } from '../utils/helper';
import { coinList } from '../utils/coinList'
function getLocalStorage(key) {
  const data = window.localStorage.getItem(key)
  return data ? JSON.parse(data) : ''
}
function setLocalStorage(key, item) {
  window.localStorage.setItem(key, JSON.stringify(item))
}
const initialState = {
  isFetching: false,
  isLoaded: false,
  coinList,
  currencyList: getLocalStorage('allCurrencies') || [],
  selectedCoins: getLocalStorage('selectedCoins') || coinList.slice(0, 5),
  selectedCurrency: getLocalStorage('selectedCurrency') || { currency: 'CNY', country: 'China' }
}

export default function globalReducer(state = initialState, action) {
  switch (action.type) {
    case FETCHING_ALL_CURRENCIES: {
      return Object.assign({}, state, { isFetching: true })
    }
    case fullfilled(FETCHING_ALL_CURRENCIES): {
      const newState = { currencyList: action.data, isFetching: false, isLoaded: true }
      return Object.assign({ }, state, newState)
    }
    case SAVE_GLOABL_SETTINGS: {
      setLocalStorage('selectedCoins', action.selectedCoins)
      setLocalStorage('selectedCurrency', action.selectedCurrency)
      const newState = {
        selectedCoins: action.selectedCoins,
        selectedCurrency: action.selectedCurrency
      }
      return Object.assign({}, state, newState)
    }
    default: {
      return state;
    }
  }
}
