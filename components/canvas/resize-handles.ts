export const renderRectangleHandles = (
  x1: number,
  y1: number,
  x2: number,
  y2: number,
  ctx: CanvasRenderingContext2D
) => {
  const size = 10;
  const width = x2 - x1;
  const height = y2 - y1;
  const amplify = size / 2;
  const outerRectWidth = width + amplify * 2;
  const outerRectHeight = height + amplify * 2;

  ctx.strokeRect(x1 - amplify, y1 - amplify, outerRectWidth, outerRectHeight);
  ctx.fillStyle = "#D3D3D3";
  //tl
  ctx.fillRect(x1 - size, y1 - size, size, size);
  ctx.strokeRect(x1 - size, y1 - size, size, size);
  //tr
  ctx.fillRect(x1 + width, y1 - size, size, size);
  ctx.strokeRect(x1 + width, y1 - size, size, size);
  //bl
  ctx.fillRect(x1 - size, y1 + height, size, size);
  ctx.strokeRect(x1 - size, y1 + height, size, size);
  //br
  ctx.fillRect(x1 + width, y1 + height, size, size);
  ctx.strokeRect(x1 + width, y1 + height, size, size);
};
