/**
 *   对Date的扩展，将 Date 转化为指定格式的String
 *   月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符，
 *   年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字)
 *   例子：
 *   (new Date()).Format("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423
 *   (new Date()).Format("yyyy-M-d h:m:s.S")      ==> 2006-7-2 8:9:4.18
 *   utils.fmtDate(new Date(time),'yyyy-MM-dd hh:mm');
 */

const fmtDate = (date, fmt) => {
  var o = {
    'M+': date.getMonth() + 1, // 月份
    'd+': date.getDate(), // 日
    'h+': date.getHours(), // 小时
    'm+': date.getMinutes(), // 分
    's+': date.getSeconds(), // 秒
    'q+': Math.floor((date.getMonth() + 3) / 3), // 季度
    'S': date.getMilliseconds() // 毫秒
  };
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
  }
  for (let k in o) {
    if (new RegExp('(' + k + ')').test(fmt)) {
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)));
    }
  }
  return fmt;
}

/**
 *
 * @param str  被替换的东西
 * @param frontLen 前面需要保留位数
 * @param endLen 后面需要保留位数
 * @returns {string}
 */
const plusXing = (str, frontLen, endLen) => {
  let len = str.length - frontLen - endLen;
  if (len <= 0) {
    return str;
  }
  let xing = '';
  for (let i = 0; i < len; i++) {
    xing += '*';
  }
  return str.substr(0, frontLen) + xing + str.substr(str.length - endLen);
}

const goodsState = (str) => {
  var res = '';
  console.log(str)
  switch (str) {
    case '0':
      res = '草稿';
      break;
    case '1':
      res = '待审核';
      break;
    case '2':
      res = '已上架';
      break;
    case '3':
      res = '已下架';
      break;
    case '4':
      res = '审核不通过';
      break;
    default:
      res = '有货';
  }
  return res;
}

/**
 * 浏览器的sessionStorage
 * @type {[Function]}
 */
const sessionStorage = window.sessionStorage
const JSON = window.JSON
const dbGet = (name) => {
  // console.log('dbGET',localStorage);

  let value = sessionStorage.getItem(name)

  // console.log(' utils.dbget ',value);

  if (/^\{.*\}$/.test(value)) value = JSON.parse(value)
  return value
}

const dbSet = (name, value) => {
  if (typeof value === typeof {}) value = JSON.stringify(value)
  return sessionStorage.setItem(name, value)
}

const dbRemove = (name) => {
  return sessionStorage.removeItem(name)
}

const localStorage = window.localStorage;
/**
 *
 * @param name
 * @return 返回json对象
 */
const storageGet = (name) => {
  let value = localStorage.getItem(name)

  // console.log(' utils.dbget ',value);

  if (/^\{.*\}$/.test(value)) value = JSON.parse(value)
  return value
}
/**
 *
 * @param name
 * @param value  可以是json对象，也可以是字符串
 */
const storageSet = (name, value) => {
  if (typeof value === typeof {}) value = JSON.stringify(value)
  return localStorage.setItem(name, value)
}

const storageRemove = (name) => {
  return localStorage.removeItem(name)
}

/**
 * 返回登录的商户id
 * @return {*}
 */
const merchantId = () => {
  let data = storageGet('data') || {};
  // console.log('data',data);

  return data.telantId;
}

/**
 * 返回商户权限
 * //1-店长，2-店员
 */
const roleId = () => {
  let data = storageGet('data') || {};
  return data.acountType;
}

/**
 * 浏览器的cookie操作
 * @param  {[key]}    [传key]
 * @return {[value]}  [获取key的值]
 */
const getCookie = (key) => {
  let arr = new RegExp('(^| )' + key + '=([^;]*)(;|$)');
  let reg = new RegExp('(^| )' + key + '=([^;]*)(;|$)');
  if ((arr = document.cookie.match(reg))) {
    return decodeURIComponent(arr[2]);
  } else {
    return null;
  }
}
const setCookie = (key, value, days) => {
  // 设置cookie过期事件,默认是30天
  var expire = new Date();
  days = days || 30;
  expire.setTime(expire.getTime() + (+days) * 24 * 60 * 60 * 1000);
  document.cookie = key + "=" + encodeURIComponent(value) + ";expires=" + expire.toGMTString();
};
const deleteCookie = (key) => {
  var expire = new Date();
  expire.setTime(expire.getTime() - 1);
  var cval = getCookie(key);
  if (cval != null) {
    // 把toGMTString改成了toUTCString，两者等价。但是ECMAScript推荐使用toUTCString方法。toGMTString的存在仅仅是
    // 为了向下兼容
    document.cookie = key + "=" + cval + ";expires=" + expire.toUTCString();
  }
}
/**
 * 判断微信
 * @return {[Bool]} [ true false ]
 */
