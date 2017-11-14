<!-- 开单 -->
<style lang="scss" src="src/sass/billing.scss" scoped></style>

<template>
  <div class="content">
    <bl-bar barStyle="bar-dark-linear">
        <div class="button" slot="left-button" @click="onBack()">
          <div class="iconfont arrow-back"><i class="fback">返回</i></div>
        </div>
        <div slot="title">开单</div>
    </bl-bar>

    <div class="billing">
      <audio id="playAudio" src="static/media/bill.mp3"></audio>
      <bl-comli>
          <div slot='left-text' class="left-box">开单金额(不含运费)</div>
          <div slot='right-text' class="right-box">
            <div class="right-r red"> &yen;{{ money }}</div>
          </div>
      </bl-comli>
      <bl-comli>
          <div slot='left-text' class="left-box">平台券优惠金额</div>
          <div slot='right-text' class="right-box">
            <div class="right-r red"> -&yen;{{ platformDiscountAmount }}</div>
          </div>
      </bl-comli>
      <bl-comli>
          <div slot='left-text' class="left-box">商品实付金额</div>
          <div slot='right-text' class="right-box">
            <div class="right-r red"> &yen;{{ billingAmount }}</div>
          </div>
      </bl-comli>

      <bl-comli>
        <div slot='left-text' class="left-box">订单条形码</div>
        <div slot='right-text' class="right-box">
          <div class="right-r"><img id="barcode"/></div>
        </div>
      </bl-comli>
      <bl-comli>
          <div slot='left-text' class="left-box">百联通账号</div>
          <div slot='right-text' class="right-box">
            <div class="right-r red">{{ tel }}</div>
          </div>
      </bl-comli>
<!--        <bl-comli>
          <div slot='right-text' class="right-box">
          <div style="color:red;font-size: 13px;">请将订单积分记入以上百联通账号</div>
          </div>
       </bl-comli> -->

      <div class="tips">请将订单积分记入以上百联通账号</div>

      <div class="order-product" v-if="!isallProduct">
          <div class="probox" v-for="(item, index) in goodsList" v-if="index < 2">
              <span class="picture"><img :src="item.imgUrl"></span>
              <dl>
                <dt>{{ item.goodsName }}</dt>
                <dd>
                    <span class="pl">{{ item.size }}  {{ item.color }} x{{ item.goodsNum }} </span>
                    <span class="pr">&yen;{{ item.goodsPrice }}</span>
                </dd>
              </dl>
          </div>
      </div>
      <div class="order-product" v-else>
          <div class="probox" v-for="(item, index) in goodsList">
              <span class="picture"><img :src="item.imgUrl"></span>
              <dl>
                <dt>{{ item.goodsName }}</dt>
                <dd>
                    <span class="pl">{{ item.size }}  {{ item.color }} x{{ item.goodsNum }} </span>
                    <span class="pr">&yen;{{ item.goodsPrice }}</span>
                </dd>
              </dl>
          </div>
      </div>
      <bl-comli v-show="num > 2">
          <div slot='left-text' class="left-box showall" v-show="!isallProduct">更多商品（{{num - 2}}）</div>
          <div slot='right-text' class="right-box" @click="isallProduct = !isallProduct">
            <div class="right-r"></div>
            <div class="iconfont arrow-back" :class="{'arrow-up':isallProduct}"></div>
          </div>
      </bl-comli>

      <upload :maxpic='1' :paths='paths' :name='"请上传小票图片"' class="margin-b"
        :needmain='false' :mainpic='picindex' @confirm='onGetGoodsImage' @deleteConfirm='deleteConfirm' :ratio=0  @clickImg='parentImg'>
      </upload>
      <bigImage  ref='big' :sigleImagePath="siglepath" showImageType="'1'"></bigImage>

      <bl-comli class="otop">
          <div slot='left-text' class="left-box">销售单号</div>
          <div slot='right-text' class="right-box">
            <div class="right-l"> <input type="text" v-model="message" placeholder="必填"> </div>
           <!--  <i class="shao"></i> -->
          </div>
      </bl-comli>
      <p class="tips">请确保销售单内商品和金额与订单保持一致，且单号准确无误！</p>
      <div style="height:1px;"></div>

      <div class="editgress sureoff">
          <bl-button @click='submit'>确认开单</bl-button>
      </div>

    </div>
    <div style="height:1px;"></div>

  </div>

</template>

