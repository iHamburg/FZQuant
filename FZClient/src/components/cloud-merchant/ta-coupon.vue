<template>
  <div class="coupon-card" :class="{ 'lose-effect': isFailure }">
    <div class="iconfont arrow-back" v-if="!isFailure"></div>
    <div class="coupon-logo">
      <div class="logo-box">
        <div class="coupon-type flex-c">礼品券</div>
      </div>
    </div>
    <div class="coupon-title flex-c-m" v-if="isCouponName">{{ propsData.couponName }}</div>
    <div class="coupon-title flex-c-m" v-else>
      <div class="discount-text">
        <div class="discount-price">￥30</div>
        <div class="full-term">满299可用</div>
      </div>
    </div>
    <div class="coupon-suggest">
      <div class="coupon-text">{{ propsData.couponDesc }}</div>
      <!-- <div class="scope-of">适用范围：礼品券Test耶里夏利</div> -->
    </div>
    <div class="coupon-body flex-m">
      <div class="coupon-body-item">
        <p class="cate">授权发放数</p>
        <p>{{ propsData.maxCount }}张</p>
      </div>
      <div class="coupon-body-item">
        <p class="cate">已领取</p>
        <p >{{ propsData.receiveNum }}张</p>
      </div>
      <div class="time coupon-body-item">
        <p class="cate">{{ propsData.enableTimeFrom }}</p>
        <p>{{ propsData.enableTimeTo }}</p>
      </div>
    </div>
    <slot name="coupon-btn"></slot>
  </div>
</template>

<script>
export default {

  name: 'coupon-card',

  data () {
    return {

    };
  },
  props: {
    isFailure: Boolean,
    isCouponName: {
      type: Boolean,
      default: true
    },
    propsData: Object
  },
};
</script>

<style lang="scss">
  @import "src/sass/tobe/function";
  .coupon-card{
    margin: rem(30) rem(30) 0;
    border-radius: rem(8);
    padding: 0 rem(55);
    position: relative;
    z-index: 2;
    background: #fff;
    @include full-line(#aaaaaa, transparent, rem(8));
    .arrow-back {
      font-size: .32rem;
      color: #bbbbbb;
      -webkit-transform: rotate(180deg);
      -ms-transform: rotate(180deg);
      transform: rotate(180deg);
      position: absolute;
      top: rem(42);
      right: rem(15);
    }
    .coupon-logo {
      position: absolute;
      top: 0;
      left: 0;
      width: rem(115);
      height: rem(115);
      border-radius: rem(8);
      overflow: hidden;
      .logo-box {
        position: relative;
        height: 100%;
        width: 100%;
        .coupon-type {
          position: absolute;
          bottom: 2px;
          left: 0;
          width: rem(158);
          height: rem(158);
          padding-bottom: rem(4);
          background: #e6133c;
          @include transform(rotate(-45deg));
          @include transform-origin(left bottom);
          @include align-items(flex-end);
          font-size: rem(24);
          color: #FFFFFF;
        }
      }
    }
    .coupon-title {
      height: rem(122);
      font-size: rem(36);
      .discount-text {
        line-height: 1;
        @include display(flex);
        @include align-items(flex-end);
        div {
          font-size: rem(30);
        }
        .discount-price {
          font-size: rem(36);
        }
        .full-term {
          margin-left: rem(16);
          height: rem(26);
          font-size: rem(24);
        }
      }
    }
    .coupon-suggest {
      height: rem(102);
      line-height: rem(36);
      font-size: rem(28);
      padding-bottom: rem(30);
      color: #aaaaaa;
      .coupon-text{
        @include ellipsis;
      }
    }
    .coupon-body {
      height: rem(138);
      @include justify-content(space-between);
      @include hair(top, #cccccc);
      .coupon-body-item{
        @include flex(1);
      }
      p {
        font-size: rem(28);
        line-height: rem(40);
        text-align: center;
      }
      .cate {
        color: #666666;
        font-size: rem(24);
      }
      .time {
        p {
          position: relative;
        }
        p:first-child:after {
          content: "";
          display: block;
          height: 1px;
          width: rem(10);
          background: #333333;
          position: absolute;
          bottom: 0;
          left: 50%;
          @include transform(translateX(-50%));
        }
      }
      .time {
        p {
          position: relative;
        }
        p:first-child:after {
          content: "";
          display: block;
          height: 1px;
          width: rem(10);
          background: #aaaaaa;
          position: absolute;
          bottom: 0;
          left: 50%;
          @include transform(translateX(-50%));
        }
      }
    }
    .coupon-bottom {
      height: rem(86);
      @include hair(top, #cccccc);
      .coupon-btn {
        text-align: center;
        font-size: rem(24);
        color: #F13149;
        @include flex(1);
        line-height: rem(86);
        position: relative;
        @include hairline(right, #aaaaaa);
        &:after{
          right: 0;
          top: rem(28);
          left: auto;
          bottom: auto;
          height: rem(30);
        }
      }
      .coupon-btn:last-child:after {
        content: none;
      }
    }
    /* 失效样式 */
    &.lose-effect{
      background: url("../../assets/i/lose-effect.png") no-repeat right top;
      background-size: rem(122);
      border-color: #DDDDDD;

      .logo-box {
        .coupon-type {
          background: #aaaaaa;
          color: #ffffff !important;
        }
      }
      * {
        color: #aaaaaa !important;
      }
      .cate{
        color: #666666 !important;
      }
      .coupon-body,
      .coupon-bottom,
      .coupon-bottom div {
        border-color: #eeeeee;
      }
    }
  }
  .no-coupon {
    border: none;
    .coupon-img {
      padding-top: rem(130);
      margin-bottom: rem(40);
      img {
        width: rem(240);
      }
    }
    .no-text {
      font-size: rem(28);
      text-align: center;
      line-height: 1;
      color: #444444;
    }
  }
</style>

