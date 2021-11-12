'use strict'

module.exports = function(app) {
  let userList = require('../controllers/user')

  app.route("/api/register").post(userList.register)
  app.route("/api/login").post(userList.login)
  app.route("/api/files").get(userList.listFile)
}