<style lang="scss" src="src/sass/pinCode.scss" scoped></style>
<template>
  <div class="content">
    <bl-bar barStyle="bar-dark-linear">
        <div class="button" slot="left-button" @click="$router.go(-1)">
          <div class="iconfont arrow-back"></div>
          <i class="fback">返回</i>
        </div>
        <div slot="title">{{ titleText }}</div>
        <div class="button setbtn" slot="right-button" @click="checkVerification">查看流水</div>
    </bl-bar>
    <div class="pincode">
          <bl-comli class="otop" v-if="tab == 1">
              <div slot='left-text' class="left-box">优惠券码</div>
              <div slot='right-text' class="right-box">
                <div class="right-l"> <input type="text" placeholder="必填" ref="couponCode" v-model.trim="couponCode" @keyup="enterVal"> </div>
              </div>
          </bl-comli>
          <bl-comli class="otop" v-if="tab == 2">
              <div slot='left-text' class="left-box">提货码</div>
              <div slot='right-text' class="right-box">
                <div class="right-l"> <input type="text" maxlength="6" placeholder="必填" ref="goodsCode" v-model.trim="goodsCode" @keyup="enterVal"> </div>
              </div>
          </bl-comli>
      <bl-button :disabled="!isVal" @click="verifyCode()">销码</bl-button>
    </div>
  </div>
</template>

<script>

  import couponlib from 'src/libs/couponlib'
  import orderlib from 'src/libs/orderlib'
export default {
    name: 'keepVerifyCodeScan',
    data () {
      return {
        result: '',
        tab: '',
        isVal: false,
        couponCode: '',
        goodsCode: '',
      }
    },

    mixins: [],
    activated() {
      if (this.$route.params.result) {
        console.log('this.$route.params.result', this.$route.params.result);
        this.result = this.$route.params.result
      }
      if (this.$route.params.tab) {
        console.log('this.$route.params.tab', this.$route.params.tab);
        this.tab = this.$route.params.tab
      }
      if (this.tab == '1') {
        this.couponCode = this.result
      } else {
        this.goodsCode = this.result
      }
    },
    methods: {
      /**
       * 确认核销
       */
      verifyCode() {
        if (this.tab == '1') {
          //核销礼品券
          couponlib.verifyCoupon(this.couponCode, (err) => {
            if (err) {
              return this.$toast('核销礼品券码 ' + this.couponCode + '失败:' + err);
            }
            this.$toast('核销礼品券码 ' + this.couponCode + '成功。')
            return this.$router.go(-1)
          });
        } else if (this.tab == '2') {
          if (this.goodsCode.length > 6) {
            this.goodsCode = ''
            return this.$toast('提货码为6位数')
          }
          this.queryDeliveryOrderInfo();
        }
      },

      /**
       * 2006-根据提货码查询订单ID
       */
      queryDeliveryOrderInfo() {
        let self = this
        // this.$toast('提货码：', this.vCode)
        orderlib.queryOrderByDeliveryCode(this.goodsCode, (err, obj) => {
          console.log('扫码结果或者手动输入核销码：', this.goodsCode)
          if (err) {
            console.log('errMsg', err)
            return self.$toast(err)
          }
          if (obj) {
            this.orderNo = obj;
            if (this.orderNo) {
              let deliveryCode = this.goodsCode
              let orderNo = this.orderNo
              this.$router.push({name: '9.1.5.2', params: { deliveryCode, orderNo }});
              this.goodsCode = ''
            }
            console.log('订单id：', obj)
          }
        })
      },
      enterVal() {
        console.log('this.tab：', this.tab)
        if ((this.tab === '1' && (this.couponCode != null && this.couponCode != '')) || (this.tab === '2' && (this.goodsCode != null && this.goodsCode != ''))) {
          this.isVal = true
        } else {
          this.isVal = false
        }
      },
      // 查看核销流水
      checkVerification() {
        if (this.tab == '1') {
          this.$router.push({name: '6.9.5'})
        } else {
          this.$router.push({name: '3.5.1'})
        }
      }
    },
    computed: {
      titleText: function() {
        if (this.tab == '1') {
          return '核销优惠券'
        } else {
          return '核销提货码'
        }
      }
    },
    watch: {
      couponCode: function (newVal) {
        this.couponCode = newVal
        if (this.couponCode != null && this.couponCode != '') {
          this.isVal = true
        } else {
          this.isVal = false
        }
      },
      goodsCode: function (newVal) {
        this.goodsCode = newVal
        if (this.goodsCode != null && this.goodsCode != '') {
          this.isVal = true
        } else {
          this.isVal = false
        }
      },
      tab: function (newVal) {
        this.enterVal()
      }
    }
};
</script>
