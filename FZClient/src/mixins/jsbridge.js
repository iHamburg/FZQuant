import merchantlib from '../libs/merchantlib'

console.log('========= init jsbridge mixin===========');

function isIOS() {
  return !!navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
}

function isAndroid() {
  var u = navigator.userAgent;
  return u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
}

function onAlert(data) {
  console.log("showAlert: " + data);
}

// function onTestHandler(data, callback) {
//   console.log("testHandler " + data);
//   if (callback) callback('callback from H5');
// }

/**
 * iOS 初始化bridge
 * @param callback
 * @return {*}
 */
function setupWebViewJavascriptBridge(callback) {
  if (window.WebViewJavascriptBridge) { return callback(window.WebViewJavascriptBridge); }
  if (window.WVJBCallbacks) { return window.WVJBCallbacks.push(callback); }
  window.WVJBCallbacks = [callback];
  var WVJBIframe = document.createElement('iframe');
  WVJBIframe.style.display = 'none';
  WVJBIframe.src = 'wvjbscheme://__BRIDGE_LOADED__';
  document.documentElement.appendChild(WVJBIframe);
  setTimeout(function() { document.documentElement.removeChild(WVJBIframe) }, 0)
}

function initWebView(bridge) {
  bridge.callHandler('initWebView', {}, function responseCallback(responseData) {
    var path = responseData.path;
    var params = responseData.params;
    initView(path, params, bridge);
  });
}

function initView(path, params, bridge) {
  console.log("initView: %s, %o", path, params);
  setScanHandler(bridge);
}

/**
 * scanCoupon的组件，点击之后
 * @param bridge
 */
function setScanHandler(bridge) {
  document.getElementById('scanCoupon').onclick = function (e) {
    console.log('#scanCoupon is clicked');
    bridge.callHandler('handleScan', null, function (response) {
      window.$("#cuponCodeInput").val(response.qrCode);
    });
  }
}

var bdg = null;

