const express = require('express');
const router = express.Router();
const async = require('asyncawait/async')
const await = require('asyncawait/await')
const { getNotification, endLocation, retrieveCafemates, waitingApprovedByOther, acceptJoin, rejectJoin, removeRequest, waitingApproved, joinCafemates, deactiveCafemates, postCafemates, retrieveCafematesByID } = require('../../actions')
const authentication = require('../../authentication')



router.get('/', async(function(req, res, next) {
  const response = await(retrieveCafemates())
  return res.status(response.status).json(response)
}))

router.get('/:id', async(function(req, res, next) {
  const response = await(retrieveCafematesByID(req.params.id))
  return res.status(response.status).json(response)
}))

router.post('/post', authentication, async(function(req, res, next) {
  const response = await(postCafemates(req.body))
  return res.status(response.status).json(response)
}))

router.put('/deactived/:id', authentication, async(function(req, res, next) {
  const response = await(deactiveCafemates(req.params.id))
  return res.status(response.status).json(response)
}))

//basecamp group
router.post('/join', authentication, async(function(req, res, next) {
  const response = await(joinCafemates(req.body))
  return res.status(response.status).json(response)
}))

router.get('/pending/:id', async(function(req, res, next) {
  const response = await(waitingApproved(req.params.id))
  return res.status(response.status).json(response)
}))

router.delete('/remove-all-request/:id', authentication, async(function(req, res, next){
  const response = await(removeRequest(req.params.id))
  return res.status(response.status).json(response)
}))

router.put('/accept-join', authentication, async(function(req, res, next) {
  const response = await(acceptJoin(req.body))
  return res.status(response.status).json(response)
}))

router.put('/reject-join', authentication, async(function(req, res, next) {
  const response = await(rejectJoin(req.body))
  return res.status(response.status).json(response)
}))

router.get('/pending-me/:id', authentication, async(function(req, res, next) {
  const response = await(waitingApprovedByOther(req.params.id))
  return res.status(response.status).json(response)
}))

router.post('/end-location', authentication, async(function(req, res, next) {
  const response = await(expiredTime(req.body))
  return res.status(response.status).json(response)
}))

router.get('/get-notification/:id', async(function(req, res, next) {
  const response = await(getNotification(req.params.id))
  return res.status(response.status).json(response)
}))
module.exports = router;
