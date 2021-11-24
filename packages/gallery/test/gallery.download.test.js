import { parsePath }      from '@acq/path'
import { flop, randBetw } from '@aryth/rand'
import { Contractor }     from '@geia/contractor'
import { deco, says }     from '@spare/logger'
import { time }           from '@valjoux/timestamp'
import axios              from 'axios'
import fs, { promises }   from 'fs'
import { BarFactory }     from '../src/progress/multiBar'

const list = [
  'https://static.dezeen.com/uploads/2021/11/nodi-office-white-arkitekter-extra_dezeen_2364_col_0.jpg',
  'https://static.dezeen.com/uploads/2021/11/nodi-office-white-arkitekter-extra_dezeen_2364_col_1.jpg',
  'https://static.dezeen.com/uploads/2021/11/nodi-office-white-arkitekter_dezeen_2364_col_16.jpg',
  'https://static.dezeen.com/uploads/2021/11/nodi-office-white-arkitekter-extra_dezeen_2364_col_20.jpg',
  'https://static.dezeen.com/uploads/2021/11/nodi-office-white-arkitekter-extra_dezeen_2364_col_25.jpg',
]

const artists = [
  'Michelangelo',
  'Bellini',
  'Mantegna',
  'Correggio',
  'Anguissola',
  'Botticelli',
  'Perugino',
  'Rosselli',
  'da Vinci',
  'Donatello',
  'Holbein',
]
const DATA = 'data'
const SRC = process.cwd()

const test = async () => {
  await promises.mkdir(SRC + '/images', { recursive: true })
  const multiBar = BarFactory.build()
  'Connecting …' |> says['gallery']
  const service = async function (url) {
    const { dir, base, ext } = parsePath(url)
    const payload = {
      start: time(),
      agent: this.agent,
      topic: base,
      delay: randBetw(100, 300),
      status: 0,
    }
    try {
      const { data, headers, response } = await axios({
        url,
        method: 'GET',
        responseType: 'stream'
      })
      const length = headers['content-length']
      const bar = multiBar.create(length, 0, payload)
      const writer = fs.createWriteStream(SRC + '/images/' + base + ext)
      payload.status = response.status
      data.data.on(DATA, chunk => bar.update(chunk.length, payload))
      data.pipe(writer)
    } catch (error) {
      const bar = multiBar.create(0, 0, payload)
      bar.update(0, payload)
    }
    return payload
  }

  const agents = [
    { agent: flop(artists) },
    { agent: flop(artists) },
    { agent: flop(artists) },
  ]
  const contractor = Contractor.build(service, agents)
  const results = await contractor.takeOrders(list)
  multiBar.stop()
  results |> deco |> says['gallery']
}

test().then()

