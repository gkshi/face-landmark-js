import { FacemeshDomain } from './domain'

export const setFacemeshIsReady = FacemeshDomain.createEvent<boolean>('')

export const setFacemeshDetectionDelay = FacemeshDomain.createEvent<number>('')

export const setFacemeshIsActive = FacemeshDomain.createEvent<boolean>('')
