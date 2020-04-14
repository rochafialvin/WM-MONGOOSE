// CONFIG EXPRESS
const express = require('express')
const app = express()
const port = 2020
app.use(express.json())

// CONFIG MONGOOSE
const mongoose = require('mongoose')
mongoose.connect('mongodb://127.0.0.1:27017/mongoose-test', {
   useNewUrlParser: true,
   useUnifiedTopology: true
})

// IMPORT MODELS
const User = require('./src/models/userModel')

// HOME
app.get('/', (req, res) => {
   res.send(
      '<h1> API is running </h1>'
   )
})

// Read All User
app.get('/users', (req, res) => {
   User.find({})
      .then(resp => res.send(resp)).catch(err => res.send(err))
})

// Create New User
app.post('/users', (req, res) => {
   // req.body = {username : 'rochafi', name: 'Rochafi', age: 28}

   // Create new user
   const user = new User(req.body)
   // Save ke database
   user.save()
      .then(resp => res.send(resp)).catch(err => res.send(err))
})


app.listen(port, () => { console.log('Success Running') })