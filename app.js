//Create route
const express = require('express')
const path = require('path')
const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/nodekb', {
  useNewUrlParser: true
})
let db = mongoose.connection

//check connection
db.once('open', function () {
  console.log('Connected to MongoDB')
})
//check for db errors
db.on('error', function (err) {
  console.log(err)
})

//Init App
const app = express()

//Bring in Models
let Article = require('./models/article')

//Load View Engine
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'pug')

//Home route
app.get('/', function (req, res) {
  Article.find({}, function (err, articles) {
    if (err) {
      console.log(err)
    } else {
      res.render('index', {
        title: 'Articles',
        articles: articles
      })
    }
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
  console.log('Server started on port 3000...')
})