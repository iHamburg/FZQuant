<!-- 核销记录 new-->
<style lang="scss" src="src/sass/parkinglot.scss" scoped></style>
<template>
  <div class="content-parking write">

    <bl-bar barStyle="bar-dark-linear">
        <div class="button" slot="left-button" @click="$router.go(-1)">
          <div class="iconfont arrow-back"><i class="fback">返回</i></div>
        </div>
        <div slot="title">核销记录</div>
    </bl-bar>

    <div class="mark-box">
      <bl-navbar v-model="selected" :fixed="true">
        <bl-tab-item id="1">礼品券</bl-tab-item>
        <bl-tab-item id="2">优惠券</bl-tab-item>
        <bl-tab-item id="3">停车券</bl-tab-item>
      </bl-navbar>

      <bl-scroll :enableRefresh="true" :onRefresh="onRefresh" :on-infinite="onInfinite" :enableInfinite="isLoading" v-scroll-record>
        <bl-tab-container v-model="selected">
          <!-- 礼品券 1 -->
          <bl-tab-container-item id="1">
            <bl-coupon-card-sales v-for="item in modelList" :propsData="item" @click.native="giftvoucher(item)">
            </bl-coupon-card-sales>
          </bl-tab-container-item>
          <!-- 优惠券 2 -->
          <bl-tab-container-item id="2">
            <div class="check-content number-card"  v-for="(item, index) in shopcards" @click="onclickCoupon(item)">
              <div class="checkbox">
                <div class="check-card" >
                  <div class="card">{{ item.reduceAmount }}
                    <span>{{ couponTemplateTypeName(item.couponTemplateType) }}</span>
                  </div>
                  <dl>
                    <dt>{{ item.title }}</dt>
                    <dd v-if="item.fullAmount > 0">满{{ item.fullAmount }}可用</dd>
                    <dd v-else>无门槛</dd>
                    <dd>{{ item.beginAt }} - {{ item.endAt }}</dd>
                    <dd class="time">限 {{ merchentName }}</dd>
                  </dl>
                </div>
              </div>
              <div class="number" style="text-align:center">
                <!-- <span>已领取1000张</span> -->
                <span>已核销{{ item.verificationCount || 123 }}张</span>
              </div>
            </div>
          </bl-tab-container-item>
          <!-- 停车券 3 -->
          <bl-tab-container-item id="3">
            <bl-check-box class="check-content"  v-for="(item, index) in itemcards" @click.native="onclickParkingCoupon(item)">
              <div slot="check-box" class="checkbox">
                <div class="check-card">
                  <div class="card">{{ item.hours }}小时
                    <span>停车券</span>
                  </div>
                  <dl>
                    <dt>{{ item.couponName }}</dt>
                    <dd>已返还：{{ item.reNum }}张</dd>
                    <dd class="over">已核销：{{ item.usedNum }}张</dd>
                    <!-- <dd class="time">下单时间： {{ item.effectDay }}</dd> -->
                  </dl>
                </div>
              </div>
            </bl-check-box>
          </bl-tab-container-item>
        </bl-tab-container>

        <div v-if="display">
          <img src="static/images/Rectangle37@2x.png" class="nodata">
        </div>
      </bl-scroll>
    </div>

  </div>

</template>

<script>
import networklib from 'src/libs/networklib';
import uiMixin from 'src/mixins/uiMixin';

