/**
 * Created by zhangyiqing on 16/12/26.
 *
 *
 * 调用所有api
 */

var axios = require('axios');
var utils = require('.//utils');

if (utils.isSIT()) {
  var networkConfig = require('../config/network_sit');
} else if (utils.isPRE()) {
  var networkConfig = require('../config/network_pre');
} else if (utils.isPRD()){
  var networkConfig = require('../config/network_prd');
}
else { // 默认是sit
  var networkConfig = require('../config/network_sit');
}

var networklib = {

  host_cloud: networkConfig.host_cloud, //云店中台
  host_order: networkConfig.host_order,   //订单中台
  host_goods: networkConfig.host_goods,   //商品中台
  host_merchant: networkConfig.host_merchant,   //商户中台
  host_logistics: networkConfig.host_logistics,    //物流系统
  share_url: networkConfig.share_url, // C端分享落地页
  giftCouponTypeId: networkConfig.coupon_gift_typeId,  // 生成优惠券typeid

  api_post:function (url,params) {
      return new Promise(function (resolve,reject) {

          axios.post(url,params).then(obj => {
              var data = obj.data;

              if(data.resCode == '00100000'){

                  resolve(data.obj);
              }
              else{

                  var err = new Error(data.msg);
                  err.code = data.resCode;
                  reject(err);
              }
          }, err => reject);
      });
  },



};

module.exports = networklib;
