import React, { Component } from 'react';
import PropTypes from 'prop-types';


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
      <div className="dropdown">
        { this.listNode() }
      </div>
    );
  }
}
