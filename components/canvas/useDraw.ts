import rough from "roughjs/bundled/rough.cjs.js";
import { CanvasObject, ElementCoordinates } from "./types";

const generator = rough.generator();

type UseDraw = {
  createElement: (coordinates: ElementCoordinates) => CanvasObject;
};

export const useDraw = (): UseDraw => {
  const createElement = ({ x1, y1, x2, y2 }: ElementCoordinates) => {
    const roughElement = generator.line(x1, y1, x2, y2);

    return { x1, y1, x2, y2, roughElement };
  };

  return { createElement };
};
