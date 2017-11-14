<style lang="scss" src="src/sass/goodinset.scss" scoped></style>
<template>
  <div class="content">
    <div class="content-head">
      <bl-bar barStyle="bar-dark-linear">
          <div class="button" slot="left-button" @click="gotoCloudStoreIndex()">
              <div class="iconfont arrow-back"></div><i class="fback">返回</i>
          </div>
          <div slot="title">商品上新</div>
      </bl-bar>
    </div>
    <bl-comli>
        <div slot='left-text' class="left-box">货号</div>
        <div slot='right-text' class="right-box">
          <div class="right-l">
            <input type="text" name="" placeholder="必填" v-model.trim="item.freightNo" v-on:blur="onBlur">
          </div>
          <div @click="onScan()" class="scan" v-show="item.freightNo == '' || item.freightNo == null">
            <img src="../../assets/i/scan.png">
          </div>
        </div>
    </bl-comli>
    <bl-comli>
        <div slot='left-text' class="left-box">标准品名</div>
        <div slot='right-text' class="right-box">
          <div class="right-l">
            <input type="text" name="name" placeholder="必填" v-model.trim="item.normQualityName" maxlength="60">
          </div>
        </div>
    </bl-comli>
    <bl-comli>
        <div slot='left-text' class="left-box">分类</div>
        <div slot='right-text' class="right-box" @click="gotoGoodsType()">
          <div class="right-l">
            <span>{{item.parentClassifyName}}      {{item.classifyName}}</span>
          </div>
          <div class="iconfont arrow-back"></div>
        </div>
    </bl-comli>
    <bl-comli class="margin-b">
        <div slot='left-text' class="left-box">属性</div>
        <div slot='right-text' class="right-box" @click="gotoAttribute()">
          <div class="right-l">
            <div style="white-space: pre">{{propertyName}}</div>
          </div>
          <div class="iconfont arrow-back"></div>
        </div>
    </bl-comli>
    <bl-comli>
        <div slot='left-text' class="left-box">售价<label style= "float:right;" >¥&nbsp;</label></div>
        <div slot='right-text' class="right-box">
          <div class="right-l">
            <input type="number" name="" v-model.number="item.retailPrice" placeholder="填写售价">
          </div>
        </div>
    </bl-comli>
    <bl-comli>
        <div slot='left-text' class="left-box">吊牌价格<label style= "float:right;" >¥&nbsp;</label></div>
        <div slot='right-text' class="right-box">
          <div class="right-l">
            <input type="number" name="" v-model.number="item.dropPrice" placeholder="填写吊牌价格">
          </div>
        </div>
    </bl-comli>
    <bl-comli>
        <div slot='left-text' class="left-box">库存状态</div>
        <div slot='right-text' class="right-box" @click="stockStateVisible = !stockStateVisible">
          <div class="right-l">
            <span>{{stockName}}</span>
          </div>
          <div class="iconfont arrow-back"></div>
        </div>
    </bl-comli>
    <bl-comli class="margin-b">
        <div slot='left-text' class="left-box">配送</div>
        <div slot='right-text' class="right-box" @click="distribute()">
          <div class="right-l">
            <span>{{item.sdistributionName}} {{item.sdistributionName2}} <!--  {{item.sdistributionName3}} --></span>
          </div>
          <div class="iconfont arrow-back"></div>
        </div>
    </bl-comli>
    <upload :maxpic='9' :paths='item.goodsImgList' :name='"图片上传"' class="margin-b"
            @clickImg='parentImg' :needmain='true' :mainpic='picindex' @confirm='onGetGoodsImage' @deleteConfirm='deleteConfirm' :ratio= 1>
    </upload>
    <!--<div class="watch-pic" ref='big' @click='hidebig'>-->
      <!--<div class="pic-box">-->
        <!--<img :src="siglepath">-->
      <!--</div>-->
      <!--<div class="set-main" @click='setMainImg()'>-->
          <!--设置为主图-->
      <!--</div>-->
    <!--</div>-->
    <bigImage :needmain="true" :picPaths="item.goodsImgList" ref='big' @setMainImg="setMainImg" ></bigImage>

    <bl-comli>
        <div slot='left-text' class="left-box">品牌</div>
        <div slot='right-text' class="right-box" @click="pushBrandsList()">
          <div class="right-l">
           <span>{{item.brandName}}</span>
          </div>
          <div class="iconfont arrow-back"></div>
        </div>
    </bl-comli>

    <bl-comli style="margin-bottom: 1.6rem;">
    <div slot='left-text' class="left-box">毛重(kg)</div>
    <div slot='right-text' class="right-box" @click="weightVisible = !weightVisible">
      <div class="right-l">
        <span>{{item.showWeight}}</span>
      </div>
      <div class="iconfont arrow-back"></div>
    </div>
  </bl-comli>
    <div style="height:1px;"></div>
