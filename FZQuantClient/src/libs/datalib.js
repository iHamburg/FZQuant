/**
 * Created by 张怡清 on 17/4/6.
 */

/**
 * 数据相关
 *
 */

import networklib from './networklib'

export default {

  getStock(code, callback) {
    networklib.get('/datas/'+code).then(obj => {
      // console.log('get stock', obj);

      callback(null, obj.list);
    })
      .catch(err => { callback(err) });
  }
}

