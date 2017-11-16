import React, { PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import Modal from '../components/Modal'
import Selector from '../components/Selector'
import SelectorList from '../components/SelectorList'
import * as actionCreators from '../actions/global'

class Config extends React.Component {
  constructor(props) {
    super(props)
    this.changeCurreny = this.changeCurreny.bind(this)
    this.changeCoinList = this.changeCoinList.bind(this)
    this.deleteCoin = this.deleteCoin.bind(this)
    this.saveChanges = this.saveChanges.bind(this)
    this.cancelChanges = this.cancelChanges.bind(this)
    this.state = {
      selectedCurrency: this.props.global.selectedCurrency,
      selectedCoins: this.props.global.selectedCoins
    }
  }
  componentDidMount() {
    this.props.actions.fetchAllCurrencies()
  }
  changeCurreny(item) {
    this.setState({
      selectedCurrency: item
    })
  }
  changeCoinList(item) {
    const { selectedCoins } = this.state
    if (item.node) { delete item.node }
    const exsited = selectedCoins.some(coin => coin.currency === item.currency)
    if (!exsited) {
      this.setState({
        selectedCoins: [...selectedCoins, item]
      })
    }
  }
  deleteCoin(item) {
    const { selectedCoins } = this.state
    const afterDeletedList = selectedCoins.filter(coin => coin.currency !== item.currency)
    this.setState({
      selectedCoins: afterDeletedList
    })
  }
  saveChanges() {
    const { history } = this.props
    const { selectedCoins, selectedCurrency } = this.state
    this.props.actions.saveGlobalSettings(selectedCoins, selectedCurrency)
    history.push('/')
  }
  cancelChanges() {
    const { history } = this.props
    history.push('/')
  }
  render() {
    const currenciesProps = {
      list: this.props.global.currencyList,
      changeCurreny: this.changeCurreny,
      featureList: ['CNY', 'USD', 'JPY', 'EUR', 'CAD']
    }
    const coinsProps = {
      list: this.props.global.coinList,
      changeCurreny: this.changeCoinList,
      featureList: ['BTC', 'ETH', 'XRP', 'LTC', 'DASH'],
      text: 'BTC'
    }
    const currencySelectorProp = {
      currency: this.state.selectedCurrency,
      tagName: 'div'
    }
    const coinSelectorProp = {
      createBtn: true,
      tagName: 'li'
    }

    return (
      <div className="config-component">
        <h2>Configuration</h2>
        <div className="config-area">
          <label>Currency:</label>
          <Selector {...currencySelectorProp}>
            <Modal {...currenciesProps} />
          </Selector>
        </div>
        <div className="config-area">
          <label>Asset List:</label>
          <SelectorList list={this.state.selectedCoins} onDelete={this.deleteCoin}>
            <Selector {...coinSelectorProp}>
              <Modal {...coinsProps} />
            </Selector>
          </SelectorList>     
        </div>
        <div className="save-area">
          <button className="save" onClick={this.saveChanges}>Save</button>
          <button className="cancel" onClick={this.cancelChanges}>Cancel</button>
        </div>
      </div>
    )
  }
}
Config.propTypes = {
  global: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired
}
export default withRouter(connect(
  state => ({ global: state.global }),
  dispatch => ({
    actions: bindActionCreators(actionCreators, dispatch)
  })
)(Config));
