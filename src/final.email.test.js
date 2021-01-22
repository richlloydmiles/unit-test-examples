const SUT = require('./email.improved')

jest.mock('./clientEvent', () => ({
    body: {
        content: '<p>first href="www.atheneum-partners.com"> </p><p>second</p><p>third</p>'
    }
}))

describe('emailProcessing', () => {
    it('processes the email as expected', async () => {
        // given ... an availabilityStore
        const availabilityStore = {
            userName: 'Jonny',
            email: 'jonny@jonmail.com'
        }
        //  ... user phone numbers
        const userPhoneNumbers = [
            '023456780',
            '1231234123'
        ]

        // when ... we call the System under test function
        const actualResult = await SUT.emailProcessing(availabilityStore, userPhoneNumbers)

        // then ... the result is as expected
        const expectedResult = `<p>Jonny<br>123456780<br><a href=\"www.atheneum-partners.com\">www.atheneum-partners.com</a></p><p>second</p><p>third</p>`
        expect(actualResult).toBe(expectedResult)
    })
})

describe('doesNumberStartWithZero', () => {
    it('checks if string starts with a 0 as expected', async () => {
        // given ... an example number
        let exampleNumber = '23223'

        // when ... we check to see if the number starts with a 0
        let actualResult = SUT.doesNumberStartWithZero(exampleNumber)

        // then ... the result is as expected
        let expectedResult = false
        expect(actualResult).toBe(expectedResult)

        exampleNumber = '099'
        actualResult = SUT.doesNumberStartWithZero(exampleNumber)

        expectedResult = true
        expect(actualResult).toBe(expectedResult)
    })
})

describe('replaceFirstCharWithOne', () => {
    it('replaces the first character with 1 as expected', async () => {
        // given ... an example string 

        const exampleString = '02345'

        // when ... we replace the first character
        const actualResult = SUT.replaceFirstCharWithOne(exampleString)

        // then ... the result is as expected
        const expectedResult = '12345'
        expect(actualResult).toBe(expectedResult)
    })
})

describe('generateNewEmailBody', () => {
    it('generates email body as expected', async () => {
        // given 
        // ... a user name
        const userName = 'sham'
        // ... a phone number
        const phoneNumber = '12345'
        // ... an example string
        let emailString = 'this is an example string'

        // when ... we generate a new email body
        let actualResult = SUT.generateNewEmailBody(userName, phoneNumber)(emailString)

        // then ... the result is as expected
        let expectedResult = 'this is an example string'
        expect(actualResult).toBe(expectedResult)

        emailString = 'this string has matching chars href="www.atheneum-partners.com">'
        expectedResult = 'sham<br>12345<br><a href=\"www.atheneum-partners.com\">www.atheneum-partners.com</a></p>'
        actualResult = SUT.generateNewEmailBody(userName, phoneNumber)(emailString)
        expect(actualResult).toBe(expectedResult)
    })
})


