import { AppDomain } from './domain'

export const setIsFacemeshReady = AppDomain.createEvent<boolean>('')

export const setDetectionDelay = AppDomain.createEvent<number>('')

export const setIsFacemeshActive = AppDomain.createEvent<boolean>('')
