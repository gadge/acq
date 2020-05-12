import { STR } from '@typen/enums';

/**
 *
 * @param {string|*} v
 * @returns {boolean}
 */

const bool = v => {
  var _v;

  if (!((_v = v) === null || _v === void 0 ? void 0 : _v.length)) return false;
  if (typeof v === STR) return (v = v[0].toLowerCase()) !== 'f' && v !== 'n';
  return Boolean(v);
};

export { bool };
