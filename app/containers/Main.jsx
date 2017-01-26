import React, { PropTypes } from 'react';
import BitInput from '../components/BitInput';
import Output from '../components/Output';
import ToolTip from '../components/ToolTip';
import Loader from '../components/Loader';
import { LineChart } from 'react-easy-chart';

const propTypes = {
  actions: PropTypes.object.isRequired,
  state: PropTypes.object.isRequired
};
class Main extends React.Component {
  componentDidMount() {
    const { fetchLastest, fetchHistory, fetchCurrency, getLocalCurrency } = this.props.actions;
    const { currency } = this.props.state.current;
    //  first time fetch both current and history data and all the currency data
    fetchLastest(currency);
    fetchHistory(currency);
    // check if local stroage is there
    if (localStorage.getItem('currencyList') === null) {
      fetchCurrency();
    } else {
      const currencyData = JSON.parse(localStorage.getItem('currencyList'));
      getLocalCurrency(currencyData);
    }

    setInterval(() => {
      const newcurrency = this.props.state.current.currency;
      fetchLastest(newcurrency);
    }, 60000);
  }

  render() {

    const { changeCurreny, changeValue, changeTotal } = this.props.actions;
    const { toggleModal, showTooltip, hideTooltip } = this.props.actions;
    const { currency, amount, total, arrow, modal } = this.props.state.current;
    const { data, loaded, tooltip, tipData } = this.props.state.history;
    const { list } = this.props.state.currency;
    const currentLoading = this.props.state.current.loading;
    const historyLoading = this.props.state.history.loading;
    const historyData = [data.map(item => {
      return { x: item.date.substr(5), y: item.price };
    }).splice(10)];
    const outputProp = {
      total,
      changeTotal,
      currency,
      changeCurreny,
      modal,
      toggleModal,
      currencyList: list
    };
    const lineChartProp = {
      xType: 'text',
      axes: true,
      grid: true,
      dataPoints: true,
      verticalGrid: true,
      width: 650,
      height: 300,
      mouseOverHandler: showTooltip,
      mouseOutHandler: hideTooltip,
      lineColors: ['#4E74FF'],
      data: historyData
    };

    let loader = '';
    if (currentLoading || historyLoading) {
      loader = <Loader />;
    }
    let lineChart = '';
    if (loaded) {
      lineChart = <LineChart {...lineChartProp} />;
    }
    let showTool = '';
    if (tooltip) {
      showTool = (<ToolTip top={tipData.top} left={tipData.left}>
        <div className="arrow_box">
          <h4>{tipData.x}</h4>
          <p>{tipData.y} <span className="currency">{currency}</span></p>
        </div>
      </ToolTip>);
    }
    let rateArrow = `arrow arrow-${arrow}`;
    return (
      <div className="main">
        <header>
          <h2><a href="http://yiju.us">1BTC.us</a></h2>
          {loader}
        </header>
        <section className="container">
          <div className="intro">
            <span>1BTC.us</span> is a simple bitcoin calculator, support <b>167</b> currencies, update every minute.
            <br /> Click the <b>right flag</b> to change current currency.
          </div>
          <div className="rate-area">
            <BitInput amount={amount} changeValue={changeValue} />
            <span className="equal"> = </span>
            <Output {...outputProp} />
            <div className={rateArrow}></div>
          </div>
          <h3 className="chart-title">Bitcoin price in last 20 days</h3>
          <div className="chart-area">
            {lineChart}
            {showTool}
          </div>
        </section>
        <footer>
          <ul>
            <li>Hand coded by <a href="https://github.com/vikingmute/btcus">vikingmute</a></li>
            <li>
                Powered by <a href="http://www.coindesk.com/price/">CoinDesk</a> &
                Icons by <a href="http://www.flaticon.com/packs/countrys-flags">Freepik</a>
            </li>
          </ul>
        </footer>
      </div>
    );
  }
}


Main.propTypes = propTypes;

export default Main;
