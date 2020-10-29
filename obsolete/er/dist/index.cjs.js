'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var crostab = require('crostab');

class Er extends Error {
  constructor(name, message) {
    super();
    this.name = name;
    this.message = message;
  }

  static log(err) {
    var _err$name$tag;

    _err$name$tag = err.name.tag(err.message), console.log(_err$name$tag);
  }

  static logger(p) {
    return err => {
      var _String$tag$tag;

      _String$tag$tag = String(p).tag(err.name).tag(err.message), console.log(_String$tag$tag);
    };
  }

  static info(err, showStack = false) {
    const {
      name,
      message
    } = err;
    return showStack ? {
      valid: false,
      name,
      message,
      stack: err.static
    } : {
      valid: false,
      name,
      message
    };
  }

  static r({
    name,
    message
  }) {
    return new Er(name || 'Error', message || '');
  }

  static tab(error, scope, message) {
    return new crostab.Table(['error', 'scope', 'message'], [[error, scope, message]], 'error');
  }

  static obs(error, scope, message) {
    return [{
      error,
      scope,
      message
    }];
  }

}

exports.Er = Er;
