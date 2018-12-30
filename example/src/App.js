import React, { Component } from 'react'

import ReactSearchBox from 'react-search-box'

export default class App extends Component {
  data = [
    {
      key: 'john',
      value: 'John Doe',
    },
    {
      key: 'jane',
      value: 'Jane Doe',
    },
    {
      key: 'Mary Phillips',
      value: 'mary',
    },
    {
      key: 'Robert',
      value: 'robert',
    },
    {
      key: 'Karius',
      value: 'karius',
    },
  ]

  render() {
    return (
      <div className="container">
        <ReactSearchBox
          placeholder="Placeholder"
          value="Doe"
          data={this.data}
        />
      </div>
    )
  }
}
