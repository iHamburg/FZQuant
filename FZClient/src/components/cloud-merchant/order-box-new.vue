<template>
  <!--
    // orderType: 1待支付 / 2待开单 / 3待发货 / 4待提货 / 5待收货 / 6交易完成 / 7交易关闭 / 8申请售后
    // opBtn: 0发货 / 1待开单 / 2改价格 / 3联系客户 / 4添加备注 / 5物流追踪 / 6核销提货码 / 7查看申请单
  -->
  <div class="order-box">
      <dl class="order-buyer" @click="gotoDetail(item.orderNo)">
          <dt v-if="item.orderState == 01 || item.orderState == 02">
              <span>{{ item.memberName }}</span> <i :class="{'red': item.orderState != 07, 'over': item.orderState == 06}">{{ getOrderState(item.orderState) }} &nbsp;</i>
          </dt>
          <dt v-if="item.orderState == 01 || item.orderState == 02">
              <i :class="{'red': item.orderState != 07, 'over': item.orderState == 06}"> {{ titleString }}</i>
          </dt>

          <dt v-else>
              <span>{{ item.memberName }}</span> <i :class="{'red': item.orderState != 07, 'over': item.orderState == 06}">{{ getOrderState(item.orderState) }}</i>
          </dt>

          <dd><span>{{ item.lowerOrderTime }}</span> <i>订单 {{ item.orderNo }}</i></dd>
      </dl>
      <dl class="notes" v-if="item.sellerRemark != '' || item.buyerRemark != ''" @click="gotoDetail(item.orderNo)">
        <dd class="cancel" v-if="item.buyerRemark">买家备注：{{ item.buyerRemark }}</dd>
        <dd v-if="item.sellerRemark" :class="{'seller': item.sellerRemark}">卖家备注：{{ item.sellerRemark }}</dd>
      </dl>
      <div class="order-product">
          <div class="probox" v-for="(goods,index) in item.goodslist"  v-if="index < 3" @click="gotoDetail(item.orderNo)">
              <span class="picture"><img :src="goods.goodsImg"></span>
              <dl>
              <dt>{{ goods.goodsName }}</dt>
                <dd>货号：{{ goods.freightNo }}</dd>
                <dd>
                    <span class="pl">{{ getSkuName(goods.skuName) }}&nbsp;&nbsp; x{{ goods.goodsNum }}</span>
                    <span class="pr">&yen; {{ goods.goodsAmt }}</span>
                </dd>
              </dl>
          </div>
          <bl-comli class="comlistyle">
              <div slot='left-text' class="left-box">
                <span v-if="item.orderState == 01 || item.orderState == 07">应付</span>
                <span v-else>实付</span>
                <em>&yen;{{ item.shouldMoney }}</em>  共{{ item.totalGoodsNum }}件
              </div>
              <div slot='right-text' class="right-box">
                <div class="right-r"  @click="gotoDetail(item.orderNo)">查看详情 </div>
                <div class="iconfont arrow-back"></div>
              </div>
          </bl-comli>

          <slot name="button"></slot>
      </div>
  </div>
</template>
<script>

export default {

  name: 'orderBox',
  props: {
    item: Object,
  },
  data () {
    return {
      titleString: '',
    }
  },
  mounted() {
    this.$nextTick(() => {
      setInterval(() => {
        this.titleString = this.$orderlib.getCountDownStatus(this.item.timeOut * 1000, 1)
      })
    })
  },
  methods: {
    // 展示订单状态
    getOrderState(orderState) {
      if (orderState == '01') {
        return '待支付 '
      }
      if (orderState == '02') {
        return '待开单 '
      }
      if (orderState == '03') {
        return '待发货 '
      }
      if (orderState == '04') {
        return '待收货 '
      }
      if (orderState == '05') {
        return '待提货 '
      }
      if (orderState == '06') {
        return '交易完成 '
      }
      if (orderState == '07') {
        return '交易关闭 '
      }
      if (orderState == '09') {
        return '待退款 '
      }
    },
    //页面跳转：商品详情页
    gotoDetail(orderNo) {
//      this.$router.replace({name: '9.1.2', params: {orderNo}})

      this.$emit('pushDetails', orderNo);
    },
    // SkuName名称截取.
    getSkuName(skuName) {
      if (skuName != null) {
        let skuNameIndex = skuName.indexOf(",");
        if (skuNameIndex > 0) {
          let sname = skuName.split(',');
          return sname[0] + '  ' + sname[1];
        } else {
          return skuName;
        }
      }
    },
  },
  computed: {

  }
};
</script>

