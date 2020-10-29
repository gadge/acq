'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

class Zu {
  /**
   * Generate a random integer between [min, max].
   * Both min & max are inclusive.
   * @param {Number} min  Int
   * @param {Number} max  Int
   * @returns {Number}  Int
   * @deprecated Prefer Roulett.between in npm package Roulett
   */
  static randBetween(min, max) {
    return ~~(Math.random() * (max - min + 1)) + min;
  }
  /**
   * Generate a random integer between [min, max).
   * Notice: min is inclusive & max is exclusive.
   * @param {Number} min  Int
   * @param {Number} max(exclusive)  Int
   * @returns {Number}  Int
   * @deprecated Prefer Roulett.rand in npm package Roulett
   */


  static rand(min, max) {
    return ~~(Math.random() * (max - min)) + min;
  }

  static almostEquals(x, y, epsilon) {
    return Math.abs(x - y) < epsilon;
  }

  static almostInt(x, epsilon) {
    // let rounded = Math.round(x)
    // return rounded - epsilon < x && rounded + epsilon > x
    return Math.abs(x - Math.round(x)) < epsilon;
  }
  /**
   *
   * @param {number} x
   * @returns {number}
   */


  static intExponent(x) {
    return ~~Math.log10(x);
  }
  /**
   *
   * @param {number} x
   * @returns {number}
   */


  static round(x) {
    return x + (x > 0 ? 0.5 : -0.5) << 0;
  }

} //   ? x => Math.log10(x)

const rank = 12;
const randLowerBound = Math.pow(10, rank);
const randUpperBound = Math.pow(10, rank + 1);
const localRand = () => {
  return Zu.rand(randLowerBound, randUpperBound);
};

exports.localRand = localRand;
