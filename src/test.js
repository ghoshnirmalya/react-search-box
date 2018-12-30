import React from 'react'
import { render, cleanup, fireEvent } from 'react-testing-library'
// this adds custom jest matchers from jest-dom
import 'jest-dom/extend-expect'

import ReactSearchBox from './'

// automatically unmount and cleanup DOM after the test is finished.
afterEach(cleanup)

const data = [
  {
    key: 'john',
    value: 'John Doe',
  },
  {
    key: 'jane',
    value: 'Jane Doe',
  },
  {
    key: 'mary',
    value: 'Mary Phillips',
  },
  {
    key: 'robert',
    value: 'Robert',
  },
  {
    key: 'karius',
    value: 'Karius',
  },
]

describe('Input Box', () => {
  test('should be present in the document', () => {
    const { getByPlaceholderText } = render(
      <ReactSearchBox
        value="Hello world"
        placeholder="Put some text in here!"
      />
    )

    const inputNode = getByPlaceholderText('Put some text in here!')

    expect(inputNode).toBeInTheDocument()
  })

  test('should be rendered by default with the supplied props  ', () => {
    const { getByPlaceholderText } = render(
      <ReactSearchBox
        value="Hello world"
        placeholder="Put some text in here!"
      />
    )

    const inputNode = getByPlaceholderText('Put some text in here!')

    expect(inputNode.value).toEqual('Hello world')
  })

  test('value should change when the onChange event is fired', () => {
    const { getByPlaceholderText } = render(
      <ReactSearchBox
        value="Hello world"
        placeholder="Put some text in here!"
      />
    )

    const inputNode = getByPlaceholderText('Put some text in here!')

    fireEvent.change(inputNode, {
      target: { value: 'This is the text which I typed in it!' },
    })

    expect(inputNode.value).toEqual('This is the text which I typed in it!')
  })
})

describe('Dropdown', () => {
  test('should render when there is a value in the input box', () => {
    const { container } = render(
      <ReactSearchBox
        value="Hello world"
        placeholder="Put some text in here!"
      />
    )

    const dropdownNodes = container.querySelectorAll(
      '.react-search-box-dropdown'
    )

    expect(dropdownNodes.length).toEqual(1)
  })

  test("shouldn't render when there is no value in the input box", async () => {
    const { container } = render(
      <ReactSearchBox value="" placeholder="Put some text in here!" />
    )

    const dropdownNodes = container.querySelectorAll(
      '.react-search-box-dropdown'
    )

    expect(dropdownNodes.length).toEqual(0)
  })

  test("should render matched items from the data array if any items matches with the input's value", () => {
    const { container, getByPlaceholderText } = render(
      <ReactSearchBox
        value="John"
        placeholder="Put some text in here!"
        data={data}
      />
    )

    let dropdownNodes = container.querySelectorAll(
      '.react-search-box-dropdown-list-item'
    )

    expect(dropdownNodes.length).toEqual(1)

    const inputNode = getByPlaceholderText('Put some text in here!')

    fireEvent.change(inputNode, {
      target: { value: 'Doe' },
    })

    dropdownNodes = container.querySelectorAll(
      '.react-search-box-dropdown-list-item'
    )

    expect(dropdownNodes.length).toEqual(2)
  })

  test('should update the value of the input box once clicked on any dropdown item', () => {
    const { getByPlaceholderText, getByText } = render(
      <ReactSearchBox
        value="Doe"
        placeholder="Put some text in here!"
        data={data}
      />
    )

    fireEvent.click(getByText('John Doe'))

    let inputNode = getByPlaceholderText('Put some text in here!')

    expect(inputNode.value).toEqual('John Doe')

    fireEvent.change(inputNode, {
      target: { value: 'Doe' },
    })

    fireEvent.click(getByText('Jane Doe'))

    inputNode = getByPlaceholderText('Put some text in here!')

    expect(inputNode.value).toEqual('Jane Doe')
  })

  test('should close the dropdown onClick of any dropdown item', () => {
    const { container, getByText } = render(
      <ReactSearchBox
        value="Doe"
        placeholder="Put some text in here!"
        data={data}
      />
    )

    fireEvent.click(getByText('John Doe'))

    const dropdownNodes = container.querySelectorAll(
      '.react-search-box-dropdown-list-item'
    )

    expect(dropdownNodes.length).toEqual(0)
  })

  test('should trigger the callback prop onClick of any dropdown item', () => {
    const handleClick = jest.fn()
    const { getByText } = render(
      <ReactSearchBox
        value="Doe"
        placeholder="Put some text in here!"
        data={data}
        callback={handleClick}
      />
    )

    fireEvent.click(getByText('John Doe'))

    expect(handleClick).toHaveBeenCalledTimes(1)
  })
})
