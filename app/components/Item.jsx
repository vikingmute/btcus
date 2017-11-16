import React, { PropTypes } from 'react'
import { Link } from 'react-router-dom'

const Item = ({ item }) => {
  const image = require(`../imgs/${item.coin}.png`)
  const style = {
    backgroundImage: `url(${image})`
  }
  const changeClass = (item.changePercent > 0)
                      ? 'change-percent up-arrow'
                      : 'change-percent down-arrow'
  return (
    <li className="item-component" key={item.coin}>
      <Link to={`/detail/${item.coin}`}>
        <div className="coin-area">
          <span className="flag-icon" style={style}></span>
          <span className="coin-text">{item.coin}</span>
        </div>
        <div className="currency-area">
          <span className={changeClass}>{item.changePercent}%</span>
          <span className="currency-price">{item.price}</span>
          <span className="currency-text">{item.currency}</span>
        </div>
      </Link>
    </li>
  )
}

Item.propTypes = {
  item: PropTypes.object.isRequired
}

export default Item
