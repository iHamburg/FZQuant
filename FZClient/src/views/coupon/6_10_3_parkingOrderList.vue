<style lang="scss" src="src/sass/parkinglot.scss" scoped></style>
<template>
  <div class="content-parking write">

    <bl-bar barStyle="bar-dark-linear">
        <div class="button" slot="left-button" @click="$router.go(-1)">
          <div class="iconfont arrow-back"><i class="fback">返回</i></div>
        </div>
        <div slot="title">券订单</div>
    </bl-bar>
    <div class="mark-box">
      <bl-scroll :enableRefresh="true" :onRefresh="onRefresh" :on-infinite="onInfinite" :enableInfinite="isLoading" v-scroll-record>
          <div class="check-content"  v-for="(item, index) in itemData">
              <div class="checkbox">
                  <div class="check-card" @click="toDetail(item)">
                      <div class="card">{{ item.hours }}小时
                        <span>停车券</span>
                      </div>
                      <dl>
                          <dt>{{ item.templeteName }}</dt>
                          <dd>应付总额：{{ item.shouldMoney }} 元</dd>
                          <dd>购买张数：{{ item.num }} 张</dd>
                          <dd class="time">下单时间： {{ item.orderDate }}</dd>
                      </dl>
                  </div>
                  <div class="bot">
                      <!-- <button :disabled="item.count" class="btn" @click="buyParkTicket">继续购买</button>
                      <button :disabled="item.count" class="btn" @click="stopCoupon">暂停发放</button> -->
                      <button :disabled='false' @click="distributeCoupon(item)">立即发券</button>
                  </div>
              </div>
          </div>
          <div>
            <img v-if="display" src="static/images/Rectangle37@2x.png" class="nodata" >
          </div>
      </bl-scroll>
    </div>
  </div>

</template>
<script>
import uiMixin from 'src/mixins/uiMixin';
export default {
  name: 'parkingOrderList',
  mixins: [uiMixin],
  components: {
    'BlCheckBox': () => System.import('components/cloud-merchant/check-box')
  },

  data () {
    return {
      totalPage: 0,
      display: false,
      pageNum: 1,
      pageSize: 50,
      itemData: [],
    }
  },

  created() {
    // 页面位于顶部
    document.body.scrollTop = 0
    // this.initialize()
    this.updateData()
  },

  methods: {
    // 进券订单详情
    toDetail(item) {
      console.log('进入订单详情：', JSON.stringify(item))
      this.$router.push({name: '6.10.4', params: {id: item.orderNo}})
    },

    // 进购买停车券页面
    buyParkTicket() {
      this.$router.push({name: '6.10.1'})
    },

    // 立即发券，进发券页面
    distributeCoupon(item) {
      console.log('进入立即发券：', JSON.stringify(item))
      this.$router.push({name: '6.10.6', params: {id: item.templeteId}})
    },

    // 暂停发券
    stopCoupon() {
      let content = '你确定要停止发放该券吗？'
      this.$modal({
        content,
        buttons: [
          {text: '取消', onClick: function() {}},
          {text: '确定',
            onClick: () => {
              let param = {}
              this.$orderlib.stopDistributeCoupon(param, (err) => {
                if (err) {
                  return this.$toast(err)
                } else {
                  return '操作成功'
                }
              })
            }
          }
        ]
      })
    },

    // 初始化数据
    initialize() {
      this.itemData = [] //清空数据
      this.pageNum = 1 // 默认查询第一页
    },
    // 下拉刷新
    onRefresh(done) {
      this.initialize()
      this.updateData(done)
    },
    // 上拉更多
    onInfinite(done) {
      this.pageNum++
      this.updateData(done)
    },
    updateData(done) {
      this.startLoading() // 转菊花
      let param = {pageNum: this.pageNum, pageSize: this.pageSize}
      this.$orderlib.queryParkingOrderList(param, (err, obj) => {
        this.stopLoading() // 关菊花
        if (done) { done() }
        if (err) { return this.$toast(err) }
        if (obj) {
          // console.log('停车券订单列表obj:', JSON.stringify(obj))
          this.totalPage = obj.pages
          this.itemData = this.itemData.concat(obj.list)
          if (this.itemData.length <= 0) {
            this.display = true
          } else {
            this.display = false
          }
        }
      })
    }
  },
  computed: {
    isLoading() {
      let isLoading = false
      if (this.totalPage == 1) {
        isLoading = false
      }
      if (this.totalPage > this.pageNum) {
        isLoading = true
      }
      return isLoading
    },
  }

}
</script>
