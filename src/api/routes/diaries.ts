import express from 'express'

import * as diaryService from '../services/diaryService'
console.log(Object.keys(diaryService))

const router = express.Router()

router.get('/', (_req, res) => {
  console.log('✅ GET /diaries')
  const diaries = diaryService.getDiaries()
  res.send(diaries)
})

router.get('/non-sensitive', (_req, res) => {
  console.log('✅ GET /diariesWithoutSensitive')
  res.send(diaryService.getNonSensitiveDiaries())
})

router.get('/:id', (req, res) => {
  const diary = diaryService.getById(Number(req.params.id))
  console.log('✅ GET /id/' + req.params.id)

  if (diary != null) {
    res.send(diary)
  } else {
    res.status(404).send('Diary entry not found')
  }
})

router.post('/', (req, res) => {
  console.log('✅ POST /diaries')
  const { date, weather, visibility, comment } = req.body

  const newDiaryEntry = diaryService.addDiary({
    date,
    weather,
    visibility,
    comment
  })
  res.json(newDiaryEntry)
})

export default router
