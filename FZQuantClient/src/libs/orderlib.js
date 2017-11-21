/**
 * Created by 张怡清 on 17/4/6.
 */

/**
 * 订单相关业务
 */

import networklib from './networklib'

export default {

  /**
   * 查询订单
   *
   context.where = {userId};
   context.title = '我的订单';
   context.attributes = ['id','orderNo','orderPrice','status','createdAt'];
   context.include = [{ //
        model: mProduct,
        attributes: ['id','title','imgUrl','img_urls'],
    }];
   *
   * @param callback
   */
  queryOrders(callback) {
    networklib.get('/orders').then(obj => {
      callback(null, obj.rows);
    })
      .catch(err => { callback(err) });
  },

}

