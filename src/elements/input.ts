import { createElement } from "react";
import { merge, noop } from "lodash";

import {
  Attribute,
  Element,
  Layout,
  single,
  transformAttrs
} from "../internal";

// -- Wrappers

interface Form {
  onSubmit: () => void;
}

export function form(
  style: string,
  attrs: Array<Attribute>,
  form: Form,
  child: Layout | Element
): Element {
  return createElement(
    "form",
    merge(transformAttrs(attrs), {
      onSubmit: evt => {
        evt.preventDefault();
        form.onSubmit();
      }
    }),
    child
  );
}

// -- Textual

interface Text {
  onChange: (value: string | number) => void;
  value: string | number | null;
  label: Element | string;
}

export function text(
  style: string,
  attrs: Array<Attribute>,
  input: Text = { onChange: noop, value: null, label: "" }
): Element {
  return createElement(
    "input",
    merge(transformAttrs(attrs), {
      onChange: evt => input.onChange(evt.target.value),
      value: input.value
    })
  );
}

// -- Controls

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
  return createElement(
    "label",
    merge(transformAttrs(attrs), {
      style: {
        display: "flex"
      }
    }),
    [
      createElement("input", {
        type: "checkbox",
        checked: checkbox.checked,
        onChange: evt => checkbox.onChange(evt.target.checked)
      }),
      checkbox.label
    ]
  );
}

// -- Buttons

interface Button {
  onPress: () => void;
  submit?: boolean;
}

export function button(
  style: string,
  attrs: Array<Attribute>,
  button: Button = { onPress: noop, submit: false },
  child: Element
): Element {
  return createElement(
    "button",
    merge(transformAttrs(attrs), {
      onClick: evt =>
        (<Button>button).onPress ? (<Button>button).onPress() : noop,
      type: (<Button>button).submit ? "submit" : null
    }),
    child
  );
}
