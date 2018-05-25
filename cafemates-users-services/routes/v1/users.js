const express = require('express');
const router = express.Router();
const async = require('asyncawait/async')
const await = require('asyncawait/await')
const { retrieveUsersByEmail, upgradeLicence, updateUser, updateCover, retrieveUsers, retrieveUsersByID, registerUsers, deActiveUsers, deleteUsers, deleteAllUsers, updatePassword, updateAvatar} = require('../../actions')
const authentication = require('../../authentication')

router.get('/', authentication, async(function(req, res, next) {
  const response = await(retrieveUsers())
  return res.status(response.status).json(response)
}))

router.get('/:id', authentication, async(function(req, res, next) {
  const response = await(retrieveUsersByID(req.params.id))
  return res.status(response.status).json(response)
}))

router.get('/email/:email', authentication, async(function(req, res, next) {
  const response = await(retrieveUsersByEmail(req.params.email))
  return res.status(response.status).json(response)
}))

router.post('/register', async(function(req, res, next) {
  const response = await(registerUsers(req.body))
  return res.status(response.status).json(response)
}))

router.put('/update/:id',  async(function(req, res, next) {
  const response = await(updateUser(req.params.id, req.body))
  return res.status(response.status).json(response)
}))

router.put('/change-password/:id', authentication,  async(function(req, res, next) {
  const response = await(updatePassword(req.body, req.params.id))
  return res.status(response.status).json(response)
}))

router.put('/change-avatar/:id', authentication,  async(function(req, res, next) {
  const response = await(updateAvatar(req.params.id, req.body))
  return res.status(response.status).json(response)
}))

router.put('/change-cover/:id', authentication,  async(function(req, res, next) {
  const response = await(updateCover(req.params.id, req.body))
  return res.status(response.status).json(response)
}))

router.put('/deactived-user/:id', authentication,  async(function(req, res, next) {
  const response = await(deActiveUsers(req.params.id))
  return res.status(response.status).json(response)
}))

router.delete('/delete-user/:id', authentication,  async(function(req, res, next) {
  const response = await(deleteUsers(req.params.id))
  return res.status(response.status).json(response)
}))

router.delete('/delete-user/all', authentication,  async(function(req, res, next) {
  const response = await(deleteAllUsers())
  return res.status(response.status).json(response)
}))

router.post('/licence-upgrade', async(function(req, res, next) {
  const response = await(upgradeLicence(req.body))
  return res.status(response.status).json(response)
}))

module.exports = router;

