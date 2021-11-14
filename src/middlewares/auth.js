const jwt = require('jsonwebtoken')
const { response } = require('../helpers/standarRes')

const auth = (req, res, next) => {
  if (req.headers?.authorization) {
    if (req.headers.authorization.startsWith('Bearer')) {
      try {
        const token = req.headers.authorization.slice(7)
        const user = jwt.verify(token, process.env.APP_KEY)
        req.authUser = user
        next()
      } catch (err) {
        return response(res, 401, false, 'Session Expired, you need to login again')
      }
    }
  } else {
    return response(res, 401, false, 'We Need Auth Token')
  }
}
module.exports = auth
