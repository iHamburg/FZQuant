<!-- 九宫格组件 -->
<template>
<li @touchstart="">
    <a href="javascript:;" >
        <i v-if="homePage.count"></i>
        <img :src="homePage.imgUrl">
        <div class="txt">{{homePage.describe}}</div>
    </a>
</li>
  <!--</router-link>-->
</template>

<script>
export default {
  name: 'homepageEntrance',
  data () {
    return {
    }
  },
  mounted() {
    // console.log('mounted', this.$utillib.fmtDate(new Date(), 'yyyy-MM-dd hh:mm:ss'))
  },
  props: {
    homePage: Object
  }
}
</script>
<style lang="scss">
@import "src/sass/tobe/function";
.scratchableLatex {
  ul{
    font-size: 0;
    overflow: hidden;
    background-color: #ffffff;
    background-origin: border-box;
    li{
      float: left;
      width: 33.333%;
      text-align: center;
      padding:rem(42) 0;
      position: relative;
      @include hairline(bottom, #ececec);
      &:before {
          content: '';
          position: absolute;
          right: 0;
          top: 0;
          left: auto;
          bottom: auto;
          width: 1px;
          height: 100%;
          background-color: #ececec;
          display: block;
          z-index: 15;
          transform-origin: 100% 50%;
          @media only screen and (-webkit-min-device-pixel-ratio: 2) {
              transform: scaleX(0.5);
          }

      }

      i{
        width: 8px;
        height: 8px;
        position: absolute;
        background: #FD001F;
        right: rem(80);
        top: rem(30);
        border-radius: 4px;
        font-style: normal;
        color: #fff;
        text-align: center;
        line-height: 10px;
      }
      a{
        img{
          width: rem(56);
          height: auto;
          margin-bottom: rem(22);
        }
        .txt{
          font-size: rem(28);
          color: #222222;
          line-height: rem(28);
        }
      }
    }
    li:nth-child(3n) {
       &:before{
         width: 0px;
       }
    }
  }
  li:active {
    opacity: 0.5;
    // background: #ccc;
  }
  .setbtn{
    position: absolute;
    right:0;
    top:0;
  }
}
</style>
