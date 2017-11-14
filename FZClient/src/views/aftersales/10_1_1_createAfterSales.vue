<style lang="scss" src="src/sass/serviceOrder.scss" scoped></style>
<template>
  <div class="content">
    <bl-bar barStyle="bar-dark-linear">
        <div class="button" slot="left-button" @click="$router.go(-1)">
          <div class="iconfont arrow-back"><i class="fback">返回</i></div>
        </div>
        <div slot="title">售后申请</div>
    </bl-bar>

    <div class="service">
        <dfn>申请的退货商品</dfn>

        <bl-comli class="number">
            <div slot='left-text' class="left-box">订单编号</div>
            <div slot='right-text' class="right-box">
              <div class="right-r">{{ orderNo }}</div>
            </div>
        </bl-comli>

        <div class="item">
            <dl>
              <dt class="left-box"><img :src="orderGoodsInfo.imgUrl"></dt>
              <dd class="name">{{ orderGoodsInfo.goodsName }}</dd>
              <dd class="info">
                  <span>{{orderGoodsInfo.skuName}}</span>
                  <span></span>
                  <span>x{{orderGoodsInfo.goodsNum}}</span>

                  <span class="pr">&yen; {{ orderGoodsInfo.goodsPrice }}</span>
              </dd>
            </dl>
        </div>
        <bl-comli class="look" @click.native="onCheckOrder()">
            <div slot='left-text' class="left-box" >查看订单</div>
            <div slot='right-text' class="right-box">
                <div class="right-r"></div>
                <div class="iconfont arrow-back"></div>
            </div>
        </bl-comli>

        <bl-comli class="service-top">
            <div slot='left-text' class="left-box">申请类型</div>
            <div slot='right-text' class="right-box" @click="popupVisible = !popupVisible">
                <div class="right-r">{{ typeStr }}</div>
                <div class="iconfont arrow-back"></div>
            </div>
        </bl-comli>
        <bl-comli>
            <div slot='left-text' class="left-box">退货原因</div>
            <div slot='right-text' class="right-box" @click="popupVisible2 = !popupVisible2">
                <div class="right-r">{{ reasonStr }}</div>
                <div class="iconfont arrow-back"></div>
            </div>
        </bl-comli>
        <bl-comli>
            <div slot='left-text' class="left-box">退货方式</div>
            <div slot='right-text' class="right-box" @click="popupVisible3 = !popupVisible3">
                <div class="right-r"><div class="ellipsis">{{ returnTypeStr }}</div></div>
                <div class="iconfont arrow-back"></div>
            </div>
        </bl-comli>
        <bl-comli class="service-init">
            <div slot='left-text' class="left-box">退货数量</div>
            <div slot='right-text' class="right-box">
                <div class="right-r">
                    <span class="init">
                      <i @click="reduce">-</i>
                      <input type="number" v-model="aftersalesInfo.goodsInfo.count" ref="num" @keyup="integer">
                      <i @click="add">+</i>
                    </span>
                </div>
            </div>
        </bl-comli>

        <!-- <bl-comli class="service-top">
            <div slot='left-text' class="left-box">问题描述</div>
            <div slot='right-text' class="right-box" @click="coupons = !coupons">
                <div class="right-r">请输入描述</div>
                <div class="iconfont arrow-back"></div>
            </div>
        </bl-comli> -->
        <!-- <upload :maxpic='3' :paths='paths' :name='"图片上传"' class="margin-b"
         :remove="true" @clickImg='parentImg' :mainpic='picindex'>
        </upload> -->
        <!-- <div class="watch-pic" ref='big' @click='hidebig'>
          <div class="pic-box">
            <img :src="siglepath">
          </div>
        </div> -->

        <!-- 店员备注 添加-->
        <!-- <bl-comli class="service-top">
            <div slot='left-text' class="left-box">店员备注</div>
            <div slot='right-text' class="right-box" @click="popupVisible4 = !popupVisible4">
                <div class="right-r"><button class="add">添加</button></div>
            </div>
        </bl-comli> -->
        <!-- 店员备注 展示-->
        <!-- <div class="service-note">
          <dl v-for="item in comments">
            <dt>{{ item.name }} <span class="time">{{ item.time }}</span></dt>
            <dd>{{ item.content }}</dd>
          </dl>
        </div> -->
    </div>

    <div class="bootedit">
        <bl-button :disabled="!disabled" @click="onSubmit">申请售后</bl-button>
    </div>

    <!-- 申请类型 -->
    <bl-actionsheet :actions="typeActions" v-model="popupVisible" cancelText="" @thisValue="function(val){aftersalesInfo.type = val;}"></bl-actionsheet>

    <!-- 退货原因 -->
    <bl-actionsheet :actions="reasonActions" v-model="popupVisible2" cancelText="" @thisValue="function(val){aftersalesInfo.reasonId = val;}"></bl-actionsheet>

    <!-- 退货方式 returnTypeActions-->
    <bl-actionsheet :actions="returnTypeActions" v-model="popupVisible3" cancelText="" @thisValue="function(val){aftersalesInfo.returnType = val;}"></bl-actionsheet>

    <!-- <bl-popup v-model="popupVisible" position="bottom" style="width: 100%;" >
      <bl-picker ref="returnType" :slots="slots" :visible-item-count="3" show-toolbar @cancel="cancel" @getValues="getValues"></bl-picker>
    </bl-popup> -->

    <!-- <bl-popup v-model="popupVisible2" position="bottom" style="width: 100%;" >
      <bl-picker ref="returnType2" :slots="slots2" :visible-item-count="3" show-toolbar @cancel="cancel2" @getValues="getValues2"></bl-picker>
    </bl-popup> -->

    <!-- <bl-popup v-model="popupVisible3" position="bottom" style="width: 100%;" >
      <bl-picker ref="returnType3" :slots="slots3" :visible-item-count="3" show-toolbar @cancel="cancel3" @getValues="getValues3"></bl-picker>
    </bl-popup> -->

    <!-- <bl-popup v-model="popupVisible4" position="bottom" style="width: 100%;" >
        <bl-cust-picker  show-toolbar @cancel="popupVisible4 = !popupVisible4" @getValues="getValues4" :toolbarSubText="notesTitle">
          <div slot="content" class="comments">
              <textarea name="text" ref="notes"></textarea>
          </div>
        </bl-cust-picker>
    </bl-popup> -->

    <!--遮罩-->
    <div class="modal-bg" v-if="picVisible" @click="picVisible = false">
      <span class="qimg">
        <img :src="imgPath">
      </span>
    </div>
    <div class="modal-bg" v-if="popupVisible || popupVisible2 || popupVisible3 || popupVisible4" @click="close"></div>

  </div>
