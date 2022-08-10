import { FC, KeyboardEvent, ReactNode, useEffect, useRef } from "react";
import {
  StyledInput,
  StyledIconContainer,
  StyledInputContainer,
} from "./styles";

interface IProps {
  placeholder: string;
  name: string;
  value: string;
  onChange: any;
  onFocus: any;
  inputFontColor: string;
  inputBorderColor: string;
  inputFontSize: string;
  inputHeight: string;
  inputBackgroundColor: string;
  autoFocus: boolean;
  leftIcon?: ReactNode;
  iconBoxSize: number | string;
  type: string;
  onKeyDown: (event: KeyboardEvent) => void;
}

const Input: FC<IProps> = ({
  placeholder,
  name,
  value,
  onChange,
  onFocus,
  inputFontColor,
  inputBorderColor,
  inputFontSize,
  inputHeight,
  inputBackgroundColor,
  autoFocus,
  leftIcon,
  iconBoxSize,
  type,
  onKeyDown,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    /**
     * Focusses on the input box if the autoFocus prop is true.
     */
    !!autoFocus && inputRef.current?.focus();
  }, []);

  const leftIconNode = () => {
    if (!leftIcon) {
      return null;
    }

    return (
      <StyledIconContainer iconBoxSize={iconBoxSize} inputHeight={inputHeight}>
        {leftIcon}
      </StyledIconContainer>
    );
  };

  return (
    <StyledInputContainer>
      <StyledInput
        type={type}
        placeholder={placeholder}
        name={name}
        value={value}
        onChange={onChange}
        onFocus={onFocus}
        ref={inputRef}
        inputFontColor={inputFontColor}
        inputBorderColor={inputBorderColor}
        inputFontSize={inputFontSize}
        inputHeight={inputHeight}
        inputBackgroundColor={inputBackgroundColor}
        leftIcon={leftIcon}
        iconBoxSize={iconBoxSize}
        onKeyDown={onKeyDown}
      />
      {leftIconNode()}
    </StyledInputContainer>
  );
};

export default Input;
