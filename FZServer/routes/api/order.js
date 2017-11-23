/**
 * Created by guoqiusi on 17/5/8.
 *
 * 订单相关接口
 */

var express = require('express');
var router = express.Router();
var axios = require('axios');
var utils = require('../../libs/utils');
var _ = require('underscore');
var networklib = require('../../libs/networklib')

var orderHost = networklib.host_order; // 订单中台
var merchantHost = networklib.host_merchant; // 商户中台
var goodsHost = networklib.host_goods; // 商品中台
var logisticsHost = networklib.host_logistics; // 物流中台

//设置请求头
router.all('*', function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
  next();
});

/**
 * 2001-查询订单不同状态数量
 *
 * @input mebmerId 会员id
 *        merchantId 商户id
 */
router.post('/2001', function (req, res, next) {
    // console.log('body',req.body);-

  var url = orderHost + '/blomni-o2o/oms/queryNormal/getCountForOrderState';
  var data = req.body;
    //进行透传
  axios.post(url, data).then(function(response) {
    return res.type('json').send(response.data);
  }).catch(function(error) {
    return utils.send(res, null, error);
  })
});

/**
 * 2002-查询订单列表
 */
router.post('/2002', function (req, res, next) {
  console.log('body', req.body);

  var url = orderHost + '/blomni-o2o/oms/queryNormal/queryOrderList';
  var data = req.body;
    //进行透传
  axios.post(url, data).then(function(response) {
    return res.type('json').send(response.data);
  }).catch(function(error) {
    return utils.send(res, null, error);
  })
});

/**
 * 2003-查询订单详情
 */
router.post('/2003', function (req, res, next) {
    // console.log('body',req.body);

  var url = orderHost + '/blomni-o2o/oms/orderInfo/queryMerchantOrderDetails';
  var data = req.body;
    //进行透传
  axios.post(url, data).then(function(response) {
    return res.type('json').send(response.data);
  }).catch(function(error) {
    return utils.send(res, null, error);
  })
});

/**
 * 2004-更改订单状态
 */
router.post('/2004', function (req, res, next) {
    // console.log('body',req.body);

  var url = orderHost + '/blomni-o2o/oms/orderInfo/updateOrderState';
  var data = req.body;
    //进行透传
  axios.post(url, data).then(function(response) {
    return res.type('json').send(response.data);
  }).catch(function(error) {
    return utils.send(res, null, error);
  })
});

/**
 * 2005-商户（接单）开单
 */
router.post('/2005', function (req, res, next) {
  console.log('body', req.body);

  var url = orderHost + '/blomni-o2o/oms/orderInfo/receiveOrder';
  var data = req.body;
    //进行透传
  axios.post(url, data).then(function(response) {
    return res.type('json').send(response.data);
  }).catch(function(error) {
    return utils.send(res, null, error);
  })
});

/**
 * 2006-根据提货码查询订单
 */
router.post('/2006', function (req, res, next) {
    // console.log('body',req.body);

  var url = orderHost + '/blomni-o2o/oms/deliveryCode/queryOrderIdByMentionGoodsCode';
  var data = req.body;
    //进行透传
  axios.post(url, data).then(function(response) {
    return res.type('json').send(response.data);
  }).catch(function(error) {
    return utils.send(res, null, error);
  })
});

/**
 * 2007-查询商户消息列表
 */
router.post('/2007', function (req, res, next) {
    // console.log('body',req.body);

  var url = merchantHost + '/merchant/message/queryMessageList.htm';
  var data = req.body;
    //进行透传
  axios.post(url, data).then(function(response) {
    return res.type('json').send(response.data);
  }).catch(function(error) {
    return utils.send(res, null, error);
  })
});

/**
 * 2008-查询未读消息数量
 */
router.post('/2008', function (req, res, next) {
    // console.log('body',req.body);

  var url = merchantHost + '/merchant/message/queryUnReadMessageCount.htm';
  var data = req.body;
    //进行透传
  axios.post(url, data).then(function(response) {
    return res.type('json').send(response.data);
  }).catch(function(error) {
    return utils.send(res, null, error);
  })
});

