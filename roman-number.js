const Errors = {
  VALUE_REQUIRED: 'value required',
  INVALID_RANGE: 'invalid range',
  INVALID_VALUE: 'invalid value'
}

const Ranges = {
  MIN: 1,
  MAX: 3999
}

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
 *  A class/function to represent roman numbers and integers from roman numbers
 * @param {String |Number} val the value to be parsed and analysed, either an int or a string representing a roman numeral
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
     * @returns { Number } return an int representation
     */
    toInt () {
      //console.log('toInt', 'sanitizedVal', sanitizedVal, 'isInt', isInt)
      // we have received and valid integer as input so just return it
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
     * @returns {String} a roman number representation
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
