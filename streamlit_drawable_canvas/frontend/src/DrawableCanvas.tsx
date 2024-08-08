import React, { useEffect, useState } from "react"
import {
  ComponentProps,
  Streamlit,
  withStreamlitConnection,
} from "streamlit-component-lib"
import { fabric } from "fabric"
import { isEqual } from "lodash"

import CanvasToolbar from "./components/CanvasToolbar"
import UpdateStreamlit from "./components/UpdateStreamlit"

import { useCanvasState } from "./DrawableCanvasState"
import { tools, FabricTool } from "./lib"

function getStreamlitBaseUrl(): string | null {
  const params = new URLSearchParams(window.location.search)
  const baseUrl = params.get("streamlitUrl")
  if (baseUrl == null) {
    return null
  }

  try {
    return new URL(baseUrl).origin
  } catch {
    return null
  }
}

/**
 * Arguments Streamlit receives from the Python side
 */
export interface PythonArgs {
  fillColor: string
  strokeWidth: number
  strokeColor: string
  backgroundColor: string
  backgroundImageURL: string
  realtimeUpdateStreamlit: boolean
  canvasWidth: number
  canvasHeight: number
  drawingMode: string
  initialDrawing: Object
  displayToolbar: boolean
  displayRadius: number
  scaleFactors: number[] // Add scaleFactors here
  axes_and_labels: boolean
}

/**
 * Define logic for the canvas area
 */
