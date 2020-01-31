import ora from 'ora'
import axios from 'axios'
import { Couture } from '@acq/couture'
import { GP } from 'elprimero'
import { deco, EntX, logger, Xr } from 'xbrief'
import { ReT } from '@acq/enum-ret'
import { Ob } from 'veho'

/**
 *
 * @param ret
 * @returns {Couture.fromSamples|Couture.fromTable|(function(*): *)}
 */
const couture = ret => {
  switch (ret) {
    case ReT.table:
      return Couture.fromTable
    case ReT.samples:
      return Couture.fromSamples
    default:
      return x => x
  }
}

const urlBuilder = (url, params) => {
  if (!params) return url
  const p = Ob.entries(params).map(([k, v]) => `${k}=${v}`).join('\&')
  return url + '?' + p
}

export class Acq {
  /**
   *
   * @param {string|number} [title]
   * @param {string} url
   * @param {Object} [params] - parameters passed to axios
   * @param {(function(*,Object):Table|function(*):Table)} loc
   * @param {Object} [args] - arguments passed to loc as 2nd parameter object
   * @param {*[]|[*,*][]} [fields]
   *
   * @param {number} from - samples: 0, table: 2
   * @param {number} to - samples: 0, json: 1, table: 2, ansi: 3
   * @param {boolean} [spin=true]
   *
   * @param {Object} [configs] - rest configs passed to axios
   *
   * @returns {Promise<{fields: *[], rows: *[][]}|Table|Object[]>}
   */
  static async port (
    {
      title, url, params, configs,
      loc, args, fields
    },
    { from, to, spin = true }
  ) {
    let spn
    if (spin) spn = ora().start(Xr('acq', title).params(params |> deco).args(args |> deco).say)
    let transition = from |> couture
    return await axios
      .get(url, { params, ...configs })
      .then(({ data }) => {
        spn?.succeed(Xr('acq', title).p('fetched from').url(urlBuilder(url, params)).say)
        return transition(loc(data, args), { title, to, fields })
      })
      .catch(err => {
        spn?.fail(err.message)
        err|> Acq.logErr
        return Couture.fromSamples([], { title, to, fields })
      })
  }

  /**
   *
   * @param {string|number} [title]
   * @param {string} url
   * @param {Object} [params] - parameters passed to axios
   * @param {(function(*,Object):Table|function(*):Table)} loc
   * @param {Object} [args] - arguments passed to loc as 2nd parameter object
   * @param {*[]|[*,*][]} fields
   *
   * @param {number} to - samples: 0, table: 2
   * @param {boolean} [spin=true]
   *
   * @param {Object} [configs] - rest configs passed to axios
   *
   * @returns {Promise<{fields: *[], rows: *[][]}|Table|Object[]>}
   */
  static async tab (
    {
      title, url, params,
      loc, args, fields
    },
    { to, spin = true },
    configs
  ) {
    let spn
    if (spin) spn = ora().start(Xr('raw', title).params(params |> deco).args(args |> deco).toString())
    return await axios
      .get(url, { params, ...configs })
      .then(({ data }) => {
        spn?.succeed(`fetched from '${url}': '${params |> deco}'`)
        return Couture.fromTable(loc(data, args), { title, to, fields })
      })
      .catch(err => {
        spn?.fail(err.message)
        err|> Acq.logErr
        return Couture.fromSamples([], { title, to, fields })
      })
  }

  /**
   *
   * @param {string|number} [title]
   * @param {string} url
   * @param {Object} [params]
   * @param {(function(*,Object):Object[]|function(*):Object[])} loc
   * @param {Object} [args] - arguments passed to loc as 2nd parameter object
   * @param {*[]|[*,*][]} fields
   *
   * @param {number} to - samples: 0, json: 1, table: 2, ansi: 3
   * @param {boolean} [spin=true]
   *
   * @param {Object} [configs]
   *
   * @returns {Promise<{fields: *[], rows: *[][]}|Table|Object[]>}
   */
  static async raw (
    {
      title, url, params,
      loc, args, fields
    },
    { to, spin = true },
    configs
  ) {
    let spn
    if (spin) spn = ora().start(Xr('raw', title).params(params |> deco).args(args |> deco).toString())
    return await axios
      .get(url, { params, ...configs })
      .then(({ data }) => {
        spn?.succeed(`fetched from '${url}': '${params |> deco}'`)
        return Couture.fromSamples(loc(data, args), { title, to, fields })
      })
      .catch(err => {
        spn?.fail(err.message)
        err|> Acq.logErr
        return Couture.fromSamples([], { title, to, fields })
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
      const { data, status, headers } = error
      Xr(GP.now(), 'axios.error').info({ data, status, headers } |> deco) |> logger
      // GP.now().tag('axios.log-err').tag(
      //   [
      //     ['data', error.data],
      //     ['status', error.status],
      //     ['headers', error.headers]
      //   ] |> EntX.vBrief
      // ) |> console.log
    } else {
      Xr(GP.now(), 'acq.error').info(error |> deco) |> logger
      // 'error'.tag(error) |> console.log
      // console.log(error)
    }
    // 'error.utils'.tag(deco(error.utils)) |> console.log
  }
}
