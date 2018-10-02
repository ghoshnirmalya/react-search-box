import React, { Component } from 'react'
import Downshift from 'downshift'
import styled from 'styled-components'

class Select extends Component {
  static defaultProps = {
    width: 250,
    height: 30
  };

  static StyledContainer = styled.div`
    display: flex;
    flex-direction: column;
  `;

  static StyledLabel = styled.label`
    margin-bottom: 5px;
  `;

  static StyledInput = styled.input`
    box-sizing: border-box;
    border: 1px solid #ccc;
    height: ${props => props.height}px;
    width: ${props => props.width}px;
    border-radius: 2px;
    font-size: inherit;
    padding: 5px 10px;
    background-color: ${props => (props.disabled ? '#eee' : 'transparent')};
  `;

  static StyledMenu = React.forwardRef((props, ref) => (
    <Select.StyledUl innerRef={ref} {...props} />
  ));

  static StyledUl = styled.ul`
    box-sizing: border-box;
    width: ${props => props.width}px;
    list-style: none;
    margin: 0;
    padding: 0;
  `;

  static StyledLi = styled.li`
    box-sizing: border-box;
    height: ${props => props.height}px;
    border: 1px solid #ccc;
    padding: 5px 10px;

    &:not(:first-child) {
      border-top: 0;
      display: flex;
      align-items: center;
    }
  `;

  render () {
    return (
      <Downshift
        onChange={selection => this.props.onChange(selection)}
        itemToString={item => (item ? item[this.props.searchKey] : '')}
      >
        {({
          getInputProps,
          getItemProps,
          getLabelProps,
          getMenuProps,
          isOpen,
          inputValue,
          getRootProps
        }) => (
          <Select.StyledContainer
            {...getRootProps({ refKey: 'downshift' })}
            className={this.props.class}
          >
            <Select.StyledLabel {...getLabelProps()}>
              {this.props.placeholder}
            </Select.StyledLabel>
            <Select.StyledInput
              loading={this.props.loading}
              height={this.props.height}
              width={this.props.width}
              {...getInputProps({ disabled: this.props.loading })}
            />
            <Select.StyledMenu {...getMenuProps()} width={this.props.width}>
              {isOpen
                ? this.props.data
                  .filter(
                    item =>
                      !inputValue ||
                        item[this.props.searchKey].includes(inputValue)
                  )
                  .map((item, index) => (
                    <Select.StyledLi
                      {...getItemProps({
                        key: item[this.props.searchKey],
                        index,
                        item
                      })}
                      height={this.props.height}
                    >
                      {item[this.props.searchKey]}
                    </Select.StyledLi>
                  ))
                : null}
            </Select.StyledMenu>
          </Select.StyledContainer>
        )}
      </Downshift>
    )
  }
}

export default Select
