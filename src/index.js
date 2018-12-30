import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Fuse from 'fuse.js'

import styles from './styles.css'

export default class ReactSearchBox extends Component {
  static propTypes = {
    /**
     * value: The default value for the input box
     * placeholder: The placeholder text for the input box
     * data: An array of objects which acts as teh source of data for the dropdown
     */
    value: PropTypes.string,
    placeholder: PropTypes.string,
    data: PropTypes.array.isRequired,
  }

  static defaultProps = {
    // Set data prop as an empty array in case it's not passed
    data: [],
  }

  state = {
    /**
     * 'matchedRecords' stores the items when the input box's value
     * matches with any item from the 'data' prop
     */
    matchedRecords: [],
  }

  constructor(props) {
    super(props)

    const { data } = props

    /**
     * These options are from Fuse plugin. Check out http://fusejs.io/
     * for more details
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
       * character index returns, set to 2)
       */
      minMatchCharLength: 1,
      /**
       * List of properties that will be searched. This supports nested properties,
       * weighted search, searching in arrays of strings and objects
       */
      keys: ['value'],
    }

    this.fuse = new Fuse(data, options)
  }

  componentDidMount() {
    const { value } = this.props
    const matchedRecords = this.fuse.search(value)

    this.setState({
      matchedRecords,
    })
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
     * Update 'matchedRecords' state with the matched records from the data array
     */
    this.setState({
      matchedRecords,
    })
  }

  inputNode = () => {
    /**
     * This function is responsible for rendering the input box.
     * The input box acts as a source of entry for the data from the user.
     * Once the user enters the value, it's checked if that value matches
     * with any value which is present in the 'data' prop. If any value
     * matches with the input, then that matched item appears in the dropdown
     */
    const { value, placeholder } = this.props

    return (
      <input
        className={styles.input}
        type="text"
        placeholder={placeholder}
        defaultValue={value}
        onChange={this.handleInputChange}
      />
    )
  }

  dropdownNode = () => {
    /**
     * This function is responsible for rendering the dropdown.
     * When any value from the input box matches with any value from the
     * 'data' prop, that matched object from the 'data' array shows up
     * in the dropdown's li. The matched values are stored in the
     * 'matchedRecords' state.
     */
    const { value } = this.props
    const { matchedRecords } = this.state

    /**
     * If there is no value present in the input box, then the dropdown
     * shouldn't appear
     */
    if (!value) return false

    return (
      <div className={`react-search-box-dropdown ${styles.dropdown}`}>
        <ul className={styles.dropdownList}>
          {matchedRecords.map(record => {
            return (
              <li
                key={record.key}
                className={`react-search-box-dropdown-list-item ${
                  styles.dropdownListItem
                }`}
              >
                {record.value}
              </li>
            )
          })}
        </ul>
      </div>
    )
  }

  render() {
    return (
      <div className={styles.container}>
        {this.inputNode()}
        {this.dropdownNode()}
      </div>
    )
  }
}
