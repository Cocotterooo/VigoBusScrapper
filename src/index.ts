import express from 'express'

import diaryRouter from './api/routes/diaries'
import scrapeBuses from './busScrapping/busScrapping'

// Ejecuta la función e imprime los resultados
scrapeBuses().then(buses => {
  console.log('Autobuses encontrados:')
  console.table(buses)
}).catch(error => {
  console.error('Error al extraer datos:', error)
})

const app = express()
app.use(express.json()) // Middleware que transforma el req.body a JSON
const PORT = 8081

app.get('/ping', (_req, res) => {
  console.log('✅ GET /ping')
  res.send('¡pong! ' + new Date().toLocaleString())
})

app.use('/api/diaries', diaryRouter)

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`)
})
