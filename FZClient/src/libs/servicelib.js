/**
 * 获取配置
 */

import networklib from './networklib';
import utillib from './utillib';

export default {

  /**
   * 获取C端分享落地页
   * @param  {[type]}   id       [description]
   * @param  {Function} callback [description]
   * @return {[type]}            [description]
   */
  getShareUrl(activityId, callback) {
    // console.log('获取C端分享落地页', id)
    let param = {activityId}
    // console.log(param)
    networklib.post('shareUrl', param).then(obj => {
      // console.log('获取C端分享落地页', param, obj)
      if (callback) {
        callback(null, obj);
      }
    }).catch(err => {
      if (callback) callback(err);
    });
  },

  /**
   * 获取 百联会员注册协议
   */
  getAgreementUrl(callback) {
    let agreementUrl = ''
    if (utillib.isSIT()) {
      agreementUrl = 'http://120.136.161.164:9000/page/reg';
    }
    if (utillib.isPRE()) {
      agreementUrl = 'http://cloudwebapp.bl.com/page/reg';
    }
    if (utillib.isPRD()) {
      agreementUrl = 'http://cloudwebapp.bl.com/page/reg';
    }
    callback({agreementUrl})
  },
}

