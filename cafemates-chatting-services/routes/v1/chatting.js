const express = require('express');
const router = express.Router();
const async = require('asyncawait/async')
const await = require('asyncawait/await')
const { deleteChatting, postChatting, retrieveChatting, retrieveChattingById } = require('../../actions')
const authentication = require('../../authentication')




router.get('/:id', authentication, async(function(req, res, next) {
  const response = await(retrieveChatting(req.params.id))
  return res.status(response.status).json(response)
}))

router.get('/show/:id/:sender_id', authentication, async(function(req, res, next) {
  const response = await(retrieveChattingById(req.params.id, req.params.sender_id))
  return res.status(response.status).json(response)
}))

router.post('/post', authentication, async(function(req, res, next) {
  const response = await(postChatting(req.body))
  return res.status(response.status).json(response)
}))

router.delete('/delete/:code_id', authentication, async(function(req, res, next) {
  const response = await(deleteChatting(req.params.code_id))
  return res.status(response.status).json(response)
}))

module.exports = router;

