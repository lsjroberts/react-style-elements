import { ResolvedStyleProp } from "../internal";

type FontName = string;

export function size(px: number): ResolvedStyleProp {
  return ["font-size", `${px}px`];
}

export function typeface(fonts: Array<FontName>): ResolvedStyleProp {
  return ["font-family", fonts.join(", ")];
}

export function font(name: string): FontName {
  return name;
}

export function center(): ResolvedStyleProp {
  return ["text-align", "center"];
}

export function alignLeft(): ResolvedStyleProp {
  return ["text-align", "left"];
}

export function alignRight(): ResolvedStyleProp {
  return ["text-align", "right"];
}

export function weight(weight: number): ResolvedStyleProp {
  return ["font-weight", `${weight}`];
}

export function lineHeight(height: number): ResolvedStyleProp {
  return ["line-height", `${height}`];
}
