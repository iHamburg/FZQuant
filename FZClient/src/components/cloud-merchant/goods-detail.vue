<template>
  <div class="head-li">
    <div class="badge-left">
      <!--<div class="logo-box">-->
        <!--<div class="coupon-type flex-c">{{stateName(goodsData.goodsState,goodsData.stockState)}}</div>-->
      <!--</div>-->
      <div class="listImg"><img :src="goodsData.goodsImg"></div>
      <div class="head-title">
        <div class="title-name">{{goodsData.goodsName}}</div>
        <div class="describe">货号：{{goodsData.freightNo}}</div>
        <div class="describe">吊牌价：{{goodsData.tagPrice}}</div>
        <div class="describe">售价：{{goodsData.price}}</div>
        <div class="describe">状态：{{stateName(goodsData.goodsState,goodsData.stockState)}}</div>
        <div class="describe">扣率3%</div>
      </div>
    </div>
    <slot name="switch"></slot>
  </div>
</template>

<script>
  export default {
    name: 'goodsDetail',
    data () {
      return {

      }
    },
    props: {
      goodsData: Object
    },
    methods: {
      stateName (goodsState, stockState) {
        let stateName = '';
        if (goodsState == 2 && stockState == 1) {
          stateName = '有货'
        } else if (goodsState == 2 && stockState == 0) {
          stateName = '无货'
        } else if (goodsState == 1) {
          stateName = '待审核';
        } else if (goodsState == 3) {
          stateName = '已下架';
        } else if (goodsState == 4) {
          stateName = '审核不通过';
        } else if (goodsState == 0) {
          stateName = '草稿';
        }

        return stateName;
      }
    }
  }
</script>
<style lang="scss">
  @import "src/sass/tobe/function";
  .head-li {
  .distribute-button {
    background: #455A64;
    border-radius: rem(8);
    border: 0px;
  a {
    color: #ffffff !important;
  }
  }
  @include display(flex);
  @include align-items(center);
  @include justify-content(space-between);
  @include hair(bottom, #d9d9d9);
  background-origin: border-box;
  padding: rem(30) 0;
  padding-right: rem(30);
  .badge-left,
  .badge-right {
  @include display(flex);
  @include align-items(center);
  }
  .badge-right {
  .arrow-back {
  @include transform(rotate(180deg));
    font-size: rem(28);
    color: #c8c8cd;
    margin-left: rem(14);
  }
  .distribute-button {
    height: rem(60);
    line-height: rem(60);
    text-align: center;
    font-size: rem(24);
    width: rem(140);
    border-radius: rem(8);
  a {
    color: #f13149;
  }
  }
  }
  .listImg {
  img {
    position: relative;
    width: rem(128);
    height: rem(128);
  .distribute-button {
    height: rem(60);
    line-height: rem(60);
    text-align: center;
    font-size: rem(24);
    width: rem(140);
    border-radius: rem(8);
    border: 1px solid #f13149;
    color: #f13149;
  a {
    color: #f13149;
  }
  }
  margin-right: rem(20);
  border-radius: 50%;
  }
  }
  &.i-shape {
     position: relative;
     width: rem(100);
     height: rem(100);
     border-radius: 100%;
   @include full-line(#c9c9c9, transparent, 100%);
     margin-right: rem(20);
   }
  .right-charact {
    color: #aaaaaa;
    font-size: rem(32);
    line-height: 1;
  }
  .circle-num {
    width: rem(36);
    height: rem(36);
    border-radius: 100%;
    font-size: rem(24);
    color: #FFFFFF;
    background: #F43530;
    text-align: center;
    line-height: rem(36);
  }
  .head-num {
    position: absolute;
    top: rem(-8);
    right: rem(-8);
  }
  .title-name {
    font-size: rem(36);
    color: #222222;
  }
  .describe {
    font-size: rem(24);
    color: #aaaaaa;
  }
  .title-s {
    margin-right: rem(14);
    font-size: rem(32);
    line-height: 1;
  }
  .square-label {
    height: rem(36);
    line-height: rem(36);
    padding: 0 rem(10);
    color: #FFFFFF;
    background: #F43530;
    font-size: rem(24);
    border-radius: rem(6);
  }
  }
  .head-li {
    padding: rem(24) rem(30) rem(24) 0;
  .right-charact {
    font-size: rem(24);
  }
  }
</style>
