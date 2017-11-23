/**
 * Created by zhangyiqing on 16/10/26.
 *
 * /lib/errorLib.js
 */

module.exports = {

    // public
  Err_Input_Parameters_Empty: 5001,

  Err_JSON_Parse: 6001,

  Err_User_Login_Failure: 9002,

  Err_Unknown: 99999,

  get_err: function (errCode) {
    var msg;

    switch (errCode) {
      case this.Err_Input_Parameters_Empty:
        msg = '入参不完整';
        break;
      case this.Err_JSON_Parse:
        msg = 'Json解析失败';
        break;
      case this.Err_User_Login_Failure:
        msg = '用户登录失败';
        break;

      case this.Err_Unknown:
        msg = '测试错误';
        break;
      default:
        msg = '新的未知错误';
    }

    var err = new Error(msg);
    err.code = errCode;

    return err;
  }

};
