exports.errorResponse = (message, status) => ({
  name: 'error',
  message: message,
  status: status
})

exports.successResponse = (tokens, message, status) => ({
  name: 'success',
  message: message,
  status: status,
  tokens: tokens
})