const moment = require('moment');
const getExpirationDate = () => {

    const date = moment().add(15,"m").format("YYYY-MM-DD hh:mm:ss ")
    console.log(date)
   return date
}

module.exports = getExpirationDate


