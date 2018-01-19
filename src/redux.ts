import { ReactElement } from "react";
import { connect as connectRedux } from "react-redux";
import { identity } from "lodash";

import { StyleSheet, Layout, Element } from "./internal";
import { layout } from "./elements";

export function connectLayout(
  styleSheet: StyleSheet,
  callback: (props: object) => Layout | Element
): ReactElement<any> {
  return connectRedux(state => state)(props =>
    layout(styleSheet, callback(props))
  );
}

export function connect(
  callback: (props: object) => ReactElement<any>
): ReactElement<any> {
  return connectRedux(state => state)(props => callback(props));
}
