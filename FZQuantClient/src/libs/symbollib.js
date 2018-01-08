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
  queryStockIndexes(callback) {
    networklib.get('/api/stock_indexes').then(obj => {
      callback(null, obj.list);
    })
      .catch(err => {
        callback(err)
      });
  },

  // 返回指数
  queryStockIndex(id, callback) {
    networklib.get('/api/stock_indexes/' + id).then(obj => {
      callback(null, obj);
    })
      .catch(err => {
        callback(err)
      });
  },
  get_symbols_by_group_id(id, callback) {
    // console.log('symbollib get', id);
    networklib.get('/api/symbolgroups/' + id + '/symbols').then(obj => {
      callback(null, obj.list);
    })
      .catch(err => {
        callback(err)
      });
  },

  queryDailyPrices(symbolId, callback) {
    networklib.get('/api/symbols/' + symbolId + '/dailyprices/').then(obj => {

      callback(null, obj.list);
    })
      .catch(err => {
        callback(err)
      });
  },

}

