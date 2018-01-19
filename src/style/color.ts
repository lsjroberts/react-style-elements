import { ResolvedStyleProp } from "../internal";

interface ColorProp {
  r: number;
  g: number;
  b: number;
  a?: number;
}

// -- Style Props

export function background(color: ColorProp): ResolvedStyleProp {
  return ["background-color", rgbaText(color)];
}

export function text(color: ColorProp): ResolvedStyleProp {
  return ["color", rgbaText(color)];
}

// -- Color Props

export function rgb(r, g, b): ColorProp {
  return { r, g, b };
}

function rgbaText(color: ColorProp): string {
  if (color.a) {
    return `rgba(${color.r}, ${color.g}, ${color.b}, ${color.a})`;
  }
  return `rgb(${color.r}, ${color.g}, ${color.b})`;
}

export const white = rgb(255, 255, 255);
export const black = rgb(0, 0, 0);