<!--     <div style="position:fixed; bottom:0px;left: 0px;right: 0px; height: 1.2rem; background-color: white; border-top: solid 1px #ccc;">
    <li style="" class="flex-space">
      <bl-button inline style="width:45%;margin:0.14rem 0.5rem;" @click="onSave(0)">保存</bl-button>
      <bl-button inline style="width:45%;margin:0.14rem 0.5rem 0.14rem 0rem;" @click="onSave(1)">保存并提交</bl-button>
    </li>
    </div> -->
      <!-- 底部按钮 -->
      <div class="editgress">
        <div class="wrap">
        <button class="button2" @click="onSave(0)" @touchstart="">保存</button>
        <button class="button2" @click="onSave(1)" @touchstart="">保存并提交</button>
        </div>
      </div>
    <!--重量-->
    <bl-actionsheet :actions="weightActions" v-model="weightVisible" cancelText="" @thisValue="function(val){item.showWeight = val;}"></bl-actionsheet>

    <!--库存状态-->
    <bl-actionsheet :actions="stockStateActions" v-model="stockStateVisible" cancelText="" @thisValue="function(val){item.stockState = val;}"></bl-actionsheet>

     <!-- 配送方式 -->
    <bl-popup v-model="popupVisible" position="bottom">
        <bl-cust-picker  show-toolbar @cancel="cancel" @getValues="getValues">
            <div slot="content"  class="cust">
                <dl>
                    <!-- <dt>到店自提</dt> -->
                    <dd @click="ifSince = !ifSince">
                        <span class="checkicon" :class="{check : ifSince}">
                            <i></i>
                        </span>
                        <span>到店自提</span>
                    </dd>
                </dl>
                <dl>
                    <!-- <dt>物流配送</dt> -->
                    <dd @click="ifPost1 = !ifPost1">
                        <div class="line">
                          <span class="checkicon" :class="{check : ifPost1}">
                              <i></i>
                          </span>
                          <span>物流配送</span>
                        </div>
                    </dd>
                </dl>

            </div>
        </bl-cust-picker>
    </bl-popup>

    <!--遮罩-->
    <div v-if="popupVisible || weightVisible || stockStateVisible" @click="visibleControl">
      <div class="modal-bg"></div>
    </div>

  </div>
</template>

<script>
import utils from 'src/utils';
import merchantlib from 'src/libs/merchantlib';
import networklib from 'src/libs/networklib';
import uiMixin from 'src/mixins/uiMixin';
import upload from 'components/bl-cloudstore-merchant/bl-cloudStore-image-uploader'
import bigImage from 'components/bl-cloudstore-merchant/bl-cloudStore-seeBigImage'

const numberRE = /^(0|[1-9]\d*)$/
const priceRE = /^[0-9]+(.[0-9]{1,2})?$/

