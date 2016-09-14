import React, { PropTypes } from 'react';

const propTypes = {
  top: PropTypes.number.isRequired,
  left: PropTypes.number.isRequired,
  children: PropTypes.element
};
function ToolTip(props) {
  const styles = {
    top: props.top,
    left: props.left
  };
  return (
    <div className="tooltip-component" style={styles}>
      {props.children}
    </div>
  );
}

ToolTip.propTypes = propTypes;

export default ToolTip;
