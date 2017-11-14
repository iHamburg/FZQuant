<template>
  <!--
   不传查询全部，0申请中,1待退回,2中止受理,3退货中,4退款中,5已退款,6退款失败
  -->
  <div class="order-box">
      <dl class="order-buyer" @click="gotoDetail(item.orderNo)">
          <dt>
              <span>售后状态</span> <i style="color:red;">{{ getOrderState(item.status) }}</i>
          </dt>

          <!-- <dt v-if="item.status == 0 || item.status == 1 || item.status == 3 || item.status == 4">您还剩余{{ time }}&nbsp;处理客户申请</dt> -->
          <dt v-if="item.status == 0 || item.status == 1 || item.status == 3 || item.status == 4" v-show="item.expiredAt != null">{{titleString}}</dt>

          <dt>申请时间<i>{{ item.publishedAt }}</i></dt>
      </dl>
      <!-- <dl class="order-buyer">
        <dt>售后编号<i>{{ item.saleAfterId }}</i></dt>
        <dt>订单编号<i>{{ item.orderNo }}</i></dt>
        <dt>申请时间<i>{{ item.publishedAt }}</i></dt>
        <dd></dd>
      </dl> -->
      <div class="order-product">
          <div class="probox" v-for="goods in item.goodsList"  @click="gotoDetail(item.orderNo)">
              <span class="picture"><img :src="goods.imgUrl"></span>
              <dl>
                <dt>{{ goods.goodsName }}</dt>
                <dd>
                    <span class="pl">{{ getSkuName(goods.skuName) }} x{{ goods.goodsNum }}</span>
                    <!-- 11/06 产品需求隐藏 -->
                    <!-- <span class="pr">&yen; {{ goods.goodsPrice }}</span> -->
                </dd>
              </dl>
          </div>
          <bl-comli>
              <div slot='right-text' class="right-box">
                <div class="right-r" style="color:#586C94" @click="gotoDetail(item.orderNo)">查看详情 </div>
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
      time: '',
      aftersalesInfo: {},
      titleString: '',
    }
  },
  mounted() {
//    console.log('');
    if (this.item.expiredAt) {
      setInterval(() => {
        // this.time = this.$utillib.countdowm(new Date(this.item.expiredAt.replace(/-/g, "/")).getTime())
        this.titleString = this.$aftersaleslib.generateTitleString(this.item)
      }, 1000)
    }
  },
  methods: {
    getExpiredAtTime() {
      if (this.item.expiredAt != null) {
        var endTime = new Date(this.item.expiredAt.replace(/-/g, "/")).getTime();
        console.log()
        return endTime
      }
    },
    // 不传查询全部，0申请中,1待退回,2中止受理,3退货中,4退款中,5已退款,6退款失败
    getOrderState(orderState) {
      if (orderState == '0') {
        return '申请中 '
      }
      if (orderState == '1') {
        return '待退回 '
      }
      if (orderState == '2') {
        return '中止受理 '
      }
      if (orderState == '3') {
        return '退货中 '
      }
      if (orderState == '4') {
        return '退款中 '
      }
      if (orderState == '5') {
        return '已退款 '
      }
      if (orderState == '6') {
        return '退款失败 '
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
    /*titleString() {
      this.aftersalesInfo = this.item
      let titleString = ''
      if (this.time.indexOf('已超时') < 0) {
        if (this.aftersalesInfo.status == '0') { // 申请中
          titleString = '您还有' + `${this.time}` + '处理客户的申请'
        } else if (this.aftersalesInfo.status == '2') {
          // titleString = '中止受理理由：人为损害，不予退回'
        } else if (this.aftersalesInfo.status == '1' && this.aftersalesInfo.returnType == '0') { // 待退回 物流退回
          titleString = '客户还有' + `${this.time}` + '联系快递寄回商品'
        } else if (this.aftersalesInfo.status == '1' && this.aftersalesInfo.returnType == '1') { // 待退回 到店退回
          titleString = '客户还有' + `${this.time}` + '到店退回商品'
        } else if (this.aftersalesInfo.status == '3') { // 退货中
          titleString = '您还有' + `${this.time}` + '确认退货或中止受理'
        }
      } else {
        if (this.aftersalesInfo.status == '0') { // 申请中
          titleString = '您' + `${this.time}` + '未处理客户的申请，请及时处理！'
        } else if (this.aftersalesInfo.status == '2') {
          // titleString = '中止受理理由：人为损害，不予退回'
        } else if (this.aftersalesInfo.status == '1' && this.aftersalesInfo.returnType == '0') { // 待退回 物流退回
          titleString = '客户' + `${this.time}` + '未快递退回商品，请联系用户及时处理！'
        } else if (this.aftersalesInfo.status == '1' && this.aftersalesInfo.returnType == '1') { // 待退回 到店退回
          titleString = '客户' + `${this.time}` + '未到店退回商品，请联系用户及时处理！'
        } else if (this.aftersalesInfo.status == '3') { // 退货中
          titleString = '您' + `${this.time}` + '未处理客户的退货，请及时处理！'
        }
      }

      return titleString
    },*/
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
      padding: rem(30) 0 rem(30) rem(30);
      background: #FBFBFB;
      font-size: rem(24);
      border-bottom: 1px solid #d9d9d9;
      margin-top: - rem(10);
      dd{
        padding: rem(10) rem(30) rem(5) 0;
        word-wrap: break-word;
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
        padding: rem(22) rem(30) rem(20) 0;
        border-bottom: 1px solid #d9d9d9;
        overflow: hidden;
        .picture{
          width: rem(100);
          height: rem(100);
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
          width: rem(560);
          overflow: hidden;
          float: left;
        }
        dt{
          width: rem(560);
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          font-size: rem(28);
          color: #222;
          margin-bottom: rem(26);
        }
        dd{
          font-size: rem(24);
          color: #666;
        }
      }
      .pr{
        float: right;
        font-size: rem(28);
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
