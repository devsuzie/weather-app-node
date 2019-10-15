const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'https://api.darksky.net/forecast/61222b76bb24524b3fc05d0c2c0c9a5d/' + latitude + ',' + longitude

    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to weather service!', undefined)
        } else if (body.error) {
            callback('Unable to find location', undefined)
        } else {
            callback(undefined, {
                summary: body.currently.summary,
                temperature: body.currently.temperature,
                timezone: body.timezone
            })
        }
    })
}

module.exports = forecast