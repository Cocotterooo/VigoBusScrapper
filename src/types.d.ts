export type Weather = 'sunny' | 'rainy' | 'cloudy' | 'stormy' | 'snowy'
export type Visibility = 'great' | 'good' | 'ok' | 'poor'

export interface DiaryEntry {
  id: number
  date: string
  weather: Weather
  visibility: Visibility
  comment: string
}

export type NonSensitiveDiaryEntry = Omit<DiaryEntry, 'comment'> // Pick<DiaryEntry, 'id' | 'date' | 'weather' | 'visibility'>

export type NewDiaryEntry = Omit<DiaryEntry, 'id'> // Pick<DiaryEntry, 'date' | 'weather' | 'visibility' | 'comment'>

interface TrackingBusInfo {
  line: string
  route: string
  minutes: number
}
interface TrackingStopInfo {
  site: string
  id: number
  hour: string
}

interface TrackingActualStopInfo extends TrackingStopInfo {
  lines: string[]
  totalIncomingBuses: number
  incomingBuses: TrackingBusInfo[]
}

type TrackingActualStopInfoNoLines = Omit<TrackingActualStopInfo, 'lines'>

interface StopInfo {
  lineas: string
  nombre: string
  id: number
  stop_id: string
  lon: number
  lat: number
}
