import { MouseEvent, useLayoutEffect, useRef, useState } from "react";
import rough from "roughjs/bundled/rough.cjs.js";
import { Drawable } from "roughjs/bin/core";
///bundled/rough.cjs"

type GridLocation = {
  x: number;
  y: number;
};

type CanvasElement = {
  id: number;
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  type: "line" | "rectangle" | "selection";
};

interface CanvasObject extends CanvasElement {
  roughElement: Drawable;
}

const generator = rough.generator();

const createElement = ({ id, x1, y1, x2, y2, type }: CanvasElement) => {
  const roughElement =
    type === "line"
      ? generator.line(x1, y1, x2, y2)
      : generator.rectangle(x1, y1, x2 - x1, y2 - y1);

  return { id, x1, y1, x2, y2, type, roughElement };
};

const isWithinElement = (x: number, y: number, element: any) => {
  const { type, x1, x2, y1, y2 } = element;

  if (type === "rectangle") {
    const minX = Math.min(x1, x2);
    const maxX = Math.max(x1, x2);
    const minY = Math.min(y1, y2);
    const maxY = Math.max(y1, y2);
    return x >= minX && x <= maxX && y >= minY && y <= maxY;
  } else {
    const a = { x: x1, y: y1 };
    const b = { x: x2, y: y2 };
    const c = { x, y };

    const offset = distance(a, b) - (distance(a, c) + distance(b, c));

    return Math.abs(offset) < 1;
  }
};

const distance = (a: GridLocation, b: GridLocation) =>
  Math.sqrt(Math.pow(a.x - b.x, 2) + Math.pow(a.y - b.y, 2));

const getElementByPosition = (x: number, y: number, elements: any[]) => {
  return elements.map((element) => isWithinElement(x, y, element));
};

export const CanvasBoard = () => {
  const [elements, setElements] = useState([]);
  const [selectedElement, setSelectedElement] = useState(null);
  const [action, setAction] = useState("none");
  const [tool, setTool] = useState<"line" | "rectangle" | "selection">("line");

  const canvasRef = useRef<HTMLCanvasElement>();

  useLayoutEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    context.clearRect(0, 0, canvas.width, canvas.height);

    const roughCanvas = rough.canvas(canvas);

    elements.forEach(({ roughElement }) => roughCanvas.draw(roughElement));
    console.log(elements);
  }, [elements]);

  const updateElement = ({ id, x1, y1, x2, y2, type }: CanvasElement) => {
    const updatedElement = createElement({ id, x1, y1, x2, y2, type });

    const elementsCopy = [...elements];
    elementsCopy[id] = updatedElement;

    setElements(elementsCopy);
  };

  const handleMouseDown = (event: MouseEvent) => {
    const { clientX, clientY } = event;

    if (tool === "selection") {
      const element = getElementByPosition(clientX, clientY, elements);
      if (element) {
        setAction("moving");
        setSelectedElement(element);
      }
    } else {
      const id = elements.length;
      console.log(clientX, clientY);

      const element = createElement({
        id,
        x1: clientX,
        y1: clientY,
        x2: clientX,
        y2: clientY,
        type: tool,
      });

      setElements((prevState) => [...prevState, element]);
      setAction("drawing");
    }
  };

  const handleMouseMove = (event: MouseEvent) => {
    if (action === "drawing") {
      const { clientX, clientY } = event;

      const index = elements.length - 1;
      const { x, y } = elements[index];

      console.log("mouse-move");

      updateElement({
        id: index,
        x1: x,
        y1: y,
        x2: clientX,
        y2: clientY,
        type: tool,
      });
    } else if (action === "moving") {
      const { id } = selectedElement;
    }
  };
  const handleMouseUp = () => {
    setAction("none");
    setSelectedElement(null);
  };

  return (
    <>
      <div>
        <input
          type="radio"
          id="selection"
          checked={tool === "selection"}
          onChange={() => setTool("selection")}
        />
        <label htmlFor="selection">Selection</label>

        <input
          type="radio"
          id="line"
          checked={tool === "line"}
          onChange={() => setTool("line")}
        />
        <label htmlFor="line">Line</label>

        <input
          type="radio"
          id="rectangle"
          checked={tool === "rectangle"}
          onChange={() => setTool("rectangle")}
        />
        <label htmlFor="rectangle">Rectangle</label>
      </div>
      <div>
        <canvas
          id="canvas"
          className="bg-gray-200"
          width={window.innerWidth}
          height={window.innerHeight}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          ref={canvasRef}
        >
          your browser does not support the canvas element
        </canvas>
      </div>
    </>
  );
};
