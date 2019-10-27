//Create route
const express = require('express')
const path = require('path')

//Init App
const app = express()

//Load View Engine
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'pug')

//Home route
app.get('/', function (req, res) {
  res.render('index', {
    title: 'Articles'
  })
})

//Add route
app.get('/articles/add', function (req, res) {
  res.render('add-article', {
    title: 'Add article'
  })
})

//Start server
app.listen(3000, function () {
  console.log('Server stared on port 3000')
})