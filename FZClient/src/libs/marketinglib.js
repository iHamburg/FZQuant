/* created by 张怡清 */

/**
 * 营销工具 相关的功能
 */

import networklib from './networklib';
import merchantlib from './merchantlib';

export default {

  /**
   * 1029-查询已发布内容列表
   *
   * @param templateId: 模板ID 1：上新，2：券
   * @param callback dynamicList
   */
  queryDynamics(templateId, callback) {
    let merchantId = merchantlib.getMerchantId();
    let param = {
      merchantId,
      templateId,
    }

    // console.log('start',param);

    networklib.post('1029', param).then(obj => {
      if (callback) {
        callback(null, obj.dynamicList);
      }
    }).catch(err => {
      if (callback) { callback(err); }
    });
  },
  /**
   * 1030 删除发布内容
   *
   * @param dynamicIdList
   * @param callback
   */
  removeDynamics(dynamicIdList, callback) {
    let merchantId = merchantlib.getMerchantId();
    let memberId = merchantlib.getMemberId();

    let param = {
      merchantId,
      memberId,
      dynamicIdList,
    }

    // console.log('start',param);

    networklib.post('1030', param).then(obj => {
      if (callback) {
        callback(null, null);
      }
    }).catch(err => {
      if (callback) { callback(err); }
    });
  },

}
