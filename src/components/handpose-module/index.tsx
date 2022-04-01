import React, { MutableRefObject, useEffect, useRef, useState } from 'react'
import * as handPoseDetection from '@tensorflow-models/hand-pose-detection'
// import { createDetector } from '@tensorflow-models/hand-pose-detection'
// import '@tensorflow/tfjs-backend-webgl'
import Webcam from 'react-webcam'
import { setHandposeIsReady } from '../../store/handpose/events'
import { drawMesh } from '../../helpers/drawer'
import { useStore } from 'effector-react'
import $app from '../../store/app/store'
import $handpose from '../../store/handpose/store'

// const createDetector = require('@tensorflow-models/hand-pose-detection/dist/create_detector')

interface HandposeModuleProps extends React.ComponentProps<any> {
  webcamRef?: MutableRefObject<any>
}

function HandposeModuleComponent ({ webcamRef }: HandposeModuleProps) {
  const [isReadyToDetect, setIsReadyToDetect] = useState(false)
  const [canvasContext, setCanvasContext] = useState(null)
  const [net, setNet] = useState(null)
  const canvasRef = useRef(null)
  const handpose = useStore($handpose)
  const app = useStore($app)

  const clearCanvas = () => {
    const canvas = canvasRef.current
    canvasContext && canvasContext.clearRect(0, 0, canvas.width, canvas.height)
  }

  const detect = async () => {
    if (!isReadyToDetect) {
      return
    }
    setIsReadyToDetect(false)
    if (webcamRef.current) {
      const video = (webcamRef.current as Webcam).video as HTMLVideoElement

      if (video && video.readyState === 4) {
        const faces = await net.estimateFaces({ input: video })
        if (!handpose.isReady) {
          setHandposeIsReady(true)
        }
        clearCanvas()
        drawMesh({ predictions: faces, ctx: canvasContext })
      }
    }
    setIsReadyToDetect(true)
  }

  const startDetector = () => {
    setIsReadyToDetect(true)
  }

  const runHandpose = async () => {
    const model = handPoseDetection.SupportedModels.MediaPipeHands
    // const net = await handPoseDetection.load(model)
    // @ts-ignore
    // const detector = await createDetector('MediaPipeHands')
    const detector = await handPoseDetection.createDetector(model)
    console.log('detector', detector)
    // setNet(net)
    startDetector()
  }

  const turnOffHandpose = () => {
    setTimeout(clearCanvas, 1000)
  }

  useEffect(() => {
    if (isReadyToDetect && handpose.isActive) {
      setTimeout(detect, app.detectionDelay)
    }
  }, [isReadyToDetect])

  useEffect(() => {
    switch (handpose.isActive) {
      case true:
        if (isReadyToDetect) {
          setTimeout(detect, app.detectionDelay)
        }
        break
      case false:
        turnOffHandpose()
        break
    }
  }, [handpose.isActive])

  useEffect(() => {
    setCanvasContext(canvasRef.current.getContext('2d'))
    runHandpose()
  }, [])

  return (
    <div className="component -facemesh-module">
      <canvas ref={canvasRef} width={app.video.width} height={app.video.height}>handpose module</canvas>
    </div>
  )
}

export default HandposeModuleComponent
