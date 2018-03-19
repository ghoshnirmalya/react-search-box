import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const DropdownWrapper = styled.div`
  &.dropdown {
    .dropdown__ul {
      list-style-type: none;
      margin: 0;
      padding: 0;
      border: 1px solid #f1f1f1;
      border-top: 0;
      border-radius: 3px;
      border-top-right-radius: 0;
      border-top-left-radius: 0;
      max-height: calc(100vh - 100px);
      overflow-y: auto;
    }

    .dropdown__ul__li {
      padding: 10px;
      font-size: 16px;
      font-weight: 100;
    }

    .dropdown__ul__li:hover {
      background-color: #f1f1f1;
      cursor: pointer;
    }
  }
`;

export default class Dropdown extends Component {
  static propTypes = {
    data: PropTypes.array,
    onClick: PropTypes.func,
    show: PropTypes.bool,
    searchKey: PropTypes.string
  };

  static defaultProps = {
    data: [],
    show: false
  };

  listNode() {
    return (
      <ul className="dropdown__ul">
        { this.props.data.map((list, index) => {
          return (
            <li
              key={ index }
              className="dropdown__ul__li"
              onClick={ this.props.onClick.bind(list[`${this.props.searchKey}`]) }
            >
              { list[`${this.props.searchKey}`] }
            </li>
          );
        })}
        </ul>
    );
  }

  render() {
    if (!this.props.show) {
      return false;
    }

    return (
      <DropdownWrapper className="dropdown">
        { this.listNode() }
      </DropdownWrapper>
    );
  }
}
