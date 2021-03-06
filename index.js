const express = require('express')
const path = require('path')
// body-paser
const bodyParser = require('body-parser')
// MongoDB
require('./model/connect')
// Router
const home = require('./route/home')
const admin = require('./route/admin')
// session
const session = require('express-session')
// dateformate
const dateformat = require('dateformat')
// art-template
const artTemplate = require('art-template')


// create HTTP server
const app = express()

// bodyParser 
app.use(bodyParser.urlencoded({ extended: false }))

// session
app.use(session({
    secret: 'secret key',
    saveUninitialized: false,
    cookie: {
        maxAge: 24 * 60 * 60 * 1000
    }
}))

// static 
app.use(express.static(path.join(__dirname, 'public')))

// login interception
app.use('/admin', require('./middleware/loginGuard'))

// Router
app.use('/home', home)
app.use('/admin', admin)
app.get('/', (req, res) => {
    res.redirect('/home/')
})

// art-template
artTemplate.defaults.imports.dateformat = dateformat;
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'art')
app.engine('art', require('express-art-template'))


app.listen(80, () => {
    console.log('Server running at http://localhost:80');
})