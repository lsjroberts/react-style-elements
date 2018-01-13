import { fromPairs, merge } from "lodash";

import { Classes, Style, StyleSheet, StyleProp } from "./internal";

export function styleSheet(classes: Classes, styles: Array<Style>): StyleSheet {
  return { classes, styles };
}

export function style(name, props: Array<StyleProp>): Style {
  return [name, props];
}

export function classes(names: Array<string>, hash: Boolean = true): Classes {
  return fromPairs(
    names.map(name => {
      // TODO: add a hash of some sort on the class name to guard it from clashing
      // with external classes
      let newName = hash ? name : name;
      return [name, name];
    })
  );
}
