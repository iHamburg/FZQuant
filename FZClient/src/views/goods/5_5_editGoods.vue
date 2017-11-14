<!-- 编辑商品 -->
<style lang="scss" src="src/sass/goodinset.scss" scoped></style>
<template>
  <div id="app" class="content" >
    <div class="content-head">
      <bl-bar barStyle="bar-dark-linear">
          <div class="button" slot="left-button" @click="onBack">
              <div class="iconfont arrow-back"></div><i class="fback">返回</i>
          </div>
          <div slot="title">编辑商品</div>
      </bl-bar>
    </div>

<!-- 货号不可编辑 -->
<!--     <bl-comli>
      <div slot='left-text' class="left-box">货号</div>
      <div slot='right-text' class="right-box">
        <div class="right-l">
          <span>{{item.freightNo}}</span>
        </div>
      </div>
    </bl-comli> -->

<!-- 货号可编辑 -->
    <bl-comli>
      <div slot='left-text' class="left-box">货号</div>
      <div slot='right-text' class="right-box">
        <div class="right-l">
          <input type="text" name="" placeholder="必填" v-model.trim="item.freightNo" v-if="item.goodsState == 0" v-on:blur="onBlur">
          <span v-else="item.goodsState != 0">{{item.freightNo}}</span>
        </div>
        <div class="scan" v-show="item.freightNo == '' || item.freightNo == null">
          <img src="../../assets/i/scan.png">
        </div>
      </div>
    </bl-comli>

    <bl-comli>
        <div slot='left-text' class="left-box">标准品名</div>
        <div slot='right-text' class="right-box">
          <div class="right-l">
            <input type="text" name="" placeholder="必填" v-model.trim="item.normQualityName" maxlength="60">
          </div>
        </div>
    </bl-comli>
    <bl-comli>
        <div slot='left-text' class="left-box">缩略品名</div>
        <div slot='right-text' class="right-box">
          <div class="right-l">
            <input type="text" name="" placeholder="非必填" v-model.trim="item.breviaryQualityName" maxlength="30">
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
            <div style="white-space: pre">{{item.str}}</div>
          </div>
          <div class="iconfont arrow-back"></div>
        </div>
    </bl-comli>
    <!--<bl-comli>-->
      <!--<div slot='left-text' class="left-box">商品SKU库存</div>-->
      <!--<div slot='right-text' class="right-box" @click="goSKU()">-->
        <!--<div class="right-l"></div>-->
        <!--<div class="iconfont arrow-back"></div>-->
      <!--</div>-->
    <!--</bl-comli>-->
    <bl-comli>
      <div slot='left-text'>商品二维码</div>
      <div slot='right-text' class="right-text">
        <button type="button" class="qrcodestyle" @click="gotoGoodsQR()">查看二维码</button>
        <button type="button" class="qrcodestyle">绑定</button>
      </div>
    </bl-comli>
    <bl-comli>
        <div slot='left-text' class="left-box">售价</div>
        <div slot='right-text' class="right-box">
          <div class="right-l">
            <input type="number" :readonly="isReadOnly" v-model.number="item.retailPrice" placeholder="填写售价" @click="onclick">
          </div>
        </div>
    </bl-comli>
    <bl-comli>
        <div slot='left-text' class="left-box">吊牌价格</div>
        <div slot='right-text' class="right-box">
          <div class="right-l">
            <input type="number" :readonly="isReadOnly" v-model.number="item.dropPrice" placeholder="填写吊牌价格" @click="onclick">
          </div>
        </div>
    </bl-comli>
    <bl-comli>
        <div slot='left-text' class="left-box">库存状态</div>
        <div slot='right-text' class="right-box" @click="stockStateVisible = true">
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
            <span>{{item.sdistributionName}} {{item.sdistributionName2}}  <!-- {{item.sdistributionName3}} --></span>
          </div>
          <div class="iconfont arrow-back"></div>
        </div>
    </bl-comli>


    <upload :maxpic='9' :paths='item.goodsImgList' :name='"图片上传"' class="margin-b"
             @clickImg='parentImg' :needmain='true' :mainpic='picindex' @confirm='onGetGoodsImage' @deleteConfirm='deleteConfirm' :ratio=1 >
    </upload>
    <bigImage needmain="true" :picPaths="item.goodsImgList" ref='big' @setMainImg="setMainImg" ></bigImage>

    <bl-comli>
        <div slot='left-text' class="left-box">品牌</div>
        <div slot='right-text' class="right-box" @click="pushBrandsList()">
          <div class="right-l">
           <span>{{item.brandName}}</span>
          </div>
          <div class="iconfont arrow-back"></div>
        </div>
    </bl-comli>
    <bl-comli>
      <div slot='left-text' class="left-box">上市时间</div>
      <div slot='right-text' class="right-box" @click="popupTimeVisible = !popupTimeVisible">
        <div class="right-l">
          <span>{{item.lastShelves}}</span>
        </div>
        <div class="iconfont arrow-back"></div>
      </div>
    </bl-comli>
    <bl-comli>
      <div slot='left-text' class="left-box">产地</div>
      <div slot='right-text' class="right-box" @click="popupVisibleAddressPicker = !popupVisibleAddressPicker">
        <div class="right-l">
          <span>{{item.producingArea}}</span>
        </div>
        <div class="iconfont arrow-back"></div>
      </div>
    </bl-comli>
    <bl-comli class="margin-b">
        <div slot='left-text' class="left-box">规格</div>
        <div slot='right-text' class="right-box">
          <div class="right-l">
            <input type="text" placeholder="选填" maxlength="20" v-model.trim="item.goodsStandard">
          </div>
        </div>
    </bl-comli>
