import React, { PropTypes } from 'react';

const propTypes = {
  items: PropTypes.array.isRequired,
  featureItems: PropTypes.array,
  onSelect: PropTypes.func,
  onChange: PropTypes.func,
  placeholder: PropTypes.string,
  dataKey: PropTypes.string,
  itemTemplate: PropTypes.func,
  maxLength: PropTypes.number
};
class Typeahead extends React.Component {
  constructor(props) {
    super(props);
    this.changeCallback = this.changeCallback.bind(this);
    this.clickCallback = this.clickCallback.bind(this);
    this.keySelectCallback = this.keySelectCallback.bind(this);
    this.state = {
      filterItems: props.featureItems ? JSON.parse(JSON.stringify(props.featureItems)) : [],
      inital: true,
      keyIndex: -1,
      value: '',
      displayDropdown: false,
    };
  }

  componentWillReceiveProps(nextProps) {
    // update when new featureItems is provided
    if (nextProps.featureItems) {
      const newState = Object.assign({}, this.state, {
        filterItems: JSON.parse(JSON.stringify(nextProps.featureItems)) });
      this.setState(newState);
    }
  }
  changeCallback() {
    // oninput only triggers when the input value is changed
    // reset keyIndex and items every time
    let cacheItems = [];
    const { onChange, items, featureItems, dataKey } = this.props;
    let { maxLength } = this.props;
    maxLength = maxLength || 10;
    const currentPattern = this.refs.pattern.value;
    if (currentPattern === '') {
      const newState = Object.assign({}, this.state,
                    { filterItems: featureItems.slice(), inital: true,
                     keyIndex: -1, value: currentPattern });
      this.setState(newState);
    } else {
      cacheItems = items.filter((item) =>
        item[dataKey].indexOf(currentPattern.toUpperCase()) !== -1 );
      const reg = new RegExp(currentPattern, 'gi');
      const formatItems = cacheItems.map((item) => {
        const output = { __html:
          item[dataKey].
          replace(reg, `<b>${currentPattern.toUpperCase()}</b>`) };
        const node = <span dangerouslySetInnerHTML={output} />;
        return Object.assign({}, item, { node });
      }).slice(0, maxLength);
      const newState = Object.assign({}, this.state,
                    { filterItems: formatItems, inital: false,
                      keyIndex: -1, value: currentPattern });
      this.setState(newState);
    }
    if (onChange) {
      onChange(currentPattern);
    }
  }
  toggleDropdown(show) {
    this.setState({
      displayDropdown: show
    })
  }
  keySelectCallback(e) {
    let { filterItems, keyIndex } = this.state;
    const key = e.keyCode;
    const len = filterItems.length;
    if (len === 0) {
      return;
    }
    // only triggered when press up & down arrow
    if (key === 38) {
      // up arrow
      keyIndex--;
      if (keyIndex < 0) {
        keyIndex = 0;
      }
    } else if (key === 40) {
      // down arrow
      keyIndex++;
      if (keyIndex >= len) {
        keyIndex = len - 1;
      }
    }

    filterItems.forEach((item, index) => {
      if (index === keyIndex) {
        item.active = true;
      } else {
        item.active = false;
      }
    });
    // handle the enter key here
    // call click event handler after enter
    if (key === 13) {
      const activeArr = filterItems.filter((item) => !!item.active);
      if (activeArr.length > 0) {
        this.clickCallback(activeArr[0]);
      }
    } else {
      const newState = Object.assign({}, this.state, { filterItems, keyIndex });
      this.setState(newState);
    }
  }
  clickCallback(item) {
    const newState = Object.assign({}, this.state, { value: item.currency, displayDropdown: false });
    this.setState(newState);
    const { onSelect } = this.props;
    if (onSelect) {
      onSelect(item);
    }
  }

  render() {
    let { placeholder, itemTemplate } = this.props;
    placeholder = placeholder || 'Type currency name to search';
    let { filterItems, value, displayDropdown } = this.state;
    const Item = itemTemplate;
    let filterList = filterItems.length === 0 ? (<p>No result found</p>) :
      filterItems.map((item, index) =>
        (<li
          key={index}
          onClick={() => {this.clickCallback(item)}}
          className={(item.active ? 'active' : '')}>
          <Item {...item} />
        </li>)
      );
    const style = displayDropdown ? { display: 'block' } : { display: 'none' }
    return (
      <div className="typeahead-component">
        <input
          ref="pattern"
          value={value}
          onInput={this.changeCallback}
          onFocus={() => {this.toggleDropdown(true)}}
          placeholder={placeholder}
          onKeyDown={this.keySelectCallback}
        />
        <ul className="typeahead-list">
          {filterList}
        </ul>
      </div>
    );
  }
}

Typeahead.propTypes = propTypes;

export default Typeahead;
