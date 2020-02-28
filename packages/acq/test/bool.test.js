import { logger, xr } from '@spare/logger'
import { bool } from '../utils/bool'
import { deco } from '@spare/deco'

const candidates = {
  str_true: 'true',
  str_false: 'false',
  null: null,
  undefined: undefined,
  zero: 0,
  minusOne: -1,
  plusOne: 1,
  emptyStr: ''
}

for (let [key, candidate] of Object.entries(candidates)) {
  xr().value(candidate |> deco).parsed(bool(candidate)).original(key) |> logger
}
