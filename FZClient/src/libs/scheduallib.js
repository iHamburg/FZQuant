
/**
 * 排班相关
 */

import networklib from './networklib';
import merchantlib from './merchantlib';

export default {

  /**
   * 1035-查询排班表
   * @param beginAt 开始时间 endAt 结束时间 memberId 会员id merchantId 商户id
   */
  queryScheduals(param, callback) {
    param.merchantId = merchantlib.getMerchantId();
    param.memberId = merchantlib.getMemberId();
    console.log('1035-查询排班表 入参 :', JSON.stringify(param));
    networklib.post('1035', param).then(obj => {
      if (callback) {
        callback(null, obj.list);
      }
    }).catch(err => {
      if (callback) callback(err);
    });
  },

  /**
   * 1036-设置排班表
   * @param date 排班时间 memberId  商户人员ID memberList 排班人员Id- list merchantId   商户ID
   * @param callback
   */
  installSchedulingInfo(param, callback) {
    param.merchantId = merchantlib.getMerchantId();
    param.memberId = merchantlib.getMemberId();
    console.log('1036-设置排班表入参：', JSON.stringify(param));
    networklib.post('1036', param).then((obj) => {
      if (callback) {
        callback();
      }
    }).catch(err => {
      if (callback) callback(err);
    });
  },

  /**
   * 1037-查询商户所有店员
   * @param param
   * @param callback
   */
  queryAllsalers(callback) {
    let merchantId = merchantlib.getMerchantId();
    let memberId = merchantlib.getMemberId();
    let param = {merchantId, memberId}
    console.log('1037-查询商户所有店员 入参', JSON.stringify(param))
    networklib.post('1037', param).then((obj) => {
      if (callback) {
        callback(null, obj.clerkList);
      }
    }).catch(err => {
      if (callback) callback(err);
    });
  },

}
