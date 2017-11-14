<!--商户设置-->
<style lang="scss" src="src/sass/merSetting.scss" scoped></style>
<template>
  <div class="content">

    <bl-bar barStyle="bar-dark-linear">
      <div class="button" slot="left-button" @click="$router.go(-1)">
        <div class="iconfont arrow-back"></div>
        <i class="fback">返回</i>
      </div>
      <div slot="title">店铺管理</div>
    </bl-bar>

    <div class="merset">
    <div class="divstyle">店员管理</div>
        <bl-comli class="moreli">
            <div slot='left-text' class="left-boxs">店员注册信息审核</div>
              <div slot='right-text' class="right-box" @click="toRegisterVerifyList">
                  <div class="right-l">
                    <div class="items">
                        <span></span>
                    </div>
                  </div>
                  <div class="iconfont arrow-back"></div>
              </div>
        </bl-comli>
        <bl-comli class="moreli">
            <div slot='left-text' class="left-boxs">店员账号管理</div>
              <div slot='right-text' class="right-box" @click="toAccountList">
                  <div class="right-l">
                    <div class="items">
                        <span></span>
                    </div>
                  </div>
                  <div class="iconfont arrow-back"></div>
              </div>
        </bl-comli>
        <bl-comli class="moreli" >
            <div slot='left-text' class="left-box">排班表</div>
              <div slot='right-text' class="right-box" @click="gotoSchedual">
                  <div class="right-l">
                    <div class="items">
                        <span></span>
                    </div>
                  </div>
                <div class="iconfont arrow-back"></div>
              </div>
        </bl-comli>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'arrangeSchedual',
    components: {
    },
    activated () {
    },
    data () {
      return {
      }
    },
    methods: {
      // 跳转至排班表页面
      gotoSchedual() {
        this.$router.push({name: '11.1'})
      },
      // 跳转至店员注册信息审核页面
      toRegisterVerifyList() {
        this.$router.push({name: '11.2'})
      },
      //跳转到店员账号管理
      toAccountList() {
        console.log('跳转到店员账号管理')
        this.$router.push({name: '11.3', queryParam: {'clerkId': '123456'}})
      }
    }
  }
</script>
