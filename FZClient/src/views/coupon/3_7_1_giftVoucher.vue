
<template>
  <div class="content">
    <bl-bar barStyle="bar-dark-linear">
      <div class="button" slot="left-button" @click="$router.go(-1)">
        <div class="iconfont arrow-back"></div>
      </div>
      <div slot="title">礼品券销核记录</div>
      <!--<div class="button" slot="right-button">券详情</div>-->
    </bl-bar>
    <bl-navbar v-model="selected" :fixed="true">
      <bl-tab-item id="1" @click.native="click('1')">最近一个月</bl-tab-item>
      <bl-tab-item id="2" @click.native="click('2')">最近三个月</bl-tab-item>
    </bl-navbar>

    <bl-scroll :enableRefresh="true" :onRefresh="onRefresh" :on-infinite="onInfinite" :enableInfinite="isLoading" v-scroll-record>
      <bl-tab-container :swipeable="true" v-model="selected">
        <bl-tab-container-item id="1">
          <div class="gift-list">
            <voucher v-for="gift in data" :giftdata="gift" :showstatus="true">
            </voucher>
          </div>
        </bl-tab-container-item>
        <bl-tab-container-item id="2">
          <div class="gift-list">
            <voucher v-for="gift in data" :giftdata="gift" :showstatus="true">
            </voucher>
          </div>
        </bl-tab-container-item>
      </bl-tab-container>

      <div v-if="display">
        <img src="static/images/Rectangle37@2x.png" class="nodata">
      </div>
    </bl-scroll>
  </div>
</template>
<script>
import networklib from 'src/libs/networklib';
import Voucher from 'components/cloud-merchant/voucher';
import uiMixin from 'src/mixins/uiMixin';

//import moment from 'moment'

export default {
  name: 'giftVoucher',
  components: {
    Voucher
  },
  data() {
    return {
      selected: '1',
      data: [],
      queryParam: {
        couponTemplateId: '',
        afterDate: '',
      },
      isLoading: false,
      display: false,
    }
  },
  mixins: [uiMixin],
  created() {
    console
    this.queryParam.couponTemplateId = this.$route.params.couponTemplateId
    this.click('1')
  },
  methods: {
    click (num) {
      let afterDate = new Date();

      if (num === '1') {
        afterDate.setMonth((afterDate.getMonth() - 1))
        // console.log('一个月', this.$utillib.fmtDate(afterDate, 'yyyy-MM-dd 00:00:00'))
      } else if (num === '2') {
        afterDate.setMonth((afterDate.getMonth() - 3))
        // console.log('三个月', this.$utillib.fmtDate(afterDate, 'yyyy-MM-dd 00:00:00'))
      }
      this.queryParam.afterDate = this.$utillib.fmtDate(afterDate, 'yyyy-MM-dd 00:00:00')
      // console.log('queryParam', this.queryParam)
      this.data = []
      this.updateData()
    },

    onRefresh(done) {
      console.log('refresh 下拉刷新')
      this.updateData(done)
    },

    onInfinite(done) {
      console.log('infinite 滚动加载')
    },

    updateData(done) {
      this.queryData((err, obj) => {
        if (done) done()
        if (err) {
          return this.$toast(err)
        }
        if (obj) {
          this.data = obj.list
          if (this.data.length > 0) {
            this.display = false
          } else {
            this.display = true
          }
        } else {
          // this.$toast('暂无优惠券核销记录')
          this.display = true
        }
      })
    },

    queryData (callback) {
      let apiId = 'CM1006';
      networklib.post(apiId, this.queryParam).then((obj) => {
        console.log('成功的回调', JSON.stringify(obj));
        callback(null, obj)
      }).catch(err => {
        console.log('失败的回调', apiId, err);
        callback(err)
      })
    },

  }
};
</script>
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
