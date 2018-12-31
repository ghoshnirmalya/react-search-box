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

  navbarNode = () => {
    return (
      <div className="navbar-container">
        <ul>
          <li>
            <a href="#home">Home</a>
          </li>
          <li>
            <a href="#props">Props</a>
          </li>
        </ul>
      </div>
    )
  }

  jumbotronNode = () => {
    return (
      <div className="jumbotron-container">
        <div className="title">React Search Box</div>
        <div className="sub-title">An autocomplete search box for ReactJS</div>
        <a
          href="https://github.com/ghoshnirmalya/react-search-box"
          className="button"
        >
          Install from Github
        </a>
      </div>
    )
  }

  reactSearchBoxNode = () => {
    return (
      <div className="react-search-box-container">
        <h2 className="title">Example usage</h2>
        <ReactSearchBox
          placeholder="Search for John, Jane or Mary"
          data={this.data}
          callback={record => console.log(record)}
        />
      </div>
    )
  }

  render() {
    return (
      <div className="layout-container">
        {this.navbarNode()}
        {this.jumbotronNode()}
        {this.reactSearchBoxNode()}
      </div>
    )
  }
}
