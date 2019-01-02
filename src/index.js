import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Fuse from 'fuse.js'
import styled, { createGlobalStyle } from 'styled-components'

const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
  }
`

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
`

const StyledInput = styled.input`
  font-size: 14px;
  padding: 10px 20px;
  height: 40px;
  border: 1px solid #cacaca96;
  border-radius: 5px;

  &:focus {
    outline: none;
  }
`

const StyledDropdown = styled.div`
  margin: 10px 0 0;
  background-color: #fff;
  box-shadow: rgba(0, 0, 0, 0.1) 0 0 0 0, rgba(0, 0, 0, 0.1) 0px 4px 11px;
  border-radius: 5px;

  > ul {
    list-style-type: none;
    margin: 0;
    padding: 0;

    > li {
      padding: 10px 20px;
      background-color: #fff;
      border: 1px solid #c7c0c096;
      height: 40px;
      display: flex;
      align-items: center;

      &:hover {
        background-color: #673ab721;
        cursor: pointer;
      }

      &:first-child {
        border-top-left-radius: 5px;
        border-top-right-radius: 5px;
      }

      &:last-child {
        border-bottom-left-radius: 5px;
        border-bottom-right-radius: 5px;
      }

      &:not(:first-child) {
        border-top: 0;
      }
    }
  }
`

export default class ReactSearchBox extends Component {
  static propTypes = {
    /**
     * placeholder: The placeholder text for the input box.
     * data: An array of objects which acts as teh source of data for the dropdown.
     * onSelect: A function which acts as a callback when any record is selected. It
     * is triggered once a dropdown item is clicked
     * autoFocus: Focus on the input box once the component is mounted
     */
    placeholder: PropTypes.string,
    data: PropTypes.array.isRequired,
    onSelect: PropTypes.func,
    autoFocus: PropTypes.bool,
  }

  static defaultProps = {
    /**
     * Set data prop as an empty array in case it's not passed.
     */
    data: [],
    /**
     * Don't focus on the input box when the component is mounted by default
     */
    autoFocus: false,
  }

  state = {
    /**
     * 'matchedRecords' stores the items when the input box's value
     * matches with any item from the 'data' prop.
     */
    value: '',
    matchedRecords: [],
  }

  constructor(props) {
    super(props)

    const { data } = props

    /**
     * These options are from Fuse plugin. Check out http://fusejs.io/
     * for more details.
     */
    const options = {
      /**
       * At what point does the match algorithm give up. A threshold of 0.0
       * requires a perfect match (of both letters and location), a threshold
       * of 1.0 would match anything.
       */
      threshold: 0.05,
      /**
       * Determines approximately where in the text is the pattern expected to be found.
       */
      location: 0,
      /**
       * Determines how close the match must be to the fuzzy location
       * (specified by location). An exact letter match which is distance
       * characters away from the fuzzy location would score as a complete
       * mismatch. A distance of 0 requires the match be at the exact
       * location specified, a distance of 1000 would require a perfect
       * match to be within 800 characters of the location to be found
       * using a threshold of 0.8.
       */
      distance: 100,
      /**
       * When set to include matches, only the matches whose length exceeds this
       * value will be returned. (For instance, if you want to ignore single
       * character index returns, set to 2).
       */
      minMatchCharLength: 1,
      /**
       * List of properties that will be searched. This supports nested properties,
       * weighted search, searching in arrays of strings and objects.
       */
      keys: ['value'],
    }

    this.fuse = new Fuse(data, options)
  }

  componentDidMount() {
    const { autoFocus } = this.props

    !!autoFocus && this.input.focus()
  }

  handleInputChange = e => {
    /**
     * This function is responsible for checking if any items from the input
     * box's value matches with any item form the 'data' prop. If any item matches,
     * then that matched object is pushed into the 'matchedRecords' state. That
     * state is responsible for populating the dropdown.
     */

    const { value } = e.target

    /**
     * Check all the values from 'data' array whose 'value' matches with
     * 'value' using Fuse plugin.
     */
    const matchedRecords = this.fuse.search(value)

    /**
     * Update 'value' state with the value from the input box
     * Update 'matchedRecords' state with the matched records from the data array.
     */
    this.setState({
      value,
      matchedRecords,
      /**
       * Show the dropdown onChange of the input
       */
      showDropdown: true,
    })
  }

  inputNode = () => {
    /**
     * This function is responsible for rendering the input box.
     * The input box acts as a source of entry for the data from the user.
     * Once the user enters the value, it's checked if that value matches
     * with any value which is present in the 'data' prop. If any value
     * matches with the input, then that matched item appears in the dropdown.
     */
    const { placeholder } = this.props
    const { value } = this.state

    return (
      <StyledInput
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={this.handleInputChange}
        ref={input => {
          this.input = input
        }}
      />
    )
  }

  handleDropdownItemClick = record => {
    /**
     * This function is responsible for updating the value inside the
     * input box when any dropdown item is clicked.
     *
     * The 'value' state is updated with the clicked record's value.
     */

    const { value } = record
    const { onSelect } = this.props

    this.setState({
      value,
      /**
       * Hide the dropdown once any dropdown item is clicked
       */
      showDropdown: false,
    })

    /**
     * Trigger the 'onSelect' prop once everything is done
     */
    onSelect(record)
  }

  dropdownNode = () => {
    /**
     * This function is responsible for rendering the dropdown.
     * When any value from the input box matches with any value from the
     * 'data' prop, that matched object from the 'data' array shows up
     * in the dropdown's li. The matched values are stored in the
     * 'matchedRecords' state.
     */
    const { matchedRecords, showDropdown } = this.state

    /**
     * If there is no value present in the input box, then the dropdown
     * shouldn't appear.
     */
    if (!showDropdown) return false

    return (
      <StyledDropdown className="react-search-box-dropdown">
        <ul>
          {matchedRecords.map(record => {
            return (
              <li
                key={record.key}
                className="react-search-box-dropdown-list-item"
                onClick={() => this.handleDropdownItemClick(record)}
              >
                {record.value}
              </li>
            )
          })}
        </ul>
      </StyledDropdown>
    )
  }

  render() {
    return (
      <StyledContainer>
        <GlobalStyle />
        {this.inputNode()}
        {this.dropdownNode()}
      </StyledContainer>
    )
  }
}
