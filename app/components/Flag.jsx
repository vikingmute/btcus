import React, { PropTypes } from 'react';

const propTypes = {
  rate: PropTypes.number.isRequired,
  currency: PropTypes.string.isRequired,
  changeCurreny: PropTypes.func.isRequired
};

class Flag extends React.Component {
  constructor(props) {
    super(props);
    this.changeCurreny = this.changeCurreny.bind(this);
  }
  changeCurreny() {
    const val = {
      rate: this.props.rate,
      currency: this.props.currency
    };
    this.props.changeCurreny(val.currency);
  }
  render() {
    const { currency } = this.props;
    const klass = `flag-icon flag-${currency}`;
    return (
      <div className="flag-component">
        <a onClick={this.changeCurreny} href="#">
          <span className={klass}></span>
          <span className="text">{this.props.currency}</span>
        </a>
      </div>
    );
  }
}

Flag.propTypes = propTypes;

export default Flag;
