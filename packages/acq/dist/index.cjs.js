'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var ora = _interopDefault(require('ora'));
var axios = _interopDefault(require('axios'));
var couture$1 = require('@acq/couture');
var elprimero = require('elprimero');
var xbrief = require('xbrief');
var veho = require('veho');

const ReT = {
  samples: 0,
  json: 1,
  table: 2,
  ansi: 3
};

/**
 *
 * @param ret
 * @returns {Couture.fromSamples|Couture.fromTable|(function(*): *)}
 */

const couture = ret => {
  switch (ret) {
    case ReT.table:
      return couture$1.Couture.fromTable;

    case ReT.samples:
      return couture$1.Couture.fromSamples;

    default:
      return x => x;
  }
};

const urlBuilder = (url, params) => {
  if (!params) return url;
  const p = veho.Ob.entries(params).map(([k, v]) => `${k}=${v}`).join('\&');
  return url + '?' + p;
};

class Acq {
  /**
   *
   * @param {string|number} [title]
   * @param {string} url
   * @param {Object} [params] - parameters passed to axios
   * @param {(function(*,Object):Table|function(*):Table)} loc
   * @param {Object} [args] - arguments passed to loc as 2nd parameter object
   * @param {*[]|[*,*][]} [fields]
   *
   * @param {number} from - samples: 0, table: 2
   * @param {number} to - samples: 0, json: 1, table: 2, ansi: 3
   * @param {boolean} [easy]
   * @param {boolean} [spin=true]
   *
   * @param {Object} [configs] - rest configs passed to axios
   *
   * @returns {Promise<{fields: *[], rows: *[][]}|Table|Object[]>}
   */
  static async port({
    title,
    url,
    params,
    configs,
    loc,
    args,
    fields
  }, {
    from,
    to,
    easy,
    spin = true
  }) {
    var _params, _args, _from;

    let spn;
    if (spin) spn = ora().start(xbrief.Xr('acq', title).params((_params = params, xbrief.deco(_params))).args((_args = args, xbrief.deco(_args))).say);
    let transition = (_from = from, couture(_from));
    return await axios.get(url, {
      params,
      ...configs
    }).then(({
      data
    }) => {
      var _spn;

      (_spn = spn) === null || _spn === void 0 ? void 0 : _spn.succeed(xbrief.Xr('acq', title).p('fetched from').url(urlBuilder(url, params)).say);
      return transition(loc(data, args), {
        title,
        to,
        fields
      });
    }).catch(err => {
      var _spn2, _err;

      (_spn2 = spn) === null || _spn2 === void 0 ? void 0 : _spn2.fail(err.message);
      _err = err, Acq.logErr(_err);
      return couture$1.Couture.fromSamples([], {
        title,
        to,
        fields
      });
    });
  }
  /**
   *
   * @param {string|number} title
   * @param {string} url
   * @param {Object} [params] - parameters passed to axios
   * @param {(function(*,Object):Table|function(*):Table)} loc
   * @param {Object} [args] - arguments passed to loc as 2nd parameter object
   * @param {*[]|[*,*][]} fields
   *
   * @param {number} to - samples: 0, table: 2
   * @param {boolean} [easy]
   * @param {boolean} [spin=true]
   *
   * @param {Object} [configs] - rest configs passed to axios
   *
   * @returns {Promise<{fields: *[], rows: *[][]}|Table|Object[]>}
   */


