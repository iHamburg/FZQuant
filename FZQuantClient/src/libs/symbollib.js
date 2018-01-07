/**
 * Created by 张怡清 on 17/4/6.
 */

/**
 * 股票相关
 *
 */

import networklib from './networklib'

export default {

  get_stock_indexes(callback) {
    console.log('symbollib getstock');
    networklib.get('/stock_indexes/').then(obj => {
      // console.log('get stock', obj);
      callback(null, obj.list);
    })
      .catch(err => { callback(err) });
  }
}

