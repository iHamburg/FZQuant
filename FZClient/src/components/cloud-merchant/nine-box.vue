<template>
<li>
    <a href="javascript:;">
        <span class="code">{{ itemData.number }}</span>
        <div class="txt">{{ itemData.describe }}</div>
    </a>
</li>
</template>

<script>
export default {
  name: 'ninebox',
  data () {
    return {
    }
  },
  props: {
    itemData: Object
  }
}
</script>
<style lang="scss">
@import "src/sass/tobe/function";
.ninebox {
  ul{
    font-size: 0;
    overflow: hidden;
    background-color: #ffffff;
    li{
      float: left;
      width: 33.333%;
      text-align: center;
      padding: rem(30) 0;
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
      background-origin: border-box;
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
    li:active {
      opacity: 0.5;
      // background: #ccc;
    }
    li:nth-child(3n){
      border-right: none;
    }
  }
}
</style>
