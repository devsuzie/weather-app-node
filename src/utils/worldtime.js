const request = require('request')

const worldtime = (timezone, callback) => {
    const url = 'http://worldtimeapi.org/api/timezone/' + timezone

    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to time zone services!', undefined)
        } else if (body.error) {
            callback('Unable to find time zone', undefined)
        } else {
            let timeStr = body.datetime.split(".")[0].split("T")[1]
            let timeRes = timeStr.split(':')
            callback(undefined, {
                time: timeRes[0] + ':' + timeRes[1]
            })
        }
    })
}

module.exports = worldtime