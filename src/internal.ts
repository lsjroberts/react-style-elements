import { Component, ReactElement, createElement } from "react";
import { fromPairs, merge } from "lodash";

// -- Element

export type Attribute = [string, string | number];
export type Element = ReactElement<any>;
export type Layout = Row | Column;
export type Row = ReactElement<any>;
export type Column = ReactElement<any>;

export function styleAttrs(attrs: Array<Attribute>) {
  return fromPairs(attrs);
}

// -- Style

export const normalized =
  "html{-ms-text-size-adjust:100%;-webkit-text-size-adjust:100%;margin:0;padding:0;border:0}body{margin:0}.style-elements{display:block;position:relative;margin:0;padding:0;border:0;font-size:100%;font:inherit;box-sizing:border-box;line-height:1.2}.el{display:block;position:relative;margin:0;padding:0;border:0;border-style:solid;font-size:100%;font:inherit;box-sizing:border-box}em.el{font-style:italic}b.el,strong.el{font-weight:bolder}strike.el{text-decoration:line-through}u.el{text-decoration:underline}a.el{text-decoration:none;color:inherit}img.el{border-style:none}sub.el,sup.el{font-size:75%;line-height:0;position:relative;vertical-align:baseline}sub.el{bottom:-0.25em}sup.el{top:-0.5em}";

export interface StyleSheet {
  classes: Classes;
  styles: Array<Style>;
}

export interface Classes {
  [name: string]: string;
}

export type Style = [string, Array<StyleProp>];
export type StyleProp = [string, string];
