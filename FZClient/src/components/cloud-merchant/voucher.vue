<template>
<!--<div class="gift-info">
      <div class="gift-time">{{giftdata.date}}</div>
      <div>
        <h3>{{giftdata.title}}</h3>
        <div class="gift-description">{{giftdata.description}}</div>
        <div v-if="showstatus">
          <label>用户ID号：</label>{{giftdata.id}}
          <br />
          <label>兑换时间：</label>{{giftdata.time}}
          <br />
          <label>礼券状态：</label>已销核
        </div>
        <div v-else>
          用户ID号：{{giftdata.id}}
          <br />
          兑换时间：{{giftdata.time}}
          <br />
          礼券状态：已销核
        </div>
      </div>
    </div>-->
  <div class="gift-info">
    <div class="gift-time">{{ formatVerifiedAt }}</div>
    <div>
      <h3>{{giftdata.name}}</h3>
      <div class="gift-description">{{giftdata.desc}}</div>
      <div v-if="showstatus">
        <label>用户ID号：</label>{{giftdata.memberId}}
        <br />
        <label>兑换时间：</label>{{giftdata.verifiedAt}}
        <br />
        <label>礼券状态：</label>已销核
      </div>
      <div v-else>
        用户ID号：{{giftdata.memberId}}
        <br />
        兑换时间：{{giftdata.verifiedAt}}
        <br />
        礼券状态：已销核
      </div>
    </div>
  </div>
</template>
<script>
//import moment from 'moment'
export default {

  name: 'voucher',

  data () {
    return {
    };
  },
  props: {
    showstatus: Boolean,
    giftdata: Object
  },

  computed: {
    formatVerifiedAt: function() {
      return this.$utillib.fmtDate(new Date(this.giftdata.verifiedAt.replace(/-/g, "/")), "MM-dd")
    }
  }
};
</script>
<style lang="scss" scoped>
@import "src/sass/tobe/function";
.gift-list {
  margin-top: rem(20);
  background: #fff;
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

