import { createStore } from 'effector'
import { setDetectionDelay } from './events'
import { State } from './types'

const initialState = (): State => ({
  detectionDelay: 50,
  video: {
    width: 640,
    height: 480
  }
})

export const $app = createStore<State>(initialState())
  .on(setDetectionDelay, (state, value) => {
    return { ...state, detectionDelay: value }
  })

export default $app
