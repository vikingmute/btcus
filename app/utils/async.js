import fetch from 'isomorphic-fetch';

const CURRENT_API_URL = '/api/current/';
const HISTORY_API_URL = '/api/history/';

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

export function getLastestPrice(currency = 'USD') {
  return getJSON(`${CURRENT_API_URL}${currency}`);
}

export function getHistoryData(currency = 'USD') {
  return getJSON(`${HISTORY_API_URL}${currency}`);
}
