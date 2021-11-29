import { pageId }                           from '@acq/chrome/src/Chrome'
import { humanScale, parsePath }            from '@acq/path'
import { deco, decoFlat, logger, says, Xr } from '@spare/logger'
import { range }                            from '@vect/vector-init'
import fs, { promises }                     from 'fs'
import ProgressBar                          from 'progress'
import puppeteer                            from 'puppeteer'
import { Readable }   from 'stream'
import { BarFactory } from '../src/progress-arch/multiBar'

const RESPONSE = 'response'
const multiBar = BarFactory.build()

// const url = 'https://unsplash.com/photos/AaEQmoufHLk/download?force=true'
// const url = 'https://en.wikipedia.org/wiki/Coca-Cola#/media/File:6_Coca-Cola_bottles.jpg'
const url = 'https://static.dezeen.com/uploads/2021/11/nodi-office-white-arkitekter-extra_dezeen_2364_col_1.jpg'
const checkResponse = response => {
  const ok = response.ok()
  const status = response.status()
  const url = response.url()
  const type = response.request().resourceType()
  const size = response.headers()['content-length']
  return { ok, status, type, size, url }

}
const test = async (url, log) => {


  const PAGE_COUNT = 2
  const browser = await puppeteer.launch()
  const pages = await Promise.all(range(1, PAGE_COUNT).map(() => browser.newPage()))
  if (log) Xr().pages(decoFlat(pages.map(pageId))) |> says['chrome'].br('created')
  const page = pages[0]

  page.on(RESPONSE, async response => {
    const info = checkResponse(response)
    const headers = response.headers()
    const origSize = headers['cf-polished'].toString().match(/(?<=origSize=)\d+/)
    if (log) Xr().agent(pageId(page)).response(info |> deco) |> says['puppeteer'].br('response')
    let { dir, base, ext } = parsePath(info.url)
    if (headers['content-type'] === 'image/webp') { ext = '.webp' }

    const filename = process.cwd() + '/images/' + base + ext


    if (info.type === 'image' || info.type === 'document') {
      const file = await promises.writeFile(filename, '')
      const buffer = await response.buffer()

      Xr().headers(headers |> deco).origSize(humanScale(+origSize)).buffSize(humanScale(buffer.length)) |> logger

      const payload = { agent: pageId(page), topic: base, status: info.status }
      // let bar = multiBar.create(buffer.length, 0, payload)

      const bar = new ProgressBar('>> [:bar] :percent :etas', {
        width: 40,
        complete: '=',
        incomplete: ' ',
        renderThrottle: 1,
        total: parseInt(buffer.length)
      })


      {
        const reader = Readable.from(buffer)

        // const reader = new stream.PassThrough()
        // reader.end(buffer)

        const writer = fs.createWriteStream(filename)

        reader.on('open', () => {
          console.log('opening')
        })
        reader.on('data', chunk => {
          Xr().data(chunk.length) |> says['reader']
          bar.update(chunk.length, payload)
          bar.tick(chunk.length)
        })
        reader.on('close', () => {
          console.log('\nEnded')
          console.log('bar total: ' + bar.total)
          // console.log('bar value: ' + bar.value)
          // bar.stop()
        })

        reader.pipe(writer)
      }


      // buffer.length |> says['buffer.length']
      // await pipeline(
      //   Readable.from(buffer),
      //   async function* (source, signal) {
      //     // source.setEncoding('utf8')  // Work with strings rather than `Buffer`s.
      //     for await (const chunk of source) {
      //       yield await bar.update(chunk?.length, payload)
      //     }
      //   },
      //   fs.createWriteStream(filename)
      // )
      // console.log('Pipeline succeeded.')
    }
  })
  await page.goto(url, { waitUntil: 'networkidle2' })
  multiBar.stop()
  // const contractor = Contractor.build(pageSelector, pages, pageId) // the internal pageSelector use page as 'this'
  // const samples = await contractor.takeOrders(urls, log)
  // if (log) Xr().pages(decoFlat(pages.map(pageId))) |> says['chrome'].br('closing')
  await Promise.all(pages.map(page => page.close()))
  await browser.close()
}

test(url, true).then()