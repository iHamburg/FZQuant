/* created by 张怡清 */

/**
 * 权限控制
 */

import networklib from './networklib';
import merchantlib from './merchantlib';
import Vue from 'vue'

// 页面访问权限表 {flag: "1", surfaceId: "5"}
let accessList = [{flag: "1", surfaceId: "5"}, {flag: "1", surfaceId: "6"}]

/**
 * 查询并更新权限表
 * @param callback
 */
let updateAccessList = function(callback) {
  let param = {}
  param.memberId = merchantlib.getMemberId();
  param.merchantId = merchantlib.getMerchantId();
  console.log('========查询权限表 param :', JSON.stringify(param));
  networklib.post('cloud1034', param).then(obj => {
    console.log('========查询权限表 obj:', JSON.stringify(obj));
    accessList = obj.list
    if (callback) {
      callback(null, obj);
    }
  }).catch(err => {
    if (callback) callback(err);
  });
}

/**
 * 根据权限表查询是否有权限
 *
 * isPermitted(“user:create”)
 *
 * @param 元素id 'cloudom:goods:reviewdeny'
 *
 * @return -1: 未知，0：没有权限， 1：有权限
 *
 */
let isPermitted = function (id) {
  // console.log('======  accesslist ', accessList);
  let a = Vue.$_.find(accessList, function (obj) {
    return obj.surfaceId == id
  })
  let flag = 0;
  // console.log('搜索结果', a.flag);
  if (a) {
    flag = Number(a.flag)
  }
  console.log('权限 id', id, 'return ', flag);
  return flag
}

export default {
  /**
   * @deprecated
   *
   * 根据uiId 和 用户权限 来判断ui控件是否能显示！
   *
   * 现在传入的UI元素 id 都是 店长才能操作的List
   * @param id
   */
  canShow(id) {
    let roleId = merchantlib.getRoleId();
    // console.log('roleId ', roleId);
    let result = false;

    // 只有店长才能操作的UI控件
    let shopManagerCanList = [
      'cloudom:goods:reviewdeny',
      'cloudom:goods:offshelf',
      'cloudom:goods:onshelf',
      'cloudom:order:close'
    ];

    // 查询的UI控件属于
    if (Vue.$_.indexOf(shopManagerCanList, id) >= 0 && roleId == '9') {
      result = true;
    }
    // console.log('can show ', id, result);
    return result
  },
  /**
   * 查询权限accesslib列表
   */
  updateAccessList,

  /**
   * 根据权限表查询是否有权限
   */
  isPermitted,
}
