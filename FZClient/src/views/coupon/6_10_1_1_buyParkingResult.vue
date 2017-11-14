<style lang="scss" src="src/sass/check.scss" scoped></style>
<template>
  <div class="content parking-bg">
    <bl-bar barStyle="bar-dark-linear">
      <div class="button" slot="left-button" @click="$router.go(-2)">
        <div class="iconfont arrow-back"><i class="fback">返回</i></div>
      </div>
      <div slot="title">购买停车券</div>
    </bl-bar>
    <div class="parking-main">
      <div :class="{'padking-icon-1': !resultT, 'padking-icon-2': resultT}"></div>
      <div class="parking-font">{{ resultStr }}</div>
      <div class="parking-list-font">订单编号：{{ orderNumber }}<br>支付金额：¥{{ price }}</div>
      <div class="parking-button">
        <bl-button v-if="resultT" class="mt30" @click="$router.go(-2)">继续购买</bl-button>
        <bl-button v-if="resultT" type="other" class="mt30" @click="clickedParkingDetail" >查看券详情</bl-button>
      </div>
    </div>
  </div>
</template>

<script>

  export default {
    name: 'check',
    components: {
    },
    created() {
      this.resultT = !!Number(this.GetQueryString('result'));
      this.orderNumber = this.GetQueryString('orderNo');
      this.price = this.GetQueryString('price');

      if (this.$route.params.result) {
        this.resultT = !!Number(this.$route.params.result);
        this.orderNumber = this.$route.params.orderNuber;
        this.price = this.$route.params.price;
      }
      console.log('-- orderNo -- ', this.orderNumber, this.resultT)
    },
    data () {
      return {
        orderNumber: '',
        price: '0.00',
        resultT: false,
      }
    },
    methods: {
      clickedParkingDetail() {
        this.$router.push({name: '6.10.4', params: {id: this.orderNumber}})
        //this.$toast('点击了券详情!')
      },
      GetQueryString(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
        var r = window.location.search.substr(1).match(reg);
        if (r != null) {
          return r[2];
        }
        return null;
      }
    },
    computed: {
      resultStr: function() {
        if (this.resultT == true) {
          return '支付成功';
        } else {
          return '支付失败';
        }
      }
    }
  }
</script>
