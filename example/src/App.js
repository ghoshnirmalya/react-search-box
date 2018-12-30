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

  render() {
    return (
      <div className="container">
        <ReactSearchBox
          placeholder="Placeholder"
          value="Doe"
          data={this.data}
          callback={record => console.log(record)}
        />
      </div>
    )
  }
}
