import scrapeBuses from '@/busScrapping/busScrapping'
import type { TrackingActualStopInfo, TrackingActualStopInfoNoLines, StopInfo, TrackingBusInfo } from '@/types'

import stopsData from './stops.json'

const stops: StopInfo[] = stopsData as StopInfo[]

export const getTrackingInfoById = async (stopId: number): Promise<{ stopInfo: TrackingActualStopInfoNoLines }> => {
  const info = await scrapeBuses(stopId)
  return { stopInfo: info.stopInfo }
}

export const getIncomingBusesById = async (stopId: number): Promise<{ incomingBuses: TrackingBusInfo[] }> => {
  const info = await scrapeBuses(stopId)
  return { incomingBuses: info.stopInfo.incomingBuses }
}

export const getStopAllInfoById = async (stopId: number): Promise<TrackingActualStopInfo> => {
  const info = await scrapeBuses(stopId)
  const completeStop: TrackingActualStopInfo = {
    ...info.stopInfo,
    lines: getStopLinesById(stopId) ?? [],
    ...info.stopInfo
  }
  return completeStop
}

export const getStopById = (id: number): StopInfo | undefined => {
  // Puede ser undefined si no se encuentra el id
  const stop = stops.find(stop => stop.id === id)
  return stop
}

export const getStopLinesById = (id: number): string[] | undefined => {
  // Puede ser undefined si no se encuentra el id
  const stop = stops.find(stop => stop.id === id)
  return stop?.lineas.split(', ') ?? ['error']
}
