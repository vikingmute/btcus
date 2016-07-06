import React, { PropTypes } from 'react';

import './scss/Box.scss';

class Box extends React.Component {
  render() {
    return (
      <div className={this.props.klassName}>
        <h1>{this.props.time}</h1>
        {this.props.children}
        <div className="button-group">
          <input value="微信支付" type="submit" />
          <input value="支付宝支付" type="submit" />
        </div>
      </div>
    )
  }
}

export default Box;
