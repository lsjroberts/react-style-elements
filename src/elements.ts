import { ReactElement, createElement } from "react";
import { merge, partial } from "lodash";

import {
  Attribute,
  Layout,
  Element,
  Row,
  Column,
  StyleSheet,
  normalized,
  single,
  transformAttrs
} from "./internal";

// -- Basic

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
  return createElement(
    "div",
    merge(transformAttrs(attrs), {
      style: {
        display: "flex",
        flexDirection: "row",
        flexWrap: "nowrap"
      },
      className: ["el", style].filter(Boolean).join(" "),
      children
    })
  );
}

export function wrappedRow(
  style,
  attrs: Array<Attribute>,
  children: Array<Layout | Element | string>
): Row {
  return createElement(
    "div",
    merge(transformAttrs(attrs), {
      style: {
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap"
      },
      className: ["el", style].filter(Boolean).join(" "),
      children
    })
  );
}

export function column(
  style: string,
  attrs: Array<Attribute>,
  children: Array<Layout | Element | string>
): Column {
  return createElement(
    "div",
    merge(transformAttrs(attrs), {
      style: {
        display: "flex",
        flexDirection: "column",
        flexWrap: "nowrap"
      },
      className: ["el", style].filter(Boolean).join(" "),
      children
    })
  );
}
