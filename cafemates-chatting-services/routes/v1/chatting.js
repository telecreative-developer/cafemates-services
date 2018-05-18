const express = require('express');
const router = express.Router();
const async = require('asyncawait/async')
const await = require('asyncawait/await')
const { postChatting, retrieveChatting, retrieveChattingById } = require('../../actions')
const authentication = require('../../authentication')




router.get('/:id', async(function(req, res, next) {
  const response = await(retrieveChatting(req.params.id))
  return res.status(response.status).json(response)
}))

router.get('/show/:id/:sender_id', async(function(req, res, next) {
  const response = await(retrieveChattingById(req.params.id, req.params.sender_id))
  return res.status(response.status).json(response)
}))

router.post('/post', async(function(req, res, next) {
  const response = await(postChatting(req.body))
  return res.status(response.status).json(response)
}))


module.exports = router;

