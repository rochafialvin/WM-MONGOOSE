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

// bcrypt.hash(password, 8)
//    .then(res => console.log({ newPassword : res }))
//    .catch(err => console.log(err))

// result 1 = $2a$08$2TE96QkYLBZ2vLWlIb.Bnu/opZL6bK.rrOgZueb2xiIrNNkWV8sFK
// result 2 = $2a$08$WHrLd8GV5ogO63U8/4fNE.he8N5JqvJ2W0YGXUvGeoueHvQs5YdXe

// bcrypt.compare('satuduaempat', '$2a$08$WHrLd8GV5ogO63U8/4fNE.he8N5JqvJ2W0YGXUvGeoueHvQs5YdXe')
//    .then(res => console.log({res}))
//    .catch(err => console.log({err}))