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

### Installing

A step by step series of examples that tell you how to get a development env running

#### Step 1: Install the plugin

```
npm i react-search-box --save
```

If you prefer to use `yarn`, you can do:

```
yarn add react-search-box
```

#### Step 2: Import the plugin in your project

```
import ReactSearchBox from 'react-search-box'
```

#### Step 3: Define the plugin in your project

```
const data = [
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

<ReactSearchBox
  placeholder="Placeholder"
  value="Doe"
  data={data}
  callback={record => console.log(record)}
/>
```

## Running the tests

If you want to run tests, you can do:

```
yarn test
```

## Built With

- [React](https://reactjs.org/) - A JavaScript library for building user interfaces
- [Jest](https://jestjs.io/) - Delightful JavaScript Testing
- [react-testing-library](https://github.com/kentcdodds/react-testing-library) - Simple and complete React DOM testing utilities that encourage good testing practices.

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
