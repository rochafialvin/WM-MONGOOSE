// // try catch
// // try {

// //    var b = 'Selasa'

// //    console.log(a)
// //    console.log(b)
   
// // } catch (error) {

// //    console.log(error)

// // }


// // const validator = require('validator')

// // let email = "alvin@gmailcom"

// // console.log(
// //    validator.isEmail(email)
// // )

// // const bcrypt = require('bcryptjs')

// // let password = 'satuduaempat'

// // bcrypt.hash(password, 8)
// //    .then(res => console.log({ newPassword : res }))
// //    .catch(err => console.log(err))

// // result 1 = $2a$08$2TE96QkYLBZ2vLWlIb.Bnu/opZL6bK.rrOgZueb2xiIrNNkWV8sFK
// // result 2 = $2a$08$WHrLd8GV5ogO63U8/4fNE.he8N5JqvJ2W0YGXUvGeoueHvQs5YdXe

// // bcrypt.compare('satuduaempat', '$2a$08$WHrLd8GV5ogO63U8/4fNE.he8N5JqvJ2W0YGXUvGeoueHvQs5YdXe')
// //    .then(res => console.log({res}))
// //    .catch(err => console.log({err}))

// // let a = 'Senin'
// // let b = 'Selasa'

// // try{

// //    console.log('try start')
   
// //    console.log(a)
// //    console.log(b)

// //    console.log('try finish')

// //    return 24

// // } catch(err){

// //    console.log('Catch')
// //    console.log({error : err.message})

// // } finally {
// //    console.log('Finally')
// // }


// // console.log('DIRNAME', __dirname)
// // console.log('FILENAME',__filename)

// let todo = {completed: true, description: "Hello"}
// let body = {completed: true, description: "NEw"}

// let keys = Object.keys(todo)
// // keys = [ 'completed', 'description']

// console.log('SEBELUM', todo)
// // Filtering keys
// // keys = [ 'completed', 'description']
// let finalKeys = keys.filter(val => body[val])
// // finalKeys = ['description']

// // keys = [ 'completed', 'description']
// keys.forEach(val => todo[val] = body[val])
// // val = 'description'
// todo['description'] = "Hello"


// finalKeys.forEach(val => todo[val] = body[val])
// // console.log('SESUDAH', todo)


// // todo.completed = body.completed
// // todo.completed = true
// // todo.description = body.description
// // todo.description = Running


// let car = {color: 'Green'}

// console.log(car['warna'])

// // let val = 'color'

// // console.log(car.val); // undefined
// // console.log(car[val]); // Green


console.log(false == false)