<!--     <bl-comli class="margin-b">
        <div slot='left-text' class="left-box">重量 (g)</div>
        <div slot='right-text' class="right-box">
          <div class="right-l">
            <input type="number" name="" placeholder="必填"  v-model.number="item.weight">
          </div>
        </div>
    </bl-comli> -->
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

    <!--重量-->
    <bl-actionsheet :actions="weightActions" v-model="weightVisible" cancelText="" @thisValue="function(val){item.showWeight = val;}"></bl-actionsheet>
    <div v-if="weightVisible"><div class="modal-bg" @click="weightVisible=false"></div></div>

    <!--草稿箱有额外的保存按钮-->
<!--     <bl-button style="margin:0.5rem 0.3rem;" @click="onSubmit('0')" v-show="item.goodsState == 0">保存</bl-button>
    <bl-button style="margin:0.5rem 0.3rem;" @click="onSubmit('1')" >保存并提交审核</bl-button> -->
    <!-- 底部按钮 -->
    <div class="editgress">
      <button class="button2" @click="onSubmit('0')" v-show="item.goodsState == 0" @touchstart="">保存</button>
      <button :class="{'button1':item.goodsState != 0,'button2':item.goodsState == 0}" @click="onSubmit('1')" @touchstart="">保存并提交</button>
    </div>
    <!--<li style="padding-right: .24rem;padding-left: .24rem" class="flex-space" v-show="item.goodsState == 0">-->
      <!--<bl-button inline style="width: 45%;" @click="onSave(0)">保存</bl-button>-->
      <!--<bl-button inline style="width: 45%;" @click="onSave(1)">保存并提交审核</bl-button>-->
    <!--</li>-->

    <!-- 库存状态 -->
    <bl-actionsheet :actions="stockStateActions" v-model="stockStateVisible" cancelText="" @thisValue="val => item.stockState = val"></bl-actionsheet>
    <div v-if="stockStateVisible"><div class="modal-bg" @click="stockStateVisible=false"></div></div>



    <!-- 上市时间 -->
     <bl-popup v-model="popupTimeVisible" position="bottom" class="mint-popup-4" style="width: 100%;">
      <bl-picker :slots="slots1" @change="onValuesChange" show-toolbar @getValues="confirm2" @cancel="closed('time')">
      </bl-picker>
     </bl-popup>


    <!-- 产地 -->
    <bl-popup v-model="popupVisibleAddressPicker" position="bottom" style="width: 100%;">
      <bl-picker ref="addressPicker" :slots="addressSlots" @change="onAddressChange" :visible-item-count="5" show-toolbar v-model="item.producingArea" @getValues="confirm" @cancel="closed('area')">
      </bl-picker>
    </bl-popup>
    <!--遮罩-->
    <div v-if="popupTimeVisible || popupVisibleAddressPicker"><div class="modal-bg"></div></div>

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
<!--                     <dd @click="ifPost2 = !ifPost2">
                        <div class="line">
                          <span class="checkicon" :class="{check : ifPost2}">
                              <i></i>
                          </span>
                          <span>不包邮</span>
                        </div>
                    </dd> -->
                </dl>

            </div>
        </bl-cust-picker>
    </bl-popup>

    <!--遮罩-->
    <div v-if="popupVisible" @click="popupVisible = !popupVisible">
      <div class="modal-bg"></div>
    </div>
  </div>

