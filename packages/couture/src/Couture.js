import { SAMPLES, TABLE } from '@analys/enum-tabular-types'
import { Samples } from 'veho'
import { Table } from 'crostab'



export class Couture {
  /**
   *
   * @param {Object[]} samples
   * @param {string} title
   * @param {number} to
   * @param {string[]} [fields]
   * @returns {(Table|{head: *[], rows: *[][]}|Object[]|*)}
   */
  static fromSamples (samples, { title, to, fields }) {
    switch (to) {
      case JSON:
        return Samples.toTable(samples, { title, fields })
      case TABLE:
        return Table.fromSamples(samples, { title, fields })
      case SAMPLES:
      default:
        return Samples.select(samples, fields)
    }
  }

  /**
   *
   * @param {Table} table
   * @param {number} to
   * @param {string[]} [fields]
   * @returns {(Table|{head: *[], rows: *[][]}|Object[]|*)}
   */
  static fromTable (table, { to, fields }) {
    switch (to) {
      case JSON:
        return table.select(fields).toJson
      case SAMPLES:
        return table.toSamples(fields)
      case TABLE:
      default:
        return table.select(fields)
    }
  }
}
