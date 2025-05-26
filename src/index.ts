import express from 'express'

import busesRouter from './api/routes/buses'
import diaryRouter from './api/routes/diaries'
// import scrapeBuses from './busScrapping/busScrapping'

/*
scrapeBuses(8700).then(info => { // Comercio: 8460 Peritos: 14227 CUVI-EEI: 8700
  console.log(info.stopInfo)
  console.table(info.buses)
}).catch(error => {
  console.error('Error al extraer datos:', error)
})

scrapeBuses(14227).then(info => { // Comercio: 8460 Peritos: 14227 CUVI-EEI: 8700
  console.log(info.stopInfo)
  console.table(info.buses)
}).catch(error => {
  console.error('Error al extraer datos:', error)
})
scrapeBuses(8460).then(info => { // Comercio: 8460 Peritos: 14227 CUVI-EEI: 8700
  console.log(info.stopInfo)
  console.table(info.buses)
}).catch(error => {
  console.error('Error al extraer datos:', error)
})
*/

const app = express()
app.use(express.json()) // Middleware que transforma el req.body a JSON
const PORT = 8081

app.get('/ping', (_req, res) => {
  console.log('✅ GET /ping')
  res.send('¡pong! ' + new Date().toLocaleString())
})

app.use('/api/diaries', diaryRouter)
app.use('/api/buses', busesRouter)

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`)
})
