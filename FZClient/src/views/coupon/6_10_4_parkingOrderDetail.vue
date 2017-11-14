<style lang="scss" src="src/sass/parkinglot.scss" scoped></style>
<template>
  <div class="content-parking write">

    <bl-bar barStyle="bar-dark-linear">
        <div class="button" slot="left-button" @click="$router.go(-1)">
          <div class="iconfont arrow-back"><i class="fback">返回</i></div>
        </div>
        <div slot="title">订单详情</div>
    </bl-bar>

    <div class="mark-box">
          <div class="check-content">

              <div class="checkbox">
                  <div class="check-card">
                      <div class="card">{{ item.hours }}小时
                        <span>停车券</span>
                      </div>
                      <dl>
                          <dt>{{ item.couponTitle }}</dt>
<!--                           <dd>应付金额：{{ item.shouldMoney }} 元</dd>
                          <dd>购买张数：{{ item.purchasedNum }} 张</dd>
                          <dd class="time">下单时间：{{ item.createDate }}</dd> -->
                      </dl>
                  </div>
              </div>
              <div class="detail">
                <h2>用券规则</h2>
                <p>有效时间：领取后{{ item.effectDay }}天内可用</p>
                <p>门槛条件：无门槛</p>
                <p>使用范围：{{ item.storeName }}</p>
                <p>每人可领：{{ item.perMenTakeNum }} 张</p>
                <p>每天可领：{{ item.perDayTakeNum }} 张</p>

                <h2>订单详情</h2>
                <p>订单编号：{{ item.orderCode }}</p>
                <p>下单时间：{{ item.createDate }}</p>
                <p>应付总额：{{ item.shouldMoney }} 元</p>
                <p>购券张数：{{ item.purchasedNum }} 张</p>

              </div>
          </div>
    </div>

    <div class="editbar">
<!--         <button @click="buyParkTicket">继续购买</button>
        <button @click="onStopCoupon">暂停发放</button> -->
        <button @click="distributeCoupon">立即发券</button>
    </div>

  </div>

</template>

<script>
export default {
  name: 'parkingRecord',
  components: {},
  data () {
    return {
      item: {},
    }
  },

  created() {
    this.orderCode = this.$route.params.id;
    console.log('orderCode:', this.orderCode)
    this.queryParkingOrderDetail()
  },

  methods: {
    // 2201-商户购券订单详情接口
    queryParkingOrderDetail() {
      let param = {
        orderCode: this.orderCode
      }
      this.$orderlib.queryParkingOrderDetail(param, (err, obj) => {
        if (err) {
          return this.$toast(err)
        }
        if (obj) {
          this.item = obj
          console.log('订单详情接口:', JSON.stringify(this.item))
        }
      })
    },
    // 进购买停车券页面
    buyParkTicket() {
      this.$router.push({name: '6.10.1'})
    },
    // 立即发券，进发券页面
    distributeCoupon() {
      this.$router.push({name: '6.10.6', params: {id: this.item.couponTemplateId}})
    },
    /**
     * 停止发放
     * @param item
     */
    onStopCoupon(item) {
      console.log('stopCoupon', item);
      this.$modal({
        content: '您确定暂停发放该停车券？',
        buttons: [
          { text: '取消',
            onClick: () => {}
          },
          { text: '确定',
            onClick: () => {
              this.stopCoupon();
            }
          },
        ]
      });
    },
    /**
     * 暂停发放优惠券
     */
    stopCoupon() {
      // 需要停止的优惠券
      console.log('to stop coupon', this.item);
      let params = {
        couponTemplateId: this.orderCode,
        currentState: this.item.status,
        status: ""
      }

      console.log('params ', params);
      this.$couponlib.updateFullCutCouponStatus(params, (err) => {
        if (err) {
          return this.$toast(err)
        }
        this.$toast('操作成功')
      })
    },
  }

}
</script>
