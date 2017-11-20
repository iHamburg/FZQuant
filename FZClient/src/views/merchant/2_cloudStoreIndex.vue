<!-- 商户首页 -->
<style lang="scss" src="src/sass/homepageEntrance.scss" scoped></style>
<template>

      <div class="content">
        <!-- Navibar -->
        <bl-bar barStyle="bar-dark-linear">
          <div class="button" slot="left-button" @click="onLogout()">
            <div class="iconfont">退出</div>
          </div>
          <div slot="title">{{merchantInfo.merchantName}}</div>
          <div v-show="$accesslib.isPermitted('cloudom:main:settings')" class="button setbtn" slot="right-button" @click="onSetup()">
            设置
          </div>
        </bl-bar>

        <div class="head-li02">
          <div class="badge-left">
            <div class="listImg" @click="getPicture">
              <img :src="userInfo.avatar" alt="">
            </div>
            <div class="qrcodeDiv" @click="salerVisible = true">
              <em class="qrcode"></em>
            </div>
       <!--    <picture-cutting ref="PictureCut" :PictureData="getData" :PictureRatio=1></picture-cutting> -->

            <div class="head-title">
              <div class="title-name">{{userInfo.name}}<span :class="{'active': isActive}">{{userInfo.roleName}}</span><span v-if="isonDuty">今日当班</span></div>
              <div class="describe">店员ID：{{userInfo.jobNumber}} </div>
              <div class="describe">商 &nbsp;&nbsp;&nbsp;户：{{merchantInfo.merchantName}}</div>
              <div class="describe">门 &nbsp;&nbsp;&nbsp;店：{{merchantInfo.storeName}}</div>
            </div>
          </div>
        </div>

        <div class="blcloudstoregrid">
          <ul>
            <!-- <homepageEntrance v-for="item in datas" v-show="$accesslib.isPermitted(item.surfaceId)" :homePage="item" @click.native="onGridCall(item)"></homepageEntrance> -->
            <!-- 10/20 替换为新九宫格组件 -->
            <BLCloudStoreGrid v-for="item in datas" v-show="$accesslib.isPermitted(item.surfaceId)" :itemData="item" @click.native="onGridCall(item)"></BLCloudStoreGrid>
          </ul>
        </div>
        <!-- 店员二维码 -->
        <div class="modal-bg" v-if="salerVisible" @click="salerVisible = false">
          <span class="qimg">
            <qrcode :cls="qrCls" :value="qrText_saler" :size="275" :type="qrType" :padding="13"></qrcode>
          </span>
        </div>
        <!-- 单图上传 -->
        <!--<div >-->
          <!--<upload ref="uploadSingle" :maxpic='1' @confirm='onGetSingleImage' :ratio=1 :interfaceType="false">-->
          <!--</upload>-->
        <!--</div>-->

        <!-- 隐藏-->
        <!--<mt-popup v-model="loginVisible" position="bottom" style="width: 100%;">-->
          <!--<BLMultiInput :countNumber="countNumber" :inputText="inputText" @input="onInput"></BLMultiInput>-->
        <!--</mt-popup>-->

        <!--<bl-modal :buttons="buttons" v-if="isNotes">-->
          <!--<div slot="inner">-->
            <!--<h2>添加备注</h2>-->
            <!--<textarea type="text" maxlength="100" placeholder="请输入您的备注(100字以内)" v-model="remark"></textarea>-->
          <!--</div>-->
        <!--</bl-modal>-->
      </div>
</template>


<script>

  import utils from 'src/utils';
  import networklib from 'src/libs/networklib';
  import counter from 'components/choose-coupons/counter'
  import BLCloudStoreGrid from 'components/bl-cloudstore-merchant/bl-cloudstore-grid'
  import uiMixin from 'src/mixins/uiMixin';
  import { Popup } from 'mint-ui';

