import fetch from 'isomorphic-fetch';

const CURRENT_API_URL = '/api/current';
const HISTORY_API_URL = '/api/history';
const CURRENCY_API_URL = '/api/currency';
const DAY_API_URL = '/api/day';
const LIST_API_URL = '/api/full';

function defaultHeaders(customHeader = null) {
  const headers = new Headers();
  headers.append('accept', 'application/json');
  headers.append('content-type', 'application/json');
  if (customHeader) {
    Object.keys(customHeader).forEach((key) => {
      headers.append(key, customHeader[key]);
    });
  }
  return headers;
}

function getJSON(url, customHeader = null, opts = {}) {
  const headers = defaultHeaders(customHeader);
  const defaultOpts = { method: 'GET', headers, mode: 'cors' };
  const options = Object.assign(defaultOpts, opts);
  return fetch(url, options).then(res => res.json());
}
export function postJSON(url, data = null, customHeader = null, opts = {}) {
  const headers = defaultHeaders(customHeader);
  const defaultOpts = { method: 'POST', headers, mode: 'cors' };
  if (data) {
    defaultOpts.body = JSON.stringify(data);
  }
  const options = Object.assign(defaultOpts, opts);
  return fetch(url, options).then(res => res.json());
}
export function getListPrice(currency = 'CNY', coins = ['BTC']) {
  const coinList = coins.join('.');
  return getJSON(`${LIST_API_URL}/${coinList}-${currency}`);
}
export function getCurrentPrice(currency = 'USD', coin = 'BTC') {
  return getJSON(`${CURRENT_API_URL}/${coin}-${currency}`);
}
export function getDayPrice(currency = 'USD', coin = 'BTC', date = '2017-01-01') {
  return getJSON(`${DAY_API_URL}/${coin}-${currency}/${date}`)
}
export function getHistoryData(currency = 'USD', coin = 'BTC', range = 'day') {
  return getJSON(`${HISTORY_API_URL}/${coin}-${currency}/${range}`);
}

export function getCurrencyData() {
  return getJSON(CURRENCY_API_URL);
}
