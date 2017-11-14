<!-- 九宫格组件 -->
<template>
  <li @touchstart="">
    <a href="javascript:;" >
      <i v-if="itemData.count"></i>
      <div v-if="itemData.imgUrl"><img :src="itemData.imgUrl"></div>
      <span class="code" v-if="itemData.number != null">{{ itemData.number }}</span>
      <div class="txt">{{itemData.describe}}</div>
    </a>
  </li>
</template>

<script>
export default {
  name: 'BLCloudStoreGrid',
  data () {
    return {

    }
  },
  mounted() {
    // console.log('mounted', this.$utillib.fmtDate(new Date(), 'yyyy-MM-dd hh:mm:ss'))
  },
  props: {
    itemData: Object
  }
}
</script>
<style lang="scss">
@import "src/sass/tobe/function";
.blcloudstoregrid {
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
        .code{
          width: 100%;
          font-size: rem(48);
          color: #F76260;
          text-align: center;
          padding: 0 0 rem(30) 0;
          display: inline-block;
          overflow: hidden;
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
    @include addclickcolor();
  }
  .setbtn{
    position: absolute;
    right:0;
    top:0;
  }
}
</style>
