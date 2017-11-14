<style lang="scss" src="src/sass/user.scss" scoped></style>
<template>
    <div class="user-content write">
      <bl-bar barStyle="bar-dark-write">
          <div class="button" slot="left-button" @click="$router.go(-1)">
            <div class="iconfont close"></div>
          </div>
          <div slot="right-button" class="hrad-right" @click="onRegister">快速注册</div>
      </bl-bar>

      <section class="user">
          <div class="user-head"><img src="static/images/yd-index.png"></div>

          <div class="unline">
            <currency-input placeholder="请输入手机号" inputType="2" maxlength="11" v-model="mobile" ref="mobile"></currency-input>
            <i class="clears" v-show="clearMobile" @click="clears('mobile')"></i>
          </div class="unline">

          <div class="unline">
            <currency-input class="sms" placeholder="请输入短信验证码" inputType="2" inputWidth="width:53%" maxlength="6" v-model="smsCode" @keyup="clearFlag('smsCode')" ref="smsCode"></currency-input>
            <button class="sendsms" @click="sendsms" :disabled=isCountDown>{{ smsText }}</button>
            <i class="clears code" v-show="clearSmsCode" @click="clears('smsCode')"></i>
          </div>

          <bl-button class="loginbtn" :disabled="disabled" @click="onlogin"><img src="../../sass/base64/loading.png" class="loading" v-show="loading">登 录</bl-button>

          <p @click="onPwdlogin">
            账户密码登录
          </p>
      </section>

    </div>
</template>

<script type="text/babel">
export default {
  name: 'userLogin',
  components: {
    'currency-input': () => System.import('components/currency-input'),
  },
  data () {
    return {
      isOpen: false,
      smsText: '获取短信验证码',
      second: 60,
      timer: null,
      isCountDown: false,
      loading: false,

      mobile: -1,
      smsCode: -1,

      // clearMobile: false,
      // clearSmsCode: false,
    }
  },
  mounted() {
    let loginName = this.$utillib.storageGet('loginName')
    console.log('login mounted :', loginName);
    if (loginName != '' && loginName != null) {
      this.mobile = parseInt(loginName)
    }
    this.initInput()
  },
  computed: {
    disabled() {
      return this.mobile == '' || this.smsCode == '';
    },
    clearMobile() {
      // this.mobile为数字
      return this.mobile > 0;
    },
    clearSmsCode() {
      return this.smsCode > 0;
    },
  },
  methods: {
    initInput() {
      if (this.$refs.mobile) {
        this.$refs.mobile.activatedUpdate();
        this.$refs.smsCode.activatedUpdate();
      } else {
        setTimeout(() => {
          this.$refs.mobile.activatedUpdate();
          this.$refs.smsCode.activatedUpdate();
        }, 500)
      }
    },
    // 删除标记
    clearFlag(type) {
      // console.log(type)
      if (type == 'mobile') {
        let init = this.$refs.mobile.value;
        (init.length > 0) ? (this.clearMobile = true) : (this.clearMobile = false)
      }
      if (type == 'smsCode') {
        let init = this.$refs.smsCode.value;
        (init.length > 0) ? (this.clearSmsCode = true) : (this.clearSmsCode = false)
      }
    },

    // 清空输入
    clears(type) {
      if (type == 'mobile') {
        this.mobile = null;
        this.clearMobile = false
      }
      if (type == 'smsCode') {
        this.smsCode = null;
        this.clearSmsCode = false
      }
      this.initInput()
    },

    // 获取设备号
    getDeviceId(callback) {
      console.log('获取设备号')
      this.$jsbridgelib.bridgeGetDeviceInfo((err, obj) => {
        if (err) {
          return callback(null, 'browser')
        }
        if (obj) {
          return callback(null, obj.deviceId)
        }
      })
    },

    // 点击登陆
    onlogin() {
      console.log('点击登陆')
      this.loading = true
      this.getDeviceId((err, obj) => {
        if (err) {};
        if (obj) {
          this.deviceId = obj
          let mobile = this.mobile;
          let smsCode = this.smsCode;
          let deviceNumber = this.deviceId;

          // 验证码登陆
          this.$merchantlib.quickLogin(mobile, smsCode, deviceNumber, (err, obj) => {
            this.loading = false
            if (err) {
              return this.$toast(err)
            }
            // 记住帐号 2017/6/30
            this.$utillib.storageSet('loginName', mobile)
            /**
             * 校验权限
             * 0：待审核 ，1审核通过，2审核不通过，-1未填信息
             */
            let auditingFlag = obj.auditingFlag;
            if (auditingFlag == 0 || auditingFlag == 2) {
              console.log('去审核结果页')
              return this.$router.push(
                { name: '1.2.2',
                  query: {
                    avatar: obj.avatar,
                    memberId: obj.memberId,
                    roleName: obj.roleName,
                    auditingFlag: obj.auditingFlag,
                    denyReason: obj.denyReason
                  }
                }
              );
            } else if (auditingFlag == -1) {
              console.log('to 完善注册信息')
              return this.$router.push({name: '1.2.1', params: {memberId: obj.memberId}});
            }

            //登录 IM
            this.$jsbridgelib.bridgeIMLogin((err) => {
              if (err) {
                return console.log('登录 IM 失败', err);
              }
              window.dispatchEvent(new Event("IMLoginFinish"));
            });

            // 登陆成功 跳转到首页 查询权限表
            this.$accesslib.updateAccessList((err, obj) => {
              if (err) { console.log('失败的回调', err) }
              if (obj) { console.log('成功的回调', obj) }
              this.$router.push({name: '2'});
            });
          });
        }
      })
    },

    passlook() {
      this.isOpen = !this.isOpen
      var password = document.querySelector('input[name=password]');
      (this.isOpen) ? (password.setAttribute("type", "text")) : (password.setAttribute("type", "password"))
    },
    // 发送验证码
    sendsms() {
      this.$merchantlib.getCodeForQuickLogin(this.mobile, (err, obj) => {
        if (err) {
          this.$toast(err)
        } else {
          this.isCountDown = true
          this.second = 59
          this.smsText = this.second + 's后重新发送'
          this.timer = setInterval(this.countdown, 1000);
        }
      })
    },
    countdown() {
      this.second --;
      this.smsText = this.second + 's后重新发送'
      if (this.second == 0) {
        clearInterval(this.timer);
        this.smsText = '重新发送'
        this.isCountDown = false
        this.second = 60
        return false
      }
    },

    // 点击快速注册
    onRegister() {
      this.$router.push({name: '1.2'});
    },

    // 帐号密码登陆
    onPwdlogin() {
      this.$router.go(-1)
    },
  }
}
</script>
