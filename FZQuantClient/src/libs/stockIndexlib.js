/**
 * Created by 张怡清 on 17/4/6.
 */

/**
 * 股票相关
 *
 */

import networklib from './networklib'

export default {

  // 返回所有股票指数列表
  queryList( callback) {
    networklib.get('/api/stock_indexes').then(obj => {
      callback(null, obj.list);
    })
      .catch(err => {
        callback(err)
      });
  },

  // 返回指数
  query(id, callback) {
    networklib.get('/api/stock_indexes/' + id).then(obj => {
      callback(null, obj);
    })
      .catch(err => {
        callback(err)
      });
  },
}

