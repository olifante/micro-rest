const { send } = require('micro')

// using sample product list from
// http://json-schema.org/example1.html
const products = [{
  "id": 1,
  "name": "A green door",
  "price": 12.50,
  "tags": ["home", "green"]
}, {
  "id": 2,
  "name": "An ice sculpture",
  "price": 12.50,
  "tags": ["cold", "ice"],
  "dimensions": {
    "length": 7.0,
    "width": 12.0,
    "height": 9.5
  },
  "warehouseLocation": {
    "latitude": -78.75,
    "longitude": 20.4
  }
}, {
  "id": 3,
  "name": "A blue mouse",
  "price": 25.50,
  "dimensions": {
    "length": 3.1,
    "width": 1.0,
    "height": 1.0
  },
  "warehouseLocation": {
    "latitude": 54.4,
    "longitude": -32.7
  }
}]

module.exports = async (req, res) => {
  const action = actions[req.method]

  if (!action) {
    return send(res, 500, { 'error': 'Unknown or unsupported HTTP method' })
  }

  return action(req, res)
}

doGet = async (req, res) => {
  return send(res, 200, products)
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

