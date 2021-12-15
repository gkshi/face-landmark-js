import React, { useEffect, useRef, useState } from 'react'
// import * as tf from '@tensorflow/tfjs'
import * as facemesh from '@tensorflow-models/face-landmarks-detection'
import '@tensorflow/tfjs-backend-webgl'
import { drawMesh } from '../../helpers/drawer'
import { setDetectionDelay, setIsFacemeshReady, setIsFacemeshActive } from '../../store/app/events'
import { useStore } from 'effector-react'
import { $app } from '../../store/app/store'

import Webcam from 'react-webcam'

import './_index.scss'

function VideoContainerComponent () {
  const [isReadyToDetect, setIsReadyToDetect] = useState(false)
  const app = useStore($app)
  const [net, setNet] = useState(null)
  const canvasRef = useRef(null)
  const webcamRef = useRef(null)

  const detect = async () => {
    if (!isReadyToDetect) {
      return
    }
    setIsReadyToDetect(false)
    if (webcamRef.current) {
      const video = (webcamRef.current as Webcam).video as HTMLVideoElement
      const videoWidth = video.videoWidth
      const videoHeight = video.videoHeight

      webcamRef.current.video.width = videoWidth
      webcamRef.current.video.height = videoHeight

      canvasRef.current.width = videoWidth
      canvasRef.current.height = videoHeight

      if (video && video.readyState === 4) {
        const faces = await net.estimateFaces({
          input: video
        })
        if (!app.isFacemeshReady) {
          setIsFacemeshReady(true)
        }
        const ctx = canvasRef.current.getContext('2d')
        drawMesh({ predictions: faces, ctx })
      }
    }
    setIsReadyToDetect(true)
  }

  const startDetector = () => {
    setIsReadyToDetect(true)
  }

  const runFacemesh = async () => {
    const net = await facemesh.load(facemesh.SupportedPackages.mediapipeFacemesh)
    setNet(net)
    startDetector()
  }

  const onDelayChange = (e) => {
    e.preventDefault()
    setDetectionDelay(+e.target.value)
  }

  const onActiveChange = (e) => {
    e.preventDefault()
    setIsFacemeshActive(e.target.checked)
  }

  const turnOnFacemesh = () => {
    // runFacemesh()
    startDetector()
  }

  const turnOffFacemesh = () => {
    const canvas = canvasRef.current
    const context = canvas.getContext('2d')
    setTimeout(() => {
      context.clearRect(0, 0, canvas.width, canvas.height)
    }, 1000)
  }

  useEffect(() => {
    if (isReadyToDetect && app.isFacemeshActive) {
      setTimeout(detect, app.detectionDelay)
    }
  }, [isReadyToDetect])

  useEffect(() => {
    switch (app.isFacemeshActive) {
      case true:
        if (isReadyToDetect) {
          setTimeout(detect, app.detectionDelay)
        }
        break
      case false:
        turnOffFacemesh()
        break
    }
  }, [app.isFacemeshActive])

  useEffect(() => {
    runFacemesh()
  }, [])

  return (
    <div className="component -video-container flex a-center">
      <div className="box flex center">
        <canvas ref={canvasRef} className="canvas"></canvas>
        <Webcam ref={webcamRef} className="webcam" />
        <div className="no-video">
          Allow access to your camera in the browser.
        </div>
      </div>
      <div className="options flex column a-start">
        <div>options</div>
        <div>
          <label htmlFor="isactive_checkbox">Neural network active</label>
          <input type="checkbox" id="isactive_checkbox" checked={app.isFacemeshActive} onChange={e => onActiveChange(e)} />
        </div>
        <div>
          <label htmlFor="redraw_delay">Detection delay</label>
          <input
            type="number"
            id="redraw_delay"
            value={app.detectionDelay}
            min={0}
            max={5000}
            onInput={e => onDelayChange(e)} />
          <span>ms</span>
        </div>
      </div>
    </div>
  )
}

export default VideoContainerComponent
