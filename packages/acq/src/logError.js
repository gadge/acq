import { Converter } from '@acq/couture'
import { SAMPLES }   from '@analys/enum-tabular-types'
import { deco }      from '@spare/deco'
import { logger }    from '@spare/logger'
import { Xr }        from '@spare/xr'
import { time }      from '@valjoux/timestamp'

export function logErr(error, to, ansi) {
  const { response, data, status, headers } = error
  const [name, info] = response
    ? ['axios.error', ({ data, status, headers } |> deco)]
    : ['error', (error |> deco)]
  Xr(time(), name).info(info) |> logger
  return to ? Converter(SAMPLES, to, ansi)([error]) : { error }
}
