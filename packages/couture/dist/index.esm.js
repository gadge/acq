import { ReT } from '@acq/enum-ret';
import { Samples } from 'veho';
import { Table } from 'crostab';

class Couture {
  static fromSamples(ob, {
    id,
    ret,
    fields
  }) {
    switch (ret) {
      case ReT.json:
        return fields ? Samples.toTable(ob, {
          fields
        }) : Samples.toTable(ob);

      case ReT.table:
        return fields ? Table.fromSamples(ob, id, null, {
          fields
        }) : Table.fromSamples(ob, id);

      case ReT.samples:
      default:
        return fields ? Samples.select(ob, fields) : ob;
    }
  }
  /**
   *
   * @param {Table} table
   * @param id
   * @param ret
   * @param fields
   * @returns {Table|{head: *[], rows: *[][]}|*}
   */


  static fromTable(table, {
    id,
    ret,
    fields
  }) {
    switch (ret) {
      case ReT.json:
        return fields ? table.select(fields).toJson : table.toJson;

      case ReT.samples:
        return fields ? table.toSamples(...fields) : table.toSamples();

      case ReT.table:
      default:
        return fields ? table.select(fields) : table;
    }
  }
  /**
   *
   * @param {*[][]} matrix
   * @param banner
   * @param id
   * @param ret
   * @param fields
   * @returns {Table|{head: *[], rows: *[][]}|*}
   */


  static fromMatrix({
    matrix,
    banner
  }, {
    id,
    ret,
    fields
  }) {
    const table = Table.from({
      matrix,
      banner
    });
    return Couture.fromTable(table, {
      id,
      ret,
      fields
    });
  }

}

export { Couture };
