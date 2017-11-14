<!-- 订单列表 -->
<!--<style lang="scss" src="src/sass/allorders.scss" scoped></style>-->
<style lang="scss" src="src/sass/scrollList.scss" scoped></style>
<template>
  <div class="content">

    <bl-bar barStyle="bar-dark-linear">
        <div class="button" slot="left-button" @click="$router.go(-1)">
          <div class="iconfont arrow-back"></div>
          <i class="fback">返回</i>
        </div>
        <div slot="title">全部订单</div>
    </bl-bar>

    <div class="scrollList">
        <div class="top">
            <!-- header-menu -->
            <div class="header-menu">
              <section>
                <bl-navbar v-model="selected">
                  <bl-tab-item v-for="item in tabItemData" :id="item.index">{{item.text}}</bl-tab-item>
                </bl-navbar>
              </section>
            </div>
        </div>
        <!-- tab-content -->
      <bl-scroll :enableRefresh="true" :onRefresh="onRefresh" :on-infinite="onInfinite" :enableInfinite="isLoading" v-scroll-record>
        <bl-tab-container v-model="selected">
          <!-- 动态载入一栏页面 -->
          <bl-tab-container-item :id="this.orderState">
              <!-- part -->
                <bl-orderbox class="boxstyle" v-for="item in displayedItems" :item="item" @pushDetails="onPushDetails">
                  <div slot="button" class="editbtn" v-show="showbn(item.orderState)">
                    <button
                      @click="onbutton(item.orderState,item.orderNo,item.afterSalesOrderId)"
                      v-if="item.orderState != 01 && (item.orderState != 06 ||item.distributionType == 0 )">
                      {{ showButton(item.orderState,item.afterSalesOrderId) }}
                    </button>
                    <button @click="callCustomer(item)">联系客户</button>
                    <button @click="onNote(item)">添加备注</button>
                  </div>
                </bl-orderbox>
              <div class="order-box" v-if="display">
                <img src="static/images/Rectangle37@2x.png" class="nodata">
              </div>
          </bl-tab-container-item>
        </bl-tab-container>
      </bl-scroll>
    </div>

    <bl-cust-picker :buttons="buttons" v-if="isNotes">
      <div slot="inner">
          <h2>添加备注</h2>
          <textarea type="text" name="notes" maxlength="100" placeholder="请输入您的备注(100字以内)" class="notes" v-model.trim="remark"></textarea>
      </div>
    </bl-cust-picker>
  </div>

</template>

