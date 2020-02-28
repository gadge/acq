import { Xr } from '@spare/xr'
import { deco} from '@spare/deco'
import { urlBuilder } from './urlBuilder'

const
  PARAMS = 'params',
  DATA = 'data',
  CONFIGS = 'configs',
  ARGS = 'args',
  URL = 'url',
  RESP = 'response'

export const reqArgv = (title, params, data, configs, args) =>
  Xr('acq', title)
    [PARAMS]((params || '') |> deco)
    [DATA]((data || '') |> deco)
    [CONFIGS]((configs || '')|> deco)
    [ARGS]((args || '') |> deco).toString()

export const respArgv = (title, url, params, resp) => {
  return Xr('acq', title)
    .p('fetched from')
    [URL](urlBuilder(url, params))
    [RESP]([resp.status, resp.statusText] |> deco).toString()
}
