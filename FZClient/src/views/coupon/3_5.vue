<!-- 销券流水 -->
<style lang="scss" src="src/sass/management.scss" scoped></style>
<template>
  <div class="content management">
    <bl-bar barStyle="bar-dark-linear">
        <div class="button" slot="left-button" @click="$router.go(-1)">
          <div class="iconfont arrow-back"></div>
          <i class="fback" >返回</i>
        </div>
        <div slot="title">核销流水</div>
    </bl-bar>


    <bl-button @click="goVerifiedCoupons('6.9.5')">查看券核销流水</bl-button>

    <bl-button @click="goVerifiedCoupons('3.5.1')">查看提货码核销流水</bl-button>

  </div>

</template>

<script>
export default {
  name: 'management',

  components: {
  },
  mounted() {

  },
  data () {
    return {

    }
  },
  methods: {
    goVerifiedCoupons(param) {
      this.$router.push({name: param})
    }
  }

}
</script>
