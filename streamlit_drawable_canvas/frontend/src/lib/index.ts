import FabricTool from "./fabrictool"
import SingleArrowHeadTool from "./singlearrowhead"
import DoubleArrowHeadTool from "./doublearrowhead"
import CircleTool from "./circle"
import CoordinateTool from "./coordinate"
import CurveTool from "./curve"
//import Curve from "./curve"
import FreedrawTool from "./freedraw"
import LineTool from "./line"
import PointTool from "./point"
import PolygonTool from "./polygon"
import RectTool from "./rect"
import TextTool from "./text"
import TransformTool from "./transform"
//import xyplaneTool from "./xyplane"

// TODO: Should make TS happy on the Map of selectedTool --> FabricTool
const tools: any = {
  circle: CircleTool,
  curve: CurveTool,
  //curve: Curve,
  coordinate: CoordinateTool,
  text: TextTool,
  freedraw: FreedrawTool,
  line: LineTool,
  polygon: PolygonTool,
  rect: RectTool,
  singlearrowhead: SingleArrowHeadTool,
  doublearrowhead: DoubleArrowHeadTool,
  transform: TransformTool,
  point: PointTool,
  //xyplane: xyplaneTool,
}

export { tools, FabricTool }
