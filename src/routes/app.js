'use strict'

module.exports = function(app) {
  let userList = require('../controllers/user')
  const auth = require('../middlewares/auth')

  app.route("/api/register").post(userList.register)
  app.route("/api/login").post(userList.login)
  app.route("/api/user/profile").get(auth, userList.getProfile)
  app.route("/api/files").get(auth, userList.listFile)
}