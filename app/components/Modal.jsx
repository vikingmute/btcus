import React, { PropTypes } from 'react';
import Typeahead from './Typeahead';

const propTypes = {
  flags: PropTypes.array.isRequired,
  changeCurreny: PropTypes.func.isRequired,
  status: PropTypes.bool.isRequired,
  list: PropTypes.array.isRequired
};
function Modal(props) {
  const { changeCurreny, status, list } = props;
  const openStatus = status ? 'modal-open' : 'modal-hide';
  const klass = `modal-component ${openStatus}`;

  const featureItems = list.filter((item) => {
    const pa = /^AUD|CNY|CAD|USD|JPY|GBP|CHF|EUR|HKD$/g;
    return pa.test(item.currency);
  });
  function CustomItem(prop) {
    const klassC = `flag-${prop.currency} flag`;
    return (<p className={prop.currency}>
      <span className={klassC}></span>
      <span className="ccode">{(prop.node) ? prop.node : prop.currency} </span>
      {prop.country}</p>);
  }
  return (
    <div className={klass}>
      <div className="arrow_box">
        <Typeahead
          featureItems={featureItems}
          items={list}
          itemTemplate={CustomItem}
          onSelect={changeCurreny}
          dataKey="currency"
          maxLength={9}
        />
      </div>
    </div>
  );
}

Modal.propTypes = propTypes;

export default Modal;
