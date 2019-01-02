import styled from 'styled-components'

const StyledDropdown = styled.div`
  margin: 10px 0 0;
  background-color: #fff;
  box-shadow: rgba(0, 0, 0, 0.1) 0 0 0 0, rgba(0, 0, 0, 0.1) 0px 4px 11px;
  border-radius: 5px;

  > ul {
    list-style-type: none;
    margin: 0;
    padding: 0;

    > li {
      padding: 10px 20px;
      background-color: #fff;
      border: 1px solid ${props => props.dropDownBorderColor};
      height: 40px;
      display: flex;
      align-items: center;

      &:hover {
        background-color: ${props => props.dropDownHoverColor};
        cursor: pointer;
      }

      &:first-child {
        border-top-left-radius: 5px;
        border-top-right-radius: 5px;
      }

      &:last-child {
        border-bottom-left-radius: 5px;
        border-bottom-right-radius: 5px;
      }

      &:not(:first-child) {
        border-top: 0;
      }
    }
  }
`

export default StyledDropdown
