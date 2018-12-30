import React, { Component } from 'react'
import PropTypes from 'prop-types'

import styles from './styles.css'

export default class ExampleComponent extends Component {
  static propTypes = {
    value: PropTypes.string,
    placeholder: PropTypes.string,
  }

  inputNode = () => {
    const { value, placeholder } = this.props

    return (
      <input
        className={styles.input}
        type="text"
        placeholder={placeholder}
        defaultValue={value}
      />
    )
  }

  dropdownNode = () => {
    const { value } = this.props

    if (!value) return false

    return (
      <div className={styles.dropdown}>
        <ul className={styles.dropdownList}>
          <li className={styles.dropdownListItem}>Item 1</li>
          <li className={styles.dropdownListItem}>Item 2</li>
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
