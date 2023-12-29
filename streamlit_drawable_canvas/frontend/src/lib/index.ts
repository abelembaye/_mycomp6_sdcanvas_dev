import CircleTool from "./circle" //was commented out to remove the circle tool
import CurveTool from "./curve"
import TextTool from "./text"
import FabricTool from "./fabrictool"
import FreedrawTool from "./freedraw"
import LineTool from "./line"
import PolygonTool from "./polygon"
import RectTool from "./rect"
import TransformTool from "./transform"
import PointTool from "./point"

// TODO: Should make TS happy on the Map of selectedTool --> FabricTool
const tools: any = {
  circle: CircleTool, //was commented out to remove the circle tool
  curve: CurveTool,
  text: TextTool,
  freedraw: FreedrawTool,
  line: LineTool,
  polygon: PolygonTool,
  rect: RectTool,
  transform: TransformTool,
  point: PointTool,
}

export { tools, FabricTool }
