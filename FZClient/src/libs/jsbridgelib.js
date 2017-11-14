/* created by 张怡清 */

console.log('========= 初始化 jsbridgelib ==========');
import merchantlib from '../libs/merchantlib'
import Vue from 'vue'

var bdg;
var count;

function isIOS() {
  return !!navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
}

function isAndroid() {
  var u = navigator.userAgent;
  return u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
}

function init(callback) {
  count = 0;
  if (isIOS()) {
    setupiOSWebViewJavascriptBridge(function(bridge) {
      // 给bdg进行赋值
      bdg = bridge;
      console.log('JSbridge 初始化结束')
      if (callback) callback()
    });
  } else {
    setupAndroidWebViewJavascriptBridge(function () {
      if (callback) callback()
    })
  }
}

/**
 * iOS 初始化bridge
 * @param callback
 * @return {*}
 */
function setupiOSWebViewJavascriptBridge(callback) {
  if (window.WebViewJavascriptBridge) {
    console.log('有 -- window.WebViewJavascriptBridge')
    return callback(window.WebViewJavascriptBridge);
  }
  // if (window.WVJBCallbacks) {
  //   console.log('有 -- window.WVJBCallbacks')
  //   return window.WVJBCallbacks.push(callback);
  // }
  console.log('创建WebViewJavascriptBridge')
  window.WVJBCallbacks = [callback];
  var WVJBIframe = document.createElement('iframe');
  WVJBIframe.style.display = 'none';
  WVJBIframe.src = 'wvjbscheme://__BRIDGE_LOADED__';
  document.documentElement.appendChild(WVJBIframe);
  setTimeout(function() {
    document.documentElement.removeChild(WVJBIframe)
    console.log('111----  ', window.WebViewJavascriptBridge)
    if (!window.WebViewJavascriptBridge && count < 3) {
      setTimeout(function() {
        if (!bdg) {
          count++;
          setupiOSWebViewJavascriptBridge(callback)
        }
      }, 1000)
    }
  }, 0)
}

/**
 * 安卓 初始化bridge
 */
function setupAndroidWebViewJavascriptBridge(callback) {
  document.addEventListener("WebViewJavascriptBridgeReady", function (event) {
    // console.log("WebViewJavascriptBridgeReady");
    var bridge = event.bridge;
    bridge.init(function (message, responseCallback) {
      if (responseCallback) {
        responseCallback("message response callback from js");
      }
    });
    // bridge.send("Hello from Js World");
    // bridge.registerHandler("showAlert", onAlert);
    // initWebView(bridge);
    bdg = bridge;
    console.log('JSbridge 初始化结束')
    if (callback) callback()
  }, false)
}

/**
 * H5 调用 APP 功能
 * @param handlerName
 * @param params
 * @param callback
 */
function callHandler(handlerName, params, callback) {
  if (!bdg) {
    if (callback) callback('不是真实设备');
    // console.log('bdg没有生成')
    return
  }

  bdg.callHandler(handlerName, params, function (response) {
    console.log(response);
    response = response || {};

    if (response.errMsg) { // 如果出错了
      console.log('errMsg', response.errMsg)
      if (callback) {
        return callback(response.errMsg);
      }
    }
    let obj = response.obj || {};

    if (callback) {
      callback(null, obj);
    }
  });
}

/**
 * APP 调用 H5 功能
 * @param handlerName
 * @param callback
 */
function registerHandler(handlerName, callback) {
  console.log('registerHander ', handlerName, bdg);
  if (bdg) {
    bdg.registerHandler(handlerName, callback);
  } else {
    console.log('register 没有 bridge');
    if (callback) callback('不是真实设备');
  }
}

