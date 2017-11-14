<template>
  <div class="content">
    <bl-bar barStyle="bar-dark-linear">
      <div class="button" slot="left-button" @click="$router.go(-1)">
        <div class="iconfont arrow-back"></div>
      </div>
      <div slot="title">自提码销核记录</div>
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
            <verifyCode v-for="gift in data" :giftdata="gift" :showstatus="true">
            </verifyCode>
          </div>
        </bl-tab-container-item>
        <bl-tab-container-item id="2">
          <div class="gift-list">
            <verifyCode v-for="gift in data" :giftdata="gift" :showstatus="true">
            </verifyCode>
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
import VerifyCode from 'components/cloud-merchant/verifyCode';
import uiMixin from 'src/mixins/uiMixin';

//import moment from 'moment'

export default {
  name: 'giftVerifyCode',
  components: {
    VerifyCode
  },
  data() {
    return {
      selected: '1',
      data: [],
      queryParam: {
        afterDate: '',
        pageSize: 20,
        pageNo: 1
      },
      totalPage: 1,
      display: false,
    }
  },
  mixins: [uiMixin],
  created() {
    console
    this.click('1')
  },
  methods: {
    click (num) {
      let afterDate = new Date();
      this.initialize();
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
      this.initialize()
      this.updateData(done)
    },

    onInfinite(done) {
      console.log('infinite 滚动加载')
      this.queryParam.pageNo ++
      this.updateData(done);
    },
    initialize () {
      this.data = [] // 清空数据
      this.queryParam.pageNo = 1 // 默认查询第一页
    },
    updateData(done) {
      this.$orderlib.findVerifyDeliveryCode(this.queryParam, (err, obj) => {
        if (done) done()
        if (err) {
          return this.$toast(err)
        }
        if (obj) {
          this.data = this.data.concat(obj.saleAfterList)
          this.totalPage = obj.totalPage;
          if (this.data.length > 0) {
            this.display = false
          } else {
            this.display = true
          }
        } else {
          this.display = true
        }
      })
    },

  },
  computed: {
    isLoading() {
      console.log("this.totalPage:" + this.totalPage);
      if (this.totalPage === 1 || this.totalPage === 0) {
        console.log("isLoading:false");
        return false
      }
      if (this.queryParam.pageNo >= this.totalPage) {
        console.log("isLoading:false");
        return false
      }
      console.log("isLoading:true");
      return true
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