/**
 * 2010-标识消息已读
 */
router.post('/2010', function (req, res, next) {
    // console.log('body',req.body);

  var url = merchantHost + '/merchant/message/readMessage.htm';
  var data = req.body;
    //进行透传
  axios.post(url, data).then(function(response) {
    return res.type('json').send(response.data);
  }).catch(function(error) {
    return utils.send(res, null, error);
  })
});

/**
 * 2011-插入用户历史查询商品
 *
 *
 customerId	咨询会员id	string
 goodsId	商品id	string
 memberId	商户会员id	string
 merchantId
 */
router.post('/2011', function (req, res, next) {
    // console.log('body',req.body);

  var url = goodsHost + '/goods/consultGoods/addConsultGoods.htm';
  var data = req.body;
    //进行透传
  axios.post(url, data).then(function(response) {
    return res.type('json').send(response.data);
  }).catch(function(error) {
    return utils.send(res, null, error);
  })
});

/**
 * 2012-查询用户历史咨询商品
 */
router.post('/2012', function (req, res, next) {
    // console.log('body',req.body);

  var url = goodsHost + '/goods/consultGoods/findConsultGoods.htm';
  var data = req.body;
    //进行透传
  axios.post(url, data).then(function(response) {
    return res.type('json').send(response.data);
  }).catch(function(error) {
    return utils.send(res, null, error);
  })
});

/**
 * 2013-核销提货码
 */
router.post('/2013', function (req, res, next) {
    // console.log('body',req.body);

  var url = orderHost + '/blomni-o2o/oms/deliveryCode/cancellationMentionGoodsCode';
  var data = req.body;
    //进行透传
  axios.post(url, data).then(function(response) {
    return res.type('json').send(response.data);
  }).catch(function(error) {
    return utils.send(res, null, error);
  })
});

/**
 * 2014-添加（修改）备注
 */
router.post('/2014', function (req, res, next) {
    // console.log('body',req.body);

  var url = orderHost + '/blomni-o2o/oms/orderInfo/updateOrderInfo';
  var data = req.body;
    //进行透传
  axios.post(url, data).then(function(response) {
    return res.type('json').send(response.data);
  }).catch(function(error) {
    return utils.send(res, null, error);
  })
});

/**
 * 2015-查询消息中心消息列表
 */
router.post('/2015', function (req, res, next) {
    // console.log('body',req.body);

  var url = merchantHost + '/merchant/message/queryMessageGroupCenterList.htm';
  var data = req.body;
    //进行透传
  axios.post(url, data).then(function(response) {
    return res.type('json').send(response.data);
  }).catch(function(error) {
    return utils.send(res, null, error);
  })
});

/**
 * 2017-生成订单
 */
router.post('/2017', function (req, res, next) {
    // console.log('body',req.body);

  var url = orderHost + '/blomni-o2o/oms/order/generate/temporarilyActing';
  var data = req.body;
    //进行透传
  axios.post(url, data).then(function(response) {
    return res.type('json').send(response.data);
  }).catch(function(error) {
    return utils.send(res, null, error);
  })
});

/**
 * 2018-物流流水信息
 */
router.post('/2018', function (req, res, next) {
    // console.log('body',req.body);

  var url = logisticsHost + '/blomni-o2o/logistics/logisticsRecord/findRecord';
  var data = req.body;
    //进行透传
  axios.post(url, data).then(function(response) {
    return res.type('json').send(response.data);
  }).catch(function(error) {
    return utils.send(res, null, error);
  })
});

/**
 * 2016-物流下单（发货）
 */
router.post('/2016', function (req, res, next) {
    // console.log('body',req.body);

  var url = orderHost + '/blomni-o2o/oms/orderInfo/orderDelivery';
  var data = req.body;
    //进行透传
  axios.post(url, data).then(function(response) {
    return res.type('json').send(response.data);
  }).catch(function(error) {
    return utils.send(res, null, error);
  })
});
module.exports = router;
