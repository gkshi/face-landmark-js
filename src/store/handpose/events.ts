import { HandposeDomain } from './domain'

export const setHandposeIsReady = HandposeDomain.createEvent<boolean>('')

export const setHandposeDetectionDelay = HandposeDomain.createEvent<number>('')

export const setHandposeIsActive = HandposeDomain.createEvent<boolean>('')
