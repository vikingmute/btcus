import React, { PropTypes } from 'react'
import { findDOMNode } from 'react-dom';

const propTypes = {
  children: PropTypes.element.isRequired,
  currency: PropTypes.object,
  createBtn: PropTypes.boolean,
  tagName:  PropTypes.string,
}
class Selector extends React.Component {
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
  componentDidMount() {
    document.addEventListener('click', this.handleClickOutside.bind(this), true);    
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.handleClickOutside.bind(this), true);
  }

  handleClickOutside(event) {
    const domNode = findDOMNode(this);
    if (!domNode || !domNode.contains(event.target) || event.target.classList.contains('list-item')) {
      setTimeout(() => {
        this.setState({
          modalIsOpen: false
        })
      }, 0)
    }    
  }

  render() {
    const { value, children, currency, createBtn } = this.props
    const modalArea = (this.state.modalIsOpen) ? children : '';
    let image = '';
    try  {
      image = require(`../imgs/${currency.currency}.png`)
    } catch(e) {
      image = require('../imgs/default.png')
    }
    const style = {
      backgroundImage: `url(${image})`
    }
    const TagName = this.props.tagName
    const area = createBtn 
    ? (
      <div className="item-button" onClick={this.toggleModal}>
        <span className="create-btn"> + </span>
      </div>
    ) 
    : (
      <div className="select-button" onClick={this.toggleModal}>
        <span className='flag-icon' style={style}></span>
        <span className="flag-text">{currency.currency}</span>
      </div>
    )
    const klassName = createBtn ? 'selector-item extend-width' : 'selector-component'
    return (
      <TagName className={klassName}>
        {area}
        {modalArea}
      </TagName>
    )
  }
}

Selector.propTypes = propTypes

export default Selector