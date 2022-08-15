import { MouseEvent, useLayoutEffect, useState } from "react";
import rough from "roughjs/bundled/rough.cjs.js";
///bundled/rough.cjs"
const generator = rough.generator();

const createElement = (
  x: number,
  y: number,
  x2: number,
  y2: number,
  tool: "line" | "rectangle" | "selection"
) => {
  const roughElement =
    tool === "line"
      ? generator.line(x, y, x2, y2)
      : generator.rectangle(x, y, x2 - x, y2 - y);

  return { x, y, x2, y2, roughElement };
};

export const CanvasBoard = () => {
  const [elements, setElements] = useState([]);
  const [drawing, setDrawing] = useState(false);
  const [tool, setTool] = useState<"line" | "rectangle" | "selection">("line");

  useLayoutEffect(() => {
    const canvas = document.getElementById("canvas") as HTMLCanvasElement;
    const context = canvas.getContext("2d");
    context.clearRect(0, 0, canvas.width, canvas.height);

    const roughCanvas = rough.canvas(canvas);

    elements.forEach(({ roughElement }) => roughCanvas.draw(roughElement));
    console.log(elements);
  }, [elements]);

  const handleMouseDown = (event: MouseEvent) => {
    setDrawing(true);

    const { clientX, clientY } = event;

    const element = createElement(clientX, clientY, clientX, clientY, tool);
    setElements((prevState) => [...prevState, element]);
  };

  const handleMouseMove = (event: MouseEvent) => {
    if (!drawing) return;

    const { clientX, clientY } = event;

    const index = elements.length - 1;
    const { x, y } = elements[index];

    const updatedElement = createElement(x, y, clientX, clientY, tool);

    const elementsCopy = [...elements];
    elementsCopy[index] = updatedElement;

    setElements(elementsCopy);

    console.log(`x: ${event.clientX}, y: ${event.clientY}`);
  };
  const handleMouseUp = () => {
    setDrawing(false);
  };

  return (
    <>
      <div>
        <input
          type="radio"
          id="selextion"
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
        >
          your browser does not support the canvas element
        </canvas>
      </div>
    </>
  );
};
