/**
 * Created by zhangyiqing on 16/10/11.
 */

var querystring = require('querystring');
var fs = require("fs");

var chars = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

console.log('process.env', process.env);
var utils = {

  SUCCESS_CODE: '00100000',
  isDEV() {
    return process.env.NODE_ENV == 'dev';
  },
  isSIT() {
    return process.env.NODE_ENV == 'sit';
  },
  isPRE() {
    return process.env.NODE_ENV == 'pre';
  },
  isPRD() {
    return process.env.NODE_ENV == 'prd';
  },

  //??? 为什么这里返回的是空白
  env() {
    console.log('process.env', process.env);
    return process.env.NODE_ENV;
  },

    /**
     * render api 的结果
     *
     * @param res
     * @param obj
     * @param err
     * @returns {*}
     */
  send: function(res, obj, err) {
    if (err) {
      // console.log(err);
      var response = {'resCode': err.code, 'msg': err.message};
    } else {
      var response = {'resCode': this.SUCCESS_CODE, 'obj': obj};
    }
        // console.log(JSON.stringify(response));

    return res.type('json').send(response);
  },

    /**
     * 把params拼到url中去
     *
     * @param url
     * @param params
     * @returns {string}
     */
  build_url_params: function (url, params) {
    if (!params) return url;

    url += '?';
    for (var name in params) {
      url += name + "=" + params[name] + "&";
    }
    return url;
  },

    /**
     * 判断对象是否是空属性
     */
  isEmptyObj: function (obj) {
        // 如果是空返回true
    if (!obj || obj === null || obj === undefined) return true;

        // 如果是数组,如果length为0,也是empty
    if (Array.isArray(obj) && obj.length == 0) return true;

        // 如果是对象,并且没有key value
    for (var key in obj) {
      return false;
    };

    return true
  },

    /**
     * 从body中获得keys的子body
     *
     * @param body
     * @param keys
     */
  getSubObj: function (body, keys) {
    var context = {};
    keys.forEach(function(value) {
      if (body[value]) {
        context[value] = body[value];
      }
    });

    if (this.isEmptyObj(context)) return null;

    return context;
  },

    /**
     * 返回随机字符串
     * @param n
     * @returns {string}
     */
  random: function(n) {
    var res = "";
    for (var i = 0; i < n; i++) {
      var id = Math.ceil(Math.random() * 35);
      res += chars[id];
    }
    return res;
  },

  processAPIErrorMiddleware: function (err, req, res, next) {
        // this.send(res,null,error);

    let resCode, response
    if (err) {
      resCode = err.code || 99999999;

      response = {'resCode': resCode, 'msg': err.message};
    } else {
      response = {'resCode': this.SUCCESS_CODE, 'obj': obj};
    }

    return res.type('json').send(response);
  },

  logSeqThen: function (data) {
    console.log(data.get({plain: true}));
  },

  logCatch: function (error) {
    console.error(error);
  }
};

module.exports = utils;
