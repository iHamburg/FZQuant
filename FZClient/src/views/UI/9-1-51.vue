<template>
  <div class="content">

    <bl-bar barStyle="bar-dark-linear">
        <div class="button" slot="left-button" @click="$router.go(-1)">
          <div class="iconfont arrow-back"><i class="fback">返回</i></div>
        </div>
        <div slot="title">核销</div>
    </bl-bar>

    <div class="pincode">
      <bl-navbar v-model="selected">
        <bl-tab-item id="1">优惠券码</bl-tab-item>
        <bl-tab-item id="2">提货码</bl-tab-item>
      </bl-navbar>
      <bl-tab-container v-model="selected">
        <bl-tab-container-item id="1">
          <bl-comli class="otop">
              <div slot='left-text' class="left-box">优惠券码</div>
              <div slot='right-text' class="right-box">
                <div class="right-l"> <input type="text" placeholder="必填" ref="coCode" v-model="cText" @keyup="enterVal"> </div>
                <i class="shao"></i>
              </div>
          </bl-comli>
        </bl-tab-container-item>

        <bl-tab-container-item id="2">
          <bl-comli class="otop">
              <div slot='left-text' class="left-box">提货码</div>
              <div slot='right-text' class="right-box">
                <div class="right-l"> <input type="text" placeholder="必填" ref="deCode" v-model="dText" @keyup="enterVal"> </div>
                <i class="shao"></i>
              </div>
          </bl-comli>
        </bl-tab-container-item>
      </bl-tab-container>

      <bl-button :disabled="!isVal">销码</bl-button>

    </div>
  </div>

</template>

<script>
// import api from 'src/api/index'
export default {
  name: 'pinCode',
  components: {
  },
  mounted() {
    this.enterVal()
  },

  data () {
    return {
      selected: '1',
      isVal: false,
      cText: '',
      dText: ''
    }
  },
  computed: {
  },
  methods: {
    enterVal() {
      if (this.$refs.coCode.value.length > 0 || this.$refs.deCode.value.length > 0) {
        this.isVal = true
      }
    }
  }
}
</script>
