import { ReT } from '@acq/enum-ret';
import { Samples } from 'veho';
import { Table } from 'crostab';

class Couture {
  /**
   *
   * @param {Object[]} samples
   * @param {string} [title]
   * @param {number} [to]
   * @param {string[]} [fields]
   * @returns {(Table|{head: *[], rows: *[][]}|Object[]|*)}
   */
  static fromSamples(samples, {
    title,
    to,
    fields
  }) {
    switch (to) {
      case ReT.json:
        return Samples.toTable(samples, {
          title,
          fields
        });

      case ReT.table:
        return Table.fromSamples(samples, {
          title,
          fields
        });

      case ReT.samples:
      default:
        return Samples.select(samples, fields);
    }
  }
  /**
   *
   * @param {Table} table
   * @param {number} to
   * @param {string[]} [fields]
   * @returns {(Table|{head: *[], rows: *[][]}|Object[]|*)}
   */


  static fromTable(table, {
    to,
    fields
  }) {
    switch (to) {
      case ReT.json:
        return table.select(fields).toJson;

      case ReT.samples:
        return table.toSamples(fields);

      case ReT.table:
      default:
        return table.select(fields);
    }
  }

}

export { Couture };
