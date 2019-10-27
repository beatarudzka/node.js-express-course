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
  let articles = [
    {
      id: 1,
      title: 'Article One',
      author: 'Beata Rudzka',
      body: 'This is article one'
    },
    {
      id: 2,
      title: 'Article Two',
      author: 'Beata Rudzka',
      body: 'This is article two'
    },
    {
      id: 3,
      title: 'Article Three',
      author: 'Beata Rudzka',
      body: 'This is article three'
    },

  ]
  res.render('index', {
    title: 'Articles',
    articles: articles
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