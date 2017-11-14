<!-- 商品详情 -->
<style lang="scss" src="src/sass/goods.scss" scoped></style>

<template>
  <div class="ticketlist content-goods">
    <bl-bar barStyle="bar-dark-linear">
      <div class="button" slot="left-button" @click="onBack">
        <div class="iconfont arrow-back"></div><i class="fback">返回</i>
      </div>
      <div slot="title">商品详情</div>
      <div class="button" slot="right-button" style="color:#00CED1"  @click="gotoEditGoods()" v-show="item.goodsState == 0">编辑</div>
      <div class="button" slot="right-button" style="color:#00CED1" @click="gotoEditGoods()" v-show="item.goodsState == 3">编辑</div>
      <div class="button" slot="right-button" style="color:#00CED1" @click="gotoEditGoods()" v-show="item.goodsState == 4">编辑</div>
    </bl-bar>

    <dl class="toptip">
      <dd style="text-align:center;color:red;font-size:118%" v-if="item.goodsState == 4">{{state}}</dd>
      <dd style="text-align:center;color:#00CED1;font-size:118%" v-if="item.goodsState == 1">{{state}}</dd>
      <dd style="text-align:center;color:#00CED1;font-size:118%" v-if="item.goodsState == 0">{{state}}</dd>
      <dd style="text-align:center;font-size:118%" v-if="item.goodsState == 3">{{state}}</dd>
      <dd style="text-align:center;color:#228b22;font-size:118%" v-if="item.goodsState == 2">{{state}}</dd>
      <dd style="text-align:center;color:red;font-size:114%" v-if="item.goodsState == 4">理由：{{item.auditNote}}</dd>
      <dd style="text-align:center;color:red;font-size:114%" v-if="item.goodsState == 3 && item.shelfReason != null">理由：{{item.shelfReason}}</dd>
    </dl>

    <bl-comli>
      <div slot='left-text'>货号</div>
      <div slot='right-text'>{{item.freightNo}}</div>
    </bl-comli>
    <bl-comli>
      <div slot='left-text'>标准品名</div>
      <div slot='right-text'><div class="goodattr">{{item.normQualityName}}</div></div>
    </bl-comli>
    <bl-comli>
      <div slot='left-text'>缩略品名</div>
      <div slot='right-text'><div class="goodattr">{{item.breviaryQualityName}}</div></div>
    </bl-comli>
    <bl-comli>
      <div slot='left-text'>分类</div>
      <div slot='right-text' class="right-text">{{item.parentClassifyName}} {{item.classifyName}}</div>
    </bl-comli>
    <bl-comli>
      <div slot='left-text'>属性</div>
      <div slot='right-text' class="right-text">
          <div class="goodattr" style="white-space: pre">{{propertyName}}</div>
      </div>
    </bl-comli>

    <bl-comli>
      <div slot='left-text'>商品二维码</div>
      <div slot='right-text' class="right-text">
        <button type="button" class="qrcodestyle" @click="goodsQR()">查看二维码</button>
        <button type="button" @click="onClick('scanGoodsQR')" class="qrcodestyle">绑定</button>
      </div>
    </bl-comli>
    <bl-comli class="margin-t">
      <div slot='left-text'>售价</div>
      <div slot='right-text'>{{item.retailPrice}}元</div>
    </bl-comli>
    <bl-comli>
      <div slot='left-text'>吊牌价</div>
      <div slot='right-text'>{{item.dropPrice}}元</div>
    </bl-comli>
    <bl-comli>
      <div slot='left-text'>折扣率</div>
      <div slot='right-text'><span :class="{'redcolor': isActive}">{{ DiscountRate }}%</span></div>
    </bl-comli>
    <bl-comli>
      <div slot='left-text'>库存状态</div>
      <div slot='right-text' class="right-text">{{stockName}}</div>
    </bl-comli>
    <bl-comli v-show="getGoodsStatu(item.goodsState)">
      <div slot='left-text'  @click="onGoSkuManage()">商品SKU库存</div>
      <div slot='right-text' class="right-box" @click="onGoSkuManage()">
        <div class="right-l"></div>
        <div class="iconfont arrow-back"></div>
      </div>
    </bl-comli>
    <bl-comli>
      <div slot='left-text'>配送</div>
      <div slot='right-text' class="right-text">{{distributionName}}</div>
    </bl-comli>

    <upload :maxpic='9' :paths='paths1' :name='"图片上传"' class="margin-b"
             @clickImg='parentImg' :needmain='true' :mainpic='picindex' :canEdit="false">
    </upload>
    <bigImage :picPaths="paths1" ref='big'></bigImage>

    <bl-comli class="margin-t">
      <div slot='left-text'>品牌</div>
      <div slot='right-text'>{{item.brandName}}</div>
    </bl-comli>
    <bl-comli>
      <div slot='left-text'>上市时间</div>
      <div slot='right-text'>{{item.lastShelves}}</div>
    </bl-comli>
    <bl-comli>
      <div slot='left-text'>毛重(kg)</div>
      <div slot='right-text'>{{item.weight}}</div>
    </bl-comli>
    <bl-comli>
      <div slot='left-text'>产地</div>
      <div slot='right-text'>{{item.producingArea}}</div>
    </bl-comli>
    <bl-comli style="margin-bottom: 1.6rem;">
      <div slot='left-text'>规格</div>
      <div slot='right-text'>{{item.goodsStandard}}</div>
    </bl-comli>
    <div style="height:1px;"></div>
    <!-- 待审核商品详情 (店长)  商品状态goodsState : 0：草稿箱 1：待审核，2：已上架，3：已下架，4：审核不通过 onUpdateGoodsState('4')-->
      <!--<bl-button style="margin:0.4rem 0.38rem;" @click="popupVisible = !popupVisible" v-show="$accesslib.canShow('cloudom:goods:reviewdeny') && item.goodsState == '1'">审核不通过</bl-button>-->
      <!-- <bl-button style="margin:0.4rem 0.38rem;" @click="popupVisible = !popupVisible" v-show="$accesslib.isPermitted('cloudom:goods:reviewdeny') && item.goodsState == '1'">审核不通过</bl-button> -->


    <!-- 草稿详情-->
      <!-- <bl-button style="margin:0.4rem 0.38rem;" @click="onUpdateGoodsState('1')" v-show="this.item.goodsState == 0">提交审核</bl-button> -->
      <!-- 已上架商品详情-->
     <!--  <bl-button style="margin:0.4rem 0.38rem;" @click="onUpdateGoodsState('3')" v-show="$accesslib.isPermitted('cloudom:goods:offshelf') && item.goodsState == '2'">下架</bl-button> -->

      <!-- 已下架商品详情 (店长) -->
      <!-- <bl-button style="margin:0.4rem 0.38rem;" @click="onUpdateGoodsState('2')" v-show="$accesslib.isPermitted('cloudom:goods:onshelf') && (item.goodsState == '3' || item.goodsState == '1')">上架</bl-button> -->
      <!-- 审核不通过商品详情（店长）不展示按钮  -->

      <!-- 底部按钮 -->
      <div class="editgress" v-if="showFixedBar">
        <button  class="button2" @click="popupVisible = !popupVisible" v-show="$accesslib.isPermitted('cloudom:goods:reviewdeny') && item.goodsState == '1'" @touchstart="">审核不通过</button>

        <button  class="button1" @click="onUpdateGoodsState('1')" v-show="this.item.goodsState == 0" @touchstart="">提交审核</button>
        <button class="button1" @click="onUpdateGoodsState('3')" v-show="$accesslib.isPermitted('cloudom:goods:offshelf') && item.goodsState == '2'" @touchstart="">下架</button>
        <!-- <button class="button1" @click="onUpdateGoodsState('2')" v-show="$accesslib.isPermitted('cloudom:goods:onshelf') && (item.goodsState == '3' || item.goodsState == '1')" @touchstart="">上架</button> -->
        <button :class="{'button1':item.goodsState == '3','button2':item.goodsState == '1'}" @click="onUpdateGoodsState('2')" v-show="$accesslib.isPermitted('cloudom:goods:onshelf') && (item.goodsState == '3' || item.goodsState == '1')" @touchstart="">上架</button>
      </div>


     <mt-popup v-model="popupVisible" position="bottom" style="width: 100%;">
          <bl-cust-picker  show-toolbar @cancel="cancel" @getValues="getValues">
              <div slot="content"  class="cust">
                  <dl>
                      <dt>请选择审核不通过的理由</dt>
                      <dd v-for="(item, index) in itemcards" @click="chooseAttr(index, itemcards)">
                        <div class="ononeline">
                          <span class="checkicon" :class="item.state">
                              <i></i>
                          </span>
                          <span>{{ item.name }}</span>
                        </div>
                      </dd>
                  </dl>
              </div>
          </bl-cust-picker>
      </mt-popup>
    <!--遮罩-->
