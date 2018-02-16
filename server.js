const express = require('express')
const hbs = require('hbs')
const fs = require('fs')

var app = express()

hbs.registerPartials(__dirname + '/views/partials')
app.set('view engine', 'hbs')

app.use((req, res, next) => {
  const now = new Date().toString()
  const log = `${now}: ${req.method} ${req.url}`
  console.log(log)
  fs.appendFile('server.log', log + '\n', (err) => {
    if (err) {
      console.log('unable to  proceed');
    }
  })
  next()
})

// app.use((req, res, next) => {
//   res.render(('maintenance.hbs'))
// })

app.use(express.static(__dirname + '/public'))

hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear()
})

hbs.registerHelper('screamIt', (text) => {
  return text.toUpperCase()
})

app.get('/', (req, res) => {
  res.render(('home.hbs'), {
    welcomeMessage: 'werweelcome',
    pageTitle: 'this is the home page',
  })
})

app.get('/about', (req, res) => {
  res.render(('about.hbs'), {
    pageTitle: 'about page',
  })
})

app.get('/bad', (req, res) => {
  res.send({
    errorMessage: 'Unable to handle'
  })
})

app.listen(3000)