</template>

<script>
import upload from 'components/cloud-merchant/upload';
//import jsbridge from 'src/mixins/jsbridge';
export default {
  name: 'keepCreateAftersales',
  components: {
    upload,
    'BlCustPicker': () => System.import('components/cloud-merchant/cust-picker')
  },
  mixins: [],
  data () {
    return {
      itemCount: 1,
      picVisible: false,
      popupVisible: false,
      popupVisible2: false,
      popupVisible3: false,
      popupVisible4: false,
      typeActions: [
        {
          name: '退货退款',
          key: '0',
        },
      ],
      reasonActions: [
        {
          name: '七天无理由退货',
          key: '01',
        },
        {
          name: '做工粗糙／有瑕疵',
          key: '02',
        },
        {
          name: '质量问题',
          key: '03',
        },
        {
          name: '大小／尺寸与商品描述不符',
          key: '04',
        },
        {
          name: '颜色／图案／款式与商品描述不符',
          key: '05',
        },
        {
          name: '材质与商品描述不符',
          key: '06',
        },
        {
          name: '少发／漏件',
          key: '07',
        },
        {
          name: '卖家发错货',
          key: '08',
        },
        {
          name: '包装／商品破损／污渍／裂痕／变形',
          key: '09',
        },
        {
          name: '假冒品牌',
          key: '10',
        },
      ],
      returnTypeActions: [
        {
          name: '物流退回',
          key: '0',
        },
        {
          name: '到店退回',
          key: '1',
        },
      ],
      /////////////////////////////////////
      skuId: null, // 通过skuId和goodsId确定要申请售后的商品
      goodsId: '', // 通过skuId和goodsId确定要申请售后的商品
      orderNo: '', // 订单编号
      orderGoodsInfo: {}, // 下单商品信息 goodsInfo
      // 创建售后单 aftersalesInfo
      aftersalesInfo: {
        customerId: '', // 代下单的会员id
        goodsInfo: { // 退货商品信息
          count: 1,
          dynamicAttributes: [
            {
              attributeId: '', //属性id
              attributeName: '' // 属性name
            }
          ],
          goods: {
            productId: '' // 商品编号
          }
        },
        // imgList: [], // 凭证
        // memberId: '100000002716264', // 会员ID
        orderId: '', // 订单编号
        reasonId: '', // 退货理由Id
        remarkList: [],
        returnType: '', // 退货方式
        type: '0', // 申请类型
      },
      //////////////////////////////////////////////

    };
  },
  created() {
    console.log('created')
  },
  mounted() {
    console.log('mounted')
  },
  activated() {
    this.orderNo = this.$route.query.orderNo
    this.skuId = this.$route.query.skuId
    this.goodsId = this.$route.query.goodsId
//    console.log('mounted orderNo:', this.orderNo, 'skuId', this.skuId, 'goodsId', this.goodsId)
    this.updateDate()
  },
  methods: {
    /**
     * 查看订单
     * @return {[type]} [description]
     */
    onCheckOrder() {
      console.log('查看订单')
      this.$router.push({name: '9.1.2', params: {orderNo: this.orderNo}})
    },

    /**
     * 数据
     */
    updateDate() {
      this.queryOrder((err, obj) => {
        if (err) { this.$toast(err) }
        if (obj) {
          // console.log('11111111订单详情', JSON.stringify(obj))
          this.aftersalesInfo.customerId = obj.memberId;
          let goodsList = [];
          for (let i = 0, len = obj.goodsGroupList.length; i < len; i++) {
            let group = obj.goodsGroupList[i];
            goodsList = goodsList.concat(group.goodsList)
          }
          console.log('goodsList:', goodsList)
          if (goodsList.length > 0) {
            // console.log('obj.goodsList', obj.goodsList)
            goodsList.map(goods => {
              console.log('goods', JSON.stringify(goods))
              if (goods.skuId == this.skuId && goods.goodsId == this.goodsId) {
                this.orderGoodsInfo = goods
              }
            })
          }
        }
      })
    },

    /**
     * 最大退货数量
     * @return {[type]} [description]
     */
    integer() {
      let initVal = this.$refs.num.value
      console.log('integer', initVal)
      if (initVal > this.orderGoodsInfo.goodsNum) {
        this.$refs.num.value = this.orderGoodsInfo.goodsNum
      }
      if (initVal < 1) {
        this.$refs.num.value = 1
      }
    },

    /**
     * 查询订单详情
     */
    queryOrder(callback) {
      this.$orderlib.queryOrder(this.orderNo, (err, obj) => {
        if (err) {
          // this.$toast(err)
          if (callback) { callback(err) }
        }
        if (obj) {
          // console.log('queryOrder obj:', obj)
          if (callback) { callback(null, obj) }
        }
      })
    },

    /**
     * 数量+
     */
    add() {
      if (this.aftersalesInfo.goodsInfo.count < this.orderGoodsInfo.goodsNum) {
        this.aftersalesInfo.goodsInfo.count ++
      }
    },

    /**
     * 数量-
     * @return {[type]} [description]
     */
    reduce() {
      if (this.aftersalesInfo.goodsInfo.count > 1) {
        this.aftersalesInfo.goodsInfo.count --
      }
    },

    close() {
      this.popupVisible = false
      this.popupVisible2 = false
      this.popupVisible3 = false
      this.popupVisible4 = false
    },

    /**
     * 提交
     * @return {[type]} [description]
     */
    onSubmit() {
      console.log('提交')
      // let goodsInfo = {}
      console.log(JSON.stringify(this.orderGoodsInfo))
      if (this.orderGoodsInfo.skuId != '' && this.orderGoodsInfo.skuName != '') {
        let skuIds = this.orderGoodsInfo.skuId.split(',')
        let skuNames = this.orderGoodsInfo.skuName.split(',')
        // console.log(skuIds, skuNames)
        if (skuIds.length === skuNames.length) {
          let dynamicAttributes = [];
          for (var i = 0; i < skuNames.length; i++) {
            let attr = {
              attributeId: skuIds[i],
              attributeName: skuNames[i]
            }
            dynamicAttributes.push(attr)
          }
          this.aftersalesInfo.goodsInfo.dynamicAttributes = dynamicAttributes
          // console.log('dynamicAttributes', dynamicAttributes)
        }
      }
      if (this.orderGoodsInfo.goodsId != '') {
        let goods = {
          productId: this.orderGoodsInfo.goodsId
        }
        this.aftersalesInfo.goodsInfo.goods = goods
      }

      // this.aftersalesInfo.goodsInfo = goodsInfo
      this.aftersalesInfo.orderId = this.orderNo
      // console.log('最终的goodsInfo：', JSON.stringify(goodsInfo))
      // 创建
      this.createAftersales((err, obj) => {
        if (err) {
          this.$toast(err)
        }
        // 创建售后单成功
        if (obj) {
          this.$aftersaleslib.queryAfterselesInfo({saleAfterId: obj.afterSalesOrderId}, (err, obj) => {
            if (err) {
              this.$toast(err)
            }
            // 查询售后单成功，发送给IM
            if (obj) {
              let param = this.$aftersaleslib.generateAftersaleForIMRemote(obj)
              this.$jsbridgelib.bridgeIMSendAftersale(param, (err) => {
                if (err) {
                  console.log('bridgePushIM err', err);
                  return this.$toast(err);
                }
                //TODO： 如果是IM跳进来的， 需要navigateBack
                // this.bridgeNativeBack()
                // this.$router.go(-1)
              })
            }
            this.$router.go(-1)
          })
        }
      })
    },

    /**
     * 校验
     * @return {[type]} [description]
     */
    validationData() {

    },

    /**
     * 创建收货单
     * @return {[type]} [description]
     */
    createAftersales(callback) {
      this.$aftersaleslib.createAftersales(this.aftersalesInfo, (err, obj) => {
        if (err) {
          if (callback) { callback(err) }
        }
        if (obj) {
          if (callback) { callback(null, obj) }
        }
      })
    },

  },
  watch: {

  },
  computed: {
    disabled: function () {
      return this.aftersalesInfo.type != '' && this.aftersalesInfo.reasonId != '' && this.aftersalesInfo.returnType != ''
    },
    typeStr: function() {
      if (this.aftersalesInfo.type == 0) {
        return '退货退款'
      }
    },
    reasonStr: function() {
      if (this.aftersalesInfo.reasonId == '01') {
        return '七天无理由退货'
      } else if (this.aftersalesInfo.reasonId == '02') {
        return '做工粗糙／有瑕疵'
      } else if (this.aftersalesInfo.reasonId == '03') {
        return '质量问题'
      } else if (this.aftersalesInfo.reasonId == '04') {
        return '大小／尺寸与商品描述不符'
      } else if (this.aftersalesInfo.reasonId == '05') {
        return '颜色／图案／款式与商品描述不符'
      } else if (this.aftersalesInfo.reasonId == '06') {
        return '材质与商品描述不符'
      } else if (this.aftersalesInfo.reasonId == '07') {
        return '少发／漏件'
      } else if (this.aftersalesInfo.reasonId == '08') {
        return '卖家发错货'
      } else if (this.aftersalesInfo.reasonId == '09') {
        return '包装／商品破损／污渍／裂痕／变形'
      } else if (this.aftersalesInfo.reasonId == '10') {
        return '假冒品牌'
      }
    },
    returnTypeStr: function() {
      if (this.aftersalesInfo.returnType == '0') {
        return '物流退回'
      } else if (this.aftersalesInfo.returnType == '1') {
        return '到店退回'
      }
    },
  }

};
</script>
