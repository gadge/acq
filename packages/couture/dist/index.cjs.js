'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var enumRet = require('@acq/enum-ret');
var veho = require('veho');
var crostab = require('crostab');

class Couture {
  /**
   *
   * @param {Object[]} samples
   * @param {string} title
   * @param {number} to
   * @param {string[]} [fields]
   * @returns {(Table|{head: *[], rows: *[][]}|Object[]|*)}
   */
  static fromSamples(samples, {
    title,
    to,
    fields
  }) {
    switch (to) {
      case enumRet.ReT.json:
        return veho.Samples.toTable(samples, {
          title,
          fields
        });

      case enumRet.ReT.table:
        return crostab.Table.fromSamples(samples, {
          title,
          fields
        });

      case enumRet.ReT.samples:
      default:
        return veho.Samples.select(samples, fields);
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
      case enumRet.ReT.json:
        return table.select(fields).toJson;

      case enumRet.ReT.samples:
        return table.toSamples(fields);

      case enumRet.ReT.table:
      default:
        return table.select(fields);
    }
  }

}

exports.Couture = Couture;
