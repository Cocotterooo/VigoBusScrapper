import express from 'express'

import * as busesService from '../services/busesService'
console.log(Object.keys(busesService))

const router = express.Router()

export default router

router.get('/stopAllInfo/:id', async (req, res) => {
  console.log('✅ GET /stopAllInfo/:id')
  const { id } = req.params

  const buses = await busesService.getStopAllInfoById(Number(id))
  res.json(buses)
})

router.get('/stopTrackingInfo/:id', async (req, res) => {
  console.log('✅ GET /stopTrackingInfo/:id')
  const { id } = req.params

  const buses = await busesService.getTrackingInfoById(Number(id))
  res.json(buses)
})

router.get('/stopIncomingBuses/:id', async (req, res) => {
  console.log('✅ GET /stopIncomingBuses/:id')
  const { id } = req.params

  const buses = await busesService.getIncomingBusesById(Number(id))
  res.json(buses)
})
