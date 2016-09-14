import React, { PropTypes } from 'react';
import Flag from './Flag';

const propTypes = {
  flags: PropTypes.array.isRequired,
  changeCurreny: PropTypes.func.isRequired,
  status: PropTypes.bool.isRequired
};
function Modal(props) {
  const { flags, changeCurreny, status } = props;
  const flagComponents = flags.map(prop =>
    <li><Flag {...prop} changeCurreny={changeCurreny} /></li>
  );
  const openStatus = status ? 'modal-open' : 'modal-hide';
  const klass = `modal-component ${openStatus}`;
  return (
    <div className={klass}>
      <div className="arrow_box">
        <ul className="flag-list">
          {flagComponents}
        </ul>
      </div>
    </div>
  );
}

Modal.propTypes = propTypes;

export default Modal;
