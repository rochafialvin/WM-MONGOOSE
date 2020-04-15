// try catch
// try {

//    var b = 'Selasa'

//    console.log(a)
//    console.log(b)
   
// } catch (error) {

//    console.log(error)

// }


// const validator = require('validator')

// let email = "alvin@gmailcom"

// console.log(
//    validator.isEmail(email)
// )

const bcrypt = require('bcryptjs')

let password = 'satuduaempat'

bcrypt.hash(password, 8)
   .then(res => console.log({ newPassword : res }))
   .catch(err => console.log(err))