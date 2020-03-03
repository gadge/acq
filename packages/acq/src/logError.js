import { deco } from '@spare/deco'
import { Xr } from '@spare/xr'
import { now } from '@valjoux/timestamp'
import { logger } from '@spare/logger'
import { Converter } from '@acq/couture'
import { SAMPLES } from '@analys/enum-tabular-types'

export function logErr (error, to, ansi) {
  const { response, data, status, headers } = error
  const [name, info] = response
    ? ['axios.error', ({ data, status, headers } |> deco)]
    : ['error', (error |> deco)]
  Xr(now(), name).info(info) |> logger
  return to ? Converter(SAMPLES, to, ansi)([error]) : { error }
}
