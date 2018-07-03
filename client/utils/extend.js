'use strict'

/**
 * origin => target
 * @param {object} target
 */
function extend (target) {
  if (target === null || target === undefined) target = {}
  for (let i = 1; i < arguments.length; ++i) {
    let origin = arguments[i]
    for (let key in origin) {
      if (origin.hasOwnProperty(key)) {
        let value = origin[key]
        if (value !== undefined) target[key] = value
      }
    }
  }
  return target
}

module.exports = extend