<script>
  import uiMixin from 'src/mixins/uiMixin';

  import BlCustPicker from 'components/cloud-merchant/merchant-modal';
  export default {
    name: 'keepAllOrders',
    components: {
      'BlOrderbox': () => System.import('components/cloud-merchant/order-box-new'),
      'BlCell': () => System.import('components/cloud-merchant/cell'),
      BlCustPicker,
    },
    mixins: [uiMixin],

    data () {
      return {
        selected: 0,
        isNotes: false,
        display: false,
        isOK: false,
        buttons: [{
          text: '取消',
          onClick: () => {
            this.isNotes = false
            this.remark = null
          }
        }, {
          text: '确认',
          onClick: () => {
            this.updateRemarkInfo();
          }
        }],
        count: 0,
        totalPage: 0,
        pageNo: 1,
        pageSize: 10,
        orderState: '0',
        orderId: '',
        remark: '',
        opBtn: [
          {'type': '01', 'text': '改价格'},
          {'type': '02', 'text': '去开单'},
          {'type': '03', 'text': '去发货'},
          {'type': '04', 'text': '物流追踪'},
          {'type': '05', 'text': '核销提货码'},
          {'type': '06', 'text': '物流追踪'}
        ],
        orderData: [],
        item: {},
        currentOrder: {},
        tabItemData: [
          {
            index: '0',
            text: '全部'
          },
          {
            index: '01',
            text: '待支付'
          },
          {
            index: '02',
            text: '待开单'
          },
          {
            index: '03',
            text: '待发货'
          },
          {
            index: '05',
            text: '待提货'
          },
          {
            index: '04',
            text: '待收货'
          },
          {
            index: '06',
            text: '已完成'
          },
          {
            index: '07',
            text: '已关闭'
          },
        ]
      }
    },
    created() {
    },
    activated() {
      // 可以用orderState作为入参来指定初始化那个tab
      console.log('订单列表 params', JSON.stringify(this.$route.params));
      let orderState = this.$route.params.orderState
      if (orderState) {
        console.log('从九宫格进入有orderState设置orderstate', orderState, this.selected);
        this.selected = orderState
      } else {
        console.log('没有orderState的情况');
        this.initialize()
        this.updateData();
      }
      document.body.scrollTop = 0
    },
    methods: {
      onPushDetails(orderNo) {
        console.log('push Details ', orderNo);
        this.$router.push({name: '9.1.2', params: {orderNo}})
      },
      /**
       * 添加备注
       */
      onNote(item) {
        this.isNotes = true;
        this.currentOrder = item;
      },
      /**
       * 初始化数据
       */
      initialize () {
        this.orderData = [] // 清空数据
        this.pageNo = 1 // 默认查询第一页
      },
      /**
       * 下拉刷新
       */
      onRefresh (done) {
//        console.log('refresh 下拉刷新')
        this.initialize()
        this.updateData(done);
      },
      /** 上拉更多
       */
      onInfinite (done) {
        this.pageNo ++
        this.updateData(done);
      },
      /**
       * 更新数据
       * UI + Data
       */
      updateData(done) {
        this.startLoading()
        console.log('查询this.selected ', this.selected);
        //
        this.$orderlib.queryOrderList(this.selected, this.pageNo, this.pageSize, (err, obj) => {
          this.stopLoading()
          if (done) {
            done()
          }

          if (err) {
            return this.$toast(err)
          }
          // 没有数据
          this.totalPage = obj.totalPage;
          this.orderData = this.orderData.concat(obj.listOrder) // 追加数据
          // console.log('订单列表=========== orderData:', JSON.stringify(this.orderData))
          // 当数据为空时显示图片
          if (this.orderData.length <= 0) {
            this.display = true
          } else {
            this.display = false
          }
        })
      },

      //卖家添加备注
      updateRemarkInfo() {
        let self = this;
        let orderNo = this.currentOrder.orderNo;
        let remark = this.remark;
        if (remark == null || remark == '') {
          return this.$toast('请填写需要备注的内容')
        }
        this.isNotes = false
        this.$orderlib.updateOrderInfo(orderNo, remark, err => {
          if (err) {
            return this.$toast(err)
          }
          this.currentOrder.sellerRemark = remark;
          this.remark = '';
        })
      },

      //展示操作按钮
      showButton(orderState, afterSalesOrderId) {
        let valStr = ''
        if (afterSalesOrderId == null) {
          this.opBtn.forEach(function (val) {
            if (orderState == val.type) {
              valStr = val.text
            }
          })
          return valStr
        } else if (afterSalesOrderId != null && (orderState == '03' || orderState == '05')) {
          return '处理订单'
        }
      },
      showbn(orderState) {
        if (orderState == '07' || orderState == '12') {
          return false
        } else {
          return true
        }
      },
      // （0：全部 01：待支付 02：待接单 03：待发货 04：待收货 05：待自提 06：交易完成 07：交易关闭
      // opBtn: [{'type': '01', 'text': '改价格'}, {'type': '02', 'text': '待开单'}, {'type': '03', 'text': '发货'}, {'type': '04', 'text': '物流追踪'}, {'type': '05', 'text': '核销提货码'}, {'type': '06', 'text': '物流追踪'}, {'type': '09', 'text': '处理订单'}],
      onbutton(orderState, orderNo, afterSalesOrderId) {
        if (afterSalesOrderId != null) {
          if (orderState == '03' || orderState == '05') {
            this.disposeOrder(afterSalesOrderId)
          }
        } else {
          if (orderState == '01') {
            this.updateOrderPrice()
          }
          if (orderState == '02') {
            this.goDeliverGoods(orderNo)
          }
          if (orderState == '03') {
            this.goBillingOrder(orderNo)
          }
          if (orderState == '04' || orderState == '06') {
            this.queryLogistics(orderNo)
          }
          if (orderState == '05') {
            this.updateOrderCode()
          }
        }
      },
      // 联系客户
      callCustomer(item) {
        let order = this.$orderlib.generateOrderFromListForIMRemote(item);
        this.$jsbridgelib.bridgeIMSendRemoteOrder(order, (err) => {
          if (err) {
            console.log('bridgeIMSendRemoteOrder err', err);
            return this.$toast(err);
          }
        })
      },
      // 改价格
      updateOrderPrice() {
        return this.$toast('开发中..');
      },
      // 去开单
      goDeliverGoods(orderNo) {
        this.$router.push({name: '9.1.3.1', params: {orderNo}})
      },
      // 物流追踪
      queryLogistics(orderNo) {
        this.$router.push({name: '9.1.6', params: {orderNo}});
      },
      // 核销提货码
      updateOrderCode() {
        this.$router.push({name: '3.5.2'});
      },
      // 跳转发货
      goBillingOrder(orderNo) {
        this.$router.push({name: '9.1.4', params: {orderNo}});
      },
      // 处理订单
      disposeOrder(afterSalesOrderId) {
        // 跳转售后订单详情页10.2.1
        this.$router.push({name: '10.2.1', params: {id: afterSalesOrderId}});
      }
    },
    watch: {
      selected: function (newVal) {
        //修改了tab之后，数据重新刷新
        console.log('tab:', newVal)
        this.orderState = newVal
        this.initialize()
        this.updateData();
      },

    },
    computed: {
      isLoading() {
        let isLoading = true;
        if (this.totalPage == 1) {
          isLoading = false
        }
        if (this.pageNo >= this.totalPage) {
          isLoading = false
        }
        return isLoading
      },
      /**
       * 转换item成标准格式
       */
      displayedItems() {
        return this.$_.map(this.orderData, (item) => {
          return item
        })
      },
    }
  }
</script>
