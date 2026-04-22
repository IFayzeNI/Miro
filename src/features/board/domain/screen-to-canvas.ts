import type { CanvasRect } from "../hooks/use-canvas-rect";

export function pointOnScreenToCanvas(
  point: { x: number; y: number },
  canvasRect?: CanvasRect,
) {
  if (!canvasRect) return point;
  return { x: point.x - canvasRect.x, y: point.y - canvasRect.y };
}
