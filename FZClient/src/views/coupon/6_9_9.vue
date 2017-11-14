<style lang="scss" src="src/sass/parkinglot.scss" scoped></style>
<style lang="css">
  .gift-list{
    padding-top: 1rem;
  }
  .nodata{
    height:40%;
    width: 40%;
    margin-left: 30%;
    margin-top: 20%;
  }
</style>
<template>
  <div class="content-parking">
    <bl-bar barStyle="bar-dark-linear">
      <div class="button" slot="left-button" @click="$router.go(-1)">
        <div class="iconfont arrow-back"><i class="fback">返回</i></div>
      </div>
      <div slot="title">销核详情</div>
    </bl-bar>

    <bl-scroll :enableRefresh="true" :onRefresh="onRefresh" :on-infinite="onInfinite" :enableInfinite="isLoading" v-scroll-record>
      <div class="mark-box">
        <bl-check-box class="check-content"  v-for="(item, index) in couponList">
            <div slot="check-box" class="checkbox cardlist">
                <div class="tip">
                  <em>{{ couponTemplateTypeName(item.couponTemplateType) }}</em> {{ item.couponName }}
                </div>
                <div class="check-card check-card-detail">
                    <div class="card">
                      {{ item.reduce }}元
                      <span v-if="item.full > 0">满{{ item.full }}可用</span>
                      <span v-else>优惠券</span>
                    </div>
                    <dl>
                        <dd>核销订单：{{ item.orderCode }}</dd>
                        <dd>用户ID：{{ item.memberId }}</dd>
                        <dd class="over">礼券状态：{{ statusName(item.status) }}</dd>
                        <dd>下单时间：{{ item.verificationDate }}</dd>
                    </dl>
                </div>
            </div>
        </bl-check-box>
      </div>

      <div v-if="display">
        <img src="static/images/Rectangle37@2x.png" class="nodata">
      </div>
    </bl-scroll>
  </div>
</template>

<script>

export default {
  name: 'verifiedCouponDetail',

  components: {
    'BlCheckBox': () => System.import('components/cloud-merchant/check-box')
  },

  data () {
    return {
      pageNo: 1,
      pageSize: 10,
      totalPage: 0,

      couponTemplateId: '14516',
      searchKey: '',

      couponList: [
        /*{
          full: "100",
          reduce: "50",
          couponTemplateType: "满减券",
          couponName: "百联商城停车券",
          orderCode: "1110001219494481",
          verificationDate: '2017-08-24 16:22:20',
          memberId: '111111111',
          status: 12,
          number: '1000',
          issued: '200',
        },*/
      ],
    };
  },

  created() {

  },

  mounted() {
    console.log('6.9.9 mounted', this.$route.params.couponTemplateId)
    this.couponTemplateId = this.$route.params.couponTemplateId
    this.updateData()
  },

  activated() {

  },

  methods: {
    onRefresh (done) {
      console.log('refresh')
      this.initializationParams()
      this.updateData(done);
    },

    onInfinite (done) {
      console.log('infinite')
      this.pageNo ++
      this.updateData(done);
    },

    couponTemplateTypeName(typeId) {
      let typeName = ''
      if (typeId == '4') {
        typeName = '满减券'
      }
      return typeName
    },

    statusName(status) {
      let statusName = ''
      if (status == '12') {
        statusName = '已核销'
      }
      return statusName
    },

    // 初始化参数
    initializationParams() {
      this.pageNo = 1
      this.couponList = []
    },

    // 更新数据
    updateData(done) {
      let params = {
        couponTemplateId: this.couponTemplateId,
        searchKey: this.searchKey,
        pageNo: this.pageNo,
        pageSize: this.pageSize,
      }

      this.$couponlib.queryVerifiedCouponDetail(params, (err, obj) => {
        if (done) done()
        if (err) {
          this.$toast(err)
        }
        if (obj) {
          console.log('obj:', JSON.stringify(obj))
          this.totalPage = obj.totalPage
          this.couponList = this.couponList.concat(obj.verificationList)
        }
      })
    },

  },

  watch: {

  },

  computed: {
    display() {
      if (this.couponList.length > 0) {
        return false
      } else {
        return true
      }
    },
    isLoading() {
      if (this.totalPage == 1) {
        return false
      }
      if (this.pageNo >= this.totalPage) {
        return false
      }
      return true
    },
  },
};
</script>
