import { ReactNode } from "react";
import styled from "styled-components";

export const StyledInput = styled.input`
  font-size: ${({
    inputFontSize,
  }: {
    inputFontSize: string;
    inputHeight: string;
    inputBorderColor: string;
    inputFontColor: string;
    inputBackgroundColor: string;
    leftIcon: ReactNode;
    iconBoxSize: string | number;
  }) => inputFontSize};
  padding: ${({ leftIcon, iconBoxSize }) =>
    leftIcon ? `10px ${iconBoxSize}` : "10px 20px"};
  height: ${({ inputHeight }) => inputHeight};
  border: 1px solid ${({ inputBorderColor }) => inputBorderColor};
  border-radius: 5px;
  color: ${({ inputFontColor }) => inputFontColor};
  background-color: ${({ inputBackgroundColor }) => inputBackgroundColor};
  width: 100%;

  &:focus {
    outline: none;
  }
`;

export const StyledIconContainer = styled.span`
  height: ${({
    inputHeight,
  }: {
    inputHeight: string;
    iconBoxSize: string | number;
  }) => inputHeight};
  width: ${({ iconBoxSize }) => iconBoxSize};
  position: absolute;
  left: 0;
  top: 0;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const StyledInputContainer = styled.span`
  position: relative;
`;
