/**
 * Created by zhangyiqing on 17/2/10.
 *
 * 测试接口
 */

var express = require('express');
var router = express.Router();
var axios = require('axios');

router.get('/', function (req, res, next) {
    // var id = req.params.id;

  return res.send('Test 2');
});

router.get('/hello', function (req, res, next) {
  var spawn = require('child_process').spawn;
  free = spawn('ls', ['-al']);

// 捕获标准输出并将其打印到控制台
  free.stdout.on('data', function (data) {
    console.log('standard output:\n' + data);
    return res.send('hello' + data);
  });

// 捕获标准错误输出并将其打印到控制台
  free.stderr.on('data', function (data) {
    console.log('standard error output:\n' + data);
  });

// 注册子进程关闭事件
  free.on('exit', function (code, signal) {
    console.log('child process eixt ,exit:' + code);
  });
});

router.get('/hello2', function (req, res, next) {
  var exec = require('child_process').exec;
  var cmdStr = 'curl http://www.weather.com.cn/data/sk/101010100.html';
  exec(cmdStr, function(err, stdout, stderr) {
    if (err) {
      console.log('get weather api error:' + stderr);
      return res.send('get weather api error:' + stderr);
    } else {
        /*
         这个stdout的内容就是上面我curl出来的这个东西：
         {"weatherinfo":{"city":"北京","cityid":"101010100","temp":"3","WD":"西北风","WS":"3级","SD":"23%","WSE":"3","time":"21:20","isRadar":"1","Radar":"JC_RADAR_AZ9010_JB","njd":"暂无实况","qy":"1019"}}
         */
      var data = JSON.parse(stdout);
      console.log(data);
      return res.send(data);
    }
  });
});

router.get('/hello3', function (req, res, next) {
  var exec = require('child_process').exec;
  var arg1 = 'hello'
  var arg2 = 'jzhou'
  var fileName = 'python ../PythonProjs/quant-tutorial/logbook-tutorial.py '

  exec(fileName + arg1 + ' ' + arg2 + ' ', function(error, stdout, stderr) {
  // exec('python routes/api/test.py '+ arg1+' '+arg2+' ',function(error,stdout,stderr){

    console.log('stdout', stdout, stderr)
    if (stdout.length > 1) {
      console.log('you offer args:', stdout);
      return res.send('stdout' + stdout);
      // return res.send('sss')
    } else {
      console.log('you don\'t offer args');
      return res.send('you don\'t offer args');
    }
    if (error) {
      console.info('stderr : ' + stderr);
      return res.send('stderr : ' + stderr);
    }
  });
});

router.get('/axios', function (req, res, next) {
  var url = 'http://10.201.129.158:7210/merchant/cloud/querySignMerchant.htm'; // CM2006 查询云店合作门店商户列表
  var data = {};

  axios.post(url, data).then(function (response) {
    console.log(response.data.obj);
        // res.send('resCode '+ response.data.resCode);
    res.send(response.data);
  }).catch(function (error) {
    res.send('error ' + error.message);
  })
});

router.get('/:id/coupons', function (req, res, next) {
  var id = req.params.id;

  return res.send('Test 2 ' + id);
});

router.post('/fenxiu', function (req, res, next) {
  console.log(req.body);

  var response = {
    resCode: '00100000',
    obj: {abc: 'def'},
  };≤

  return res.send(response);
});

router.post('/test', (req, res) => {
  console.log('post # ', req.body);

  var response = {
    resCode: '00100000',
    obj: {abc: 'def'},
  };

  return res.send(response);
});

module.exports = router;
