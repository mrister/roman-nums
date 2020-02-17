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

function run () {
  console.assert(testShape(), 'Invalid shape of the RomanNumbers returned object')
}

console.log('Tests Starting')
run()
console.log('Test done')
