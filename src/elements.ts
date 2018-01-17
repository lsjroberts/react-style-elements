import { Children, ReactElement, createElement } from "react";
import { merge, omit, partial } from "lodash";

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
export const navigation = partial(single, "nav");
export const header = partial(single, "header");
export const footer = partial(single, "footer");
export const link = partial(single, "a");
export const paragraph = partial(single, "p");

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
  const styles = styleSheet
    .map(
      ({ name, props }) =>
        `.${name}{${props.map(([key, value]) => `${key}:${value};`).join("")}}`
    )
    .join("");

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
  const transformedAttrs = transformAttrs(attrs);
  const spacedChildren = spaceRowChildren(transformedAttrs.spacing, children);
  return createElement(
    "div",
    merge(omit(transformAttrs(attrs), "spacing"), {
      style: {
        display: "flex",
        flexDirection: "row",
        flexWrap: "nowrap"
      },
      className: ["el", style].filter(Boolean).join(" ")
    }),
    spacedChildren
  );
}

export function wrappedRow(
  style,
  attrs: Array<Attribute>,
  children: Array<Layout | Element | string>
): Row {
  const transformedAttrs = transformAttrs(attrs);
  const spacedChildren = spaceRowChildren(transformedAttrs.spacing, children);
  return createElement(
    "div",
    merge(
      omit(transformAttrs(attrs), "spacing"),
      {
        style: {
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap"
        },
        className: ["el", style].filter(Boolean).join(" ")
      },
      spacedChildren
    )
  );
}

function spaceRowChildren(spacing, children) {
  if (!spacing) {
    return children;
  }

  return Children.map(children, (child, index) => {
    let style = {
      marginLeft: `${spacing.xy / 2}px`,
      marginRight: `${spacing.xy / 2}px`
    };

    if (index === 0) {
      style.marginLeft = null;
    }

    if (index === children.length - 1) {
      style.marginRight = null;
    }

    return createElement(
      "div",
      {
        style
      },
      child
    );
  });
}

export function column(
  style: string,
  attrs: Array<Attribute>,
  children: Array<Layout | Element | string>
): Column {
  const transformedAttrs = transformAttrs(attrs);
  const spacedChildren = spaceColumnChildren(
    transformedAttrs.spacing,
    children
  );
  return createElement(
    "div",
    merge(omit(transformAttrs(attrs), "spacing"), {
      style: {
        display: "flex",
        flexDirection: "column",
        flexWrap: "nowrap"
      },
      className: ["el", style].filter(Boolean).join(" ")
    }),
    spacedChildren
  );
}

function spaceColumnChildren(spacing, children) {
  if (!spacing) {
    return children;
  }

  return Children.map(children, (child, index) => {
    let style = {
      marginTop: `${spacing.xy / 2}px`,
      marginBottom: `${spacing.xy / 2}px`
    };

    if (index === 0) {
      style.marginTop = null;
    }

    if (index === children.length - 1) {
      style.marginBottom = null;
    }

    return createElement(
      "div",
      {
        style
      },
      child
    );
  });
}
