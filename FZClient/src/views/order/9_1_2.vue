<!--订单详情-->
<style lang="scss" src="src/sass/orderStatus.scss" scoped></style>

<template>
  <div class="content">

    <bl-bar barStyle="bar-dark-linear">
      <div class="button" slot="left-button" @click="onBack">
        <div class="iconfont arrow-back"></div>
        <i class="fback" >返回</i>
      </div>
      <div slot="title">订单详情</div>
      <!-- 06已完成订单不展示关闭订单按钮 07交易关闭展示删除订单按钮-->
      <!-- 只有待开单 才能关闭订单 -->
      <div v-if="$accesslib.canShow('cloudom:order:close') && item.orderState == '02'" slot="right-button" class="hrad-right" @click="closeVisble = !closeVisble">关闭订单</div>
    </bl-bar>

    <div class="order-details">

      <!-- 订单状态 -->
      <div class="order-status">
        <dl><i></i>
          <dt v-if="item.orderState == 01 ">待支付  <span class="rtime">{{ titleString }}</span></dt>
          <dt v-else-if="item.orderState == 02 ">待开单  <span class="rtime">{{ titleString }}</span></dt>
          <dt v-else-if="item.orderState == 03 ">待发货</dt>
          <dt v-else-if="item.orderState == 04 ">待收货</dt>
          <dt v-else-if="item.orderState == 05 ">待自提</dt>
          <dt v-else-if="item.orderState == 06 ">交易完成</dt>
          <dt v-else-if="item.orderState == 07 ">交易关闭</dt><!-- 交易关闭 == 07 -->
          <dd>订单编号：{{ item.orderNo }}</dd>
          <dd v-show="saleOrder(item.orderState)">销售单号：{{ item.salesNumber }}</dd>
          <dd>订单号条码：<img style="height:60px;width:270px" id="barcode"/></dd>
          <dd>百联通账号：{{ item.memberPhone }}</dd>

        </dl>
        <button v-if="item.orderState != null " v-show="saleOrder(item.orderState)" @click="isTicket = !isTicket">查看小票</button>
      </div>
      <!--提前加载小票-->
      <img style="z-index: -1; position: absolute; height: 1px;width: 1px;top: 1px;left: 1px;" :src="item.receiptUrl">

      <!-- 物流信息展示 -->
      <div class="order-post" v-if="item.distributionMode == 0 && (item.orderState == 04 || item.orderState == 06)" @click="queryLogistics(item.orderNo)">
        <dl><i></i>
          <dt v-if="item.orderState == 04">配送中</dt>
          <dt v-if="item.orderState == 06">已签收</dt>
          <dd>{{item.logisticsInfo.content}}</dd>
          <dd class="time">{{item.logisticsInfo.time}}</dd>
          <em class="iconfont arrow-back"></em>
        </dl>
      </div>
      <!--  门店自提 -->
      <div class="order-shop" v-if="item.distributionMode == 1 ">
        <dl>
            <i></i>
            <dd>自提门店：{{ shopName }}</dd>
            <dd>门店地址：{{ item.consigneeAddress }}</dd>
        </dl>
      </div>

      <!-- 物流展示 distributionMode == 0 -->
      <div class="order-consignee" v-if="item.distributionMode == 0 ">
        <dl><i></i>
          <dt>收货人：{{ item.consigneeName }} &nbsp;&nbsp; {{ item.consigneePhone  | plusXing-util}}</dt>
          <!-- <dd>收货地址：{{ item.consigneeAddress }}</dd> -->
        </dl>
      </div>

      <!-- 订单流水 -->
      <div class="order-express">
        <div class="express" v-for="orderFlow in orderFlowList">
          <blProgress :gressData="orderFlow" class="express-line"></blProgress>
          <dl>
            <dt v-if="orderFlow.niceName != null">{{ orderFlow.niceName }}<span class="date">{{ orderFlow.operatingTime }}</span></dt>
            <!--判断订单状态：'订单状态（01-待支付 02-待接单 03-待发货 04-待收货 05-待自提 06-交易完成 07-交易关闭08 撤销 09 退款 10申请中 11待退回 12中止受理 13退货中 14退款中 15已退款）'-->
            <dd class="exp">{{ orderFlow.mercStateDesc }}</dd>

            <!--买家备注-->
            <dd v-if="orderFlow.buyerRemark">买家备注: &nbsp; {{ orderFlow.buyerRemark }}</dd>
            <!--卖家备注 店员备注-->
            <dd class="rem" v-if="orderFlow.sellerRemark">店员备注: &nbsp; {{ orderFlow.sellerRemark }}</dd>
          </dl>
        </div>
      </div>

      <!-- 商品信息 -->
      <div class="order-product" v-for="(goods, index) in goodsList">
        <div class="discount" v-if="goods.title == unActivityTitle"><em style="color: #666" >{{ goods.title }}</em></div>
        <div class="discount" v-else-if="!(goods.title == '' || goods.title == null)"><i>优惠</i>以下商品 <em>{{ goods.title }}</em></div>
        <div class="probox" v-for="(goods1, index1) in goods.goodsList">
          <span class="picture"><img :src="goods1.imgUrl"></span>
          <dl>
            <dt>{{ goods1.goodsName }}</dt>
            <dd>货号：{{ goods1.freightNo }}</dd>
            <dd>
              <span class="pl">{{ getSkuName(goods1.skuName)}}&nbsp;&nbsp; x{{ goods1.goodsNum }}</span>
              <span :class="{'pr':item.orderState == 06 && item.isAftersale == 1,'pr2':item.orderState != 06 && item.isAftersale != 1}">&nbsp;&nbsp;&yen;{{ goods1.goodsPrice }}</span>
              <button class="bn" v-if="item.orderState == 06 && item.isAftersale == 1" @click="aftersales(goods1.goodsId,item.orderNo,goods1.skuId)">申请售后</button>
            </dd>
          </dl>
          <div v-if="index1 < goods.goodsList.length -1" class="lineDiv"></div>
        </div>
       <div v-if="index < goodsList.length - 1" class="margin-c"></div>
      </div>
      <!-- 订单状态id（0：全部 01：待支付 02：待接单 03：待发货 04：待收货 05：待自提 06：交易完成 07：交易关闭 09：退款 -->
      <!-- 商品金额 -->
      <ul class="order-pay">
        <li>
          <span>商品总额</span>
          <i>&yen;{{ item.orderAmt }}</i>
        </li>
        <li v-if="item.favorableMoney > 0">
          <span>商户促销优惠</span>
          <i>-&yen;{{ item.favorableMoney }}</i>
        </li>
        <li v-if="item.merchantAmount > 0">
          <span>商户改价优惠</span>
          <i>-&yen;{{ item.merchantAmount }}</i>
        </li>
        <li v-if="item.merchantDiscountAmount > 0">
          <span>商户券优惠</span>
          <i>-&yen;{{ item.merchantDiscountAmount }}</i>
        </li>
        <li style="color:#ff0000">
          <span>开单金额</span>
          <i>&yen;{{ item.singleAmount }}</i>
        </li>
        <li v-if="item.platformDiscountAmount > 0">
          <span>平台券优惠</span>
          <i>-&yen;{{ item.platformDiscountAmount }}</i>
        </li>
        <li style="color:#ff0000">
          <span>商品实付金额</span>
          <i>&yen;{{ item.billingAmount }}</i>
        </li>
        <li>
          <span>运费</span>
          <!-- 当接口返回字符串null时 显示0-->
          <i>&yen;{{ (item.carriageMoney === 'null' ? 0 : item.carriageMoney) }}</i>
        </li>
        <li class="pay">
          <span v-if="item.orderState == 01 || item.orderState == 07">应付金额</span>
          <span v-else>实付金额</span>
          <i>&yen;{{ item.shouldMoney }}</i>
        </li>
      </ul>
      <ul class="order-pay" style="margin-bottom: 1rem;">
        <li>
        <!-- 0-不开发票 1-普通发票 2-增值税发票 -->
          <span>发票类型：</span>
          <i class="left-i">{{ getInvoiceType }}</i>
        </li>
        <li v-if="item.invoiceType == 1">
        <!-- 0-个人 1-公司 -->
          <span>发票抬头：</span>
          <i v-if="item.invoiceTitleType == 0" class="left-i">个人</i>
          <i v-if="item.invoiceTitleType == 1" class="left-i">{{ item.invoiceTitleContent }}</i>
        </li>
        <li v-if="item.invoiceTitleType == 1">
          <span>纳税人识别号：</span>
          <i class="left-i">{{ item.invoiceTaxId }}</i>
        </li>
        <li v-if="item.invoiceType == 1">
          <span>发票内容：</span>
          <i class="left-i">明细</i>
        </li>
      </ul>

    </div>
    <!--<div style="height:1px;"></div>-->

    <!-- 底部按钮 -->
    <div class="editgress" >
      <button @click="goDeliverGoods(item.orderNo)" v-if="item.orderState == 02 " class="red">去开单</button> <!-- 待开单-自提 -->
      <button @click="goBillingOrder(item.orderNo)" v-if="item.orderState == 03 && item.afterSalesOrderId == null" class="red">去发货</button><!-- 待发货 -->
      <button @click="queryLogistics(item.orderNo)" v-if="item.orderState == 04 ">物流追踪</button><!-- 已发货 -->
      <button @click="updateOrderCode()" v-if="item.orderState == 05 && item.afterSalesOrderId == null">核销提货码</button><!-- 待提货 -->
      <button @click="callCustomer()" v-show="item.orderState != null">联系客户</button>
      <button @click="isNotes = !isNotes" v-show="item.orderState != null">添加备注</button>
      <button @click="disposeOrder(item.afterSalesOrderId)" v-show="item.afterSalesOrderId != null && (item.orderState == '03' || item.orderState == '05')">处理订单</button>
    </div>



    <!-- 关闭订单 -->
    <bl-popup v-model="closeVisble" position="bottom" style="width: 100%;">
      <bl-picker :slots="slots" @change="" show-toolbar :visible-item-count="3" @cancel="cancel" @getValues="getValues">
      </bl-picker>
    </bl-popup>

    <!-- 添加备注 -->
