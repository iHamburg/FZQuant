/**
 * Created by zhangyiqing on 17/2/10.
 *
 * 测试接口
 */

var express = require('express');
var router = express.Router();
var axios = require('axios');

//设置请求头
router.all('*', function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
  next();
});

router.post('/test', function (req, res, next) {
  // var id = req.params.id;
  console.log('=============begin post test');
  console.log(req.body);
  //restart service

  var exec = require('child_process').exec;
  var cmdStr = 'npm run forever';
  // var cmdStr = 'ls';
  exec(cmdStr, function(err, stdout, stderr) {
    if (err) {
      console.log(cmdStr + ' error:' + stderr);
      return res.send('npm run forever error:' + stderr);
    } else {
      console.log(cmdStr + 'success ' + stdout + stderr);
      return res.send(cmdStr + 'success ' + stdout + stderr);
    }
  });
  // return res.send('Test 2 hello');
});

router.get('/', function (req, res, next) {
    // var id = req.params.id;

  return res.send('Test 1223 234234');
});

module.exports = router;
