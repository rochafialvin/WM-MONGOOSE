const express = require('express')
const router = new express.Router()
const Todo = require('../models/todoModel')
const User = require('../models/userModel')

// T O D O
router.post('/todos/:userid', async (req, res) => {
   let owner = req.params.userid
   let description = req.body.description

   try {
      // todo = {_id : 14 , description: Memancing, completed : false, owner : 333}
      let todo = new Todo({ description, owner })
      // user = {_id: 333, username : rochafi, password: $2sjKil todos : [14]}
      let user = await User.findById(owner)
      user.todos.push(todo._id)
      
      await todo.save()
      await user.save()

      res.send(todo)
   } catch (err) {
      res.send(err)
   }

})

module.exports = router