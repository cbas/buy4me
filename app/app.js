const express = require('express')
const app = express()
const mongo = require('mongodb').MongoClient
const bodyParser = require('body-parser')
// const cors = require('cors')
var jwt = require('express-jwt')

var jwtCheck = jwt({
  secret: new Buffer(process.env.BUY4ME_AUTH0_SECRET, 'base64'),
  audience: process.env.BUY4ME_AUTH0_ID
})

const dbUri = 'mongodb://' +
  process.env.BUY4ME_MDB_USR + ':' +
  process.env.BUY4ME_MDB_PWD + '@' +
  process.env.BUY4ME_MDB_URL

app.use(express.static('public'))
app.use(jwtCheck)
app.use(bodyParser.json())
// app.use(cors())

// setup persistent connection to database
var dbconn
mongo.connect(dbUri, (err, db) => {
  if (err) throw err
  console.log('connected to db')
  dbconn = db
})

// GET /items returns entire items collection
app.get('/items', (req, res) => {
  console.log('getting all items from db')

  dbconn.collection('items')
    .find() // let front end decide what to do with _id
    .sort({ date: 1 })  // sort by date
    .toArray((err, item) => {
      if (err) return err
      res.send(JSON.stringify(item, null, 2))
    })
})

// POST /items, inserts new item to database
app.post('/items', (req, res) => {
  const item = req.body
  item.date = new Date()  // insert date for sorting

  console.log('inserting item to db')
  res.json(dbconn.collection('items').insert(item))
})

module.exports = app