const DrawableCanvas = ({ args }: ComponentProps) => {
  const {
    canvasWidth,
    canvasHeight,
    backgroundColor,
    backgroundImageURL,
    realtimeUpdateStreamlit,
    drawingMode,
    fillColor,
    strokeWidth,
    strokeColor,
    displayRadius,
    initialDrawing,
    displayToolbar,
    scaleFactors, // Destructure scaleFactors from args
    axes_and_labels,
  }: PythonArgs = args

  /**
   * State initialization
   */
  const [canvas, setCanvas] = useState(new fabric.Canvas(""))
  canvas.stopContextMenu = true
  canvas.fireRightClick = true

  const [backgroundCanvas, setBackgroundCanvas] = useState(
    new fabric.StaticCanvas("")
  )
  const {
    canvasState: {
      action: { shouldReloadCanvas, forceSendToStreamlit },
      currentState,
      initialState,
    },
    saveState,
    undo,
    redo,
    canUndo,
    canRedo,
    forceStreamlitUpdate,
    resetState,
  } = useCanvasState()

  /**
   * Initialize canvases on component mount
   * NB: Remount component by changing its key instead of defining deps
   */
  useEffect(() => {
    const c = new fabric.Canvas("canvas", {
      enableRetinaScaling: false,
    })
    const imgC = new fabric.StaticCanvas("backgroundimage-canvas", {
      enableRetinaScaling: false,
    })
    setCanvas(c)
    setBackgroundCanvas(imgC)
    Streamlit.setFrameHeight()
  }, [])

  /**
   * Load user drawing into canvas
   * Python-side is in charge of initializing drawing with background color if none provided
   */
  useEffect(() => {
    if (!isEqual(initialState, initialDrawing)) {
      canvas.loadFromJSON(initialDrawing, () => {
        canvas.renderAll()
        resetState(initialDrawing)
      })
    }
  }, [canvas, initialDrawing, initialState, resetState])

  /**
   * Update background image
   */
  useEffect(() => {
    if (backgroundImageURL) {
      var bgImage = new Image()
      bgImage.onload = function () {
        backgroundCanvas.getContext().drawImage(bgImage, 0, 0) //0.5, 0.5
      }
      const baseUrl = getStreamlitBaseUrl() ?? ""
      bgImage.src = baseUrl + backgroundImageURL
    }
  }, [
    canvas,
    backgroundCanvas,
    canvasHeight,
    canvasWidth,
    backgroundColor,
    backgroundImageURL,
    saveState,
  ])

  /**
   * If state changed from undo/redo/reset, update user-facing canvas
   */
  useEffect(() => {
    if (shouldReloadCanvas) {
      canvas.loadFromJSON(currentState, () => {})
    }
  }, [canvas, shouldReloadCanvas, currentState])

  /**
   * Update canvas with selected tool
   * PS: add initialDrawing in dependency so user drawing update reinits tool
   */
  useEffect(() => {
    // Update canvas events with selected tool
    const selectedTool = new tools[drawingMode](canvas) as FabricTool
    const cleanupToolEvents = selectedTool.configureCanvas({
      fillColor: fillColor,
      strokeWidth: strokeWidth,
      strokeColor: strokeColor,
      displayRadius: displayRadius,
      scaleFactors: scaleFactors,
      canvasHeight: canvasHeight,
      canvasWidth: canvasWidth,
      axes_and_labels: false,
    })
    canvas.on("mouse:up", (e: any) => {
      saveState(canvas.toJSON())
      if (e["button"] === 3) {
        forceStreamlitUpdate()
      }
    })

    canvas.on("mouse:dblclick", () => {
      saveState(canvas.toJSON())
    })

    // Cleanup tool + send data to Streamlit events
    return () => {
      cleanupToolEvents()
      canvas.off("mouse:up")
      canvas.off("mouse:dblclick")
    }
  }, [
    canvas,
    strokeWidth,
    strokeColor,
    displayRadius,
    fillColor,
    drawingMode,
    initialDrawing,
    scaleFactors, // <-- Added dependency
    axes_and_labels,
    canvasHeight,
    canvasWidth,
    saveState,
    forceStreamlitUpdate,
  ])

  // Add a state variable to track if the rectangles and tick marks have been drawn
  const [isDrawn, setIsDrawn] = useState(false)
  //console.log(axes_and_labels)
  useEffect(() => {
    if (axes_and_labels && !isDrawn) {
      const objects = []
      const rect = new fabric.Rect({
        //scaleFactors = [xlim, ylim, bottom_margin, left_margin, top_margin, right_margin]
        left: scaleFactors[3], //0.12 * canvasWidth, // Adjusted from 0.1 to 0.12
        top: scaleFactors[4], //0.05 * canvasHeight
        fill: "transparent",
        stroke: "black",
        width: canvasWidth - scaleFactors[3] - scaleFactors[5], //0.83 * canvasWidth, // Adjusted width to maintain the same right edge
        height: canvasHeight - scaleFactors[2] - scaleFactors[4], // 0.8 * canvasHeight,
        selectable: false,
        evented: false,
        hasControls: false,
        lockMovementX: true,
        lockMovementY: true,
        lockRotation: true,
      })
      objects.push(rect)

      const rectLeft = scaleFactors[3]
      const rectTop = scaleFactors[4]
      const rectWidth = canvasWidth - scaleFactors[3] - scaleFactors[5] // Adjusted width to maintain the same right edge
      const rectHeight = canvasHeight - scaleFactors[2] - scaleFactors[4]

      // Add tick marks, numbers, and lines to the left side
      for (let i = 0; i <= 10; i++) {
        const y = rectTop + (i * rectHeight) / 10
        const tick = new fabric.Line([rectLeft - 5, y, rectLeft, y], {
          stroke: "black",
          selectable: false,
          evented: false,
          hasControls: false,
          lockMovementX: true,
          lockMovementY: true,
          lockRotation: true,
        })
        const text = new fabric.Text(
          (scaleFactors[1] - (i * scaleFactors[1]) / 10).toString(),
          {
            left: rectLeft - 35,
            top: y - 10,
            fontSize: 20,
            fill: "black",
            selectable: false,
            evented: false,
            hasControls: false,
            lockMovementX: true,
            lockMovementY: true,
            lockRotation: true,
          }
        )
        const hLine = new fabric.Line([rectLeft, y, rectLeft + rectWidth, y], {
          stroke: "lightgray",
          selectable: false,
          evented: false,
          hasControls: false,
          lockMovementX: true,
          lockMovementY: true,
          lockRotation: true,
        })
        objects.push(tick, text, hLine)
      }

      // Add tick marks, numbers, and lines to the bottom side
      for (let i = 0; i <= 10; i++) {
        const x = rectLeft + (i * rectWidth) / 10
        const tick = new fabric.Line(
          [x, rectTop + rectHeight, x, rectTop + rectHeight + 5],
          {
            stroke: "black",
            selectable: false,
            evented: false,
            hasControls: false,
            lockMovementX: true,
            lockMovementY: true,
            lockRotation: true,
          }
        )
        const text = new fabric.Text(((i * scaleFactors[0]) / 10).toString(), {
          left: x - 7,
          top: rectTop + rectHeight + 10,
          fontSize: 20,
          fill: "black",
          selectable: false,
          evented: false,
          hasControls: false,
        })
        const vLine = new fabric.Line([x, rectTop, x, rectTop + rectHeight], {
          stroke: "lightgray",
          selectable: false,
          evented: false,
          hasControls: false,
          lockMovementX: true,
          lockMovementY: true,
          lockRotation: true,
        })
        objects.push(tick, text, vLine)
      }

      // Add x-axis title
      const xAxisTitle = new fabric.Text("Quantity, Q", {
        left: rectLeft + rectWidth / 2,
        top: rectTop + rectHeight + 40,
        fontSize: 24,
        fontStyle: "italic", // Set text to italics
        fill: "black",
        originX: "center",
        selectable: false,
        evented: false,
        hasControls: false,
        lockMovementX: true,
        lockMovementY: true,
        lockRotation: true,
      })
      objects.push(xAxisTitle)

      // Add y-axis title
      const yAxisTitle = new fabric.Text("Price, P", {
        left: rectLeft - 65, // Adjusted for more space
        top: rectTop + rectHeight / 2,
        fontSize: 24,
        fontStyle: "italic", // Set text to italics
        fill: "black",
        originX: "center",
        originY: "center",
        angle: -90,
        selectable: false,
        evented: false,
        hasControls: false,
        lockMovementX: true,
        lockMovementY: true,
        lockRotation: true,
      })
      objects.push(yAxisTitle)
      // Move the first element (rect) to the last position (when rectangle is drawn first, it is overlapped by others)
      const firstElement = objects.shift()
      objects.push(firstElement)

      // Change the color of the rectangle
      if (firstElement instanceof fabric.Rect) {
        firstElement.set({ fill: "" }) // Change 'blue' to any color you want
      }
      const filteredObjects = objects.filter(
        (obj): obj is fabric.Object => obj !== undefined
      )
      const group = new fabric.Group(filteredObjects, {
        selectable: false,
        evented: false,
        hasControls: false,
        lockMovementX: true,
        lockMovementY: true,
        lockRotation: true,
      })

      canvas.add(group)
      canvas.renderAll()
      setIsDrawn(true) // Set the state variable to true after drawing
    }
  }, [
    axes_and_labels,
    canvas,
    canvasWidth,
    canvasHeight,
    isDrawn,
    scaleFactors,
  ])
  /**
   * Render canvas w/ toolbar
   */
  return (
    <div style={{ position: "relative" }}>
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          zIndex: -10,
          visibility: "hidden",
        }}
      >
        <UpdateStreamlit
          canvasHeight={canvasHeight}
          canvasWidth={canvasWidth}
          shouldSendToStreamlit={
            realtimeUpdateStreamlit || forceSendToStreamlit
          }
          stateToSendToStreamlit={currentState}
        />
      </div>
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          zIndex: 0,
        }}
      >
        <canvas
          id="backgroundimage-canvas"
          width={canvasWidth}
          height={canvasHeight}
        />
      </div>
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          zIndex: 10,
        }}
      >
        <canvas
          id="canvas"
          width={canvasWidth}
          height={canvasHeight}
          style={{ border: "lightgrey 1px solid" }}
        />
      </div>
      {displayToolbar && (
        <CanvasToolbar
          topPosition={canvasHeight}
          leftPosition={canvasWidth}
          canUndo={canUndo}
          canRedo={canRedo}
          downloadCallback={forceStreamlitUpdate}
          undoCallback={undo}
          redoCallback={redo}
          resetCallback={() => {
            resetState(initialState)
          }}
        />
      )}
    </div>
  )
}

export default withStreamlitConnection(DrawableCanvas)