<script>
import orderlib from 'src/libs/orderlib';
import uiMixin from 'src/mixins/uiMixin';
import upload from 'components/bl-cloudstore-merchant/bl-cloudStore-image-uploader'
import bigImage from 'components/bl-cloudstore-merchant/bl-cloudStore-seeBigImage'
export default {
  name: 'billing',
  mixins: [uiMixin],
  components: {
    upload,
    bigImage,
  },
  created() {
    document.body.scrollTop = 0
  },
  mounted() {
    // 播放音频
    document.getElementById("playAudio").play()
    // 调用查询订单详情.
    if (this.$route.params.orderNo) {
      this.orderNo = this.$route.params.orderNo;
    }
    console.log("订单Id:", this.orderNo);
    this.orderDetails(this.orderNo);
    // 条形码
    var JsBarcode = require('jsbarcode');
    var str = this.orderNo
    var options = {format: "CODE128", displayValue: false, height: 40, margin: 0};
    JsBarcode("#barcode", str, options)
  },

  data () {
    return {
      isallProduct: false,
      money: 0, // 开单金额
      billingAmount: 0, // 开票金额
      platformDiscountAmount: 0, // 平台券优惠金额
      tel: null,
      num: 0,
      goodsList: [],
      picindex: -1,
      siglepath: '',
      orderNo: 'YDDUA7O20170510193929807003',
      paths: [],
      message: '',
      param: {
        orderNo: '',
        memberId: '',
        merchantId: '',
        imgUrl: '',
        salesSlipNo: ''
      }
    }
  },
  computed: {
  },
  methods: {
    parentImg(index) {
      console.log('查看大图')
      this.$refs.big.openBigImage();
    },
    //回调获取商品上传图片.
    onGetGoodsImage(data) {
      this.siglepath = data.mediaCephUrl;
      this.paths.push(data.mediaCephUrl);
      console.log('this.siglepath', this.siglepath);
    },

    //图片回调删除方法:deleteConfirm data.index
    deleteConfirm(data) {
      this.siglepath = '';
      this.paths.splice(data.index, 1);
    },
  // 查询订单详情接口.
    orderDetails(orderNo) {
      let self = this;
      this.startLoading();
      orderlib.queryOrder(orderNo, (err, obj) => {
        this.stopLoading();
        if (err) {
          setTimeout(function() {
            return self.$toast(err);
          }, 600);
        }
        let goodsGroupList = obj.goodsGroupList;
        this.money = obj.singleAmount
        this.billingAmount = obj.billingAmount
        this.platformDiscountAmount = obj.platformDiscountAmount
        goodsGroupList.forEach(function(item) {
          item.goodsList.forEach(function(item2) {
            item2.size = item2.skuName.split(',')[0];
            item2.color = item2.skuName.split(',')[1];
          })
          self.goodsList = self.goodsList.concat(item.goodsList)
        })
        this.num = this.goodsList.length;
        // console.log('运费是否为null：', obj.carriageMoney === 'null')
        // 接口返回字符串null，默认为0
        // this.money = parseFloat(obj.shouldMoney) - parseFloat(obj.carriageMoney === 'null' ? 0 : obj.carriageMoney);
        // console.log('应付金额：', obj.shouldMoney, '运费：', obj.carriageMoney, '订单金额：', this.money)
        // this.moeny = parseFloat(obj.shouldMoney) - parseFloat(obj.carriageMoney === 'null' ? 0 : obj.carriageMoney);
        // console.log('应付金额：', obj.shouldMoney, '运费：', obj.carriageMoney, '订单金额：', this.moeny)
        this.tel = obj.memberPhone;
        console.log('goodsList : ', this.goodsList);
      });
    },
    submit() {
      let self = this;
      this.param.imgUrl = this.siglepath;
      this.param.salesSlipNo = this.message;
      console.log((/^[A-Za-z0-9]+$/).exec(this.message));
      this.param.orderNo = this.orderNo;
      console.log('开单数据:', 'salesSlipNo:' + this.param.salesSlipNo + ',imgUrl:' + this.param.imgUrl);
      if (!this.param.imgUrl) {
        return this.$toast("请上传小票图片");
      }
      if (!this.param.salesSlipNo) {
        return this.$toast("请输入销售单号");
      }
      if (!(/^[A-Za-z0-9]+$/).exec(this.message)) {
        return this.$toast("请输入正确的销售单号");
      }
      if (this.message.length > 30) {
        return this.$toast("销售单号不能超过30位");
      }
      this.startLoading();
      orderlib.receiveOrder(this.param, (err, obj) => {
        this.stopLoading();
        if (err) {
          return self.$toast(err);
        }
        //跳转到 - 订单列表页面.
        // let orderState = '02'
        // this.$router.replace({name: '9.1.1', params: {orderState}})
        this.onBack()
      })
    },
    onBack() {
//      let orderState = '02'
//      this.$router.replace({name: '9.1.1', params: {orderState}})
      this.$router.go(-1)
    }
  }
}
</script>
