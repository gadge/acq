import { samplesToTable, tableToSamples } from '@analys/convert'
import { JSON, SAMPLES, TABLE }           from '@analys/enum-tabular-types'
import { samplesSelect }                  from '@analys/samples-select'
import { Table }                          from '@analys/table'

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
  static fromSamples(samples, { title, to, fields }) {
    if (to === JSON) return samplesToTable(samples, fields)
    if (to === TABLE) return samplesToTable(samples, fields)
    if (to === SAMPLES) return samplesSelect(samples, fields)
    return samplesSelect(samples, fields)
  }

  /**
   *
   * @param {TableObject} table
   * @param {number} to
   * @param {string[]} [fields]
   * @returns {(Table|{head: *[], rows: *[][]}|Object[]|*)}
   */
  static fromTable(table, { to, fields }) {
    if (to === JSON) return Table.from(table).select(fields).toObject()
    if (to === TABLE) return Table.from(table).select(fields)
    if (to === SAMPLES) return tableToSamples(table, fields)
    return Table.from(table).select(fields)
  }
}
