import { Drawable } from "roughjs/bin/core";

export type CanvasObject = {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  roughElement: Drawable;
};

export type ElementCoordinates = Omit<CanvasObject, "roughElement">;
