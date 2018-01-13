import { ReactElement, createElement } from "react";
import { partial } from "lodash";

import {
  Attribute,
  Layout,
  Element,
  Row,
  Column,
  StyleSheet,
  styleAttrs,
  normalized
} from "./internal";

// -- Basic

function single(
  type: string,
  style: string,
  attrs: Array<Attribute>,
  child: Layout | Element | string
): Element {
  return createElement(type, {
    style: {
      ...styleAttrs(attrs)
    },
    className: ["el", style].filter(Boolean).join(" "),
    children: [child]
  });
}

export const el = partial(single, "div");

export function empty() {
  return createElement("span");
}

// -- Text

export function text(t: string): string {
  return t;
}

export const h1 = partial(single, "h1");
export const h2 = partial(single, "h2");
export const h3 = partial(single, "h3");
export const h4 = partial(single, "h4");
export const h5 = partial(single, "h5");
export const h6 = partial(single, "h6");

// -- Layout

export function layout(
  styleSheet: StyleSheet,
  element: Element | Layout
): ReactElement<any> {
  const styles = styleSheet.styles
    .map(
      ([index, props]) =>
        `.${styleSheet.classes[index]} { ${props
          .map(([key, value]) => `${key}: ${value};`)
          .join(" ")} }`
    )
    .join(" ");

  return createElement("div", { className: "style-elements" }, [
    createElement("style", {
      dangerouslySetInnerHTML: { __html: `${normalized} ${styles}` }
    }),
    element
  ]);
}

export function row(
  style: string,
  attrs: Array<Attribute>,
  children: Array<Layout | Element | string>
): Row {
  return createElement("div", {
    style: {
      ...styleAttrs(attrs),
      display: "flex",
      flexDirection: "row",
      flexWrap: "nowrap"
    },
    className: ["el", style].filter(Boolean).join(" "),
    children
  });
}

export function wrappedRow(
  style,
  attrs: Array<Attribute>,
  children: Array<Layout | Element | string>
): Row {
  return createElement("div", {
    style: {
      ...styleAttrs(attrs),
      display: "flex",
      flexDirection: "row",
      flexWrap: "wrap"
    },
    className: ["el", style].filter(Boolean).join(" "),
    children
  });
}

export function column(
  style: string,
  attrs: Array<Attribute>,
  children: Array<Layout | Element | string>
): Column {
  return createElement("div", {
    style: {
      ...styleAttrs(attrs),
      display: "flex",
      flexDirection: "column",
      flexWrap: "nowrap"
    },
    className: ["el", style].filter(Boolean).join(" "),
    children
  });
}
