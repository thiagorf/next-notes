import { useEffect, useState } from "react";
import { CanvasBoard } from "../components/canvas-board";
import { CanvasTest } from "../components/canvas/canvas-test";

function Canvas() {
  const [showCanvas, setShowCanvas] = useState(false);

  useEffect(() => {
    setShowCanvas(true);
  }, []);

  if (!showCanvas) {
    return null;
  }

  return (
    //<CanvasBoard />
    <CanvasTest />
  );
}

export default Canvas;
