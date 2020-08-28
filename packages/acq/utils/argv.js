import { deco }       from '@spare/deco'
import { Xr }         from '@spare/xr'
import { time }       from '@valjoux/timestamp-pretty'
import { urlBuilder } from './urlBuilder'

const
  PARAMS = 'params',
  DATA = 'data',
  CONFIGS = 'configs',
  ARGS = 'args',
  URL = 'url',
  RESP = 'response'

export const reqArgv = (title, params, data, configs, args) =>
  Xr(time())
    .p('acq')
    .br(title)
    [PARAMS](params ? deco(params) : null)
    [DATA](data ? deco(data) : null)
    [CONFIGS](configs ? deco(configs) : null)
    [ARGS](args ? deco(args) : null).toString()

export const respArgv = (title, url, params, resp) => {
  return Xr(time())
    .p('acq')
    .br(title)
    .p('fetched from')
    [URL](urlBuilder(url, params))
    [deco(resp.status)](resp.statusText |> deco).toString()
}
