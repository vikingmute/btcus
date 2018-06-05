import React, { PropTypes } from 'react'
import Item from './Item'
import { Link } from 'react-router-dom'

const List = ({ items }) =>
  (
  <ul className="home-list-component">
    {items.map(item => <Item item={item} key={item.coin} />)}
    <li className="item-component">
      <Link to={'/configuration'} id="more-button">
        + Add more cryptocurrencies
      </Link>
    </li>
  </ul>
  )

List.propTypes = {
  items: PropTypes.array.isRequired
}

export default List
