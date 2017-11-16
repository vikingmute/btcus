import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid, linearGradient } from 'recharts'

import Tab from '../components/Tab'
import Loader from '../components/Loader'
import * as actionCreators from '../actions/current'

class Detail extends React.Component {
  constructor(props) {
    super(props)
    this.onChangeRange = this.onChangeRange.bind(this)
  }
  componentDidMount() {
    const { fetchHistoryPrice, fetchDetailData } = this.props.actions
    const { selectedCurrency } = this.props.state.global
    fetchDetailData(selectedCurrency.currency, this.getSelectedCoin())
  }
  getSelectedCoin() {
    const { coinList } = this.props.state.global
    const { match } = this.props
    return coinList.filter(coin => coin.currency ===  match.params.coin)[0]    
  }
  getPriceChange( current, prev, isPrecent = false ) {
    return !isPrecent ? (current - prev).toFixed(2) : ((current - prev) / prev * 100).toFixed(2)
  }
  onChangeRange(item) {
    const { fetchDetailData } = this.props.actions
    const { selectedCurrency } = this.props.state.global
    fetchDetailData(selectedCurrency.currency, this.getSelectedCoin(), item.value)
  }
  render() {
    const { match, state } = this.props
    let chart = ''
    if (state.current.isLoaded) {
      const { selectedCoin, prevPrice, selectedRange } = state.current
      const { selectedCurrency } = state.global
      const { currency, country } = selectedCoin
      const formatData = state.current.history.map(item => {
        return {
          ...item,
          time: new Date(item.time * 1000).toISOString().slice(0, -5)
        }
      })
      const currentData = state.list.data[currency]
      const changePrice = this.getPriceChange(currentData.PRICE, prevPrice)
      const changePricePercent =  this.getPriceChange(currentData.PRICE, prevPrice, true)
      const changeClass = (changePricePercent > 0 ) ? 'change-percent up-arrow' : 'change-percent down-arrow'
      const image = require(`../imgs/${currency}.png`)
      chart = (
        <div className="detail-container">
          <div className="detail-data">
            <div className="left-info">
              <img src={image} />
              <div className="inner-left">
                <h3>{currency}</h3>
                <p>{country}</p>
              </div>
            </div>
            <div className="right-info">
              <h3>{currentData.PRICE.toFixed(2)} {selectedCurrency.currency}</h3>
              <p className={changeClass}>{changePricePercent} %</p>
            </div>
          </div>
          <AreaChart width={600} height={300} data={formatData}>
            <defs>
              <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#0094FF" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#4E74FF" stopOpacity={0.5}/>
              </linearGradient>
            </defs>
            <Area type="monotone" dataKey="close" stroke="#4E74FF" fill='#4E74FF' fillOpacity={1} fill="url(#colorUv)" />
            <XAxis dataKey="time" />
            <YAxis type="number" domain={['dataMin', 'dataMax']} />
            <CartesianGrid strokeDasharray="3 3" />
            <Tooltip />
          </AreaChart>
          <ul>
            <li className={changeClass}><h4>1 {selectedRange} Change</h4> {changePrice} {selectedCurrency.currency}</li>
            <li><h4>Volume 24 Hours</h4> {currentData.VOLUME24HOUR.toFixed(2)} {currency}</li>
            <li><h4>Market Cap</h4> {currentData.MKTCAP.toFixed(2)} {selectedCurrency.currency}</li>
            <li><h4>Supply</h4> {currentData.SUPPLY.toFixed(2)} {selectedCurrency.currency}</li>
          </ul>
        </div>
      )
    } else {
      chart = <Loader />
    }
    const tabItems = [
      {text: 'One Day', value: 'day'},
      {text: 'One Week', value: 'week'},
      {text: 'One Month', value: 'month'},
    ]
    return (
      <div className="detail-component">
        <Tab items={tabItems} onChange={this.onChangeRange} />
        {chart}
      </div>
    )
  }
}

export default withRouter(connect(
  state => ({ state }),
  dispatch => ({
    actions: bindActionCreators(actionCreators, dispatch)
  })
)(Detail));