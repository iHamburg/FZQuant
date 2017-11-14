<style lang="scss" src="src/sass/check.scss" scoped></style>
<template>
  <div class="content">
    <bl-bar barStyle="bar-dark-linear">
        <div class="button" slot="left-button" @click="$router.go(-1)">
          <div class="iconfont arrow-back"><i class="fback">返回</i></div>
        </div>
        <div slot="title">发券二维码</div>
    </bl-bar>
    <div class="check-QRcode">
      <div class="QRcode-main">
        <div class="QRcode-title">
          <span><i></i>扫码领券</span>
        </div>
        <div class="QRcode-img" v-show="schemaGoodsId">
          <qriously :value="schemaGoodsId" :size="240" />
        </div>
        <div class="QRcode-font"><a @click="refresh()">点击刷新</a></div>
      </div>
      <div class="QRcode-main mt20">
        <div class="QRcode-title">
          <span><i></i>券状态</span>
         <!--  <a href="javascript:void(0)" @click="selectDetails()">查看详情</a> -->
        </div>
        <div class="state-ul">
          <ul>
            <li>
              <span>已领取</span>
              <i>{{detail.couponReceivenum}}张</i>
            </li>
            <li>
              <span>已核销</span>
              <i>{{detail.verificationNum}}张</i>
            </li>
            <li>
              <span>已返还</span>
              <i>{{detail.returnNum}}张</i>
            </li>
            <li :class="{ on : true }">
              <span>可发放</span>
              <i>{{detail.canSendNum}}张</i>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'check',
  components: {
  },
  mounted() {
    console.log('mounted');
    if (this.$route.params.id) {
      this.queryParam.couponTemplateId = this.$route.params.id;
      console.log("couponTemplateId: " + this.queryParam.couponTemplateId);
      this.releaseParkingTemplateDetail(0);
    }
  },
  activated() {
    console.log('activated');
    if (this.$route.params.id) {
      this.queryParam.couponTemplateId = this.$route.params.id;
      console.log("couponTemplateId: " + this.queryParam.couponTemplateId);
    }
    this.releaseParkingTemplateDetail(0);
  },
  data () {
    return {
      schemaGoodsId: '',
      detail: {},
      queryParam: {
        couponTemplateId: ''
      },
      statelist: [{
        state: '已领取',
        number: '20张'
      },
      {
        state: '已核销',
        number: '220张'
      },
      {
        state: '已返还',
        number: '220张'
      },
      {
        state: '可发放',
        number: '230张'
      }]
    }
  },
  methods: {
    ranking() {
    },
    refresh() {
      this.releaseParkingTemplateDetail(1);
      this.$toast('刷新成功')
    },
    selectDetails() {
      // //跳转核销明细
      // alert("查看详情！！");
      this.$router.push({name: '6.9.5', params: {flag: '3'}});
    },
    releaseParkingTemplateDetail(type) {
      this.$orderlib.releaseParkingTemplateDetail(this.queryParam, (err, obj) => {
        if (err) {
          return this.$toast(err);
        }
        console.log('2205-发券详情', JSON.stringify(obj));
        this.detail = obj;
        if (obj.url) {
          this.schemaGoodsId = obj.url;
          if (type == 1) {
            this.$toast('刷新成功')
          }
        } else {
          this.$toast('没有发券地址，不能发券')
        }
      })
    }
  }
}
</script>
