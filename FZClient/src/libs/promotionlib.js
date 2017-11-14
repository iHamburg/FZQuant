/* created by 张怡清 */

/**
 * 促销相关的功能
 */

import networklib from './networklib';
import merchantlib from './merchantlib';

export default {
  /**
   * 5001-创建商品促销活动
   */
  createPromotion(param, callback) {
    param.memberId = merchantlib.getMemberId();
    param.merchantId = merchantlib.getMerchantId();
    console.log('5001 param:', JSON.stringify(param))
    networklib.post('5001', param).then(obj => {
      if (callback) {
        callback(null, obj);
      }
    }).catch(err => {
      if (callback) { callback(err); }
    });
  },

  /**
   * 5002-增减商户促销活动黑名单
   * goodsList 商品id的数组
   * type 0：增、1：删
   */
  updatePromotionBlacklist(param, callback) {
    param.memberId = merchantlib.getMemberId();
    param.merchantId = merchantlib.getMerchantId();

    networklib.post('5002', param).then(obj => {
      if (callback) {
        callback();
      }
    }).catch(err => {
      if (callback) { callback(err); }
    });
  },

  /**
   * 5003-按分类查询可添加黑名单商品列表
   * typeList   分类idlist
   */
  queryGoodsListForBlacklist(param, callback) {
    param.memberId = merchantlib.getMemberId();
    param.merchantId = merchantlib.getMerchantId();

    networklib.post('5003', param).then(obj => {
      if (callback) {
        callback(null, obj.goodsList);
      }
    }).catch(err => {
      if (callback) { callback(err); }
    });
  },

  /**
   * 5004-更新促销活动状态
   * activityId   活动id
   * status  活动状态(0:待审核 1:审核通过 2:已过期 3:审核不通过)
   */
  updatePromotionStatus(param, callback) {
    param.memberId = merchantlib.getMemberId();
    param.merchantId = merchantlib.getMerchantId();
    console.log('5004 param:', JSON.stringify(param))
    networklib.post('5004', param).then(obj => {
      if (callback) {
        callback(null, obj);
      }
    }).catch(err => {
      if (callback) { callback(err); }
    });
  },

  /**
   * 5005-更新商品促销活动
   */
  updatePromotionInfo(param, callback) {
    param.memberId = merchantlib.getMemberId();
    param.merchantId = merchantlib.getMerchantId();

    networklib.post('5005', param).then(obj => {
      if (callback) {
        callback(null, obj);
      }
    }).catch(err => {
      if (callback) { callback(err); }
    });
  },

  /**
   * 5006-查询促销活动商品列表
   *
   * promotionId  促销活动id
   */
  queryPromotionGoodsList(param, callback) {
    param.memberId = merchantlib.getMemberId();
    param.merchantId = merchantlib.getMerchantId();
    console.log('5006-查询促销活动商品列表 param:\n', JSON.stringify(param))
    networklib.post('5006', param).then(obj => {
      if (callback) {
        callback(null, obj);
      }
    }).catch(err => {
      if (callback) { callback(err); }
    });
  },

  /**
   * 5007-查询商品促销活动详情
   * promotionId    促销活动id
   */
  queryPromotionDetail(param, callback) {
    param.memberId = merchantlib.getMemberId();
    param.merchantId = merchantlib.getMerchantId();
    console.log('5007 param:', JSON.stringify(param))
    networklib.post('5007', param).then(obj => {
      if (callback) {
        callback(null, obj);
      }
    }).catch(err => {
      if (callback) { callback(err); }
    });
  },

  /**
   * 5008-查询商品分类列表（json树）
   */
  queryGoodsTypeList(callback) {
    let param = {memberId: merchantlib.getMemberId(), merchantId: merchantlib.getMerchantId()};
    console.log('queryGoodsTypeList Param---' + JSON.stringify(param));
    networklib.post('5008', param).then(obj => {
      if (callback) {
        callback(null, obj);
      }
    }).catch(err => {
      if (callback) { callback(err); }
    });
  },

  /**
   * 5009-查询商户特殊有效促销方式活动列表
   */
  querySpecialPromotionByMerchant(callback) {
    let param = {};
    param.memberId = merchantlib.getMemberId();
    param.merchantId = merchantlib.getMerchantId();

    networklib.post('5009', param).then(obj => {
      if (callback) {
        callback(null, obj);
      }
    }).catch(err => {
      if (callback) { callback(err); }
    });
  },

  /**
   * 5010-查询商户促销活动列表
   * status: {0:待审核 1:进行中 2:已过期 3:审核不通过 4:待进行 all:全部}
   */
  queryPromotionList(param, callback) {
    param.memberId = merchantlib.getMemberId();
    param.merchantId = merchantlib.getMerchantId();

    // console.log('5010 param', JSON.stringify(param));
    networklib.post('5010', param).then(obj => {
      if (callback) {
        callback(null, obj);
      }
    }).catch(err => {
      if (callback) { callback(err); }
    });
  },

  /**
   * 5011-查询商户促销活动黑名单列表
   */
  queryPromotionBlacklist(param, callback) {
    param.memberId = merchantlib.getMemberId();
    param.merchantId = merchantlib.getMerchantId();

    networklib.post('5011', param).then(obj => {
      if (callback) {
        callback(null, obj);
      }
    }).catch(err => {
      if (callback) { callback(err); }
    });
  },

  /**
   * 5012-查询所有活动可绑定商品列表
   */
  queryAllCanBindlist(param, callback) {
    param.memberId = merchantlib.getMemberId();
    param.merchantId = merchantlib.getMerchantId();
    console.log('queryAllCanBindlist- param - ', JSON.stringify(param))
    networklib.post('5012', param).then(obj => {
      if (callback) {
        callback(null, obj);
      }
    }).catch(err => {
      if (callback) { callback(err); }
    });
  },

  /**
   * 5013-根据上传的2商品列表，返回带促销信息的商品列表
   */
  queryPromotionGoods(param, callback) {
    // console.log('原始商品List：', param.goodsList)
    /*for (var i = param.goodsList.length - 1; i >= 0; i--) {
      console.log(JSON.stringify(param.goodsList[i]))
    }*/
    param.memberId = merchantlib.getMemberId();
    param.merchantId = merchantlib.getMerchantId();
    console.log('5013 queryPromotionGoods param============:\n', JSON.stringify(param))
    networklib.post('5013', param).then(obj => {
      if (callback) {
        callback(null, obj);
      }
    }).catch(err => {
      if (callback) { callback(err); }
    });
  },

  /**
   * 5014-添加已绑定参活商品
   */
  addBoundActivitiedGoods(param, callback) {
    param.memberId = merchantlib.getMemberId();
    param.merchantId = merchantlib.getMerchantId();
    console.log('addBoundActivitiedGoods -', JSON.stringify(param));
    networklib.post('5014', param).then(obj => {
      if (callback) {
        callback(null, obj);
      }
    }).catch(err => {
      if (callback) { callback(err); }
    });
  },

  /**
   * 5015-移除商户促销活动已绑定商品
   */
  removeboundpromotionGoods(param, callback) {
    param.memberId = merchantlib.getMemberId();
    param.merchantId = merchantlib.getMerchantId();
    console.log('removeboundpromotionGoods- ', JSON.stringify(param));
    networklib.post('5015', param).then(obj => {
      if (callback) {
        callback(null, obj);
      }
    }).catch(err => {
      if (callback) { callback(err); }
    });
  },

}
