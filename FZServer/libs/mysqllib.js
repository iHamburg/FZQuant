/**
 * Created by zhangyiqing on 16/11/18.
 */

var mysql = require('mysql');
var config = require('../config/mysql')

module.exports = {

  connection: mysql.createConnection({
    host: config.host,
    user: config.username,
    password: config.password,
    database: config.database
  }),
};
