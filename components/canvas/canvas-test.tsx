import { useLayoutEffect, useRef, useState, MouseEvent } from "react";
import rough from "roughjs/bundled/rough.cjs.js";
import { CanvasObject } from "./types";
import { useDraw } from "./useDraw";

const generator = rough.generator();

export const CanvasTest = () => {
  const { createElement } = useDraw();
  const [elements, setElements] = useState<CanvasObject[]>([]);
  const [isDrawing, setIsDrawing] = useState(false);

  const canvasRef = useRef<HTMLCanvasElement>();

  useLayoutEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const roughCanvas = rough.canvas(canvas);

    elements.forEach(({ roughElement }) => roughCanvas.draw(roughElement));
  }, [elements]);

  const handleMouseDown = (e: MouseEvent) => {
    const { clientX, clientY } = e;
    setIsDrawing(true);

    const element = createElement({
      x1: clientX,
      y1: clientY,
      x2: clientX,
      y2: clientY,
    });

    setElements((prevElements) => [...prevElements, element]);
  };
  const handleMouseMove = (e: MouseEvent<HTMLCanvasElement>) => {
    const { clientX, clientY } = e;
    if (isDrawing) {
      const copyElements = [...elements];
      const lastCreatedElementIndex = copyElements.length - 1;
      const { x1, y1 } = copyElements[lastCreatedElementIndex];

      copyElements[lastCreatedElementIndex] = createElement({
        x1,
        y1,
        x2: clientX,
        y2: clientY,
      });

      setElements(copyElements);
    }
  };
  const handleMouseUp = () => {
    console.log("done");
    setIsDrawing(false);
  };

  return (
    <div>
      <canvas
        ref={canvasRef}
        id="canvas"
        width={window.innerWidth}
        height={window.innerHeight}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
      ></canvas>
    </div>
  );
};
