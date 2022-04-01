import React, { MutableRefObject, useEffect, useRef, useState } from 'react'
import * as nn from '@tensorflow-models/face-landmarks-detection'
// import '@tensorflow/tfjs-backend-webgl'
import Webcam from 'react-webcam'
import { setFacemeshIsReady } from '../../store/facemesh/events'
import { drawMesh } from '../../helpers/drawer'
import { useStore } from 'effector-react'
import { $facemesh } from '../../store/facemesh/store'
import $app from '../../store/app/store'

interface FacemeshModuleProps extends React.ComponentProps<any> {
  webcamRef?: MutableRefObject<any>
}

function FacemeshModuleComponent ({ webcamRef }: FacemeshModuleProps) {
  const [isReadyToDetect, setIsReadyToDetect] = useState(false)
  const [canvasContext, setCanvasContext] = useState(null)
  const [net, setNet] = useState(null)
  const canvasRef = useRef(null)
  const facemesh = useStore($facemesh)
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
        if (!facemesh.isReady) {
          setFacemeshIsReady(true)
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

  const runFacemesh = async () => {
    const net = await nn.load(nn.SupportedPackages.mediapipeFacemesh)
    setNet(net)
    startDetector()
  }

  const turnOffFacemesh = () => {
    setTimeout(clearCanvas, 1000)
  }

  useEffect(() => {
    if (isReadyToDetect && facemesh.isActive) {
      setTimeout(detect, app.detectionDelay)
    }
  }, [isReadyToDetect])

  useEffect(() => {
    switch (facemesh.isActive) {
      case true:
        if (isReadyToDetect) {
          setTimeout(detect, app.detectionDelay)
        }
        break
      case false:
        turnOffFacemesh()
        break
    }
  }, [facemesh.isActive])

  useEffect(() => {
    setCanvasContext(canvasRef.current.getContext('2d'))
    runFacemesh()
  }, [])

  return (
    <div className="component -facemesh-module">
      <canvas ref={canvasRef} width={app.video.width} height={app.video.height}></canvas>
    </div>
  )
}

export default FacemeshModuleComponent
