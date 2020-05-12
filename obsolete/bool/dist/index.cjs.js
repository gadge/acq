'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var enums = require('@typen/enums');

/**
 *
 * @param {string|*} v
 * @returns {boolean}
 */

const bool = v => {
  var _v;

  if (!((_v = v) === null || _v === void 0 ? void 0 : _v.length)) return false;
  if (typeof v === enums.STR) return (v = v[0].toLowerCase()) !== 'f' && v !== 'n';
  return Boolean(v);
};

exports.bool = bool;
