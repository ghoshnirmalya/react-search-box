import React, { Component } from 'react'
import PropTypes from 'prop-types'

import StyledInput from './styled-component'

class InputBox extends Component {
  static propTypes = {
    /**
     * placeholder: The placeholder text for the input box.
     * value: The value of the input box.
     * onChange: A function which acts as a callback when the input value is changed.
     * onFocus: A function which acts as a callback when the input is focussed.
     */
    placeholder: PropTypes.string,
    value: PropTypes.string,
    onChange: PropTypes.func,
    onFocus: PropTypes.func,
  }

  componentDidMount() {
    const { autoFocus } = this.props

    /**
     * Focusses on the input box if the autoFocus prop is true.
     */
    !!autoFocus && this.input.focus()
  }

  render() {
    const { placeholder, value, onChange, onFocus } = this.props

    return (
      <StyledInput
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onFocus={onFocus}
        ref={input => {
          this.input = input
        }}
      />
    )
  }
}

export default InputBox
