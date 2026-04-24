import type { WindowPosition } from "../model/window-position";
import type { Point } from "./point";

export function pointOnScreenToCanvas(
  point: Point,
  windowPosition: WindowPosition,
  canvasRect?: Point,
) {
  if (!canvasRect) return point;
  return {
    x: point.x - canvasRect.x - windowPosition.x,
    y: point.y - canvasRect.y - windowPosition.y,
  };
}
