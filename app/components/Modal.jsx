import React, { PropTypes } from 'react';
import Typeahead from './Typeahead';

const propTypes = {
  changeCurreny: PropTypes.func.isRequired,
  list: PropTypes.array.isRequired,
  featureList: PropTypes.array,
};
function Modal(props) {
  const { changeCurreny, list, featureList, text } = props;

  const featureItems = list.filter((item) => {
    const pa = new RegExp('^' + featureList.join('|') + '$', 'g');
    return pa.test(item.currency);
  });
  function CustomItem(prop) {
    const klassC = `flag-${prop.currency} flag`;
    let image = ''
    try  {
      image = require(`../imgs/${prop.currency}.png`)
    } catch(e) {
      image = require('../imgs/default.png')
    }
    const style = {
      backgroundImage: `url(${image})`
    }
    return (<p className={`${prop.currency} list-item`}>
      <span className={klassC} style={style}></span>
      <span className="ccode">{(prop.node) ? prop.node : prop.currency} </span>
      {prop.country}</p>);
  }
  return (
    <div className='modal-component'>
      <div className="arrow_box">
        <Typeahead
          featureItems={featureItems}
          items={list}
          itemTemplate={CustomItem}
          onSelect={changeCurreny}
          dataKey="currency"
          maxLength={9}
          text={text}
        />
      </div>
    </div>
  );
}

Modal.propTypes = propTypes;

export default Modal;
