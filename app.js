//Create route
const express = require('express')
const path = require('path')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')

mongoose.connect('mongodb://localhost/notekb', {
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

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

//Set public Folder
app.use(express.static(path.join(__dirname, 'public')))

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

//Get Single Article
app.get('/article/:id', function (req, res) {
  Article.findById(req.params.id, function (err, article) {
    console.log(article)
    res.render('article', {
      article: article
    })
  })
})

//Add Submit POST Route
app.post('/articles/add', function (req, res) {
  let article = new Article()
  article.title = req.body.title
  article.author = req.body.author
  article.body = req.body.body

  article.save(function (err) {
    if (err) {
      console.log(err)
      return
    } else {
      res.redirect('/')
    }
  })
})

//Load edit form
app.get('/article/edit/:id', function (req, res) {
  Article.findById(req.params.id, function (err, article) {
    console.log(article)
    res.render('edit_article', {
      title: 'Edit Article',
      article: article
    })
  })
})

//Start server
app.listen(3000, function () {
  console.log('Server started on port 3000...')
})