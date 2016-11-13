const { send } = require('micro')

const actions = {
  'GET': doGet,
  'POST': doPost,
  'PUT': doMethodNotFound,
  'PATCH': doMethodNotFound,
  'DELETE': doMethodNotFound,
}

module.exports = async function (req, res) {
  const action = actions[req.method]

  if (!action) {
    return send(res, 500, { 'error': 'Unknown or unsupported HTTP method' })
  }

  return action(req, res)
}

async function doGet(req, res) {
  return send(res, 200, { 'action': 'GET' })
}

async function doPost(req, res) {
  return send(res, 200, { 'action': 'POST' })
}

async function doMethodNotFound(req, res) {
  return send(res, 404, { 'notFound': 'Endpoint only accepts GET and POST methods' })
}