export default {
  name: 'keepParkingRecord',

  components: {
    'BlCheckBox': () => System.import('components/cloud-merchant/check-box'),
    'BlCouponCardSales': () => System.import('components/cloud-merchant/coupon-card-sales')
  },

  mixins: [uiMixin],

  data () {
    return {
      selected: '', // 初始化
      pageNo: 1,
      pageSize: 10,
      totalPage: 0,

      // 礼品券核销列表
      modelList: [],

      merchentName: '',

      // 停车券
      itemcards: [
        {
          "hours": "2小时",
          "toprice": "停车券",
          "couponName": "百联商城停车券",
          "reNum": "500",
          "usedNum": "3000",
          "state": "",
          "term": ["2017-05-22", "23:00"]
        }
      ],

      // 优惠券
      shopcards: [
        /*{
          "price": "50元",
          "toprice": "抵用券",
          "title": "ZARA优惠券",
          "desc": "无门槛",
          fullAmount: '100',
          reduceAmount: '10',
          beginAt: '2017-08-24 09:28:47.0',
          endAt: '2017-08-26 09:28:52.0',
          "state": "",
          "shop": "限西郊百联，百联又一城"
        },*/
      ],
    }
  },

  activated() {
    this.merchentName = this.$merchantlib.getMerchantName()
    // 首次进入显示礼品券
    this.selected = this.$route.params.flag || '1'
    this.updateData()
    document.body.scrollTop = 0
  },

  methods: {
    // 券类型名称
    couponTemplateTypeName(typeId) {
      let typeName = ''
      if (typeId == '23') {
        typeName = '优惠券'
      }
      return typeName
    },

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

    // 点击查看礼品券销券详情
    giftvoucher (item) {
      this.$router.push({name: '3.7.1', params: {couponTemplateId: item.couponTemplateId}})
    },

    // 点击查看优惠券销券详情
    onclickCoupon(item) {
      console.log('点击券查看销券详情:', JSON.stringify(item))
      this.$router.push({name: '6.9.9', params: {couponTemplateId: item.couponTemplateId}})
    },

    // 点击查看停车券销券详情
    onclickParkingCoupon(item) {
      console.log('tingchequan', JSON.stringify(item))
      this.$router.push({name: '6.9.11', params: {couponTemplateId: item.templeteId}})
    },

    // 初始化参数
    initializationParams() {
      this.pageNo = 1
      if (this.selected == '1') this.modelList = []
      if (this.selected == '2') this.shopcards = []
      if (this.selected == '3') this.itemcards = []
    },

    /**
     * 更新数据
     */
    updateData (done) {
      this.startLoading()
      let self = this
      // console.log('updateData selected:', this.selected)
      if (this.selected == '1') {
        console.log('查询礼品券核销列表')
        let params = {
          pageNo: this.pageNo,
          pageSize: this.pageSize,
          couponTemplateType: '14'
        }
        this.findCouponHistory(params, (err, obj) => {
          this.stopLoading()
          if (done) done()
          if (err) this.$toast(err)
          if (obj) {
            console.log('obj:\n', JSON.stringify(obj))
            this.totalPage = obj.totalPage
            this.modelList = this.modelList.concat(obj.couponTemplateList)
          }
        })
      } else if (this.selected == '2') {
        // this.isLoading = true
        console.log('查询优惠券核销列表')
        // 6008-查询优惠券核销记录列表
        let params = {
          pageNo: this.pageNo,
          pageSize: this.pageSize,
          couponTemplateType: '23'
        }
        this.findCouponHistory(params, (err, obj) => {
          this.stopLoading()
          if (done) done()
          if (err) this.$toast(err)
          if (obj) {
            console.log('obj:\n', JSON.stringify(obj))
            this.totalPage = obj.totalPage
            this.shopcards = this.shopcards.concat(obj.couponTemplateList)
          }
        })
      } else if (this.selected == '3') {
        console.log('选择停车券')
        let params = {
          pageNo: this.pageNo,
          pageSize: this.pageSize,
        }
        this.$couponlib.queryParkingCouponVerified(params, (err, obj) => {
          this.stopLoading()
          if (done) done()
          if (err) { this.$toast(err) }
          if (obj) {
            console.log('停车券核销列表：', JSON.stringify(obj))
            this.totalPage = obj.totalPage
            this.itemcards = obj.list
          }
        })
      }
    },

    /**
     * 获取数据
     * @return {[type]} [description]
     */
    /*queryData (callback) {
      let apiId = 'CM1008';
      let params = {
        merchantId: this.$merchantlib.getMerchantId(),
        typeId: '1',
      }
      console.log('CM1008queryParam:', JSON.stringify(params));
      networklib.post(apiId, params).then((obj) => {
        console.log('获取数据', obj)
        callback(null, obj)
      }).catch(err => {
        // console.log('失败的回调', apiId, err);
        callback(err)
      })
    },*/

    // 6008-查询优惠券核销记录列表
    findCouponHistory(param, callback) {
      this.$couponlib.findCouponHistory(param, (err, obj) => {
        if (err) {
          if (callback) callback(err)
        }
        if (obj) {
          if (callback) callback(null, obj)
        }
      })
    },

  },

  computed: {
    display() {
      if (this.selected == '1') {
        return !this.modelList.length > 0 || false
      }
      if (this.selected == '2') {
        return !this.shopcards.length > 0 || false
      }
      if (this.selected == '3') {
        return !this.itemcards.length > 0 || false
      }
      return false
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

  watch: {
    selected: function(newVal) {
      console.log('selected:', newVal)
      this.initializationParams()
      this.updateData()
    }
  },

}
</script>