<!--     <div v-if="popupVisible" @click="popupVisible = !popupVisible">
      <div class="modal-bg"></div>
    </div> -->
  </div>
</template>

<script>

  import networklib from 'src/libs/networklib';
  import merchantlib from 'src/libs/merchantlib';
  import goodslib from 'src/libs/goodslib';
  import upload from 'components/bl-cloudstore-merchant/bl-cloudStore-image-uploader'
  import bigImage from 'components/bl-cloudstore-merchant/bl-cloudStore-seeBigImage'

  export default {

    name: 'keepGoods',
    components: {
      upload,
      bigImage,
      'BlCustPicker': () => System.import('components/cloud-merchant/cust-picker')
    },
    data() {
      return {
        popupVisible: false,
        discount: null,
        isActive: false,
        itemcards: [
          {'name': '品名错误', 'state': ''},
          {'name': '规格错误', 'state': ''},
          {'name': '图片错误', 'state': ''},
          {'name': '品牌错误', 'state': ''},
          {'name': '重量错误', 'state': ''},
          {'name': '其他原因，请与审核人确认', 'state': ''}
        ],

        picindex: -1,
        big: false,
        btnshow: true,
        siglepath: '',
        item: {},
        propertyList: [],
        paths1: [],
        auditNote: '',
        goodsId: null,

      };
    },

    activated() {
      console.log('activated');
      if (this.$route.params.goodsId) {
        this.item.goodsId = this.$route.params.goodsId;
      }

      //TODO: 如果有customerId, 需要添加用户历史查询商品
      if (this.$route.params.customerId) {
        console.log('customerId ', this.$route.params.customerId);
        // 插入历史查询商品
        this.$orderlib.addConsultGoods(this.$route.params.customerId, this.item.goodsId, (err) => {
          if (err) {
            this.$toast(err);
          } else {
            console.log('插入成功');
          }
        })
      }

      this.merchantId = merchantlib.getMerchantId();
      this.roleId = merchantlib.getRoleId();
      this.memberId = merchantlib.getMemberId();

      let self = this;
      this.onToast();
      this.queryGoodsDetail(function (err) {
        self.stopToasting();
        if (err) {
          self.$toast({
            message: '服务器载入失败:' + err,
          });
        }
      });
      //详情页商品图片主图标识.
      if (this.paths1 != null) {
        this.picindex = 0;
      }
    },
    mixins: [],
    methods: {
      onBack() {
        console.log('onBack');
        if (this.$route.query.from == 'device') {
          this.$jsbridgelib.bridgeNativeBack();
        } else {
          this.$router.go(-1);
        }
      },
      cancel() {
        this.popupVisible = false;
      },

      getValues() {
        let self = this;
        self.auditNote = ''
        var selectCount = 0;
        self.itemcards.forEach(function(key, val) {
          if (key.state == 'check') {
            self.auditNote += key.name + '；';
            selectCount++;
          }
        })
        this.popupVisible = false
        if (selectCount == 0) {
          this.$toast('至少选择一个不通过理由!')
          return;
        }
        if (self.auditNote) {
          self.updateGoodsState('4', function (err) {
            if (err) {
              self.$toast({
                message: '操作失败:' + err,
              });
            } else {
              self.$toast(
               '审核不通过'
              );
              setTimeout(
                function() {
                  // self.$router.push({name: '5.8'})
                  self.$router.go(-1)
                }, 2000)
            }
          });
        } else {
          self.$toast('请选择审核不通过的理由')
        }
      },

      chooseAttr(index, arrs) {
        let state = this.itemcards[index].state;
        if (state == "check") {
          arrs[index].state = ""
        } else {
          arrs[index].state = "check"
        }
      },

      //商品图片放大.
      parentImg(index) {
        this.$refs.big.openBigImage(index);
      },
      //商品图片缩小.
      hidebig() {
        this.$refs.big.style.visibility = 'hidden';
      },

      onClick(tag) {
        console.log('click ', tag);
        if (tag == 'scanGoodsQR') {
          this.onScanGoodsQR();
        }
      },
      onScanGoodsQR() {
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
          goodslib.bindGoodsQRCode(self.item.goodsId, qrCode, function (err) {
            if (err) {
              return self.$toast('服务器错误' + err);
            }
            self.$toast('绑定成功');
          })
        });
      },
      onToast: function () {
        this.toastd = this.$toast({
          iconClass: 'preloader white',
          message: '加载中...',
          duration: 'loading'
        });
      },

      stopToasting: function () {
        this.toastd.close();
      },
      //1008-查询商品详情
      queryGoodsDetail(callback) {
        let apiId = '1008';
        //货号 商品Id 商户Id
        let queryParam = {goodsId: this.item.goodsId, merchantId: this.merchantId};
        console.log('1008-查询商品详情 入参：', JSON.stringify(queryParam));
        networklib.post(apiId, queryParam).then((obj) => {
          console.log('成功的回调', obj);
          this.item = obj || {};
          if (this.item.propertyList.length != null) {
            this.propertyList = obj.propertyList;
          }
          this.item.weight = this.item.weight / 1000
          console.log('this.item.weight:', this.item.weight)
          this.paths1 = this.item.goodsImgList;
          callback();
        }).catch(err => {
          console.log('失败的回调', apiId, err);
          callback(err);
        });
      },

     //判断当前商品详情的状态
      getGoodsStatu(goodsState) {
        let statu = null;
        if (goodsState == '0') {
          statu = false;
        } else {
          statu = true;
        }
        return statu;
      },

      //跳转到sku库存页面
      onGoSkuManage() {
        this.$router.push({
          path: '/goodsSKUManage',
          query: {goodsId: this.item.goodsId}
        })
      },
      // 跳转到商品编辑页
      gotoEditGoods() {
        //点击编辑按钮进入编辑商品页面
        this.$router.push({
          path: '/editGoods/' + this.item.goodsId,
        })
      },
      //1:提审，2:审核通过上架，3:下架，4:审核不通过
      onUpdateGoodsState(goodsState) { //
        let self = this;
        let content;
        let sureButton;
        if (goodsState == '1') {
          content = '您确定提审该商品？'
          sureButton = '确认提审'
        } else if (goodsState == '2') {
          content = '您确定审核通过上架该商品？'
          sureButton = '确认上架'
        } else if (goodsState == '3') {
          content = '您确定要下架该商品？'
          sureButton = '确认下架'
        }

        self.$modal({
          content,
          buttons:
          [
            {text: '取消', onClick: function () {}}, //返回商品库
            {text: sureButton,
              onClick: function () {
                self.updateGoodsState(goodsState, function (err) {
                  if (err) {
                    self.$toast({
                      message: '操作失败:' + err,
                    });
                  }
                  // self.$router.push({name: '5.8'});
                  self.$router.go(-1)
                });
              }
            }
          ]
        });
      },

        /**
         *  1002-商品审核接口
         * //1:提审，2:审核通过上架，3:下架，4:审核不通过
         *
         * @param goodsState
         */
      updateGoodsState(goodsState, callback) {
        let apiId = '1002';
        let queryParam = {auditState: goodsState, merchantId: this.merchantId, goodsIdList: [this.item.goodsId], auditNote: this.auditNote, memberId: this.memberId};
        networklib.post(apiId, queryParam).then((obj) => {
          console.log('成功的回调', obj);
          callback();
        }).catch(err => {
          console.log('失败的回调', apiId, err);
          callback(err);
        });
      },

       // 查看电子二维码
      goodsQR () {
        console.log('跳转到二维码');
        this.$router.push({
          path: '/goodsQR',
          query: {
            normQualityName: this.item.normQualityName,
            freightNo: this.item.freightNo,
            goodsId: this.item.goodsId
          }
        })
      },
