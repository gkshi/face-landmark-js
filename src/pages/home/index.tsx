import React from 'react'
import { useStore } from 'effector-react'
import $app from '../../store/app/store'

import VideoContainer from '../../components/video-container'
import Loader from '../../components/loader'

import './_index.scss'

function HomePage () {
  const app = useStore($app)

  const isLoading = () => !app.isFacemeshReady

  return (
    <div className={`page -home ${isLoading() ? '-loading' : ''}`}>
      {isLoading() && <Loader/>}
      <VideoContainer />
    </div>
  )
}

export default HomePage
