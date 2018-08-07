import React, { Component } from 'react';
import Search from 'react-search-box';

import './styles.css';

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

    const handleChange = (value) => {
      this.handleChange(value);
    }

    if (this.state.loading) {
      return (
        <div className="app__loading">Loading...</div>
      );
    }

    return (
      <div className="app">
        <div className="app__header">
          <div className="header__title">
            <h1>React Search Box</h1>
          </div>
          <div className="header__description">
            <p>An autocomplete search box for ReactJS.</p>
          </div>
        </div>
        <div className="app__content">
          <div className="content__search content__search--with-full_name">
            <div className="search__info">
              <h4>Basic Configuration</h4>
            </div>
            <div className="search__component">
              <Search
                data={ this.state.data }
                onChange={ handleChange }
                placeholder="Search for a string..."
                class="search-class"
                searchKey="full_name"
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
