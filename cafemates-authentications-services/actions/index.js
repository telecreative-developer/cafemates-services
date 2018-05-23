require('dotenv').config({path:__dirname+'/./../../.env'})
const db = require('../database')
const bcrypt = require('bcrypt')
const async = require('asyncawait/async')
const await = require('asyncawait/await')
const jwt = require('jsonwebtoken')
const { errorResponse, successResponse } = require('../responsers')

exports.authenticationUser = async((email, password) => {
  try {
    const response = await(db.any(`SELECT * FROM users WHERE email='${email}' LIMIT 1`))
    if(response.length) {
      const responsePassword = bcrypt.compare(password, response[0].password)
      if(responsePassword) {
        const [accessToken, refreshToken, user_id] = await(createTokens(response[0].id))
        const user_id = response[0].id
        return successResponse({accessToken, refreshToken, user_id}, 'Login success', 201)
        return successResponse({accessToken, refreshToken, user_id}, 'Login success', 201)
      }else {
        return errorResponse('Email or password is incorrect', 401)
      }
    }else {
      return errorResponse('Email or password is incorrect', 401)
    }
  }catch(e) {
    console.log(e)
    return errorResponse(e, 500)
  }
})

const createTokens = async((id) => {
  const accessToken = await(jwt.sign({id}, process.env.JWT_SECRET_KEY, {
    subject: 'cafemates',
    algorithm: 'HS256',
    expiresIn: '7d',
    issuer: 'https://github.com/kevinhermawan',
    header: {
      typ: 'JWT'
    }
  }))
  const refreshToken = await(jwt.sign({id}, process.env.JWT_SECRET_KEY2, {
    subject: 'cafemates',
    algorithm: 'HS256',
    expiresIn: '10d',
    issuer: 'https://github.com/dickydns',
    header: {
      typ: 'JWT'
    }
  }))
  return [accessToken, refreshToken]
})

exports.refreshToken = async((oldRefreshToken) => {
  const { id } = await(jwt.decode(oldRefreshToken))
  const response = await(db.any(`SELECT * FROM users WHERE id='${id}'`))
  if(response.length) {
    const [accessToken, refreshToken] = await(createTokens(response[0].id))
    return successResponse({accessToken, refreshToken}, 'Refresh token success', 201)
  }else{
    return errorResponse('User not found', 401)
  }
})