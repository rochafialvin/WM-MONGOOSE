// CONFIG EXPRESS
const express = require('express')
const app = express()
const port = 2020
app.use(express.json())

// CONFIG MONGOOSE
const mongoose = require('mongoose')
mongoose.connect('mongodb://127.0.0.1:27017/mongoose-test', {
   useNewUrlParser: true,
   useUnifiedTopology: true,
   useCreateIndex :  true,
   useFindAndModify : false
})

// IMPORT MODELS
const User = require('./src/models/userModel')

// HOME
app.get('/', (req, res) => {
   res.send(
      '<h1> API is running </h1>'
   )
})

// Async Await

// Read All User
app.get('/users', async (req, res) => {

   // Akan mencoba menjalankan kode di dalam 'try', jika terjadi masalah akan pindah ke 'catch' 
   // dan informasi masalahnya akan ada di variable 'err'
   try {
      // Mencari semua user
      let users = await User.find({})
      // Kirim hasil pencarian sebagai bentuk respon
      res.send(users)
   
   } catch (err) {
      // Kirim object 'err' sebagai bentuk respon
      res.send(err)

   }

})

// Create New User
app.post('/users', async (req, res) => {
   // req.body = {username : 'rochafi', name: 'Rochafi', age: 28}

   // Create new user
   const user = new User(req.body)
   // Save ke database
   try {
      // save() digunakan untuk menyimpan user baru ke dalam database
      let result = await user.save()
      // Result dari proses ini akan dikirim sebagai respon
      res.send(result)

   } catch (err) {
      res.send(err)
   }
      
})

// Read One User By Id
app.get('/user/:id', async (req, res) => {
   // Menyimpan id user di variable
   let _id = req.params.id

   try{
      // Mencari user berdasarkan id
      let user = await User.findById(_id)

      // Jika user tidak ditemukan, maka variable 'user' akan kosong 
      if(!user){
         // Kirim object berupa pesan error
         return res.send({ error : `User dengan id ${_id} tidak ditemukan` })
      }

      // Kirim user sebagai bentu respon
      res.send(user)

   } catch (err){ // Jika terjadi masalah dalam proses pencarian data
      res.send(err)

   }
})

// Update User By Id
app.patch('/user/:id', async (req, res) => {
   let _id = req.params.id
   let body = req.body

   // Callback (ES 5 / 2014)
   // User.findByIdAndUpdate(_id, body, function(err, doc) {
   //    if(err){
   //       return res.send(err)
   //    }

   //    res.send(doc)
   // })

   // Promise (ES 6 / 2015)
   // User.findByIdAndUpdate(_id, body)
   //    .then(doc => {
   //       res.send(doc)

   //    }).catch(err => {
   //       res.send(err)

   //    })

   // Async Await (ES 7 / 2016)
   try {
      let doc = await User.findByIdAndUpdate(_id, body)
      res.send(doc)

   } catch (err) {
      res.send(err)
      
   }
})

// Delete User By Id
app.delete('/user/:id', async (req, res) => {
   let _id = req.params.id


   try {
      let user = await User.findByIdAndDelete(_id)

      if(!user){
         return res.send({ message: 'User tidak ditemukan di database' })
      }

      res.send({
         message: 'User berhasil di hapus', user
      })

   } catch (err) {
      res.send(err)

   }
})




app.listen(port, () => { console.log('Success Running') })