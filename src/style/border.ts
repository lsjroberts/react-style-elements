import { StyleProp } from "../internal";

export function rounded(radius: number): StyleProp {
  return ["border-radius", `${radius}px`];
}
