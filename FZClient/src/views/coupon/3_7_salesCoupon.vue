<!-- 核销记录 old -->
<template>
  <div class="content">
    <bl-bar barStyle="bar-dark-linear">
      <div class="button" slot="left-button" @click="$router.go(-1)">
        <div class="iconfont arrow-back"></div>
      </div>
      <div slot="title">核销记录</div>
    </bl-bar>

    <div class="mark-box">
      <bl-navbar :fixed="true" v-model="selected">
        <bl-tab-item id="1">礼品券</bl-tab-item>
        <bl-tab-item id="2">优惠券</bl-tab-item>
      </bl-navbar>
      <div class="quan-container">
        <bl-scroll :enableRefresh="true" :onRefresh="onRefresh" :on-infinite="onInfinite" :enableInfinite="isLoading" v-scroll-record>

          <bl-tab-container :swipeable="false" v-model="selected">
            <!-- 礼品券 1 -->
            <bl-tab-container-item id="1">
              <bl-coupon-card-sales v-for="item in modelList" :propsData="item" @click.native="giftvoucher(item)">
              </bl-coupon-card-sales>
            </bl-tab-container-item>

            <!-- 优惠券 2 -->
            <bl-tab-container-item id="2">
              <div class="check-content number-card"  v-for="(item, index) in shopcards">
                  <div class="checkbox">
                      <div class="check-card">
                          <div class="card">{{ item.price }}
                            <span>{{ item.toprice }}</span>
                          </div>
                          <dl>
                              <dt>{{ item.title }}</dt>
                              <dd>{{ item.desc }}</dd>
                              <dd>{{ item.scope }}</dd>
                              <dd class="time">{{ item.shop }}</dd>
                          </dl>
                      </div>
                  </div>
                  <div class="number">
                      <span>已领取1000张</span>
                      <span>已核销1000张</span>
                  </div>
              </div>
            </bl-tab-container-item>

          </bl-tab-container>

          <div v-if="display">
            <img src="static/images/Rectangle37@2x.png" class="nodata">
          </div>
        </bl-scroll>
      </div>
    </div>
  </div>
</template>
<style type="text/css">
  .nodata{
    height:40%;
    width: 40%;
    margin-left: 30%;
    margin-top: 20%;
  }
</style>
<script>
import networklib from 'src/libs/networklib';

export default {

  name: 'giftCoupon',

  components: {
    'BlCouponCardSales': () => System.import('components/cloud-merchant/coupon-card-sales')
  },

  data() {
    return {
      selected: '', // 初始化
      isLoading: true,
      display: false,
      modelList: [], // 礼品券核销列表
      shopcards: [
        {
          "price": "50元",
          "toprice": "抵用券",
          "title": "ZARA优惠券",
          "desc": "无门槛",
          "scope": "领取后7天有效",
          "state": "",
          "shop": "限西郊百联，百联又一城"
        },
        {
          "price": "50元",
          "toprice": "抵用券",
          "title": "ZARA优惠券",
          "desc": "无门槛",
          "scope": "领取后7天有效",
          "state": "",
          "shop": "限西郊百联，百联又一城"
        },
        {
          "price": "50元",
          "toprice": "抵用券",
          "title": "ZARA优惠券",
          "desc": "无门槛",
          "scope": "领取后7天有效",
          "state": "",
          "shop": "限西郊百联，百联又一城"
        },
        {
          "price": "50元",
          "toprice": "抵用券",
          "title": "ZARA优惠券",
          "desc": "无门槛",
          "scope": "领取后7天有效",
          "state": "",
          "shop": "限西郊百联，百联又一城"
        },
        {
          "price": "50元",
          "toprice": "抵用券",
          "title": "ZARA优惠券",
          "desc": "无门槛",
          "scope": "领取后7天有效",
          "state": "",
          "shop": "限西郊百联，百联又一城"
        },
        {
          "price": "50元",
          "toprice": "抵用券",
          "title": "ZARA优惠券",
          "desc": "无门槛",
          "scope": "领取后7天有效",
          "state": "",
          "shop": "限西郊百联，百联又一城"
        },
      ],
      queryParam: {
        merchantId: '',
        typeId: '1',
      },
    };
  },

  created() {
    this.queryParam.merchantId = this.$merchantlib.getMerchantId(); // 商户id
    this.selected = '1'; // 首次进入显示礼品券
    this.updateData()
  },

  methods: {
    onRefresh (done) {
      console.log('refresh')
      this.updateData(done);
    },
    onInfinite (done) {
      console.log('infinite')
    },
    giftvoucher (item) {
      // let couponTemplateId = item.couponTemplateId
      // let afterDate = '2016-12-15 23:59:59'
      this.$router.push({path: '/giftvoucher/' + item.couponTemplateId})
    },

    /**
     * 更新数据
     */
    updateData (done) {
      let self = this
      // console.log('updateData selected:', this.selected)
      if (this.selected == '1') {
        console.log('查询礼品券核销列表')
        this.queryData(function (err, obj) {
          if (done) done();
          self.isLoading = false
          if (err) {
            return self.$toast(err)
          }
          if (obj) {
            self.modelList = obj.list;
          } else {
            self.display = true
          }
        })
      } else if (this.selected == '2') {
        console.log('查询优惠券核销列表')
        if (done) done();
      }
    },

    /**
     * 获取数据
     * @return {[type]} [description]
     */
    queryData (callback) {
      let apiId = 'CM1008';
      console.log('CM1008queryParam', JSON.stringify(this.queryParam));
      networklib.post(apiId, this.queryParam).then((obj) => {
        console.log('获取数据', obj)
        callback(null, obj)
      }).catch(err => {
        // console.log('失败的回调', apiId, err);
        callback(err)
      })
    },
  },

  watch: {
    selected: function(newVal) {
      console.log('selected:', newVal)
      this.updateData()
    }
  },
};
</script>
