import { ReT } from '@acq/enum-ret'
import { Couture } from '@acq/couture'
import { Ob } from 'veho'

/**
 *
 * @param ret
 * @returns {Couture.fromSamples|Couture.fromTable|(function(*): *)}
 */
export const couture = ret => {
  switch (ret) {
    case ReT.table:
      return Couture.fromTable
    case ReT.samples:
      return Couture.fromSamples
    default:
      return x => x
  }
}

export const urlBuilder = (url, params) => {
  if (!params) return url
  const p = Ob.entries(params).map(([k, v]) => `${k}=${v}`).join('\&')
  return url + '?' + p
}
