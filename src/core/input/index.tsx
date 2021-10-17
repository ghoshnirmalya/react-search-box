import { FC, useEffect } from "react";
import StyledInput from "./styles";

/**
 * placeholder: The placeholder text for the input box.
 * value: The value of the input box.
 * onChange: A function which acts as a callback when the input value is changed.
 * onFocus: A function which acts as a callback when the input is focussed.
 * inputFontColor: Color of the text in the input box.
 * inputBorderColor: Color of the border of the input box.
 * inputFontSize: Size of the font of the input box.
 * inputHeight: Height of the input box.
 */
interface IProps {
  placeholder: string;
  value: string;
  onChange: any;
  onFocus: any;
  inputFontColor: string;
  inputBorderColor: string;
  inputFontSize: string;
  inputHeight: string;
  inputBackgroundColor: string;
  autoFocus: boolean;
}

const Input: FC<IProps> = ({
  placeholder,
  value,
  onChange,
  onFocus,
  inputFontColor,
  inputBorderColor,
  inputFontSize,
  inputHeight,
  inputBackgroundColor,
  autoFocus,
}) => {
  useEffect(() => {
    /**
     * Focusses on the input box if the autoFocus prop is true.
     */
    // !!autoFocus && this.input.focus();
  }, []);

  return (
    <StyledInput
      type="text"
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      onFocus={onFocus}
      // ref={(input) => {
      //   this.input = input;
      // }}
      inputFontColor={inputFontColor}
      inputBorderColor={inputBorderColor}
      inputFontSize={inputFontSize}
      inputHeight={inputHeight}
      inputBackgroundColor={inputBackgroundColor}
    />
  );
};

export default Input;
