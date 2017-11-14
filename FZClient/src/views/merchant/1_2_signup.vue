<style lang="scss" src="src/sass/user.scss" scoped></style>
<template>
    <div class="user-content write">
      <bl-bar barStyle="bar-dark-write">
          <div class="button" slot="left-button" @click="$router.go(-1)">
            <div class="iconfont close"></div>
          </div>
          <div slot="title" style="color:#000">快速注册</div>
          <div slot="right-button" class="hrad-right" @click="onlogin">已有账号</div>
      </bl-bar>

      <section class="user">

          <div class="unline ftop">
            <!-- <currency-input placeholderStr="请输入手机号" inputType="2" maxlength="11" v-model="mobile"></currency-input> -->
            <currency-input ref="mobile" placeholderStr="手机号" inputType="2" maxlength="11" v-model="mobile"></currency-input>
            <i class="clears" v-show="clearMobile" @click="clears('mobile')"></i>
          </div class="unline">

          <div class="unline">
            <input class="sms" ref="smsCode" placeholder="请输入短信验证码" maxlength="6" v-model="smsCode" @keyup="valiSmsCode()"></input>
            <button class="sendsms" @click="sendsms" :disabled=isCountDown>{{ smsText }}</button>
            <i class="clears code" v-show="clearSmsCode" @click="clears('smsCode')"></i>
          </div>

          <div class="unline">
            <input type="password" name="password" placeholder="8-20位字符，至少包含数字和字母" v-model="password" @keyup="clearFlag('password')" ref="password">
            <i class="clears pass" v-show="clearPassword" @click="clears('password')"></i>
            <i class="eye" :class="{'open': isOpen}" @click="passlook"></i>
          </div>

          <p class="reg">
            <i class="checkbox" :class="{'sure':isSure}" @click="isSure = !isSure"></i>已阅读并同意
            <span class="blue" @click="onPage()">《百联会员注册协议》</span>
          </p>

          <bl-button class="loginbtn" :disabled="disabled" @click.native="signup()"><img src="../../sass/base64/loading.png" class="loading" v-show="loading">注 册</bl-button>

      </section>

    </div>
</template>

<script type="text/babel">

import md5 from 'js-md5';
const telRE = /^1[34578]\d{9}$/
const pwdRE = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,20}$/

export default {
  name: 'userLogin',
  components: {
    'currency-input': () => System.import('components/currency-input'),
  },
  data () {
    return {
      isOpen: false,
      isSure: false,
      smsText: '获取短信验证码',
      second: 60,
      timer: null,
      isCountDown: false,
      loading: false,

      mobile: -1,
      smsCode: '',
      password: '',
    }
  },
  mounted() {
    let loginName = this.$utillib.storageGet('loginName')
    if (loginName != '' && loginName != null) {
      this.mobile = parseInt(loginName)
    }
    this.initInput()
    console.log('login mounted :', this.mobile);
  },
  computed: {
    disabled() {
      return this.mobile == null || this.mobile < 0 || this.smsCode == '' || this.password == '' || !this.isSure;
    },
    validation () {
      return {
        mobile: telRE.test(this.mobile),
        smsCode: !!this.smsCode,
        pwd: pwdRE.test(this.password)
      }
    },
    isValid () {
      const validation = this.validation;
      return Object.keys(validation).every(key => validation[key])
    },

    clearMobile() {
      // this.mobile为数字
      return this.mobile > 0;
    },
    clearSmsCode() {
      return this.smsCode > 0;
    },
    clearPassword() {
      return this.password.length > 0;
    }
  },
  methods: {
    valiSmsCode() {
      let smsCode = this.smsCode;
      this.smsCode = smsCode.replace(/[^\d]/g, '');
    },
    initInput() {
      if (this.$refs.mobile) {
        this.$refs.mobile.activatedUpdate();
      } else {
        setTimeout(() => {
          this.$refs.mobile.activatedUpdate();
        }, 500)
      }
    },
    // 注册
    signup() {
      if (this.disabled) return
      if (!this.validationParams()) return
      if (this.loading) return
      // console.log('点击注册：', this.loading)
      this.loading = true
      // 获取设备号
      this.getDeviceId((err, obj) => {
        if (err) { this.$toast(err) }
        let deviceNumber = obj.deviceId;
        if (obj) {
          // 注册接口
          this.$merchantlib.signup(this.mobile, this.smsCode, md5(this.password), deviceNumber, (err, obj) => {
            this.loading = false
            if (err) { this.$toast(err) }
            if (obj) {
              console.log('result obj:', JSON.stringify(obj))
              if (obj.memberId) { this.$router.push({name: 2}) }
            }
          })
        }
      })
    },

    // 获取设备号
    getDeviceId(callback) {
      this.$jsbridgelib.bridgeGetDeviceInfo((err, obj) => {
        if (err) {
          return callback(null, 'browser')
        }
        if (obj) {
          return callback(null, obj.deviceId)
        }
      })
    },

    // 合法性校验
    validationParams() {
      if (!this.validation.mobile) {
        this.$toast("请输入正确的手机号")
        return false;
      }
      if (!this.validation.smsCode) {
        this.$toast("验证码不能为空")
        return false;
      }
      if (!this.validation.pwd) {
        this.$toast("密码8-20位字符，至少包含数字和字母")
        return false;
      }
      // 合法性校验
      if (!this.isValid) {
        console.log('回去重写')
        return false;
      }
      return true;
    },

    // 发送验证码
    sendsms() {
      this.$merchantlib.getCodeForSignup(this.mobile, (err, obj) => {
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

    onPage() {
      console.log('注册协议')
      this.$router.push({name: '1.2.3'})
    },

    // to 帐号密码登陆
    onlogin() {
      this.$router.push({name: '1'})
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
      if (type == 'password') {
        let init = this.$refs.password.value;
        (init.length > 0) ? (this.clearPassword = true) : (this.clearPassword = false)
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
      if (type == 'password') {
        this.password = '';
        this.clearPassword = false
      }
      this.initInput()
    },

    // 显示密码
    passlook() {
      this.isOpen = !this.isOpen
      var password = document.querySelector('input[name=password]');
      (this.isOpen) ? (password.setAttribute("type", "text")) : (password.setAttribute("type", "password"))
    },
  }
}
</script>
