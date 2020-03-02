import { STR } from '@typen/enums'

/**
 *
 * @param {string|*} v
 * @returns {boolean}
 */
export const bool = v => {
  if (!v?.length) return false
  if (typeof v === STR) return (v = v[0].toLowerCase()) !== 'f' && v !== 'n'
  return Boolean(v)
}
