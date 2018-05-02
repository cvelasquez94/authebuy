'use strict'

const jwt = require('jwt-simple')
const moment = require('moment')

function decodeToken (token) {
  const decoded = new Promise((resolve, reject) => {
    try {
      console.log('secret: ', process.env.SECRET_CLAVE);
      const payload = jwt.decode(token, process.env.SECRET_CLAVE || 'defultclave')
      if (payload.exp <= moment().unix()) {
        reject({
          status: 401,
          message: 'El token ha expirado'
        })
      }
      resolve(payload.sub)
    } catch (err) {
      reject({
        status: 500,
        message: 'Invalid Token'
      })
    }
  })
  return decoded
}

module.exports = {
  decodeToken
}
