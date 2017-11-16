import React, { PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import Loader from '../components/Loader'
import List from '../components/List'
import * as actionCreators from '../actions/list'

const propTypes = {
  actions: PropTypes.object.isRequired,
  state: PropTypes.object.isRequired
};
class Main extends React.Component {
  componentDidMount() {
    const { fetchListData } = this.props.actions
    const { selectedCoins, selectedCurrency } = this.props.state.global
    const keyNames = selectedCoins.map(item => item.currency)
    fetchListData(selectedCurrency.currency, keyNames)
  }

  render() {
    const { list, global } = this.props.state
    const formatListData = Object.keys(list.data).map(item => {
      const currentItem = list.data[item]
      return {
        key: item,
        coin: currentItem.coin,
        currency: global.selectedCurrency.currency,
        price: currentItem.PRICE.toFixed(2),
        changePercent: currentItem.CHANGEPCT24HOUR.toFixed(2)
      }
    })
    const content = list.isFetching ? <Loader /> : <List items={formatListData} />
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
