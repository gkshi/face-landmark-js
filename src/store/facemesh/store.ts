import { createStore } from 'effector'
import { setFacemeshIsActive, setFacemeshDetectionDelay, setFacemeshIsReady } from './events'
import { State } from './types'

const initialState = (): State => ({
  isReady: false,
  isActive: false,
  detectionDelay: 50
})

export const $facemesh = createStore<State>(initialState())
  .on(setFacemeshIsReady, (state, value) => {
    return { ...state, isReady: value }
  })

  .on(setFacemeshIsActive, (state, value) => {
    return { ...state, isActive: value }
  })

  .on(setFacemeshDetectionDelay, (state, value) => {
    return { ...state, detectionDelay: value }
  })

export default $facemesh
