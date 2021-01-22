const axios = require('axios')

const clientEvent = async () => {
   return await axios.get('http://github.com')
}

module.exports = clientEvent()