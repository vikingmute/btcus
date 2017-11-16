import React, { PropTypes } from 'react'

const propTypes = {
  items: PropTypes.array.isRequired,
  onChange: PropTypes.func.isRequired,
}
class Tab extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      activeTab: 0
    }
  }
  onTabClick = (item, index) => {
    this.setState({
      activeTab: index
    })
    this.props.onChange(item)
  }
  render() {
    const { items } = this.props
    const { activeTab } = this.state
    const tabList = items.map((item, index) => {
      const activeClass = (index === activeTab) ? 'active' : ''
      return (
        <li key={index} className={activeClass} onClick={() => {this.onTabClick(item, index)}}>
          {item.text}
        </li>
      )
    })
    return (
      <ul className="tab-component">
        {tabList}
      </ul>
    )
  }
}
Tab.propTypes = propTypes

export default Tab