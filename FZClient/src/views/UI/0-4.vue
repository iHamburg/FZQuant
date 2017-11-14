<style lang="scss" src="src/sass/user.scss" scoped></style>
<template>
    <div class="user-content">
      <bl-bar barStyle="bar-dark-linear">
          <div class="button" slot="left-button" @click="$router.go(-1)">
            <div class="iconfont arrow-back"><i class="fback">返回</i></div>
          </div>
          <div slot="title">完善商户信息</div>
      </bl-bar>

      <div class="logininfo">

          <bl-comli>
              <div slot='left-text' class="left-box">所属门店</div>
              <div slot='right-text' class="right-box">
                  <div class="right-r">{{ shop }}</div>
                  <div class="iconfont arrow-back"></div>
              </div>
          </bl-comli>
          <bl-comli>
              <div slot='left-text' class="left-box">所属商户</div>
              <div slot='right-text' class="right-box">
                  <div class="right-r">{{ merchant }}</div>
                  <div class="iconfont arrow-back"></div>
              </div>
          </bl-comli>

          <bl-comli class="top">
            <div slot='left-text' class="left-box">姓名</div>
            <div slot='right-text' class="right-box">
                <div class="right-r"><input type="text" placeholder="请填写真实姓名" v-model="name"></div>
            </div>
          </bl-comli>
          <bl-comli>
            <div slot='left-text' class="left-box">工号</div>
            <div slot='right-text' class="right-box">
                <div class="right-r"><input type="text" placeholder="请填写您在该商户的员工号" v-model="noid"></div>
            </div>
          </bl-comli>

          <bl-comli class="top">
              <div slot='left-text' class="left-box">角色</div>
              <div slot='right-text' class="right-box" @click="sheetVisible = !sheetVisible">
                  <div class="right-r">{{ role }}</div>
                  <div class="iconfont arrow-back"></div>
              </div>
          </bl-comli>

          <bl-button class="submit" :disabled="!disabled">提交审核</bl-button>

      </div>

      <mt-popup v-model="sheetVisible" position="bottom" style="width: 100%;">
          <bl-actionsheet :actions="actions" v-model="sheetVisible" @thisValue="returnVal"></bl-actionsheet>
      </mt-popup>

    </div>
</template>

<script type="text/babel">
  export default {
    name: 'userLogin',
    components: {
    },
    data () {
      return {
        sheetVisible: false,
        shop: '请选择',
        merchant: '请选择',
        name: '',
        noid: '',
        role: '请选择',
        actions: [{
          name: '店长',
          key: '0'
        }, {
          name: '店员',
          key: '1'
        }]
      }
    },
    mounted() {
    },
    methods: {
      returnVal(val) {
        if (val == 0) this.role = '店长'
        if (val == 1) this.role = '店员'
      }
    },
    computed: {
      disabled () {
        return this.role != '请选择' && this.shop != '请选择' && this.merchant != '请选择' && this.name != '' && this.noid != ''
      }
    }
  }
</script>
