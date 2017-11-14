<style lang="scss" src="src/sass/user.scss" scoped></style>
<template>
    <div class="user-content write">
      <bl-bar barStyle="bar-dark-write">
          <div class="button" slot="left-button" @click="$router.go(-1)">
            <div class="iconfont close"></div>
          </div>
          <div slot="right-button" class="hrad-right">快速注册</div>
      </bl-bar>

      <section class="user">
          <div class="user-head"><img src="static/images/yd-index.png"></div>

          <div class="unline">
            <input type="tel" name="tel" placeholder="手机号" maxlength="11" @keyup="username" ref="username">
            <i class="clears" v-show="isClear" @click="clears"></i>
          </div class="unline">

          <div class="unline">
            <input type="password" name="password" placeholder="密码">
            <i class="eye" :class="{'open': isOpen}" @click="passlook"></i>
          </div>

          <bl-button class="loginbtn" @click="login">登 录</bl-button>

          <p>
            <span class="phone">手机快速登录</span>
            <span class="forget">忘记密码?</span>
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
        isOpen: false
      }
    },
    mounted() {
    },
    computed: {
    },
    methods: {
      username() {
        let init = this.$refs.username.value;
        (init.length > 0) ? (this.isClear = true) : (this.isClear = false)
      },
      clears() {
        this.$refs.username.value = '';
        this.isClear = false
      },
      passlook() {
        this.isOpen = !this.isOpen
        var password = document.querySelector('input[name=password]');
        (this.isOpen) ? (password.setAttribute("type", "text")) : (password.setAttribute("type", "password"))
      },
      login() {
        this.$toast('用户名和密码不匹配')
      }
    }
  }
</script>
