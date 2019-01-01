import React, { Component } from 'react'

class Jumbotron extends Component {
  render() {
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
}

export default Jumbotron