</template>

<script>
  import utils from 'src/utils';
  import networklib from 'src/libs/networklib';
  import merchantlib from 'src/libs/merchantlib';
  import addresslib from 'src/libs/addresslib'
  import uiMixin from 'src/mixins/uiMixin';
  import upload from 'components/bl-cloudstore-merchant/bl-cloudStore-image-uploader'
  import bigImage from 'components/bl-cloudstore-merchant/bl-cloudStore-seeBigImage'

  const numberRE = /^(0|[1-9]\d*)$/
  const priceRE = /^[0-9]+(.[0-9]{1,2})?$/

  export default {
    name: 'createGoods',
    components: {upload, 'BlCustPicker': () => System.import('components/cloud-merchant/cust-picker'), bigImage
    },

    mixins: [uiMixin],
    data() {
      return {
        ifSince: false,
        ifPost1: false,
        ifPost2: false,
        weightVisible: false,
        picindex: -1,
        big: false,
        btnshow: true,
        paths: [],
        mainImgIndex: null,
        popups: false,
        popupVisible2: false,
        cancelText: '取消',
        confirmText: '确定',
        addressCountry: '中国',
        addressProvince: '北京',
        addressCity: '北京',
        item: {

          sdistributionName: '到店自提',
          sdistributionName2: '',
          // sdistributionName3: '',

          brandId: null, //品牌Id
          breviaryQualityName: null,
          classifyId: null, //分类Id
          deliveryTypeList: [], // 配送类型List
          dropPrice: '', //吊牌价格
          goodsId: null, //商品ID
          goodsImgList: [], //商品图片List
          largeId: null, //大类码Id
          lastShelves: null, //上市时间
          normQualityName: null, //标准品名
          operatingState: '1', //操作状态  0：保存 1：保存并提交审核
          producingArea: null, //产地
          propertyList: [], //子属性List
          retailPrice: '', //售价
          //stockNum: null, //库存数量
          stockState: null, //库存状态 默认有货
          weight: '', //重量
          goodsStandard: '', // 规格
          freightNo: '',
          classifyName: null,
          largeName: null,
          brandName: null,
          commercialCode: null, //业态编码
          commercialName: null, //业态名称
          merchantId: null, //商户id
          merchantName: null, //商户名称
          stockNum: '99', //库存数量
          storeCode: null, //门店编码
          storeName: null, //门店名称
          memberId: null, //当前的操作用户
          distributionData: 0,  // 自提 配送
          selectedAttributesNameList: [],
          selectedAttributesIdList: [],
          str: '',
          showWeight: '', // 单位kg
        },
        oldFreightNo: null,
        selectedAttributesIdList2: [], // 用于回显的属性list
        toolbarSubText: null,
        distributionVisible: false,
        popupVisibleAddressPicker: false,
        popupTimeVisible: false,
        addressSlots: [
          {
            flex: 1,
            values: Object.keys(addresslib.country),
            className: 'slot1',
            textAlign: 'center'
          },
          {
            divider: true,
            content: '-',
            className: 'slot2'
          },
          {
            flex: 1,
            values: Object.keys(addresslib.chinaAddress),
            className: 'slot3',
            textAlign: 'center'
          },
          {
            divider: true,
            content: '-',
            className: 'slot4'
          },
          {
            flex: 1,
            values: addresslib.chinaAddress['北京'],
            className: 'slot5',
            textAlign: 'center'
          }
        ],

        goodsId: null,
        goodsImg: [],
        popupVisible: false,
        stockStateVisible: false,

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
        slots: [
          {
            flex: 1,
            values: [],
            textAlign: 'center'
          }
        ],
        slots1: [
          {
            flex: 1,
            values: ['2007年', '2008年', '2009年', '2010年', '2011年', '2012年', '2013年', '2014年', '2015年', '2016年', '2017年', '2018年', '2019年', '2020年'],
            className: 'slot1',
            textAlign: 'center',
            defaultIndex: 0
          },
          {
            divider: true,
            content: '—',
            className: 'slot2',
            textAlign: 'center'
          },
          {
            flex: 1,
            values: ['春季', '夏季', '秋季', '冬季'],
            className: 'slot3',
            textAlign: 'center',
            defaultIndex: 0
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
        fromPath: '',
        count: 0,
      };
    },
    mounted () {
      if (!this.$route.params.goodsId) {
        return this.$toast('没有传入商品ID');
      }

      this.item.goodsId = this.$route.params.goodsId;
      //用户登陆相关信息.
      this.item.commercialCode = merchantlib.getCommercialCode();//业态编码
      this.item.commercialName = merchantlib.getCommercialName();//业态名称
      this.item.merchantId = merchantlib.getMerchantId();//商户id
      this.item.merchantName = merchantlib.getMerchantName();//商户名称
      this.item.storeCode = merchantlib.getStoreCode();//门店编码
      this.item.storeName = merchantlib.getStoreName();//门店名称
      this.item.memberId = merchantlib.getMemberId();//当前的操作用户
      // 先查cache ！没有cache再调接口
      let item = utils.storageGet('editedItem');

      if (item != null && item.goodsId === this.item.goodsId) {
        this.item = item;
        let self = this;
        if (self.item.selectedAttributesIdList != null) {
          self.item.propertyList = self.item.selectedAttributesIdList
        }

        if (self.item.selectedAttributesNameList != null) {
          let skuName = '' // sku名称
          this.item.selectedAttributesNameList.map((skuListItem) => {
            skuName += this.getSkuName(skuListItem.list, skuListItem.key);
          })
          // console.log('展示属性名称22223：', skuName)
          return (self.item.str = skuName)
        }

        self.item.deliveryTypeList.forEach(function(val) {
          if (val == 0) {
            self.item.sdistributionName = '到店自提';
          } else if (val == 2) {
            self.item.sdistributionName2 = '物流配送';
          }
          //  else {
          //   self.item.sdistributionName3 = '不包邮';
          // }
        })
      } else {
        console.log("当缓存中没有数据的时候走查询商品详情接口----")
        // 进入编辑页面后先查缓存，如果缓存没有该商品数据，再查商品详情接口获取商品数据
        let self = this;
        this.queryGoodsDetail(function(err) {
          if (err) {
            return self.$toast({
              message: '服务器载入失败:' + err,
            });
          }
        });
      }

      //防止页面跳转,图片主图标识丢失.
      if (this.paths != null) {
        this.picindex = 0;
      }
    },

    beforeRouteEnter (to, from, next) {
      next(vm => {
        // 通过 `vm` 访问组件实例
        vm.fromPath = from.name;
      })
    },

    methods: {

       //用于回显配送选项
      distribute() {
        let self = this
        self.ifSince = false
        self.ifPost1 = false
        self.ifPost2 = false

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
        if (!this.validation.retailPrice) {
          this.$toast("请输入正确的售价（小数点后最多两位的非负数）", "text")
          return
        }
        if (!this.validation.dropPrice) {
          this.$toast("请输入正确的吊牌价（小数点后最多两位的非负数）", "text")
          return
        }
        if (this.item.retailPrice > this.item.dropPrice) {
          this.$toast("售价不能大于吊牌价", "text")
          return
        }
        if (!this.validation.weight) {
          this.$toast("请选择重量", "text")
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
        // 合法性校验
        if (!this.isValid) {
          console.log('回去重写')
          return false;
        }

        return true;
      },

      onBack() {
        let self = this
        console.log('首次缓存：', utils.storageGet('editGoods'))
        console.log('当前对象：', JSON.parse(JSON.stringify(self.item)))
        let getResult = utils.isCompare(utils.storageGet('editGoods'), JSON.parse(JSON.stringify(this.item)));
        console.log('比较2个json对象结果 :', getResult, '[注: true:相等 false:不相等]');

        if (!getResult) {
          self.$modal({
            content: '您确定要离开吗？若离开，已编辑的内容将丢失。',
            buttons: [
              {text: '取消', onClick: function () {}},
              {text: '确定离开',
                onClick: function () {
                  utils.storageRemove('editGoods')
                  utils.storageRemove('editedItem');
                  self.$router.go(-1)
                }}
            ]
          });
        } else {
          utils.storageRemove('editGoods')
          utils.storageRemove('editedItem')
          self.$router.go(-1)
        }
      },

      onclick() {
        // console.log('点击价格', this.isReadOnly)
        if (this.isReadOnly) return this.$toast('商品正在参与直降不可改价!')
      },

      onBlur () {
        let self = this
        if (this.oldFreightNo === this.item.freightNo) { return }
        // console.log(this.oldFreightNo, this.item.freightNo)
        self.queryGoods(function (err, goodsId) {
          if (goodsId) {
            self.$toast('该货号已经存在')
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

      /**
       * 上市时间确定按钮
       */
      confirm2(values) {
        this.popupTimeVisible = false;
        if (!values[0]) {
          values[0] = this.slots1[0].values[0];
        }
        this.item.lastShelves = values[0] + ' ' + values[1];
      },
      closed(param) {
        (param == 'time') ? (this.popupTimeVisible = false) : (this.popupVisibleAddressPicker = false)
      },

      //回调获取商品上传图片.
      onGetGoodsImage(data) {
        let self = this;
        self.item.goodsImgList.push(data.mediaCephUrl);
        console.log('self.item.goodsImgList', self.item.goodsImgList);
      },

      //图片回调删除方法:deleteConfirm data.index
      deleteConfirm(data) {
        let self = this;
        self.item.goodsImgList.splice(data.index, 1);
      },
      //本地选择多张照片
      selectedMutilateImage(images) {
        images.forEach((item) => {
          this.item.goodsImgList.push(item);
        })
      },
      //查看大图
      parentImg(index) {
        this.$refs.big.openBigImage(index);
      },
      //设置主图按钮事件.
      setMainImg(index) {
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
      // 产地
      onAddressChange(picker, values) {
        //console.log('=====  ', values);
        if (values[0] && !(values[0] instanceof Array)) {
          this.addressCountry = values[0];
        }
        if (!(values[1] instanceof Array)) {
          this.addressProvince = values[1];
        }
        if (!(values[2] instanceof Array)) {
          this.addressCity = values[2];
        }
        if ((values[0] instanceof Array)) {
          if (addresslib.germanyAddress[values[1]]) {
            this.addressSlots[2].values = Object.keys(addresslib.germanyAddress);
            picker.setSlotValues(2, addresslib.germanyAddress[values[1]]);
          } else if (addresslib.chinaAddress[values[1]]) {
            this.addressSlots[2].values = Object.keys(addresslib.chinaAddress);
            picker.setSlotValues(2, addresslib.chinaAddress[values[1]]);
          } else if (addresslib.russiaAddress[values[1]]) {
            this.addressSlots[2].values = Object.keys(addresslib.russiaAddress);
            picker.setSlotValues(2, addresslib.russiaAddress[values[1]]);
          } else if (addresslib.usaAddress[values[1]]) {
            this.addressSlots[2].values = Object.keys(addresslib.usaAddress);
            picker.setSlotValues(2, addresslib.usaAddress[values[1]]);
          }
        } else {
          switch (values[0]) {
            case '中国':
              this.addressSlots[2].values = Object.keys(addresslib.chinaAddress);
              picker.setSlotValues(2, addresslib.chinaAddress[values[1]]);
              break;
            case '德国':
              this.addressSlots[2].values = Object.keys(addresslib.germanyAddress);
              picker.setSlotValues(2, addresslib.germanyAddress[values[1]]);
              break;
            case '俄罗斯':
              this.addressSlots[2].values = Object.keys(addresslib.russiaAddress);
              picker.setSlotValues(2, addresslib.russiaAddress[values[1]]);
              break;
            case '美国':
              this.addressSlots[2].values = Object.keys(addresslib.usaAddress);
              picker.setSlotValues(2, addresslib.usaAddress[values[1]]);
              break;
            default:
              picker.setSlotValues(2, addresslib.chinaAddress[values[1]]);
          }
        }
        //console.log(this.addressCountry + '--' + this.addressProvince + '--' + this.addressCity)
      },

      /**
       * 地址确定按钮
       */
      confirm(values) {
        console.log('地址确定按钮:', values[0])
        this.popupVisibleAddressPicker = false;
        if (!values[0]) {
          values[0] = this.addressSlots[0].values[0];
        }
        this.item.producingArea = values[0] + ' ' + values[1];
        this.item.producingArea = this.addressCountry + ' ' + this.addressProvince + ' ' + this.addressCity;
      },

      showButton() {
        if (this.item.goodsState == '0' || this.item.goodsState == '3' || this.item.goodsState == '4') {
          return true;
        }
      },

      onValuesChange(picker, values) {
        if (values[0] > values[1]) {
          picker.setSlotValue(1, values[0]);
        }
      },

      /**
       * 查询商品详情
       *
       * @param callback {err}
       */
      queryGoodsDetail (callback) {
        let self = this;
        let apiId = '1008';
        let queryParam = {goodsId: self.item.goodsId, merchantId: self.item.merchantId};
        //调查询商品详情接口
        networklib.post(apiId, queryParam).then((obj) => {
          self.item = obj;
          self.oldFreightNo = obj.freightNo
          self.item.weight = obj.weight / 1000
          this.item.showWeight = self.item.weight
          console.log('self.item.weight:', self.item.weight)
          self.item.deliveryTypeList.forEach(function(val) {
            if (val == 0) {
              self.item.sdistributionName = '到店自提 ';
            } else if (val == 2) {
              self.item.sdistributionName2 = ' 物流配送';
            }
            //  else {
            //   self.item.sdistributionName3 = '不包邮';
            // }
          })
          if (obj.propertyList.length > 0) {
            self.item.propertyList = obj.propertyList;
          }
          // console.log('商品详情接口属性：', self.item.propertyList)
          let property = self.item.propertyList;
          self.propertyName();
          // console.log('初次属性名：', self.item.str)
          if (this.item.selectedAttributesIdList == null) {
            for (var i = property.length - 1; i >= 0; i--) {
              var list = property[i].list
              for (var j = list.length - 1; j >= 0; j--) {
                var list2 = list[j].list
                for (var k = list2.length - 1; k >= 0; k--) {
                  var id = list2[k].skuID
                  this.selectedAttributesIdList2.push(id);
                }
              }
            }
            this.item.propertyList = this.selectedAttributesIdList2;
          }
          self.paths = obj.goodsImgList;
          utils.storageSet('editGoods', self.item)
          utils.storageSet('editedItem', self.item);
          callback();
        }).catch(err => {
          // console.log('失败的回调', apiId, err);
          callback(err);
        });
      },
      gotoGoodsType() {
        this.count --
        // console.log(this.count)
        utils.storageSet('editedItem', this.item);
        this.$router.push({
          path: '/goodsType',
          query: {
            goodsId: this.item.goodsId,
            flag: '2'
          }
        })
      },
      gotoAttribute() {
        this.count --
        if (!this.validation.classifyId) {
          this.$toast("请先选择分类", "text")
          return
        }
        utils.storageSet('editedItem', this.item);
        // console.log('用于回显的propertyList：', this.item.propertyList)
        this.$router.push({
          path: '/goodsSKU',
          query: {
            flag: '2',
            goodsId: this.item.goodsId,
            classifyId: this.item.classifyId,
            selectedAttributesIdList: this.item.propertyList
          }
        })
      },

      pushBrandsList() {
        utils.storageSet('editedItem', this.item);
        //跳转品牌选择页面
        this.$router.push({
          path: '/brands',
          query: {
            goodsId: this.item.goodsId,
            flag: '2'
          }
        });
      },
      gotoGoodsQR () {
        console.log('跳转到商品二维码');
        // 参数 商品Id 货号 标准品名
        this.$router.push({path: '/goodsQR', query: {goodsId: this.item.goodsId, freightNo: this.item.freightNo, normQualityName: this.item.normQualityName}});
      },

      // 跳转到SKU库存里面...
      goSKU() {
        utils.storageSet('editedItem', this.item);
        this.$router.push({ path: '/goodsSKUManage', query: {goodsId: this.item.goodsId, flag: '1'} })
      },

      //保存或保存并提交审核
      onSubmit (saveType) {
        // console.log('保存类型：', saveType);
        // 校验参数
        if (!this.valiParam()) { return }
        // console.log('on save');
        let self = this;
        // console.log('接口入参propertyList', self.item.propertyList)
        self.item.weight = self.item.showWeight * 1000
        console.log('self.item.weight:', self.item.weight)
        if (saveType == '0') {
          //0：保存
          self.item.operatingState = '0';
          self.updateCommInfo(self.item, function(err) {
            console.log('更新商品入参：', JSON.parse(JSON.stringify(self.item)));
            if (err) {
              return self.$toast({message: err});
            } else {
              self.$toast('保存成功');
              //清空缓存
              utils.storageRemove('editedItem');
              utils.storageRemove('editGoods');
              self.$router.go(-1)
            }
          })
        } else {
          self.item.operatingState = '1';//1:保存并提交审核
          self.$modal({
            content: '您确定将以上内容提交审核？审核期间暂时不可修改哦',
            buttons: [
              {text: '取消', onClick: function() {}},
              {text: '确定',
                onClick: function() {
                  //1004-更新商品
                  self.updateCommInfo(self.item, function(err) {
                    if (err) {
                      self.$toast({
                        message: err,
                      });
                    } else {
                      self.$toast({
                        message: '更新成功',
                      });
                      //清空缓存
                      utils.storageRemove('editedItem');
                      utils.storageRemove('editGoods');
                      self.$router.go(-1)
                    }
                  });
                }}
            ]
          });
        }
      },

      // 1004-更新商品信息
      updateCommInfo: function (item, callback) {
//        console.log('insert comm info');
        let apiId = '1004';
        networklib.post(apiId, item).then((obj) => {
          // console.log('成功的回调', obj);
          callback();
        }).catch(err => {
          // console.log('失败的回调', apiId, err);
          callback(err);
        })
      },
      propertyName() {
        let skuNamestr = '' // sku名称
        // console.log('商品属性222222：', JSON.stringify(this.item.propertyList));

        this.item.propertyList.map((listItem) => {
          skuNamestr += this.getSkuName(listItem, listItem.skuName);
        })
        console.log('skuNamestr', skuNamestr);
        return (this.item.str = skuNamestr)
      },

      getSkuName(proList, nameStr) {
        // console.log('proList', proList)
        var name = ''
        var arr = [];
        // console.log('proList类型', (proList instanceof Array));
        if (!(proList instanceof Array)) {
          proList.list.map(function(obj) {
            obj.list.map(function(obj) {
              arr.push(obj.skuName)
            })
          })
        } else {
          arr = proList;
        }

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
      /**
       * 库存状态
       */
      stockName: function() {
        let str = ''
        if (this.item.stockState == '0') {
          str = '有货';
        } else if (this.item.stockState == '1') {
          str = '库存紧张'
        } else if (this.item.stockState == '2') {
          str = '咨询店员'
        } else if (this.item.stockState == '3') {
          str = '无货'
        }
        return str;
      },
      validation () {
        return {
          freightNo: !!this.item.freightNo,
          normQualityName: !!this.item.normQualityName.trim(),
          retailPrice: priceRE.test(this.item.retailPrice),
          dropPrice: priceRE.test(this.item.dropPrice),
          weight: !!this.item.showWeight,
          classifyId: !!this.item.classifyId,
          propertyList: this.item.propertyList.length > 0, // list
          stockState: !!this.item.stockState,
          deliveryTypeList: this.item.deliveryTypeList != null, // list
          brandId: !!this.item.brandId,
          goodsImgList: this.item.goodsImgList.length > 0, // list
        }
      },
      isValid () {
        const validation = this.validation
        return Object.keys(validation).every(key => validation[key])
      },
      isReadOnly() {
        let flag = false
        if (this.item.promotionFlag == 1) {
          flag = true
        }
        return flag
      }
    }
};
</script>

