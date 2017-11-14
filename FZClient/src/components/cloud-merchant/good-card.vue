<template>
  <div>
    <div class="batch-card">
      <i class="tabicon" v-if="itemData.sbool" :class="itemData.style">{{ itemData.txt }}</i>

      <slot name="check"></slot>
      <em><img :src="itemData.goodsImg"></em>
      <dl>
        <dd><h2>{{ itemData.goodsName }}</h2></dd>
        <dd>货号：{{ itemData.freightNo }}</dd>
        <dd>吊牌价：&yen;{{ itemData.tagPrice }}</dd>
        <dd>售价：&yen;{{ itemData.price }} <span :class="{'rate':discountType, 'rate1': !discountType}" v-if="true"><i>折扣率{{ itemData.discount }}%</i></span></dd>
      </dl>
    </div>
<!--     <div class="salepad">
      <a class="rline" :class="goodsSKUManageClass" @click.stop="onGoodsSKUManage(goods)">SKU库存管理</a>
      <a class="rline" @click.stop="onqrCode(goods)">添加商品二维码</a>
      <a class="rline" :class="newClass" @click.stop="onEditGoods(goods)">编辑商品</a>
    </div> -->
  </div>

</template>



<script>

  export default {
    name: 'batch-card',

    data () {
      return {
        discountType: true,
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
  }
</script>

<style lang="scss" scoped>
  @import "src/sass/tobe/function";
  .batch-card{
    padding: rem(40) 0;
    clear: both;
    border-bottom: 1px solid #d9d9d9;
    position: relative;
    height: rem(240);
    em{
      width:rem(160);
      height: rem(160);
      overflow: hidden;
      float: left;
      margin:0 rem(20) 0 0;
    }
    img{
      width: 100%;
      height: 100%;
    }
    dl{
      overflow:hidden;
      text-overflow:ellipsis;
      white-space:nowrap;
      font-size: rem(24);
      padding: 0 rem(30) 0 0;
      dd{
        overflow:hidden;
        text-overflow:ellipsis;
        white-space:nowrap;
        color: #888;
        padding: rem(2) 0;
        h2{
          color: #000;
          font-weight: 100;
          font-size: rem(28);
          overflow:hidden;
          text-overflow:ellipsis;
          white-space:nowrap;
        }
      }

    }
    .rate{
      background-color: #00A699;
      height: rem(30);
      color: #fff;
      text-align: center;
      padding: rem(2) rem(8);
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
    .rate1{
      background-color: #F76260;
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
  .salescard{
    padding: 0 0 0 rem(30);
    border-bottom: 1px solid #d9d9d9;
    a{
      color: #66667b;
      font-size: 14px;
      height: rem(28);
      line-height: rem(28);
      display: inline-block;
      width: 32.3%;
      text-align: center;
    }
    .dcolor{
      color: #ccc;
    }
    .rline{
      border-right:1px solid #ccc;
    }
    .salepad{
      padding: rem(30) 0;
    }
  }
</style>
