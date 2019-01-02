import React, { Component } from 'react'
import PropTypes from 'prop-types'

import StyledDropDown from './styled-component'

class DropDown extends Component {
  static propTypes = {
    /**
     * onClick: A function which acts as a callback when any record is selected. It
     * is triggered once a dropdown item is clicked.
     * matchedRecords: An array of matched records.
     * dropDownHoverColor: Background color on hover of the dropdown list items.
     * dropDownBorderColor: Border color of the dropdown.
     */
    onClick: PropTypes.func,
    matchedRecords: PropTypes.array,
    dropDownHoverColor: PropTypes.string,
    dropDownBorderColor: PropTypes.string,
  }

  static defaultProps = {
    /**
     * Set matchedRecords prop as an empty array in case it's not passed.
     */
    matchedRecords: [],
  }

  render() {
    const {
      matchedRecords,
      onClick,
      dropDownHoverColor,
      dropDownBorderColor,
    } = this.props

    return (
      <StyledDropDown
        className="react-search-box-dropdown"
        dropDownHoverColor={dropDownHoverColor}
        dropDownBorderColor={dropDownBorderColor}
      >
        <ul>
          {matchedRecords.map(record => {
            return (
              <li
                key={record.key}
                className="react-search-box-dropdown-list-item"
                onClick={() => onClick(record)}
              >
                {record.value}
              </li>
            )
          })}
        </ul>
      </StyledDropDown>
    )
  }
}

export default DropDown
