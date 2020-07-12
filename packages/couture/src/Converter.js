import { samplesToTable, tableToSamples } from '@analys/convert'
import { SAMPLES, TABLE }                 from '@analys/enum-tabular-types'
import { samplesSelect }                  from '@analys/samples-select'
import { tableSelect }                    from '@analys/table-select'
import { deco, decoTable }                from '@spare/logger'

export const Converter = function (from, to, ansi) {
  const tabularConverter = TabularConverter(from, to)
  return ansi
    ? (tabular, fields) => tabularConverter(tabular, fields) |> StringConverter(to, ansi)
    : tabularConverter
}

export const StringConverter = function (tabularType, ansi) {
  if (!ansi) return x => x
  if (tabularType === TABLE) return decoTable
  if (tabularType === SAMPLES) return deco
}

export const TabularConverter = function (from, to) {
  if (from === TABLE) {
    if (to === TABLE) return tableSelect
    if (to === SAMPLES) return tableToSamples
    return tableToSamples
  }
  if (from === SAMPLES) {
    if (to === SAMPLES) return samplesSelect
    if (to === TABLE) return samplesToTable
    return samplesToTable
  }
}


