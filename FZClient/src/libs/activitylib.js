/* creat by 孙传奇 */

/**
 * 活动服务
 */

import networklib from './networklib';
import merchantlib from './merchantlib';

//本地活动
let localActivity = {
  activityCover: null, // 活动封面
  title: null, // 活动标题
  type: null, // 活动类型
  activityImgList: [], // 活动图片
  activityBeginDate: '必选', // 活动开始时间
  activityEndDate: '必选', // 活动结束时间
  activityRule: '', // 活动规则
  activityContent: '', // 活动内容
  jumpType: null, // 活动跳转类型
  activityLink: null, // 活动跳转链接
  couponTemplateIdList: [], // 关联优惠券
  activityState: null, // 活动状态
};

export default {
  /**
   * 返回 LocalActivity
   * @return {[type]} [description]
   */
  getLocalActivity() {
    // console.log('getlocalActivity:', localActivity)
    return localActivity
  },

  /**
   * 更新 LocalActivity
   * @return {[type]} [description]
   */
  updateLocalActivity(activityInfo) {
    // console.log('updateLocalActivity:', localActivity)
    localActivity = activityInfo
  },

  /**
   * 清空本地活动
   * @return {[type]} [description]
   */
  clearLocalActivity() {
    localActivity = {
      activityCover: null, // 活动封面
      title: null, // 活动标题
      type: null, // 活动类型
      activityImgList: [], // 活动图片
      activityBeginDate: '必选', // 活动开始时间
      activityEndDate: '必选', // 活动结束时间
      activityRule: '', // 活动规则
      activityContent: '', // 活动内容
      jumpType: null, // 活动跳转类型
      activityLink: null, // 活动跳转链接
      couponTemplateIdList: [], // 关联优惠券
      activityState: null, // 活动状态
    };
  },

  /**

   3001-发布活动广播
   */
  releaseActivity(activityId, callback) {
    let merchantId = merchantlib.getMerchantId();
    let memberId = merchantlib.getMemberId();
    let param = {
      "activityId": activityId,
      "merchantId": merchantId,
      "memberId": memberId,
    }

    console.log('releaseActivity  param', param);
    networklib.post('3001', param).then(obj => {
      // console.log('1017 ',obj);
      if (callback) {
        callback();
      }
    }).catch(err => {
      if (callback) callback(err);
    });
  },

  /**
   * 3002-新增活动
   */
  insertActivityInfo(param, callback) {
    param.memberId = merchantlib.getMemberId();
    param.merchantId = merchantlib.getMerchantId();
    console.log('新增活动param：', JSON.stringify(param))
    networklib.post('3002', param).then(obj => {
      console.log('3002新增活动 成功', obj);
      if (callback) {
        callback(null, obj);
      }
    }).catch(err => {
      if (callback) callback(err);
    });
  },

  /**
   * 3003-更新活动状态
   */
  updateActivityState(param, callback) {
    param.memberId = merchantlib.getMemberId();
    param.merchantId = merchantlib.getMerchantId();
    console.log('更新活动状态param:', JSON.stringify(param))
    networklib.post('3003', param).then(obj => {
      if (callback) {
        console.log('3003更改活动状态 成功', obj);
        callback(null, obj);
      }
    }).catch(err => {
      if (callback) callback(err);
    });
  },

  /**
   * 3004-查询活动列表
   *  前端@Forest - 后端@许豪杰
   *
   * @param activityState 0:草稿,1:带审核,2:上线中,3:审核不通过,4:已下线,不传查询所有
   *
   * @param callback
   */
  queryActivityList(param, callback) {
    // 货号 商品Id 商户Id
    param.merchantId = merchantlib.getMerchantId();
    param.memberId = merchantlib.getMemberId();
    // console.log('入参：', queryParam);
    networklib.post('3004', param).then((obj) => {
      // console.log(' activity list ', obj);
      if (callback) {
        callback(null, obj);
      }
    }).catch(err => {
      if (callback) callback(err);
    });
  },

  /*
   * 3005-查询活动详情
   * @param  {[type]}   param    [description]
   * @param  {Function} callback [description]
   * @return {[type]}            [description]
   */
  queryActivityDetail(param, callback) {
    param.merchantId = merchantlib.getMerchantId();
    param.memberId = merchantlib.getMemberId();
    console.log('param', JSON.stringify(param))
    networklib.post('3005', param).then((obj) => {
      if (callback) {
        // console.log(obj)
        callback(null, obj);
      }
    }).catch(err => {
      if (callback) callback(err);
    });
  },

  /**
   * 3006-编辑活动
   */
  updateActivityInfo(param, callback) {
    param.memberId = merchantlib.getMemberId();
    param.merchantId = merchantlib.getMerchantId();
    console.log('编辑活动param', JSON.stringify(param))
    networklib.post('3006', param).then(obj => {
      console.log('3006编辑活动 成功', obj);
      if (callback) {
        callback(null, obj);
      }
    }).catch(err => {
      if (callback) callback(err);
    });
  },

}
