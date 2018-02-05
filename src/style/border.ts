import { ResolvedStyleProp } from "../internal";

export function rounded(radius: number): ResolvedStyleProp {
  return ["border-radius", `${radius}px`];
}
