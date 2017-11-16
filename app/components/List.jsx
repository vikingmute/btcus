import React, { PropTypes } from 'react'
import Item from './Item'

const List = ({ items }) =>
  (
  <ul className="home-list-component">
    {items.map(item => <Item item={item} key={item.coin} />)}
  </ul>
  )

List.propTypes = {
  items: PropTypes.array.isRequired
}

export default List
