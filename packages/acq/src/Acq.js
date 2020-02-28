import ora from 'ora'
import axios from 'axios'
import { Converter } from '@acq/couture'
import { SAMPLES, TABLE } from '@analys/enum-tabular-types'
import { GP } from 'elprimero'
import { Xr } from '@spare/xr'
import { deco } from '@spare/deco'
import { logger } from '@spare/logger'
import { reqArgv, respArgv } from '../utils/argv'
import { bool } from '../utils/bool'

/**
 * @typedef {{head:*[],rows:*[][]}} TableObject
 * @typedef {Object[]} Samples
 */

const GET = 'get'

export class Acq {
  /**
   *
   * @param {string} [title]
   * @param {string} url
   * @param {Object} [params] - parameters passed to axios
   * @param {Object} [data] - the data to be sent as the request body (on 'POST' method)
   * @param {Object} [configs] - rest configs passed to axios
   * @param {Function|function(*,?Object):(Samples|TableObject)} prep - transform response.data to Samples|TableObject
   * @param {Object} [args] - arguments passed to prep as 2nd parameter object
   * @param {*[]|[*,*][]} [fields]
   *
   * @param {number} from - samples: 1, table: 2
   * @param {number} [to] - samples: 1, table: 2
   * @param {boolean|string} [ansi=false]
   * @param {boolean} [spin=true]
   * @param {string} [method='get']
   *
   * @returns {Promise<{head:*[],rows:*[][]}|Table|Object[]>}
   */
  static async port (
    {
      title,
      url, params, data, configs,
      prep, args, fields
    },
    { from, to, ansi = false, spin = true, method = GET }
  ) {
    let spn
    if (spin) spn = ora().start(reqArgv(title, params, data, configs, args))
    return await
      axios({ url, method, params, data, ...configs })
        .then(resp => {
          let fit = prep(resp.data, args)
          let converted = Converter(from, to, bool(ansi))(fit, fields)
          if (to === TABLE) converted = Object.assign({ title }, converted)
          return (spn?.succeed(respArgv(title, url, params, resp)), converted)
        })
        .catch(err => {
          spn?.fail(err.message)
          err|> Acq.logErr
          return Converter(SAMPLES, to, ansi)([err])
        })
  }

  static logErr (error) {
    if (error.response) {
      const { data, status, headers } = error
      Xr(GP.now(), 'axios.error').info({ data, status, headers } |> deco) |> logger
    } else {
      Xr(GP.now(), 'acq.error').info(error |> deco) |> logger
    }
  }
}

