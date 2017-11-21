/**
 * Created by 张怡清 on 17/4/6.
 */

/**
 * 闪购业务
 */

import networklib from './networklib'

export default {

    /**
     * 查询闪购列表
     * @param flashId 闪购id
     */
  queryList(callback) {
    networklib.get('/flashes').then(obj => {
      callback(null, obj.rows);
    })
            .catch(err => { callback(err) });
  },
    /**
     * 查询商品详情
     * @param id
     * @param callback
     */
  queryProduct(id, callback) {
    networklib.get('/productgroups/' + id).then(obj => {
      callback(null, obj);
    })
            .catch(err => { callback(err) });
  }

}