<!--     <bl-modal :buttons="buttons" v-if="isNotes">
      <div slot="inner">
          <h2>添加备注</h2>
          <textarea type="text" name="notes" maxlength="100" class="notes" placeholder="请输入您的备注(100字以内)" v-model.trim="remark"></textarea>
      </div>
    </bl-modal> -->
    <bl-cust-picker :buttons="buttons" v-if="isNotes">
      <div slot="inner">
          <h2>添加备注</h2>
          <textarea type="text" name="notes" maxlength="100" placeholder="请输入您的备注(100字以内)" class="notes" v-model.trim="remark"></textarea>
      </div>
    </bl-cust-picker>

    <!-- 删除订单 -->
<!--     <bl-modal :buttons="Delete" v-if="deleteOrder">
      <div slot="inner">
          <h2>确认删除订单？</h2>
      </div>
    </bl-modal> -->

    <!-- 查看小票 -->
    <bl-modal :buttons="Tickets" v-if="isTicket" effect="tickets1">
      <div slot="inner">
          <img :src="item.receiptUrl">
      </div>
    </bl-modal>

    <!-- 遮罩 -->
    <div v-if="closeVisble" @click="closeVisble = !closeVisble"><div class="modal-bg"></div></div>
    <!-- 退款pop -->
<!--     <bl-modal :buttons="button" v-if="isOK">
      <div slot="inner">
          <h4>确定要退款吗？</h4></br>
          <p>退款金额：¥ {{item.shouldMoney}}</br>
          请确认该订单的商品尚未发货或尚</br>未自提，
          一旦退款订单将关闭，且</br>操作不可撤回。
          </p>
      </div>
    </bl-modal> -->
  </div>

