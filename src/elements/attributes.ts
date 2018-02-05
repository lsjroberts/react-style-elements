import { RootAttribute, StyleAttribute, SpacingAttribute } from "../internal";

// -- Util

export function ref(callback: Function): RootAttribute {
  return {
    key: "ref",
    value: callback,
    kind: "root"
  };
}

// -- Layout

export function center(): Array<StyleAttribute> {
  return [
    {
      key: "margin-left",
      value: "auto",
      kind: "style"
    },
    {
      key: "margin-right",
      value: "auto",
      kind: "style"
    }
  ];
}

export function alignRight(): StyleAttribute {
  return {
    key: "margin-left",
    value: "auto",
    kind: "style"
  };
}

export function maxWidth(w: number): StyleAttribute {
  return px("max-width", w);
}

export function padding(p: number): StyleAttribute {
  return px("padding", p);
}

export function paddingBottom(p: number): StyleAttribute {
  return px("padding-bottom", p);
}

export function paddingLeft(p: number): StyleAttribute {
  return px("padding-left", p);
}

export function paddingTop(p: number): StyleAttribute {
  return px("padding-top", p);
}

export function paddingRight(p: number): StyleAttribute {
  return px("padding-right", p);
}

export function paddingXY(x: number, y: number): StyleAttribute {
  return {
    key: "padding",
    value: `${y}px ${x}px`,
    kind: "style"
  };
}

export function spacing(spacing: number): SpacingAttribute {
  return {
    key: "xy",
    value: spacing,
    kind: "spacing"
  };
}

function px(key: string, value: number): StyleAttribute {
  return {
    key,
    value: `${value}px`,
    kind: "style"
  };
}

// -- Link

export function href(url: string): RootAttribute {
  return {
    key: "href",
    value: url,
    kind: "root"
  };
}
