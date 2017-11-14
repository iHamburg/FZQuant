/* created by 张怡清 */

/**
 * 图片相关的功能
 */

import networklib from './networklib';
import Vue from 'vue'

export default {

  /**
   *
   * lrz-图片压缩.
   *
   * @file 页面input的文件
   * @return 图片压缩后的base64字节码
   *
   * 使用插件localResizeIMG压缩. github地址: https://github.com/think2011/localResizeIMG
   *
   */
  lrzImage(file, callback) {
    Vue.$lrz(file, { width: 800 })
      .then(function (rst) {
        // 处理成功会执行
        let imageUrlBase64 = rst.base64;
        let imageBase64 = imageUrlBase64.split(",")[1];
        if (callback) {
          callback(null, imageBase64)
        }
      })
      .catch(function (err) {
        // 处理失败会执行
        console.log('lrz 图片压缩异常 ', err);
        if (callback) {
          callback('lrz 图片压缩异常 ' + err)
        }
      })
      .always(function () {
        // 不管是成功失败，都会执行
        //console.log('lrz 不管是成功失败，都会执行 ');
      })
  },

  /**
   *
   * 1001-商品图片上传接口
   *
   * @param base64Content: 图片的base64编码
   * @param mediaType:文件类型
   * @param callback
   *
   * @return fileUrl
   *
   */
  uploadGoodsImages(base64Content, mediaType, callback) {
    let param = {
      base64Content,
      mediaType,
    }

    networklib.post('1001', param).then(obj => {
      if (callback) {
        callback(null, obj.mediaCephUrl);
        console.log('成功的回调', 1001, obj);
      }
    }).catch(err => {
      if (callback) { callback(err); }
      console.log('失败的回调', 1001, err);
    });
  },

  /**
   *
   * @param file 页面input的文件
   * @param callback fileUrl
   */
  uploadImage(file, callback) {
    this.lrzImage(file, (err, content) => {
      if (err) {
        return callback(err)
      }
      this.uploadGoodsImages(content, 'jpg', callback);
    })
  }

}
