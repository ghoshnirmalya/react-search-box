import styled from "styled-components";

const StyledInput = styled.input`
  font-size: ${({
    inputFontSize,
  }: {
    inputFontSize: string;
    inputHeight: string;
    inputBorderColor: string;
    inputFontColor: string;
    inputBackgroundColor: string;
  }) => inputFontSize};
  padding: 10px 20px;
  height: ${({ inputHeight }) => inputHeight};
  border: 1px solid ${({ inputBorderColor }) => inputBorderColor};
  border-radius: 5px;
  color: ${({ inputFontColor }) => inputFontColor};
  background-color: ${({ inputBackgroundColor }) => inputBackgroundColor};
  &:focus {
    outline: none;
  }
`;

export default StyledInput;
