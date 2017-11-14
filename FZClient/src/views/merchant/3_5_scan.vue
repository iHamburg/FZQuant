<!-- 商户首页 -->
<style lang="scss" src="src/sass/homepageEntrance.scss" scoped></style>
<style lang="scss" scoped>
  li:active {
    opacity: 0.6
  }
  .setbtn{
    position: absolute;
    right:0;
    top:0;
  }
</style>
<template>
      <div class="content">
        <bl-bar barStyle="bar-dark-linear">
          <div class="button" slot="left-button" @click="$router.go(-1)">
            <div class="iconfont arrow-back"></div>
          </div>
          <div slot="title">扫一扫</div>
        </bl-bar>
        <div class="scanText">
              请选择扫描类型
        </div>
        <div class="blcloudstoregrid">
          <ul>
            <!-- 替换为新九宫格组件 -->
            <BLCloudStoreGrid v-for="item in datas" :itemData="item" @click.native="onGridCall(item)"></BLCloudStoreGrid>
          </ul>
        </div>
      </div>
</template>


<script>

  import uiMixin from 'src/mixins/uiMixin';
  import networklib from 'src/libs/networklib';
  import BLCloudStoreGrid from 'components/bl-cloudstore-merchant/bl-cloudstore-grid'

  export default {
    name: 'keepCloudStoreIndex',
    components: {
      BLCloudStoreGrid
    },
    data () {
      return {
        result: '',
        datas: [ // 店长菜单
          {"imgUrl": "../static/images/u103.png", "describe": "核销提货码", "name": '9.1.5.1', "show": 1, count: 0},
          {"imgUrl": "../static/images/u103.png", "describe": "核销优惠券", "name": '9.1.5.1', "show": 1, count: 0},
          {"imgUrl": "../static/images/u103.png", "describe": "扫用户二维码", "name": '', "show": 1, count: 0},
          {"imgUrl": "../static/images/xpsx3.png", "describe": "扫码上新", "show": 1, count: 0},
        ],
      }
    },
    mixins: [uiMixin],
    created() {
    },
    activated() {
    },
    methods: {
      onGridCall: function (item) {
        let title = item.describe;
        console.log('call ', title);
        if (title == '核销提货码') {
          this.onScanBridge('2', item.name);
        } else if (title == '核销优惠券') {
          this.onScanBridge('1', item.name);
        } else if (title == '扫码上新') {
          return this.onScanGoods();
        } else if (title == '扫用户二维码') {
          this.onScanMember(item.name);
        } else {
          this.$router.push({name: item.name})
        }
      },
      // 调出手机系统扫一扫插件界面
      onScanBridge: function(type, name) {
        let self = this;
        this.$jsbridgelib.callHandler('handleScan', {promptText: '请将二维码／条码放入框内，即可进行扫描'}, (err, obj) => {
          if (err) {
            return self.$toast(err)
          }
          if (!obj) {
            obj = {};
          }
          if (obj) {
            this.result = obj.result;
            this.$router.push({name: name, params: {result: this.result, tab: type}})
          }
        })
      },
      onScanMember: function(name) {
        let self = this;
        this.$jsbridgelib.callHandler('handleScan', {promptText: '请将二维码／条码放入框内，即可进行扫描'}, (err, obj) => {
          if (err) {
            return self.$toast(err)
          }
          if (!obj) {
            obj = {};
          }
          if (obj) {
            this.result = obj.result;
            if (this.result.indexOf("blcloudstore://cloudstore/page/PersonalHomepage?memberId=") < 0) {
              return this.$toast('该用户不是云店会员')
            }
            this.memberId = this.result.replace("blcloudstore://cloudstore/page/PersonalHomepage?memberId=", "");
            this.$router.push({path: '/contactDetail/' + this.memberId})
          }
        })
      },
      /**
       * 点击扫码上新
       */
      onScanGoods: function () {
        let self = this;
        console.log('onScanGoods');
        // 扫描商品吊牌条形码
        this.$jsbridgelib.bridgeScanGoodsCard(function (err, obj) {
          if (err) {
            console.log('bridge scan goods card error ', err);
          }
          console.log('扫描结果', obj);
          if (!obj) obj = {};
          let freightNo = obj.result;
          if (!freightNo) { // 跳过直接进入商品上新页
            return self.$router.push({path: '/createGoods'});
          }
          //重新定义接口 扫码结果，查询货号
          self.queryGoods(freightNo, function (err, goodsId) {
            if (err) {
            }
            console.log('goodsId', goodsId);
            if (goodsId) { // 查到商品，跳转到商品详情页
              self.$router.push({path: '/goods/' + goodsId});
            } else { // 没有查询到商品，跳到上新页,带入货号
              self.$router.push({path: '/createGoods', query: {freightNo}});
            }
          });
        });
      },
      /**
       * 根据货号查询商品
       * @param freightNo
       * @param callback (err,goodsId)
       */
      queryGoods(freightNo, callback) {
        let apiId = '1008';
        let merchantId = this.$merchantlib.getMerchantId();
        let queryParam = {merchantId: merchantId, freightNo: freightNo}
        networklib.post(apiId, queryParam).then((obj) => {
//            console.log('成功的回调', obj);
          callback(null, obj.goodsId);
        }).catch(err => {
          if (err == '接口错误 02000015 没有查询到相关商品') {
            callback(null, null);
          } else {
            callback(err);
          }
        })
      },
    }
  }
</script>

