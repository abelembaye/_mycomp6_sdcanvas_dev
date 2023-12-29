import { fabric } from "fabric"
import FabricTool, { ConfigureCanvasProps } from "./fabrictool"

class CurveTool extends FabricTool {
  getType(): string {
    return 'curve';
  }
  isMouseDown: boolean = false
  strokeWidth: number = 10
  strokeColor: string = "#ffffff"
  points: fabric.Point[] = []

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
    this._canvas.on("mouse:out", (e: any) => this.onMouseOut(e))
    return () => {
      this._canvas.off("mouse:down")
      this._canvas.off("mouse:move")
      this._canvas.off("mouse:up")
      this._canvas.off("mouse:out")
    }
  }

  onMouseDown(o: any) {
    let canvas = this._canvas
    let _clicked = o.e["button"]
    this.isMouseDown = true
    var pointer = canvas.getPointer(o.e)
    this.points.push(new fabric.Point(pointer.x, pointer.y))
    if (_clicked === 0 && this.points.length === 3) {
      let curve = new fabric.Path(
        `M ${this.points[0].x} ${this.points[0].y} Q ${this.points[1].x} ${this.points[1].y}, ${this.points[2].x} ${this.points[2].y}`,
        {
          strokeWidth: this.strokeWidth,
          fill: "",
          stroke: this.strokeColor,
          originX: "center",
          originY: "center",
          selectable: false,
          evented: false,
        }
      )
      canvas.add(curve)
      this.points = []
    }
  }

  onMouseMove(o: any) {
    if (!this.isMouseDown || this.points.length !== 2) return
    let canvas = this._canvas
    var pointer = canvas.getPointer(o.e)
    this.points[2] = new fabric.Point(pointer.x, pointer.y)
    canvas.renderAll()
  }

  onMouseUp(o: any) {
    this.isMouseDown = false
  }

  onMouseOut(o: any) {
    this.isMouseDown = false
  }
}

export default CurveTool
