import React, { PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import Loader from '../components/Loader'
import List from '../components/List'
import { fetchListData } from '../actions/list'
import { fetchExchange } from '../actions/global'

const actionCreators = {
  fetchListData,
  fetchExchange
}
const propTypes = {
  actions: PropTypes.object.isRequired,
  state: PropTypes.object.isRequired
};
class Main extends React.Component {
  componentDidMount() {
    const { fetchListData, fetchExchange } = this.props.actions
    const { selectedCoins, exchangeRate, selectedCurrency } = this.props.state.global
    console.log(selectedCurrency)
    console.log(exchangeRate)
    const keyNames = selectedCoins.map(item => item.currency)
    const oneDayTimestamp = 24 * 60 * 60 * 1000
    if (selectedCurrency.currency !== 'USD' && (new Date().getTime() - exchangeRate.timestamp > oneDayTimestamp)) {
      fetchExchange(selectedCurrency.currency)
    }
    fetchListData('USD', keyNames)
  }

  render() {
    const { list, global } = this.props.state
    const formatListData = Object.keys(list.data).map(item => {
      const currentItem = list.data[item]
      return {
        key: item,
        coin: currentItem.coin,
        currency: global.selectedCurrency.currency,
        price: (currentItem.PRICE * 1 * global.exchangeRate.rate).toFixed(2),
        changePercent: (currentItem.CHANGEPCT24HOUR * 1).toFixed(2)
      }
    })
    const exchangeDiv = (global.selectedCurrency.currency !== 'USD') ? (
      <div className="exchange-rate">
        1 USD = {global.exchangeRate.rate} {global.selectedCurrency.currency}
      </div>
    ) : ''
    const content = (list.isFetching || global.isFetching) ? 
      <Loader /> :
      (<div className="content-inside"><List items={formatListData} />{exchangeDiv}</div>)
    return (
      <div className="main-container">
        <div className="intro">
          <span>BTC1.us</span> 
             - simple live & latest cryptocurrency prices, support <b>167</b> currencies and <b>20</b> cryptocurrencies.
        </div>
        {content}
      </div>
    );
  }
}


Main.propTypes = propTypes;

export default withRouter(connect(
  state => ({ state }),
  dispatch => ({
    actions: bindActionCreators(actionCreators, dispatch)
  })
)(Main));