  static async tab({
    title,
    url,
    params,
    loc,
    args,
    fields
  }, {
    to,
    easy,
    spin = true
  }, configs) {
    var _params2, _args2;

    let spn;
    if (spin) spn = ora().start(xbrief.Xr('raw', title).params((_params2 = params, xbrief.deco(_params2))).args((_args2 = args, xbrief.deco(_args2))).toString());
    return await axios.get(url, {
      params,
      ...configs
    }).then(({
      data
    }) => {
      var _spn3, _params3;

      (_spn3 = spn) === null || _spn3 === void 0 ? void 0 : _spn3.succeed(`fetched from '${url}': '${(_params3 = params, xbrief.deco(_params3))}'`);
      return couture$1.Couture.fromTable(loc(data, args), {
        title,
        to,
        fields
      });
    }).catch(err => {
      var _spn4, _err2;

      (_spn4 = spn) === null || _spn4 === void 0 ? void 0 : _spn4.fail(err.message);
      _err2 = err, Acq.logErr(_err2);
      return couture$1.Couture.fromSamples([], {
        title,
        to,
        fields
      });
    });
  }
  /**
   *
   * @param {string|number} title
   * @param {string} url
   * @param {Object} [params]
   * @param {(function(*,Object):Object[]|function(*):Object[])} loc
   * @param {Object} [args] - arguments passed to loc as 2nd parameter object
   * @param {*[]|[*,*][]} fields
   *
   * @param {number} to - samples: 0, json: 1, table: 2, ansi: 3
   * @param {boolean} [easy]
   * @param {boolean} [spin=true]
   *
   * @param {Object} [configs]
   *
   * @returns {Promise<{fields: *[], rows: *[][]}|Table|Object[]>}
   */


  static async raw({
    title,
    url,
    params,
    loc,
    args,
    fields
  }, {
    to,
    easy,
    spin = true
  }, configs) {
    var _params4, _args3;

    let spn;
    if (spin) spn = ora().start(xbrief.Xr('raw', title).params((_params4 = params, xbrief.deco(_params4))).args((_args3 = args, xbrief.deco(_args3))).toString());
    return await axios.get(url, {
      params,
      ...configs
    }).then(({
      data
    }) => {
      var _spn5, _params5;

      (_spn5 = spn) === null || _spn5 === void 0 ? void 0 : _spn5.succeed(`fetched from '${url}': '${(_params5 = params, xbrief.deco(_params5))}'`);
      return couture$1.Couture.fromSamples(loc(data, args), {
        title,
        to,
        fields
      });
    }).catch(err => {
      var _spn6, _err3;

      (_spn6 = spn) === null || _spn6 === void 0 ? void 0 : _spn6.fail(err.message);
      _err3 = err, Acq.logErr(_err3);
      return couture$1.Couture.fromSamples([], {
        title,
        to,
        fields
      });
    });
  }
  /**
   *
   * @param {string} url
   * @param {Object} [params]
   * @param {Object} [configs]
   * @returns {Promise<*>}
   */


  static async get(url, params, configs) {
    return await axios.get(url, {
      params,
      ...configs
    }).then(({
      data
    }) => data).catch(Acq.logErr);
  }
  /**
   *
   * @param {string} url
   * @param {Object} [params]
   * @param {Object} [configs]
   * @returns {Promise<*>}
   */


  static async fetch({
    url,
    params
  }, configs) {
    return await axios.get(url, {
      params,
      ...configs
    }).then(({
      data
    }) => data).catch(Acq.logErr);
  }

  static async handle({
    url,
    params
  }, responseDataHandler) {
    return await axios.get(url, {
      params
    }).then(({
      data
    }) => responseDataHandler(data)).catch(Acq.logErr);
  }

  static logErr(error) {
    if (error.response) {
      var _Xr$info, _data$status$headers;

      const {
        data,
        status,
        headers
      } = error;
      _Xr$info = xbrief.Xr(elprimero.GP.now(), 'axios.error').info((_data$status$headers = {
        data,
        status,
        headers
      }, xbrief.deco(_data$status$headers))), xbrief.logger(_Xr$info); // GP.now().tag('axios.log-err').tag(
      //   [
      //     ['data', error.data],
      //     ['status', error.status],
      //     ['headers', error.headers]
      //   ] |> EntX.vBrief
      // ) |> console.log
    } else {
      var _Xr$info2, _error;

      _Xr$info2 = xbrief.Xr(elprimero.GP.now(), 'acq.error').info((_error = error, xbrief.deco(_error))), xbrief.logger(_Xr$info2); // 'error'.tag(error) |> console.log
      // console.log(error)
    } // 'error.utils'.tag(deco(error.utils)) |> console.log

  }

}

exports.Acq = Acq;
