/**
 * Created by zhangyiqing on 17/2/10.
 *
 * 商户模块
 */

var express = require('express');
var router = express.Router();
var utils = require('../../lib/utils');
var model = require('../../models/user')

// var _ = require('underscore');

//设置请求头
router.all('*', function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
  next();
});

router.get('/login', function (req, res, next) {
  let username = req.query.username;
  let password = req.query.password;

  model.login(username, password).then(obj => {
    return utils.send(res);
    // return res.send('login successful');
  }).catch(err => {
    return utils.send(res, null, err);
  })
},
utils.processAPIErrorMiddleware //处理
);

//
// router.get('/', function (req, res, next) {
//     // var id = req.params.id;
//
//   console.log('request merchant');
//   return res.send('merchant');
// });
//
// /**
//  * 1001-商品图片上传接口
//  * @卢聪
//  *
//  *
//  */
// router.post('/1001', function (req, res, next) {
//     // console.log('body',req.body);
//   var url = host_goods + '/goods/fileUpload/upload.htm';
//   var data = req.body;
//     //进行透传
//   axios.post(url, data).then(function(response) {
//     console.log('图片上传\n', response.data);
//     return res.type('json').send(response.data);
//   }).catch(function(error) {
//     return utils.send(res, null, error);
//   })
// });
//
// /**
//  * 1022-修改商户设置
//  * 黄凤秀
//  * @param  req
//  * @param  res
//  * @param
//  * @return
//  */
// router.post('/1022', function (req, res, next) {
//     //TODO
//   var url = host_cloud + '/cloud/merchantInfoController/updateMerchantInfoBrand.htm';
//   var data = req.body;
//     //进行透传
//   axios.post(url, data).then(function(response) {
//     return res.type('json').send(response.data);
//   }).catch(function(error) {
//     return utils.send(res, null, error);
//   })
// });
//
// /**
//  * 1023 查询商户设置
//  * 黄凤秀
//  * @param  req
//  * @param  res
//  * @param
//  * @return
//  */
// router.post('/1023', function (req, res, next) {
//   console.log('请求参数：', req.body)
//
//     //TODO
//   var url = host_cloud + '/cloud/merchantInfoController/queryMerchantInfoSite.htm';
//   var data = req.body;
//     //进行透传
//   axios.post(url, data).then(function(response) {
//     console.log('响应参数：', res.data)
//     return res.type('json').send(response.data);
//   }).catch(function(error) {
//     return utils.send(res, null, error);
//   })
// });
//
// /**
//  * 1024-查询品牌目录列表 @孙传奇
//  *
//  * @author 方胜军
//  *
//  *
//  */
// router.post('/1024', function (req, res, next) {
//   var url = host_goods + '/goods/goodsBrand/selectBrand.htm';
//   var data = req.body;
//     //进行透传
//   axios.post(url, data).then(function(response) {
//     return res.type('json').send(response.data);
//   }).catch(function(error) {
//     return utils.send(res, null, error);
//   })
// });
//
// /**
//  *
//  * 1021-登录接口
//  *
//  * @郭秋思
//  */
// router.post('/1021', function(req, res, next) {
//   console.log('body ', req.body);
//   var url = host_cloud + '/cloud/merchantInfoController/merchantLogin.htm';
//   var params = req.body;
//   console.log('登陆入参', params);
//   axios.post(url, params).then(function(response) {
//     console.log('登陆返参', response.data)
//     if (response.data.resCode == "00100000") {
//       console.log(response.data);
//       return res.type('json').send(response.data);
//     } else {
//       console.log(response.data);
//       return res.type('json').send(response.data);
//     }
//   }).catch(function(error) {
//     return utils.send(res, null, error);
//   });
// });
//
// /**
//  * 1032-上传LOGO或上传头像
//  *
//  * @郭秋思
//  */
// router.post('/1032', function (req, res, next) {
//   var url = host_cloud + '/cloud/merchantInfoController/updateMerchantInfoAvatar.htm';
//   var data = req.body;
//     //进行透传
//   axios.post(url, data).then(function(response) {
//     return res.type('json').send(response.data);
//   }).catch(function(error) {
//     return utils.send(res, null, error);
//   })
// });
//
// /**
//  * 1034- 查询用户权限表
//  *
//  */
// router.post('/1034', function (req, res, next) {
//   var url = host_cloud + '/cloud/merchantInfoController/queryMercPermission.htm';
//   var data = req.body;
//   //进行透传
//   axios.post(url, data).then(function(response) {
//     return res.type('json').send(response.data);
//   }).catch(function(error) {
//     return utils.send(res, null, error);
//   })
// });

module.exports = router;
