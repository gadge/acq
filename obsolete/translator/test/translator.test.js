import { Translator }   from '../src/translator/Translator'
import { logger, says } from '@spare/logger'

const dict = [
  [/e/g, 'a'],
  [/l/gi, 'r']
]

const translator = new Translator(dict)

translator.trans('hello') |> says['hello']

translator.trans('Los Angeles') |> says['Los Angeles']
