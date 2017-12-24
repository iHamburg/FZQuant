/**
 * Created by zhangyiqing on 17/2/10.
 *
 * 商户模块
 */

const express = require('express');
const router = express.Router();
const utils = require('../../libs/utils');
const mongolib = require('../../libs/mongolib')
const _ = require('underscore');
const datalib = require('../../libs/datalib')


//设置请求头
router.all('*', function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
  next();
});

router.get('/', function (req, res, next) {
    // var id = req.params.id;

  console.log('request merchant');
  return res.send('merchant');
});

/**
 * 查询数据的接口
 */
router.get('/stock', function (req, res, next) {
  // var id = req.params.id;

  console.log('request merchant');

  mongolib.queryCollection('s601933', (err, objs) => {
    if (err) {
      console.log('query Collection err', err);
      return res.send('query Collection err' + err);
    }

    utils.send(res, {list: objs})
  })
});

/**
 *
 * @param: code
 * @param: index: 0/1
 * @param: market: sh(default)
 * @param: fromedate: 2017-01-01 (default)
 * @param: todate: today(default)
 */
router.get('/get_k_data', function (req, res, next) {
  // var id = req.params.id;

  console.log('request merchant');

  mongolib.queryCollection('s601933', (err, objs) => {
    if (err) {
      console.log('query Collection err', err);
      return res.send('query Collection err' + err);
    }

    utils.send(res, {list: objs})
  })
});

module.exports = router;
