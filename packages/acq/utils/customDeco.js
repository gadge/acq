import { LightBlue, Red } from '@palett/cards'
import { DyeFactory }     from '@palett/dye-factory'
import { HEX }            from '@palett/enum-color-space'
import { deco }           from '@spare/deco'
import { decoString }     from '@spare/logger'
import { Xr }             from '@spare/xr'
import { time }           from '@valjoux/timestamp-pretty'
import { urlBuilder }     from './urlBuilder'

const dyeFactory = DyeFactory.prep(HEX)
const errorDye = dyeFactory(Red.base)
const passDye = dyeFactory(LightBlue.lighten_2)

export const decoRequest = function ({ title, args, configs, data, url, params } = {}) {
  return Xr(time())
    .request(title |> decoString)
    .args(args ? deco(args) : null)
    .configs(configs ? deco(configs) : null)
    .data(data ? deco(data) : null)
    .url(urlBuilder(url, params))
    .toString()
}

export const decoResponse = function ({ title, response, url, params }) {
  return Xr(time())
    [passDye('response')](title |> decoString)
    [deco(response.status)](response.statusText |> deco)
    .url(urlBuilder(url, params))
    .toString()
}

export function decoError(error) {
  const { response, message, data, status, headers } = error
  const [ name, info ] = response
    ? [ errorDye('axios.error'), ( { data, status, headers } |> deco ) ]
    : [ errorDye('error'), ( error |> deco ) ]
  return Xr(time())[name](info).message(message)
}

