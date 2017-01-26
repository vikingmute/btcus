import React, { PropTypes } from 'react';
import Modal from '../components/Modal';

const propTypes = {
  total: PropTypes.number.isRequired,
  currency: PropTypes.string.isRequired,
  changeCurreny: PropTypes.func.isRequired,
  modal: PropTypes.bool.isRequired,
  toggleModal: PropTypes.func.isRequired,
  changeTotal: PropTypes.func.isRequired,
  currencyList: PropTypes.array.isRequired
};
class Output extends React.Component {
  constructor(prop) {
    super(prop);
    this.changeTotal = this.changeTotal.bind(this);
  }
  changeTotal() {
    const val = this.refs.output.value;
    this.props.changeTotal(val);
  }
  render() {
    const { total, currency, changeCurreny,
            modal, toggleModal, currencyList } = this.props;
    const klass = `flag-icon flag-${currency}`;
    return (
      <div className="output-component">
        <span className={klass} onClick={toggleModal}></span>
        <input type="number" ref="output" value={total} lang="nb" onChange={this.changeTotal} />
        <span className="currency">{currency}</span>
        <Modal list={currencyList} changeCurreny={changeCurreny} status={modal} />
      </div>
    );
  }
}

Output.propTypes = propTypes;

export default Output;
