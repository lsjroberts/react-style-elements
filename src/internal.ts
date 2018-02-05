import { Component, ReactElement, createElement } from "react";
import {
  fromPairs,
  groupBy,
  map,
  flatten,
  mapValues,
  merge,
  omit,
  zipObject
} from "lodash";

// -- Element

export type Attribute = RootAttribute | StyleAttribute | SpacingAttribute;
export interface RootAttribute {
  key: string;
  value: string | number | Function;
  kind: "root";
}
export interface StyleAttribute {
  key: string;
  value: string;
  kind: "style";
}
export interface SpacingAttribute {
  key: "xy" | "x" | "y";
  value: number;
  kind: "spacing";
}
export type Element = ReactElement<any>;
export type Layout = Row | Column;
export type Row = ReactElement<any>;
export type Column = ReactElement<any>;

export function single(
  type: string,
  style: string,
  attrs: Array<Attribute>,
  child: Layout | Element | string
): Element {
  return createElement(
    type,
    merge(transformAttrs(attrs), {
      className: ["el", style].filter(Boolean).join(" ")
    }),
    child
  );
}

export function multi(
  type: string,
  style: string,
  attrs: Array<Attribute>,
  children: Array<Layout | Element | string>
): Element {
  return createElement(
    type,
    merge(transformAttrs(attrs), {
      className: ["el", style].filter(Boolean).join(" ")
    }),
    children
  );
}

type TransformedAttributes = {
  root?: object;
  style?: object;
  spacing?: { xy?: number; x?: number; y?: number };
};
export function transformAttrs(
  attrs: Array<Array<Attribute> | Attribute>
): TransformedAttributes {
  const groupedAttrs = mapValues(groupBy(flatten(attrs), "kind"), group =>
    zipObject(map(group, "key"), map(group, "value"))
  );
  return merge(groupedAttrs.root, omit(groupedAttrs, "root"));
}

// -- Style

export const normalized =
  "html{-ms-text-size-adjust:100%;-webkit-text-size-adjust:100%;margin:0;padding:0;border:0}body{margin:0}.style-elements{display:block;position:relative;margin:0;padding:0;border:0;font-size:100%;font:inherit;box-sizing:border-box;line-height:1.2}.el{display:block;position:relative;margin:0;padding:0;border:0;border-style:solid;font-size:100%;font:inherit;box-sizing:border-box}em.el{font-style:italic}b.el,strong.el{font-weight:bolder}strike.el{text-decoration:line-through}u.el{text-decoration:underline}a.el{text-decoration:none;color:inherit}img.el{border-style:none}sub.el,sup.el{font-size:75%;line-height:0;position:relative;vertical-align:baseline}sub.el{bottom:-0.25em}sup.el{top:-0.5em}";

export type StyleSheet = Array<ResolvedStyle>;

export interface Classes {
  [name: string]: string;
}

export interface ResolvedStyle {
  name: string;
  props: Array<ResolvedStyleProp>;
}

export interface Style {
  name: string;
  props: Array<StyleProp>;
}

export type StyleProp = () => ResolvedStyleProp | ResolvedStyleProp;
export type ResolvedStyleProp = [string, string];
