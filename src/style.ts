import { forOwn, fromPairs, map, merge } from "lodash";

import { Classes, Style, StyleSheet, StyleProp } from "./internal";

export function styleSheet(
  styles: Array<Style>,
  hash: Boolean = true
): () => StyleSheet {
  const styleClasses = classes(styles, hash);

  const styleSheet = () => styles;

  forOwn(styleClasses, (value, key) => {
    styleSheet[key] = value;
  });

  return styleSheet;
}

export function style(name, props: Array<StyleProp>): Style {
  return { name, props };
}

export function classes(styles: Array<Style>, hash: Boolean = true): Classes {
  return fromPairs(
    styles.map(style => {
      // TODO: add a hash of some sort on the class name to guard it from clashing
      // with external classes
      let newName = hash ? style.name : style.name;
      return [newName, newName];
    })
  );
}
