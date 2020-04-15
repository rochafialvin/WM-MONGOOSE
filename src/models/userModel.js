const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')

const userSchema = new mongoose.Schema({
   username : {
      type: String, // Tipe data yang akan disimpan
      unique: true, // Tidak boleh sama
      required: true, // Wajib di isi
      set : val => val.replace(/ /g, ""), // Akan menggantikan semua spasi dengan string kosong yang ada diantara karakter
      validate(value){ // Handle jika yang di input user bukan sebuah string

         let result = isNaN(parseInt(value))

         if(!result){
            throw new Error("Username tidak boleh angka")
         }

      }
   },
   name: {
      type: String,
      required: true,
      trim : true, // Menghapuse spasi sebelum dan sesudah data input , " randy orton " -> "randy orton"
      validate(value){ // Handle jika yang di input user bukan sebuah string

         let result = isNaN(parseInt(value))

         if(!result){
            throw new Error("Username tidak boleh angka")
         }

      }

   },
   email: {
      type: String,
      required: true,
      unique : true,
      trim: true,
      lowercase: true, // Akan mengubah data menjadi huruf kecil semua
      validate(value){
         if(!validator.isEmail(value)){
            throw new Error("Email tidak valid")
         }
      }
   },
   password: {
      type: String,
      required: true,
      trim: true,
      minlength: 7
   },
   age : {
      type: Number,
      default: 0,
      set: val => parseInt(val)
   }
})

userSchema.pre('save', async function(next) { // Mengganti password sebelum di save ke database
   // this = {username : 'rochafi', password : 'satuduatiga, ... }
   let user = this

   try{
      user.password = await bcrypt.hash(user.password, 8)
   } catch(err) {
      throw new Error('Problem when hash password')
   }

   // Untuk memberi tahu bahwa proses sudah selesai, dan melanjutkan ke proses berikutkunya (save data ke database)
   next()
})


const User = mongoose.model('User', userSchema)
module.exports = User
