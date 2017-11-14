<style lang="scss" src="src/sass/user.scss" scoped></style>
<template>
    <div class="user-content write">
      <bl-bar barStyle="bar-dark-linear">
          <div class="button" slot="left-button" @click="$router.go(-1)">
            <div class="iconfont close"></div>
          </div>
          <div slot="right-button" class="hrad-right">快速注册</div>
      </bl-bar>

      <section class="user">
          <div class="user-head"><img src="static/images/yd-index.png"></div>

          <div class="unline">  
            <input type="tel" name="tel" placeholder="手机号" maxlength="11" @keyup="username('username')" ref="username">
            <i class="clears" v-show="isClear" @click="clears('username')"></i>
          </div class="unline">

          <div class="unline">
            <input type="text" name="code" class="sms" placeholder="请输入短信验证码" @keyup="username('usercode')" ref="usercode">
            <button class="sendsms" @click="sendsms" :disabled=isCountDown>{{ smsText }}</button>
            <i class="clears code" v-show="isCode" @click="clears('usercode')"></i>
          </div>

          <bl-button class="loginbtn">登 录</bl-button>

          <p>
            账户密码登录
          </p>
      </section>

    </div>
</template>

<script type="text/babel">
  export default {
    name: 'userLogin',
    components: {
    },
    data () {
      return {
        isClear: false,
        isCode: false,
        isOpen: false,
        smsText: '获取短信验证码',
        second: 60,
        timer: null,
        isCountDown: false
      }
    },
    mounted() {
    },
    computed: {
    },
    methods: {
      username(type) {
        console.log(type)
        if (type == 'username') {
          let init = this.$refs.username.value;
          (init.length > 0) ? (this.isClear = true) : (this.isClear = false)
        }
        if (type == 'usercode') {
          let init = this.$refs.usercode.value;
          (init.length > 0) ? (this.isCode = true) : (this.isCode = false)
        }
      },
      clears(type) {
        if (type == 'username') {
          this.$refs.username.value = '';
          this.isClear = false
        }
        if (type == 'usercode') {
          this.$refs.usercode.value = '';
          this.isCode = false
        }
      },
      passlook() {
        this.isOpen = !this.isOpen
        var password = document.querySelector('input[name=password]');
        (this.isOpen) ? (password.setAttribute("type", "text")) : (password.setAttribute("type", "password"))
      },
      sendsms() {
        this.isCountDown = true
        this.second = 59
        this.smsText = this.second + 's后重新发送'
        this.timer = setInterval(this.countdown, 1000);
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
      }
    }
  }
</script>
