import { createElement } from "react";

import { Attribute, Element } from "../internal";

interface Checkbox {
  onChange: (value: boolean) => void;
  checked: boolean;
  label: Element | string;
}

export function checkbox(
  style: string,
  attrs: Array<Attribute>,
  checkbox: Checkbox
): Element {
  return createElement("label", {
    style: {
      display: "flex"
    },
    children: [
      createElement("input", {
        type: "checkbox",
        checked: checkbox.checked,
        onChange: evt => checkbox.onChange(evt.target.checked)
      }),
      checkbox.label
    ]
  });
}
