import React from 'react'
import { render, cleanup, fireEvent } from '@testing-library/react'
// this adds custom jest matchers from jest-dom
import '@testing-library/jest-dom/extend-expect'

import ReactSearchBox from '../../../'

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
      <ReactSearchBox placeholder="Put some text in here!" />
    )
    const inputNode = getByPlaceholderText('Put some text in here!')

    expect(inputNode).toBeInTheDocument()
  })

  test('should be rendered by default with the supplied props  ', () => {
    const { getByPlaceholderText } = render(
      <ReactSearchBox placeholder="Put some text in here!" />
    )
    const inputNode = getByPlaceholderText('Put some text in here!')

    expect(inputNode.value).toEqual('')
  })

  test('value should change when the onChange event is fired', () => {
    const { getByPlaceholderText } = render(
      <ReactSearchBox placeholder="Put some text in here!" />
    )
    const inputNode = getByPlaceholderText('Put some text in here!')

    fireEvent.change(inputNode, {
      target: { value: 'This is the text which I typed in it!' },
    })

    expect(inputNode.value).toEqual('This is the text which I typed in it!')
  })

  test('should focus on the input if autoFocus prop is true', () => {
    const { getByPlaceholderText } = render(
      <ReactSearchBox placeholder="Put some text in here!" autoFocus />
    )
    const inputNode = getByPlaceholderText('Put some text in here!')

    expect(inputNode).toHaveFocus()
  })

  test("shouldn't focus on the input if autoFocus prop is false/not passed", () => {
    const { getByPlaceholderText } = render(
      <ReactSearchBox placeholder="Put some text in here!" />
    )
    const inputNode = getByPlaceholderText('Put some text in here!')

    expect(inputNode).not.toHaveFocus()
  })

  test('should trigger onFocus callback if the input is focussed', () => {
    const onFocus = jest.fn()
    const { getByPlaceholderText } = render(
      <ReactSearchBox
        placeholder="Put some text in here!"
        autoFocus
        onFocus={onFocus}
      />
    )
    const inputNode = getByPlaceholderText('Put some text in here!')

    expect(onFocus).toHaveBeenCalledTimes(1)
  })

  test("shouldn't trigger onFocus callback if the input is not in focus", () => {
    const onFocus = jest.fn()
    const { getByPlaceholderText } = render(
      <ReactSearchBox placeholder="Put some text in here!" onFocus={onFocus} />
    )
    const inputNode = getByPlaceholderText('Put some text in here!')

    expect(onFocus).toHaveBeenCalledTimes(0)
  })

  test('shouldn trigger onChange callback if the value of the input box changes', () => {
    const onChange = jest.fn()
    const { getByPlaceholderText } = render(
      <ReactSearchBox
        placeholder="Put some text in here!"
        onChange={onChange}
      />
    )
    const inputNode = getByPlaceholderText('Put some text in here!')

    fireEvent.change(inputNode, {
      target: { value: 'Doe' },
    })

    expect(onChange).toHaveBeenCalledTimes(1)
  })

  test("shouldn't trigger onChange callback if the value of the input box doesn't change", () => {
    const onChange = jest.fn()
    const { getByPlaceholderText } = render(
      <ReactSearchBox
        placeholder="Put some text in here!"
        onChange={onChange}
      />
    )
    const inputNode = getByPlaceholderText('Put some text in here!')

    expect(onChange).toHaveBeenCalledTimes(0)
  })
})
