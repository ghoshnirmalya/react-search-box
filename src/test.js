import React from 'react'
import { render, cleanup, fireEvent } from 'react-testing-library'
// this adds custom jest matchers from jest-dom
import 'jest-dom/extend-expect'

import ReactSearchBox from './'

// automatically unmount and cleanup DOM after the test is finished.
afterEach(cleanup)

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

    const dropdownNodes = container.querySelectorAll('.dropdown')
    expect(dropdownNodes.length).toBe(0)
  })

  test("shouldn't render when there is no value in the input box", async () => {
    const { container } = render(
      <ReactSearchBox value="" placeholder="Put some text in here!" />
    )

    const dropdownNodes = container.querySelectorAll('.dropdown')
    expect(dropdownNodes.length).toBe(0)
  })
})
