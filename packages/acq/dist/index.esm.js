import ora from 'ora';
import axios from 'axios';
import { Couture } from '@acq/couture';
import { GP } from 'elprimero';
import { Xr, deco, EntX } from 'xbrief';

class Acq {
  /**
   *
   * @param {string|number} id
   * @param {string} url
   * @param {Object} [args]
   * @param {Object} [cfgs]
   * @param {function(*,Object):Table|function(*):Table} loc
   * @param {*[]|[*,*][]} head
   * @param {number} ret - samples: 0, json: 1, table: 2, ansi: 3
   * @param {boolean} [easy]
   * @param {boolean} [spin=true]
   * @param {Object} [configs]
   * @returns {Promise<{head: *[], rows: *[][]}|Table|Object[]>}
   */
  static async tab({
    id,
    url,
    args,
    cfgs,
    loc,
    head
  }, {
    ret,
    easy,
    spin = true
  }, configs) {
    var _Xr$args$cfgs$toStrin, _args, _cfgs;

    const spn = spin ? (_Xr$args$cfgs$toStrin = Xr('raw', id).args((_args = args, deco(_args))).cfgs((_cfgs = cfgs, deco(_cfgs))).toString(), ora().start(_Xr$args$cfgs$toStrin)) : null;
    return await axios.get(url, {
      params: args,
      ...configs
    }).then(({
      data
    }) => {
      var _args2;

      spn === null || spn === void 0 ? void 0 : spn.succeed(`fetched from '${url}': '${(_args2 = args, deco(_args2))}'`);
      const tb = loc(data, cfgs);
      return Couture.fromTable(tb, {
        id,
        ret,
        fields: easy ? head : null
      });
    }).catch(err => {
      var _err;

      spn === null || spn === void 0 ? void 0 : spn.fail(err.message);
      _err = err, Acq.logErr(_err);
      return Couture.fromSamples([], {
        id,
        ret,
        fields: easy ? head : null
      });
    });
  }
  /**
   *
   * @param {string|number} id
   * @param {string} url
   * @param {Object} [args]
   * @param {Object} [cfgs]
   * @param {function(*,Object):Object[]|function(*):Object[]} loc
   * @param {*[]|[*,*][]} head
   * @param {number} ret - samples: 0, json: 1, table: 2, ansi: 3
   * @param {boolean} [easy]
   * @param {boolean} [spin=true]
   * @param {Object} [configs]
   * @returns {Promise<{head: *[], rows: *[][]}|Table|Object[]>}
   */


  static async raw({
    id,
    url,
    args,
    cfgs,
    loc,
    head
  }, {
    ret,
    easy,
    spin = true
  }, configs) {
    var _args3, _cfgs2;

    const spn = spin ? ora().start(Xr('raw', id).args((_args3 = args, deco(_args3))).cfgs((_cfgs2 = cfgs, deco(_cfgs2))) + '') : null;
    return await axios.get(url, {
      params: args,
      ...configs
    }).then(({
      data
    }) => {
      var _args4;

      spn === null || spn === void 0 ? void 0 : spn.succeed(`fetched from '${url}': '${(_args4 = args, deco(_args4))}'`);
      const ob = loc(data, cfgs);
      return Couture.fromSamples(ob, {
        id,
        ret,
        fields: easy ? head : null
      });
    }).catch(err => {
      var _err2;

      spn === null || spn === void 0 ? void 0 : spn.fail(err.message);
      _err2 = err, Acq.logErr(_err2);
      return Couture.fromSamples([], {
        id,
        ret,
        fields: easy ? head : null
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
      var _GP$now$tag$tag, _ref;

      _GP$now$tag$tag = GP.now().tag('axios.log-err').tag((_ref = [['data', error.data], ['status', error.status], ['headers', error.headers]], EntX.vBrief(_ref))), console.log(_GP$now$tag$tag);
    } else {
      var _error$tag;

      _error$tag = 'error'.tag(error), console.log(_error$tag);
      console.log(error);
    } // 'error.utils'.tag(deco(error.utils)) |> console.log

  }

}

export { Acq };
