# React Style Elements

A partial port of the Elm library [style-elements][1] built upon React.

## Why?

It aims to provide a separation between layout and style, with a bonus of type safe styling and css classes.

## Examples

_Note: all examples are in typescript, see [without typescript][2]._

```ts
import ReactDOM from "react-dom";
import Style from "react-style-elements/style";
import Color from "react-style-elements/style/color";
import Font from "react-style-elements/style/font";
import Element, { el } from "react-style-elements/elements";
import Attributes from "react-style-elements/elements/attributes";

enum MyStyles {
  Title
}

const styleSheet = Style.styleSheet(MyStyles, [
  Style.style(MyStyles.Title, [
    Color.text(Color.rgb(30, 30, 30)),
    Color.background(Color.white),
    Font.size(28)
  ])
]);

const view = Element.layout(
  styleSheet,
  el(MyStyles.Title, [Attributes.padding(10)], "Hello!")
);

ReactDOM.render(document.getElementById("main"), view);
```

### Layouts

```ts
import { row, column } from "react-style-elements/elements";

const view = Element.layout(
  styleSheet,
  column(
    null,
    [Attributes.spacing(10)],
    [
      el(MyStyles.Title, [Attributes.padding(10)], "Hello!"),
      row(
        null,
        [Attributes.spacing(10)],
        [
          el(MyStyles.Content, [], "One"),
          el(MyStyles.Content, [], "Two"),
          el(MyStyles.Content, [], "Three")
        ]
    ]
  )
);
```

### App structure

```ts
// app.ts
import { layout, column, h1 } from "react-style-elements/elements";
import styleSheet from "./styles";
import example from "./views/example";

export default layout(
  styleSheet,
  column(Styles.App, [], [
    h1(Styles.Title, [], "Welcome"),
    example("World")
  ])
);
```

```ts
// views/example.ts
import { el, padding } from "react-style-elements/elements";
import { Styles } from "../styles";

export default (label) => (
  el(Styles.Example, [padding(10)], `Hello, ${label}!`)
);
```

```ts
// styles.ts
import { styleSheet, style } from "react-style-elements/style";
import { text, rgb } from "react-style-elements/style/color";
import { size, typeface, font } from "react-style-elements/style/font";

export enum Styles {
  App,
  Title,
  Example
};

export default styleSheet(Styles, [
  style(Styles.App, [
    text(rgb(30, 30, 30)),
    size(16),
    typeface(font("Helvetica"), font("sans-serif"))
  ]),
  style(Styles.Title, [
    size(28)
  ]),
  style(Styles.Example, [
    text(rgb(30, 120, 30))
  ])
]);
```

### Without typescript

The only difference required is to use the `classes()` function to create the styles enum.

```js
import { classes } from "react-style-elements/style";

const Styles = classes([
  'App',
  'Title',
  'Example'
]);
```

[1]: http://package.elm-lang.org/packages/mdgriffith/style-elements/latest/
[2]: #without-typescript
