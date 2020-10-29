import { Foba as NumVecs } from '@foba/vector-number'
import { Foba as StrVecs } from '@foba/vector-string'
import { deco, decoTable, delogger, logger, says } from '@spare/logger'
import { Converter } from '../src/Converter'
import { TABLE, SAMPLES } from '@analys/enum-tabular-types'

const SP = 'samples', TB = 'table'
const samples = [
  { foo: 0, bar: 1, kha: 2 },
  { foo: 3, bar: 4, kha: 5 },
  { foo: 6, bar: 7, kha: 8 }
]

const table = {
  head: StrVecs.flop({ p: 'carPlants', size: 5 }),
  rows: [
    NumVecs.flop({ size: 5 }),
    NumVecs.flop({ size: 5 }),
    NumVecs.flop({ size: 5 }),
    NumVecs.flop({ size: 5 })
  ]
}

samples |> deco |> says[SP + ' original']

table |> decoTable |> says[TB + ' original']

const ansi = false
Converter(SAMPLES, SAMPLES, ansi)(samples) |> String |> says['converted samples->samples']
Converter(SAMPLES, TABLE, ansi)(samples) |> String |> says['converted samples->table']
Converter(TABLE, SAMPLES, ansi)(table) |> String |> says['converted table->samples']
Converter(TABLE, TABLE, ansi)(table) |> String |> says['converted table->table']