</template>

<script>
  import uiMixin from 'src/mixins/uiMixin';
  import orderlib from 'src/libs/orderlib';
//  import jsbridge from 'src/mixins/jsbridge';
  import blProgress from 'components/cloud-merchant/status-progress';
  import BlCustPicker from 'components/cloud-merchant/merchant-modal';

  export default {
    name: 'orderDetails',
    mixins: [uiMixin],
    components: {
      blProgress, BlCustPicker,
    },
    data () {
      return {
        isOK: false,
        shopName: null,
        orderNo: null,
        closeVisble: false,
        title: '',
        cancelText: '取消',
        unActivityTitle: '以下商品未参加任何活动',
        confirmText: '确定',
        isNotes: false,
        deleteOrder: false,
        isTicket: false,
        // 倒计时: 时 分 秒
        // blHour: '00', //时
        // blMinutes: '00', //分
        // blSeconds: '00', //秒
        titleString: '',
        // 订单总数据object
        item: {},
        // 订单商品list
        goodsList: [],
        // 订单流水list
        orderFlowList: [],
        // 模拟时间戳数据
        endTime: new Date("2017/6/10 12:00:00").getTime(),
        //关闭订单
        slots: [{
          flex: 1,
          values: ['没货了', '用户确定不要', '商品问题暂时不销售', '恶意下单', '用户操作错误'],
          className: 'closeorder',
          textAlign: 'center'
        }],
        // 添加备注
        remark: '',
        buttons: [{
          text: '取消',
          onClick: () => {
            this.remark = '';
            this.isNotes = false
          }
        }, {
          text: '确认',
          onClick: () => {
            this.insertOrderInfo(this.remark);
          }
        }],
        // 查看小票
        Tickets: [{
          text: '取消',
          onClick: () => {
            this.isTicket = false
          }
        }],
      }
    },
    // 初始化数据.
    mounted() {
      // 调用查询订单详情. YDDUA7O20170510193929807003
      console.log('订单详情 params', this.$route.params);
      this.orderNo = this.$route.params.orderNo;
      this.shopName = this.$merchantlib.getStoreName()
      console.log('门店名称：', this.shopName)
      this.orderDetails(this.orderNo);
      // console.log(' 进入订单详情页面 9.1.2 ');
      console.log(' 订单Id:', this.orderNo);
      console.log(' 订单this.item.outTime:', this.item);

      // 条形码
      var JsBarcode = require('jsbarcode');
      var str = this.orderNo
      var options = {format: "CODE128", displayValue: false, height: 30, margin: 3};
      JsBarcode("#barcode", str, options)
    },
    methods: {
      // 刷新订单详情页，更新订单状态
      updateState(orderNo) {
        console.log('orderNo', orderNo)
        let self = this;
        setTimeout(function() { self.orderDetails(orderNo) }, 2000);
      },
      getSrc() {
        var barcode = document.getElementById('barcode')
        var str = "12345678"
        var options = {
          format: "CODE128",
          displayValue: true,
          fontSize: 18,
          height: 100
        }
        return this.JsBarcode(barcode, str, options);
      },

      // 跳转申请售后填写售后申请单页面
      aftersales(goodsId, orderNo, skuIdStr) {
        console.log('t跳转申请售后')
        let skuId = []
        skuId = skuIdStr.split(',')
        // 4011-查询单件售后单是否能申请售后 入参：商品ID 订单号 skuid(and 操作人，商户id)
        this.$aftersaleslib.afterSaleCanOrNot(goodsId, orderNo, skuId, (err, obj) => {
          if (err) {
            return this.$toast(err)
          }
          //isflag: 0不能售后，1可以售后
          console.log('err:', err, 'obj:', obj)
          if (obj.isflag == 0) {
            this.$toast('该商品已申请售后')
          } else if (obj.isflag == 1) {
            console.log('goodsId:', goodsId, 'orderNo:', orderNo, 'skuId:', skuId)
            // 跳转到申请售后页面 传参：订单id，skuId
            this.$router.push({name: '10.1.1', query: {goodsId, orderNo, skuId}})
          }
        })
      },

      // 处理订单
      disposeOrder(afterSalesOrderId) {
        // 跳转售后订单详情页10.2.1
        this.$router.push({name: '10.2.1', params: {id: afterSalesOrderId}});
      },
      onBack() {
        if (this.$route.query.from == 'device') {
          this.$jsbridgelib.bridgeNativeBack();
        } else {
          this.$router.go(-1);
        }
      },
      // 查询订单详情接口.
      orderDetails(orderNo) {
        let self = this;
        this.startLoading();
        orderlib.queryOrder(orderNo, (err, obj) => {
          setTimeout(function() {
            self.stopLoading();
          }, 300);
          if (err) {
            setTimeout(function() {
              self.$toast(err);
            }, 600);
          }
          if (obj != null) {
            // 订单object
            console.log('订单 ', obj);
            this.item = obj;
            if (!this.item.discountAmount || this.item.discountAmount == 'null') {
              this.item.discountAmount = 0;
            }
            //obj.goodsGroupList.push({goodsList: [], title: ''});
            // console.log('订单详情 obj：', JSON.stringify(this.item))
            this.goodsList = obj.goodsGroupList
            var goodIds = '';
            this.goodsList.forEach((item) => {
              item.goodsList.forEach((item1) => {
                goodIds += item1.goodsId + ','
              });
              goodIds += ' '
            });
            // console.log('订单 goodIds：', goodIds)

            // 订单流水list
            let flowList = obj.orderFlowList;
            // flowList[0].isCurrent = true;
            this.orderFlowList = flowList;
            console.log(' 目前订单状态 : ', this.item.orderState, ' [01: 待支付 02: 待开单]');
            //调用倒计时:只有待支付,待开单有倒计时
            if (this.item.outTime) {
              console.log('==============')
              setInterval(() => {
                this.titleString = this.$orderlib.getCountDownStatus(this.item.outTime, 2)
              })
            }
          }
        });
      },
      // 待开单状态,待支付状态下:不展示销售单号 以及 查看小票.
      saleOrder(status) {
        //console.log(' 订单状态码为:', status);
        if (status == '01' || status == '02' || status == '07') {
          return false;
        } else {
          return true;
        }
      },
      // 关闭订单 -- 2004-更改订单状态.
      getValues(value) {
        let self = this;
        let orderNo = this.item.orderNo;
        console.log(' 关闭订单原因 :', value[0])
        console.log(' 关闭订单ID :', orderNo)
        let orderState = '07'; // 07 关闭订单 04 发货
        let reason = value[0];

        orderlib.updateOrderState(orderNo, orderState, reason, (err, obj) => {
          if (err) {
            setTimeout(function() {
              return self.$toast(err);
            }, 600);
          } else {
            if (reason == '没货了') {
              this.goodsList.forEach((item) => {
                item.goodsList.forEach((item1) => {
                  //  0表示有货，1表示无货
                  if (item1.isMaxmara == 0) {
                    setTimeout(() => {
                      // 选择商品置为无货页面
                      self.$router.push({name: '9.1.3.2', params: {orderNo: orderNo}});
                    }, 2000)
                  }
                });
              });
            }
            self.closeVisble = false;
            self.$toast('操作成功')
            self.orderDetails(orderNo);
          }
        });
      },
      cancel() {
        this.closeVisble = false;
      },
      // 添加备注.
      insertOrderInfo(remark) {
        let self = this;
        let orderNo = this.item.orderNo;
        console.log("orderNo :", orderNo);
        console.log("notes :", this.remark);
        // 判断备注是否为空
        if (remark == null || remark == '') {
          return this.$toast("请填写需要备注的内容");
        }
        this.startLoading();
        this.isNotes = false;
        orderlib.updateOrderInfo(orderNo, remark, (err, obj) => {
          self.stopLoading();
          // setTimeout(function() {
          //   self.stopLoading();
          // }, 300);
          if (err) {
            setTimeout(function() {
              return self.$toast(err);
            }, 600);
          } else {
            self.remark = '';
            self.$toast("添加备注成功");
            setTimeout(function time() {
              self.orderDetails(orderNo);
            }, 1000);
          }
        });
      },

      // SkuName名称截取.
      getSkuName(skuName) {
        if (skuName != null) {
          let skuNameIndex = skuName.indexOf(",");
          if (skuNameIndex > 0) {
            let sname = skuName.split(',');
            return sname[0] + ' ' + sname[1];
          } else {
            return skuName;
          }
        }
      },
      // 联系客户
      callCustomer() {
        console.log('call customer ', this.item);
        if (this.$route.query.from == 'device') { // 如果是device打开的，直接back回聊天室
          this.$jsbridgelib.bridgeNativeBack();
        } else {
          let order = this.$orderlib.generateOrderFromDetailsForIMRemote(this.item);
          // 发送
          this.$jsbridgelib.bridgeIMSendRemoteOrder(order, err => {
            if (err) {
              console.log('bridgeIMSendRemoteOrder err', err);
              return this.$toast(err);
            }
          })
        }
      },
      // 改价格 [暂时保留]
      // updateOrderPrice() {
      //   return this.$toast('开发中...');
      // },
      // 去开单
      goDeliverGoods(orderNo) {
        // this.$toast('请将订单积分请记入百联通账号：' + this.item.memberPhone) // TODO
        this.$router.push({name: '9.1.3.1', params: {orderNo}})
      },
      // 去发货 [暂时调接口 改变订单的状态]
      goBillingOrder(orderNo) {
        this.$router.push({name: '9.1.4', params: {orderNo}});
      },
      // 物流追踪
      queryLogistics(orderNo) {
        this.$router.push({name: '9.1.6', params: {orderNo}});
      },
      // 核销提货码
      updateOrderCode() {
        this.$router.push({name: '3.5.2'});
      },

      // 展示订单流水订单状态对应的订单跟踪信息:  0-物流 1-自提
      showFinish(mode, state) {
        if (mode === '0' && state === '06') {
          console.log("true");
          return true;
        } else {
          return false;
        }
      },
      showVerification(mode, state) {
        if (mode === '1' && state === '06') {
          console.log("true");
          return true;
        } else {
          return false;
        }
      }
    },
    // 监听.
    watch: {

    },
    // 实时计算.
    computed: {
      getInvoiceType: function() {
          // 0-不开发票 1-纸质发票 2-增值税发票
        if (this.item.invoiceType == '0') {
          return '不开发票'
        } else if (this.item.invoiceType == '1') {
          return '纸质发票'
        } else if (this.item.invoiceType == '2') {
          return '增值税发票'
        }
      }
    },
  }
</script>
