![react search box](https://user-images.githubusercontent.com/6391763/50571850-21a4f080-0dda-11e9-9370-ac16c4e93746.png)

<!-- prettier-ignore-start -->
[![Greenkeeper]][greenkeeper]
[![Build Status][build-badge]][build]
[![downloads][downloads-badge]][npmtrends]
[![MIT License][license-badge]][license]
[![PRs Welcome][prs-badge]][prs]
<!-- prettier-ignore-end -->

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
- `data` - An array of objects which acts as the source of data for the dropdown. This prop is required.
- `fuseConfigs` - Configs to override default Fuse configs.
- `autoFocus` - Focus on the input box once the component is mounted.
- `onSelect` - A function which acts as a callback when any record is selected. It is triggered once a dropdown item is clicked.
- `onFocus` - A function which acts as a callback when the input is focussed.
- `onChange` - A function which acts as a callback when the input value is changed.
- `inputBoxFontColor` - Color of the text in the input box.
- `inputBoxBorderColor` - Color of the border of the input box.
- `inputBoxFontSize` - Size of the font of the input box.
- `inputBoxHeight` - Height of the input box.
- `dropDownHoverColor` - Background color on hover of the dropdown list items.
- `dropDownBorderColor` - Border color of the dropdown.

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
