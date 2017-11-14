/* created by 张怡清 */

/**
 * 消息相关的功能
 */

import networklib from './networklib';
import merchantlib from './merchantlib';

export default {

  /**
   *
   * 2007 查询消息列表
   *
   * @param param , 分页
   * @param callback
   */
  queryNewsList(param, callback) {
    param.merchantId = merchantlib.getMerchantId()
    param.memberId = merchantlib.getMemberId()
    console.log('查询消息列表入参：', JSON.stringify(param))
    networklib.post('2007', param).then(obj => {
      if (callback) {
        callback(null, obj);
        // console.log('成功的回调', '2007-查询商户消息列表', obj);
      }
    }).catch(err => {
      if (callback) { callback(err); }
      console.log('失败的回调', '2007-查询商户消息列表', err, param);
    });
  },

  /**
   * 2008-查询未读消息数量
   * @param msgGroupId 分组ID（默认是所有组未读数量的总和）
   *        memberId 用户ID
   *        merchantId 商户ID
   */
  queryUnReadMessageCount(param, callback) {
    param.merchantId = merchantlib.getMerchantId()
    param.memberId = merchantlib.getMemberId()

    networklib.post('2008', param).then(obj => {
      // console.log('2008-查询未读消息数量', param, 'obj:', obj)
      if (callback) {
        callback(null, obj);
      }
    }).catch(err => {
      if (callback) { callback(err); }
      console.log('失败的回调', '2008-查询未读消息数量', err);
    });
  },

  /**
   * 2015-查询消息中心消息列表
   */
  queryMessageGroupCenterList(callback) {
    let param = {
      memberId: merchantlib.getMemberId()
    }
    networklib.post('2015', param).then(obj => {
      console.log('2015-查询消息中心消息列表', param, 'obj:', obj)
      if (callback) {
        callback(null, obj);
      }
    }).catch(err => {
      if (callback) { callback(err); }
      console.log('失败的回调', '2015-查询消息中心消息列表', err);
    });
  },

  /**
   * 2010-标记消息已读
   * @return {[type]} [description]
   */
  markMessageRead(param, callback) {
    param.merchantId = merchantlib.getMerchantId()
    param.memberId = merchantlib.getMemberId()
    networklib.post('2010', param).then(obj => {
      console.log('2010-标记消息已读', param, 'obj:', obj)
      if (callback) {
        callback(null, obj);
      }
    }).catch(err => {
      if (callback) { callback(err); }
      console.log('失败的回调', '2010-标记消息已读', err);
    });
  },
}
