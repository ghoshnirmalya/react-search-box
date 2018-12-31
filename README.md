# react-search-box

An autocomplete search box built with and for React.

<!-- prettier-ignore-start -->
[![Greenkeeper]][greenkeeper]
[![Build Status][build-badge]][build]
[![downloads][downloads-badge]][npmtrends]
[![MIT License][license-badge]][license]

[![PRs Welcome][prs-badge]][prs]
<!-- prettier-ignore-end -->

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Installation

```
npm i react-search-box --save
```

If you prefer to use `yarn`, you can do:

```
yarn add react-search-box
```

### Usage

```
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

```

## Props

- `placeholder` - The placeholder text for the input box.
- `data` - An array of objects which acts as teh source of data for the dropdown. This prop is required.
- `callback` - A function which acts as a callback when any record is selected. It is triggered once a dropdown item is clicked.

## Built With

- [React](https://reactjs.org/) - A JavaScript library for building user interfaces
- [Jest](https://jestjs.io/) - Delightful JavaScript Testing
- [react-testing-library](https://github.com/kentcdodds/react-testing-library) - Simple and complete React DOM testing utilities that encourage good testing practices.
- [Fuse](http://fusejs.io/) - Lightweight fuzzy-search library. Zero dependencies.
- [styled components](https://www.styled-components.com/) - Visual primitives for the component age.

## License

MIT Licensed. Copyright (c) Nirmalya Ghosh 2019.

<!--
Links:
-->

<!-- prettier-ignore-start -->

[greenkeeper]: https://badges.greenkeeper.io/ghoshnirmalya/react-search-box.svg
[npm]: https://www.npmjs.com/
[node]: https://nodejs.org
[build-badge]: https://img.shields.io/travis/ghoshnirmalya/react-search-box.svg?style=flat-square
[build]: https://travis-ci.org/ghoshnirmalya/react-search-box.svg?branch=master
[downloads-badge]: https://img.shields.io/npm/dm/react-search-box.svg?style=flat-square
[npmtrends]: https://www.npmtrends.com/react-search-box
[license-badge]: https://img.shields.io/npm/l/react-search-box.svg?style=flat-square
[license]: https://github.com/ghoshnirmalya/react-search-box/blob/master/LICENSE
[prs-badge]: https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square
[prs]: http://makeapullrequest.com

<!-- prettier-ignore-end -->
