import { makeReplaceable } from './makeReplaceable'
import { sortKeysByLength } from '../../utils/sortKeysByLength'

export class Translator {
  constructor (dictionary) {
    this.dict = dictionary|> makeReplaceable
  }

  static build (dict, { sort = true } = {}) {
    if (sort) dict |> sortKeysByLength
    return new Translator(dict)
  }

  trans (word) { return word.replace(this.dict) }

  reboot (dict) { return dict ? (this.dict = (dict|> makeReplaceable), this) : this }
}



