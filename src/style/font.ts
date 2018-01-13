import { StyleProp } from "../internal";

type FontName = string;

export function size(px: number): StyleProp {
  return ["font-size", `${px}px`];
}

export function typeface(fonts: Array<FontName>): StyleProp {
  return ["font-family", fonts.join(", ")];
}

export function font(name: string): FontName {
  return name;
}