export default {
  methods: {
    /**
     * H5 调用native功能
     * 封装了jsbridge接口的返回值
     *
     * @param handlerName
     * @param params
     * @param Fcn callback {err, obj}
     * err: browser 代表是浏览器
     */
    callHandler(handlerName, params, callback) {
      if (!bdg) {
        if (callback) {
          callback('不是真实设备');
        }
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
    },

    /**
     * Navtive 调用 H5 功能
     * @param handlerName
     * @param callback
     */
    registerHandler(handlerName, callback) {
      if (bdg) {
        bdg.registerHandler(handlerName, callback);
      }
    },

    /**
     * 扫描商品标签
     *
     * @param callback
     */
    // bridgeScanGoodsCard(callback) {
    //   this.callHandler('handleScanGoodsCard', null, callback);
    // },

    /**
     * 从本地获取多张图片
     * @param callback
     */
    // bridgeGetPhotos(param, callback) {
    //   this.callHandler('handleGetPhotos', param, callback);
    // },

    /**
     * 跳转到 Native 聊天室
     * @param callback
     */
    // bridgePushIM(receiver, callback) {
    //   this.callHandler('handlePushChat', {receiver}, callback);
    // },

    /**
     * 跳转到 Native 聊天室 家
     * @param receiver name
     * @param callback
     */
    // bridgeNamePushIM(param, callback) {
    //   this.callHandler('handlePushChat', param, callback);
    // },

    /**
     * IM 登录
     * @param callback
     */
    // bridgeIMLogin(callback) {
    //   this.callHandler('handleIMLogin', {memberId: merchantlib.getMemberId(), memberToken: merchantlib.getMemberToken()}, callback);
    // },
    //
    // /**
    //  *  H5 要求 Native pop出当前页面
    //  */
    // bridgeNativeBack() {
    //   this.callHandler('handleNavigateBack', null, err => {
    //     console.log('bridge native back err', err);
    //   });
    // },
    /**
     *  获得唯一设备号
     *
     *  @return deviceId
     */
    // bridgeGetDeviceId(callback) {
    //   this.callHandler('handleGetDeviceId', null, (err, obj) => {
    //     if (err) {
    //       return callback(err)
    //     }
    //     callback(null, obj.deviceId)
    //   });
    // },
    /**
     * 发送商品列表到聊天室
     * @param param {list:[]}
     * @param callback
     */
    // bridgeIMSendGoods(param, callback) {
    //   this.callHandler('handleIMSendGoods', param, callback);
    // },
    /**
     * 发送订单信息包到聊天室
     * @param order
     * @param callback
     */
    // bridgeIMSendOrder(order, callback) {
    //   this.callHandler('handleIMSendOrder', {order}, callback);
    // },
    /**
     * 202 - IM 获得聊天列表
     *
     * @param callback
     */
    // bridgeIMGetConversationList(callback) {
    //   this.callHandler('handleIMGetConversationInfoList', null, callback);
    // },

    /**
     * 203 - IM 获得聊天用户信息
     *
     * @param list
     * @param callback
     */
    // bridgeIMGetReceiverInfoList(list, callback) {
    //   this.callHandler('handleIMGetReceiverInfoList', {list}, callback);
    // },
    /**
     * 发送订单到聊天室
     *
     * @param order
     * @param callback
     */
    // bridgeIMSendRemoteOrder(order, callback) {
    //   this.callHandler('handleIMSendRemoteOrder', order, callback);
    // },

    /**
     * 跳转链接
     * Native用原生浏览器打开url链接
     */
    // bridgeOpenUrl(url, callback) {
    //   this.callHandler('handleOpenUrl', {url}, callback);
    // },

    /**
     * 用户退出登录
     *
     */
    // bridgeLogout(callback) {
    //   this.callHandler('handleLogout', null, callback);
    // },

    /**
     * 发送售后单到聊天室
     */
    // bridgeIMSendAftersale(aftersale, callback) {
    //   console.log('bridgeIMSendAftersale')
    //   this.callHandler('handleIMSendAftersale', aftersale, callback);
    // },

    /**
     * 如果当前页面有 from=device, 调用native的back，否则正常router的go(-1)
     */
    // bridgeGoBack() {
    //   if (this.$route.query.from == 'device') {
    //     console.log(' from device');
    //     this.bridgeNativeBack();
    //   } else {
    //     this.$router.go(-1);
    //   }
    // },

    /**
     * 查询IM未读消息总数
     */
    // bridgeIMQueryUnreadCount(callback) {
    //   this.callHandler('handleIMUnreadCount', null, callback)
    // },

    /**
     * 查询设备基本信息
     * @param callback
     */
    // bridgeGetDeviceInfo(callback) {
    //   this.callHandler('handleGetDeviceInfo', null, callback)
    // }
  },

  created: function () {
    // console.log('JSbridgecreated 初始化开始')
    if (isIOS()) {
      setupWebViewJavascriptBridge(function(bridge) {
        /* Initialize your app here */
        // 给bdg进行赋值
        bdg = bridge;
        console.log('JSbridge 初始化结束')
      });
    } else if (isAndroid()) {
      document.addEventListener("WebViewJavascriptBridgeReady", function (event) {
        // console.log("WebViewJavascriptBridgeReady");
        var bridge = event.bridge;
        bridge.init(function (message, responseCallback) {
          if (responseCallback) {
            responseCallback("message response callback from js");
          }
        });
        bridge.send("Hello from Js World");
        bridge.registerHandler("showAlert", onAlert);
        initWebView(bridge);

        bdg = bridge;
      }, false);

      // if (window.WebViewJavascriptBridge) {
      //   console.log(' window has WebViewJavascriptBridge');
      //   var bridge = window.WebViewJavascriptBridge;
      //   console.log('bridge ', JSON.stringify(bridge));
      //   bridge.init(function (message, responseCallback) {
      //     if (responseCallback) {
      //       responseCallback("message response callback from js");
      //     }
      //   });
      //   bridge.send("Hello from Js World");
      //   bridge.registerHandler("showAlert", onAlert);
      //   initWebView(bridge);
      //
      //   bdg = bridge;
      // } else {
      //   document.addEventListener("WebViewJavascriptBridgeReady", function (event) {
      //     // console.log("WebViewJavascriptBridgeReady");
      //     var bridge = event.bridge;
      //     bridge.init(function (message, responseCallback) {
      //       if (responseCallback) {
      //         responseCallback("message response callback from js");
      //       }
      //     });
      //     bridge.send("Hello from Js World");
      //     bridge.registerHandler("showAlert", onAlert);
      //     initWebView(bridge);
      //
      //     bdg = bridge;
      //   }, false);
      // }
    }
  },
};
