const { RomanNumber } = require('./roman-number')

console.assert(typeof RomanNumber === 'function', 'RomanNumber is a function')

// testing the shape of the returned object
function validateShape (obj) {
  if (typeof obj !== 'object') throw new Error('The returned value must be an object')
  if (typeof obj.toInt !== 'function') throw new Error('The returned value must be an object that has toInto function')
  if (typeof obj.toString !== 'function') throw new Error('The returned value must be an object that has toString function')
  return true
}

function testShape () {
  let roman = new RomanNumber('MC')
  validateShape(roman)
  roman = new RomanNumber(10)
  validateShape(roman)

  // validate without new
  roman = RomanNumber('MCX')
  validateShape(roman)
  roman = RomanNumber(20)
  validateShape(roman)
  return true
}

function testInput () {
  try {
    new RomanNumber('')
    console.assert(false, 'should throw')
  } catch (e) {
    console.assert(e.message === 'value required')
  }

  try {
    new RomanNumber(null)
    console.assert(false, 'should throw')
  } catch (e) {
    console.assert(e.message === 'value required')
  }

  try {
    // ve can't represent 0 in roman
    new RomanNumber(0)
    console.assert(false, 'should throw')
  } catch (e) {
    console.assert(e.message === 'invalid range')
  }

  try {
    // ve can't represent 0 in roman
    new RomanNumber(3999 + 1)
    console.assert(false, 'should throw')
  } catch (e) {
    console.assert(e.message === 'invalid range')
  }

  try {
    // invalid value, not an int or string
    new RomanNumber([])
    console.assert(false, 'should throw')
  } catch (e) {
    console.assert(e.message === 'invalid value')
  }

  try {
    // invalid value, not an int or string
    new RomanNumber(true)
    console.assert(false, 'should throw')
  } catch (e) {
    console.assert(e.message === 'invalid value')
  }

  try {
    // invalid value, not an int
    new RomanNumber(32.1)
    console.assert(false, 'should throw')
  } catch (e) {
    console.assert(e.message === 'invalid value')
  }

  try {
    // invalid value, not a valid roman number
    new RomanNumber('IVCXM')
    console.assert(false, 'should throw')
  } catch (e) {
    console.assert(e.message === 'invalid value')
  }

  return true

}

function testIntValue (val, expectedRoman) {
  const num = RomanNumber(val)
  console.assert(num.toInt() === val, `should equal ${val}`)
  console.assert(num.toString() === expectedRoman, `roman should equal ${expectedRoman}`)
}

function testRomanValue (roman, expectedInt) {
  const num = RomanNumber(roman)
  console.assert(num.toInt() === expectedInt, `should equal ${expectedInt}`)
  console.assert(num.toString() === roman, `roman should equal ${roman}`)
}

function testValues () {
// per test requirements, values that should be tested
// null, ‘’, 0, 1, 3, 4, 5, ‘I’, ‘III’, ‘IIII’, ‘IV’, ‘V’, 1968, ‘1473’, 2999, 3000, 10000, ‘CDXXIX’, ‘CD1X’,
// ‘error’, ‘MCDLXXXII’, ‘MCMLXXX’, ‘MMMMCMXCIX’, ‘MMMMDMXCIX’

  try {
    new RomanNumber(null)
    console.assert(false, 'should throw')
  } catch (e) {
    console.assert(e.message === 'invalid value', 'Invalid value')
  }

  try {
    new RomanNumber('')
    console.assert(false, 'should throw')
  } catch (e) {
    console.assert(e.message === 'invalid value', 'Invalid value')
  }

  try {
    new RomanNumber(0)
    console.assert(false, 'should throw')
  } catch (e) {
    console.assert(e.message === 'invalid range', 'Invalid range')
  }

  testIntValue(1, 'I')
  testIntValue(2, 'II')
  testIntValue(3, 'III')
  testIntValue(4, 'IV')
  testIntValue(5, 'V')

  testRomanValue('I', 1)
  testRomanValue('II', 2)
  testRomanValue('III', 3)
  testRomanValue('IV', 4)
  testRomanValue('V', 5)

  testIntValue(1968, 'MCMLXVIII')

  // yup let's accept numbers as strings
  testIntValue('1473', 'MCDLXXIII')

  testIntValue(2999, 'MMCMXCIX')
  testIntValue(3000, 'MMM')

  try {
    new RomanNumber(10000)
    console.assert(false, 'should throw')
  } catch (e) {
    console.assert(e.message === 'invalid range', 'Invalid range')
  }

  testRomanValue('CDXXIX', 429)

  try {
    new RomanNumber('CD1X')
    console.assert(false, 'should throw')
  } catch (e) {
    console.assert(e.message === 'invalid value', 'Invalid value')
  }

  try {
    new RomanNumber('error')
    console.assert(false, 'should throw')
  } catch (e) {
    console.assert(e.message === 'invalid value', 'Invalid value')
  }

  testRomanValue('MCDLXXXII', 1482)
  testRomanValue('MCMLXXX', 1980)
  testRomanValue('MCMLXXX', 1980)

  try {
    new RomanNumber('MMMMCMXCIX')
    console.assert(false, 'should throw')
  } catch (e) {
    console.assert(e.message === 'invalid range', 'Invalid range')
  }

  try {
    new RomanNumber('MMMMDMXCIX')
    console.assert(false, 'should throw')
  } catch (e) {
    console.assert(e.message === 'invalid range', 'Invalid range')
  }

  return true

}

function run () {
  try {
    console.assert(testShape(), 'Invalid shape of the RomanNumbers returned object')
    console.assert(testInput(), 'Invalid input validation')
    console.assert(testValues(), 'Invalid value tests')
  } catch (e) {
    console.error('Some test failed', e)
  }
}

console.log('Tests Starting')
run()
console.log('Test done')
