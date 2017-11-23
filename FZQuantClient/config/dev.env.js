var merge = require('webpack-merge')
var prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development 123"',
  NETWORK_BASE_URL: 'http://localhost:3000/api',
})
