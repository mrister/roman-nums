const Errors = {
  VALUE_REQUIRED: 'value required',
  INVALID_RANGE: 'invalid range',
  INVALID_VALUE: 'invalid value'
}

const Ranges = {
  MIN: 1,
  MAX: 3999
}

const ROMAN_REGEX = /^M*(?:D?C{0,3}|C[MD])(?:L?X{0,3}|X[CL])(?:V?I{0,3}|I[XV])$/

/**
 *  A class/function to represent roman numbers and integers from roman numbers
 * @param {String |Number} val the value to be parsed and analysed, either an int or a string representing a roman numeral
 */
function RomanNumber (val) {
  const isNonEmptyString = typeof val === 'string' && val.length > 0
  const isInt = Number.isInteger(val)

  if (!isNonEmptyString && !isInt) throw new Error(Errors.VALUE_REQUIRED)

  if (isInt && val < Ranges.MIN || val > Ranges.MAX) throw new Error(Errors.INVALID_RANGE)

  if (isNonEmptyString && !ROMAN_REGEX.test(val)) throw new Error(Errors.INVALID_VALUE)

  return {
    /**
     *
     * @returns { Number } return an int representation
     */
    toInt () {
      if (isInt) return val
      throw new Error('not Implemented')
    },

    /**
     *
     * @returns {String} a roman number representation
     */
    toString () {
      if (isNonEmptyString) return val
      throw new Error('not Implemented')
    }
  }
}

module.exports = {
  Errors,
  Ranges,
  RomanNumber
}
