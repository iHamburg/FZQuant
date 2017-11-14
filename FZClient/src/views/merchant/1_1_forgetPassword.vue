<style lang="scss" src="src/sass/user.scss" scoped></style>
<template>
    <div class="user-content write">
      <bl-bar barStyle="bar-dark-write" :class="{'defaultBackColor':flag=='0'}">
          <div class="button" slot="left-button" @click="$router.go(-1)">
            <div class='iconfont arrow-back' :class="{'iconfont setarrow-back':flag=='0'}"><i class="fback" :class="{'setps':flag=='0'}">返回</i></div>
          </div>
          <div slot="title" class="titlecolor" :class="{'setps':flag=='0'}">{{ titleContent }}</div>
      </bl-bar>

      <section class="user">

          <div class="unline ftop">
            <currency-input placeholderStr="请输入手机号" maxlength="11" inputType="2" v-model="mobile" ref="mobile"></currency-input>
            <i class="clears" v-show="clearMobile" @click="clears('mobile')"></i>
          </div class="unline">

          <div class="unline">
            <input class="sms" ref="smsCode" placeholder="请输入短信验证码" maxlength="6" v-model="smsCode" @keyup="valiSmsCode"></input>
            <button class="sendsms" @click="sendsms" :disabled=isCountDown>{{ smsText }}</button>
            <i class="clears code" v-show="clearSmsCode" @click="clears('smsCode')"></i>
          </div>

          <div class="unline">
            <input type="password" name="password" placeholder="8-20位字符，至少包含数字和字母" v-model="password" @keyup="clearFlag('password')" maxlength="20" ref="password">
            <i class="clears pass" v-show="clearPassword" @click="clears('password')"></i>
            <i class="eye" :class="{'open': isOpen}" @click="passlook"></i>
          </div>

          <bl-button class="loginbtn" :disabled="disabled" @click="setPassword"><img src="../../sass/base64/loading.png" class="loading" v-show="loading">确 定</bl-button>

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
      smsText: '获取短信验证码',
      second: 60,
      timer: null,
      isCountDown: false,
      flag: '',
      loading: false,
      mobile: -1,
      smsCode: '',
      password: '',
    }
  },
  mounted() {
    this.flag = this.$route.params.flag
    let loginName = this.$utillib.storageGet('loginName')
    console.log('login mounted :', loginName);
    if (loginName != '' && loginName != null) {
      this.mobile = parseInt(loginName)
    }
    this.initInput()
  },
  computed: {
    disabled() {
      return this.mobile == '' || this.smsCode == '' || this.password == '';
    },
    // 合法性校验
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
    // 删除标记
    clearMobile() {
      // this.mobile为数字
      return this.mobile > 0;
    },
    clearSmsCode() {
      return this.smsCode > 0;
    },
    clearPassword() {
      return this.password.length > 0;
    },
    titleContent() {
      if (this.flag == '0') {
        return '设置密码'
      } else {
        return '忘记密码'
      }
    },
    setIcon() {
      if (this.flag == '0') {
        // alert(22)
        return {'iconfont setarrow-back': true}
      }
      //  else if (this.flag != '0') {
      //   alert(111)
      //   return {'iconfont arrow-back': true}
      // } else {
      //   return false
      // }
      // 'iconfont arrow-back': flag != '0', 'iconfont setarrow-back': flag == '0'
    }
  },
  methods: {
    valiSmsCode() {
      let smsCode = this.smsCode;
      console.log('before：', smsCode)
      this.smsCode = smsCode.replace(/[^\d]/g, '');
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
    initInput() {
      console.log('initInput')
      if (this.$refs.mobile) {
        this.$refs.mobile.activatedUpdate();
        // this.$refs.smsCode.activatedUpdate();
      } else {
        setTimeout(() => {
          this.$refs.mobile.activatedUpdate();
          // this.$refs.smsCode.activatedUpdate();
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
      this.initInput();
    },

    // 发送验证码
    sendsms() {
      if (this.mobile == '' || this.mobile == null) return this.$toast('请填写手机号')
      this.$merchantlib.getCodeForForgetPassword(this.mobile, (err, obj) => {
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

    passlook() {
      this.isOpen = !this.isOpen
      var password = document.querySelector('input[name=password]');
      (this.isOpen) ? (password.setAttribute("type", "text")) : (password.setAttribute("type", "password"))
    },

    setPassword() {
      if (this.disabled) return
      if (!this.validationParams()) return
      if (this.loading) return
      this.loading = true
      this.$merchantlib.updatePassword(this.mobile, this.smsCode, md5(this.password), (err, obj) => {
        this.loading = false
        if (err) return this.$toast(err)
        console.log('setPassword result obj：', obj)
        this.$toast('重置密码成功')
        this.$router.push({name: 1})
      })
    }
  }
}
</script>
