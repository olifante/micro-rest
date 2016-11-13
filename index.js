const { send } = require( 'micro')

const actions = {
  'GET': doGet,
  'POST': doPost
}

module.exports = async function (req, res) {
  const action = actions[req.method]

  if (!action) {
    return send(res, 500, {'error': 'Only get and post allowed'})
  }

  return action(req, res)
}

async function doGet(req, res) {
  return send(res, 200, {'action': 'GET'})
}

async function doPost(req, res) {
  return send(res, 200, {'action': 'POST'})
}
