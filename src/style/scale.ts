import { partial } from "lodash";

export function modular(
  normal: number,
  ratio: number
): (scale: number) => number {
  return partial(resize, normal, ratio);
}

export function roundedModular(
  normal: number,
  ratio: number
): (scale: number) => number {
  return scale => Math.round(resize(normal, ratio, scale));
}

function resize(normal: number, ratio: number, scale: number): number {
  if (scale === 0 || scale === 1) {
    return normal;
  }
  if (scale < 0) {
    return shrink(ratio, scale * -1, normal);
  }
  return grow(ratio, scale - 1, normal);
}

function grow(ratio: number, i: number, size: number): number {
  if (i <= 0) {
    return size;
  }
  return grow(ratio, i - 1, size * ratio);
}

function shrink(ratio: number, i: number, size: number): number {
  if (i <= 0) {
    return size;
  }
  return shrink(ratio, i - 1, size / ratio);
}
