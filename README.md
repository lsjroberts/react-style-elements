# React Style Elements

A partial port of the Elm library [style-elements][1] built upon React.

## Why?

It aims to provide a separation between layout and style, with a bonus of type safe styling and css classes.

## Examples

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

[1]: http://package.elm-lang.org/packages/mdgriffith/style-elements/latest/
