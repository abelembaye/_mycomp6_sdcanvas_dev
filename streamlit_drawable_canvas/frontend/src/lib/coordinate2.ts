import { fabric } from "fabric"
import FabricTool, { ConfigureCanvasProps } from "./fabrictool"

class CoordinateTool extends FabricTool {
  isMouseDown: boolean = false
  strokeColor: string = "#ffffff"
  strokeWidth: number = 10
  horizontalLine: fabric.Line | null = null
  verticalLine: fabric.Line | null = null
  coordinateCircle: fabric.Circle | null = null
  coordinatesText: fabric.Text | null = null

  tempHorizontalLine: fabric.Line | null = null
  tempVerticalLine: fabric.Line | null = null
  tempCoordinateCircle: fabric.Circle | null = null
  tempCoordinatesText: fabric.Text | null = null

  scaleFactorX: number
  scaleFactorY: number

  constructor(canvas: fabric.Canvas) {
    super(canvas)

    const urlParams = new URLSearchParams(window.location.search)
    this.scaleFactorX = parseFloat(urlParams.get("scale_factor_x") || "1")
    this.scaleFactorY = parseFloat(urlParams.get("scale_factor_y") || "1")
  }

  configureCanvas({
    strokeWidth,
    strokeColor,
  }: ConfigureCanvasProps): () => void {
    this._canvas.isDrawingMode = false
    this._canvas.selection = false
    this._canvas.forEachObject((o) => (o.selectable = o.evented = false))

    this.strokeWidth = strokeWidth
    this.strokeColor = strokeColor

    this._canvas.on("mouse:down", (e: any) => this.onMouseDown(e))
    this._canvas.on("mouse:move", (e: any) => this.onMouseMove(e))
    this._canvas.on("mouse:up", (e: any) => this.onMouseUp(e))
    this._canvas.on("mouse:out", () => this.onMouseOut())
    return () => {
      this._canvas.off("mouse:down")
      this._canvas.off("mouse:move")
      this._canvas.off("mouse:up")
      this._canvas.off("mouse:out")
      this.clearTemporaryObjects()
    }
  }

  getScaledCoordinates(pointer: { x: number; y: number }) {
    return {
      x: pointer.x * this.scaleFactorX,
      y: pointer.y * this.scaleFactorY,
    }
  }

  onMouseDown(o: any) {
    if (o.e.button === 2) {
      this.isMouseDown = true
      let canvas = this._canvas
      let pointer = canvas.getPointer(o.e)
      let scaledPointer = this.getScaledCoordinates(pointer)
      this.updateLinesAndCircle(scaledPointer.x, scaledPointer.y)
      this.drawLinesAndCoordinates(scaledPointer.x, scaledPointer.y)
    }
  }

  onMouseMove(o: any) {
    let canvas = this._canvas
    let pointer = canvas.getPointer(o.e)
    if (!this.isMouseDown) {
      let scaledPointer = this.getScaledCoordinates(pointer)
      this.drawTemporaryLinesAndCoordinates(scaledPointer.x, scaledPointer.y)
    }
  }

  onMouseUp(o: any) {
    if (o.e.button === 2) {
      this.isMouseDown = false
      let canvas = this._canvas
      let pointer = canvas.getPointer(o.e)
      let scaledPointer = this.getScaledCoordinates(pointer)
      this.clearTemporaryObjects()
      this.drawLinesAndCoordinates(scaledPointer.x, scaledPointer.y)
    }
  }

  onMouseOut() {
    this.clearTemporaryObjects()
  }

