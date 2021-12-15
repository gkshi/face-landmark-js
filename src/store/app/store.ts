import { createStore } from 'effector'
import { setIsFacemeshActive, setDetectionDelay, setIsFacemeshReady } from './events'
import { State } from './types'

const initialState = (): State => ({
  isFacemeshReady: false,
  isFacemeshActive: true,
  detectionDelay: 50
})

export const $app = createStore<State>(initialState())
  .on(setIsFacemeshReady, (state, value) => {
    console.log('setIsFacemeshReady', value)
    return { ...state, isFacemeshReady: value }
  })

  .on(setIsFacemeshActive, (state, value) => {
    return { ...state, isFacemeshActive: value }
  })

  .on(setDetectionDelay, (state, value) => {
    console.log('setDetectionDelay', value)
    return { ...state, detectionDelay: value }
  })

export default $app
