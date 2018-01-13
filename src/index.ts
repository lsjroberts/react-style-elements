import { Component, ReactElement, createElement } from "react";
import { fromPairs, merge } from "lodash";

// -- Internal

type Attribute = [string, string | number];
type Layout = Row | Column;

class Element extends Component {
  type: string;

  constructor(type, attrs, child) {
    const props = { ...attrsToReactProps(attrs), children: [child] };
    super(props);
    this.type = type;
  }

  render() {
    return createElement(this.type, this.props);
  }
}

class Row extends Component {
  constructor(attrs, children, additionalProps = {}) {
    const props = merge(
      {
        children,
        style: {
          display: "flex",
          flexDirection: "row",
          flexWrap: "nowrap"
        }
      },
      attrsToReactProps(attrs),
      additionalProps
    );
    super(props);
  }

  render() {
    return createElement("div", this.props);
  }
}

class Column extends Component {
  constructor(attrs, children) {
    const props = { ...attrsToReactProps(attrs), children };
    super(props);
  }

  render() {
    return createElement("div", this.props);
  }
}

// -- Basic

export function el(
  style,
  attrs: Array<Attribute>,
  child: Layout | Element | string
): Element {
  return new Element("div", attrs, child);
}

export function empty() {
  return new Element("span", null, null);
}

// -- Text

export function text(t: string): string {
  return t;
}

export function h1(
  style,
  attrs: Array<Attribute>,
  child: Element | string
): Element {
  return new Element("h1", attrs, child);
}

// -- Layout

export function layout(
  styleSheet: StyleSheet,
  element: Element | Layout
): ReactElement<any> {
  const styles = styleSheet.styles
    .map(
      ([index, props]) =>
        `.${styleSheet.stylesType[index]} { ${props
          .map(([key, value]) => `${key}: ${value};`)
          .join(" ")} }`
    )
    .join(" ");

  return createElement(
    "div",
    [],
    [
      createElement("style", {
        dangerouslySetInnerHTML: { __html: styles }
      }),
      element
    ]
  );
}

export function row(
  style,
  attrs: Array<Attribute>,
  children: Array<Layout | Element | string>
): Row {
  return new Row(attrs, children);
}

export function wrappedRow(
  style,
  attrs: Array<Attribute>,
  children: Array<Layout | Element | string>
): Row {
  return new Row(attrs, children, {
    style: {
      flexWrap: "wrap"
    }
  });
}

// -- Attributes

function attrsToReactProps(attrs: Array<Attribute>) {
  return fromPairs(attrs);
}

export function padding(p: number): Attribute {
  return ["padding", `${p}px`];
}

// -- Style

interface StyleSheet {
  stylesType: any;
  styles: Array<Style>;
}
type Style = [string, Array<StyleProp>];
type StyleProp = [string, string];

export function styleSheet(stylesType, styles): StyleSheet {
  return { stylesType, styles };
}

export function style(name, props: Array<StyleProp>): Style {
  return [name, props];
}

interface ColorProp {
  r: number;
  g: number;
  b: number;
  a?: number;
}

export const Color = {
  text(color: ColorProp): StyleProp {
    if (color.a) {
      return ["color", `rgba(${color.r}, ${color.g}, ${color.b}, ${color.a})`];
    }
    return ["color", `rgb(${color.r}, ${color.g}, ${color.b})`];
  },
  rgb(r, g, b): ColorProp {
    return { r, g, b };
  }
};

type FontName = string;

export const Font = {
  size(px: number): StyleProp {
    return ["font-size", `${px}px`];
  },
  typeface(fonts: Array<FontName>): StyleProp {
    return ["font-family", fonts.join(", ")];
  },
  font(name: string): FontName {
    return name;
  }
};
