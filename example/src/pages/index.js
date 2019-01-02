import React, { Component, Fragment } from 'react'
import ReactSearchBox from 'react-search-box'
import Prism from 'prismjs'

import Jumbotron from '../components/jumbotron'

import data from '../static/data.json'

class IndexPage extends Component {
  componentDidMount() {
    Prism.highlightAll()
  }

  reactSearchBoxNode = () => {
    return (
      <div className="react-search-box-container">
        <ReactSearchBox
          placeholder="Search for John, Jane or Mary"
          data={data}
          onSelect={record => console.log(record)}
          onFocus={() => {
            console.log('This function is called when is focussed')
          }}
        />
      </div>
    )
  }

  render() {
    return (
      <Fragment>
        <Jumbotron />
        <div className="page-container">
          <section className="section">
            <h2>Getting Started</h2>
            <div>
              First, you need to install this plugin:
              <pre>
                <code className="language-shell">
                  {`
  npm i react-search-box --save
                  `}
                </code>
              </pre>
              If you prefer to use yarn, you can do:
              <pre>
                <code className="language-shell">
                  {`
  yarn add react-search-box
                  `}
                </code>
              </pre>
              Then, you can define the plugin in your component:
              <pre>
                <code className="language-javascript">
                  {`
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
        <ReactSearchBox
          placeholder="Placeholder"
          value="Doe"
          data={this.data}
          callback={record => console.log(record)}
        />
      )
    }
  }
                  `}
                </code>
              </pre>
              That is all that you need to use react-search-box.
            </div>
          </section>
          <section className="section">
            <h2>Demo</h2>
            <div>{this.reactSearchBoxNode()}</div>
          </section>
          <section className="section">
            <h2>Basic Props</h2>
            <div>
              <p>
                <b>placeholder</b> - The placeholder text for the input box.
              </p>
              <p>
                <b>data</b> - An array of objects which acts as teh source of
                data for the dropdown. This prop is required.
              </p>
              <p>
                <b>onSelect</b> - A function which acts as a callback when any
                record is selected. It is triggered once a dropdown item is
                clicked.
              </p>
              <p>
                <b>autoFocus</b> - Focus on the input box once the component is
                mounted.
              </p>
              <p>
                <b>onFocus</b> - A function which acts as a callback when the
                input is focussed.
              </p>
            </div>
          </section>
          <section className="section">
            <h2>License</h2>
            <div>MIT Licensed. Copyright (c) Nirmalya Ghosh 2019.</div>
          </section>
        </div>
      </Fragment>
    )
  }
}

export default IndexPage
