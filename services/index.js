'use strict'

const jwt = require('jwt-simple')
const moment = require('moment')

function createToken (user) {
  const payload = {
    sub: user.User_id,
    iat: moment().unix(),
    exp: moment().add(1, 'days').unix()
  }

  return jwt.encode(payload, process.env.SECRET_CLAVE)
}

function decodeToken (token) {
  const decoded = new Promise((resolve, reject) => {
    try {
      console.log('secret : ', token);
      const payload = jwt.decode(token, process.env.SECRET_CLAVE)
      if (payload.exp <= moment().unix()) {
        return reject({
          status: 401,
          message: 'El token ha expirado'
        })
      }
      resolve(payload.sub)
    } catch (err) {
      console.log(err);
      return reject({
        status: 400,
        message: 'Invalid Token'
      })
    }
  })
  return decoded
}

module.exports = {
  createToken,
  decodeToken
}
