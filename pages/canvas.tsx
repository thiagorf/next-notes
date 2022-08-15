import { NextPage } from "next";
import { useEffect, useLayoutEffect, useState } from "react";
import { CanvasBoard } from "../components/canvas-board";

function Canvas() {
  const [showCanvas, setShowCanvas] = useState(false);

  useEffect(() => {
    setShowCanvas(true);
  }, []);

  if (!showCanvas) {
    return null;
  }

  return <CanvasBoard />;
}

export default Canvas;
