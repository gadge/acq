'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var enumRet = require('@acq/enum-ret');
var veho = require('veho');
var crostab = require('crostab');

class Couture {
  static fromSamples(ob, {
    id,
    ret,
    fields
  }) {
    switch (ret) {
      case enumRet.ReT.json:
        return fields ? veho.Samples.toTable(ob, {
          fields
        }) : veho.Samples.toTable(ob);

      case enumRet.ReT.table:
        return fields ? crostab.Table.fromSamples(ob, id, null, {
          fields
        }) : crostab.Table.fromSamples(ob, id);

      case enumRet.ReT.samples:
      default:
        return fields ? veho.Samples.select(ob, fields) : ob;
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
      case enumRet.ReT.json:
        return fields ? table.select(fields).toJson : table.toJson;

      case enumRet.ReT.samples:
        return fields ? table.toSamples(...fields) : table.toSamples();

      case enumRet.ReT.table:
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
    const table = crostab.Table.from({
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

exports.Couture = Couture;
