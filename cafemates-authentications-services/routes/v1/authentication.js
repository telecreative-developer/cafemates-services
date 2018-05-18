const express = require('express');
const router = express.Router();
const async = require('asyncawait/async')
const await = require('asyncawait/await')
const { authenticationUser, refreshToken } = require('../../actions')
const { errorResponse } = require('../../responsers')

/* Authentication users. */
router.post('/user', async(function(req, res, next) {
  try {
    if(req.body.email && req.body.password) {
      const response = await(authenticationUser(req.body.email, req.body.password))
      return res.status(response.status).send(response)
    }else{
      return errorResponse('Email and password cannot be empty', 401)
    }
  }catch(e) {
    console.log(e)
    errorResponse(e, 500)
  }
}))

router.post('/user/refresh', async(function(req, res, next) {
  try {
    const response = await(refreshToken(req.body.refreshToken))
    return res.status(response.status).send(response)
  }catch(e) {
    errorResponse(e, 500)
  }
}))

module.exports = router;
