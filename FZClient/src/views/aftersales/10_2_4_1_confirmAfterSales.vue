<!-- 退货单回录 -->
<style lang="scss" src="src/sass/afterSale.scss" scoped></style>

<template>
  <div class="content">
    <bl-bar barStyle="bar-dark-linear">
        <div class="button" slot="left-button" @click="onBack">
          <div class="iconfont arrow-back"><i class="fback">返回</i></div>
        </div>
        <div slot="title">退货单回录</div>
    </bl-bar>
    <audio id="playAudio" src="static/media/offbill.mp3"></audio>
    <div class="billing">
      <bl-comli class="otop">
        <div slot='left-text' class="left-box" style="color: red;">百联通账号</div>
        <div slot='right-text' class="right-box">
          <div class="right-l" style="color: red;">{{ accountNumber }}</div>
        </div>
      </bl-comli>

      <div class="tips">请在退单时输入用户的百联通账号</div>

      <upload :maxpic='1' :paths='paths' :name='"上传退货照片"' class="margin-b" @clickImg='seeBigImg'  :mainpic='picindex' @confirm='onGetGoodsImage' @deleteConfirm='deleteConfirm' :ratio=0>
      </upload>
      <div class="watch-pic" ref='big' @click='hidebig'>
        <div class="pic-box">
          <img :src="siglepath">
        </div>
      </div>

      <bl-comli class="otop">
        <div slot='left-text' class="left-box" style="font-weight:bold;">退货单号</div>
        <div slot='right-text' class="right-box">
          <div class="right-l"> <input type="text" placeholder="请输入退货单号" maxlength="100" v-model.trim="queryParam.returnGoodsNo"> </div>
          <!-- <i class="shao" @click="onScan()"></i> -->
        </div>
      </bl-comli>

      <bl-comli class="otop"  v-show="isAll == 0">
        <div slot='left-text' class="left-box" style="font-weight:bold;">应退金额  &nbsp; &nbsp;&yen;</div>
        <div slot='right-text' class="right-box">
          <div class="right-l"> <input type="number" placeholder="请输入商品应退金额" v-model.number="queryParam.amount" @keyup="initAmount"> </div>
        </div>
      </bl-comli>
      <p class="tips" v-show="isAll == 0">请确认订单中该商品的金额和折扣后再填入</p>
<!--       <bl-comli class="otop">
        <div slot='left-text' class="left-box">退还订单运费</div>
        <div slot='right-text' class="right-box">
          <div class="right-l"></div>
            <span slot="check" v-show="isCheck" class="checkicon">
              <i></i>
            </span>
        </div>
      </bl-comli> -->

      <bl-comli class="otop">
        <div slot='left-text' class="left-box" style="font-weight:bold;">查看订单</div>
        <div slot='right-text' class="right-box" @click="seeDetail">
          <div class="right-l"></div>
          <div class="iconfont arrow-back"></div>
        </div>
      </bl-comli>

      <div class="editgress sureoff">
          <bl-button :disabled="!disabled" @click="isOK = !isOK">确认退货</bl-button>
      </div>
      <!-- 退款pop -->
      <bl-modal :buttons="button" v-if="isOK">
        <div slot="inner">
            <h4>请确认退货信息</h4>
            <p>退货单号：{{this.queryParam.returnGoodsNo}}</br>
<!--                订单运费：&yen;
               <span v-if="this.queryParam.Isfreight == 0">0</span>
               <span v-if="this.queryParam.Isfreight == 1">10</span> -->
            </p>
            <p v-show="isAll == 0">商品应退金额：&yen;{{this.queryParam.amount}}</p>
        </div>
      </bl-modal>
    </div>
  </div>

</template>

