<!--商户设置-->
<style lang="scss" src="src/sass/merSetting.scss" scoped></style>
<template>
  <div class="content">

    <bl-bar barStyle="bar-dark-linear">

      <div class="button" slot="left-button" @click="onBack">
        <div class="iconfont arrow-back"><i class="fback">返回</i></div>
      </div>
        <div slot="title">商户设置</div>
    </bl-bar>

    <div class="merset">
        <div class="divstyle">员工基础信息</div>
        <bl-comli>
            <div slot='left-text' class="left-box">员工姓名</div>
            <div slot='right-text' class="right-box">
              <div class="right-l">
                  <span>{{ item.memberName }}</span>
              </div>
            </div>
        </bl-comli>
        <bl-comli>
            <div slot='left-text' class="left-box">所属角色</div>
            <div slot='right-text' class="right-box">
              <div class="right-l">
                  <span>{{ item.role }}</span>
              </div>
            </div>
        </bl-comli>
        <bl-comli>
            <div slot='left-text' class="left-box">员工头像</div>
            <div slot='right-text' class="right-box" @click="getPicture(1)">
              <div class="right-l">
                <div class="img-box" @click="popupVisible3 = true">
                    <img :src="item.avatarUrl">
                </div>
              </div>
              <div class="iconfont arrow-back"></div>
            </div>
        </bl-comli>

        <bl-comli>
          <div slot='left-text' class="left-box">我的二维码</div>
          <div slot='right-text' class="right-box" @click="salerVisible = true">
            <div class="right-l">
              <em class="qrcode"></em>
            </div>
            <div class="iconfont arrow-back"></div>
          </div>
        </bl-comli>
        <bl-comli class="moreli">
            <div slot='left-text' class="left-box">密码设置</div>
            <div slot='right-text' class="right-box" @click="toForgetPassword">
              <div class="right-l">
              </div>
              <div class="iconfont arrow-back"></div>
            </div>
        </bl-comli>
        <bl-comli class="moreli">
            <div slot='left-text' class="left-box">个人简介</div>
            <div slot='right-text' class="right-box" @click="toIndividualResume">
              <div class="right-l line3">
                <span>{{ personalProfile }}</span>
              </div>
              <div class="iconfont arrow-back"></div>
            </div>
        </bl-comli>
        <!-- 单图上传 -->
        <div>
          <upload ref="uploadSingle" :maxpic='1' @confirm='onGetSingleImage' :ratio=1 :interfaceType="false">
          </upload>
        </div>
        <!-- <picture-cutting ref="PictureCut" :PictureData="getData" :PictureRatio=1></picture-cutting> -->
        <div class="divstyle">商户基础信息</div>
        <bl-comli class="moreli">
          <div slot='left-text' class="left-box">商户名称</div>
          <div slot='right-text' class="right-box">
            <div class="right-l">
              <div class="items">
                  <span>{{ merchantName }}</span>
              </div>
            </div>
          </div>
        </bl-comli>
        <bl-comli class="moreli">
          <div slot='left-text' class="left-box">所属门店</div>
          <div slot='right-text' class="right-box">
            <div class="right-l">
              <div class="items">
                  <span>{{ storeName }}</span>
              </div>
            </div>
          </div>
        </bl-comli>
        <bl-comli>
          <div slot='left-text' class="left-box">商户logo</div>
          <div slot='right-text' class="right-box" @click="getPicture(2)">
            <div class="right-l">
              <div class="img-box" @click="popupVisible2 = true">
                  <img :src="items.logoUrl">
              </div>
            </div>
            <div class="iconfont arrow-back"></div>
          </div>
        </bl-comli>
        <bl-comli>
          <div slot='left-text' class="left-box">商户二维码</div>
          <div slot='right-text' class="right-box" @click="popupVisible = true">
            <div class="right-l">
                <em class="qrcode"></em>
            </div>
            <div class="iconfont arrow-back"></div>
          </div>
        </bl-comli>
        <!-- 商户电话 -->
        <bl-comli>
          <div slot='left-text' class="left-box">商户电话</div>
          <div slot='right-text' class="right-box">
            <div class="right-l">
                <span>{{ items.mercPhone }}</span>
            </div>
          </div>
        </bl-comli>

        <div class="divstyle">地址设置</div>
        <!-- 提货地址 -->
        <bl-comli>
            <div slot='left-text' class="left-box">提货地址</div>
            <div slot='right-text' class="right-box">
                  <div class="right-l">
                    <div class="items">
                        <span>{{ items.pickupAddress }}</span>
                    </div>
                  </div>
              <!-- <div class="iconfont arrow-back"></div> -->
            </div>
        </bl-comli>
        <!-- 退货地址 -->
        <bl-comli>
          <div slot='left-text' class="left-box">退货地址</div>
          <div slot='right-text' class="right-box">
                <div class="right-l">
                  <div class="items">
                      <span>{{ items.returnAddress }}</span>
                  </div>
                </div>
            <!-- <div class="iconfont arrow-back"></div> -->
          </div>
        </bl-comli>


        <div class="divstyle">经营设置</div>
        <bl-comli class="moreli">
          <div slot='left-text' class="left-box">经营品牌</div>
            <div slot='right-text' class="right-box"  @click="gotoBrandList()">
                <div class="right-l">
                    <div class="items line3">
                        <span v-for="data in brandNamedData">{{ data }}、</span>
                    </div>
                </div>
              <div class="iconfont arrow-back"></div>
            </div>
        </bl-comli>
        <!-- 购买提示 -->
        <bl-comli @click.native="onshopContent()" class="moreli">
          <div slot='left-text' class="left-box">购买提示</div>
          <div slot='right-text' class="right-box">
            <div class="right-l line3">
                <span>{{ buyContent }}</span>
            </div>
            <div class="iconfont arrow-back"></div>
          </div>
        </bl-comli>
        <div class="divstyle">帮助</div>
        <!-- 用户使用说明 -->
        <bl-comli @click.native="onUserhelp()" class="moreli">
          <div slot='left-text' class="left-boxs">商户APP使用说明</div>
          <div slot='right-text' class="right-box">
            <div class="right-l">
            </div>
            <div class="iconfont arrow-back"></div>
          </div>
        </bl-comli>
        <!-- 购买提示开关 -->
        <!-- <bl-comli>
          <div slot='left-text'>提示开关</div>
          <div slot='right-text' class="right-text">
            <div class="attribute-button" v-bind:class="{ 'on' : items.shopContentFlag }" @click="statebutton()">
              <button></button>
            </div>
          </div>
        </bl-comli> -->
    </div>

    <!--遮罩-->
    <!-- 商户二维码 -->
    <div class="modal-bg" v-if="popupVisible" @click="popupVisible = false">
      <span class="qimg">
        <qrcode :cls="qrCls" :value="qrText_elec" :size="280" :type="qrType" :padding="10"></qrcode>
      </span>
    </div>
    <!-- 店员二维码 -->
    <div class="modal-bg" v-if="salerVisible" @click="salerVisible = false">
      <span class="qimg">
        <qrcode :cls="qrCls" :value="qrText_saler" :size="276" :type="qrType" :padding="14"></qrcode>
      </span>
    </div>
    <!-- 商户logo -->
    <div class="modal-bg" v-if="popupVisible2" @click="popupVisible2 = false">
      <span class="qimg">
        <img :src="items.logoUrl">
      </span>
    </div>
    <!-- 员工头像 -->
    <div class="modal-bg" v-if="popupVisible3" @click="popupVisible3 = false">
      <span class="qimg">
        <img :src="item.avatarUrl">
      </span>
    </div>
    <!-- 购买提示 -->
    <bl-modal :buttons="modalButtons" v-if="shopContentVisible">
      <div slot="inner">
        <h2>购买提示</h2>
        <textarea type="text" maxlength="200" placeholder="请输入购买提示(上限200字)" v-model.trim="items.shopContent"></textarea>
      </div>
    </bl-modal>

  </div>
