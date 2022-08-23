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

type CanvasObject = CanvasElement & {
  roughElement: Drawable;
};

const generator = rough.generator();

const createElement = ({ id, x1, y1, x2, y2, type }: CanvasElement) => {
  const roughElement =
    type === "line"
      ? generator.line(x1, y1, x2, y2)
      : generator.rectangle(x1, y1, x2 - x1, y2 - y1);

  return { id, x1, y1, x2, y2, type, roughElement };
};

const nearPoint = (
  x: number,
  y: number,
  x1: number,
  y1: number,
  vertex: string
) => {
  return Math.abs(x - x1) < 5 && Math.abs(y - y1) < 5 ? vertex : null;
};

const positionWithinElement = (x: number, y: number, element: any) => {
  const { type, x1, x2, y1, y2 } = element;

  console.log("cursor", x, y);
  console.log("element", x1, y1);

  if (type === "rectangle") {
    const topLeft = nearPoint(x, y, x1, y1, "tl");
    const topRight = nearPoint(x, y, x2, y1, "tr");
    const bottomLeft = nearPoint(x, y, x1, y2, "bl");
    const bottomRight = nearPoint(x, y, x2, y2, "br");
    const inside = x >= x1 && x <= x2 && y >= y1 && y <= y2 ? "inside" : null;

    return topLeft || topRight || bottomLeft || bottomRight || inside;
  } else {
    const a = { x: x1, y: y1 };
    const b = { x: x2, y: y2 };
    const c = { x, y };

    const offset = distance(a, b) - (distance(a, c) + distance(b, c));
    const start = nearPoint(x, y, x1, y1, "start");
    const end = nearPoint(x, y, x2, y2, "end");
    const inside = Math.abs(offset) < 1 ? "inside" : null;

    return start || end || inside;
  }
};

const distance = (a: GridLocation, b: GridLocation) =>
  Math.sqrt(Math.pow(a.x - b.x, 2) + Math.pow(a.y - b.y, 2));

const getElementByPosition = (x: number, y: number, elements: any[]) => {
  return elements
    .map((element) => ({
      ...element,
      position: positionWithinElement(x, y, element),
    }))
    .find((element) => element.position !== null);
};

const adjustElementCoordenates = (element: CanvasObject) => {
  const { type, x1, y1, x2, y2 } = element;

  if (type === "rectangle") {
    const minX = Math.min(x1, x2);
    const maxX = Math.max(x1, x2);
    const minY = Math.min(y1, y2);
    const maxY = Math.max(y1, y2);

    return { x1: minX, y1: minY, x2: maxX, y2: maxY };
  } else {
    if (x1 < x2 || (x1 === x2 && y1 < y2)) {
      return { x1, y1, x2, y2 };
    } else {
      return { x1: x2, y1: y2, x2: x1, y2: y1 };
    }
  }
};

const cursorForPosition = (position: string) => {
  switch (position) {
    case "tl":
    case "br":
    case "start":
    case "end":
      return "nwse-resize";
    case "tr":
    case "bl":
      return "nesw-resize";
    default:
      return "move";
  }
};

export const CanvasBoard = () => {
  const [elements, setElements] = useState<CanvasObject[]>([]);
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
        const offsetX = clientX - element.x1;
        const offsetY = clientY - element.y1;

        setAction("moving");
        setSelectedElement({ ...element, offsetX, offsetY });
      }
    } else {
      const id = elements.length;

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

  const handleMouseMove = (event: MouseEvent<HTMLCanvasElement>) => {
    const { clientX, clientY } = event;

    if (tool === "selection") {
      const element = getElementByPosition(clientX, clientY, elements);

      event.currentTarget.style.cursor = element
        ? cursorForPosition(element.position)
        : "default";
    }

    if (action === "drawing") {
      const index = elements.length - 1;
      const { x1, y1 } = elements[index];

      updateElement({
        id: index,
        x1,
        y1,
        x2: clientX,
        y2: clientY,
        type: tool,
      });
    } else if (action === "moving") {
      const { id, x1, y1, x2, y2, type, offsetX, offsetY } = selectedElement;
      const width = x2 - x1;
      const height = y2 - y1;
      const newX1 = clientX - offsetX;
      const newY1 = clientY - offsetY;

      updateElement({
        id,
        x1: newX1,
        y1: newY1,
        x2: newX1 + width,
        y2: newY1 + height,
        type,
      });
    }
  };
  const handleMouseUp = () => {
    const index = elements.length - 1;
    const { id, type } = elements[index];
    if (action === "drawing") {
      const { x1, y1, x2, y2 } = adjustElementCoordenates(elements[index]);
      updateElement({ id, x1, y1, x2, y2, type });
    }
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
