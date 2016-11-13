const { send } = require('micro')

module.exports = async (req, res) => {
  const action = actions[req.method]

  if (!action) {
    return send(res, 500, { 'error': 'Unknown or unsupported HTTP method' })
  }

  return action(req, res)
}

doGet = async (req, res) => {
  return send(res, 200, { 'action': 'GET' })
}

doPost = async (req, res) => {
  return send(res, 200, { 'action': 'POST' })
}

doMethodNotFound = async (req, res) => {
  return send(res, 404, { 'notFound': 'Endpoint only accepts GET and POST methods' })
}

const actions = {
  'GET': doGet,
  'POST': doPost,
  'PUT': doMethodNotFound,
  'PATCH': doMethodNotFound,
  'DELETE': doMethodNotFound,
}

