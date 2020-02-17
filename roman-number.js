const Errors = {
  VALUE_REQUIRED: 'value required',
  INVALID_RANGE: 'invalid range',
  INVALID_VALUE: 'invalid value'
}

const Ranges = {
  MIN: 1,
  MAX: 3999
}

// not inventing the wheel https://www.oreilly.com/library/view/regular-expressions-cookbook/9780596802837/ch06s09.html
const ROMAN_REGEX = /^M{0,3}(?:D?C{0,3}|C[MD])(?:L?X{0,3}|X[CL])(?:V?I{0,3}|I[XV])$/

const ROMAN_LOOKUP = {
  M: 1000,
  CM: 900,
  D: 500,
  CD: 400,
  C: 100,
  XC: 90,
  L: 50,
  XL: 40,
  X: 10,
  IX: 9,
  V: 5,
  IV: 4,
  I: 1
}

/**
 * @typedef {Object} RomanNumber
 * @property {function} toInt - The int value of the number
 * @property {function} toString - The roman number version of number
 */

/**
 *  A class/function to represent roman numbers and integers from roman numbers
 * @param {string|number} val the value to be parsed and analysed, either an int or a string representing a roman numeral
 * @returns {RomanNumber}
 * @throws {Error} for invalid value
 * @throws {Error} for invalid range value (an int less than 1 or bigger than 3999 or roman number out of that range)
 * @throws {Error} for when value required (passing in null, empty string et.)
 */
function RomanNumber (val) {
  let isNonEmptyString = typeof val === 'string' && val.length > 0
  let isInt = Number.isInteger(val) || (isNonEmptyString && !Number.isNaN(parseInt(val, 10)))
  let sanitizedVal = val
  // in case when a number is a string
  if (isInt && isNonEmptyString) {
    isNonEmptyString = false
    sanitizedVal = parseInt(val, 10)
  } else if (isNonEmptyString) {
    sanitizedVal = val.toUpperCase()
  }

  if (!isNonEmptyString && !isInt) throw new Error(Errors.VALUE_REQUIRED)

  if (isInt && (sanitizedVal < Ranges.MIN || sanitizedVal > Ranges.MAX)) throw new Error(Errors.INVALID_RANGE)

  if (isNonEmptyString) {
    // roman numbers starting with MMMM are out of range
    if (sanitizedVal.startsWith('M'.repeat(4))) throw new Error(Errors.INVALID_RANGE)
    if (!ROMAN_REGEX.test(sanitizedVal)) throw new Error(Errors.INVALID_VALUE)
  }

  return {
    /**
     *
     * @returns { number } return an int representation
     */
    toInt () {
      if (isInt) return sanitizedVal

      return sanitizedVal
        .split('')
        .reduce((num, romanChar, index) => {
          if (ROMAN_LOOKUP[romanChar] < ROMAN_LOOKUP[sanitizedVal[index + 1]]) {
            num -= ROMAN_LOOKUP[romanChar]
          } else {
            num += ROMAN_LOOKUP[romanChar]
          }
          return num
        }, 0)
    },

    /**
     *
     * @returns {string} a roman number representation as string
     */
    toString () {
      // we have given a valid roman number so just return it
      if (isNonEmptyString) return sanitizedVal

      let romanString = ''
      let intNumber = sanitizedVal
      for (const [romanChar, romanCharIntValue] of Object.entries(ROMAN_LOOKUP)) {
        romanString += romanChar.repeat(intNumber / romanCharIntValue)
        intNumber = intNumber % romanCharIntValue
      }

      return romanString
    }
  }
}

module.exports = {
  Ranges,
  Errors,
  RomanNumber
}
