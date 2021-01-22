const clientEvent = require('./clientEvent')

const emailProcessing = async (
    availabilityStore,
    userPhoneNumbers
) => {
    // console.log(clientEvent)
    const splitEmailBody = await clientEvent.body.content.split('<p>')
    const filteredPhoneNumbers = userPhoneNumbers.filter(doesNumberStartWithZero)
    const replaceZerosWithOne = filteredPhoneNumbers.map(replaceFirstCharWithOne)
    const emailBody = splitEmailBody.map(generateNewEmailBody(availabilityStore.userName, replaceZerosWithOne.join('<br>'))).join('<p>')

    return emailBody
}

const doesNumberStartWithZero = (phoneNumber) => phoneNumber.charAt(0) === '0'

const replaceFirstCharWithOne = (phoneNumber) => {
    const splitPhoneNumber = Array.from(phoneNumber)
    splitPhoneNumber[0] = 1
    return splitPhoneNumber.join('')
}

const generateNewEmailBody = (userName, phoneNumbers) => (string) => string.includes('href="www.atheneum-partners.com">') ?
`${userName}<br>${phoneNumbers}<br><a href="www.atheneum-partners.com">www.atheneum-partners.com</a></p>` :
        string

module.exports = {
    emailProcessing,
    generateNewEmailBody,
    replaceFirstCharWithOne,
    doesNumberStartWithZero
}
