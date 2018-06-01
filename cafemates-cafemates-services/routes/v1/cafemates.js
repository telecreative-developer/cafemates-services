const express = require('express');
const router = express.Router();
const async = require('asyncawait/async')
const await = require('asyncawait/await')
const { removeMyRequest, confirmUserList, getNotification, endLocation, retrieveAllCafemates, retrieveCafematesFilter, waitingApprovedByOther, acceptJoin, rejectJoin, removeRequest, waitingApproved, joinCafemates, deactiveCafemates, postCafemates, retrieveCafematesByID } = require('../../actions')
const authentication = require('../../authentication')



router.get('/', async(function(req, res, next) {
  const response = await(retrieveAllCafemates())
  return res.status(response.status).json(response)
}))

router.get('/filter/:genderMan&:genderWoman&:age_first&:age_last', async(function(req, res, next) {
  const response = await(retrieveCafematesFilter(req.params.genderMan, req.params.genderWoman, req.params.age_first, req.params.age_last))
  return res.status(response.status).json(response)
}))

router.get('/confirm-list/:id', async(function(req, res, next) {
  const response = await(confirmUserList(req.params.id))
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

router.put('/remove-all-request/:id', authentication, async(function(req, res, next){
  const response = await(removeRequest(req.params.id))
  return res.status(response.status).json(response)
}))

router.put('/remove-my-request/:id', authentication, async(function(req, res, next){
  const response = await(removeMyRequest(req.params.id))
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



router.get('/get-notification/:id', async(function(req, res, next) {
  const response = await(getNotification(req.params.id))
  return res.status(response.status).json(response)
}))
module.exports = router;

