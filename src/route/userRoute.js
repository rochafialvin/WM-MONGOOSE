const express = require('express')
const router = new express.Router()
const sharp = require('sharp')
const User = require('../models/userModel')

///////////////////////////////
// U P L O A D   M U L T E R //
///////////////////////////////

const multer = require('multer')
const upload = multer({
   limits : {
      fileSize : 1000000 // Byte
   },
   fileFilter(req, file, cb) {
      // file = {fieldname : 'avatar', originalname: 'maxresdefault.jpg'}

      if(!file.originalname.match(/\.(jpg|jpeg|png)$/)){
        return cb(new Error('File harus berupa jpg, jpeg, png'))
      }

      cb(null, true)
   }
})

// Upload Avatar
router.post('/users/avatar/:userid', upload.single('avatar') , async (req, res) => {
   // Jika foto berhasil melewati filter name maka akan ada di 'req.file'
   // req.file = {fieldname, originalname, buffer}

   try {
      // Edit Avatar : resize, convert ke png
      let avatar = await sharp(req.file.buffer).resize({width: 250}).png().toBuffer()
      // Mencari user bedasarkan id
      let user = await User.findById(req.params.userid)
      // Menyimpan gambar dalam bentuk buffer
      user.avatar = avatar
      // Menyimpan user setelah ada perubahan (menyimpan gambar)
      await user.save()
      // Mengirim respon ke client
      res.send('Upload Success')

   } catch (err) {
      // Mengirim error
      res.send(err)
   }
})

// Read Avatar
router.get('/user/avatar/:userid', async (req, res) => {

   try {
      // Get user
      let user = await User.findById(req.params.userid)

      // Jika user belum memiliki avatar
      if(!user.avatar) return res.send('No Image')
      
      // Config untuk mengirim avatar
      res.set('Content-type', 'image/png')
      // Kirim avatar
      res.send(user.avatar)
   } catch (err) {
      res.send(err)
   }

})

// Read All User
router.get('/users', async (req, res) => {

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

// R E G I S T E R   U S E R
router.post('/users', async (req, res) => {
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
router.get('/user/:id', async (req, res) => {
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
      res.send({user, photo : `http://localhost:2020/user/avatar/${_id}` })

   } catch (err){ // Jika terjadi masalah dalam proses pencarian data
      res.send(err)

   }
})

// L O G I N   U S E R 
router.post('/user/login', async (req, res) => {
   // req.body = {email : ... , password: ...}
   let {email, password} = req.body

   try {
      // Check email dan password
      let user = await User.login(email, password)
      // Jika berhasil maka akan berisi data user
      res.send(user)
   } catch (err) {
      // Jika gagal, mengirim object error
      res.send({err_message: err.message})
   }

})

// Update User By Id
router.patch('/user/:id', async (req, res) => {
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
router.delete('/user/:id', async (req, res) => {
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

module.exports = router