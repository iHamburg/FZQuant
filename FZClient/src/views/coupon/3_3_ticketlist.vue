<style lang="scss" src="src/sass/ticketlist.scss" scoped></style>
<style lang="scss">
  .nodata {
     height:40%;
     width: 40%;
     margin-left: 30%;
     margin-top: 10%;
  }
</style>
<template>
  <div class="content">
    <bl-bar barStyle="bar-dark-linear">
      <div class="button" slot="left-button" @click="$router.go(-1)">
        <div class="iconfont arrow-back"></div>
      </div>
      <div slot="title">已分配礼品券列表</div>
    </bl-bar>
    <div class="badge margin-t1" >
      <bl-scroll :enableRefresh="true" :onRefresh="onRefresh" :on-infinite="onInfinite" :enableInfinite="isLoading" v-scroll-record>
        <allocationbond v-for="item in data" :coupondata="item" @click.native="toPromotersDetail(item)">
          <div class="right-box" slot='switch'>
            <div class="right-num">
              授权发放数 {{item.couponCount}}<br>
              已领取 {{item.drowNum}}
            </div>
            <div class="iconfont arrow-back"></div>
          </div>
        </allocationbond>
        <div v-if="display">
          <img src="static/images/Rectangle37@2x.png" class="nodata">
        </div>
      </bl-scroll>
    </div>
  </div>

</template>

<script>

import networklib from 'src/libs/networklib';
import allocationbond from 'components/choose-coupons/distribution';
import uiMixin from 'src/mixins/uiMixin';

export default {
  name: 'ticketlist',
  components: {
    allocationbond
  },
  mixins: [uiMixin],
  mounted() {
    this.queryParam.couponTemplateId = this.couponTemplateId = this.$route.query.couponTemplateId;
    console.log('=====' + this.couponTemplateId, this.queryParam.couponTemplateId);

    this.updataData()
  },
  data () {
    return {
      data: [],
      couponTemplateId: null,
      memberId: null,
      roleId: null,
      display: false,

      isLoading: false,
      queryParam: {
        couponTemplateId: '',
        pageNo: 1,
        pageSize: 30
      }
    }
  },
  methods: {
    onRefresh(done) {
      console.log('下拉刷新')
      this.initialize()
      this.updataData(done)
    },

    onInfinite(done) {
      console.log('加载更多')
    },

    initialize() {
      this.data = []; // 清空goodsList
      this.queryParam.pageNo = 1 // 默认查询第一页
    },

    /**
     * 更新数据
     * @return {[type]} [description]
     */
    updataData (done) {
      this.queryData((err, obj) => {
        if (done) done()
        if (err) {
          this.$toast(err)
        }
        if (obj) {
          this.data = obj.list
        }
        console.log('this.data', this.data.length)
        if (this.data.length == 0) {
          this.display = true
        } else {
          this.display = false
        }
      })
    },

    /**
     * 查询数据
     * @param  {Function} callback [description]
     * @return {[type]}            [description]
     */
    queryData (callback) {
      let apiId = 'CM1010';
      // let param = {couponTemplateId: this.couponTemplateId};
      console.log('param:', JSON.stringify(this.queryParam))
      networklib.post(apiId, this.queryParam).then((obj) => {
        console.log('成功的回调', obj);
        callback(null, obj)
      }, (err) => {
        // this.stopLoading();
        console.log('失败的回调', apiId, err);
        callback(err)
      })
    },
    toPromotersDetail(item) {
      this.$router.push({name: '4.4', query: {memberId: item.memberId, roleId: item.role}})
    }
  },

}
</script>
