/* created by 周奇 */

/**
 * 加密lib
 */

import merchantlib from './merchantlib';
import utillib from './utillib';
import SHA256 from 'js-sha256'
import md5 from 'js-md5';
//SHA-256加密签名的秘钥--停车券
var SHA256_SIGN_KEY = "de8b3397b9254798a1958ef80012dd62"
//SHA-239加密签名的秘钥 停车场
var SHA239_SIGN_KEY = "C7EF27E20F144A28A1C3F7BF3FB4E272";
//MD5_SIGN_KEY : MD5加密签名的秘钥
var MD5_SIGN_KEY = "6c3217ae3b53499089a202cd6741021b";
//MD5加密签名需要转换的字符
var hexDigits = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F'];

export default {
  //参数加密
  encryptSignPark(params, timetamp) {
    console.log('params---- ', params)
    //将参数拼接成字符串
    var plainText = this.getSignPlaintext1(params, 1)
    console.log('plainText---- ', plainText, '    ', timetamp)
    // 需要签名数据
    var signPlainText = plainText + SHA256_SIGN_KEY + timetamp;
    //console.log('签名的数据----   ', signPlainText)
    // sha-256算法加密
    var signText = this.SHA256Encrypt(signPlainText)
    console.log('SHA256加密后签名的数据----   ', signText)
    // 截取signText前面32位，倒序排列，转换成大写
    var md5Text = signText.substring(0, 32);
    //console.log('截断32的数据----   ', md5Text)
    md5Text = utillib.stringReverse(md5Text).toUpperCase()
    //console.log('编辑32反前部加密字符----   ', md5Text)
    // 截取signText最后8位加上MD5_SIGN_KEY作为签名的秘钥
    var md5Key = signText.substring(signText.length - 8, signText.length) + MD5_SIGN_KEY;
    //console.log('编辑后部字符----   ', md5Key)
    // MD5加密签名
    //console.log('md5即将加密字符----   ', md5Text + md5Key)
    signText = this.md5Sign(md5Text + md5Key)
    //console.log('md5加密处理后字符----   ', signText)
    // 截取md5签名字符串前16位，并转换成小写
    var tempStr = signText.substring(0, 16).toLowerCase();
    //console.log('最终字符----   ', tempStr)
    return utillib.stringReverse(tempStr);
  },
  //把集合所有元素按字母升序排列，并按照“参数=参数值”的模式用“&&”字符拼接成字符串
  getSignPlaintext(params, joinStr) {
    if (joinStr !== '' && !joinStr) {
      joinStr = '&'
    }
    var allKeys = utillib.getObjectAllKeys(params)
    //按字母生序
    allKeys.sort();
    var plainText = '';
    var first = true
    allKeys.forEach((item) => {
      var value1 = params[item]
      if (this.isNotBlank(item) && this.isNotBlank(value1)) {
        if (first) {
          plainText += plainText + item + '=' + value1;
          first = false;
        } else {
          plainText = plainText + joinStr + item + '=' + value1;
        }
      }
    })
    //console.log('----', allKeys)
    return plainText
  },
  //把集合所有元素按字母升序排列，并按照“参数=参数值”的模式用“&&”字符拼接成字符串,并转换成大写
  getSignPlaintext1(params, flag) {
    var str = this.getSignPlaintext(params, '&&')
    if (flag == 1) {
      return str.toUpperCase();
    } else {
      return str;
    }
  },
  //SHA-256加密算法
  SHA256Encrypt(cryptStr) {
    var str = SHA256.sha256(cryptStr)
    return str;
  },
  //判断字符串是否为空
  isNotBlank(str) {
    if (str && str !== '' && str != 'null') {
      return true
    } else {
      return false
    }
  },
  md5Sign(string) {
    return md5(string);
  }
}
