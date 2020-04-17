// CONFIG EXPRESS
const express = require('express')
const cors = require('cors')
const app = express()
const port = 2020

// IMPORT ROUTER
const userRoute = require('./src/route/userRoute')
const todoRoute = require('./src/route/todoRoute')

app.use(cors())
app.use(express.json())
app.use(userRoute)
app.use(todoRoute)

// CONFIG MONGOOSE
const mongoose = require('mongoose')
mongoose.connect('mongodb://127.0.0.1:27017/mongoose-test', {
   useNewUrlParser: true,
   useUnifiedTopology: true,
   useCreateIndex :  true,
   useFindAndModify : false
})

// HOME
app.get('/', (req, res) => {
   res.send(
      '<h1> API is running </h1>'
   )
})

app.listen(port, () => { console.log('Success Running') })