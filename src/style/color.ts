import { StyleProp } from "../internal";

interface ColorProp {
  r: number;
  g: number;
  b: number;
  a?: number;
}

export function text(color: ColorProp): StyleProp {
  if (color.a) {
    return ["color", `rgba(${color.r}, ${color.g}, ${color.b}, ${color.a})`];
  }
  return ["color", `rgb(${color.r}, ${color.g}, ${color.b})`];
}

export function rgb(r, g, b): ColorProp {
  return { r, g, b };
}