//  import upload from 'components/bl-cloudstore-merchant/bl-cloudStore-image-uploader';

  export default {
    name: 'keepCloudStoreIndex',
    components: {
      counter,
      BLCloudStoreGrid,
//      upload
    },
    data () {
      return {
        title: '商户首页',
        buttons: [{
          text: '取消',
          onClick: () => {
            this.remark = null;
            this.isNotes = false
          }
        }, {
          text: '确认',
          onClick: () => {
            this.isNotes = false;
          }
        }],
        isNotes: false,
        salerVisible: false, // 店员二维码
        qrText_saler: '',
        qrText_paper: null,
        qrCls: 'qrcode',
        qrLevel: 'Q',
        qrType: 'image',
        remark: null,
        // time: '2017-10-11',
        isonDuty: false,
        goodsManagement: false,
        orderManagement: false,
        refundOrderManagement: false,
        inputText: '测试文字',
        countNumber: 100,

        // datas: null,
        datas: [ // 店长菜单
          {"imgUrl": "../static/images/u103.png", "describe": "扫一扫", name: '3.5.2', count: 0, surfaceId: 'cloudom:main:scan'},
          {"imgUrl": "../static/images/xpsx3.png", "describe": "商品上新", count: 0, surfaceId: 'cloudom:main:addGoods'},
          {"imgUrl": "../static/images/spgl3.png", "describe": "商品管理", name: '5', count: 0, surfaceId: 'cloudom:main:goods'},
          {"imgUrl": "../static/images/ddgl3.png", "describe": "订单管理", name: '9.1', count: 0, surfaceId: 'cloudom:main:orders'},
          {"imgUrl": "../static/images/shgl3x.png", "describe": "售后管理", name: '10.1', count: 0, surfaceId: 'cloudom:main:aftersales'},
          {"imgUrl": "../static/images/hxq3.png", "describe": "核销券", name: '3.5.3', count: 0, surfaceId: 'cloudom:main:verifyCoupons'},
          {"imgUrl": "../static/images/xqls3.png", "describe": "销券流水", name: '3.5', count: 0, surfaceId: 'cloudom:main:verifyList'},
          {"imgUrl": "../static/images/zxgj3.png", "describe": "营销工具", name: '6', count: 0, surfaceId: 'cloudom:main:salesManage'},
          {"imgUrl": "../static/images/xqls3.png", "describe": "店铺管理", name: '11', count: 0, surfaceId: 'cloudom:main:clerkManage'},
          {"imgUrl": "../static/images/xqls3.png", "describe": "促销管理", name: '12', count: 0, surfaceId: 'cloudom:main:promotionManage'},
        ],
        /*datas2: [  // 店员菜单
          {"imgUrl": "../static/images/u103.png", "describe": "扫一扫", name: '3.5.2', count: 0},
          {"imgUrl": "../static/images/xpsx3.png", "describe": "商品上新", count: 0},
          {"imgUrl": "../static/images/spgl3.png", "describe": "商品库", name: '5', count: 0},
          {"imgUrl": "../static/images/ddgl3.png", "describe": "订单管理", name: '9.1', count: 0},
          {"imgUrl": "../static/images/spgl3.png", "describe": "售后管理", name: '10.1', count: 0},
          {"imgUrl": "../static/images/hxq3.png", "describe": "核销券", name: '9.1.5.1', count: 0},
          {"imgUrl": "../static/images/xqls3.png", "describe": "销券流水", name: '3.5', count: 0},
          {"imgUrl": "../static/images/xqls3.png", "describe": "店员管理", name: '11', count: 0},
//          {"imgUrl": "../static/images/xqls3.png", "describe": "测试jsbridge","show":1},
        ],*/

        data: {},
        userInfo: {},
        merchantInfo: {},
        isActive: false,
        queryParam: {
          merchantId: null,
          memberId: null,
          type: '1',
          url: ''
        },
        loginVisible: false,
      }
    },
    mixins: [uiMixin],
    created() {
      console.log('app开始进入首页');
      var self = this;
      window.addEventListener("IMKickOff", function(e) {
        console.log('登录被提出');
        self.logout();
      }, false);
      // 登录IM
      this.$jsbridgelib.bridgeIMLogin((err, obj) => {
        console.log('==== bridgeIMLogin callback');
        if (err) {
          return console.log('登录 IM 失败', err);
        }
        //this.$toast('登陆回调成功')
        window.dispatchEvent(new Event("IMLoginFinish"));
      })
    },
    activated() {
      console.log('首页 activated ')
      this.findMerchantManagement();
      this.initialization();

      this.$jsbridgelib.bridgeTest({"massge": 'h5 首页进入activated'}, (err, obj) => {
        console.log('bridgeTest ', err, obj);
      });

      this.qrText_saler = this.$utillib.getClerkQRcode();
      console.log('店员二维码:', this.qrText_saler);

      this.$accesslib.updateAccessList();
    },
    methods: {
      /**
       * 查看是否当班
       */
      findMerchantManagement() {
        this.$merchantlib.findIsonDuty((err, obj) => {
          if (err) { console.log(err) }
          if (obj) {
            this.isonDuty = obj.isonDuty;
          }
        })
      },
      onInput(val) {
        console.log('onInput ', val);
        this.inputText = val;
        this.loginVisible = false;
      },
      /**
       * 初始化商户数据
       */
      initialization: function() {
        console.log('商户首页 initialization');
        this.merchantInfo = this.$merchantlib.getMerchantInfo();
        this.userInfo = this.$merchantlib.getUserInfo();
        /*if (this.$merchantlib.getRoleId() == '9') {
          this.$merchantlib.findPendingPrompt((err, obj) => {
            if (err) { console.log(err) }
            if (obj) {
//              console.log('hongdian', obj)
              this.datas1[1].count = obj.goodsManagement
              this.datas1[2].count = obj.orderManagement
              this.datas1[3].count = obj.refundOrderManagement
            }
            // 深层复制数组， 让页面刷新
            this.datas = this.datas1.concat();
          })
          // this.datas = this.datas1;
        } else {
          this.datas = this.datas2;
        }*/
        // TODO 等书豪配置权限完成，改成一个datas
        this.$merchantlib.findPendingPrompt((err, obj) => {
          if (err) { console.log(err) }
          if (obj) {
//              console.log('hongdian', obj)
            this.datas[2].count = obj.goodsManagement
            this.datas[3].count = obj.orderManagement
            this.datas[4].count = obj.refundOrderManagement
          }
          // 深层复制数组， 让页面刷新
          // this.datas = this.datas.concat();
        })
        // 每次就首页都查一次-查询商户设置
        this.$merchantlib.queryMerchantInfoSite((err, obj) => {
          if (err) { console.log(err) }
          if (obj) {
            let updateObj = {
              pickupAddress: obj.pickupAddress,
              logoUrl: obj.logoUrl,
              mercPhone: obj.mercPhone
            }
            this.$merchantlib.updateLocalMerchantInfo(updateObj)
          }
        })
      },
      onSetup: function() {
        console.log('跳转到设置')
        this.$router.push({name: '2.1'});
      },

      onGridCall: function (item) {
        let title = item.describe;
        console.log('call ', title);
        if (title == '扫一扫') {
          this.$router.push({name: item.name})
        } else if (title == '商品上新') {
          return this.onScanGoods();
        } else if (title == '测试jsbridge') {
          console.log('测试jsbridge');
          return this.testJSBridge();
        } else if (title == '测试按钮') {
          return this.testJSBridge();
        } else if (title == '商品管理' || title == '商品库') {
          utils.storageSet('flag', 1);
          //this.$router.push({name: 'ui/5.1'})
          this.$router.push({name: item.name})
        } else {
          this.$router.push({name: item.name})
        }
      },
      onLogout: function () {
        this.$modal({
          title: '',
          content: '确定要退出吗？',
          buttons: [
            {
              text: '取消',
              onClick: () => {}
            },
            {
              text: '确定',
              onClick: () => {
                //登出
                this.logout();
              }
            }
          ]
        })
      },

      /**
       * 点击上新
       */
      onScanGoods: function () {
        let self = this;
        console.log('onScanGoods');

        // 101 - 扫描商品吊牌条形码
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

          //TODO: 重新定义接口 扫码结果，查询货号
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
      testJSBridge() {
//        this.callHandler('handleTest', {msg: 'hello from js'}, (err, obj) => {
//          this.$toast('test obj' + obj)
//          console.log('test ', err, obj);
//        });

//        this.loginVisible = true;

//        this.bridgeGetDeviceId((err, obj) => {
//          this.$toast('test obj' + obj)
//          console.log('test ', err, obj);
//        })

        this.isNotes = true;
      },
      // 注销
      logout: function () {
        this.$merchantlib.logout();
        this.$jsbridgelib.bridgeLogout((err) => {
          if (err) {
            console.log('logOut err :' + err)
          }
        });
        this.$router.push('/login')
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
      getPicture() {
        this.$refs.uploadSingle.getPicture()
      },

      onGetSingleImage(url) {
        // 获得图片url之后更新信息
        this.$merchantlib.updateMemberAvatar(url.mediaCephUrl, '1', (err) => {
          if (err) {
            return this.$toast(err);
          }
          console.log('-----------入参url: ', url);
          this.$merchantlib.updateLocalUserInfo({'avatar': url.mediaCephUrl})
          this.userInfo.avatar = url.mediaCephUrl;
          console.log(' this.userInfo.avatar: ', this.userInfo.avatar);
          this.$toast('更新商户图像成功');
        });
      },
    }
  }
</script>

