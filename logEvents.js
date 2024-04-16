const { format } = require('date-fns')
const fs = require('fs')
const fsPromises = require('fs').promises
const path = require('path')

module.exports = log_events = async (method, url, message, type) => {
    const date = format(new Date(), `dd.mm.yyyy \t hh:mm:ss`)
    const logData = `${date} \t ${method} \t ${url} \t ${message} \n`

    if(!fs.existsSync(path.join(__dirname, 'logs'))) {
        await fsPromises.mkdir(path.join(__dirname, 'logs'))
    }

    fsPromises.appendFile(path.join(__dirname, 'logs', type), logData)
}
