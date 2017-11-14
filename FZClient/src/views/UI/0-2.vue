<style lang="scss" src="src/sass/user.scss" scoped></style>
<template>
    <div class="user-content write">
      <bl-bar barStyle="bar-dark-write">
          <div class="button" slot="left-button" @click="$router.go(-1)">
            <div class="iconfont arrow-back"><i class="fback">返回</i> <i class="fclose">关闭</i></div>
          </div>
          <div slot="title" style="color:#000">忘记密码</div>
      </bl-bar>

      <section class="user">

          <div class="unline ftop">  
            <input type="tel" name="tel" placeholder="请输入手机号" maxlength="11" @keyup="username('username')" ref="username">
            <i class="clears" v-show="isClear" @click="clears('suername')"></i>
          </div class="unline">

          <div class="unline">
            <input type="text" name="code" class="sms" placeholder="请输入短信验证码" @keyup="username('usercode')" ref="usercode">
            <button class="sendsms" @click="sendsms" :disabled=isCountDown>{{ smsText }}</button>
            <i class="clears code" v-show="isCode" @click="clears('usercode')"></i>
          </div>

          <div class="unline">
            <input type="password" name="password" placeholder="8-20位字符，至少包含数字和字母" @keyup="username('password')" ref="password">
            <i class="clears pass" v-show="isPass" @click="clears('password')"></i>
            <i class="eye" :class="{'open': isOpen}" @click="passlook"></i>
          </div>

          <bl-button class="loginbtn" @click="setPassword">确 定</bl-button>

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
        isPass: false,
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
        if (type == 'password') {
          let init = this.$refs.password.value;
          (init.length > 0) ? (this.isPass = true) : (this.isPass = false)
        }
      },
      clears(type) {
        if (type == 'suername') {
          this.$refs.username.value = '';
          this.isClear = false
        }
        if (type == 'usercode') {
          this.$refs.usercode.value = '';
          this.isCode = false
        }
        if (type == 'password') {
          this.$refs.password.value = '';
          this.isPass = false
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
      },
      setPassword() {
        this.$toast('设置成功')
      }
    }
  }
</script>
