// try catch
// try {

//    var b = 'Selasa'

//    console.log(a)
//    console.log(b)
   
// } catch (error) {

//    console.log(error)

// }


const validator = require('validator')

let email = "alvin@gmailcom"

console.log(
   validator.isEmail(email)
)