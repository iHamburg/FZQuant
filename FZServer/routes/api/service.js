/**
 * Created by 郭秋思 on 17/6/12.
 *
 * 活动相关关接口
 */

var express = require('express');
var router = express.Router();
var axios = require('axios');
var utils = require('../../lib/utils');
var networklib = require('../../lib/networklib')
var _ = require('underscore');
var logger = require('../../lib/logger')


var share_url = networklib.share_url; // 云店中台



//设置请求头
router.all('*',function (req,res,next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    next();
});

router.post('/test',function (req,res,next) {

    // var id = req.params.id;

    return res.send('Test 2 hello');

});

router.post('/shareurl',function (req,res,next) {

    console.log(req.body.activityId);

    var response = {}

    if(share_url != '') {
      response.resCode = '00100000'
      response.msg = '操作成功'
      response.obj = share_url + req.body.activityId
    } else {
      response.resCode = '00100001'
      response.msg = '请配置C端落地分享页'
      response.obj = '111'
    }
    return res.send(response);
});


router.post('/getInfo', function (req, res) {

  // var env
  logger.info('/getInfo', req.body);


  var info = {
    env: process.env.NODE_ENV,
  }

  var response = {
    resCode: '00100000',
    msg : '操作成功',
    obj: info
  }

  return res.send(response)
});

module.exports = router;
