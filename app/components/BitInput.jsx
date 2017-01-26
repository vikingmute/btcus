import React, { PropTypes } from 'react';

const propTypes = {
  changeValue: PropTypes.func.isRequired,
  amount: PropTypes.number.isRequired
};
class BitInput extends React.Component {
  constructor(props) {
    super(props);
    this.changeValue = this.changeValue.bind(this);
  }
  changeValue() {
    const amount = this.refs.amount.value;
    this.props.changeValue(amount);
  }
  render() {
    return (
      <div className="input-component">
        <span className="flag-icon"></span>
        <input ref="amount" type="number" lang="nb" value={this.props.amount} onChange={this.changeValue} />
        <span className="currency">BTC</span>
      </div>
    );
  }
}

BitInput.propTypes = propTypes;

export default BitInput;
