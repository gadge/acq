export const makeReplaceable = dict => Object
  .defineProperty(dict, Symbol.replace, {
    value (word) {
      for (let [curr, proj] of this) word = word.replace(curr, proj)
      return word.trim()
    },
    configurable: true,
    enumerable: false
  })
