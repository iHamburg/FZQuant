var merge = require('webpack-merge')
var prodEnv = require('./prod.env')
// var preEnv = require('./pre.env')

// 先merge了prod环境
module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  API_HOST: '"http://120.136.161.163:3000/api"',
  Name: '"my dev name"'
})
