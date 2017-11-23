
/**
 * Created by 张怡清 on 16/11/13.
 */

var Sequelize = require('sequelize');
// var mysql = require('../config/db').mysql;
var mysql = require('../config/mysql');
module.exports = {

  sequelize: new Sequelize(mysql.database, mysql.username, mysql.password, {
    host: mysql.host,
    dialect: 'mysql'
        // define: {
        //     hooks: {
        //         beforeCreate: function () {
        //             // Do stuff
        //             console.log('global hook before create');
        //         }
        //     }
        // }
  }),

  create: function () {
    return this.sequelize;
  }
};
