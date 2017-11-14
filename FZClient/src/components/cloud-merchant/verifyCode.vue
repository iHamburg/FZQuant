<template>
  <div class="gift-info" @click="toOrderDetail(giftdata.orderNo)">
    <div class="gift-time">{{ formatVerifiedAt }}</div>
    <div>
      <h3>订单自提码：{{giftdata.deliveryCode}}</h3>
      <div class="gift-description"></div>
      <div v-if="showstatus">
      	<label>订单编号：</label>{{giftdata.orderNo}}
        <br />
        <label>用户ID号：</label>{{giftdata.memberId}}
        <br />
        <label>核销时间：</label>{{giftdata.verifyTime}}
        <br />
        <label>状态：</label>已核销
      </div>
      <div v-else>
        用户ID号：{{giftdata.memberId}}
        <br />
        核销时间：{{giftdata.verifiedAt}}
        <br />
        状态：已销核
      </div>
    </div>
  </div>
</template>
<script>
//import moment from 'moment'
export default {

  name: 'verifyCode',

  data () {
    return {
    };
  },
  props: {
    showstatus: Boolean,
    giftdata: Object
  },
  methods: {
    toOrderDetail(orderNo) {
      this.$router.push({name: '9.1.2', params: {orderNo: orderNo}})
    }
  },

  computed: {
    formatVerifiedAt: function() {
      return this.$utillib.fmtDate(new Date(this.giftdata.verifyTime.replace(/-/g, "/")), "MM-dd")
    }
  }
};
</script>
<style lang="scss" scoped>
@import "src/sass/tobe/function";
.gift-list {
  margin-top: rem(20);

  .gift-info {
    @include display(flex);
    box-shadow: inset 0 0 0 0 #E9E9E9;
    padding: rem(36) rem(30);
    font-size: rem(28);
    color: #2A2A2A;
    border-bottom: #EFEFF4  solid 3px;
    background-color: #FFFFFF;
    .gift-time {
      font-size: rem(34);
      color: #E6133C;
      line-height: rem(36);
      margin: rem(8) rem(30) 0 0;
    }
    h3 {
      color: #222;
      font-size: rem(34);
      font-weight: normal;
    }
    .gift-description {
      color: #aaa;
      font-size: rem(24);
      margin-bottom: rem(12);
      width: rem(452);
      height: rem(30);
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    label {
      color: #999;
    }
  }
}
</style>

