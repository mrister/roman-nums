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

function run () {
  try {
    console.assert(testShape(), 'Invalid shape of the RomanNumbers returned object')
    console.assert(testInput(), 'Invalid input validation')
  } catch (e) {
    console.error('Some test failed', e)
  }
}

console.log('Tests Starting')
run()
console.log('Test done')
