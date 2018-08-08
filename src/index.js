import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _filter from 'lodash/filter';
import classNames from 'classnames';
import styled from 'styled-components';

import Dropdown from './dropdown';

const InputWrapper = styled.input`
  &.input {
    border: 1px solid #f1f1f1;
    border-radius: 3px;
    padding: 10px;
    font-size: 16px;
    font-weight: 400;
    outline: 0;
    width: 100%;
    box-sizing: border-box;

    &--show-dropdown {
      border-bottom-right-radius: 0;
      border-bottom-left-radius: 0;
    }
  }
`;

export default class Search extends Component {
  constructor() {
    super();

    this.state = {
      matchedData: [],
      value: '',
      showDropdown: false
    };
  }

  static propTypes = {
    placeholder: PropTypes.string,
    exactSearch: PropTypes.bool,
    onChange: PropTypes.func,
    class: PropTypes.string,
    searchKey: PropTypes.string
  };

  static defaultProps = {
    placeholder: 'Search...',
    data: [],
    exactSearch: false,
    class: ''
  };

  handleChange(e) {
    let { data } = this.props;
    let value = e.target.value;

    if (value.trim()) {
      let matchedData = this.getValueByKey(value.trim(), data);

      this.setState({
        matchedData,
        value: value,
        showDropdown: true
      });
    } else {
      this.setState({
        value: value,
        showDropdown: false
      });
    }
  }

  getValueByKey(key, array) {
    let { exactSearch } = this.props;

    if (exactSearch) {
      return this.exactSearchQuery(key, array);
    }

    return this.fuzzySearchQuery(key, array);
  }

  exactSearchQuery(key, array) {
    let { searchKey } = this.props;

    return _filter(array, { [`${searchKey}`]: key });
  }

  fuzzySearchQuery(key, array) {
    let { searchKey } = this.props;

    return _filter(array, (item) => {
      let searchableItem = item[`${searchKey}`].toString();
      if (searchableItem.indexOf(key) !== -1) {
        return searchableItem;
      }
    });
  }

  handleSetValue(value) {
    let { onChange } = this.props;

    this.setState({
      value: value.target.innerText,
      showDropdown: false
    }, () => {
      if (onChange) {
        onChange(this.state.value);
      }
    });
  }

  render() {
    const { propClass, placeholder } = this.props;
    const { showDropdown, value, matchedData, searchKey } = this.state;
    const handleSetValue = (value) => {
      this.handleSetValue(value);
    }
    const handleChange = (value) => {
      this.handleChange(value);
    }
      
    return (
      <div
        className={ classNames({
          search: true,
          [propClass]: !propClass ? false : true
        }) }
      >
        <div className="search__input">
          <InputWrapper
            type="text"
            className={ classNames({
              input: true,
              'input--show-dropdown': showDropdown
            }) }
            placeholder={ placeholder }
            onChange={ handleChange }
            value={ value }
          />
        </div>
        <div className="search__dropdown">
          <Dropdown
            data={ matchedData }
            onClick={ handleSetValue }
            show={ showDropdown }
            searchKey={ searchKey }
          />
        </div>
      </div>
    );
  }
}
