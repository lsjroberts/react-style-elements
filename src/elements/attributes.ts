import { Attribute } from "../internal";

export function padding(p: number): Attribute {
  return ["padding", `${p}px`];
}