<style lang="scss" scoped>
  @import "src/sass/tobe/function";
    .order-box{
      background: #fff;
      margin-bottom: rem(30);
    }

    .order-buyer{
      padding: rem(30);
      border-bottom: 1px solid #d9d9d9;
      dt{
        overflow: hidden;
        clear: both;
        span{
          float: left;
          font-size: rem(34);
          color: #000;
        }
        i{
          float: right;
          font-style: normal;
          font-size: rem(28);
          color: #999;
        }
        .red{
          color: #F76260;
        }
        .over{
          color: #00A699;
        }
      }
      dd{
        font-size: rem(24);
        color: #888;
        overflow: hidden;
        clear: both;
        span{
          float: left;
        }
        i{
          float: right;
          font-style: normal;
        }
      }

    }
    .notes{
      padding: 0 rem(30);
      background: #FBFBFB;
      font-size: rem(24);
      border-bottom: 1px solid #d9d9d9;
      margin-top: - rem(10);
      dd{
        padding: rem(10) rem(30) rem(5) 0;
        word-wrap: break-word;
      }
      dd:first-child{
        padding-top: rem(40);
      }
      dd:last-child{
        padding-bottom: rem(30);
      }
      .seller{
        color: #4B4B64;
      }
      .buyers{
        color: #00A699;
      }
      .cancel{
        color: #00A699;
        padding: rem(0) rem(30) rem(5) 0;
        border-bottom: 1px solid #d9d9d9;
      }
    }
    .order-product{
      padding-left: rem(30);
      background: #fff;
      .probox{
        padding: rem(22) rem(20) rem(20) 0;
        // background: red;
        border-bottom: 1px solid #d9d9d9;
        overflow: hidden;
        .picture{
          width: rem(125);
          height: rem(125);
          overflow: hidden;
          float: left;
          text-align: center;
          margin-right: rem(30);
          img{
            width: auto;
            height: 100%;
          }
        }
        dl{
          width: rem(540);
          // background: green;
          overflow: hidden;
          float: left;
        }
        dt{
          width: rem(540);
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          font-size: rem(28);
          color: #222;
          margin-bottom: rem(6);
        }
        dd{
          font-size: rem(26);
          color: #666;
        }
      }
      .pr{
        float: right;
        font-size: rem(28);
        margin-right: rem(15);
      }
      .badge-list{
        font-size: rem(28);
        color: #666;
        padding: 0;
        em{
          font-style: normal;
          color: #F76260;
        }
      }
      .editbtn{
        padding: rem(20) rem(30);
        text-align: right;
        button{
          color: #4B4B64;
          font-size: rem(26);
          padding: rem(10) rem(24);
          border: 1px solid #66667B;
          border-radius: rem(5);
          background: #fff;
          display: inline-block;
          margin: 0 rem(24) 0 0;
        }
        button:active {
          @include addclickcolor();
        }
        .red{
          color: #F76260;
          border:1px solid #F76260;
        }
      }
    }

    .arrow-back{
      color: #999;
    }
    .left-box{
      margin: 0 rem(40) 0 0;
    }
    .right-box{
      @include flex(1);
      @include display(flex);
      @include align-items(center);
      @include justify-content(space-between);
      height: 100%;
      .right-l{
        @include flex(1);
        padding-right: rem(20);
        color: #B2B2B2;
        input{
          width: 100%;
          border: none;
          outline: none;
        }
      }
      .right-r{
        @include flex(1);
        padding-right: rem(0);
        color: #B2B2B2;
        text-align: right;
      }
      .arrow-back{
        color: #C7C7CC!important;
        line-height: 1;
      }
      .red{
        color: #F76260;
      }
    }
</style>
