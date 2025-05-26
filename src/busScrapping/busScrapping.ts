import { chromium } from 'playwright'
import { TrackingBusInfo, TrackingStopInfo, TrackingActualStopInfoNoLines } from '../types'

async function scrapeBuses (parada: number): Promise<{ stopInfo: TrackingActualStopInfoNoLines }> {
  const browser = await chromium.launch({
    headless: true,
    timeout: 15000,
    args: ['--use-gl=egl', '--enable-unsafe-webgpu', '--ignore-gpu-blacklist']
  })
  const context = await browser.newContext({ javaScriptEnabled: true, ignoreHTTPSErrors: true, isMobile: true })
  const page = await context.newPage()

  const URL = `http://infobus.vitrasa.es:8002/Default.aspx?parada=${parada}`

  // Extraer la información de los buses entrantes
  const extraerBuses = async (): Promise<TrackingBusInfo[]> => {
    return await page.$$eval('tr:has(td)', rows =>
      rows
        .map(row => {
          const cells = row.querySelectorAll('td')
          return {
            line: cells[0]?.textContent?.trim() ?? '',
            route: cells[1]?.textContent?.trim() ?? '',
            minutes: Number(cells[2]?.textContent?.trim()) ?? ''
          }
        })
        .filter(bus =>
          bus.line !== '' &&
          bus.route !== '' &&
          bus.line !== '12'
        )
    )
  }

  // Extraer la información de la parada
  const extraerParada = async (): Promise<TrackingStopInfo> => {
    const site = await page.$eval('#lblNombre', el => el.textContent?.trim() ?? '')
    const id = Number(await page.$eval('#lblParada', el => el.textContent?.trim() ?? ''))
    const hour = await page.$eval('#lblHora', el => el.textContent?.trim().replace('Hora: ', '') ?? '')
    return { site, id, hour }
  }

  try {
    await page.goto(URL)
    const stopInfo = await extraerParada()

    await page.waitForSelector('tr:has(td)', { timeout: 10000 })
    let incomingBuses: TrackingBusInfo[] = []
    const enlace = await page.locator('table tr td a', { hasText: '2' })
    incomingBuses = await extraerBuses()

    // Si hay un enlace a la segunda página, lo clicamos y extraemos los buses de esa página
    if (await enlace.count() > 0) {
      await enlace.first().click()
      incomingBuses.push(...await extraerBuses())
    }

    // Devolver la información de la parada y los buses entrantes
    const totalIncomingBuses = incomingBuses.length
    return { stopInfo: { ...stopInfo, totalIncomingBuses, incomingBuses } }
  } catch (err) {
    console.error(err)
    return { stopInfo: { site: 'null', id: 0, hour: 'null', totalIncomingBuses: 0, incomingBuses: [] } }
  } finally {
    await browser.close().catch(() => {})
  }
}

export default scrapeBuses
