<template>
  <div class="content">
    <bl-bar barStyle="bar-dark-linear">
      <div class="button" slot="left-button" @click="$router.go(-1)">
        <div class="iconfont arrow-back"></div>
      </div>
      <div slot="title">Ta的券</div>
    </bl-bar>

    <div class="main-info">
      <bl-scroll :enableRefresh="true" :onRefresh="onRefresh" :on-infinite="onInfinite" :enableInfinite="isLoading" v-scroll-record>
          <bl-ta-coupon v-for="item in modelList" :propsData="item" @click.native="goCouponDetail(item.couponTemplateId)"></bl-ta-coupon>
      </bl-scroll>
    </div>
  </div>
</template>
<script>
  import networklib from 'src/libs/networklib';
  // import merchantlib from 'src/libs/merchantlib';
  import uiMixin from 'src/mixins/uiMixin';
export default {
    name: 'TaCoupon',
    components: {
      'BlTaCoupon': () => System.import('components/cloud-merchant/ta-coupon')
    },
    data() {
      return {
        modelList: [],
        isLoading: true,
        queryParam: {
          merchantId: '',
          memberId: '',
          pageNo: 1,
          pageSize: 10,
        }
      }
    },
    mixins: [uiMixin],
    mounted() {
      this.queryParam.merchantId = this.$merchantlib.getMerchantId(); // 商户id
      this.queryParam.memberId = this.$route.query.memberId; // 网红/销售员id
      this.updateData()
      // let self = this;
      // this.startLoading();
      // this.queryTaCouponData(function(err) {
      //   // self.stopLoading();
      //   if (err) {
      //     self.$toast({
      //       message: '服务器载入失败:' + err,
      //     });
      //   }
      // });
    },
    methods: {
      goCouponDetail(couponTemplateId) {
        console.log('跳转到TA的券详情')
        this.$router.push({path: '/couponManager/couponTemplates/' + couponTemplateId})
      },
      onRefresh (done) {
        console.log('refresh 下拉刷新')
        this.initialize()
        this.updateData(done)
      },

      onInfinite (done) {
        console.log('infinite 滚动加载更多')

        if (this.queryParam.pageNo >= this.totalPage) {
          console.log('没有更多数据啦')
          this.$toast({
            message: '没有更多数据啦',
            position: 'bottom',
          })
          this.isLoading = false
          done()
        } else {
          // console.log('before pageNo :',this.queryParam.pageNo);
          this.queryParam.pageNo++;

          // console.log('after pageNo :',this.queryParam.pageNo);
          this.updateData(done);
        }
      },

      // 初始化数据
      initialize () {
        this.modelList = [] // 清空数据
        this.queryParam.pageNo = 1 // 默认查询第一页
      },

      updateData(done) {
        this.queryTaCouponData((err, obj) => {
          if (done) { done() }
          if (err) { this.$toast(err) }
          if (obj) {
            if (this.queryParam.pageNo == 1) {
              // console.log('===============',this.queryParam.pageNo)
              this.isLoading = true
            }
            this.totalPage = obj.pages;
            if (obj.pages == 0) {
              this.$toast('暂无优惠券')
              this.isLoading = false
            }
            if (obj.pages === 1) {
              // console.log('结果页数',this.totalPage)
              this.isLoading = false
            }
            this.modelList = this.modelList.concat(obj.list);
          }
        })
      },

      queryTaCouponData (callback) {
        let apiId = 'CM1105';
        console.log('查询他的券入参：', this.queryParam);
        networklib.post(apiId, this.queryParam).then((obj) => {
          console.log('成功的回调', obj);
          // this.modelList = obj.list;
          callback(null, obj);
        }).catch(err => {
          console.log('失败的回调', apiId, err);
          callback(err);
        });
      },
    }
};

</script>
