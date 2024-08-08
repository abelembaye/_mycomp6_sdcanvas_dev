const currentLine = new fabric.Line(
  [0.12 * canvasWidth, 0, 0.12 * canvasWidth, canvasHeight - 80],
  {
    strokeWidth: 2,
    fill: "",
    stroke: "red",
    originX: "center",
    originY: "center",
    selectable: false,
    evented: false,
    hasControls: false,
    lockMovementX: true,
    lockMovementY: true,
    lockRotation: true,
  }
);
objects.push(currentLine);
const endTriangle = new fabric.Triangle({
  left: 0.12 * canvasWidth,
  top: 10,
  originX: "center",
  originY: "center",
  strokeWidth: 3,
  stroke: "red",
  fill: "red",
  selectable: false,
  evented: false,
  width: 3 * 5,
  height: 3 * 5,
  angle: 0, // Convert the angle to degrees and add 90 to align with the line
});
objects.push(endTriangle);
const currentLine2 = new fabric.Line(
  [
    0.12 * canvasWidth,
    canvasHeight - 75,
    0.98 * canvasWidth,
    canvasHeight - 75,
  ],
  {
    strokeWidth: 3,
    fill: "",
    stroke: "red",
    originX: "center",
    originY: "center",
    selectable: false,
    evented: false,
    hasControls: false,
    lockMovementX: true,
    lockMovementY: true,
    lockRotation: true,
  }
);
objects.push(currentLine2);
const endTriangle2 = new fabric.Triangle({
  left: 0.98 * canvasWidth,
  top: canvasHeight - 75,
  originX: "center",
  originY: "center",
  strokeWidth: 3,
  stroke: "red",
  fill: "red",
  selectable: false,
  evented: false,
  width: 3 * 5,
  height: 3 * 5,
  angle: 90, // Convert the angle to degrees and add 90 to align with the line
});
objects.push(endTriangle2);
