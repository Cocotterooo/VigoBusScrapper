import { DiaryEntry, NewDiaryEntry, NonSensitiveDiaryEntry } from '../../types'

import diaryData from './diaries.json'

const diaries: DiaryEntry[] = diaryData as DiaryEntry[]

export const getDiaries = (): DiaryEntry[] => {
  console.log(diaries)
  return diaries
}
export const getNonSensitiveDiaries = (): NonSensitiveDiaryEntry[] => {
  return diaries.map(({ id, date, weather, visibility }) => {
    return {
      id,
      date,
      weather,
      visibility
    }
  })
}

export const getById = (id: number): DiaryEntry | undefined => {
  // Puede ser undefined si no se encuentra el id
  const entry = diaries.find(diary => diary.id === id)
  return entry
}

export const addDiary = (newDiaryEntry: NewDiaryEntry): DiaryEntry => {
  const newDiary = {
    id: diaries.length + 1,
    ...newDiaryEntry
  }
  diaries.push(newDiary)
  return newDiary
}
