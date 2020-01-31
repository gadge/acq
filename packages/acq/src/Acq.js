import ora from 'ora'
import axios from 'axios'
import { Couture } from '@acq/couture'
import { GP } from 'elprimero'
import { deco, logger, Xr } from 'xbrief'
import { couture, urlBuilder } from './helpers'

export class Acq {
  /**
   *
   * @param {string} [title]
   * @param {string} url
   * @param {Object} [params] - parameters passed to axios
   * @param {Object} [data] - the data to be sent as the request body
   * @param {Object} [configs] - rest configs passed to axios
   * @param {function(*,?Object):Table} loc
   * @param {Object} [args] - arguments passed to loc as 2nd parameter object
   * @param {*[]|[*,*][]} [fields]
   *
   * @param {number} from - samples: 0, table: 2
   * @param {number} [to] - samples: 0, json: 1, table: 2, ansi: 3
   * @param {boolean} [spin=true]
   * @param {string} [method='get']
   *
   * @returns {Promise<{fields:*[],rows:*[][]}|Table|Object[]>}
   */
  static async port (
    {
      title,
      url, params, data, configs,
      loc, args, fields
    },
    { from, to, spin = true, method = 'get' }
  ) {
    let spn
    if (spin) spn = ora().start(
      Xr('acq', title)
        .params(params |> deco)
        .data(data |> deco)
        .configs(configs|> deco)
        .args(args |> deco)
        .say
    )
    let trans = from |> couture
    return await axios({ url, method, params, data, ...configs })
      .then(({ data: d }) => {
        spn?.succeed(Xr('acq', title).p('fetched from').url(urlBuilder(url, params)).data(data |> deco).say)
        return trans(loc(d, args), { title, to, fields })
      })
      .catch(err => {
        spn?.fail(err.message)
        err|> Acq.logErr
        return Couture.fromSamples([], { title, to, fields })
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
