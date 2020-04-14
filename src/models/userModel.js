const mongoose = require('mongoose')

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
      type: String
   },
   age : {
      type: Number
   }
})

const User = mongoose.model('User', userSchema)

module.exports = User