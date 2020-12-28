import styled from 'styled-components'

const StyledInput = styled.input`
  font-size: ${props => props.inputBoxFontSize};
  padding: 10px 20px;
  height: ${props => props.inputBoxHeight};
  border: 1px solid ${props => props.inputBoxBorderColor};
  border-radius: 5px;
  color: ${props => props.inputBoxFontColor};
  background-color: ${props => props.inputBoxBackgroundColor};

  &:focus {
    outline: none;
  }
`

export default StyledInput
