import React, { PropTypes } from 'react';

import './scss/Title.scss';

const propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string.isRequired
}

class Title extends React.Component {
  render() {
    return (
      <div className="title-component">
        <h1>{this.props.title}</h1>
        <h2>{this.props.subtitle}</h2>
      </div>
    )
  }
}

Title.propTypes = propTypes;

export default Title;