export default {
  name: 'goodinset',
  mixins: [uiMixin],
  components: {
    upload,
    'BlCustPicker': () => System.import('components/cloud-merchant/cust-picker'),
    bigImage,
  },
  data() {
    return {
      popupVisible: false,
      weightVisible: false,
      ifSince: false,
      ifPost1: false,
      picindex: -1,
      big: false,
      btnshow: true,
      siglepath: '',
      paths: [],
      mainImgIndex: null,

      item: {

        sdistributionName: '到店自提',
        sdistributionName2: '物流配送',
        // sdistributionName3: '',

        commercialCode: null, //业态编码
        commercialName: null, //业态名称
        storeCode: null, //门店编码
        storeName: null, //门店名称
        merchantId: null, //商户id
        merchantName: null, //商户名称
        memberId: null, //当前的操作用户

        freightNo: '',
        normQualityName: '',
        // largeId:'88888888',

        operatingState: '', //0：保存

        brandId: null, //品牌Id
        brandName: null, // 不用传

        classifyId: null, //分类Id
        classifyName: null,

        deliveryTypeList: ['0', '2'], // 配送类型List 默认选中到店自提和物流配送(不包邮)
        goodsImgList: [],
        propertyList: [], //属性List
        stockNum: '99', //库存数量, 不用
        stockState: '0', //库存状态 self.stockState

        distributionData: 11, // 自提 配送
        weight: null, // 重量
        dropPrice: '', // 吊牌价格
        retailPrice: '', // 售价
        selectedAttributesIdList: [], //sku属性id
        selectedAttributesNameList: [], //sku属性名称
        showWeight: '', // 单位kg
      },
      selectedAttributesNameList: [],
      stockStateVisible: false,
      distributionVisible: false, //调用actionsheet
      stockStateActions: [
        {
          name: '有货',
          key: '0',
        },
        {
          name: '库存紧张',
          key: '1',
        },
        {
          name: '咨询店员',
          key: '2',
        },
        {
          name: '无货',
          key: '3',
        }
      ],
      weightActions: [
        {
          name: '不到0.25kg(一件T恤)',
          key: '0.25',
        },
        {
          name: '约0.5kg(一件衬衣、西裤)',
          key: '0.5',
        },
        {
          name: '约0.75kg(一件厚毛衣、牛仔裤)',
          key: '0.75',
        },
        {
          name: '约1kg(一件外套、牛仔服、女鞋)',
          key: '1',
        },
        {
          name: '约1.5kg(男鞋、靴子)',
          key: '1.5',
        },
        {
          name: '约2kg(毛呢大衣)',
          key: '2',
        },
        {
          name: '约3kg',
          key: '3',
        },
        {
          name: '约4kg',
          key: '4',
        },
        {
          name: '大于等于5kg',
          key: '5',
        },
      ],
    };
  },
  created() {
    let item = utils.storageGet('createdItem');
    // console.log('createdItem', JSON.parse(JSON.stringify(item)))
    if (item) {
      this.item = item;
    }

    if (this.item.selectedAttributesIdList) {
      // console.log('selectedAttributesIdList', JSON.parse(JSON.stringify(this.item.selectedAttributesIdList)))
      this.item.propertyList = this.item.selectedAttributesIdList;
      // console.log('propertyList', JSON.parse(JSON.stringify(this.item.propertyList)))
    }
    // console.log("属性idList长度：" + this.item.propertyList.length)
    //用户登陆相关信息.
    this.item.commercialCode = merchantlib.getCommercialCode();//业态编码
    this.item.commercialName = merchantlib.getCommercialName();//业态名称
    this.item.merchantId = merchantlib.getMerchantId();//商户id
    this.item.merchantName = merchantlib.getMerchantName();//商户名称
    this.item.storeCode = merchantlib.getStoreCode();//门店编码
    this.item.storeName = merchantlib.getStoreName();//门店名称
    this.item.memberId = merchantlib.getMemberId();//当前的操作用户
    // 如果扫码扫出货号
    if (this.$route.query.freightNo) { // 如果传参freightNo
      this.item.freightNo = this.$route.query.freightNo;//从商户首页进入，带入货号
    }
    if (!utils.storageGet('item')) {
      utils.storageSet('item', this.item)
    }
    // 默认品牌选中品牌列表第一个
    if (this.item.brandId == null) {
      this.$merchantlib.queryBrandList((err, obj) => {
        if (err) { return this.$toast(err) }
        if (obj) {
          if (obj.brandList.length > 0) {
            this.item.brandId = obj.brandList[0].brandId
            this.item.brandName = obj.brandList[0].brandName
          }
        }
      })
    }
  },

  mounted() {
    let imageMainT = utils.storageGet('imageMain');
    if (imageMainT != null) {
      this.picindex = 0;
    }
//    this.$merchantlib.findMerchant1List((err, obj) => {
//      console.log('--findMerchant1List ', err, obj)
//    })

    //防止页面跳转,图片主图标识丢失.
    if (this.validation.goodsImgList) {
      // console.log('this.validation.goodsImgList', this.validation.goodsImgList);
      this.picindex = 0;
    }
  },
  methods: {
    //用于回显配送选项
    distribute() {
      let self = this
      self.ifSince = false
      self.ifPost1 = false
      // self.ifPost2 = false

      self.popupVisible = !self.popupVisible
      self.item.deliveryTypeList.forEach(function(val, index) {
        if (val == 0) {
          self.ifSince = true
        }
        if (val == 2) {
          self.ifPost1 = true
        }
        // if (val == 2) {
        //   self.ifPost2 = true
        // }
      })
    },
    //配送取消按钮
    cancel() {
      this.popupVisible = false;
    },
    //配送确定按钮
    getValues() {
      console.log('确定前：', this.item.deliveryTypeList);
      this.item.sdistributionName = ''
      this.item.sdistributionName2 = ''
      // this.item.sdistributionName3 = ''
      this.item.deliveryTypeList = [];

      this.popupVisible = false;

      if (this.ifSince == true) {
        this.item.sdistributionName = '到店自提'
        this.item.deliveryTypeList.push(0)
      }
      if (this.ifPost1 == true) {
        this.item.sdistributionName2 = '物流配送'
        this.item.deliveryTypeList.push(2)
      }
      // if (this.ifPost2 == true) {
      //   this.item.sdistributionName3 = '不包邮'
      //   this.item.deliveryTypeList.push(2)
      // }
      if (this.ifSince == false && this.ifPost1 == false) {
        this.item.sdistributionName = '到店自提'
        this.item.sdistributionName2 = ''
        // this.item.sdistributionName3 = ''
        this.item.deliveryTypeList.push(0)
      }
      this.popupVisible = false
      console.log('点确定时选中的配送id:', this.item.deliveryTypeList)
    },
    //加载本地图片
    getImage() {
      console.log('上新 选择图片-----------');
      var flag = this.$utillib.isAppSupport({'2': '1.2.0'});
      if (flag) {
        this.$jsbridgelib.bridgeGetPhotos({maxNum: 9 - this.item.goodsImgList.length, ratio: 1}, (err, obj) => {
          if (err) {
            console.log('bridge get immage', err);
            return self.$toast(err)
          }
          if (obj) {
            obj.forEach((item) => {
              this.item.goodsImgList.push(item.mediaCephUrl);
            })
            console.log('bridge obj --- ', JSON.stringify(obj));
            console.log('this.item.goodsImgList --- ', this.item.goodsImgList.length);
          }
        })
      } else {
        this.$refs.uploads.getPicture();
      }
    },
    /**
     * 调用native扫一扫
     */
    onScan() {
      console.log('scan');
      let self = this;
      this.$jsbridgelib.bridgeScanGoodsCard(function (err, obj) {
        if (err) {
          console.log('bridge scan goods card error ', err);
          return self.$toast(err)
        }
        console.log('扫描结果', obj);
        if (!obj) {
          obj = {};
        }
        self.item.freightNo = obj.result;
      });
    },

    onBlur () {
      let self = this
      console.log('离焦事件', this.item.freightNo)
      self.queryGoods(function (err, goodsId) {
        if (goodsId) {
          self.$toast('该货号已经存在');
        }
        if (err) {}
      })
    },

    /**
     * 根据货号查询商品详情
     * @return {[type]} [description]
     */
    queryGoods (callback) {
      let apiId = '1008'
      let queryParam = {merchantId: merchantlib.getMerchantId(), freightNo: this.item.freightNo}
      networklib.post(apiId, queryParam).then((obj) => {
        console.log('成功的回调', obj);
        callback(null, obj.goodsId);
      }).catch(err => {
        console.log('失败的回调', apiId, err);
        if (err == '接口错误 02000015 没有查询到相关商品') {
          callback(null, null);
        } else {
          callback(err);
        }
      })
    },

    valiParam() {
      // 弹出提示
      if (!this.validation.freightNo) {
        this.$toast("请输入正确的货号", "text")
        return
      }
      if (!this.validation.normQualityName) {
        this.$toast("请输入正确的标准品名", "text")
        return
      }
      if (!this.validation.classifyId) {
        this.$toast("请选择分类", "text")
        return
      }
      if (!this.validation.propertyList) {
        this.$toast("请选择需要选择的属性", "text")
        return
      }
      if (!this.validation.retailPrice) {
        this.$toast("请输入正确的售价(小数点后最多两位的非负数)", "text")
        return
      }
      if (!this.validation.dropPrice) {
        this.$toast("请输入正确的吊牌价(小数点后最多两位的非负数)", "text")
        return
      }
      if (this.item.retailPrice > this.item.dropPrice) {
        this.$toast("售价不能大于吊牌价", "text")
        return
      }
      if (!this.validation.stockState) {
        this.$toast("请选择库存", "text")
        return
      }
      if (!this.validation.deliveryTypeList) {
        this.$toast("请选择配送方式", "text")
        return
      }
      if (!this.validation.goodsImgList) {
        this.$toast("请上传商品图片", "text")
        return
      }
      if (!this.validation.brandId) {
        this.$toast("请选择品牌", "text")
        return
      }
      if (!this.validation.weight) {
        this.$toast("请选择重量", "text")
        return
      }
      // 合法性校验
      if (!this.isValid) {
        console.log('回去重写')
        return false;
      }
      return true;
    },

    //回调获取商品上传图片.
    onGetGoodsImage(data) {
      let self = this;
      this.picindex = 0;
      self.item.goodsImgList.push(data.mediaCephUrl);
      console.log('self.item.goodsImgList', self.item.goodsImgList);
    },

    //图片回调删除方法:deleteConfirm data.index
    deleteConfirm(data) {
      let self = this;
      self.item.goodsImgList.splice(data.index, 1);
      //self.item.goodsImgList.$remove(data.index);
    },
    //本地选择多张照片
    selectedMutilateImage(images) {
      images.forEach((item) => {
        this.item.goodsImgList.push(item);
      })
    },
    parentImg(index) {
      this.$refs.big.openBigImage(index);
    },
    //设置主图按钮事件.
    setMainImg(index) {
      this.picindex = 0;
      this.updateArray(this.item.goodsImgList, this.item.goodsImgList[index]);
    },
    //把设置主图的图片放在第一个.
    updateArray(arr, url) {
      for (var i = 0; i < arr.length; i++) {
        if (arr[i] === url) {
          arr.splice(i, 1);
          break;
        }
      }
      arr.unshift(url);
    },

    hidebig() {
      this.$refs.big.style.visibility = 'hidden';
    },

    getProperty (Things) {
      console.log('getProperty', Things)
      // 属性
      let str = '';
      if (Things != null) {
        for (var i = Things.length - 1; i >= 0; i--) {
          str += Things[i]
        }
      }
      return str
    },

    //保存
    onSave(saveType) {
      // 校验参数
      if (!this.valiParam()) { return }
      let self = this;
      // 校验通过
      self.item.weight = self.item.showWeight * 1000
      console.log('self.item.weight:', self.item.weight)
      if (saveType == '0') {  //0：保存
        self.item.operatingState = '0';
        self.insertCommInfo(self.item, function (err) {
          if (err) {
            return self.$toast({message: err});
          } else {
            //清空缓存
            utils.storageRemove('createdItem');
            utils.storageRemove('item');

            //下一步操作
            self.$modal({
              content: '已保存到草稿箱',
              buttons: [
                { text: "返回列表",
                  onClick: function() {
                    // 跳转到商品列表
                    self.$router.replace({name: '5.8', query: {goodsState: '5', title: '全部商品'}});
                  }
                },

                { text: "继续上新",
                  onClick: function() {
                    self.clearData()
                  }
                }
              ]
            });
          }
        })
      } else { //1：保存并提审
        self.item.operatingState = '1';//1:保存并提交审核
        self.success_msg = '提交成功'
        self.fail_msg = '保存并提交审核失败'
        // TODO 弹窗后阻止运行下面的
        self.$modal({
          content: '您确定将以上内容提交审核？审核期间暂时不可修改哦',
          buttons: [
            {text: '取消', onClick: function () {}},
            {text: '确定',
              onClick: function () {
                self.insertCommInfo(self.item, function (err) {
                  if (err) {
                    self.$toast({
                      message: err,
                    });
                  } else {
                    //清空缓存
                    utils.storageRemove('createdItem');
                    utils.storageRemove('item');
                    //下一步操作
                    self.$modal({
                      content: '已提交审核',
                      buttons: [
                        { text: "返回列表",
                          onClick: function() {
                            self.$router.replace({name: '5.8', query: {goodsState: '5', title: '全部商品'}});
                          }
                        },
                        { text: "继续上新",
                          onClick: function() {
                            self.clearData()
                          }
                        }
                      ]
                    });
                  }
                })
              }}
          ]
        })
      }
    },
    // 清空数据
    clearData() {
      this.item.deliveryTypeList = ['0', '2']
      this.item.dropPrice = ''
      this.item.retailPrice = ''
      this.item.normQualityName = ''
      this.item.goodsImgList = []
      this.item.propertyList = []
      this.item.weight = null
      this.item.freightNo = ''
      this.item.normQualityName = ''
      this.item.stockState = '0'
      this.item.selectedAttributesIdList = []
      this.item.selectedAttributesNameList = []
      this.item.sdistributionName = '到店自提'
      this.item.sdistributionName2 = '物流配送'
      this.item.showWeight = ''
    },

    /**
     * 遮罩控制
     */
    visibleControl() { //popupVisible || weightVisible || stockStateVisible
      if (this.popupVisible == true) { this.popupVisible = false }
      if (this.weightVisible == true) { this.weightVisible = false }
      if (this.stockStateVisible == true) { this.stockStateVisible = false }
    },
    /**
     * 1003-插入商品信息
     * @param item
     * @param callback
     */
    insertCommInfo: function (item, callback) {
      let apiId = '1003'
      console.log('insert ', JSON.parse(JSON.stringify(item)));
      networklib.post(apiId, item).then((obj) => {
        console.log('成功的回调', obj);
        callback();
      }).catch(err => {
        console.log('失败的回调 1003', err);
        callback(err);
      });
    },

    /**
     * 进入品牌页
     */
    pushBrandsList() {
      utils.storageSet('createdItem', this.item);
      //跳转品牌选择页面
      this.$router.push({
        path: '/brands',
        query: {
          flag: '1'
        }
      });
    },

    //点击返回键：返回商户首页 已有内容输入的情况下，点击“返回”，提示，无则直接返回
    gotoCloudStoreIndex() {
      let self = this;
      let getResult = utils.isCompare(utils.storageGet('item'), JSON.parse(JSON.stringify(this.item)));
      console.log('比较2个json对象结果 :', getResult, '[注: true:相等 false:不相等]');

      if (!getResult) {
        self.$modal({
          content: '您确定要离开吗？若离开，已输入的内容将丢失。',
          buttons: [
            {text: '取消', onClick: function () {}},
            {text: '确定离开',
              onClick: function () {
                utils.storageRemove('createdItem');
                self.$router.go(-1)
              }}
          ]
        });
      } else {
        utils.storageRemove('createdItem');
        self.$router.go(-1)
      }
      utils.storageRemove('item')
    },
    /**
     * 跳转分类选择页
     */
    gotoGoodsType() {
      // console.log('跳转到分类页面');
      utils.storageSet('createdItem', this.item);
      this.$router.push({
        path: '/goodsType',
        query: {
          flag: '1'
        }
      })
    },
    /**
     * 跳转sku属性页
     */
    gotoAttribute() {
      if (!this.validation.classifyId) {
        this.$toast("请先选择分类", "text")
        return
      }
      console.log('传到sku属性页面的selectedAttributesIdList', this.item.selectedAttributesIdList);
      //参数  classifyId  分类Id merchantId 商户Id
      utils.storageSet('createdItem', this.item);
      this.$router.push({
        path: '/goodsSKU',
        query: {
          flag: '1',
          selectedAttributesIdList: this.item.selectedAttributesIdList,
          classifyId: this.item.classifyId
        }
      })
    },
    /**
     * 处理sku字段的方法
     */
    getSkuName(arr, nameStr) {
      console.log('arr', arr)
      var name = ''
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
    stockName: function () {
      if (this.item.stockState === '0') {
        return '有货';
      } else if (this.item.stockState === '1') {
        return '库存紧张';
      } else if (this.item.stockState === '2') {
        return '咨询店员';
      } else if (this.item.stockState === '3') {
        return '无货';
      } else {
        return '未知';
      }
    },
    // propertyName: function () {
    //   let self = this;
    //   let str = '';
    //   console.log("sku属性名称：" + self.item.selectedAttributesNameList)
    //   self.item.selectedAttributesNameList.map(function(obj) {
    //     if (obj != null && obj != '') {
    //       str += obj + ';'
    //     }
    //   })
    //   return str;
    // },
    propertyName: function () {
      let skuName = '' // 属性名称
      console.log('展示属性：', JSON.stringify(this.item.selectedAttributesNameList))
      this.item.selectedAttributesNameList.map((skuListItem) => {
        skuName += this.getSkuName(skuListItem.list, skuListItem.key);
      })
      return skuName
    },
    validation () {
      return {
        freightNo: !!this.item.freightNo,
        normQualityName: !!this.item.normQualityName.trim(),
        retailPrice: priceRE.test(this.item.retailPrice),
        dropPrice: priceRE.test(this.item.dropPrice),
        // weight: numberRE.test(this.item.weight),
        weight: !!this.item.showWeight,
        classifyId: !!this.item.classifyId,
        propertyList: this.item.propertyList.length > 0, // list
        stockState: !!this.item.stockState,
        deliveryTypeList: !!this.item.deliveryTypeList, // list
        brandId: !!this.item.brandId,
        goodsImgList: this.item.goodsImgList.length > 0, // list
      }
    },
    isValid () {
      const validation = this.validation
      return Object.keys(validation).every(key => validation[key])
    },
  },
};
</script>
