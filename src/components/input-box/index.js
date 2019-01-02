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
     * inputBoxFontColor: Color of the text in the input box.
     * inputBoxBorderColor: Color of the border of the input box.
     * inputBoxFontSize: Size of the font of the input box.
     * inputBoxHeight: Height of the input box.
     */
    placeholder: PropTypes.string,
    value: PropTypes.string,
    onChange: PropTypes.func,
    onFocus: PropTypes.func,
    inputBoxFontColor: PropTypes.string,
    inputBoxBorderColor: PropTypes.string,
    inputBoxFontSize: PropTypes.string,
    inputBoxHeight: PropTypes.string,
  }

  componentDidMount() {
    const { autoFocus } = this.props

    /**
     * Focusses on the input box if the autoFocus prop is true.
     */
    !!autoFocus && this.input.focus()
  }

  render() {
    const {
      placeholder,
      value,
      onChange,
      onFocus,
      inputBoxFontColor,
      inputBoxBorderColor,
      inputBoxFontSize,
      inputBoxHeight,
    } = this.props

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
        inputBoxFontColor={inputBoxFontColor}
        inputBoxBorderColor={inputBoxBorderColor}
        inputBoxFontSize={inputBoxFontSize}
        inputBoxHeight={inputBoxHeight}
      />
    )
  }
}

export default InputBox
