import jwt, { GetTokenCallback } from 'express-jwt'
import config from '../config'

const getTokenFromHeaders: GetTokenCallback = req => {
  const { authorization } = req.headers
  if (authorization && authorization.split(' ')[0] === 'Bearer') {
    return authorization.split(' ')[1]
  }

  return null
}

export default {
  required: jwt({
    secret: config.JWT_SECRET,
    userProperty: 'payload',
    getToken: getTokenFromHeaders,
  }),
  optional: jwt({
    secret: config.JWT_SECRET,
    userProperty: 'payload',
    // getToken: getTokenFromHeaders,
    credentialsRequired: false,
  }),
}
