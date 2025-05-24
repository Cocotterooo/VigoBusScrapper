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

interface BusInfo {
  line: string
  route: string
  minutes: string
}
