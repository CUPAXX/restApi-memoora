'use strict'

module.exports = function(app) {
  let userList = require('../controllers/user')

  app.route("/user")
  .get(userList.getUser)
  .post(userList.createUser)

  app.route("/user/:id")
  .get(userList.getUserById)
  .put(userList.updateUser)
  .delete(userList.deleteUser)
}