<style lang="scss" src="src/sass/canaftersale.scss" scoped></style>
<template>
  <div class="content">
    <bl-bar barStyle="bar-dark-linear">
        <div class="button" slot="left-button" @click="onBack">
          <div class="iconfont arrow-back"><i class="fback">返回</i></div>
        </div>
        <div slot="title">选择订单</div>
    </bl-bar>
    <!--
      // orderType: 1待支付 / 2待开单 / 3待发货 / 4待提货 / 5待收货 / 6交易完成 / 7交易关闭 / 8申请售后
      // opBtn: 0发货 / 1待开单 / 2改价格 / 3联系客户 / 4添加备注 / 5物流追踪 / 6核销提货码 / 7查看申请单
    -->
    <bl-scroll :enableRefresh="true" :onRefresh="onRefresh" :on-infinite="onInfinite" :enableInfinite="isLoading" v-scroll-record>
      <div class="order-box" v-for="item in itemData">
          <dl class="order-buyer" @click="gotoDetail(item.orderNo)">
            <dt>
                <span>{{ item.memberName }}</span> <i class="over" v-if="item.orderState == 06">交易完成</i>
            </dt>
            <dd><span>{{ item.lowerOrderTime }}</span> <i>订单 {{ item.orderNo }}</i></dd>
          </dl>
          <dl class="notes" v-if="item.sellerRemark != '' || item.buyerRemark != ''" @click="gotoDetail(item.orderNo)">
            <dd class="cancel" v-if="item.buyerRemark">买家备注：{{ item.buyerRemark }}</dd>
            <dd v-if="item.sellerRemark" :class="{'seller': item.sellerRemark}">卖家备注：{{ item.sellerRemark }}</dd>
          </dl>
          <div class="order-product">
              <div class="probox" v-for="goods in item.goodslist"  @click="gotoDetail(item.orderNo)">
                  <span class="picture"><img :src="goods.goodsImg"></span>
                  <dl>
                    <dt>{{ goods.goodsName }}</dt>
                    <dd>
                        <span class="pl">{{ getSkuName(goods.skuName) }} x{{ goods.goodsNum }}</span>
                        <span class="pr">&yen; {{ goods.goodsAmt }}</span>
                    </dd>
                  </dl>
              </div>
              <bl-comli>
                  <div slot='left-text' class="left-box">
                    <span>实付</span>
                    <em>&yen;{{ item.shouldMoney }}</em>  共{{ item.totalGoodsNum }}件
                  </div>
                  <div slot='right-text' class="right-box">
                    <div class="right-r"  @click="gotoDetail(item.orderNo)">查看详情 </div>
                    <div class="iconfont arrow-back"></div>
                  </div>
              </bl-comli>

              <slot name="button"></slot>
          </div>
      </div>
      <img v-if="display" src="static/images/Rectangle37@2x.png" class="nodata" >
    </bl-scroll>
  </div>
</template>
<script>
import uiMixin from 'src/mixins/uiMixin';
//import jsbridge from 'src/mixins/jsbridge';

export default {

  name: 'keepaftersalesorders',
  mixins: [uiMixin],
  data () {
    return {
      itemData: [],
      totalPage: 0,
      pageNo: 1,
      pageSize: 10,
      memberId: null,
      display: false,
    }
  },
  mounted() {
    this.memberId = this.$route.params.customerId
    console.log('客户id：', this.memberId)
    this.initialize()
    this.updateData()
  },
  activated() {
    // this.memberId = this.$route.params.customerId
    // console.log('客户id：', this.memberId)
    // this.initialize()
    // this.updateData()
  },
  methods: {
    onBack() {
      if (this.$route.query.from == 'device') {
        console.log(' from device');
        this.$jsbridgelib.bridgeNativeBack();
      } else {
        this.$router.go(-1);
      }
    },
    // 4009-查询已结束7天后的订单列表 更新数据 UI + Data
    updateData(done) {
      this.startLoading()
      // let memberId = "100000002715245" // 客户id
      this.$aftersaleslib.getCanAfterSale(this.memberId, this.pageNo, this.pageSize, (err, obj) => {
        console.log('客户id：', this.memberId)
        this.stopLoading()
        if (done) {
          done()
        }
        if (err) {
          return this.$toast(err)
        }
        console.log('obj', obj);
        this.totalPage = obj.totalPage;
        this.itemData = this.itemData.concat(obj.listOrder) // 追加数据
        console.log('this.itemData', this.itemData)
        // 当数据为空时显示图片
        if (this.itemData.length <= 0) {
          this.display = true
        } else {
          this.display = false
        }
      })
    },
    /**
     * 初始化数据
     */
    initialize () {
      this.itemData = [] // 清空数据
      this.pageNo = 1 // 默认查询第一页
    },
    /**
     * 下拉刷新
     */
    onRefresh (done) {
      console.log('refresh 下拉刷新')
      this.initialize()
      this.updateData(done);
    },
    /** 上拉更多
     */
    onInfinite (done) {
      this.pageNo ++
      this.updateData(done);
    },
    //页面跳转：商品详情页
    gotoDetail(orderNo) {
      console.log('orderNo订单号：', orderNo)
      this.$router.push({name: '9.1.2', params: {orderNo}})
    },
    // SkuName名称截取.
    getSkuName(skuName) {
      if (skuName != null) {
        let skuNameIndex = skuName.indexOf(",");
        if (skuNameIndex > 0) {
          let sname = skuName.split(',');
          return sname[0] + '  ' + sname[1];
        } else {
          return skuName;
        }
      }
    },
  },
  computed: {
    isLoading() {
      let isLoading = true;
      if (this.totalPage == 1) {
        isLoading = false
      }
      if (this.pageNo >= this.totalPage) {
        isLoading = false
      }
      return isLoading
    },
  }
};
</script>