const isWeixin = () => {
  let ua = navigator.userAgent.toLowerCase();
  if (ua.match(/MicroMessenger/i) === "micromessenger") {
    return true;
  } else {
    return false;
  }
}

/**
 * 数字千分位格式化
 * @param  {[type]} s [传入的数字]
 * @param  {[type]} n [保留几位小数点]
 * @return {[type]}   [返回千分位格式]
 */
const fmoney = (s, n) => {
  n = n > 0 && n <= 20 ? n : 2;
  s = parseFloat((s + "").replace(/[^\d\.-]/g, "")).toFixed(n) + "";
  let l = s.split(".")[0].split("").reverse();
  let r = s.split(".")[1];
  let t = "";
  for (let i = 0; i < l.length; i++) {
    t += l[i] + ((i + 1) % 3 === 0 && i + 1 !== l.length ? "," : "");
  }
  return t.split("").reverse().join("") + "." + r;
}

/**
 * 判断元素是否在可视区域
 * @chenpeng
 * @DateTime 2017-02-19
 * @param    {[obj]}      el     [dom节点]
 * @param    {[object]}   option [参数]
 * @return   {[Boole]}    [description]
 */
const isSeeing = (el, option) => {
  const setting = Object.assign({
    top: 0, // 元素在顶部伸出的距离
    right: 0, // 元素在右边伸出的距离才
    bottom: 0, // 元素在底部伸出的距离
    left: 0 // 元素在左边伸出的距离
  }, option)

  var bcr = el.getBoundingClientRect(); // 取得元素在可视区的位置

  var mw = el.offsetWidth; // 元素自身宽度
  var mh = el.offsetHeight; // 元素自身的高度
  var w = window.innerWidth; // 视窗的宽度
  var h = window.innerHeight; // 视窗的高度
  var boolX = (!((bcr.right - setting.left) <= 0 && ((bcr.left + mw) - setting.left) <= 0) && !((bcr.left + setting.right) >= w && (bcr.right + setting.right) >= (mw + w))); // 上下符合条件
  var boolY = (!((bcr.bottom - setting.top) <= 0 && ((bcr.top + mh) - setting.top) <= 0) && !((bcr.top + setting.bottom) >= h && (bcr.bottom + setting.bottom) >= (mh + h))); // 上下符合条件

  return el.width !== 0 && el.height !== 0 && boolX && boolY
};

/***
 *
 *
 * 比较两个Json对象是否相等.
 * @param objA
 * @param objB
 *
 * 注: 使用时,调用isCompare(),传入2个比较的对象即可.
 *     返回结果 :  true(相等) or false(不相等) .
 *
 */

// 三个工具类:用于判断是否是对象类型，是否是数组，获取对象长度.
const isObj = (object) => {
  return object && typeof (object) == 'object' && Object.prototype.toString.call(object).toLowerCase() == "[object object]";
};
const isArray = (object) => {
  return object && typeof (object) == 'object' && object.constructor == Array;
};
const getLength = (object) => {
  var count = 0;
  for (var i in object) {
    if (i) {
      count++;
    }
  }

  return count;
};

// 主方法.
const isCompare = (objA, objB) => {
  if (!isObj(objA) || !isObj(objB)) {
    return false; //判断类型是否正确
  }
  if (getLength(objA) != getLength(objB)) {
    return false; //判断长度是否一致
  }
  return CompareObj(objA, objB, true);//默认为true
};

// json对象比较.
const CompareObj = (objA, objB, flag) => {
  for (var key in objA) {
    if (!flag) break; //跳出整个循环

    if (!objB.hasOwnProperty(key)) { flag = false; break; }
    if (!isArray(objA[key])) { //子级不是数组时,比较属性值
      if (objB[key] != objA[key]) { flag = false; break; }
    } else {
      if (!isArray(objB[key])) { flag = false; break; }
      var oA = objA[key]
      var oB = objB[key]
      if (oA.length != oB.length) { flag = false; break; }
      for (var k in oA) {
        if (!flag) break; //这里跳出循环是为了不让递归继续
        flag = CompareObj(oA[k], oB[k], flag);
      }
    }
  }
  return flag;
};

export default {
  goodsState,
  plusXing,
  fmtDate,
  dbGet,
  dbSet,
  dbRemove,
  storageGet,
  storageSet,
  storageRemove,
  getCookie,
  setCookie,
  deleteCookie,
  isWeixin,
  fmoney,
  isSeeing,

  merchantId,
  roleId,

  isObj,
  isArray,
  getLength,
  isCompare,
  CompareObj,
}
