<!-- 代客下单 -->
<style lang="scss" src="src/sass/order.scss" scoped></style>
<template>
  <div>
    <div class="content">
      <bl-bar barStyle="bar-dark-linear">
          <div class="button" slot="left-button" @click="onBack">
            <div class="iconfont arrow-back"></div>
            <i class="fback">返回</i>
          </div>
          <div slot="title">代客下单</div>
      </bl-bar>

      <bl-comli class="otop">
          <div slot='left-text' class="left-box">配送方式</div>
          <div slot='right-text' class="right-box" @click="popupAD = !popupAD">
            <div class="right-r">{{ stockName }} </div>
            <div class="iconfont arrow-back"></div>
          </div>
      </bl-comli>
      <div class="prolist"> <div class="tip"><p>商品列表</p></div></div>

      <!-- new -->
      <div class="prolist" >
      <!-- <div class="prolist" v-if="goodsGroupList.length > 0"> -->
        <div v-for="(goodsGroup, index) in goodsGroupList">
          <div class="discount" v-show="goodsGroup.title" v-if="goodsGroup.goodsList.length > 0">
            <i>优惠</i>以下商品 <em>{{goodsGroup.title}}</em>
          </div>
          <bl-check-box class="probox" v-for="(item, key) in goodsGroup.goodsList">
              <em slot="check"><img :src="item.goodsImg"></em>
              <div slot="check-box" class="box">
                <h1>{{ item.goodsName }}</h1>
                <p>
                    <i class="l">货号：{{ item.freightNo }}</i>
                </p>
                <p>
                  <span class="l">¥ {{ item.price }} <i>X {{ item.count }}</i></span>
                </p>
                <div class="bute choose" @click="buteList(item, key)">
                    <!-- <span v-if="!item.color">选择属性</span> -->
                    <span class="choose">
                      已选：{{item.count}}件
                      <b>{{propertyFilter(item)}}</b>
                    </span>
                    <i class="iconfont arrow-back"></i>
                </div>
              </div>
          </bl-check-box>
          <div v-if="index < goodsGroupList.length - 1" class="margin-c"></div>
        </div>
       <!-- 加一条分割线 -->
      </div>

      <!-- 添加商品按钮 -->
      <div class="prolist">
        <bl-button @click="onAddGoods()" class="lbtn">添加商品</bl-button>
        <bl-button @click="onConsultGoods()" class="rbtn">历史查询商品</bl-button>
      </div>


      <!--<div class="code">-->
           <!--<bl-comli>-->
              <!--<div slot='left-text' class="left-box">大类码</div>-->
              <!--<div slot='right-text' class="right-box">-->
                <!--<div class="right-l" @click="popupDM = !popupDM"><input type="text" name="dCodeVal" ref="dCodeVal" placeholder="填写活动大类码" value=""></div>-->
              <!--</div>-->
          <!--</bl-comli> -->
          <!--<bl-comli>-->
              <!--<div slot='left-text' class="left-box">销售码</div>-->
              <!--<div slot='right-text' class="right-box">-->
                <!--<div class="right-l"><input type="text" name="" placeholder="填写销售码"></div>-->
              <!--</div>-->
          <!--</bl-comli>-->
      <!--</div>-->

      <!-- 特殊优惠 需要店长以上权限-->
      <bl-comli class="otop" v-if="this.$merchantlib.getRoleId() == 9">
          <div slot='left-text' class="left-box">特殊优惠</div>
          <div slot='right-text' class="right-box" :disabled="promotionVisible" @click="onClickPromotion">
            <div class="right-r">{{promotionName}}</div>
            <div class="iconfont arrow-back"></div>
          </div>
      </bl-comli>

      <dl class="editmoney">
          <!-- <dt> <i class="edit" @click="onEditMoney">编辑金额</i> </dt> -->
          <dd><span class="ml">商品总额</span>
            <!-- 1013迭代 放出改价 -->
            <span class="ePrice" @click="modifyPrice">修改价格</span>
            <span class="mr"> &yen; {{ total }} </span></dd>
          <dd><span class="ml">促销优惠</span> <span class="mr"> -&yen; {{ discount }} </span></dd>
          <dd><span class="ml">改价优惠</span> <span class="mr"> -&yen; {{ merchantAmt }} </span></dd>
          <dd class="pay"><span class="ml">合计金额</span> <span class="mr"> &yen; {{ pay }} </span></dd>
      </dl>

      <!-- <div class="botbtn" style="margin:10px">
        <bl-button @click="onSubmit()" :disabled="btnVisible">生成链接</bl-button>
      </div> -->

      <!-- 新样式 底部按钮 -->
      <div class="editgress">
        <button class="button1" @click="onSubmit()" :disabled="btnVisible">提交审核</button>
      </div>
    </div>

    <div id="component">
      <!-- 配送弹出 -->
      <bl-actionsheet :actions="actions" v-model="popupAD" @thisValue="function(val){deliveryType = val;}"></bl-actionsheet>

      <!-- 属性弹出 -->
      <bl-popup v-model="popupBute" position="bottom" style="width: 100%;" class="butebox">
        <div class="butetop">
          <em><img :src="itemBute.goodsImg"></em>
          <div class="title">{{ itemBute.goodsName }}</div>
          <span><bdi>&yen;</bdi>{{ itemBute.price }}</span>
          <del @click="cancelBute"></del>
        </div>

        <div class="butelist" v-for="property in itemBute.propertyList">
          <p>{{property.skuName}}</p>
          <section>
            <span v-for="subsubproperty in property.subsubList" :class="{select : subsubproperty.select}" @click="checkProperty(property, subsubproperty)">{{ subsubproperty.skuName }}</span>
          </section>
        </div>

        <div class="butecount">
          <span>数量</span>
          <div class="count">
            <em class="reduce" @click="reduce">-</em>
            <input type="tel" v-model="itemBute.count" ref="init" @keyup="integer">
            <em class="add" @click="add">+</em>
          </div>
        </div>

        <bl-button @click="subBute(itemBute)">确认选择</bl-button>
      </bl-popup>

      <!-- 删除弹出 -->
      <bl-modal :buttons="buttons" v-if="isDel">
        <div slot="inner">
          <h3>确认删除该商品吗？</h3>
        </div>
      </bl-modal>

      <!-- 大类码弹出 -->
      <bl-popup v-model="popupDM" position="bottom" style="width: 100%;" class="popdm">
        <div class="dcode">
          <div class="dm">
            <span>大类码</span>
            <input type="text" name="dcode" placeholder="填写活动大类码" ref="dcode" @keyup="codeInit">
            <i @click="clearInit"></i>
          </div>
          <button class="write" :class="{black:dCode}" :disabled="!dCode" @click="subCode">校验按钮</button>
        </div>
      </bl-popup>

      <!-- 金额弹出 -->
      <bl-popup v-model="popupMoney" position="bottom" style="width: 100%;">
        <bl-cust-picker  show-toolbar @cancel="cancel" @getValues="getAfterPrice" :toolbarSubText="toolbarSubText">
          <ul slot="content" class="money">
            <li class="line font">
              <span>当前商品应付总额</span>
              <span>{{ tempPrice }} 元</span>
            </li>
            <li>
              <span>更改总额</span>
              <currency-input v-model.lazy="alterPrice" inputWidth="width:60%" placeholder="输入修改后的商品总额"></currency-input>
              <span>元</span>
            </li>
          </ul>
        </bl-cust-picker>
      </bl-popup>

      <!-- 遮罩 -->
      <div v-if="popupAD || popupDM || popupMoney || popupBute || onEditVisible || popupVisible" @click="popupVisibleBG"><div class="modal-bg"></div></div>

      <!--修改价格-->
      <bl-actionsheet :actions="seletedActions" v-model="onEditVisible" cancelText="取消" @thisValue="editmess"></bl-actionsheet>
      <!-- 修改折扣 -->
      <bl-popup v-model="popupVisible" position="bottom" class="popup-discount" style="width: 100%;">
        <bl-picker :slots="slots" show-toolbar @getValues="getDiscount" @cancel="close">
        </bl-picker>
      </bl-popup>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'keepOrder',
    components: {
      'BlCustPicker': () => System.import('components/cloud-merchant/cust-picker'),
      'BlCheckBox': () => System.import('components/cloud-merchant/check-box'),
      'currency-input': () => System.import('components/currency-input')
    },

    mixins: [],
    data () {
      return {
        customerId: '', // 咨询用户id
        // 配送
        popupAD: false,
        actions: [{
          name: '物流配送',
          key: '0'
        }, {
          name: '门店自提',
          key: '1'
        }],
        deliveryType: '0', // 配送方式

        // 大类码
        popupDM: false,
        dCode: false,
        dCodeVal: null,

        // 销售码
        popupSale: false,
        // 编辑金额
        toolbarSubText: '编辑金额',
        btnVisible: false, // 控制生成链接按钮
        isPass: false, // 是否完善属性

        // 修改价格
        onEditVisible: false,
        popupMoney: false, // 修改价格弹出框
        popupVisible: false, // 修改折扣弹出框

        // 价格相关
        // total: 0, // 总金额
        discount: 0, // 促销活动优惠金额
        // pay: 0, // 应付金额
        alterPrice: 0, // 修改后的金额
        merchantAmt: 0, // 商户优惠金额 9/19添加

        tempDiscount: 0, // 临时变量，用来储存5013返回的优惠金额
        tempPrice: 0, // 临时变量，用来储存5013返回的应付金额

        // 商品属性
        popupBute: false,
        number: 1,
        isDel: false,
        buttons: [{
          text: '取消',
          onClick: () => {
            this.isDel = false
            this.$toast('取消')
          }
        }, {
          text: '删除',
          onClick: () => {
            this.isDel = false
            this.$toast('删除')
          }
        }],

        // order里面的goodsList
        // goodsList: [],

        // 用来展示的goodsGroupList
        goodsGroupList: [
          /*{
            title: '',
            goodsList: []
          },
          {
            title: '',
            goodsList: []
          }*/
        ],

        itemBute: {
          'key': '',
          'goodsName': '',
          'goodsImg': '',
          'price': '',
          'color': [],
          'size': [],
          'count': 1,
          'goodsId': '',
          'tagPrice': '',
          'stockState': '',
          'goodsState': '',
          'freightNo': '',
          'weight': '',
          propertyList: [], //
        },
        // Butes: '选择属性',
        // colors: '',
        // sizes: '',
        // itemCount: 0,
        seletedActions: [
          {
            name: '修改商品总额',
            key: '0',
          },
          {
            name: '添加折扣',
            key: '1',
          },
          {
            name: '重置价格修改',
            key: '2',
          },
        ],
        slots: [
          {
            // flex: 0.7,
            values: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'],
            textAlign: 'center',
            defaultIndex: 5 // 设置默认值index， 必须选0
          },
          {
            divider: true,
            content: '.',
            textAlign: 'center'
          },
          {
            // flex: 0.7,
            values: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'],
            textAlign: 'center',
            defaultIndex: 5
          },
          {
            // flex: 0.7,
            divider: true,
            content: '折',
            textAlign: 'center'
          },
        ],
        // discountNum: 0, // 折扣率

        // 特殊优惠
        promotionId: null,
        promotionName: '',
        promotionVisible: true,

        activityId: ''
      }
    },

    filters: {
      format: function(value) {
        return Number(value).toFixed(2)
      }
    },

    mounted() {
      // 查询特殊优惠数量
      this.querySpecialPromotionByMerchant()
    },

    activated() {
      // console.log('mounted', orderlib.getLocalOrder())
      // 更新数据
      this.updateGoodsList()

      if (this.$route.params.customerId) {
        this.customerId = this.$route.params.customerId;
      }
      if (this.$route.params.promotionId) {
        this.promotionId = (this.$route.params.promotionId == 'noPromotion') ? '' : this.$route.params.promotionId
        this.promotionName = this.$route.params.promotionName;
        console.log('activated:', this.promotionId, this.promotionName)
      }
    },

    methods: {
      // 修改价格
      editmess(key) {
        // console.log('key', key)
        if (key == 0) {
          this.popupMoney = true
        }
        if (key == 1) {
          this.popupVisible = true
        }
        if (key == 2) {
          console.log('重置价格修改')
          this.resetMerchantAmt()
        }
      },

      // 修改折扣 关闭
      close() {
        this.popupVisible = false
      },

      // 点击特殊优惠
      onClickPromotion() {
        if (!this.promotionVisible) return
        let len = 0
        this.goodsGroupList.map(goodsGroup => {
          len = len + goodsGroup.goodsList.length
        })
        // console.log('goodsGroupList中一共 ' + len + ' 件商品')
        if (len > 0) {
          this.$router.push({name: '9.3.3', params: {customerId: this.customerId}})
        } else {
          this.$toast('请先添加商品')
        }
      },

      // 查询特殊优惠数量
      querySpecialPromotionByMerchant () {
        this.$promotionlib.querySpecialPromotionByMerchant((err, obj) => {
          if (err) {
            return this.$toast(err);
          }
          console.log('obj.promotionList ', JSON.stringify(obj.promotionList));
          this.promotionList = obj.promotionList;
          // 当数据为空时显示空图片
          if (this.promotionList.length <= 0) {
            // this.display = true
            this.promotionName = '暂无优惠'
            this.promotionVisible = false
          } else {
            this.promotionName = '请选择'
            this.promotionVisible = true
          }
          // console.log('查询特殊优惠数量：', this.promotionName)
        });
      },

      // 修改价格 点击事件
      modifyPrice() {
        if (this.total <= 0) {
          this.$toast('请添加商品')
          return
        }
        this.alterPrice = Number(this.pay);
        this.onEditVisible = true
      },

      // 获取localOrder中的goodsList
      updateGoodsList() {
        // this.goodsList = this.$orderlib.getLocalOrder().goodsList
        this.goodsGroupList = this.$orderlib.getLocalOrder().goodsGroupList
        // console.log('activated goodsGroupList:', JSON.stringify(this.goodsGroupList))
      },

      /**
       * 编辑金额
       * @return {[type]} [description]
       */
      onEditMoney() {
        // console.log('编辑金额', this.total)
        if (this.total <= 0) {
          return this.$toast('请添加商品')
        }
        this.popupMoney = !this.popupMoney
      },
      /**
       * 返回聊天室&返回按钮
       * @return {[type]} [description]
       */
      onBack() {
        this.$jsbridgelib.bridgeNativeBack();
      },

      /**
       * 总金额
       * 9/19 注释，使用computed属性计算
       */
      /*getTotal() {
        let total = 0
        let goodsList = this.generateGoodsList()
        if (goodsList) {
          goodsList.map(goods => {
            // console.log('goods ======', goods)
            total += goods.count * goods.price
          })
        }
        this.total = total.toFixed(2)
        if (this.total == 0) {
          this.discount = 0
        }
        console.log('getTotal：', total)
      },*/

      // 9/19 改为computed计算
      /*getPay() {
        console.log('获取应付金额  总金额：', this.total, ', 优惠金额：', this.discount)
        this.pay = (Number(this.total) - Number(this.discount)).toFixed(2)
        console.log('getPay:', this.pay)
      },*/

      /**
       * 添加商品
       */
      onAddGoods() {
        this.$router.push({name: '9.3.1'})
      },

      /**
       * 历史咨询商品
       */
      onConsultGoods() {
        this.$router.push({name: '8.1.1', params: {customerId: this.customerId}})
      },
      /**
       * 选中 item
       * */
      buteList(item, key) {
//        this.$_.each(item, (value, key) => {
//          console.log(key, value);
//          this.itemBute[key] = value
//        })
        this.itemBute.key = key
        this.itemBute.goodsId = item.goodsId
        this.itemBute.goodsName = item.goodsName
        this.itemBute.goodsImg = item.goodsImg
        this.itemBute.price = item.price
        this.itemBute.color = item.color
        this.itemBute.size = item.size
        this.itemBute.count = item.count
        this.itemBute.weight = item.weight
        this.itemBute.tagPrice = item.tagPrice
        this.itemBute.stockState = item.stockState
        this.itemBute.goodsState = item.goodsState
        this.itemBute.freightNo = item.freightNo
        this.itemBute.tempId = item.tempId
        this.itemBute.propertyList = item.propertyList
        this.popupBute = !this.popupBute
      },

      /**
       * 商品数量
       * @return {[type]} [description]
       */
      integer() {
        let initVal = this.$refs.init.value
        this.itemBute.count = initVal.replace(/[^\d]/g, '')
      },

      /**
       * 数量 +
       */
      add() {
        // console.log('before add amount', this.itemBute.count);
        this.itemBute.count ++

        // console.log('after add amount', this.itemBute.count);
      },

      /**
       * 数量 —
       */
      reduce() {
        if (this.itemBute.count > 1) {
          this.itemBute.count --
        } else {
          // this.isDel = true
          this.$modal({
            content: '确认删除该商品吗？',
            buttons: [{
              text: '取消',
              onClick: () => {}
            }, {
              text: '删除',
              onClick: () => {
                this.popupBute = !this.popupBute
                this.$orderlib.deleteLocalOrderGoodsNew(this.itemBute.tempId)
                // 5013
                this.queryPromotionGoods()
              }
            }]
          })
        }
      },

      cancelBute() {
        this.popupBute = false;
      },

      /**
       * 重置改价优惠
       * 删除商品，改变促销活动时
       */
      resetMerchantAmt() {
        this.merchantAmt = 0
      },

      /**
       * 更改后金额
       * @return {[type]} [description]
       */
      keyupMoney() {
        let initVal = this.$refs.money.value
        console.log('keyupMoney:', initVal)
        this.$refs.money.value = initVal.replace(/^(\-)*(\d+)\.(\d\d).*$/, '$1$2.$3')
      },

      /**
       * 选择一个子sku
       */
      checkProperty(property, subsubProperty) {
        property.subsubList.map(prop => {
          prop.select = 0
        })
        subsubProperty.select = 1
      },

      /**
       * 已选skuName
       */
      propertyFilter (item) {
        let name = ''
        if (!item.propertyList) return name
        item.propertyList.map(property => {
          property.subsubList.map(subsubProperty => {
            if (subsubProperty.select == 1) {
              name = name + '/' + subsubProperty.skuName
            }
          })
        })
        return name
      },

      /**
       * 属性选择框-确认选择
       */
      subBute(item) {
        let tempId = item.tempId;
        // console.log('属性选择框-确认选择:', JSON.stringify(item))
        for (let i = 0, len = this.goodsGroupList.length; i < len; i++) {
          for (let j = 0, len = this.goodsGroupList[i].goodsList.length; j < len; j++) {
            let goods = this.goodsGroupList[i].goodsList[j];
            if (goods.tempId != tempId) continue
            let flag = false
            item.propertyList.map(property => {
              flag = false
              this.isPass = true
              property.subsubList.map(subsub => {
                if (subsub.select == 1) {
                  flag = true
                }
              })
            })
            if (!flag) {
              this.isPass = false
              return this.$modal({
                content: '请完善商品属性',
                buttons: [{
                  text: '确定',
                  onClick: () => {}
                }]
              })
              // return this.$toast('请完善商品属性')
            }

            goods.propertyList = item.propertyList;
            goods.count = item.count;
            this.popupBute = false;
            // console.log('修改的商品名称为：', goods.goodsName)
          }
        }
        // console.log('subBute1 goodsGroupList:', JSON.stringify(this.goodsGroupList))
        // 更新goodsGroupList
        this.$orderlib.updateGoodsGroupListLocalOrder(this.goodsGroupList)
        // 计算总金额
        // this.getTotal()
        // 5013
        this.queryPromotionGoods()
      },

      // 校验goodsGroupList中商品属性是否选择完整
      validationProperty() {
        let flag = true
        console.log('校验goodsGroupList中商品属性是否选择完整：', this.goodsGroupList)
        let order = this.$orderlib.generateLocalOrderInfo();
        console.log('order:', JSON.stringify(order))
        if (!order.goodsList) {
          flag = false
          return flag
        }
        for (var i = order.goodsList.length - 1; i >= 0; i--) {
          let goods = order.goodsList[i];
          // console.log('length', goods.dynamicAttributes.length)
          console.log('goods ：', JSON.stringify(goods));
          //TODO: 比较goods的选中的dynamicAttributes的数量和属相的数量
          // console.log('goodsList ：', JSON.stringify(this.goodsList));
          if (goods.dynamicAttributes.length == 0) {
            flag = false
            // this.$toast('请完善' + goods.goodsName + '商品属性')
            return flag
          }
        }
        return flag
      },

      // 通过goodsGroupList计算goodsList
      generateGoodsList() {
        let goodsList = [];
        for (let i = 0, len = this.goodsGroupList.length; i < len; i++) {
          // console.log('99999999999999', this.goodsGroupList[i].goodsList)
          goodsList = goodsList.concat(this.goodsGroupList[i].goodsList)
        }
        // console.log('通过goodsGroupList计算goodsList:', JSON.stringify(goodsList))
        return goodsList;
      },

      /**
       * 校验订单包
       * @return {[type]} [description]
       */
      validationOrder() {
        let booleanVal = true
        console.log('校验订单包')
        let order = this.$orderlib.generateLocalOrderInfo();
        // console.log('==================validationOrder:', JSON.stringify(order))
        if (!order.goodsList) {
          booleanVal = false
          this.$toast('请添加商品')
          return booleanVal
        }

        for (var i = order.goodsList.length - 1; i >= 0; i--) {
          let goods = order.goodsList[i];
          // console.log('length', goods.dynamicAttributes.length)
          console.log('goods ：', JSON.stringify(goods));
          //TODO: 比较goods的选中的dynamicAttributes的数量和属相的数量
          // console.log('goodsList ：', JSON.stringify(this.goodsList));
          if (goods.dynamicAttributes.length == 0) {
            booleanVal = false
            this.$toast('请完善商品属性')
            return booleanVal
          }
        }

        if (!this.isPass) {
          booleanVal = false
          console.log('没有选完整=========================')
          this.$toast('请完善商品属性')
          return booleanVal
        }
        // console.log(booleanVal)
        return booleanVal
      },

      /**
       * 5013-根据上传的商品列表，返回带促销信息的商品列表
       */
      queryPromotionGoods() {
        let flag = this.validationProperty();
        console.log('属性是否选择完整:', flag)
        if (!flag) { return }
        console.log('goodsList属性已经完善，调5013接口查询促销信息')
        let paramGoodsList = [];
        let goodsList = this.generateGoodsList()
        // console.log('', goodsList)
        for (let i = 0, len = goodsList.length; i < len; i++) {
          let result = this.$orderlib.generatePromotionGoods(goodsList[i])
          // console.log('result:', result)
          paramGoodsList.push(result)
        }
        // console.log('循环结束')
        let param = {goodsList: paramGoodsList, promotionActivityId: this.promotionId};
        this.$promotionlib.queryPromotionGoods(param, (err, obj) => {
          if (err) { this.$toast(err) }
          if (obj) {
            console.log('5013 queryPromotionGoods obj:\n', JSON.stringify(obj))
            this.goodsGroupList = obj.goodsGroupList
            // console.log('商品优惠金额：', obj.goddsDiscountAmount, '商品总金额:', obj.goodsTotalAmount)
            // console.log('5013 接口返回的goodsGroupList，更新到orderlib：', this.goodsGroupList)
            this.$orderlib.updateGoodsGroupListLocalOrder(this.goodsGroupList)
            this.discount = this.tempDiscount = Number(obj.goddsDiscountAmount).toFixed(2);
            this.tempPrice = (obj.goodsTotalAmount - obj.goddsDiscountAmount).toFixed(2);
          }
        })
      },

      /**
       * 生成链接
       */
      onSubmit() {
        // 订单包校验
        if (!this.validationOrder()) { return }
        // 获取订单包
        let order = this.$orderlib.generateLocalOrderInfo();
        console.log('生成订单:\n', JSON.stringify(order))
        // this.btnVisible = true // 按钮置灰
        // 2017 生成订单 发送给云店生成临时订单
        order.orderAmount = this.total // 订单总额（仅用于UI展示）
        // order.payAmount = this.pay // 订单应付金额（仅用于UI展示）
        order.merchantAmt = this.merchantAmt // 商户优惠金额 9/19添加
        let param = {
          order: order,
          memberId: this.customerId, // 咨询用户ID
          operatoroId: this.$merchantlib.getMemberId, // 操作人Id
          activityGoodsIdList: this.activityGoodsIdList, // 参加活动商品IdList
          activityId: this.activityId // 促销活动Id
        }
        // console.log('给订单中台param：', JSON.stringify(param))
        this.$orderlib.temporarilyActing(param, (err, obj) => {
          if (err) { this.$toast(err) }
          if (obj) {
            console.log('2017 生成订单 obj:\n', obj)
            // 发送给聊天界面 ConfirmOrderMessage
            let IMPackage = this.$orderlib.generateConfirmOrderMessage(obj.orderNo)
            IMPackage.payAmount = this.pay // 订单应付金额（仅用于UI展示）
            console.log('给IM Package', JSON.stringify(IMPackage))
            this.$jsbridgelib.bridgeIMSendOrder(IMPackage, err => {
              console.log('err ', err);
              if (err) {
                return this.$toast(err);
              }
              // 清空本地订单包
              this.$orderlib.clearLocalOrder()
            })
            this.$jsbridgelib.bridgeNativeBack();
          }
        })
      },

      /**
       * 弹出修改金额
       */
      cancel() {
        this.popupMoney = false;
      },

      /**
       * 获取修改后的总金额
       */
      getAfterPrice() {
        console.log('修改的金额：', this.alterPrice, '原始金额tempPrice：', this.tempPrice)
        if (parseFloat(this.alterPrice) > parseFloat(this.tempPrice)) {
          return this.$toast('更改后的金额不能大于原始金额')
        }
        // console.log('更改后的金额 合法')
        this.merchantAmt = (this.total - this.discount - this.alterPrice).toFixed(2)
        this.popupMoney = false;
        // this.$orderlib.updateLocalOrderDiscountAmount(this.discount)
        console.log('改价优惠金额：', this.merchantAmt)
      },

      // 获取折扣率 确定按钮
      getDiscount(values) {
        // console.log('values ', values);
        this.popupVisible = false
        if (!values[0]) {
          values[0] = this.slots[0].values[0];
        }
        let discountNum = values[0] + '.' + values[1];
        console.log('折扣率：', discountNum)
        // console.log('计算前  商品总额：', this.total, '促销优惠：', this.discount, '改价优惠：', this.merchantAmt, '合计金额：', this.pay)
        console.log((this.total - this.discount) + '/////////////' + ((this.total - this.discount) * (discountNum / 10)).toFixed(2))
        this.merchantAmt = ((this.total - this.discount) - ((this.total - this.discount) * (discountNum / 10)).toFixed(2)).toFixed(2)
        this.popupMoney = false;
        // console.log('计算后  商品总额：', this.total, '促销优惠：', this.discount, '改价优惠：', this.merchantAmt, '合计金额：', this.pay)
        // this.$orderlib.updateLocalOrderDiscountAmount(this.discount)
        // console.log('优惠金额', this.discount)
      },

      /**
       * 遮罩控制
       */
      popupVisibleBG() {
        if (this.popupAD === true) { this.popupAD = false }
        if (this.popupDM === true) { this.popupDM = false }
        if (this.popupMoney === true) { this.popupMoney = false }
        // if (this.popupBute === true) { this.popupBute = false }
        if (this.onEditVisible === true) { this.onEditVisible = false }
        if (this.popupVisible === true) { this.popupVisible = false }
      },

      /**
       * 大类码
       */
      codeInit() {
        if (this.$refs.dcode.value.length > 0) {
          this.dCode = true
        }
        this.$toast('输入错误')
      },

      /**
       * 清空大类码
       */
      clearInit() {
        this.dCode = false
        this.$refs.dcode.value = ''
      },

      /**
       * 校验大类码
       */
      subCode() {
        this.popupDM = false
        this.dCodeVal = this.$refs.dcode.value
        this.$refs.dCodeVal.value = this.dCodeVal
        // to do
      }
    },

    computed: {
      stockName: function () {
        if (this.deliveryType === '0') {
          return '物流配送';
        } else if (this.deliveryType === '1') {
          return '门店自提';
        } else {
          return '请选择配送方式';
        }
      },

      activityGoodsIdList() {
        let list = [];
        this.goodsGroupList.map(goodsGroup => {
          if (goodsGroup.title != '' && goodsGroup.title != null) {
            this.activityId = goodsGroup.activityId
            goodsGroup.goodsList.map(goods => {
              list.push(goods.goodsId)
            })
          }
        })
        return list.join();
      },

      // 计算商品总额
      total() {
        let total = 0
        let goodsList = this.generateGoodsList()
        if (goodsList) {
          goodsList.map(goods => {
            // console.log('goods ======', goods)
            total += goods.count * goods.price
          })
        }
        console.log('computed getTotal：', total)
        return total.toFixed(2)
      },

      // 计算应付金额
      pay() {
        // 商品总额-促销活动优惠-商户优惠
        let pay = (Number(this.total) - Number(this.discount) - Number(this.merchantAmt)).toFixed(2)
        console.log('computed getPay:', pay)
        return pay
      },
    },

    watch: {
      discount: function(val, oldVal) {
        // console.log('促销优惠金额改变了 val:', val, 'oldVal:', oldVal)
        this.$orderlib.updateLocalOrderDiscountAmount(val)
      },

      merchantAmt: function(val, oldVal) {
        // console.log('商户优惠金额改变了 val:', val, 'oldVal:', oldVal)
      },

      /**
       * 9/19 注释以下代码，使用computed属性计算
       */
      /*total: function(val, oldVal) {
        // this.getPay()
      },*/
      goodsGroupList: {
        handler: function (val, oldVal) {
          // alert('a thing changed')
          this.resetMerchantAmt()
        },
        deep: true
      },

      promotionId: function(val, oldVal) {
        console.log('promotionId 变了 oldVal:', oldVal, 'val:', val)
        if (val != undefined) {
          this.resetMerchantAmt()
          this.queryPromotionGoods()
        }
      }
    },
}
</script>
