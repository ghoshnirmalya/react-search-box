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
    if (e.target.value.trim()) {
      let matchedData = this.getValueByKey(e.target.value.trim(), this.props.data);

      this.setState({
        matchedData,
        value: e.target.value,
        showDropdown: true
      });
    } else {
      this.setState({
        value: e.target.value,
        showDropdown: false
      });
    }
  }

  getValueByKey(key, array) {
    if (this.props.exactSearch) {
      return this.exactSearchQuery(key, array);
    }

    return this.fuzzySearchQuery(key, array);
  }

  exactSearchQuery(key, array) {
    let _this = this;

    return _filter(array, { [`${_this.props.searchKey}`]: key });
  }

  fuzzySearchQuery(key, array) {
    let _this = this;

    return _filter(array, (item) => {
      let searchableItem = item[`${_this.props.searchKey}`].toString();
      if (searchableItem.indexOf(key) !== -1) {
        return searchableItem;
      }
    });
  }

  handleSetValue(value) {
    this.setState({
      value: value.target.innerText,
      showDropdown: false
    }, () => {
      if (this.props.onChange) {
        this.props.onChange(this.state.value);
      }
    });
  }

  render() {
    return (
      <div
        className={ classNames({
          search: true,
          [this.props.class]: !this.props.class ? false : true
        }) }
      >
        <div className="search__input">
          <InputWrapper
            type="text"
            className={ classNames({
              input: true,
              'input--show-dropdown': this.state.showDropdown
            }) }
            placeholder={ this.props.placeholder }
            onChange={ this.handleChange.bind(this) }
            value={ this.state.value }
          />
        </div>
        <div className="search__dropdown">
          <Dropdown
            data={ this.state.matchedData }
            onClick={ this.handleSetValue.bind(this) }
            show={ this.state.showDropdown }
            searchKey={ this.props.searchKey }
          />
        </div>
      </div>
    );
  }
}
