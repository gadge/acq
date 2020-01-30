import ora from 'ora'
import axios from 'axios'
import { Couture } from '@acq/couture'
import { GP } from 'elprimero'
import { deco, EntX, Xr } from 'xbrief'

export class Acq {
  /**
   *
   * @param {string|number} id
   * @param {string} url
   * @param {Object} [args]
   * @param {Object} [cfgs]
   * @param {function(*,Object):Table|function(*):Table} loc
   * @param {*[]|[*,*][]} head
   * @param {number} ret - samples: 0, json: 1, table: 2, ansi: 3
   * @param {boolean} [easy]
   * @param {boolean} [spin=true]
   * @param {Object} [configs]
   * @returns {Promise<{head: *[], rows: *[][]}|Table|Object[]>}
   */
  static async tab (
    { id, url, args, cfgs, loc, head },
    { ret, easy, spin = true },
    configs
  ) {
    const spn = spin
      ? Xr('raw', id).args(args |> deco).cfgs(cfgs |> deco).toString()
        |> ora().start
      : null
    return await axios
      .get(url, { params: args, ...configs })
      .then(({ data }) => {
        spn?.succeed(`fetched from '${url}': '${args |> deco}'`)
        const tb = loc(data, cfgs)
        return Couture.fromTable(tb, { id, ret, fields: easy ? head : null })
      })
      .catch(err => {
        spn?.fail(err.message)
        err|> Acq.logErr
        return Couture.fromSamples([], { id, ret, fields: easy ? head : null })
      })
  }

  /**
   *
   * @param {string|number} id
   * @param {string} url
   * @param {Object} [args]
   * @param {Object} [cfgs]
   * @param {function(*,Object):Object[]|function(*):Object[]} loc
   * @param {*[]|[*,*][]} head
   * @param {number} ret - samples: 0, json: 1, table: 2, ansi: 3
   * @param {boolean} [easy]
   * @param {boolean} [spin=true]
   * @param {Object} [configs]
   * @returns {Promise<{head: *[], rows: *[][]}|Table|Object[]>}
   */
  static async raw (
    { id, url, args, cfgs, loc, head },
    { ret, easy, spin = true },
    configs
  ) {
    const spn = spin
      ? ora().start(Xr('raw', id).args(args |> deco).cfgs(cfgs |> deco) + '')
      : null
    return await axios
      .get(url, { params: args, ...configs })
      .then(({ data }) => {
        spn?.succeed(`fetched from '${url}': '${args |> deco}'`)
        const ob = loc(data, cfgs)
        return Couture.fromSamples(ob, { id, ret, fields: easy ? head : null })
      })
      .catch(err => {
        spn?.fail(err.message)
        err|> Acq.logErr
        return Couture.fromSamples([], { id, ret, fields: easy ? head : null })
      })
  }

  /**
   *
   * @param {string} url
   * @param {Object} [params]
   * @param {Object} [configs]
   * @returns {Promise<*>}
   */
  static async get (url, params, configs) {
    return await axios
      .get(url, { params, ...configs })
      .then(({ data }) => data)
      .catch(Acq.logErr)
  }

  /**
   *
   * @param {string} url
   * @param {Object} [params]
   * @param {Object} [configs]
   * @returns {Promise<*>}
   */
  static async fetch ({ url, params }, configs) {
    return await axios
      .get(url, { params, ...configs })
      .then(({ data }) => data)
      .catch(Acq.logErr)
  }

  static async handle ({ url, params }, responseDataHandler) {
    return await axios
      .get(url, { params })
      .then(({ data }) => responseDataHandler(data))
      .catch(Acq.logErr)
  }

  static logErr (error) {
    if (error.response) {
      GP.now().tag('axios.log-err').tag(
        [
          ['data', error.data],
          ['status', error.status],
          ['headers', error.headers]
        ] |> EntX.vBrief
      ) |> console.log
    } else {
      'error'.tag(error) |> console.log
      console.log(error)
    }
    // 'error.utils'.tag(deco(error.utils)) |> console.log
  }
}
