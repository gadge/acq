import { randBetw }                      from '@aryth/rand'
import { nullish }                       from '@typen/nullish'
import { intime, timeout }               from '@valjoux/timeout'
import axios                             from 'axios'
import fs                                from 'fs'
import { promises }                      from 'stream'
import { ATTEMPT, ERROR, SAVED, STREAM } from '../resources/stages'
import { StreamNotation }                from './StreamNotation'

export class ImagePorter {
  constructor(options) {
    this.id = options.id
    this.path = options.path
    this.barFab = options.barFab
    this.barMax = options.barMax ?? 2 << 20
    this.timeout = options.timeout ?? 24000
    this.config = {
      responseType: 'stream',
      headers: options.headers ?? null,
    }
  }

  /**
   *
   * @param {Object} options
   * @returns {ImagePorter}
   */
  static build(options) { return new ImagePorter(options) }

  async saveImage(url) {
    const notation = await this.barFab.append(StreamNotation.build({ agent: this.id, url, stage: ATTEMPT }))
    this.config.url = url
    const response = await intime(this.timeout, axios, this.config, null)
      .then(response => ( notation.setStage(STREAM, response.status), response ))
      .catch(error => ( notation.setStage(ERROR, error.response?.status ?? error.request ? 'no-res' : null), null )) // console.error('>> [axios failure]', response.data)

    if (nullish(response)) { notation.setStage(ERROR, 'timeout') }
    if (notation.stage === ERROR) return notation.stop()

    await promises.pipeline(
      response.data,
      notation.recordStream.bind(notation),
      fs.createWriteStream(notation.path = this.path(url, response.headers)) // process.cwd() + '/images/' + base + ext
    )
    await promises.finished(response.data)
      .then(() => notation.setStage(SAVED))
      .catch(() => notation.setStage(ERROR, 'stream')) // console.error('>> [stream failure]', err)
    await timeout(randBetw(100, 300))
    return notation.stop()
  }
}

// response.headers |> Deco({ depth: 1 }) |> says[base].br('headers')
// response.response |> Deco({ depth: 1 }) |> says[base].br('response')
// response.request |> Deco({ depth: 1 }) |> says[base].br('request')

// pipeline alternatives

// through((chunk, enc, done) => {
//   notation.increment(chunk?.length)
//   done(null, chunk)
// }),

// async function* (source) {
//   for await (const chunk of source) {
//     yield await notation.recordChunk(chunk)
//   }
// }

// const statusHandler=status=>{
//   if (status>=100 || status<200) return 'informational'
//
//   Informational responses (100–199)
//   Successful responses (200–299)
//   Redirection messages (300–399)
//   Client error responses (400–499)
//   Server error responses (500–599)
// }