//      showButton() {
//        // 待审核商品
//        if (this.roleId == '9' && this.item.goodsState == '1') {
//          return true;
//        }
//      },
//      showButton2() {
//        // 已上架 =》 下架
//        if (this.roleId == '9' && this.item.goodsState == '2') {
//          return true;
//        }
//      },
//      showButton3() {
//        // 已下架 =》 上架
//        if (this.roleId == '9' && this.item.goodsState == '3') {
//          return true;
//        }
//      },
      /**
       * 根据uiId 和 用户权限 来判断ui控件是否能显示！
       * @param id
       * @return {boolean}
       */
//      canShow(id) {
//        if (this.roleId == '9') {
//          return true;
//        }
//      },
      getSkuName(proList, nameStr) {
        console.log('proList', proList)
        var name = ''
        var arr = [];
        proList.list.map(function(obj) {
          obj.list.map(function(obj) {
            arr.push(obj.skuName)
          })
        })
        if (arr.length == 0) {
        } else if (arr.length == 1) {
          name = nameStr + '：' + arr[0] + '；' + '\n'
        } else if (arr.length == 2) {
          name = nameStr + '：' + arr[0] + '，' + arr[1] + '；' + '\n'
        } else if (arr.length == 3) {
          name = nameStr + '：' + arr[0] + '，' + arr[1] + '，' + arr[2] + '；' + '\n'
        } else {
          name = nameStr + '：' + arr[0] + '，' + arr[1] + '，' + arr[2] + '...；' + '\n'
        }
        console.log('name', name)
        return name
      },
    },
    computed: {
      state: function() {
        if (this.item.goodsState == '0') {
          return '草稿箱'
        } else if (this.item.goodsState == '1') {
          return '待审核'
        } else if (this.item.goodsState == '2') {
          return '已上架'
        } else if (this.item.goodsState == '3') {
          return '已下架'
        } else if (this.item.goodsState == '4') {
          return '审核不通过'
        }
      },
      showFixedBar: function () {
        if (this.item.goodsState == '4') {
          return false;
        }
        if (!this.$accesslib.isPermitted('cloudom:goods:reviewdeny') && this.item.goodsState != '0') {
          return false;
        }
        return true;
      },
      stockName: function () {
        if (this.item.stockState == '0') {
          return '有货';
        } else if (this.item.stockState == '1') {
          return '库存紧张';
        } else if (this.item.stockState == '2') {
          return '咨询店员';
        } else if (this.item.stockState == '3') {
          return '无货';
        } else {
          return '未知';
        }
      },
      distributionName: function () {
        let str = '';
        if (this.item.deliveryTypeList != null) {
          var typeList = this.item.deliveryTypeList;
          for (var i = typeList.length - 1; i >= 0; i--) {
            if (typeList[i] == '0') {
              str += '到店自提 '
            } else if (typeList[i] == '2') {
              str += '物流配送 ' + '；'
            }
            //  else if (typeList[i] == '2') {
            //   str += '不包邮  '
            // }
          }
          return str;
        }
      },
      // propertyName: function () {
      //   let str = '';
      //   console.log('展示属性：', JSON.stringify(this.propertyList))
      //   this.propertyList.map(function(obj) {
      //     if (obj.skuName != null && obj.skuName != '') {
      //       str += obj.skuName + ';'
      //     }
      //   })
      //   return str;
      // },

      propertyName: function () {
        let skuColorName = '' // 展示sku名称
        this.propertyList.map((listItem) => {
          skuColorName += this.getSkuName(listItem, listItem.skuName);
        })
        console.log('', skuColorName)
        return skuColorName
      },

      // 计算折扣率
      DiscountRate() {
        this.discount = 0
        if (this.item.dropPrice != '' && this.item.retailPrice != '') {
          this.discount = (Number(((this.item.dropPrice - this.item.retailPrice) / this.item.dropPrice)) * 100).toFixed(0)
          if (this.discount < 0) {
            this.discount = 0;
          }
          if (this.discount >= 70) {
            this.isActive = true
          } else {
            this.isActive = false
          }
        }
        return this.discount
      }
    }

  };

</script>
