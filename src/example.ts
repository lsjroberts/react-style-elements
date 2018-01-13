import {
  layout,
  row,
  styleSheet,
  style,
  Color,
  Font,
  el,
  text,
  padding
} from "./index";

enum Styles {
  heading,
  content
}

const myStyleSheet = styleSheet(Styles, [
  style(Styles.heading, [
    Color.text(Color.rgb(0, 0, 255)),
    Font.size(28),
    Font.typeface([Font.font("Times"), Font.font("serif")])
  ]),
  style(Styles.content, [
    Color.text(Color.rgb(30, 30, 30)),
    Font.size(16),
    Font.typeface([Font.font("Helvetica"), Font.font("sans-serif")])
  ])
]);

const view = layout(
  myStyleSheet,
  row(
    null,
    [],
    [
      el(Styles.heading, [padding(10)], "Hello, World!"),
      el(
        Styles.content,
        [],
        "Duis mollis, est non commodo luctus, nisi erat porttitor ligula, " +
          "eget lacinia odio sem nec elit. Nulla vitae elit libero, a " +
          "pharetra augue."
      )
    ]
  )
);

console.log(JSON.stringify(view, null, 2));
