/* created by 张怡清 */

/**
 * 基础功能
 */

/**
 *
 * 通过UserAgent来判断是不是浏览器.
 *
 * 注:貌似此方法在安卓APP上无效..
 *
 * @author 方胜军
 *
 */

import networklib from './networklib';
import merchantlib from './merchantlib';

/**
 * 获取服务器版本
 * dev, remotedev, sit, pre, prd
 */
var serverEnv = 'prd'
networklib.getServerInfo((err, obj) => {
  if (!err) {
    serverEnv = obj.env;
  }
})

var deviceInfo = {}

const localStorage = window.localStorage;

export default {
  /**
   *
   *  判断是否是浏览器.
   *
   * true:  是浏览器
   * false: 不是浏览器
   *
   */
  isBrowsers() {
    return !(this.isIOS() || this.isAndroid())
  },
  isIOS() {
    return !!navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
  },
  isAndroid() {
    var u = navigator.userAgent;
    return u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
  },
  getDeviceInfo() {
    return 123
  },
  /**
   *   对Date的扩展，将 Date 转化为指定格式的String
   *   月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符，
   *   年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字)
   *   例子：
   *   (new Date()).Format("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423
   *   (new Date()).Format("yyyy-M-d h:m:s.S")      ==> 2006-7-2 8:9:4.18
   *   utillib.fmtDate(new Date(time),'yyyy-MM-dd hh:mm');
   */

  fmtDate (date, fmt) {
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
  },

  /**参数说明：
   * 根据长度截取先使用字符串，超长部分追加…
   * str 对象字符串
   * len 目标字节长度
   * 返回值： 处理结果字符串
   */
  cutString (str, len) {
    // console.log(str, len)
    var str_length = 0;
    var str_len = 0;
    let str_cut = '';
    str_len = str.length;
    for (var i = 0; i < str_len; i++) {
      let a = str.charAt(i);
      str_length++;
      if (escape(a).length > 4) {
        //中文字符的长度经编码之后大于4
        str_length++;
      }
      str_cut = str_cut.concat(a);
      if (str_length >= len) {
        str_cut = str_cut.concat("...");
        return str_cut;
      }
    }
    //如果给定字符串小于指定长度，则返回源字符串；
    if (str_length < len) {
      return str;
    }
  },

  /**
   * 倒计时计算
   * @param  {[type]} timestamp [description]
   * @return {[type]}           [description]
   */
  countdowm(timestamp) {
    let timer = '';
    let nowTime = new Date();
    let endTime = new Date(timestamp);
    let t = endTime.getTime() - nowTime.getTime();
    // console.log('--------- aaa----- ', nowTime)
    if (t > 0) {
      let day = Math.floor(t / 86400000);
      let hour = Math.floor((t / 3600000) % 24);
      let min = Math.floor((t / 60000) % 60);
      let sec = Math.floor((t / 1000) % 60);
      hour = hour < 10 ? "0" + hour : hour;
      min = min < 10 ? "0" + min : min;
      sec = sec < 10 ? "0" + sec : sec;
      let format = '';
      if (day > 0) {
        format = `${day}天${hour}小时${min}分${sec}秒`;
      }
      if (day <= 0 && hour > 0) {
        format = `${hour}小时${min}分${sec}秒`;
      }
      if (day <= 0 && hour <= 0) {
        format = `${min}分${sec}秒`;
      }
      timer = format
      // console.log(format)
      // self.content = format;
    } else {
      t = -t;
      let day = Math.floor(t / 86400000);
      let hour = Math.floor((t / 3600000) % 24);
      let min = Math.floor((t / 60000) % 60);
      let sec = Math.floor((t / 1000) % 60);
      hour = hour < 10 ? "0" + hour : hour;
      min = min < 10 ? "0" + min : min;
      sec = sec < 10 ? "0" + sec : sec;
      let format = '';
      if (day > 0) {
        format = `已超时${day}天${hour}小时${min}分${sec}秒`;
      }
      if (day <= 0 && hour > 0) {
        format = `已超时${hour}小时${min}分${sec}秒`;
      }
      if (day <= 0 && hour <= 0) {
        format = `已超时${min}分${sec}秒`;
      }
      timer = format
    }
    return timer;
  },
  /**
   * 返回当前日期
   */
  getLocalDate(split) {
    if (split !== '' && !split) {
      split = '/'
    }
    var myDate = new Date(); //获取系统当前时间
    var year = myDate.getFullYear(); //获取完整的年份(4位,1970-????)
    var month = myDate.getMonth() + 1; //获取当前月份(0-11,0代表1月)
    var date = myDate.getDate(); //获取当前日(1-31)
    if (month < 10) {
      month = '0' + month;
    }
    if (date < 10) {
      date = '0' + date;
    }
    return year + split + month + split + date
  },
  /**
   * 返回当前时间到秒
   */
  getLocalTime(split) {
    if (split !== '' && !split) {
      split = '/'
    }
    var myDate = new Date(); //获取系统当前时间
    var hours = myDate.getHours(); //获取当前小时数(0-23)
    var minu = myDate.getMinutes(); //获取当前分钟数(0-59)
    var second = myDate.getSeconds(); //获取当前秒数(0-59)
    if (hours < 10) {
      hours = '0' + hours;
    }
    if (minu < 10) {
      minu = '0' + minu;
    }
    if (second < 10) {
      second = '0' + second;
    }
    return hours + split + minu + split + second
  },
  /**
   * 返回server环境
   * @return {string}
   */
  getServerEnv() {
    return serverEnv;
  },
  isSIT() {
    return serverEnv == 'sit'
  },
  isPRE() {
    return serverEnv == 'pre'
  },
  isPRD() {
    return serverEnv == 'prd'
  },

  /**
   * 根据name取出LocalStorage里的value
   * @param name
   * @return 返回json对象
   */
  storageGet(name) {
    let value = localStorage.getItem(name)
    // console.log(' utils.dbget ',value);
    if (/^\{.*\}$/.test(value)) value = JSON.parse(value)
    return value
  },

  /**
   * 存入LocalStorage
   * @param name
   * @param value  可以是json对象，也可以是字符串
   */
  storageSet(name, value) {
    if (typeof value === typeof {}) value = JSON.stringify(value)
    return localStorage.setItem(name, value)
  },

  /**
   * 根据name删除LocalStorage
   * @param  {[type]} name [description]
   * @return {[type]}      [description]
   */
  storageRemove(name) {
    return localStorage.removeItem(name)
  },

  /**
   * App版本兼容性控制
   * param{"device":"minVersion"} . minVersion 格式1.0.0    device :0为ios ,1为安卓, 2ios+安卓
   * @return 0: 本地版本低于最低版本， 1： 本地版本大于等于最低版本
   */
  isAppSupport(param) {
    if (param['0']) {
      if (deviceInfo.device == '0') {
        return this.checkAppSupport(param['0']);
      }
    }
    if (param['1']) {
      if (deviceInfo.device == '1') {
        return this.checkAppSupport(param['1']);
      }
    }
    if (param['2']) {
      return this.checkAppSupport(param['2']);
    }
    return 0;
  },

  /**
   * App版本兼容性控制
   *  minVersion 格式1.0.0
   * @return 0: 本地版本低于最低版本， 1： 本地版本大于等于最低版本
   */
  checkAppSupport(minVersion) {
    console.log('minVersion ---', minVersion);
    if (!deviceInfo.version) {
      return 0;
    }
    console.log('version ---', deviceInfo.version);
    var minVersionStrs = minVersion.split('.');
    var deviceInfoVersionStr = deviceInfo.version;
    for (var i = 0; i < minVersionStrs.length; i++) {
      if (i < deviceInfoVersionStr.length) {
        if (minVersion[i] > deviceInfoVersionStr[i]) {
          return 0;
        }
      } else {  //最小版本字符串比本地版本字符串长
        if (minVersion[i] > 0) {
          return 0;
        }
      }
    }
    return 1;
  },

  getAppType() {
    if (deviceInfo.device == '1') {
      return 'andriod'
    }
    return 'ios'
  },
  /**
   * 设置appinfo
   */
  setAppInfo(info) {
    deviceInfo = info;
  },
  /**
   * 读取appinfo
   */
  getAppInfo(info) {
    return deviceInfo;
  },

  /**
   * 返回对象内所有的key
   */
  getObjectAllKeys(object) {
    var keys = [];
    if (object instanceof Object && !(object instanceof Array)) {
      for (var key in object) {
        keys.push(key);
      }
    }
    return keys;
  },
  /**
   * 返回停车编码后的URL
   */
  parkPayUrlEncode(url) {
    var urlTemp = url;
    //console.log('---url ', urlTemp)
    urlTemp = urlTemp.replace(/:/g, "%253A")
    urlTemp = urlTemp.replace(/\//g, "%252F")
    urlTemp = urlTemp.replace(/=/g, "%253D")
    urlTemp = urlTemp.replace(/&/g, "%2526")
    urlTemp = urlTemp.replace(/\?/g, "%253F")
    //console.log('1111---url ', urlTemp)
    return urlTemp;
  },
  //获取首页地址头
  getHOST() {
    if (this.isSIT()) {
      return 'http://120.136.161.189:8080'
    } else if (this.isPRE()) {
      return 'http://cloudom.ut.bl.com'
    } else if (this.isPRD()) {
      return 'http://cloudom.bl.com'
    }
    return 'http://120.136.161.189:8080'
  },
  //获取支付回调后台地址头
  getMarAfterUrlHOST() {
    if (this.isSIT()) {
      return 'http://10.201.129.158:7510'
    } else if (this.isPRE()) {
      return 'http://cloudorder.ut.bl.com'
    } else if (this.isPRD()) {
      return 'http://cloudorder.bl.com'
    }
    return 'http://10.201.129.158:7510'
  },
  //获取停车券支付地址投
  getParkPayHOST() {
    if (this.isSIT()) {
      return 'http://zf.st.bl.com/payment/payForApp.html?'
    } else if (this.isPRE()) {
      return 'https://payment.ut.bl.com/payment/payForApp.html?'
    } else if (this.isPRD()) {
      return 'https://payment.bl.com/payment/payForApp.html?'
    }
    return 'http://zf.st.bl.com/payment/payForApp.html?'
  },
  /**
   * 单个字符转换成ascll码
   */
  charParseASCLL(char) {
    var tempint = 0;
    switch (char) {
      case 'a':
        tempint = 97;
        break;
      case 'b':
        tempint = 98;
        break;
      case 'c':
        tempint = 99;
        break;
      case 'd':
        tempint = 100;
        break;
      case 'e':
        tempint = 101;
        break;
      case 'f':
        tempint = 102;
        break;
      case 'g':
        tempint = 103;
        break;
      case 'h':
        tempint = 104;
        break;
      case 'i':
        tempint = 105;
        break;
      case 'j':
        tempint = 106;
        break;
      case 'k':
        tempint = 107;
        break;
      case 'l':
        tempint = 108;
        break;
      case 'm':
        tempint = 109;
        break;
      case 'n':
        tempint = 110;
        break;
      case 'o':
        tempint = 111;
        break;
      case 'p':
        tempint = 112;
        break;
      case 'q':
        tempint = 113;
        break;
      case 'r':
        tempint = 114;
        break;
      case 's':
        tempint = 115;
        break;
      case 't':
        tempint = 116;
        break;
      case 'u':
        tempint = 117;
        break;
      case 'v':
        tempint = 118;
        break;
      case 'w':
        tempint = 119;
        break;
      case 'x':
        tempint = 120;
        break;
      case 'y':
        tempint = 121;
        break;
      case 'z':
        tempint = 122;
        break;
      case 'A':
        tempint = 65;
        break;
      case 'B':
        tempint = 66;
        break;
      case 'C':
        tempint = 67;
        break;
      case 'D':
        tempint = 68;
        break;
      case 'E':
        tempint = 69;
        break;
      case 'F':
        tempint = 70;
        break;
      case 'G':
        tempint = 71;
        break;
      case 'H':
        tempint = 72;
        break;
      case 'I':
        tempint = 73;
        break;
      case 'J':
        tempint = 74;
        break;
      case 'K':
        tempint = 75;
        break;
      case 'L':
        tempint = 76;
        break;
      case 'M':
        tempint = 77;
        break;
      case 'N':
        tempint = 78;
        break;
      case 'O':
        tempint = 79;
        break;
      case 'P':
        tempint = 80;
        break;
      case 'Q':
        tempint = 81;
        break;
      case 'R':
        tempint = 82;
        break;
      case 'S':
        tempint = 83;
        break;
      case 'T':
        tempint = 84;
        break;
      case 'U':
        tempint = 85;
        break;
      case 'V':
        tempint = 86;
        break;
      case 'W':
        tempint = 87;
        break;
      case 'X':
        tempint = 88;
        break;
      case 'Y':
        tempint = 89;
        break;
      case 'Z':
        tempint = 90;
        break;
      case '0':
        tempint = 48;
        break;
      case '1':
        tempint = 59;
        break;
      case '2':
        tempint = 50;
        break;
      case '3':
        tempint = 51;
        break;
      case '4':
        tempint = 52;
        break;
      case '5':
        tempint = 53;
        break;
      case '6':
        tempint = 54;
        break;
      case '7':
        tempint = 55;
        break;
      case '8':
        tempint = 56;
        break;
      case '9':
        tempint = 57;
        break;
      default:
        tempint = char;
        break;
    }
    return tempint;
  },
  /**
   * 字符串反转
   */
  stringReverse(string) {
    var str = string.toString()
    //console.log('------', str);
    //先拆分成数组
    //再反转，但还是数组
    //最后把数组变成字符串
    str = string.split("").reverse().join("");
    return str;
  },

  /**
   * 获取店员二维码
   */
  getClerkQRcode() {
    let serverHostname = ''
    if (this.isSIT()) {
      serverHostname = 'http://120.136.161.164:9000'
    } else if (this.isPRE()) {
      serverHostname = 'http://cloudwebapp.ut.bl.com'
    } else if (this.isPRD()) {
      serverHostname = 'http://cloudwebapp.bl.com'
    }

    let linkstr = this.getAppType() + '-p-s-0-' + merchantlib.getCommercialCode() + '-' + merchantlib.getStoreId() + '-' + merchantlib.getMerchantId() + '-' + merchantlib.getMemberId() + '-qr'
    return serverHostname + '/service/scanEmployeeQrCode?memberId=' + merchantlib.getMemberId() + '&cm_mmc=' + linkstr + '&cm=' + linkstr
  },
  /**
   * 过滤表情包+换行
   */
  filterFace(param) {
    return param.replace(/[\uD83C|\uD83D|\uD83E][\uDC00-\uDFFF][\u200D|\uFE0F]|[\uD83C|\uD83D|\uD83E][\uDC00-\uDFFF]|[0-9|*|#]\uFE0F\u20E3|[0-9|#]\u20E3|[\u203C-\u3299]\uFE0F\u200D|[\u203C-\u3299]\uFE0F|[\u2122-\u2B55]|\u303D|[\A9|\AE]\u3030|\uA9|\uAE|\u3030|\r|\n/ig, "");
  }
}
