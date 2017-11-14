<template>
  <div id="app">
    <transition :name="transitionName">
      <keep-alive :include="/keep/">
          <router-view class="child-view"></router-view>
      </keep-alive>
    </transition>
  </div>
</template>

<style lang="css">
  .child-view {
    position: absolute;
    width:100%;
    height: 100%;
    /*overflow-y: auto;*/
    transition: transform .3s ease;
  }
  .slide-left-enter, .slide-right-leave-active {
    /*opacity: 0;*/
    -webkit-transform: translate(100%, 0);
    transform: translate(100%, 0);
  }
  .slide-left-leave-active, .slide-right-enter {
    /*opacity: 0;*/
    -webkit-transform: translate(-100%, 0);
    transform: translate(-100%, 0);
  }

</style>
<script>
  export default {

    name: 'app',

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
