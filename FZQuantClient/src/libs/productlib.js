/**
 * Created by 张怡清 on 17/4/6.
 */

/**
 * 商品业务
 */

import networklib from './networklib'

export default {

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
  }
}

