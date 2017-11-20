<template>
  <div id="app">
    <adminnav></adminnav>
      <keep-alive :include="/keep/">
          <router-view class="child-view"></router-view>
      </keep-alive>
  </div>
</template>


<script>
  import adminnav from 'components/adminnav';

  export default {

    name: 'app',
    components: { adminnav },
    data() {
      return {
        transitionEnable: false,
        transitionName: null

      }
    },
    created() {

    },
    watch: {
      '$route' (to, from) {
        let isBack = this.$router.isBack;

        // 第一次启动页面动画不启动
        if (this.transitionEnable) {
          if (isBack) {
            this.transitionName = 'slide-right'
          } else {
            this.transitionName = 'slide-left'
          }
        } else {
          this.transitionEnable = true;
        }
        this.$router.isBack = false
      }
    }

  }
</script>
