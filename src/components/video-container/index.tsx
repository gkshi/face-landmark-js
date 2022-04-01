import React, { useRef } from 'react'
import '@tensorflow/tfjs-backend-webgl'
import { useStore } from 'effector-react'
import Webcam from 'react-webcam'
import { setDetectionDelay } from '../../store/app/events'
import { setFacemeshIsActive } from '../../store/facemesh/events'
import $app from '../../store/app/store'
import $facemesh from '../../store/facemesh/store'
import $handpose from '../../store/handpose/store'

import FacemeshModule from '../facemesh-module'
import HandposeModule from '../handpose-module'
import UICheckbox from '../ui/checkbox'

import './_index.scss'
import { setHandposeIsActive } from '../../store/handpose/events'

function VideoContainerComponent () {
  const app = useStore($app)
  const facemesh = useStore($facemesh)
  const handpose = useStore($handpose)
  const webcamRef = useRef(null)

  const videoConstraints = {
    width: app.video.width,
    height: app.video.height
  }

  const onDelayChange = (e) => {
    e.preventDefault()
    setDetectionDelay(+e.target.value)
  }

  const onActiveChange = (e, module) => {
    e.preventDefault()
    switch (module) {
      case 'facemesh':
        return setFacemeshIsActive(e.target.checked)
      case 'handpose':
        return setHandposeIsActive(e.target.checked)
      default:
        break
    }
  }

  return (
    <div className="component -video-container flex a-center">
      <div className="video-box flex center">
        {/* facemesh module */}
        <FacemeshModule webcamRef={webcamRef} />
        {/* hand pose module */}
        <HandposeModule webcamRef={webcamRef} />
        {/* webcam */}
        <Webcam ref={webcamRef} className="webcam" videoConstraints={videoConstraints} />
        <div className="no-video">
          Allow access to your camera in the browser.
        </div>
      </div>

      <div className="options flex column a-start">
        <h1>Some little experiments with tensorflow</h1>
        <br/>
        <h3>options</h3>
        <div>
          <UICheckbox
            checked={facemesh.isActive}
            onChange={e => onActiveChange(e, 'facemesh')}
          >Enable facemesh</UICheckbox>
        </div>
        <div>
          <UICheckbox
            checked={handpose.isActive}
            onChange={e => onActiveChange(e, 'handpose')}
          >Enable hand pose detection</UICheckbox>
        </div>
        <div>
          <label htmlFor="redraw_delay">Detection delay: </label>
          <input
            type="number"
            id="redraw_delay"
            value={app.detectionDelay}
            min={10}
            max={5000}
            onInput={e => onDelayChange(e)} />
          <span>ms</span>
        </div>
      </div>
    </div>
  )
}

export default VideoContainerComponent
