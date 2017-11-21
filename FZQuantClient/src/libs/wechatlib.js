/**
 * Created by 张怡清 on 17/4/6.
 */

/**
 * 微信相关业务
 */

import networklib from './networklib'
import wx from 'weixin-js-sdk'

export default {

  /**
   * 获取jsconfig
   * @param param
   */
  queryJsConfig(param, callback) {
    networklib.post('/wechat/jsconfig', param).then(obj => {
      callback(null, obj);
    })
      .catch(err => { callback(err) });
  },
  wx,

}

