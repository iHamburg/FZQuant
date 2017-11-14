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
        <div class="iconfont arrow-back"></div>
      </div>
      <div slot="title">销核详情</div>
    </bl-bar>

    <bl-scroll :enableRefresh="true" :onRefresh="onRefresh" :on-infinite="onInfinite" :enableInfinite="isLoading" v-scroll-record>
      <div class="mark-box">
        <bl-check-box class="check-content"  v-for="(item, index) in couponList">
            <div slot="check-box" class="checkbox cardlist">
                <!-- <div class="tip">
                  <em>{{ couponTemplateTypeName(item.couponTemplateType) }}</em> {{ item.couponName }}
                </div> -->
                <div class="check-card check-card-detail">
                    <div class="card">
                      {{ item.hours }}小时
                      <span>停车券</span>
                    </div>
                    <dl>
                      <dd v-if="item.couponName">{{ item.couponName }} </dd>
                      <dd v-else>百联商城停车券</dd>
                      <dd>用户ID：{{ item.memberId }}</dd>
                      <dd class="over">礼券状态：{{ statusName(item.state) }}</dd>
                      <dd v-show="item.usedDate">兑换时间：{{ item.usedDate }}</dd>
                      <dd v-show="item.takenDate">返还时间：{{ item.takenDate }}</dd>
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
      couponList: [],
    };
  },

  created() {

  },

  mounted() {
    console.log('6.9.11 mounted', this.$route.params.couponTemplateId)
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
      if (status == '03') statusName = '已核销'
      if (status == '05') statusName = '已返还'
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
        templeteId: this.couponTemplateId,
        pageNo: this.pageNo,
        pageSize: this.pageSize,
      }

      this.$couponlib.queryParkingCouponVerifiedDetails(params, (err, obj) => {
        if (done) done()
        if (err) {
          this.$toast(err)
        }
        if (obj) {
          console.log('obj:', JSON.stringify(obj))
          this.totalPage = obj.totalPage
          this.couponList = this.couponList.concat(obj.list)
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
