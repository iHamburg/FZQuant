<template>
  <div class="content">
    <bl-bar barStyle="bar-dark-linear">
      <div class="button" slot="left-button" @click="$router.go(-1)">
        <div class="iconfont arrow-back"></div>
      </div>
      <div slot="title">分配券</div>
    </bl-bar>
    <bl-navbar :fixed="true" v-model="selected">
      <!-- <bl-tab-item id="1" @click.native="click('1')">已分配</bl-tab-item>
      <bl-tab-item id="2" @click.native="click('2')">可分配</bl-tab-item>
      <bl-tab-item id="3" @click.native="click('3')">已失效</bl-tab-item> -->
      <bl-tab-item id="1" >已分配</bl-tab-item>
      <bl-tab-item id="2" >可分配</bl-tab-item>
      <bl-tab-item id="3" >已失效</bl-tab-item>
    </bl-navbar>
    <div class="quan-container">
      <bl-scroll :enableRefresh="true" :onRefresh="onRefresh" :on-infinite="onInfinite" :enableInfinite="isLoading" v-scroll-record>

          <bl-coupon-card  v-for="item in modelList" :propsData="item" @click.native="showDetail(item)">
            <div slot="coupon-btn" class="coupon-bottom flex-c-m">
              <div class="coupon-btn" v-if='selected == 2' @click.stop="assignedTickets(item)">
                分配优惠券
              </div>
              <div class="coupon-btn" @click.stop="ticketlist(item)">
                查看已分配列表
              </div>
              <!-- 2017/7/14 根据产品要求 隐藏停用操作 -->
              <!-- <div class="coupon-btn" @click.stop="hideCoupon(item)">
                停止发放
              </div> -->
            </div>
          </bl-coupon-card>
          <br>

        <div v-if="display">
          <img src="static/images/Rectangle37@2x.png" class="nodata">
        </div>
      </bl-scroll>
    </div>
  </div>
</template>
<script>
  import networklib from 'src/libs/networklib';
  import merchantlib from 'src/libs/merchantlib';
  import uiMixin from 'src/mixins/uiMixin';
  import couponlib from 'src/libs/couponlib';

  export default {

    // name: 'giftCoupon',

    name: 'keepgiftCoupon',

    components: {
      'BlCouponCard': () => System.import('components/cloud-merchant/coupon-card')
    },

    data() {
      return {
        selected: '2',
        isLoading: true,
        display: false,
        modelList: [],
        // merchantId: '4a7693c804cc46dca757d4e22bdf783b',
        queryParam: {
          merchantId: '',
          type: 2,
          pageNo: 1,
          pageSize: 20,
        },
      }
    },

    mixins: [uiMixin],

    activated() {
      //this.merchantId = this.$route.query.merchantId
      /*this.click('1')*/
      this.queryParam.merchantId = merchantlib.getMerchantId();
      this.initialize()
      this.updateData()
      document.body.scrollTop = 0
    },
    methods: {
      onRefresh (done) {
        console.log('refresh 下拉刷新')
        this.initialize()
        this.updateData();
        done();
      },
      onInfinite (done) {
        // console.log('infinite this.isLoading',this.isLoading)
        // DONE 没有数据时改为false
        // console.log('比较结果',this.queryParam.pageNo,this.totalPage)
        if (this.queryParam.pageNo >= this.totalPage) {
          console.log('已经到底啦！')
          this.$toast({
            message: '已经到底啦！',
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

      /**
       * 更新数据
       * UI + Data
       */
      updateData(done) {
        // let self = this;
        this.queryData((err, obj) => {
          if (done) { done() }
          if (err) {
            this.isLoading = false
            this.$toast({
              message: err,
            });
          }
          if (obj) {
            if (this.queryParam.pageNo == 1) {
              // console.log('===============',this.queryParam.pageNo)
              this.isLoading = true
            }
            this.count = obj.count;
            this.totalPage = obj.pages;
            if (this.totalPage == 0) {
              // this.$toast('暂无优惠券')
              // 当数据为空时显示图片
              this.display = true
              this.isLoading = false
            } else {
              this.display = false
            }
            if (this.totalPage == 1) {
              // console.log('结果页数',this.totalPage)
              this.isLoading = false
            }
            this.modelList = this.modelList.concat(obj.list);
          }
        });
      },

      // 获取数据
      queryData(callback) {
        // this.startLoading();
        let apiId = 'CM1002';
        console.log('查询券列表 param：', JSON.stringify(this.queryParam))
        networklib.post(apiId, this.queryParam).then((obj) => {
          console.log('成功的回调', obj);
          callback(null, obj);
        }).catch(err => {
          console.log('失败的回调 查询券列表', err);
          callback(err);
        });
      },

      showDetail (item) {
        // let couponTemplateId = item.couponTemplateId
        console.log('跳转到优惠券详情')
        /*this.$router.push({ path: '/couponDetail', query: { couponTemplateId: couponTemplateId } })*/
        this.$router.push({path: '/couponManager/couponTemplates/' + item.couponTemplateId});
      },
      assignedTickets(item) {
        let couponTemplateId = item.couponTemplateId
        let num = item.maxNum - item.assignNum
        console.log('分配优惠券　:' + couponTemplateId + "可分配　:" + num)
        this.$router.push({path: '/assignedTickets', query: {couponTemplateId: couponTemplateId, num: num}})
      },
      ticketlist(item) {
        let couponTemplateId = item.couponTemplateId
        console.log('查看已分配列表')
        this.$router.push({path: '/ticketlist', query: {couponTemplateId: couponTemplateId}})
      },

      /**
       * 停止发放-隐藏券
       * @param  {[type]} item [description]
       * @return {[type]}      [description]
       */
      hideCoupon (item) {
        let self = this
        let couponTemplateId = item.couponTemplateId

        this.$modal({
          title: '',
          content: '确定要停用此券吗？',
          buttons: [
            {text: '取消', onClick: function () {}},
            {
              text: '确定',
              onClick: function () {
                couponlib.hideCoupon(couponTemplateId, function(err, obj) {
                  if (err) {
                    console.log(err)
                    self.$toast('隐藏券失败！', err)
                  }
                  if (obj) {
                    console.log(obj)
                    self.$toast('隐藏券成功！')
                    self.initialize()
                    self.updateData()
                  }
                })
              }
            }
          ]
        })
      },
    },

    watch: {
      selected: function (newVal) {
        if (newVal != '2') {
          console.log('禁用分配按钮')
        }
        console.log('点击navbar ', newVal);
        this.initialize()
        this.queryParam.type = newVal
        this.updateData()
      },
    },
  };
</script>
<style lang="scss" scoped>
  .nodata{
    margin: 1rem auto;
    width: 50%;
    border: 0;
    display: block;
  }
</style>
