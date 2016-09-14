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
    const { fetchLastest, fetchHistory } = this.props.actions;
    const { currency } = this.props.state.current;
    //  first time fetch both current and history data
    fetchLastest(currency);
    fetchHistory(currency);
    setInterval(() => {
      const newcurrency = this.props.state.current.currency;
      fetchLastest(newcurrency);
    }, 60000);
  }

  render() {
    const flagGroup = [
      { currency: 'CNY' },
      { currency: 'USD' },
      { currency: 'JPY' },
      { currency: 'GBP' },
      { currency: 'CHF' },
      { currency: 'EUR' }
    ];

    const { changeCurreny, changeValue, changeTotal } = this.props.actions;
    const { toggleModal, showTooltip, hideTooltip } = this.props.actions;
    const { currency, amount, total, arrow, modal } = this.props.state.current;
    const { data, loaded, tooltip, tipData } = this.props.state.history;
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
      flagGroup,
      modal,
      toggleModal
    };
    const lineChartProp = {
      xType: 'text',
      axes: true,
      grid: true,
      dataPoints: true,
      verticalGrid: true,
      width: 800,
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
          <h2>BTC.us</h2>
          {loader}
        </header>
        <section className="container">
          <div className="intro">
            Btc.us 是一个简单的比特币计算器，支持多种货币，每分钟更新。
            <br /> 点击右侧国旗可以切换当前货币类型。
          </div>
          <div className="rate-area">
            <BitInput amount={amount} changeValue={changeValue} />
            <span className="equal"> = </span>
            <Output {...outputProp} />
            <div className={rateArrow}></div>
          </div>
          <h3 className="chart-title">比特币价格走势</h3>
          <div className="chart-area">
            {lineChart}
            {showTool}
          </div>
        </section>
        <footer>
          2016 Btc.us
        </footer>
      </div>
    );
  }
}


Main.propTypes = propTypes;

export default Main;
