<template>
  <div class="batch-card">
      <!--<i class="tabicon" v-if="goods.sbool" :class="goods.style">{{goods.txt}}</i>-->

      <slot name="check"></slot>
      <em>{{itemData.couponType}}</em>
      <dl>
        <dd><h2>{{itemData.couponName}}</h2></dd>
        <dd>{{itemData.couponDesc}}</dd>
        <dd>使用期限 {{itemData.enableTimeFrom}} - {{itemData.enableTimeTo}}</dd>
      </dl>
  </div>
</template>

<script>
export default {

  name: 'coupon-new-card',

  data () {
    return {

    };
  },
  props: {
    itemData: Object
  },
  mounted() {

  },
  methods: {

  },
  computed: {

  }
};
</script>

<style lang="scss" scoped>
  @import "src/sass/tobe/function";
  .batch-card{
    padding: rem(40) 0;
    clear: both;
    border-bottom: 1px solid #d9d9d9;
    position: relative;
    em{
      width:rem(160);
      height: rem(160);
      overflow: hidden;
      float: left;
      margin:0 rem(20) 0 0;
    }
    dl{

      font-size: 12px;
      dd{
        color: #888;
        h2{
          color: #000;
          font-weight: 100;
          font-size: 14px;
        }
      }

    }
    .rate{
      background-color: #00A699;
      height: rem(30);
      color: #fff;
      text-align: center;
      padding: 0 rem(8);
      position: absolute;
      right: rem(30);
      margin: rem(5) 0 0;
      line-height: rem(30);
      overflow: hidden;
      border-radius: rem(1);

      i{

        padding:0;
        margin:0;
        font-style: normal;
        -webkit-transform: scale(0.50);
      }
    }
    .checkicon{padding:0;}
    .tabicon{
      font-style: normal;
      font-size: 12px;
      position: absolute;
      left: - rem(50);
      top: rem(40);
      padding: 0 rem(15) 0 rem(35);
      color: #fff;
      border-radius: rem(5);
    }
    /* tabColor 无货/待审核/已下架/审核不通过/草稿*/
    .no-goods{
      background-color: #F68C6D;
    }
    .pend-goods{
      background-color: #00A699;
    }
    .under-goods{
      background-color: #999;
    }
    .audit-goods{
      background-color: #F76260;
    }
    .draft-goods{
      background-color: #4B4B64;
    }

  }
</style>
