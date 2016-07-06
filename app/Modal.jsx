import React from 'react';
import Title from './Title';
import Box from './Box';
import Form from './Form';

import './scss/app.scss';


class Modal extends React.Component {
  constructor(props) {
    super(props);
    console.log(props);
  }
  componentDidMount() {
    //this.props.actions.selectTypeB();
  }
  render() {
    const titleProps = {
      title: '马上续费，机器工程学位',
      subtitle: '继续学习纳米学位，挑战一些内容'
    }
    const boxPropsOne = {
      klassName: 'gray box-component',
      time: '1个月'
    }
    const boxPropsTwo = {
      klassName: 'blue box-component',
      time: '3个月'
    }
    const boxPropsThree = {
      klassName: 'gray box-component',
      time: '6个月'
    }
    let content ;
    if (this.props.state.version === 'A') {
      content =  (
                <Box {...boxPropsTwo}>
                  <h3>快速冲刺</h3>
                  <h2>880元／月</h2>
                </Box>
              );
    } else {
      content = (
                <Box {...boxPropsOne}>
                  <h3>快速冲刺</h3>
                  <h2>880元／月</h2>
                </Box>
              );
    }

    return (
      <div className="container">
        <Title {...titleProps} />
        <div className="box-list">
          <Box {...boxPropsOne}>
            <h3>小试牛刀</h3>
            <h2>980元／月</h2>
          </Box>
          {content}
          <Box {...boxPropsThree}>
            <h3>扎实成长</h3>
            <h2>780元／月</h2>
          </Box>
        </div>
        <Form />
      </div>
    );
  }
}

export default Modal;