export default {
  init,
  callHandler,
  registerHandler,

  bridgeTest(param, callback) {
    console.log('bridgeTest');
    callHandler('handleTest', param, callback)
  },
  /**
   * 扫描商品标签
   *
   * @param callback
   */
  bridgeScanGoodsCard(callback) {
    callHandler('handleScanGoodsCard', null, callback);
  },

  /**
   * 从本地获取多张图片
   * @param callback
   */
  bridgeGetPhotos(param, callback) {
    callHandler('handleGetPhotos', param, callback);
  },

  /**
   * 跳转到 Native 聊天室
   * @param callback
   */
  bridgePushIM(receiver, callback) {
    callHandler('handlePushChat', {receiver}, callback);
  },

  /**
   * 跳转到 Native 聊天室 家
   * @param receiver name
   * @param callback
   */
  bridgeNamePushIM(param, callback) {
    callHandler('handlePushChat', param, callback);
  },

  /**
   * IM 登录
   *
   * 如果用户没有登录则不执行
   *
   * @param callback
   */
  bridgeIMLogin(callback) {
    if (!merchantlib.getMemberId()) return;
    callHandler('handleIMLogin', {memberId: merchantlib.getMemberId(), memberToken: merchantlib.getMemberToken()}, callback);
  },

  /**
   *  H5 要求 Native pop出当前页面
   */
  bridgeNativeBack() {
    callHandler('handleNavigateBack', null, err => {
      console.log('bridge native back err', err);
    });
  },
  /**
   *  获得唯一设备号
   *
   *  @deprecated
   *  @return deviceId
   */
  // bridgeGetDeviceId(callback) {
  //   callHandler('handleGetDeviceId', null, (err, obj) => {
  //     if (err) {
  //       return callback(err)
  //     }
  //     callback(null, obj.deviceId)
  //   });
  // },
  /**
   * 发送商品列表到聊天室Ø
   * @param param {list:[]}
   * @param callback
   */
  bridgeIMSendGoods(param, callback) {
    callHandler('handleIMSendGoods', param, callback);
  },
  /**
   * 发送订单信息包到聊天室
   * @param order
   * @param callback
   */
  bridgeIMSendOrder(order, callback) {
    callHandler('handleIMSendOrder', {order}, callback);
  },
  /**
   * 202 - IM 获得聊天列表
   *
   * @param callback
   */
  bridgeIMGetConversationList(callback) {
    callHandler('handleIMGetConversationInfoList', null, callback);
  },

  /**
   * 203 - IM 获得聊天用户信息
   *
   * @param list
   * @param callback
   */
  bridgeIMGetReceiverInfoList(list, callback) {
    callHandler('handleIMGetReceiverInfoList', {list}, callback);
  },
  /**
   * 发送订单到聊天室
   *
   * @param order
   * @param callback
   */
  bridgeIMSendRemoteOrder(order, callback) {
    callHandler('handleIMSendRemoteOrder', order, callback);
  },

  /**
   * 跳转链接
   * Native用原生浏览器打开url链接
   */
  bridgeOpenUrl(url, callback) {
    callHandler('handleOpenUrl', {url}, callback);
  },

  /**
   * 用户退出登录
   *
   */
  bridgeLogout(callback) {
    callHandler('handleLogout', null, callback);
  },

  /**
   * 发送售后单到聊天室
   */
  bridgeIMSendAftersale(aftersale, callback) {
    console.log('bridgeIMSendAftersale')
    callHandler('handleIMSendAftersale', aftersale, callback);
  },

  /**
   * TODO:
   * 如果当前页面有 from=device, 调用native的back，否则正常router的go(-1)
   */
  bridgeGoBack() {
    console.log('bridge go back');
    if (this.$route.query.from == 'device') {
      console.log(' from device');
      this.bridgeNativeBack();
    } else {
      Vue.$router.go(-1);
    }
  },

  /**
   * 查询IM未读消息总数
   */
  bridgeIMQueryUnreadCount(callback) {
    callHandler('handleIMUnreadCount', null, callback)
  },

  /**
   * 查询设备基本信息
   * @param callback
   */
  bridgeGetDeviceInfo(callback) {
    callHandler('handleGetDeviceInfo', null, callback)
  }
}
