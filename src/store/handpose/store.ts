import { createStore } from 'effector'
import { setHandposeIsActive, setHandposeDetectionDelay, setHandposeIsReady } from './events'
import { State } from './types'

const initialState = (): State => ({
  isReady: false,
  isActive: false,
  detectionDelay: 50
})

export const $handpose = createStore<State>(initialState())
  .on(setHandposeIsReady, (state, value) => {
    return { ...state, isReady: value }
  })

  .on(setHandposeIsActive, (state, value) => {
    return { ...state, isActive: value }
  })

  .on(setHandposeDetectionDelay, (state, value) => {
    return { ...state, detectionDelay: value }
  })

export default $handpose
