import React, { PropTypes } from 'react'

const SelectorList = (props) => {
  const { list, children } = props
  const formatList = list.map(item => {
    let image = '';
    try {
      image = require(`../imgs/${item.currency}.png`)
    } catch (e) {
      image = require('../imgs/default.png')
    }
    const style = {
      backgroundImage: `url(${image})`
    }
    const optionalDelete = (list.length > 2)
      ? <span className="delete-icon" onClick={() => { props.onDelete(item) }}> ✕ </span>
      : ''
    return (
      <li className="selector-item">
        <div className="item-button">
          <span className="flag-icon" style={style}></span>
          <span className="flag-text">{item.currency}</span>
          {optionalDelete}
        </div>
      </li>
    )
  })
  return (
    <ul className="selector-list">
      {formatList}
      {children}
    </ul>
  )
}

SelectorList.propTypes = {
  list: PropTypes.array.isRequired,
  children: PropTypes.element.isRequired,
  onDelete: PropTypes.func.isRequired
}

export default SelectorList
