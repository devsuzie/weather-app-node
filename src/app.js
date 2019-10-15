const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')
const worldtime = require('./utils/worldtime')

const app = express()
const port = process.env.PORT || 3000

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Suzie Kim'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address!'
        })
    }

    geocode(req.query.address, (error, { latitude, longitude, location, city, nation } = {}) => {
        if (error ) {
            return res.send({ error })
        }

        forecast(latitude, longitude, (error, { summary, temperature, timezone }) => {
            if (error) {
                return res.send({ error })
            }

            worldtime(timezone, (error, { time }) => {
                if (error) {
                    return res.send({ error })
                }
    
                res.send({
                    city,
                    nation,
                    location,
                    summary,
                    temperature,
                    timezone,
                    time
                })
            })
        })

        
    })
})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    }

    console.log(req.query.search)
    res.send({
        products: []
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Suzie Kim',
        errorMessage: 'Page not found.'
    })
})

app.listen(port, () => {
    console.log('Server is up on port .' + port)
})