</template>

<script>
  import uiMixin from 'src/mixins/uiMixin';
  import Qrcode from 'v-qrcode';
  import BlCustPicker from 'components/cloud-merchant/merchant-modal';
  import upload from 'components/bl-cloudstore-merchant/bl-cloudStore-image-uploader';
  export default {
    name: 'keepmerchantSet',

    mixins: [uiMixin],

    components: {
      Qrcode,
      BlCustPicker,
      upload,
    },

    activated () {
      document.body.scrollTop = 0;
      console.log('商户设置 activated');
      this.queryMerchantSetting();
      this.findMemberBasicInfo();
      this.merchantName = this.$merchantlib.merchantInfo.merchantName
      this.storeName = this.$merchantlib.merchantInfo.storeName
      console.log('this.merchantName:\n', this.merchantName);
      console.log('this.storeName:\n', this.storeName);
      this.qrText_saler = this.$utillib.getClerkQRcode();
      console.log('店员二维码:\n', this.qrText_saler);
    },
    data () {
      return {
        qrText_elec: '',
        qrText_saler: '',
        serverHostname: '',
        uploadImageType: '1', //标识那个组件上传图片
        qrText_paper: null,
        qrCls: 'qrcode',
        qrLevel: 'Q',
        qrType: 'image',
        popupVisible: false, // 商户二维码
        salerVisible: false, // 店员二维码
        popupVisible2: false, // 商户LOGO
        popupVisible3: false, // 员工头像
        // statusType: false,

        // 页面数据
        items: {
          logoUrl: null, //商户logo地址
          qrcode: null, //商户二维码
          pickupAddress: null, // 提货地址
          returnAddress: null, // 退货地址
          mercPhone: null, //商户电话
          shopContent: '', // 购买提示
          shopContentFlag: '', // 购买提示开关控制 0表示开，1表示关
        },
        item: {
          personalProfile: '', // 个人简介
        }, // 员工基础信息
        merchantName: '', //商户名称
        storeName: '', //门店名称
        brandListData: [],
        brandIdData: [],
        brandNamedData: [],

        // 购买提示
        shopContentVisible: false,
        modalButtons: [{
          text: '取消',
          onClick: () => {
            this.contentVisible = false;
          }
        }, {
          text: '确认',
          onClick: () => {
            // 调接口添加购买提示
            this.contentVisible = false;
            let param = {
              updateType: 3,
              shopContent: this.items.shopContent
            }
            this.updateMerchantSetting(param)
          }
        }],
      }
    },

    methods: {
      onBack() {
        console.log('back clicked');
        this.$router.go(-1);
      },

      // 修改商户设置
      updateMerchantSetting(param, callback) {
        this.$merchantlib.updateMerchantInfo(param, (err, obj) => {
          if (err) {
            console.log(err)
            if (callback) { callback(err) }
          }
          if (obj) {
            console.log(obj)
            if (callback) { callback(null, obj) }
          }
        })
      },

      // 1043-查询员工基础信息 findMemberBasicInfo
      findMemberBasicInfo(callback) {
        this.$merchantlib.findMemberBasicInfo((err, obj) => {
          console.log('1043-查询员工基础信息====:', obj)
          if (err) {
            this.$toast(err)
          }
          if (obj) {
            if (!obj.personalProfile) {
              obj.personalProfile = ''
            }
            this.item = obj
          }
        })
      },
      /**
       * 查询商户设置信息
       * 更新数据
       */
      queryMerchantSetting() {
        this.$merchantlib.queryMerchantInfoSite((err, obj) => {
          if (err) {
            this.$toast(err)
          }
          if (obj) {
            // console.log('2.1 商户设置:', JSON.stringify(obj))
            this.items = obj;
            this.qrText_elec = this.items.qrcode;
            // this.qrText_elec = '[mm8888886mm20.00\x0dmm1234567\x0dmm[mm8888887mm60.00\x0dmm1234567\x0d';  // 支付二维码 [8888887mm60.00\x0dmm1234567\x0d     [8420.00\x0d1234567\x0d1[8412.00\x0d1234567\x0d1
            this.address = this.items.pickupAddress;
            this.returnAddr = this.items.returnAddress
            // console.log('成功的回调地址：', this.address);
            if (this.items.shopContentFlag == '0') {
              this.items.shopContentFlag = true
            } else {
              this.items.shopContentFlag = false
            }
            let arrslist = [];
            if (obj.brandList != null) {
              arrslist = obj.brandList;
            }
            let brandListData = JSON.parse(arrslist);
            let brandIdData = []; //品牌idList
            let brandNamedData = []; //品牌nameList
            brandListData.forEach(function(brandData) {
              brandIdData.push(brandData.brandId);
              brandNamedData.push(brandData.brandName);
            })
            this.brandIdData = brandIdData;
            this.brandNamedData = brandNamedData;

            let updateObj = {
              pickupAddress: obj.pickupAddress,
              logoUrl: obj.logoUrl,
              returnAddress: obj.returnAddress,
              mercPhone: obj.mercPhone
            }
            this.$merchantlib.updateLocalMerchantInfo(updateObj)
          }
        })
      },
      // app使用说明
      onUserhelp() {
        //this.$router.push({name: '2.1.2'})
        this.$router.push({name: 'webPage', params: {header: '1', headerName: '用户使用手册', url: 'http://123.206.105.107/2017/10/17/商户端操作手册-登录购买提示/'}})
       // window.location.href = 'http://123.206.105.107';
      },

      // 点击购买提示
      onshopContent() {
        console.log('点击购买提示')
        // this.shopContentVisible = !this.shopContentVisible
        this.$router.push({name: '2.1.10'})
      },

      //购买提示开关按钮[true/false].
      statebutton: function() {
        let flag = this.items.shopContentFlag
        if (flag == true) {
          // 0表示开，1表示关
          flag = '1'
        } else {
          flag = '0'
        }
        //updateType  0:修改品牌 1:修改提货地址 2:修改退货地址，3：修改购买提示 默认0
        let param = {shopContentFlag: flag, updateType: '3'}
        this.$merchantlib.updateMerchantInfo(param, (err) => {
          if (err) {
            this.$toast({
              message: '服务器载入失败:' + err,
            });
          }
          this.$toast('购买提示开关状态更新成功');
          // this.queryMerchantSetting();
          //更新成功后,改变按钮样式.
          if (this.items.shopContentFlag == false) {
            this.items.shopContentFlag = true;
          } else {
            this.items.shopContentFlag = false;
          }
        });
        // console.log("触发事件 && 当前状态stockState为:" + this.items.shopContentFlag)
      },

      getPicture(flag) {
        if (this.popupVisible2) {
          return;
        } else if (this.popupVisible3) {
          return;
        }
        this.uploadImageType = flag;

        this.$refs.uploadSingle.getPicture()
      },
      onGetSingleImage(data) {
        this.stopLoading();
        // 获得图片url之后更新信息:1032接口-上传LOGO或上传头像
        this.$merchantlib.updateMemberAvatar(data.mediaCephUrl, this.uploadImageType, (err) => {
          if (err) {
            return this.$toast(err);
          }
          console.log('-----------入参url: ', data.mediaCephUrl);
          if (this.uploadImageType == '1') {
            this.item.avatarUrl = data.mediaCephUrl;
            this.$merchantlib.updateLocalUserInfo({'avatar': data.mediaCephUrl})
            setTimeout(() => {
              this.$toast('更新员工头像成功');
            }, 500);
          } else {
            this.items.logoUrl = data.mediaCephUrl;
            this.$merchantlib.updateLocalMerchantInfo({'logoUrl': data.mediaCephUrl})
            setTimeout(() => {
              this.$toast('更新商户logo成功');
            }, 500);
          }
        });
      },

      // 跳转到品牌列表页面.
      gotoBrandList: function () {
        this.$router.push({name: '2.1.1', query: {brandIds: this.brandIdData}});
      },
      // 跳转到忘记密码页面
      toForgetPassword() {
        this.$router.push({name: '1.1', params: {flag: '0'}})
      },
      // 跳转到设置个人简介页面
      toIndividualResume() {
        this.$router.push({name: '2.1.7'})
      },
    },
    computed: {
      buyContent: function() {
        if (this.items.shopContent.length > 39) {
         // return this.items.shopContent.substring(0, 38) + '...'
        }
        return this.items.shopContent
      },
      personalProfile: function() {
        return this.item.personalProfile
      }
    }
  }
</script>