<script>
import orderlib from 'src/libs/orderlib';
import uiMixin from 'src/mixins/uiMixin';
// import upload from 'components/cloud-merchant/receipt-upload'
import upload from 'components/bl-cloudstore-merchant/bl-cloudStore-image-uploader';
//import jsbridge from 'src/mixins/jsbridge'
const numberRE = /^[0-9]+(.[0-9]{1,2})?$/
export default {
  name: 'keepConfirmAfterSales',
  mixins: [uiMixin],
  components: {
    upload
  },
  mounted() {
    // this.queryParam.afterSalesId = this.$route.params.id
    // console.log('mounted', this.queryParam.afterSalesId)
    // this.orderNo = this.$route.params.orderNo
  },
  activated() {
    console.log('params：', this.$route.params)
    // 播放音频
    document.getElementById("playAudio").play()
    this.queryParam.afterSalesId = this.$route.params.id
    this.maxRefunds = this.$route.params.maxRefunds
    // 进入页面自动填入
    this.queryParam.amount = this.maxRefunds
    console.log('最大退款金额：', this.maxRefunds)
    this.accountNumber = this.$route.params.accountNumber
    this.orderNo = this.$route.query.orderNo
    // isAll 是否整单 (0否 1是)
    this.isAll = this.$route.query.isAll
    console.log('activated afterSalesId：', this.queryParam.afterSalesId, '是否整单', this.isAll, 'orderNo:', this.orderNo)
    // console.log('params', this.$route.params)
    // 0: 整单退
    if (this.isAll == 1) {
      this.queryParam.amount = '0'
    }
    document.body.scrollTop = 0
  },

  data () {
    return {
      isAll: null,
      picindex: -1,
      siglepath: '',
      paths: [],
      big: false,
      select: false,
      isOK: false,
      isCheck: true,
      orderNo: null,
      accountNumber: '',
      queryParam: {
        Isfreight: '0', // 是否补贴订单运费 （0:不补/1：补）
        afterSalesId: null, // 售后单ID
        returnGoodsNo: null, // 退货单号
        amount: null, // 应退金额
        imgUrl: null, // 退货照片url
      },
      button: [{
        text: '取消',
        onClick: () => {
          this.isOK = false
          this.$toast('取消')
        }
      }, {
        text: '确定退货',
        onClick: () => {
          this.isOK = false
          this.btn_ok();
        }
      }],
    }
  },
  computed: {
    disabled() {
      if (this.queryParam.amount == '0' && this.isAll == 0) {
        return this.queryParam.returnGoodsNo && this.queryParam.imgUrl
      } else {
        return this.queryParam.returnGoodsNo && this.queryParam.amount && this.queryParam.imgUrl
      }
    }
  },
  methods: {
    initAmount() {
      console.log('输入的退款金额：', this.queryParam.amount)
      if (this.queryParam.amount > this.maxRefunds) {
        this.$toast('退款金额不能大于商品金额')
        this.queryParam.amount = 0
      }
    },
    // 看大图
    seeBigImg(index) {
      this.siglepath = this.queryParam.imgUrl;
      this.$refs.big.style.visibility = 'visible';
    },
    // 隐藏大图
    hidebig() {
      this.$refs.big.style.visibility = 'hidden';
    },
    //回调获取商品上传图片.
    onGetGoodsImage(data) {
      this.queryParam.imgUrl = data.mediaCephUrl;
      this.paths.push(this.queryParam.imgUrl);
      console.log('this.queryParam.imgUrl', this.queryParam.imgUrl);
    },

    //图片回调删除方法:deleteConfirm data.index
    deleteConfirm(data) {
      this.siglepath = '';
      this.paths.splice(data.index, 1);
      this.queryParam.imgUrl = null
    },
    //扫码获取退货单号
    // onScan() {
    //   this.callHandler('handleScan', null, (err, obj) => {
    //     if (err) {
    //       console.log('scan  err', err);
    //     }
    //     if (!obj) {
    //       return;
    //     }
    //     // 退货单号
    //     this.queryParam.returnGoodsNo = obj.result;
    //     if (!this.queryParam.returnGoodsNo) {
    //       return;
    //     }
    //   });
    // },
    // 点击勾选是否退还订单运费
    // checkRadio() {},

    // 确认退货回录
    btn_ok() {
      if (!numberRE.test(this.queryParam.amount)) {
        console.log('false or ture:', !numberRE.test(this.queryParam.amount))
        this.$toast("应退金额最多可输入2位非负数小数", "text")
        return
      }
      console.log('退货入参：', this.queryParam)
      this.$aftersaleslib.confirmAfterSale(this.queryParam, (err, obj) => {
        if (err) {
          // 11/06 直接弹出接口错误信息
          return this.$toast(err)
        }
        this.$toast('退货成功');
        // 跳转售后详情：已退款  跳转页面
        this.onBack()
      });
    },
    // 查看详情
    seeDetail() {
      document.getElementById("playAudio").currentTime = 0
      this.$router.push({name: '9.1.2', params: {orderNo: this.orderNo}})
    },
    // 返回或者跳转页面清空数据
    initData() {
      this.queryParam.returnGoodsNo = null
      this.queryParam.amount = null
      this.paths = []
    },
    onBack() {
      // 当点击返回时需要清空退货单回录数据记录
      this.initData()
      this.$router.go(-1)
      // 停止播放音频
      document.getElementById("playAudio").currentTime = 0
    }
  }
}
</script>