  drawLinesAndCoordinates(x: number, y: number) {
    let canvas = this._canvas
    let strokeWidth = this.strokeWidth
    let strokeColor = "rgba(99, 99, 156, .75)"
    // Ensure canvas.width and canvas.height are treated as numbers

    this.horizontalLine = new fabric.Line([0, y, x, y], {
      stroke: strokeColor,
      strokeWidth: strokeWidth,
      selectable: false,
      evented: false,
      strokeDashArray: [10, 5],
    })
    const canvasHeight = canvas.height ?? 0
    this.verticalLine = new fabric.Line([x, y, x, canvasHeight], {
      stroke: strokeColor,
      strokeWidth: strokeWidth,
      selectable: false,
      evented: false,
      strokeDashArray: [10, 5],
    })

    this.coordinateCircle = new fabric.Circle({
      left: x,
      top: y,
      radius: 5,
      fill: strokeColor,
      selectable: false,
      evented: false,
      originX: "center",
      originY: "center",
    })

    this.coordinatesText = new fabric.Text(
      `(${x.toFixed(0)}, ${y.toFixed(0)})`,
      {
        left: x + 10,
        top: y + 10,
        fill: strokeColor,
        fontSize: 14,
        selectable: false,
        evented: false,
      }
    )

    canvas.add(this.horizontalLine)
    canvas.add(this.verticalLine)
    canvas.add(this.coordinateCircle)
    canvas.add(this.coordinatesText)
    canvas.renderAll()
  }

  updateLinesAndCircle(x: number, y: number) {
    if (
      this.horizontalLine &&
      this.verticalLine &&
      this.coordinateCircle &&
      this.coordinatesText
    ) {
      let canvas = this._canvas

      this.horizontalLine.set({
        x2: x,
        y1: y,
        y2: y,
      })

      this.verticalLine.set({
        x1: x,
        x2: x,
        y1: y,
        y2: canvas.height,
      })

      this.coordinateCircle.set({
        left: x,
        top: y,
      })

      this.coordinatesText.set({
        left: x + 10,
        top: y + 10,
        text: `(${x.toFixed(0)}, ${y.toFixed(0)})`,
      })

      this.horizontalLine.setCoords()
      this.verticalLine.setCoords()
      this.coordinateCircle.setCoords()
      this.coordinatesText.setCoords()

      canvas.renderAll()
    }
  }

  drawTemporaryLinesAndCoordinates(x: number, y: number) {
    let canvas = this._canvas
    let strokeWidth = this.strokeWidth
    let strokeColor = "rgba(255, 255, 255, 0.5)"

    this.clearTemporaryObjects()

    this.tempHorizontalLine = new fabric.Line([0, y, x, y], {
      stroke: strokeColor,
      strokeWidth: strokeWidth,
      selectable: false,
      evented: false,
      strokeDashArray: [10, 5],
    })

    const canvasHeight = canvas.height ?? 0
    this.tempVerticalLine = new fabric.Line([x, y, x, canvasHeight], {
      stroke: strokeColor,
      strokeWidth: strokeWidth,
      selectable: false,
      evented: false,
      strokeDashArray: [10, 5],
    })

    this.tempCoordinateCircle = new fabric.Circle({
      left: x,
      top: y,
      radius: 5,
      fill: strokeColor,
      selectable: false,
      evented: false,
      originX: "center",
      originY: "center",
    })

    this.tempCoordinatesText = new fabric.Text(
      `(${x.toFixed(0)}, ${y.toFixed(0)})`,
      {
        left: x + 10,
        top: y + 10,
        fill: strokeColor,
        fontSize: 14,
        selectable: false,
        evented: false,
      }
    )

    canvas.add(this.tempHorizontalLine)
    canvas.add(this.tempVerticalLine)
    canvas.add(this.tempCoordinateCircle)
    canvas.add(this.tempCoordinatesText)
    canvas.renderAll()
  }

  clearTemporaryObjects() {
    let canvas = this._canvas
    if (this.tempHorizontalLine) canvas.remove(this.tempHorizontalLine)
    if (this.tempVerticalLine) canvas.remove(this.tempVerticalLine)
    if (this.tempCoordinateCircle) canvas.remove(this.tempCoordinateCircle)
    if (this.tempCoordinatesText) canvas.remove(this.tempCoordinatesText)

    this.tempHorizontalLine = null
    this.tempVerticalLine = null
    this.tempCoordinateCircle = null
    this.tempCoordinatesText = null
  }
}

export default CoordinateTool
