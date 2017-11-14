 <template>
  <div class="content">
    <!-- <h1>hhh</h1> -->
    <bl-bar barStyle="bar-dark-linear">
      <div class="button" slot="left-button" @click="$router.go(-1)">
        <div class="iconfont arrow-back"></div>
      </div>
      <div slot="title">商品二维码</div>
    </bl-bar>

    <div class="navbar-box">
        <bl-navbar v-model="selected">
          <bl-tab-item id="1">电子版</bl-tab-item>
          <bl-tab-item id="2">纸质版</bl-tab-item>
        </bl-navbar>
        <bl-tab-container :swipeable="true" v-model="selected">

          <!--电子版-->
          <bl-tab-container-item id="1">
            <div id="qrcode">
              <div class="code">
                <h1>{{normQualityName}}</h1>
                <span>货号：{{freightNo}}</span>
              </div>
              <qrcode :cls="qrCls" :value="qrText_elec" :size="280" type="image"></qrcode>
            </div>
          </bl-tab-container-item>

          <!--纸制版-->
          <bl-tab-container-item id="2">
            <div id="qrcode" v-if="noCode">
              <div class="code">
                <h1>{{normQualityName}}</h1>
                <span>货号：{{freightNo}}</span>
              </div>
              <qrcode :cls="qrCls" :value="qrText_elec" :size="280" type="image"></qrcode>
              <qrcode :cls="qrCls" :value="qrText_elec" :size="280" type="image"></qrcode>

              <span class="barcode"><img src="static/images/barcode.png"></span>
              <span class="barcode"><img src="static/images/barcode.png"></span>

            </div>

            <div id="qrcode" v-else="noCode">
                <h2>暂时没有绑定二维码，请绑定</h2>
                <bl-button class="btn">绑定</bl-button>
            </div>
          </bl-tab-container-item>

        </bl-tab-container>
      </div>

  </div>

</template>

<script>
  // import utils from 'src/utils'
  import Qrcode from 'v-qrcode'
  import networklib from 'src/libs/networklib';
  // import merchantlib from 'src/libs/merchantlib';
  import uiMixin from 'src/mixins/uiMixin';
  import goodslib from 'src/libs/goodslib';

export default {
    name: 'goodsQR',
    components: {
      Qrcode
    },

    data () {
      return {
        noCode: true,
        items: [

        ],
        selected: '1',
        freightNo: 12934812904789,
        normQualityName: 'WOMAN女装针织裤束脚裤针织束脚裤',
        goodsId: null,
        qrText_paper: null,
        qrText_elec: null,
        qrCls: 'qrcode',
        merchantId: null
      }
    },
    created() {
      //console.log('created')
      //获取传入的参数

      // this.goodsId = this.$route.query.goodsId
      // this.freightNo = this.$route.query.freightNo
      // this.normQualityName = this.$route.query.normQualityName
      this.qrText_elec = this.$route.query.goodsId
      // this.merchantId = merchantlib.merchantId

      // 查询纸质版二维码
      this.showQrcode()
  //    goodslib.bindGoodsQRCode(1,2);
    },

    mixins: [],

    methods: {
      /**
       * 扫码
       **/
      onScan: function () {
        console.log('onScan');

        let self = this;
        this.$jsbridgelib.callHandler('handleScan', null, function (err, obj) {
          if (err) {
            return self.$toast('扫码失败 ', err);
          }
          if (!obj)obj = {};

          let qrCode = obj.result;
          if (!qrCode) return self.$toast('扫码没有结果');

          console.log('scan obj', qrCode);

          // 调用接口，绑定二维码

          goodslib.bindGoodsQRCode(self.goodsId, qrCode, function (err) {
            if (err) {
              return self.$toast('服务器错误' + err);
            }
            self.showQrcode();
          })
        });
      },

      /** 查询商品二维码 */
      showQrcode: function () {
        let apiId = '1016';
        let queryParam = {goodsId: this.goodsId}
        console.log('查询二维码', queryParam);
        networklib.post(apiId, queryParam).then((obj) => {
          this.items = obj.list;
          console.log('成功的回调', obj);
        }, (err) => {
          console.log('失败的回调', apiId, err);
        })
      },
    }
}

</script>
