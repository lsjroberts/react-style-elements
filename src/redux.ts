import { ReactElement } from "react";
import { connect } from "react-redux";
import { identity } from "lodash";

import { StyleSheet, Layout, Element } from "./internal";
import { layout } from "./elements";

export function connectedLayout(
  styleSheet: StyleSheet,
  callback: (props: object) => Layout | Element
): ReactElement<any> {
  return connect(state => ({ state }))(props =>
    layout(styleSheet, callback(props))
  );
}
