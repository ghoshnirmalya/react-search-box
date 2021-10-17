![react search box](https://user-images.githubusercontent.com/6391763/50571850-21a4f080-0dda-11e9-9370-ac16c4e93746.png)

[![Edit react-search-box-example (CRA)](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/react-search-box-example-cra-17ml6?fontsize=14&hidenavigation=1&theme=dark)

### Installation

```sh
npm i react-search-box --save
```

If you prefer to use `yarn`, you can do:

```sh
yarn add react-search-box
```

### Usage

```js
import React, { Component } from "react";
import ReactSearchBox from "react-search-box";

export default class App extends Component {
  data = [
    {
      key: "john",
      value: "John Doe",
    },
    {
      key: "jane",
      value: "Jane Doe",
    },
    {
      key: "mary",
      value: "Mary Phillips",
    },
    {
      key: "robert",
      value: "Robert",
    },
    {
      key: "karius",
      value: "Karius",
    },
  ];

  render() {
    return (
      <ReactSearchBox
        placeholder="Placeholder"
        value="Doe"
        data={this.data}
        callback={(record) => console.log(record)}
      />
    );
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
- `inputBoxBackgroundColor` - Background color of the input box.
- `dropDownHoverColor` - Background color on hover of the dropdown list items.
- `dropDownBorderColor` - Border color of the dropdown.

## Built With

- [React](https://reactjs.org/) - A JavaScript library for building user interfaces
- [Fuse](http://fusejs.io/) - Lightweight fuzzy-search library. Zero dependencies.
- [styled components](https://www.styled-components.com/) - Visual primitives for the component age.

## License

MIT Licensed. Copyright (c) Nirmalya Ghosh 2021.
