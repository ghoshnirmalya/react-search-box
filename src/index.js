import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Fuse from 'fuse.js'
import styled, { createGlobalStyle } from 'styled-components'

import InputBox from './components/input-box'
import DropDown from './components/drop-down'

const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
  }
`

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
`

export default class ReactSearchBox extends Component {
  static propTypes = {
    /**
     * placeholder: The placeholder text for the input box.
     * data: An array of objects which acts as teh source of data for the dropdown.
     * fuseConfigs: Configs to override default Fuse configs.
     * onSelect: A function which acts as a callback when any record is selected. It
     * is triggered once a dropdown item is clicked.
     * autoFocus: Focus on the input box once the component is mounted.
     * onFocus: A function which acts as a callback when the input is focussed.
     * onChange: A function which acts as a callback when the input value is changed.
     * inputBoxFontColor: Color of the text in the input box.
     * inputBoxBorderColor: Color of the border of the input box.
     * inputBoxFontSize: Size of the font of the input box.
     * inputBoxHeight: Height of the input box.
     * dropDownHoverColor: Background color on hover of the dropdown list items.
     * dropDownBorderColor: Border color of the dropdown.
     */
    placeholder: PropTypes.string,
    data: PropTypes.array.isRequired,
    fuseConfigs: PropTypes.object,
    autoFocus: PropTypes.bool,
    onSelect: PropTypes.func,
    onFocus: PropTypes.func,
    onChange: PropTypes.func,
    inputBoxFontColor: PropTypes.string,
    inputBoxBorderColor: PropTypes.string,
    inputBoxFontSize: PropTypes.string,
    inputBoxHeight: PropTypes.string,
    dropDownHoverColor: PropTypes.string,
    dropDownBorderColor: PropTypes.string,
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
    /**
     * Set the placeholder as empty text by default
     */
    placeholder: '',
    inputBoxFontColor: '#000',
    inputBoxBorderColor: '#cacaca96',
    inputBoxFontSize: '14px',
    inputBoxHeight: '40px',
    dropDownHoverColor: '#ccc',
    dropDownBorderColor: '#cacaca96',
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

    const { data, fuseConfigs } = props

    /**
     * These configs are from Fuse plugin. Check out http://fusejs.io/
     * for more details.
     */
    this.defaultFuseConfigs = {
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

    /**
     this.Override defaultFuseConfigs with fuseConfigs prop
     */
    const configs = Object.assign({}, this.defaultFuseConfigs, fuseConfigs)

    this.fuse = new Fuse(data, configs)
  }

  componentDidUpdate(prevProps) {
    const { data, fuseConfigs } = this.props

    if (prevProps.data !== data) {
      /**
       * Override defaultFuseConfigs with fuseConfigs prop
       */
      const configs = Object.assign({}, this.defaultFuseConfigs, fuseConfigs)

      this.fuse = new Fuse(data, configs)
    }
  }

  handleInputChange = e => {
    const { onChange } = this.props

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
     * Update 'value' state with the value from the input box.
     * Update 'matchedRecords' state with the matched records from the data array.
     */
    this.setState({
      value,
      matchedRecords,
      /**
       * Show the dropdown onChange of the input.
       */
      showDropdown: true,
    })

    /**
     * Trigger the 'onChange' prop once the input's value changes.
     */
    !!onChange && onChange(value)
  }

  inputNode = () => {
    /**
     * This function is responsible for rendering the input box.
     * The input box acts as a source of entry for the data from the user.
     * Once the user enters the value, it's checked if that value matches
     * with any value which is present in the 'data' prop. If any value
     * matches with the input, then that matched item appears in the dropdown.
     */
    const {
      placeholder,
      onFocus,
      autoFocus,
      inputBoxFontColor,
      inputBoxBorderColor,
      inputBoxFontSize,
      inputBoxHeight,
    } = this.props
    const { value } = this.state

    return (
      <InputBox
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={this.handleInputChange}
        autoFocus={autoFocus ? autoFocus : undefined}
        onFocus={onFocus ? onFocus : undefined}
        inputBoxFontColor={inputBoxFontColor}
        inputBoxBorderColor={inputBoxBorderColor}
        inputBoxFontSize={inputBoxFontSize}
        inputBoxHeight={inputBoxHeight}
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
    const { onSelect, onChange } = this.props

    this.setState({
      value,
      /**
       * Hide the dropdown once any dropdown item is clicked.
       */
      showDropdown: false,
    })

    /**
     * Trigger the 'onSelect' prop once everything is done if it's passed.
     */
    !!onSelect && onSelect(record)

    /**
     * Trigger the 'onChange' prop since the value of the input box also changes.
     */
    !!onChange && onChange(value)
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
    const { dropDownHoverColor, dropDownBorderColor } = this.props

    /**
     * If there is no value present in the input box, then the dropdown
     * shouldn't appear.
     */
    if (!showDropdown) return false

    return (
      <DropDown
        matchedRecords={matchedRecords}
        onClick={this.handleDropdownItemClick}
        dropDownHoverColor={dropDownHoverColor}
        dropDownBorderColor={dropDownBorderColor}
      />
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
