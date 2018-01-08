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
  get_stock_indexes(callback) {
    networklib.get('/symbols/?index=1').then(obj => {
      // console.log('get stock', obj);
      callback(null, obj.list);
    })
      .catch(err => {
        callback(err)
      });
  },

  get_symbols_by_group_id(id, callback) {
    console.log('symbollib get', id);
    networklib.get('/symbolgroups/' + id + '/symbols').then(obj => {

      callback(null, obj.list);
    })
      .catch(err => {
        callback(err)
      });
  },

  queryDailyPrices(symbolId, callback) {
    networklib.get('/symbols/' + symbolId + '/dailyprices/').then(obj => {

      callback(null, obj.list);
    })
      .catch(err => {
        callback(err)
      });
  },

}

