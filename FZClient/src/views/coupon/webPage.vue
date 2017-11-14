<style lang="scss" src="src/sass/check.scss" scoped></style>
<template>
  <div class="content parking-bg" :class="{'divClass1': !header,divClass: header}" >
  <bl-bar v-if="header" barStyle="bar-dark-linear">
    <div class="button" slot="left-button" @click="clickBack">
      <div class="iconfont arrow-back"><i class="fback">返回</i></div>
    </div>
    <div slot="title">{{ headerName }}</div>
  </bl-bar>
    <!--<div class="divIfr">-->
<iframe ref = 'iframe1' :src ='src' frameborder="0"  @load="iframeLoad" ></iframe>
    <!--</div>-->
  </div>
</template>

<style>
  /*.divIfr {*/
    /*!*-webkit-overflow-scrolling: touch;*!*/
    /*!*overflow-y: scroll;*!*/
    /*width: 100%;*/
    /*height: 100%;*/
  /*}*/
  iframe {
    width: 100% !important;
    height: 100%;
  }
</style>

<script >
  export default {
    name: 'webPage',
    data () {
      return {
        src: '',
        header: true,
        headerName: '网页',
        pageNumber: 0,
      }
    },
    created() {
      console.log('created---', JSON.stringify(this.$route.params) + ' --- ' + window.history.length)
      this.pageNumber = window.history.length;
      if (this.$route.params.header) {
        this.header = !!Number(this.$route.params.header);
        if (this.$route.params.headerName) {
          this.headerName = this.$route.params.headerName;
        };
      }
      if (this.$route.params.url) {
        this.src = this.$route.params.url
      }
    },
    mounted() {
    },
    methods: {
      iframeLoad() {
        console.log('iframeLoad-- ' + navigator.userAgent)
        if (navigator.userAgent.indexOf("iPhone") == -1) {
          console.log('非iphoen')
          this.$refs.iframe1.style['width'] = '100%'
          this.$refs.iframe1.style['height'] = '100%'
        }
      },
      clickBack() {
        //console.log('=== ', this.pageNumber - window.history.length)
        this.$router.go(this.pageNumber - window.history.length - 1);
        //this.$router.go(-1);
      }
    }
  }
</script>
