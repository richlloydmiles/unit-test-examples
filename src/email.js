const clientEvent = require('./clientEvent')

const emailProcessing = async (
  availabilityStore,
  userPhoneNumbers
) => {
  const splitEmailBody = await clientEvent.body.content.split('<p>')
  const phoneNumbersWithZero = userPhoneNumbers.filter((phoneNumber) => phoneNumber.charAt(0) === '0')
  const replacedZerosWithOne = phoneNumbersWithZero.map((phoneNumber) => {
    const splitPhoneNumber = Array.from(phoneNumber)
    splitPhoneNumber[0] = 1
    return splitPhoneNumber.join('')
  })

  const emailBody = splitEmailBody.map(string => {
    if (string.includes('href="www.atheneum-partners.com">')) {
      return (`${availabilityStore.userName}<br>${replacedZerosWithOne.join('<br>')}<br><a href="www.atheneum-partners.com">www.atheneum-partners.com</a></p>`)
    } else {
      return string
    }

  }).join('<p>')

  return emailBody
}

module.exports = {
  emailProcessing
}
