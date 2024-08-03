(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{10:function(t,e,s){t.exports={enabled:"CanvasToolbar_enabled__3qejl",disabled:"CanvasToolbar_disabled__375cH",invertx:"CanvasToolbar_invertx__BrmIZ"}},101:function(t,e,s){},102:function(t,e,s){"use strict";s.r(e);var i=s(1),o=s.n(i),r=s(25),n=s.n(r),a=s(5),c=s(0),h=s(3),l=s(10),u=s.n(l),d=s(27),f=s.n(d),v=s(14),m=s.n(v),w=s(28),b=s.n(w);const k=t=>{let{imgUrl:e,altText:s,invertX:i,size:r,enabled:n,clickCallback:a}=t;return o.a.createElement("img",{src:e,className:"\n    ".concat(n?u.a.enabled:u.a.disabled," ").concat(i?"":u.a.invertx,"\n    "),alt:s,title:s,height:"".concat(r,"px"),width:"".concat(r,"px"),onClick:a})};k.defaultProps={invertX:!1};var C=t=>{let{topPosition:e,leftPosition:s,canUndo:i,canRedo:r,downloadCallback:n,undoCallback:a,redoCallback:c,resetCallback:h}=t;const l=[{imgUrl:b.a,altText:"Send to Streamlit",invertX:!1,enabled:!0,clickCallback:n},{imgUrl:m.a,altText:"Undo",invertX:!0,enabled:i,clickCallback:i?a:()=>{}},{imgUrl:m.a,altText:"Redo",invertX:!1,enabled:r,clickCallback:r?c:()=>{}},{imgUrl:f.a,altText:"Reset canvas & history",invertX:!1,enabled:!0,clickCallback:h}];return o.a.createElement("div",{style:{position:"absolute",top:e+4,left:0,display:"flex",gap:4,zIndex:20}},l.map(t=>o.a.createElement(k,{key:t.altText,imgUrl:t.imgUrl,altText:t.altText,invertX:t.invertX,size:24,enabled:t.enabled,clickCallback:t.clickCallback})))};var g=t=>{const[e,s]=Object(i.useState)(new c.fabric.Canvas("")),r=((t,e)=>{const[s,o]=Object(i.useState)(t);return Object(i.useEffect)(()=>{const s=setTimeout(()=>{o(t)},e);return()=>{clearTimeout(s)}},[t,e]),s})(t.stateToSendToStreamlit,200);return Object(i.useEffect)(()=>{const t=new c.fabric.Canvas("canvas-to-streamlit",{enableRetinaScaling:!1});s(t)},[]),Object(i.useEffect)(()=>{r&&t.shouldSendToStreamlit&&e.loadFromJSON(r,()=>{(t=>{const e=t.getContext().canvas.toDataURL();a.a.setComponentValue({data:e,width:t.getWidth(),height:t.getHeight(),raw:t.toObject()})})(e)})},[e,t.shouldSendToStreamlit,r]),o.a.createElement("canvas",{id:"canvas-to-streamlit",width:t.canvasWidth,height:t.canvasHeight})};const p={shouldReloadCanvas:!1,forceSendToStreamlit:!1},S={shouldReloadCanvas:!0,forceSendToStreamlit:!1},M={shouldReloadCanvas:!1,forceSendToStreamlit:!0},A={shouldReloadCanvas:!0,forceSendToStreamlit:!0},_=(t,e)=>{switch(e.type){case"save":if(e.state){if(Object(h.isEmpty)(t.currentState))return{history:{undoStack:[],redoStack:[]},action:{...p},initialState:e.state,currentState:e.state};if(Object(h.isEqual)(e.state,t.currentState))return{history:{...t.history},action:{...p},initialState:t.initialState,currentState:t.currentState};{const s=t.history.undoStack.length>=100;return{history:{undoStack:[...t.history.undoStack.slice(s?1:0),t.currentState],redoStack:[]},action:{...p},initialState:null==t.initialState?t.currentState:t.initialState,currentState:e.state}}}throw new Error("No action state to save");case"undo":if(Object(h.isEmpty)(t.currentState)||Object(h.isEqual)(t.initialState,t.currentState))return{history:{...t.history},action:{...p},initialState:t.initialState,currentState:t.currentState};{const e=0===t.history.undoStack.length;return{history:{undoStack:t.history.undoStack.slice(0,-1),redoStack:[...t.history.redoStack,t.currentState]},action:{...S},initialState:t.initialState,currentState:e?t.currentState:t.history.undoStack[t.history.undoStack.length-1]}}case"redo":return t.history.redoStack.length>0?{history:{undoStack:[...t.history.undoStack,t.currentState],redoStack:t.history.redoStack.slice(0,-1)},action:{...S},initialState:t.initialState,currentState:t.history.redoStack[t.history.redoStack.length-1]}:{history:{...t.history},action:{...p},initialState:t.initialState,currentState:t.currentState};case"reset":if(!e.state)throw new Error("No action state to store in reset");return{history:{undoStack:[],redoStack:[]},action:{...A},initialState:e.state,currentState:e.state};case"forceSendToStreamlit":return{history:{...t.history},action:{...M},initialState:t.initialState,currentState:t.currentState};default:throw new Error("TS should protect from this")}},y={history:{undoStack:[],redoStack:[]},action:{forceSendToStreamlit:!1,shouldReloadCanvas:!1},initialState:{},currentState:{}},x=Object(i.createContext)({}),D=t=>{let{children:e}=t;const[s,r]=Object(i.useReducer)(_,y),n=Object(i.useCallback)(t=>r({type:"save",state:t}),[r]),a=Object(i.useCallback)(()=>r({type:"undo"}),[r]),c=Object(i.useCallback)(()=>r({type:"redo"}),[r]),h=Object(i.useCallback)(()=>r({type:"forceSendToStreamlit"}),[r]),l=Object(i.useCallback)(t=>r({type:"reset",state:t}),[r]),u=0!==s.history.undoStack.length,d=0!==s.history.redoStack.length;return o.a.createElement(x.Provider,{value:{canvasState:s,saveState:n,undo:a,redo:c,canUndo:u,canRedo:d,forceStreamlitUpdate:h,resetState:l}},e)};var L=class{constructor(t){this._canvas=void 0,this._canvas=t}};var W=class extends L{constructor(){super(...arguments),this.isMouseDown=!1,this.strokeWidth=10,this.strokeColor="#ffffff",this.currentLine=new c.fabric.Line,this.startCircle=new c.fabric.Circle,this.singlearrow=new c.fabric.Group,this.endTriangle=new c.fabric.Triangle}configureCanvas(t){let{strokeWidth:e,strokeColor:s}=t;return this._canvas.isDrawingMode=!1,this._canvas.selection=!1,this._canvas.forEachObject(t=>t.selectable=t.evented=!1),this.strokeWidth=e,this.strokeColor=s,this._canvas.on("mouse:down",t=>this.onMouseDown(t)),this._canvas.on("mouse:move",t=>this.onMouseMove(t)),this._canvas.on("mouse:up",t=>this.onMouseUp(t)),this._canvas.on("mouse:out",t=>this.onMouseOut(t)),()=>{this._canvas.off("mouse:down"),this._canvas.off("mouse:move"),this._canvas.off("mouse:up"),this._canvas.off("mouse:out")}}onMouseDown(t){let e=this._canvas,s=t.e.button;this.isMouseDown=!0;var i=e.getPointer(t.e),o=[i.x,i.y,i.x,i.y];this.currentLine=new c.fabric.Line(o,{strokeWidth:this.strokeWidth,fill:this.strokeColor,stroke:this.strokeColor,originX:"center",originY:"center",selectable:!1,evented:!1}),0===s&&e.add(this.singlearrow)}onMouseMove(t){if(!this.isMouseDown)return;let e=this._canvas;var s=e.getPointer(t.e);this.currentLine.set({x2:s.x,y2:s.y}),this.singlearrow&&e.remove(this.singlearrow);let i=0,o=0,r=0,n=0;i=this.currentLine.y2,o=this.currentLine.y1,r=this.currentLine.x2,n=this.currentLine.x1;var a=Math.atan2(i-o,r-n);this.endTriangle=new c.fabric.Triangle({left:s.x,top:s.y,originX:"center",originY:"center",strokeWidth:this.strokeWidth,stroke:this.strokeColor,fill:this.strokeColor,selectable:!1,evented:!1,width:5*this.strokeWidth,height:5*this.strokeWidth,angle:a*(180/Math.PI)+90}),this.singlearrow=new c.fabric.Group([this.currentLine,this.endTriangle],{selectable:!1,evented:!1}),e.add(this.singlearrow),e.renderAll()}onMouseUp(t){this.isMouseDown=!1;let e=this._canvas;var s=this.singlearrow;e.remove(this.singlearrow),e.add(s),e.renderAll()}onMouseOut(t){this.isMouseDown=!1}};var O=class extends L{constructor(){super(...arguments),this.isMouseDown=!1,this.strokeWidth=10,this.strokeColor="#ffffff",this.currentLine=new c.fabric.Line,this.startCircle=new c.fabric.Circle,this.doublearrow=new c.fabric.Group,this.startTriangle=new c.fabric.Triangle,this.endTriangle=new c.fabric.Triangle}configureCanvas(t){let{strokeWidth:e,strokeColor:s}=t;return this._canvas.isDrawingMode=!1,this._canvas.selection=!1,this._canvas.forEachObject(t=>t.selectable=t.evented=!1),this.strokeWidth=e,this.strokeColor=s,this._canvas.on("mouse:down",t=>this.onMouseDown(t)),this._canvas.on("mouse:move",t=>this.onMouseMove(t)),this._canvas.on("mouse:up",t=>this.onMouseUp(t)),this._canvas.on("mouse:out",t=>this.onMouseOut(t)),()=>{this._canvas.off("mouse:down"),this._canvas.off("mouse:move"),this._canvas.off("mouse:up"),this._canvas.off("mouse:out")}}onMouseDown(t){let e=this._canvas,s=t.e.button;this.isMouseDown=!0;var i=e.getPointer(t.e),o=[i.x,i.y,i.x,i.y];this.currentLine=new c.fabric.Line(o,{strokeWidth:this.strokeWidth,fill:this.strokeColor,stroke:this.strokeColor,originX:"center",originY:"center",selectable:!1,evented:!1}),0===s&&e.add(this.doublearrow)}onMouseMove(t){if(!this.isMouseDown)return;let e=this._canvas;var s=e.getPointer(t.e);this.currentLine.set({x2:s.x,y2:s.y}),this.currentLine.setCoords(),this.doublearrow&&e.remove(this.doublearrow);let i=0,o=0,r=0,n=0;i=this.currentLine.y2,o=this.currentLine.y1,r=this.currentLine.x2,n=this.currentLine.x1;var a=Math.atan2(i-o,r-n);this.endTriangle=new c.fabric.Triangle({left:s.x,top:s.y,originX:"center",originY:"center",strokeWidth:this.strokeWidth,stroke:this.strokeColor,fill:this.strokeColor,selectable:!1,evented:!1,width:5*this.strokeWidth,height:5*this.strokeWidth,angle:a*(180/Math.PI)+90}),this.startTriangle=new c.fabric.Triangle({left:this.currentLine.x1,top:this.currentLine.y1,originX:"center",originY:"center",strokeWidth:this.strokeWidth,stroke:this.strokeColor,fill:this.strokeColor,selectable:!1,evented:!1,width:5*this.strokeWidth,height:5*this.strokeWidth,angle:a*(180/Math.PI)-90}),this.doublearrow=new c.fabric.Group([this.currentLine,this.startTriangle,this.endTriangle],{selectable:!1,evented:!1}),e.add(this.doublearrow),e.renderAll()}onMouseUp(t){this.isMouseDown=!1;let e=this._canvas;var s=this.doublearrow;e.remove(this.doublearrow),e.add(s),e.renderAll()}onMouseOut(t){this.isMouseDown=!1}};var P=class extends L{constructor(){super(...arguments),this.isMouseDown=!1,this.fillColor="#ffffff",this.strokeWidth=10,this.strokeColor="#ffffff",this.currentCircle=new c.fabric.Circle,this.currentStartX=0,this.currentStartY=0,this._minRadius=10,this.linearDistance=((t,e)=>{let s=e.x-t.x,i=e.y-t.y;return Math.sqrt(s*s+i*i)})}configureCanvas(t){let{strokeWidth:e,strokeColor:s,fillColor:i}=t;return this._canvas.isDrawingMode=!1,this._canvas.selection=!1,this._canvas.forEachObject(t=>t.selectable=t.evented=!1),this.strokeWidth=e,this.strokeColor=s,this.fillColor=i,this._minRadius=e,this._canvas.on("mouse:down",t=>this.onMouseDown(t)),this._canvas.on("mouse:move",t=>this.onMouseMove(t)),this._canvas.on("mouse:up",t=>this.onMouseUp(t)),this._canvas.on("mouse:out",t=>this.onMouseOut(t)),()=>{this._canvas.off("mouse:down"),this._canvas.off("mouse:move"),this._canvas.off("mouse:up"),this._canvas.off("mouse:out")}}onMouseDown(t){let e=this._canvas,s=t.e.button;this.isMouseDown=!0;let i=e.getPointer(t.e);this.currentStartX=i.x,this.currentStartY=i.y,this.currentCircle=new c.fabric.Circle({left:this.currentStartX,top:this.currentStartY,originX:"left",originY:"center",strokeWidth:this.strokeWidth,stroke:this.strokeColor,fill:this.fillColor,selectable:!1,evented:!1,radius:this._minRadius}),0===s&&e.add(this.currentCircle)}onMouseMove(t){if(!this.isMouseDown)return;let e=this._canvas,s=e.getPointer(t.e),i=this.linearDistance({x:this.currentStartX,y:this.currentStartY},{x:s.x,y:s.y})/2;this.currentCircle.set({radius:Math.max(i,this._minRadius),angle:180*Math.atan2(s.y-this.currentStartY,s.x-this.currentStartX)/Math.PI}),this.currentCircle.setCoords(),e.renderAll()}onMouseUp(t){this.isMouseDown=!1}onMouseOut(t){this.isMouseDown=!1}};var T=class extends L{constructor(){super(...arguments),this.isMouseDown=!1,this.strokeColor="#ffffff",this.strokeWidth=10,this.horizontalLine=null,this.verticalLine=null,this.coordinateCircle=null,this.coordinatesTextX=null,this.coordinatesTextY=null,this.tempHorizontalLine=null,this.tempVerticalLine=null,this.tempCoordinateCircle=null,this.tempCoordinatesText=null,this.coordinates_group=new c.fabric.Group,this.tempCoordinates_group=new c.fabric.Group,this.scaleFactors=[1,1,1,1],this.canvasWidth=1,this.canvasHeight=1}configureCanvas(t){let{strokeWidth:e,strokeColor:s,scaleFactors:i,canvasHeight:o,canvasWidth:r}=t;return this.scaleFactors=i,this.canvasHeight=o,this.canvasWidth=r,this._canvas.isDrawingMode=!1,this._canvas.selection=!1,this._canvas.forEachObject(t=>t.selectable=t.evented=!1),this.strokeWidth=e,this.strokeColor=s,this._canvas.on("mouse:down",t=>this.onMouseDown(t)),this._canvas.on("mouse:move",t=>this.onMouseMove(t)),this._canvas.on("mouse:up",t=>this.onMouseUp(t)),this._canvas.on("mouse:out",()=>this.onMouseOut()),()=>{this._canvas.off("mouse:down"),this._canvas.off("mouse:move"),this._canvas.off("mouse:up"),this._canvas.off("mouse:out"),this.clearTemporaryObjects()}}onMouseDown(t){if(0===t.e.button){this.isMouseDown=!0;let e=this._canvas.getPointer(t.e);this.drawLinesAndCoordinates(e.x,e.y)}}onMouseMove(t){let e=this._canvas.getPointer(t.e);this.isMouseDown||this.drawTemporaryLinesAndCoordinates(e.x,e.y)}onMouseUp(t){0===t.e.button&&(this.isMouseDown=!1,this.clearTemporaryObjects())}onMouseOut(){this.clearTemporaryObjects()}drawLinesAndCoordinates(t,e){let s=this._canvas,i=this.strokeWidth,o="rgba(99, 99, 156, .75)",r=this.canvasHeight,n=this.canvasWidth;this.horizontalLine=new c.fabric.Line([.12*n,e,t,e],{stroke:o,strokeWidth:i,selectable:!1,evented:!1,strokeDashArray:[10,5]}),this.verticalLine=new c.fabric.Line([t,e,t,.9*r],{stroke:o,strokeWidth:i,selectable:!1,evented:!1,strokeDashArray:[10,5]}),this.coordinateCircle=new c.fabric.Circle({left:t,top:e,radius:5,fill:o,selectable:!1,evented:!1,originX:"center",originY:"center"});let a=(this.scaleFactors[1]-this.scaleFactors[0])*(t-this.scaleFactors[2]*n)/(this.scaleFactors[3]*n),h=this.scaleFactors[1]-(this.scaleFactors[1]-this.scaleFactors[0])*(e-this.scaleFactors[2]*r)/(this.scaleFactors[3]*r);this.coordinatesTextX=new c.fabric.Text("".concat(a.toFixed(0)),{left:t+.01*n,top:.85*r,fill:o,fontSize:14,selectable:!1,evented:!1}),this.coordinatesTextY=new c.fabric.Text("".concat(h.toFixed(0)),{left:.13*n,top:e-.035*r,fill:o,fontSize:14,selectable:!1,evented:!1}),this.coordinates_group=new c.fabric.Group([this.horizontalLine,this.verticalLine,this.coordinateCircle,this.coordinatesTextX,this.coordinatesTextY],{selectable:!1,evented:!1}),s.add(this.coordinates_group),s.renderAll()}drawTemporaryLinesAndCoordinates(t,e){let s=this._canvas,i=this.strokeWidth,o="rgba(51, 0, 20, 0.5)",r=this.canvasHeight,n=this.canvasWidth;this.clearTemporaryObjects(),this.tempHorizontalLine=new c.fabric.Line([.12*n,e,t,e],{stroke:o,strokeWidth:i,selectable:!1,evented:!1,strokeDashArray:[10,5]}),this.tempVerticalLine=new c.fabric.Line([t,e,t,.9*r],{stroke:o,strokeWidth:i,selectable:!1,evented:!1,strokeDashArray:[10,5]}),this.tempCoordinateCircle=new c.fabric.Circle({left:t,top:e,radius:5,fill:o,selectable:!1,evented:!1,originX:"center",originY:"center"});let a=(this.scaleFactors[1]-this.scaleFactors[0])*(t-this.scaleFactors[2]*n)/(this.scaleFactors[3]*n),h=this.scaleFactors[1]-(this.scaleFactors[1]-this.scaleFactors[0])*(e-this.scaleFactors[2]*r)/(this.scaleFactors[3]*r);this.tempCoordinatesText=new c.fabric.Text("(".concat(a.toFixed(0),", ").concat(h.toFixed(0),")"),{left:t+10,top:e+10,fill:o,fontSize:14,selectable:!1,evented:!1}),this.tempCoordinates_group=new c.fabric.Group([this.tempHorizontalLine,this.tempVerticalLine,this.tempCoordinateCircle,this.tempCoordinatesText],{selectable:!1,evented:!1}),s.add(this.tempCoordinates_group),s.renderAll()}clearTemporaryObjects(){let t=this._canvas;this.tempCoordinates_group&&t.remove(this.tempCoordinates_group)}},R=s(15);const E={circle:P,curve:class extends L{constructor(){super(...arguments),this.isMouseDown=!1,this.fillColor="#ffffff00",this.strokeWidth=10,this.strokeColor="#ffffff",this.startCircle=new c.fabric.Circle,this.curvePath=new c.fabric.Path,this.tempCurvePath=new c.fabric.Path,this.controlPoints=[]}configureCanvas(t){let{strokeWidth:e,strokeColor:s,fillColor:i}=t;return this._canvas.isDrawingMode=!1,this._canvas.selection=!1,this._canvas.forEachObject(t=>t.selectable=t.evented=!1),this.strokeWidth=e,this.strokeColor=s,this.fillColor=i,this._canvas.on("mouse:down",t=>this.onMouseDown(t)),this._canvas.on("mouse:move",t=>this.onMouseMove(t)),this._canvas.on("mouse:up",t=>this.onMouseUp(t)),this._canvas.on("mouse:out",t=>this.onMouseOut(t)),()=>{this._canvas.off("mouse:down"),this._canvas.off("mouse:move"),this._canvas.off("mouse:up"),this._canvas.off("mouse:out")}}onMouseDown(t){let e=this._canvas,s=t.e.button;this.isMouseDown=!0;var i=e.getPointer(t.e);if(0===s){this.controlPoints.push([i.x,i.y]),1===this.controlPoints.length&&(this.startCircle=new c.fabric.Circle({left:i.x,top:i.y,originX:"center",originY:"center",strokeWidth:this.strokeWidth,stroke:this.strokeColor,fill:this.strokeColor,selectable:!1,evented:!1,radius:this.strokeWidth}),e.add(this.startCircle));var o=this.generateCurvePathData(this.controlPoints);e.remove(this.curvePath),this.curvePath=new c.fabric.Path(o,{fill:"",stroke:this.strokeColor,strokeWidth:3,selectable:!1,evented:!1}),e.remove(this.tempCurvePath),e.add(this.curvePath)}else if(2===s){e.remove(this.tempCurvePath),e.remove(this.startCircle),this.controlPoints.push([i.x,i.y]);var r=this.generateCurvePathData(this.controlPoints);this.curvePath=new c.fabric.Path(r,{fill:"",stroke:this.strokeColor,strokeWidth:3,selectable:!1,evented:!1}),this.controlPoints=[],e.add(this.curvePath),e.renderAll()}}onMouseMove(t){if(!this.isMouseDown)return;let e=this._canvas;var s=e.getPointer(t.e);this.controlPoints.push([s.x,s.y]);var i=this.generateCurvePathData(this.controlPoints);e.remove(this.curvePath),e.remove(this.tempCurvePath),this.tempCurvePath=new c.fabric.Path(i,{fill:"",stroke:this.strokeColor,strokeWidth:3,selectable:!1,evented:!1}),e.add(this.tempCurvePath),this.controlPoints.pop()}onMouseUp(t){this.isMouseDown=!0}onMouseOut(t){this.isMouseDown=!1}generateCurvePathData(t){return R.b().curve(R.a.alpha(.5))(t)}},coordinate:T,text:class extends L{configureCanvas(t){let{}=t;return this._canvas.isDrawingMode=!1,this._canvas.selection=!1,this._canvas.forEachObject(t=>t.selectable=t.evented=!1),this._canvas.on("mouse:down",t=>this.onMouseDown(t)),()=>{this._canvas.off("mouse:down")}}onMouseDown(t){let e=this._canvas,s=t.e.button;var i=e.getPointer(t.e);if(0===s){const t=prompt("Enter text:");if(t){let s=new c.fabric.IText(t,{left:i.x,top:i.y,selectable:!1,evented:!1});e.add(s)}}}},freedraw:class extends L{configureCanvas(t){let{strokeWidth:e,strokeColor:s}=t;return this._canvas.isDrawingMode=!0,this._canvas.freeDrawingBrush.width=e,this._canvas.freeDrawingBrush.color=s,()=>{}}},line:class extends L{constructor(){super(...arguments),this.isMouseDown=!1,this.strokeWidth=10,this.strokeColor="#ffffff",this.currentLine=new c.fabric.Line}configureCanvas(t){let{strokeWidth:e,strokeColor:s}=t;return this._canvas.isDrawingMode=!1,this._canvas.selection=!1,this._canvas.forEachObject(t=>t.selectable=t.evented=!1),this.strokeWidth=e,this.strokeColor=s,this._canvas.on("mouse:down",t=>this.onMouseDown(t)),this._canvas.on("mouse:move",t=>this.onMouseMove(t)),this._canvas.on("mouse:up",t=>this.onMouseUp(t)),this._canvas.on("mouse:out",t=>this.onMouseOut(t)),()=>{this._canvas.off("mouse:down"),this._canvas.off("mouse:move"),this._canvas.off("mouse:up"),this._canvas.off("mouse:out")}}onMouseDown(t){let e=this._canvas,s=t.e.button;this.isMouseDown=!0;var i=e.getPointer(t.e),o=[i.x,i.y,i.x,i.y];this.currentLine=new c.fabric.Line(o,{strokeWidth:this.strokeWidth,fill:this.strokeColor,stroke:this.strokeColor,originX:"center",originY:"center",selectable:!1,evented:!1}),0===s&&e.add(this.currentLine)}onMouseMove(t){if(!this.isMouseDown)return;let e=this._canvas;var s=e.getPointer(t.e);this.currentLine.set({x2:s.x,y2:s.y}),this.currentLine.setCoords(),e.renderAll()}onMouseUp(t){this.isMouseDown=!1;let e=this._canvas;0===this.currentLine.width&&0===this.currentLine.height&&e.remove(this.currentLine)}onMouseOut(t){this.isMouseDown=!1}},polygon:class extends L{constructor(){super(...arguments),this.isMouseDown=!1,this.fillColor="#ffffff",this.strokeWidth=10,this.strokeColor="#ffffff",this.startCircle=new c.fabric.Circle,this.currentLine=new c.fabric.Line,this.currentPath=new c.fabric.Path,this._pathString="M "}configureCanvas(t){let{strokeWidth:e,strokeColor:s,fillColor:i}=t;return this._canvas.isDrawingMode=!1,this._canvas.selection=!1,this._canvas.forEachObject(t=>t.selectable=t.evented=!1),this.strokeWidth=e,this.strokeColor=s,this.fillColor=i,this._canvas.on("mouse:down",t=>this.onMouseDown(t)),this._canvas.on("mouse:move",t=>this.onMouseMove(t)),this._canvas.on("mouse:up",t=>this.onMouseUp(t)),this._canvas.on("mouse:out",t=>this.onMouseOut(t)),this._canvas.on("mouse:dblclick",t=>this.onMouseDoubleClick(t)),()=>{this._canvas.off("mouse:down"),this._canvas.off("mouse:move"),this._canvas.off("mouse:up"),this._canvas.off("mouse:out"),this._canvas.off("mouse:dblclick")}}onMouseDown(t){let e=this._canvas,s=t.e.button,i=!1;"M "===this._pathString&&(i=!0),this.isMouseDown=!0;var o=e.getPointer(t.e),r=[o.x,o.y,o.x,o.y];e.remove(this.currentLine),this.currentLine=new c.fabric.Line(r,{strokeWidth:this.strokeWidth,fill:this.strokeColor,stroke:this.strokeColor,originX:"center",originY:"center",selectable:!1,evented:!1}),0===s&&e.add(this.currentLine),i&&0===s?(this._pathString+="".concat(o.x," ").concat(o.y," "),this.startCircle=new c.fabric.Circle({left:o.x,top:o.y,originX:"center",originY:"center",strokeWidth:this.strokeWidth,stroke:this.strokeColor,fill:this.strokeColor,selectable:!1,evented:!1,radius:this.strokeWidth}),e.add(this.startCircle),i=!1):(e.remove(this.currentPath),0===s&&(this._pathString+="L ".concat(o.x," ").concat(o.y," ")),2===s&&(this._pathString+="z",e.remove(this.startCircle))),this.currentPath=new c.fabric.Path(this._pathString,{strokeWidth:this.strokeWidth,fill:this.fillColor,stroke:this.strokeColor,originX:"center",originY:"center",selectable:!1,evented:!1}),0!==this.currentPath.width&&0!==this.currentPath.height&&e.add(this.currentPath),2===s&&(this._pathString="M ")}onMouseMove(t){if(!this.isMouseDown)return;let e=this._canvas;var s=e.getPointer(t.e);this.currentLine.set({x2:s.x,y2:s.y}),this.currentLine.setCoords(),e.renderAll()}onMouseUp(t){this.isMouseDown=!0}onMouseOut(t){this.isMouseDown=!1}onMouseDoubleClick(t){let e=this._canvas;for(let s=0;s<3;s++){let t=this._pathString.lastIndexOf("L");-1===t?(this._pathString="M ",e.remove(this.startCircle)):this._pathString=this._pathString.slice(0,t)}e.remove(this.currentLine),e.remove(this.currentPath),this.currentPath=new c.fabric.Path(this._pathString,{strokeWidth:this.strokeWidth,fill:this.fillColor,stroke:this.strokeColor,originX:"center",originY:"center",selectable:!1,evented:!1}),e.add(this.currentPath)}},rect:class extends L{constructor(){super(...arguments),this.isMouseDown=!1,this.fillColor="#ffffff",this.strokeWidth=10,this.strokeColor="#ffffff",this.currentRect=new c.fabric.Rect,this.currentStartX=0,this.currentStartY=0,this._minLength=10}configureCanvas(t){let{strokeWidth:e,strokeColor:s,fillColor:i}=t;return this._canvas.isDrawingMode=!1,this._canvas.selection=!1,this._canvas.forEachObject(t=>t.selectable=t.evented=!1),this.strokeWidth=e,this.strokeColor=s,this.fillColor=i,this._minLength=e,this._canvas.on("mouse:down",t=>this.onMouseDown(t)),this._canvas.on("mouse:move",t=>this.onMouseMove(t)),this._canvas.on("mouse:up",t=>this.onMouseUp(t)),this._canvas.on("mouse:out",t=>this.onMouseOut(t)),()=>{this._canvas.off("mouse:down"),this._canvas.off("mouse:move"),this._canvas.off("mouse:up"),this._canvas.off("mouse:out")}}onMouseDown(t){let e=this._canvas,s=t.e.button;this.isMouseDown=!0;let i=e.getPointer(t.e);this.currentStartX=i.x,this.currentStartY=i.y,this.currentRect=new c.fabric.Rect({left:this.currentStartX,top:this.currentStartY,originX:"left",originY:"top",width:this._minLength,height:this._minLength,stroke:this.strokeColor,strokeWidth:this.strokeWidth,fill:this.fillColor,transparentCorners:!1,selectable:!1,evented:!1,strokeUniform:!0,noScaleCache:!1,angle:0}),0===s&&e.add(this.currentRect)}onMouseMove(t){if(!this.isMouseDown)return;let e=this._canvas,s=e.getPointer(t.e);this.currentStartX>s.x&&this.currentRect.set({left:Math.abs(s.x)}),this.currentStartY>s.y&&this.currentRect.set({top:Math.abs(s.y)});let i=Math.abs(this.currentStartX-s.x),o=Math.abs(this.currentStartY-s.y);this.currentRect.set({width:Math.max(i,2*this._minLength),height:Math.max(o,2*this._minLength)}),this.currentRect.setCoords(),e.renderAll()}onMouseUp(t){this.isMouseDown=!1}onMouseOut(t){this.isMouseDown=!1}},singlearrowhead:W,doublearrowhead:O,transform:class extends L{configureCanvas(t){let e=this._canvas;e.isDrawingMode=!1,e.selection=!0,e.forEachObject(t=>t.selectable=t.evented=!0);const s=()=>{e.remove(e.getActiveObject())};return e.on("mouse:dblclick",s),()=>{e.off("mouse:dblclick",s)}}},point:class extends L{constructor(){super(...arguments),this.isMouseDown=!1,this.fillColor="#ffffff",this.strokeWidth=10,this.strokeColor="#ffffff",this.currentCircle=new c.fabric.Circle,this.currentStartX=0,this.currentStartY=0,this.displayRadius=1}configureCanvas(t){let{strokeWidth:e,strokeColor:s,fillColor:i,displayRadius:o}=t;return this._canvas.isDrawingMode=!1,this._canvas.selection=!1,this._canvas.forEachObject(t=>t.selectable=t.evented=!1),this.strokeWidth=e,this.strokeColor=s,this.fillColor=i,this.displayRadius=o,this._canvas.on("mouse:down",t=>this.onMouseDown(t)),this._canvas.on("mouse:move",t=>this.onMouseMove(t)),this._canvas.on("mouse:up",t=>this.onMouseUp(t)),this._canvas.on("mouse:out",t=>this.onMouseOut(t)),()=>{this._canvas.off("mouse:down"),this._canvas.off("mouse:move"),this._canvas.off("mouse:up"),this._canvas.off("mouse:out")}}onMouseDown(t){let e=this._canvas,s=t.e.button;this.isMouseDown=!0;let i=e.getPointer(t.e);this.currentStartX=i.x-(this.displayRadius+this.strokeWidth/2),this.currentStartY=i.y,this.currentCircle=new c.fabric.Circle({left:this.currentStartX,top:this.currentStartY,originX:"left",originY:"center",strokeWidth:this.strokeWidth,stroke:this.strokeColor,fill:this.fillColor,selectable:!1,evented:!1,radius:this.displayRadius}),0===s&&e.add(this.currentCircle)}onMouseMove(t){if(!this.isMouseDown)return;let e=this._canvas;this.currentCircle.setCoords(),e.renderAll()}onMouseUp(t){this.isMouseDown=!1}onMouseOut(t){this.isMouseDown=!1}}};var U=Object(a.b)(t=>{let{args:e}=t;const{canvasWidth:s,canvasHeight:r,backgroundColor:n,backgroundImageURL:l,realtimeUpdateStreamlit:u,drawingMode:d,fillColor:f,strokeWidth:v,strokeColor:m,displayRadius:w,initialDrawing:b,displayToolbar:k,scaleFactors:p}=e,[S,M]=Object(i.useState)(new c.fabric.Canvas(""));S.stopContextMenu=!0,S.fireRightClick=!0;const[A,_]=Object(i.useState)(new c.fabric.StaticCanvas("")),{canvasState:{action:{shouldReloadCanvas:y,forceSendToStreamlit:D},currentState:L,initialState:W},saveState:O,undo:P,redo:T,canUndo:R,canRedo:U,forceStreamlitUpdate:j,resetState:X}=Object(i.useContext)(x);return Object(i.useEffect)(()=>{const t=new c.fabric.Canvas("canvas",{enableRetinaScaling:!1}),e=new c.fabric.StaticCanvas("backgroundimage-canvas",{enableRetinaScaling:!1});M(t),_(e),a.a.setFrameHeight()},[]),Object(i.useEffect)(()=>{Object(h.isEqual)(W,b)||S.loadFromJSON(b,()=>{S.renderAll(),X(b)})},[S,b,W,X]),Object(i.useEffect)(()=>{if(l){var t,e=new Image;e.onload=function(){A.getContext().drawImage(e,0,0)};const s=null!==(t=function(){const t=new URLSearchParams(window.location.search).get("streamlitUrl");if(null==t)return null;try{return new URL(t).origin}catch{return null}}())&&void 0!==t?t:"";e.src=s+l}},[S,A,r,s,n,l,O]),Object(i.useEffect)(()=>{y&&S.loadFromJSON(L,()=>{})},[S,y,L]),Object(i.useEffect)(()=>{const t=new E[d](S).configureCanvas({fillColor:f,strokeWidth:v,strokeColor:m,displayRadius:w,scaleFactors:p,canvasHeight:r,canvasWidth:s});return S.on("mouse:up",t=>{O(S.toJSON()),3===t.button&&j()}),S.on("mouse:dblclick",()=>{O(S.toJSON())}),()=>{t(),S.off("mouse:up"),S.off("mouse:dblclick")}},[S,v,m,w,f,d,b,p,r,s,O,j]),o.a.createElement("div",{style:{position:"relative"}},o.a.createElement("div",{style:{position:"absolute",top:0,left:0,zIndex:-10,visibility:"hidden"}},o.a.createElement(g,{canvasHeight:r,canvasWidth:s,shouldSendToStreamlit:u||D,stateToSendToStreamlit:L})),o.a.createElement("div",{style:{position:"absolute",top:0,left:0,zIndex:0}},o.a.createElement("canvas",{id:"backgroundimage-canvas",width:s,height:r})),o.a.createElement("div",{style:{position:"absolute",top:0,left:0,zIndex:10}},o.a.createElement("canvas",{id:"canvas",width:s,height:r,style:{border:"lightgrey 1px solid"}})),k&&o.a.createElement(C,{topPosition:r,leftPosition:s,canUndo:R,canRedo:U,downloadCallback:j,undoCallback:P,redoCallback:T,resetCallback:()=>{X(W)}}))});s(101);n.a.render(o.a.createElement(o.a.StrictMode,null,o.a.createElement(D,null,o.a.createElement(U,null))),document.getElementById("root"))},14:function(t,e){t.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAAwwAAAMMBnc7+MwAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAEFSURBVEiJ7dSxLkRBFMbx31BIlkQlHoCap5BQLAXvQafV6DyLRLYSdkWv0dBQ0NAKkUhkj2bEzc3udW9xE5E9yVfNd85/5pyZSRGhzZhqtfoE8DcAKaVOqwD0mkBSSnNNAAmBAboR8V4qtoguVrNWMI9n3Gad4SQqHlRk9dHJvmns4qWwXqUrbESEspSMfazhekyhN9zhc8z6KWarAKN0jm0sI+WkmdyuPTyV/JdFSBXgATujjl3aYQf7+CjkXhTaPRYw+DbVETZLkMM6Leo3hGxhmHNfsVBnBk0hx4XcozqARpA8/GG+bQcJ6+rFTUQ81jGmlJYi4p6fa9da/IPvegL4Lb4A0uc9nRaYXwcAAAAASUVORK5CYII="},27:function(t,e){t.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAAhQAAAIUB4uz/wQAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAHUSURBVEiJtda9ahRRFAfw3xHFJCabFEkawcYiYKMWVmohBHwFOwsfQLCxthOENHZqKxZG8DHSxcJC0Qcw7AqSNSoGci3mznp3nP0K8cBlZs7X/5z//RopJeMGlrGL1Bi7WJ4Uf9pk2cQVPMDPrJvHVra9GRc8BBARS7iKU4X6cn5+wvf8vljbIuJr4XuEdyml/YGmoGIdX/xLxayji/U2iu5iJXfwa1zbY2QOOznXE4YpuoE93D5m8lr2cLMN4BWu4TF+4HDGxIEOeng90DaW5BkVj/fyd6dhP4u5hq6Tnxdz7GZpL1eLlNIhvmEtq7Yj4mHhsoWng5Ir23b+rGO6Zc62fdAtnFewUdjOqyaylo3sMxJgqIMsvcJ5X8XrKFlCvwHQmwRQdjArwH5K6fc0AKvHAFjVoGcUwCwUdbKPHNNrOpw0RVN10MVCRCz8T4A6oI/FiIiTBKh5XFN1EDnRkETEnGrnH2sOSoC60rbqoR8R8zg3bQe102oB0DYPAwB/l/VkgJTSgeo+KDtoA6h1fSN2Me1nUV3JOj7iOT5k/csi5jNe4D2uj+og8lE7rIx4hjt4hIMRRZRyX7UYLqWUjoYsI35VLuCt6tKZ5h7ewa22XH8AgjMTispa6ucAAAAASUVORK5CYII="},28:function(t,e){t.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAAsQAAALEBxi1JjQAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAEYSURBVEiJ7dS9SgNBFMXxX0y0NNpLqjQiKRRETON7aBMfwLfxDcRGC8HOTm21s7RIYZdniGiRO+6y5mNXVxD0wMBw58z532Fnh1+kFq5jNH8C0MFbjE7ZTUsVAEsz5rUBvqR/wB8CNLFeY+5aZH4ArjDCXsHYNv+vbWK1UNuNrMs8oGfyFGzmjDthvA9QUe1YG4U3aQvL2M4DpqkRHfZxU4C0o9aPxhpzcsDQ5I0ZFOpHGMfas+wtSvNxePIaxNpw0QngHIcR1M3Vu3jFcXhmqsw1vZCdJCmFny3a3CoBSBAm3TbKhlcBJEj6Vo9lN1UBwENF/yfAAVaqhhS0P614J7uCdY1bsh+kh1NsfLP7pBec4KmmvNl6B0BuQt0zCQ0xAAAAAElFTkSuQmCC"},86:function(t,e,s){t.exports=s(102)},97:function(t,e){},98:function(t,e){},99:function(t,e){}},[[86,1,2]]]);
//# sourceMappingURL=main.08fd3e1f.chunk.js.map