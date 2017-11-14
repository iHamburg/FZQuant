<!-- 订单核销 -->
<style lang="scss" src="src/sass/orderStatus.scss" scoped></style>

<template>
  <div class="content">
    <bl-bar barStyle="bar-dark-linear">
        <div class="button" slot="left-button" @click="$router.go(-1)">
          <div class="iconfont arrow-back"><i class="fback">返回</i></div>
        </div>
        <div slot="title">核销</div>
    </bl-bar>
    <div class="order-details">
        <div class="order-status">
            <dl><i></i>
                <dt>{{ getOrderState(orderData.orderState) }}</dt>
                <dd>订单编号：{{ orderData.orderNo }}</dd>
                <dd>销售单号：{{ orderData.salesNumber }}</dd>
            </dl>
            <button @click="isTicket = !isTicket">查看小票</button>
        </div>
        <div class="order-product">
            <div class="probox" v-for="item in orderData.goodsList">
                <span class="picture"><img :src="item.imgUrl"></span>
                <dl>
                  <dt>{{ item.goodsName }}</dt>
                  <dd>
                      <span class="pl">{{ item.skuName }} x{{ item.goodsNum }} </span>
                      <span class="pr">&yen;{{ item.goodsPrice }}</span>
                  </dd>
                </dl>
            </div>
        </div>

        <ul class="order-pay">
          <li>
              <span>商品总额</span>
              <i>&yen;{{ orderData.orderAmt }}</i>
          </li>
          <li v-if="orderData.favorableMoney > 0">
            <span>商户促销优惠</span>
            <i>-&yen;{{ orderData.favorableMoney }}</i>
          </li>
          <li v-if="orderData.merchantAmount > 0">
            <span>商户改价优惠</span>
            <i>-&yen;{{ orderData.merchantAmount }}</i>
          </li>
          <li v-if="orderData.merchantDiscountAmount > 0">
              <span>商户券优惠</span>
              <i>-&yen;{{ orderData.merchantDiscountAmount }}</i>
          </li>
          <li style="color:#ff0000">
            <span>开单金额</span>
            <i>&yen;{{ orderData.singleAmount }}</i>
          </li>
          <li v-if="orderData.platformDiscountAmount > 0">
              <span>平台券优惠</span>
              <i>-&yen;{{ orderData.platformDiscountAmount }}</i>
          </li>
          <li style="color:#ff0000">
            <span>商品实付金额</span>
            <i>&yen;{{ orderData.billingAmount }}</i>
          </li>
          <li>
            <span>运费</span>
            <!-- 当接口返回字符串null时 显示0-->
            <i>&yen;{{ (orderData.carriageMoney === 'null' ? 0 : orderData.carriageMoney) }}</i>
          </li>
          <li class="pay">
            <span v-if="orderData.orderState == 01 || orderData.orderState == 07">应付金额</span>
            <span v-else>实付金额</span>
            <i>&yen;{{ orderData.shouldMoney }}</i>
          </li>
        </ul>
        <bl-button style="width: 90%;margin-top: 20px;" @click="verifyCode()">确定核销</bl-button>
    </div>
    <!-- 查看小票 -->
    <bl-modal :buttons="Tickets" v-if="isTicket" class="tickets">
      <div slot="inner">
          <img :src="orderData.receiptUrl">
      </div>
    </bl-modal>
  </div>
</template>

<script>
import orderlib from 'src/libs/orderlib'
export default {

  name: 'verifyOrderInfo',
  data () {
    return {
      isTicket: false,
      deliveryCode: null, // 提货码
      orderNo: null, // 订单号
      orderData: {}, // 订单详情
      // 查看小票
      Tickets: [{
        text: '取消',
        onClick: () => {
          this.isTicket = false
        }
      }],
    };
  },

  mounted() {
    this.deliveryCode = this.$route.params.deliveryCode
    this.orderNo = this.$route.params.orderNo
    console.log('提货码：', this.deliveryCode)
    console.log('订单id：', this.orderNo)
    this.queryOrderDetail();
  },
  methods: {
    /**
     * 2003-查询订单详情
     */
    queryOrderDetail() {
      orderlib.queryOrder(this.orderNo, (err, obj) => {
        if (err) {
          this.$toast(err)
        } else if (obj) {
          this.orderData = obj
          console.log('订单详情：', JSON.stringify(obj))
        }
      })
    },

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
    },

    /**
     * 2013-核销订单提货码 @author 黄凤秀
     * @param memberId
     * @param merchantId
     * @param orderNo 订单id
     * @param deliveryCode 提货码
     * @param callback
     */
    verifyOrderCode() {
      let self = this
      console.log('orderNo:', this.orderNo, 'deliveryCode:', this.deliveryCode)
      orderlib.verifyOrderDeliveryCode(this.orderNo, this.deliveryCode, (err, obj) => {
        console.log('err', err, 'obj', obj)
        if (err) {
          console.log('err', err)
          return self.$toast('核销失败')
        }
        this.$toast('核销成功')
        this.$router.go(-1)
      })
    },
    //确认销核
    verifyCode() {
      let self = this;
      let content = '核销前请确认提货商品货品齐备，一旦核销视为双方交易完成'
      let sureButton = '确定核销'
      let title = '核销提货码'
      self.$modal({
        title,
        content,
        buttons:
        [
          {text: '取消', onClick: function() {}},
          {text: sureButton,
            onClick: function () {
              self.verifyOrderCode()
            }
          }
        ]
      })
    }
  },
};
</script>
