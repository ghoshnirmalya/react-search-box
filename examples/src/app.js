import React, { Component } from "react";
import SearchBox from "./playground";

class App extends Component {
  state = {
    data: [],
    loading: false
  };

  componentDidMount = () => {
    this.setState({
      loading: true
    });

    fetch("https://api.github.com/search/repositories?q=topic:ruby+topic:rails")
      .then(res => res.json())
      .then(data => {
        this.setState({
          data: data.items,
          loading: false
        });
      });
  };

  handleChange = selection => {
    selection ? console.log(selection.full_name) : console.log("reverted");
  };

  render() {
    return (
      <SearchBox
        data={this.state.data}
        onChange={this.handleChange}
        placeholder="Search for a string..."
        class="search-class"
        searchKey="full_name"
        loading={this.state.loading}
        width={300}
        height={40}
      />
    );
  }
}

export default App;
