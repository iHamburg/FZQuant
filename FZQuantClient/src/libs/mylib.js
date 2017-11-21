/**
 * Created by 张怡清 on 17/4/6.
 */

/**
 * 我相关业务
 *
 *
 */

import networklib from './networklib'

// 收货地址
let receiverInfo = {
  receicerName: '张二请'
}

export default {

    /**
     * 发联系email
     * @param callback {err}
     */
  contact(param, callback) {
    networklib.post('/my/contact', param).then(obj => {
      callback();
    })
            .catch(err => { callback(err) });
  },

  getMemberId() {
    return '123456';
  },

  getMemberAddress() {
    return null;
  },

  getReceiverInfo() {
    return receiverInfo;
  },
}

