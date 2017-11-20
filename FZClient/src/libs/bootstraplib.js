/* created by 张怡清 */
/**
 * 初始化管理
 */
console.log('======= Bootstrap初始化 ==========');

// import accesslib from './accesslib'
import jsbridgelib from './jsbridgelib'
import imagelib from './imagelib'
import utillib from './utillib'

/**
 启动添加处理
 */
window.addEventListener("AppBecomeActiveEvent", function(e) {
  console.log('=== main AppBecomeActiveEvent', e);
  //更新用户权限表
}, false);

// 初始化jsbridgelib
jsbridgelib.init(function () {
  console.log('=== main.js jsbridge init finished');

  jsbridgelib.bridgeTest({}, function () {
    console.log('=== main.js jsbridge init finished and bridgeTest');
  })

  // 处理App进入前台
  jsbridgelib.registerHandler('handleBecomeActive', () => {
    console.log(' 收到 进入前台消息');
    // 手动触发setItemEvent
    window.dispatchEvent(new Event("AppBecomeActiveEvent"));
  })

  // 处理App进入后台
  jsbridgelib.registerHandler('handleEnterBackground', () => {
    window.dispatchEvent(new Event("AppEnterBackgroundEvent"));
    console.log(' 收到 进入后台消息');
  })

  //处理jsbridge， IM被踢出
  jsbridgelib.registerHandler('handleIMKickOff', () => {
    window.dispatchEvent(new Event("IMKickOff"));
  })

  // 处理上传图片
  jsbridgelib.registerHandler('handleUploadFile', (data, callback) => {
    let base64Content = data.base64Content
    console.log('handleUploadFile--data----', data)
    imagelib.uploadGoodsImages(base64Content, 'jpeg', (err, obj) => {
      if (err) {
        if (callback) {
          return callback({errMsg: err})
        }
      }
      if (callback) callback({obj: {mediaCephUrl: obj}})
    })
  })

  jsbridgelib.bridgeGetDeviceInfo((err, obj) => {
    if (obj) {
      utillib.setAppInfo(obj);
    }
    console.log('getDeviceInfo', err, obj);
  })
})

export default {

}
