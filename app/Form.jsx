import React from 'react';

import './scss/Form.scss';

class Form extends React.Component {
  render() {
    return (
      <div className="form-component">
        <input type="text" placeholder="请填写优惠码"/>
        <button>使用优惠卷</button>
      </div>
    )
  }
}

export default Form;
