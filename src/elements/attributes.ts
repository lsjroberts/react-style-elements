import { Attribute, AttributeParent } from "../internal";

// -- Util

export function ref(callback: Function): Attribute {
  return {
    key: "ref",
    value: callback,
    parent: AttributeParent.root
  };
}

// -- Layout

export function padding(p: number): Attribute {
  return {
    key: "padding",
    value: `${p}px`,
    parent: AttributeParent.style
  };
}
