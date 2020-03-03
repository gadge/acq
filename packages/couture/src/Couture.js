import { samplesToTable, tableToSamples } from '@analys/convert'
import { samplesSelect } from '@analys/samples-select'
import { SAMPLES, TABLE, JSON } from '@analys/enum-tabular-types'

/**
 * @typedef {string|number} str
 */
export class Couture {
  /**
   *
   * @param {Object[]} samples
   * @param {string} title
   * @param {number} to
   * @param {str[]|[str,str][]} [fields]
   * @returns {(Table|{head: *[], rows: *[][]}|Object[]|*)}
   */
  static fromSamples (samples, { title, to, fields }) {
    switch (to) {
      case JSON:
        return samplesToTable(samples, fields)
      case TABLE:
        return samplesToTable(samples, fields)
      case SAMPLES:
      default:
        return samplesSelect(samples, fields)
    }
  }

  /**
   *
   * @param {TableObject} table
   * @param {number} to
   * @param {string[]} [fields]
   * @returns {(Table|{head: *[], rows: *[][]}|Object[]|*)}
   */
  static fromTable (table, { to, fields }) {
    switch (to) {
      case JSON:
        return Table.from(table).select(fields).toJson()
      case SAMPLES:
        return tableToSamples(table, fields)
      case TABLE:
      default:
        return Table.from(table).select(fields)
    }
  }
}
