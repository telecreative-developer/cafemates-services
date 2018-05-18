const express = require('express');
const router = express.Router();
const async = require('asyncawait/async')
const await = require('asyncawait/await')
const { retrieveCrud, postCrud, retrieveById, deleteCrud, updateCrud } = require('../../actions')
const authentication = require('../../authentication')




router.get('/', async(function(req, res, next) {
  const response = await(retrieveCrud())
  return res.status(response.status).json(response)
}))

router.get('/:id', async(function(req, res, next) {
  const response = await(retrieveById(req.params.id))
  return res.status(response.status).json(response)
}))

router.post('/post', async(function(req, res, next) {
  const response = await(postCrud(req.body))
  return res.status(response.status).json(response)
}))

router.delete('/delete/:id', async(function(req, res, next) {
  const response = await(deleteCrud(req.params.id))
  return res.status(response.status).json(response)
}))

router.put('/update/:id', async(function(req, res, next) {
  const response = await(updateCrud(req.params.id, req.body))
  return res.status(response.status).json(response)
}))

module.exports = router;

