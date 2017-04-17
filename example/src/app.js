import React, { Component } from 'react';
import Search from 'react-search-box';

export default class App extends Component {
  constructor() {
    super();

    this.state = {
      data: [],
      loading: false
    };
  }

  componentDidMount() {
    this.setState({
      loading: true
    });

    fetch('https://api.github.com/search/repositories?q=topic:ruby+topic:rails')
    .then(res => res.json())
    .then(data => {
      this.setState({
        data: data.items,
        loading: false
      });
    })
  }

  handleChange(value) {
    console.log(value);
  }

  render() {
    if (this.state.loading) {
      return (
        <span>Loading</span>
      );
    }

    return (
      <div className="app">
        <Search
          data={ this.state.data }
          onChange={ this.handleChange }
          placeholder="Search for a string..."
          class="searcclass"
          searchKey="full_name"
        />
      </div>
    );
  }
}
