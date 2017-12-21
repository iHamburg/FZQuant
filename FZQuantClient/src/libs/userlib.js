/**
 * Created by 张怡清 on 17/4/6.
 */

/**
 * 用户业务
 */

import networklib from './networklib'
import utillib from './utillib'

let userInfo = utillib.storageGet('userInfo')

export default {

  userInfo: userInfo,
    /**
     * 查询商品组商品列表
     * @param callback
     */
  queryProductsWithGroup(groupId, callback) {
    networklib.get('/products/group/' + groupId).then(obj => {
      callback(null, obj.rows);
    })
            .catch(err => { callback(err) });
  },

    /**
     * 查询商品
     * @param id
     * @param callback
     */
  queryProduct(id, callback) {
    networklib.get('/products/' + id).then(obj => {
      callback(null, obj);
    })
            .catch(err => { callback(err) });
  },

  isLogin() {
    // console.log('islogin ' + utillib.storageGet('userInfo'));
    return utillib.storageGet('userInfo')
  },

  /**
   * 用户登录
   * @param username
   * @param password, 明文
   *
   * @return
   * id
   * username
   */
  login(username, password, callback) {
    networklib.get('/users/login?username=' + username + '&password=' + password).then(obj => {
      // 存储登录状态
      userInfo = obj
      utillib.storageSet('userInfo', obj)
      callback(null, obj)
    })
      .catch(err => callback(err))
  }
}

