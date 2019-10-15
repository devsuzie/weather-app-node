const request = require('request')

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1Ijoic3V6aWV6emFuZyIsImEiOiJjanhweTUyY2YwNmp1M25rMjZrMnNiNDBpIn0.QsUb9NYaGoLCpe1wUMfyQQ'

    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to location services!', undefined)
        } else if (body.features.length === 0) {
            callback('Unable to find location. Try another search.', undefined)
        } else {
            let str = body.features[0].place_name
            let res = str.split(", ")
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: str,
                city: res[0],
                nation: res[res.length - 1]
            })
        }
    })
}

module.exports = geocode