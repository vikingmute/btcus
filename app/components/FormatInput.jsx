import React, { PropTypes } from 'react'

const propTypes = {
  value: PropTypes.number.isRequired,
  onChangeValue: PropTypes.func.isRequired,
  children: PropTypes.element.isRequired,
  currency: PropTypes.object.isRequired,
  extraClassName: PropTypes.string.isRequired,
}
class FormatInput extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      modalIsOpen: false
    }
  }
  toggleModal = () => {
    this.setState(prevState => {
      return {
        modalIsOpen: !prevState.modalIsOpen
      }
    })
  }
  changeValue = () => {
    let inputValue = this.textInput.value;
    if (inputValue.trim() != '') {
      this.props.onChangeValue(inputValue);
    }
  }
  render() {
    const { value, children, currency, extraClassName } = this.props
    const modalArea = (this.state.modalIsOpen) ? children : '';
    const image = require(`../imgs/${currency.icon}.png`)
    const style = {
      backgroundImage: `url(${image})`
    }
    const className = extraClassName ? `format-input-component ${extraClassName}` : 'format-input-component'
    return (
      <div className={className}>
        <span className='flag-icon' style={style} onClick={this.toggleModal}></span>
        <input type="number" value={value} onChange={this.changeValue} ref={(input) => { this.textInput = input }} />
        <span className="currency">{currency.text}</span>
        {modalArea}
      </div>
    )
  }
}

FormatInput.propTypes = propTypes

export default FormatInput