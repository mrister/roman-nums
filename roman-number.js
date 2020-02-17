/**
 *  A class/function to represent roman numbers and integers from roman numbers
 * @param {String |Number} val the value to be parsed and analysed, either an int or a string representing a roman numeral
 */
function RomanNumber (val) {
  return {
    /**
     *
     * @returns { Number } return an int representation
     */
    toInt () {
      throw new Error('not Implemented')
    },

    /**
     *
     * @returns {String} a roman number representation
     */
    toString () {
      throw new Error('not Implemented')
    }
  }
}

module.exports = {
  RomanNumber
}
