/**
 * Created by 张怡清 on 16/11/19.
 *
 * /models/user.js

 */

var Sequelize = require('sequelize');
var sequelize = require('../lib/sequelizelib').create();
var errorlib = require('../lib/errorlib')

/**
 * 返回的是 new Model
 * @type {any}
 */
var Model = sequelize.define('user',
  {

    username: Sequelize.STRING,    // 用户名，需要唯一
    password: Sequelize.STRING,

  },
  {
    freezeTableName: true,
        // timestamps:false,  // 不加createdAt & updatedAt
    paranoid: false,  // 不delete, 而是更新 deletedAt 到最新时间
    defaultScope: {
      attributes: {exclude: ['updatedAt', 'createdAt', 'deletedAt']},
            // where: {
            //     active: true
            // },
            // limit:10,
    },
    scopes: {

      active: {
        where: {
          active: false
        }
      },

      userAddress: {

                // include:[
                //     {
                //         // model:Address,
                //         // attributes:['id','address'],
                //     },
                // ],
      },
      adminDetails: {
        attributes: {exclude: ['updatedAt', 'createdAt', 'deletedAt']},
                // include:[
                //     {
                //         model:Address,
                //         // attributes:['id','address'],
                //     },
                //     {
                //         model:IdCard,
                //     }
                // ],
      }

    }
  }

);

// Model.hasMany(Address); // Address.userId
// Model.hasOne(IdCard);   // IdCard.userId

Model.hook('beforeCreate', function(user, options) {  //instance
    // console.log(' before create hook');
    // console.log(options);
});

/**
 *
 * 用户登录
 *
 * @param username
 * @param password
 * @returns {Promise} 如果then，说明登录成功！！
 */
Model.login = (username, password) => {
  var context = {
    where: {
      username: username,
      password: password,
    },
    attributes: {
      exclude: ['password','updatedAt','createdAt','deletedAt']
    }
  };

  return new Promise(function (resolve, reject) {
        // find 如果没有找到的话，返回的是null !!
    Model.findOne(context).then(function (data) {
      if (!data) {
        reject(errorlib.get_err(errorlib.Err_User_Login_Failure));
      } else {
        resolve(data);
      }
    },
            reject);
  });
};

/**
 * 用户名密码注册
 * @param username
 * @param password
 * @returns {Promise}
 */
// Model.register = (username, password) => {
//   var context = {
//     username: username,
//     password: password,
//     mobile: username,
//   };
//
//   return new Promise(function (resolve, reject) {
//     Model.create(context).then(data => {
//       resolve(data);
//     },
//             reject);
//   });
// };


module.exports = Model;
