const jwt = require('jsonwebtoken')
require('dotenv/config')

const authentication = (req, res, next) => {
  var token = req.headers.authorization
  if(token){
    jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decoded) => {
      if(err){
        res.status(401).json(err)
      }else{
        req.decoded = decoded
        next()
      }
    })
  }else {
    return res.status(401).send({
      message: 'No token provided',
      status: 401
    })
  }
}

module.exports = authentication