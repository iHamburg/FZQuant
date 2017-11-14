<style lang="scss" src="src/sass/user.scss" scoped></style>
<template>
  <div class="user-content write">
    <bl-bar barStyle="bar-dark-write">
        <div class="button" slot="left-button" @click="$router.go(-1)">
          <div class="iconfont close"></div>
        </div>
        <div slot="title" style="color:#000">{{ title }}</div>
    </bl-bar>

    <div style="padding: .3rem;">
        <iframe :src="link" style="border:0;width:100%;height:10rem;"></iframe>
    </div>


  </div>
</template>

<script>
export default {
  name: 'Agreement',
  components: {
  },
  mounted() {

  },
  created() {
    this.$servicelib.getAgreementUrl(obj => {
      console.log('result obj:', JSON.stringify(obj))
      this.link = obj.agreementUrl;
    })
  },
  data () {
    return {
      title: '百联会员注册协议',
      link: ''
    }
  },
  computed: {
  },
  methods: {
  }
}
</script>
