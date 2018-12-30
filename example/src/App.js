import React, { Component } from 'react'

import ExampleComponent from 'react-search-box'

export default class App extends Component {
  render() {
    return (
      <div className="container">
        <ExampleComponent placeholder="Placeholder" value="Value" />
      </div>
    )
  }
}
