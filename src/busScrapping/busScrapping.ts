import { chromium } from 'playwright'
import { BusInfo } from '../types'

async function scrapeBuses (): Promise<BusInfo[]> {
  // 1. Configuración más ligera del navegador
  const browser = await chromium.launch({
    headless: true, // Asegurarse que está en modo headless
    timeout: 15000 // Tiempo de espera reducido
  })

  const context = await browser.newContext({
    javaScriptEnabled: true,
    ignoreHTTPSErrors: true
  })

  const page = await context.newPage()

  // 2. Bloquear recursos innecesarios
  await page.route('**/*.{png,jpg,jpeg,svg,gif,webp,css,woff,woff2}', async route => await route.abort())

  // 3. Navegación optimizada
  await Promise.all([
    page.goto('http://infobus.vitrasa.es:8002/Default.aspx?parada=14227', {
      waitUntil: 'domcontentloaded',
      timeout: 15000
    }),
    page.waitForSelector('tr:has(td)', { state: 'attached', timeout: 10000 })
  ])

  // 4. Extracción directa sin conversiones innecesarias
  const cleanBuses = await page.$$eval('tr:has(td)', rows =>
    rows.map(row => {
      const cells = row.querySelectorAll('td')
      return {
        line: cells[0]?.textContent?.replace(/\s+/g, '').trim() || '',
        route: cells[1]?.textContent?.replace(/\s+/g, ' ').trim() || '',
        minutes: cells[2]?.textContent?.replace(/\D/g, '').trim() || ''
      }
    }).filter(bus => bus.line && bus.route && bus.minutes)
  )

  // 5. Cierre rápido sin esperar
  await browser.close().catch(() => {}) // Ignorar errores de cierre

  return cleanBuses
}

export default scrapeBuses
