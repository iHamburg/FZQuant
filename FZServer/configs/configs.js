/**
 * Created by zhangyiqing on 2017/11/24.
 */

const mysql = {
  host: '121.42.26.144', //不能用localhost
  username: 'root',
  password: 'root',
  database: 'fzquant',
  // port: 3306
};

const mongodb = {
  host: 'localhost',
  port: 27017,
  db: 'fzquant'
}

module.exports = {
  mysql,
  mongodb
}
