/**
 * Created by zhangyiqing on 17/2/10.
 *
 * 商户模块
 */

var express = require('express');
var router = express.Router();
var axios = require('axios');
var utils = require('../../libs/utils');
var mongolib = require('../../libs/mongolib')
var _ = require('underscore');

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

router.get('/stock', function (req, res, next) {
  // var id = req.params.id;

  console.log('request merchant');

  mongolib.queryCollection('s603808', (err, objs) => {
    if (err) {
      console.log('query Collection err', err);
      return res.send('query Collection err' + err);
    }
    // objs = _.omit(objs,'_id')
    console.log('objs ', objs);
    utils.send(res,{list: objs})
  })
});


module.exports = router;
