import { TABLE, SAMPLES } from '@analys/enum-tabular-types'
import { tableToSamples, samplesToTable } from '@analys/convert'
import { tableSelect } from '@analys/table-select'
import { samplesSelect } from '@analys/samples-select'
import { deco, decoTable } from '@spare/logger'

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
    switch (to) {
      case TABLE:
        return tableSelect
      case SAMPLES:
      default:
        return tableToSamples
    }
  }
  if (from === SAMPLES) {
    switch (to) {
      case SAMPLES:
        return samplesSelect
      case TABLE:
      default:
        return samplesToTable
    }
  }
}


