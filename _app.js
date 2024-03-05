// Luhn's Algorithm

const validateBtn = document.querySelector('#validate')
const validateInp = document.querySelector('input')
const errorTag = document.querySelector('.error')

validateBtn.addEventListener('click', () => {
  const validateArr = validateInp.value.split('')
  if (validateArr.length > 12 && validateArr.length < 17) {
    errorTag.innerHTML = 'Length valid'
    errorTag.classList.add('validate-green')
  } else {
    errorTag.innerHTML = 'Please enter a valid length'
    errorTag.classList.remove('validate-green')
    errorTag.classList.add('error-red')
    errorTag.classList.remove('error')
  }
  const validateDigits = []
  const oppositeDigits = []
  for (let i = validateArr.length - 2; i >= 0; i -= 2) {
    const digit = validateArr[i]
    validateDigits.push(Number(digit * 2))
  }
  for (let i = 1; i < validateArr.length; i += 2) {
    const oppositeDigit = validateArr[i]
    oppositeDigits.push(Number(oppositeDigit))
  }
  const sumArray = []

  for (let i = 0; i < validateDigits.length; i++) {
    let digit = validateDigits[i].toString()
    if (digit.toString().length % 2 === 0) {
      sumArray.push(Number(digit.split('')[0]), Number(digit.split('')[1]))
    } else {
      digit = validateDigits[i].toString()
      sumArray.push(Number(digit))
    }
  }

  oppositeDigits.reverse()

  const iteratedNumber = sumArray.reduce((value, accumulator) => {
    return value + accumulator
  }, 0)

  const nonIteratedNumber = oppositeDigits.reduce((value, accumulator) => {
    return value + accumulator
  }, 0)

  const sumPlusNonIterated = iteratedNumber + nonIteratedNumber

  if (
    (sumPlusNonIterated.toString().split('')[1] === (0).toString() &&
      validateArr.length === 13) ||
    (validateArr.length === 16 && Number(validateArr[0]) === 4)
  ) {
    errorTag.classList.add('validate-green')
    errorTag.classList.remove('error-red')
    errorTag.classList.remove('error')
    errorTag.innerHTML = 'Card validated Visa'
  } else if (
    (sumPlusNonIterated.toString().split('')[1] === (0).toString() &&
      validateArr.length === 16 &&
      validateArr[0].toString() + validateArr[1].toString() === '34') ||
    validateArr[0].toString() + validateArr[1].toString() === '37'
  ) {
    errorTag.classList.add('validate-green')
    errorTag.classList.remove('error-red')
    errorTag.classList.remove('error')
    errorTag.innerHTML = 'Card validated American Express'
  } else if (
    (sumPlusNonIterated.toString().split('')[1] === (0).toString() &&
      validateArr.length === 16 &&
      validateArr[0].toString() + validateArr[1].toString() === '51') ||
    validateArr[0].toString() + validateArr[1].toString() === '52' ||
    validateArr[0].toString() + validateArr[1].toString() === '53' ||
    validateArr[0].toString() + validateArr[1].toString() === '54' ||
    validateArr[0].toString() + validateArr[1].toString() === '55'
  ) {
    errorTag.classList.add('validate-green')
    errorTag.classList.remove('error-red')
    errorTag.classList.remove('error')
    errorTag.innerHTML = 'Card validated Visa Mastercard'
  } else {
    errorTag.classList.add('error-red')
    errorTag.classList.remove('validate-green')
    errorTag.classList.remove('error')
    errorTag.innerHTML = 'Could not validate'
  }
})
