/* created by 张怡清 */
/**
 * 商户服务
 *
 */

window.addEventListener("updateUnReadChartCount", function(e) {
  console.log('=== merchantlib 更新unReadChartCount1', e);
}, false);

let localStorage = window.localStorage;

/**
 * userInfo
 * @type {[type]}
 */
let userInfo = localStorage.getItem('userInfo')
if (/^\{.*\}$/.test(userInfo)) {
  userInfo = JSON.parse(userInfo)
}
if (!userInfo) userInfo = {};

/**
 * merchantInfo
 * @type {[type]}
 */
let merchantInfo = localStorage.getItem('merchantInfo')
if (/^\{.*\}$/.test(merchantInfo)) {
  merchantInfo = JSON.parse(merchantInfo)
}
if (!merchantInfo) merchantInfo = {};

import networklib from './networklib';
import utils from 'src/utils';
import utillib from './utillib'
import Vue from 'vue';

export default {
  // 云店提供的登陆接口
  merchantInfo: merchantInfo, // 全部属性
  userInfo: userInfo,

  commercialCode: merchantInfo.commercialCode, //业态编码 2010
  commercialName: merchantInfo.commercialName,       //业态名称
  merchantId: merchantInfo.merchantId,        //商户id
  merchantName: merchantInfo.merchantName,    //商户名称
  storeCode: merchantInfo.storeCode,          //门店编码  000141
  storeName: merchantInfo.storeName, //门店名称
  storeId: merchantInfo.storeId, // 门店id   e33a1f5e54fe4046919b00e8a205dcbf

  avatar: userInfo.avatar, // 头像
  jobNumber: userInfo.jobNumber, // 工号
  memberId: userInfo.memberId, // 会员Id
  name: userInfo.name, // 用户名
  roleId: userInfo.roleId, // 角色id
  roleName: userInfo.roleName, // 角色名称
  token: userInfo.token, // 会员token

  /**
   * 注册
   */
  signup(mobile, smsCode, password, deviceNumber, callback) {
    let params = { mobile, smsCode, password, deviceNumber };
    console.log('signup params:', JSON.stringify(params))
    networklib.post('1054', params).then(obj => {
      callback(null, obj)
    }).catch(err => {
      callback(err)
    })
  },

  /**
   * 登录
   *
   * @param mobile
   * @param pwd
   * @param callback
   *
   */
  login(mobile, password, deviceNumber, callback) {
    let param = {
      mobile: mobile,
      password: password,
      deviceNumber: deviceNumber
    }
    console.log('login param', JSON.stringify(param))
    networklib.post('1021', param).then(obj => {
      console.log('1021 登陆接口 返参obj：\n', JSON.stringify(obj))
      // 人员信息
      let userInfoVal = {
        avatar: obj.avatar, //头像， 需要更新
        jobNumber: obj.jobNumber,
        memberId: obj.memberId,
        name: obj.name,
        roleId: obj.roleId,
        roleName: obj.roleName,
        token: obj.token
      }
      // console.log('userInfoVal', userInfoVal)
      this.updateLocalUserInfo(userInfoVal)

      // 店铺信息
      let merchantInfoVal = {
        commercialCode: obj.commercialCode, //业态编码 2010
        commercialName: obj.commercialName,       //业态名称
        merchantId: obj.merchantId,        //商户id
        merchantName: obj.merchantName,    //商户名称
        storeCode: obj.storeCode,          //门店编码  000141
        storeName: obj.storeName, //门店名称
        storeId: obj.storeId, // 门店id   e33a1f5e54fe4046919b00e8a205dcbf
        logoUrl: obj.logoUrl,        // 商户logo
        pickupAddress: obj.pickupAddress,        // 提货地址
        returnAddress: obj.returnAddress, // 退货地址
        mercPhone: obj.mercPhone, // 商户电话
      }
      // console.log('merchantInfoVal', merchantInfoVal)
      this.updateLocalMerchantInfo(merchantInfoVal)
      callback(null, obj)
    }).catch(err => {
      // console.log('失败的回调 login', err);
      callback(err)
    })
  },

  /**
   * 验证码快速登陆
   */
  quickLogin(mobile, smsCode, deviceNumber, callback) {
    let params = {mobile, smsCode, deviceNumber};
    console.log('quickLogin params:\n', JSON.stringify(params))
    networklib.post('1055', params).then(obj => {
      console.log('1055 验证码快速登陆 result obj：\n', JSON.stringify(obj))
      // 人员信息
      let userInfoVal = {
        avatar: obj.avatar, //头像
        jobNumber: obj.jobNumber,
        memberId: obj.memberId,
        name: obj.name,
        roleId: obj.roleId,
        roleName: obj.roleName,
        token: obj.token
      }
      // console.log('userInfoVal', userInfoVal)
      this.updateLocalUserInfo(userInfoVal)

      // 店铺信息
      let merchantInfoVal = {
        commercialCode: obj.commercialCode, //业态编码 2010
        commercialName: obj.commercialName,       //业态名称
        merchantId: obj.merchantId,        //商户id
        merchantName: obj.merchantName,    //商户名称
        storeCode: obj.storeCode,          //门店编码  000141
        storeName: obj.storeName, //门店名称
        storeId: obj.storeId, // 门店id   e33a1f5e54fe4046919b00e8a205dcbf
        logoUrl: obj.logoUrl,        // 商户logo
        pickupAddress: obj.pickupAddress,        // 提货地址
        returnAddress: obj.returnAddress, // 退货地址
        mercPhone: obj.mercPhone, // 商户电话
      }
      // console.log('merchantInfoVal', merchantInfoVal)
      this.updateLocalMerchantInfo(merchantInfoVal)
      if (callback) callback(null, obj)
    }).catch(err => {
      if (callback) callback(err)
    })
  },

  /**
   * 获取验证码 For quick login
   */
  getCodeForQuickLogin(mobile, callback) {
    let params = {mobile};
    networklib.post('1056', params).then(obj => {
      if (callback) callback(null, obj)
    }).catch(err => {
      if (callback) callback(err)
    })
  },

  /**
   * 获取验证码 For sign up
   */
  getCodeForSignup(mobile, callback) {
    let params = {mobile};
    networklib.post('1057', params).then(obj => {
      if (callback) callback(null, obj)
    }).catch(err => {
      if (callback) callback(err)
    })
  },

  /**
   * 获取验证码 For forgetPassword
   */
  getCodeForForgetPassword(mobile, callback) {
    let params = {mobile};
    networklib.post('1048', params).then(obj => {
      if (callback) callback(null, obj)
    }).catch(err => {
      if (callback) callback(err)
    })
  },

  /**
   * 修改密码
   */
  updatePassword(mobile, validateCode, password, callback) {
    let params = {mobile, validateCode, password};
    console.log('updatePassword params:', JSON.stringify(params))
    networklib.post('1049', params).then(obj => {
      if (callback) callback(null, obj)
    }).catch(err => {
      if (callback) callback(err)
    })
  },

  // 重载商户信息
  reloadMerchant() {
    // console.log('重载商户信息')
    let userInfoVal = localStorage.getItem('userInfo');
    if (/^\{.*\}$/.test(userInfoVal)) {
      userInfo = JSON.parse(userInfoVal);
      // console.log('reloadMerchant userInfo', this.userInfo)
    }

    let merchantInfoVal = localStorage.getItem('merchantInfo');
    if (/^\{.*\}$/.test(merchantInfoVal)) {
      merchantInfo = JSON.parse(merchantInfoVal);
      // console.log('reloadMerchant merchantInfo', this.merchantInfo)
    }
  },

  /**
   * 更新用户信息
   * @return {[type]} [description]
   */
  updateLocalUserInfo(obj) {
    Vue.$_.each(obj, (value, key) => {
      // console.log(value, key)
      userInfo[key] = value
    })
    utils.storageSet('userInfo', userInfo);

    this.reloadMerchant();
  },

  /**
   * 更新商户信息
   * @return {[type]} [description]
   */
  updateLocalMerchantInfo(obj) {
    Vue.$_.each(obj, (value, key) => {
      // console.log(value, key)
      merchantInfo[key] = value
    })
    // console.log('updateLocalMerchantInfo2', merchantInfo)
    utils.storageSet('merchantInfo', merchantInfo);

    this.reloadMerchant();
  },

  // 用户登出
  logout() {
    console.log('用户登出');
    let loginName = utillib.storageGet('loginName');
    localStorage.clear();
    utillib.storageSet('loginName', loginName);
  },
  /**
   * @return boolean
   */
  isLogin() {
    // console.log('======isLogin', merchantInfo.merchantId)
    if (merchantInfo.merchantId) {
      return true;
    } else {
      return false;
    }
  },

  /**
   * 1022 修改商户设置
   * 0:修改品牌 1:修改提货地址 2:修改退货地址，3：修改购买提示 默认0
   */
  updateMerchantInfo(param, callback) {
    param.memberId = userInfo.memberId;
    param.merchantId = merchantInfo.merchantId;
    console.log('1022 修改商户设置 param:', JSON.stringify(param))
    networklib.post('1022', param).then(obj => {
      // console.log('==查询商户设置 ', obj);
      if (callback) {
        callback(null, obj);
      }
    }).catch(err => {
      console.log('失败的回调', 1022, err);
      if (callback) { callback(err); }
    });
  },

  /**
   * 1023-查询商户设置
   * @return {[type]} [description]
   */
  queryMerchantInfoSite(callback) {
    let param = {
      merchantId: merchantInfo.merchantId
    }
    console.log('1023-查询商户设置 param:\n', JSON.stringify(param))
    networklib.post('1023', param).then(obj => {
      // console.log('==查询商户设置 ', obj);
      if (callback) {
        callback(null, obj);
      }
    }).catch(err => {
      if (callback) { callback(err); }
      console.log('失败的回调', 1023, err);
    });
  },
  /**
   * queryBrandList 1024-查询品牌目录列表
   * @param  {Function} callback [description]
   * @return {[type]}            [description]
   */
  queryBrandList(callback) {
    let param = {
      merchantId: merchantInfo.merchantId
    }
    console.log('商户id:', param)
    networklib.post('1024', param).then(obj => {
      console.log('==查询品牌列表 ', obj);
      if (callback) {
        callback(null, obj);
      }
    }).catch(err => {
      if (callback) { callback(err); }
      console.log('失败的回调', 1024, err);
    });
  },

  /**
   * 1032-上传LOGO或上传头像.
   *
   * @param url  图像绝对路径
   * @param type 1：用户 2：商户
   * @param callback
   *
   * 更新商户信息
   */
  updateMemberAvatar(url, type, callback) {
    let merchantId = merchantInfo.merchantId;
    let memberId = userInfo.memberId; //merchantInfo.memberId;

    let param = {
      merchantId,
      memberId,
      url,
      type,
    }

    networklib.post('1032', param).then(obj => {
      if (callback) {
        callback(null, null);
        console.log('成功的回调', 1032, obj);
      }
    }).catch(err => {
      if (callback) { callback(err); }
      console.log('失败的回调', 1032, err);
    });
  },

  /**
   * 1033-商户首页新增入口提示.
   *
   * @param memberId  操作人Id
   * @param merchantId 商户Id
   * @param callback
   *
   * 更新商户信息
   */
  findPendingPrompt(callback) {
    let merchantId = merchantInfo.merchantId;
    let memberId = userInfo.memberId; //merchantInfo.memberId;

    let param = {
      merchantId,
      memberId,
    }

    networklib.post('1033', param).then(obj => {
      if (callback) {
        callback(null, obj);
        // console.log('成功的回调', 1033, obj);
      }
    }).catch(err => {
      if (callback) { callback(err); }
      // console.log('失败的回调', 1033, err);
    });
  },
  /**
   * 1038-查询当前登录用户是否当班.
   *
   * @param memberId  操作人Id
   * @param merchantId 商户Id
   * @param callback
   *
   * 更新商户信息
   */
  findIsonDuty(callback) {
    let merchantId = merchantInfo.merchantId;
    let memberId = userInfo.memberId; //merchantInfo.memberId;

    let param = {
      merchantId,
      memberId,
    }

    networklib.post('1038', param).then(obj => {
      if (callback) {
        callback(null, obj);
        console.log('成功的回调', 1038, obj);
      }
    }).catch(err => {
      if (callback) { callback(err); }
      console.log('失败的回调', 1038, err);
    });
  },

  /**
   * 1035-查询商户停车券权限
   */
  isSuportSaleTikect(callback) {
    let params = {
      merchantId: merchantInfo.merchantId,
      parkCode: merchantInfo.storeCode
      // parkCode: '001233'
    }
    console.log('1035-查询商户停车券权限 params:\n', JSON.stringify(params))
    networklib.post('cloud1035', params).then(obj => {
      if (callback) {
        // console.log('成功的回调', obj);
        callback(null, obj);
      }
    }).catch(err => {
      // console.log('失败的回调', err);
      if (callback) callback(err);
    });
  },

  // ========获取属性=========
  //  测试停车券死数据
  getParkingMerchantId() { // 商户
    return this.getMerchantId();
    //return 'cd2fae39c2214abbac835299dbd3bc8a';
  },
  getParkingCommercialCode() { // 业态id
    return this.getCommercialCode();
    //return '1020';
  },
  getParkingStoreCode() { //门店id
    return this.getStoreCode();
    //return '001012';
  },
  /**
   * 获取接口返回的对象
   * @return {[type]} [description]
   */
  getMerchantInfo () {
    return merchantInfo;
  },

  getUserInfo () {
    return userInfo;
  },

  /**
   * 获取商户ID
   * @return {[type]} [description]
   */
  getMerchantId () {
    return merchantInfo.merchantId;
  },

  /**
   * 获取商户名称
   * @return {[type]} [description]
   */
  getMerchantName () {
    return merchantInfo.merchantName;
  },

  /**
   * 获取员工用户名
   * @return {[type]} [description]
   */
  getName () {
    return userInfo.name;
  },

  /**
   * 获取角色Id
   8: 店员， 9：店长
   */
  getRoleId () {
    return userInfo.roleId;
  },

  /**
   * 获取角色名称
   * @return {[type]} [description]
   */
  getRoleName () {
    return userInfo.roleName;
  },

  /**
   * 获取业态编码
   * @return {[type]} [description]
   */
  getCommercialCode () {
    return merchantInfo.commercialCode;
  },

  /**
   * 获取业态名称
   * @return {[type]} [description]
   */
  getCommercialName () {
    return merchantInfo.commercialName;
  },

  /**
   * 获取门店Id
   * @return {[type]} [description]
   */
  getStoreId () {
    return merchantInfo.storeId;
  },

  /**
   * 获取门店名称
   * @return {[type]} [description]
   */
  getStoreName () {
    return merchantInfo.storeName;
  },

  /**
   * 获取门店编号
   * @return {[type]} [description]
   */
  getStoreCode () {
    return merchantInfo.storeCode;
  },

  /**
   * 获取工号
   * @return {[type]} [description]
   */
  getJobNumber () {
    return userInfo.jobNumber;
  },

  /**
   * 获取员工头像
   * @return {[type]} [description]
   */
  getAvatar () {
    return userInfo.avatar;
  },
  /**
   * 会员ID
   * @return {*}
   */
  getMemberId() {
    return userInfo.memberId;
  },

  getMemberToken() {
    return userInfo.token;
  },
  /**
   * 判断是否是店长
   * @return {boolean}
   */
  isManager() {
    return userInfo.roleId === '9';
  },

  /**
   * 获取商户LOGO
   * @return {[type]} [description]
   */
  getMerchantLOGO() {
    return merchantInfo.logoUrl
  },

  /**
   * 获取商户提货地址
   * @return {[type]} [description]
   */
  getMerchantPickupAddress() {
    return merchantInfo.pickupAddress
  },

  /**
   * 获取商户退货地址
   * @return {[type]} [description]
   */
  getMerchantReturnAddress() {
    return merchantInfo.returnAddress
  },

  /**
   * 获取商户电话号码
   * @return {[type]} [description]
   */
  getMerchantMercPhone() {
    return merchantInfo.mercPhone
  },
  /**
   *
   * 7001-查询联系人信息
   */
  findContacts(params, callback) {
    params.merchantId = merchantInfo.merchantId
    params.memberId = merchantInfo.memberId
   // console.log('7001-查询联系人信息:\n', JSON.stringify(params))
    networklib.post('7001', params).then(obj => {
      if (callback) {
        // console.log('成功的回调', obj);
        callback(null, obj);
      }
    }).catch(err => {
      // console.log('失败的回调', err);
      if (callback) callback(err);
    });
  },
  // 1041-更新商户个人信息接口
  updateIndividualResume(params, callback) {
    params.merchantId = merchantInfo.merchantId;
    params.memberId = userInfo.memberId;
    console.log('1041-更新商户个人信息接口入参信息:\n', JSON.stringify(params))
    networklib.post('1041', params).then(obj => {
      if (callback) {
        console.log('更新商户个人信息接口成功的回调', obj);
        callback(null, obj);
      }
    }).catch(err => {
      console.log('更新商户个人信息接口失败的回调', err);
      if (callback) callback(err);
    });
  },
    /**
   *
   * 1043-查询员工基础信息
   */
  findMemberBasicInfo(callback) {
    let params = {merchantId: merchantInfo.merchantId, memberId: userInfo.memberId}
    console.log('1043-查询员工基础信息:\n', JSON.stringify(params))
    networklib.post('1043', params).then(obj => {
      if (callback) {
        console.log('查询员工基础信息成功的回调', obj);
        callback(null, obj);
      }
    }).catch(err => {
      console.log('查询员工基础信息失败的回调', err);
      if (callback) callback(err);
    });
  },
  /**
   * 1042-注销店员接口
   * [queryCancellationAccount description]
   * @param  {[type]}   params   [description]
   * @param  {Function} callback [description]
   * @return {[type]}            [description]
   */
  queryCancellationAccount(params, callback) {
    params.merchantId = merchantInfo.merchantId
    params.memberId = userInfo.memberId;
    //console.log('1042-注销店员接口:\n', JSON.stringify(params))
    networklib.post('1042', params).then(obj => {
      if (callback) {
        // console.log('成功的回调', obj);
        callback(null, obj);
      }
    }).catch(err => {
      // console.log('失败的回调', err);
      if (callback) callback(err);
    });
  },
  /**
   * 1044-查询商户店员详情接口
   * [findClerkInfoDetail description]
   * @param  {[type]}   params   [description]
   * @param  {Function} callback [description]
   * @return {[type]}            [description]
   */
  findClerkInfoDetail(params, callback) {
    params.merchantId = merchantInfo.merchantId
    params.memberId = userInfo.memberId;
    console.log('1044-查询商户店员详情接口:\n', JSON.stringify(params))
    networklib.post('1044', params).then(obj => {
      if (callback) {
        // console.log('成功的回调', obj);
        callback(null, obj);
      }
    }).catch(err => {
      // console.log('失败的回调', err);
      if (callback) callback(err);
    });
  },
  /**
   * 1045-查询审核店员列表接口
   * [findMemberAuditList description]
   * @param  {[type]}   params   [description]
   * @param  {Function} callback [description]
   * @return {[type]}            [description]
   */
  findMemberAuditList(params, callback) {
    params.merchantId = merchantInfo.merchantId
    params.memberId = userInfo.memberId
    console.log('1045-查询审核店员列表接口:\n', JSON.stringify(params))
    networklib.post('1045', params).then(obj => {
      if (callback) {
        // console.log('成功的回调', obj);
        callback(null, obj);
      }
    }).catch(err => {
      // console.log('失败的回调', err);
      if (callback) callback(err);
    });
  },

   /**
   * 1046-查询审核店员详情接口
   * [findMemberAuditDetail description]
   * @param  {[type]}   params   [description]
   * @param  {Function} callback [description]
   * @return {[type]}            [description]
   */
  findMemberAuditDetail(params, callback) {
    params.merchantId = merchantInfo.merchantId
    params.memberId = userInfo.memberId;
    console.log('1046-查询审核店员详情接口:\n', JSON.stringify(params))
    networklib.post('1046', params).then(obj => {
      if (callback) {
        // console.log('成功的回调', obj);
        callback(null, obj);
      }
    }).catch(err => {
      // console.log('失败的回调', err);
      if (callback) callback(err);
    });
  },

  /**
   * 1047-审核店员接口
   * [memberAudit description]
   * @param  {[type]}   params   [description]
   * @param  {Function} callback [description]
   * @return {[type]}            [description]
   */
  memberAudit(params, callback) {
    params.merchantId = merchantInfo.merchantId
    params.memberId = userInfo.memberId;
    console.log('1047-审核店员接口:\n', JSON.stringify(params))
    networklib.post('1047', params).then(obj => {
      if (callback) {
        // console.log('成功的回调', obj);
        callback(null, obj);
      }
    }).catch(err => {
      // console.log('失败的回调', err);
      if (callback) callback(err);
    });
  },

  /**
   * 1053-查询门店商户信息接口
   * [findSignMerchant description]
   * @param  {[type]}   params   [description]
   * @param  {Function} callback [description]
   * @return {[type]}            [description]
   */
  findSignMerchant(callback) {
    console.log('1053-查询门店商户信息接口:\n')
    networklib.post('1053').then(obj => {
      if (callback) {
        // console.log('成功的回调', obj);
        callback(null, obj);
      }
    }).catch(err => {
        // console.log('失败的回调', err);
      if (callback) callback(err);
    });
  },

  /*
   * 1050-查询商户店员列表接口
   *
   */
  findClerkAccountList(callback) {
    var param = {'memberId': userInfo.memberId, 'merchantId': merchantInfo.merchantId}
    //console.log('1050-查询门店商户信息接口:\n', param)
    networklib.post('1050', param).then(obj => {
      if (callback) {
        //console.log('成功的回调', obj);
        callback(null, obj);
      }
    }).catch(err => {
      //console.log('失败的回调', err);
      if (callback) callback(err);
    });
  },
  /**
   * 1051-查询商户角色接口
   * [findMerchantRole description]
   * @param  {[type]}   params   [description]
   * @param  {Function} callback [description]
   * @return {[type]}            [description]
   */
  findMerchantRole(callback) {
    console.log('1051-查询商户角色接口:\n')
    networklib.post('1051').then(obj => {
      if (callback) {
        // console.log('成功的回调', obj);
        callback(null, obj);
      }
    }).catch(err => {
      // console.log('失败的回调', err);
      if (callback) callback(err);
    });
  },
   /**
   * 1052-商户完善注册信息接口
   * [addMemberAllInfo description]
   * @param  {[type]}   params   [description]
   * @param  {Function} callback [description]
   * @return {[type]}            [description]
   */
  addMemberAllInfo(params, callback) {
    console.log('1052-商户完善注册信息接口:\n', JSON.stringify(params))
    networklib.post('1052', params).then(obj => {
      if (callback) {
        // console.log('成功的回调', obj);
        callback(null, obj);
      }
    }).catch(err => {
      // console.log('失败的回调', err);
      if (callback) callback(err);
    });
  },

}
