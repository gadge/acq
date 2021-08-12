import { Converter }                            from '@acq/couture'
import { logger }                               from '@spare/logger'
import { bool }                                 from '@typen/bool'
import axios                                    from 'axios'
import { decoError, decoRequest, decoResponse } from '../utils/customDeco'

/**
 * @typedef {{head:*[],rows:*[][]}} TableObject
 * @typedef {Object[]} Samples
 */

const GET = 'get'

export class Acq {
  /**
   *
   * @param {string} [title]
   * @param {string} [base] - if provided, url = base + url. 'base' shouldn't end with '/'.
   * @param {string} url - if 'base' is provided, 'url' should start with '/'.
   * @param {Object} [params] - parameters passed to axios
   * @param {Object} [data] - the data to be sent as the request body (on 'POST' method)
   * @param {Object} [configs] - rest configs passed to axios
   * @param {Function|function(*,?Object):(Samples|TableObject)} prep - transform response.data to Samples|TableObject
   * @param {Object} [args] - arguments passed to prep as 2nd parameter object
   * @param {*[]|[*,*][]} [fields]
   * @param {number} from - samples: 1, table: 2
   * @param {number} [to] - samples: 1, table: 2
   * @param {boolean|string} [ansi=false]
   * @param {boolean} [spin]
   * @param {string} [method='get']
   *
   * @returns {Promise<{head:*[],rows:*[][]}|Table|Object[]>}
   */
  static async tabular({
                         title,
                         base, url, params, data, configs,
                         prep, args, fields,
                         from, to,
                         ansi, spin, method = GET
                       }) {
    if (base) url = base + url
    if (spin) decoRequest({ title, args, configs, data, url, params }) |> logger
    return await axios({ url, method, params, data, ...configs })
      .then(response => {
        const selected = prep(response.data, args)
        const converted = Converter(from, to, bool(ansi))(selected, fields)
        if (title) converted.title = title
        if (spin) decoResponse({ title, response, url, params, }) |> logger
        return converted
      })
      .catch(err => void ( decoError(err) |> logger ))
  }

  /**
   *
   * @param {string} [title]
   * @param {string} [base] - if provided, url = base + url. 'base' shouldn't end with '/'.
   * @param {string} url - if 'base' is provided, 'url' should start with '/'.
   * @param {Object} [params] - parameters passed to axios
   * @param {Object} [data] - the data to be sent as the request body (on 'POST' method)
   * @param {Object} [configs] - rest configs passed to axios
   * @param {Function|function(*,?Object):(Samples|TableObject)} prep - transform response.data to Samples|TableObject
   * @param {Object} [args] - arguments passed to prep as 2nd parameter object
   * @param {boolean} [spin]
   * @param {string} [method='get']
   *
   * @returns {Promise<{head:*[],rows:*[][]}|Table|Object[]>}
   */
  static async fetch({
                       title,
                       base, url, params, data, configs,
                       prep, args,
                       spin, method = GET
                     }) {
    if (base) url = base + url
    if (spin) decoRequest({ title, args, configs, data, url, params }) |> logger
    return await axios({ url, method, params, data, ...configs })
      .then(response => {
        const selected = prep(response.data, args)
        if (spin) decoResponse({ title, response, url, params }) |> logger
        return selected
      })
      .catch(err => void ( decoError(err) |> logger ))
  }
}

