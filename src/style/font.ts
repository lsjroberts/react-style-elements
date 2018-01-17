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

export function center(): StyleProp {
  return ["text-align", "center"];
}

export function alignLeft(): StyleProp {
  return ["text-align", "left"];
}

export function alignRight(): StyleProp {
  return ["text-align", "right"];
}

export function weight(weight: number): StyleProp {
  return ["font-weight", `${weight}`];
}
