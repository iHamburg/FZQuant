<template>
  <div class="content">

    <bl-bar barStyle="bar-dark-linear">
        <div class="button" slot="left-button" @click="$router.go(-1)">
          <div class="iconfont arrow-back"><i class="fback">返回</i></div>
        </div>
        <div slot="title">全部订单</div>
    </bl-bar>

    <div class="allorder">
        <div class="top">
            <div class="isearch">
              <button>输入下单用户姓名/订单号/商品</button>
            </div>
            <!-- header-menu -->
            <div class="header-menu">
              <section>
                <bl-navbar v-model="selected">
                  <bl-tab-item id="1">全部</bl-tab-item>
                  <bl-tab-item id="2">待支付</bl-tab-item>
                  <bl-tab-item id="3">待开单</bl-tab-item>
                  <bl-tab-item id="4">待发货</bl-tab-item>
                  <bl-tab-item id="5">待提货</bl-tab-item>
                  <bl-tab-item id="6">待收货</bl-tab-item>
                  <bl-tab-item id="7">交易完成</bl-tab-item>
                  <bl-tab-item id="8">交易关闭</bl-tab-item>
                  <bl-tab-item id="9">申请售后</bl-tab-item>
                </bl-navbar>
              </section>
            </div>
        </div>

        <!-- tab-content -->
        <bl-tab-container v-model="selected">
          <bl-tab-container-item id="1">
              <!-- part -->
              <bl-orderbox v-for="item in orderData.orders" :item="item" @lookmore="lookmore">
                <div slot="button" class="editbtn" v-if="item.opBtn != ''">
                    <button v-for="button in item.opBtn" v-if="button.type != 4">{{ button.text }}</button>
                    <button v-for="button in item.opBtn" v-if="button.type == 4"  @click="isNotes = !isNotes">{{ button.text }}</button>
                </div>
              </bl-orderbox>

          </bl-tab-container-item>

          <bl-tab-container-item id="2">
              <!-- part 1 -->
              <bl-orderbox v-for="item in orderData.orders" :item="item" :orderTime="item" v-if="item.orderType == 1">
                <div slot="button" class="editbtn" v-if="item.opBtn != ''">
                    <button v-for="button in item.opBtn" v-if="button.type != 4">{{ button.text }}</button>
                    <button v-for="button in item.opBtn" v-if="button.type == 4"  @click="isNotes = !isNotes">{{ button.text }}</button>
                </div>
              </bl-orderbox>

          </bl-tab-container-item>
          <bl-tab-container-item id="3">
              <!-- part 2 -->
              <bl-orderbox v-for="item in orderData.orders" :item="item" v-if="item.orderType == 2">
                <div slot="button" class="editbtn" v-if="item.opBtn != ''">
                    <button v-for="button in item.opBtn" v-if="button.type != 4">{{ button.text }}</button>
                    <button v-for="button in item.opBtn" v-if="button.type == 4"  @click="isNotes = !isNotes">{{ button.text }}</button>
                </div>
              </bl-orderbox>
          </bl-tab-container-item>
          <bl-tab-container-item id="4">
              <!-- part 3 -->
              <bl-orderbox v-for="item in orderData.orders" :item="item" v-if="item.orderType == 3">
                <div slot="button" class="editbtn" v-if="item.opBtn != ''">
                    <button v-for="button in item.opBtn" v-if="button.type != 4">{{ button.text }}</button>
                    <button v-for="button in item.opBtn" v-if="button.type == 4"  @click="isNotes = !isNotes">{{ button.text }}</button>
                </div>
              </bl-orderbox>
          </bl-tab-container-item>
          <bl-tab-container-item id="5">
              <!-- part 4 -->
              <bl-orderbox v-for="item in orderData.orders" :item="item" v-if="item.orderType == 4">
                <div slot="button" class="editbtn" v-if="item.opBtn != ''">
                    <button v-for="button in item.opBtn" v-if="button.type != 4">{{ button.text }}</button>
                    <button v-for="button in item.opBtn" v-if="button.type == 4"  @click="isNotes = !isNotes">{{ button.text }}</button>
                </div>
              </bl-orderbox>
          </bl-tab-container-item>
          <bl-tab-container-item id="6">
              <!-- part 5 -->
              <bl-orderbox v-for="item in orderData.orders" :item="item" v-if="item.orderType == 5">
                <div slot="button" class="editbtn" v-if="item.opBtn != ''">
                    <button v-for="button in item.opBtn" v-if="button.type != 4">{{ button.text }}</button>
                    <button v-for="button in item.opBtn" v-if="button.type == 4"  @click="isNotes = !isNotes">{{ button.text }}</button>
                </div>
              </bl-orderbox>
          </bl-tab-container-item>
          <bl-tab-container-item id="7">
              <!-- part 6 -->
              <bl-orderbox v-for="item in orderData.orders" :item="item" v-if="item.orderType == 6">
                <div slot="button" class="editbtn" v-if="item.opBtn != ''">
                    <button v-for="button in item.opBtn" v-if="button.type != 4">{{ button.text }}</button>
                    <button v-for="button in item.opBtn" v-if="button.type == 4"  @click="isNotes = !isNotes">{{ button.text }}</button>
                </div>
              </bl-orderbox>
          </bl-tab-container-item>
          <bl-tab-container-item id="8">
              <!-- part 7 -->
              <bl-orderbox v-for="item in orderData.orders" :item="item" v-if="item.orderType == 7">
                <div slot="button" class="editbtn" v-if="item.opBtn != ''">
                    <button v-for="button in item.opBtn" v-if="button.type != 4">{{ button.text }}</button>
                    <button v-for="button in item.opBtn" v-if="button.type == 4"  @click="isNotes = !isNotes">{{ button.text }}</button>
                </div>
              </bl-orderbox>
          </bl-tab-container-item>
          <bl-tab-container-item id="9">
              <!-- part 8 -->
              <bl-orderbox v-for="item in orderData.orders" :item="item" v-if="item.orderType == 8">
                <div slot="button" class="editbtn" v-if="item.opBtn != ''">
                    <button v-for="button in item.opBtn" v-if="button.type != 4">{{ button.text }}</button>
                    <button v-for="button in item.opBtn" v-if="button.type == 4"  @click="isNotes = !isNotes">{{ button.text }}</button>
                </div>
              </bl-orderbox>
          </bl-tab-container-item>
        </bl-tab-container>

    </div>

    <bl-modal :buttons="buttons" v-if="isNotes">
      <div slot="inner">
          <h2>添加备注</h2>
          <textarea type="text" name="notes" placeholder="请输入您的备注" class="notes"></textarea>
      </div>
    </bl-modal>

  </div>

</template>

<script>
export default {
  name: 'allorders',
  components: {
    'BlOrderbox': () => System.import('components/cloud-merchant/order-box'),
  },
  mounted() {

  },

  data () {
    return {
      selected: '1',
      isNotes: false,
      buttons: [{
        text: '取消',
        onClick: () => {
          this.isOff = false
          this.$toast('取消')
        }
      }, {
        text: '确认',
        onClick: () => {
          this.isOff = false
          this.$toast('确认')
        }
      }],
      // order
      orderData: {
        // orderType: 1待支付 / 2待开单 / 3待发货 / 4待提货 / 5待收货 / 6交易完成 / 7交易关闭 / 8申请售后
        // opBtn: 0发货 / 1待开单 / 2改价格 / 3联系客户 / 4添加备注 / 5物流追踪 / 6核销提货码 / 7查看申请单
        orders: [
          {
            'id': '123123',
            'buyerName': '何明明',
            'orderType': '1',
            'orderStatus': '待支付',
            'orderTime': new Date("2017/7/10 12:00:00").getTime(),
            'orderDate': '2017-05-01   12:33:00',
            'orderNumber': '312789234897423',
            product: [
              {'image': 'static/images/y_02.png', 'name': '商品激励冲击波商品激励冲击波商品激励冲击波商品激励冲击波', 'size': 's', 'color': '白色', 'price': '500', 'number': '1'},
              {'image': 'static/images/y_02.png', 'name': '商品激励冲击波商品激励冲击波商品激励冲击波商品激励冲击波', 'size': 's', 'color': '白色', 'price': '500', 'number': '2'},
              {'image': 'static/images/y_02.png', 'name': '商品激励冲击波商品激励冲击波商品激励冲击波商品激励冲击波', 'size': 's', 'color': '白色', 'price': '500', 'number': '2'}
            ],
            'payMoney': '10000.00',
            'orderCount': '4',
            'opBtn': [
              {'type': '2', 'text': '改价格'}, {'type': '3', 'text': '联系客户'}, {'type': '4', 'text': '添加备注'}
            ],
            'cancelNotes': '',
            'orderNotes': []
          },
          {
            'id': '123123',
            'buyerName': '何明明',
            'orderType': '2',
            'orderStatus': '待开单',
            'orderTime': new Date("2017/7/10 10:00:00").getTime(),
            'orderDate': '2017-05-01   12:33:00',
            'orderNumber': '312789234897423',
            product: [
              {'image': 'static/images/y_02.png', 'name': '商品激励冲击波商品激励冲击波商品激励冲击波商品激励冲击波', 'size': 's', 'color': '白色', 'price': '500', 'number': '1'},
              {'image': 'static/images/y_02.png', 'name': '商品激励冲击波商品激励冲击波商品激励冲击波商品激励冲击波', 'size': 's', 'color': '白色', 'price': '500', 'number': '2'},
              {'image': 'static/images/y_02.png', 'name': '商品激励冲击波商品激励冲击波商品激励冲击波商品激励冲击波', 'size': 's', 'color': '白色', 'price': '500', 'number': '2'},
              {'image': 'static/images/y_02.png', 'name': '商品激励冲击波商品激励冲击波商品激励冲击波商品激励冲击波', 'size': 's', 'color': '白色', 'price': '500', 'number': '2'},
              {'image': 'static/images/y_02.png', 'name': '商品激励冲击波商品激励冲击波商品激励冲击波商品激励冲击波', 'size': 's', 'color': '白色', 'price': '500', 'number': '2'}
            ],
            'payMoney': '10000.00',
            'orderCount': '4',
            'opBtn': [
              {'type': '1', 'text': '待开单'}, {'type': '3', 'text': '联系客户'}, {'type': '4', 'text': '添加备注'}
            ],
            // 买家退货备注
            'cancelNotes': '',
            // 卖家 买家备注
            'orderNotes': [
              {'seller': '王小二', 'notes': '我有一句吓吓侬不知当讲不当讲'},
              {'buyer': '买家', 'notes': '周末老公不在家，没人搬上楼，防狼入室。请工作日送货。'}
            ]
          },
          {
            'id': '123123',
            'buyerName': '何明明',
            'orderType': '3',
            'orderStatus': '待发货',
            'orderTime': new Date("2017/7/10 10:00:00").getTime(),
            'orderDate': '2017-05-01   12:33:00',
            'orderNumber': '312789234897423',
            product: [
              {'image': 'static/images/y_02.png', 'name': '商品激励冲击波商品激励冲击波商品激励冲击波商品激励冲击波', 'size': 's', 'color': '白色', 'price': '500', 'number': '1'},
              {'image': 'static/images/y_02.png', 'name': '商品激励冲击波商品激励冲击波商品激励冲击波商品激励冲击波', 'size': 's', 'color': '白色', 'price': '500', 'number': '2'}
            ],
            'payMoney': '10000.00',
            'orderCount': '4',
            'opBtn': [
              {'type': '0', 'text': '发货'}, {'type': '3', 'text': '联系客户'}, {'type': '4', 'text': '添加备注'}
            ],
            'cancelNotes': '',
            'orderNotes': []
          },
          {
            'id': '123123',
            'buyerName': '何明明',
            'orderType': '4',
            'orderStatus': '待提货',
            'orderTime': new Date("2017/7/10 10:00:00").getTime(),
            'orderDate': '2017-05-01   12:33:00',
            'orderNumber': '312789234897423',
            product: [
              {'image': 'static/images/y_02.png', 'name': '商品激励冲击波商品激励冲击波商品激励冲击波商品激励冲击波', 'size': 's', 'color': '白色', 'price': '500', 'number': '1'},
              {'image': 'static/images/y_02.png', 'name': '商品激励冲击波商品激励冲击波商品激励冲击波商品激励冲击波', 'size': 's', 'color': '白色', 'price': '500', 'number': '2'}
            ],
            'payMoney': '10000.00',
            'orderCount': '4',
            'opBtn': [
              {'type': '6', 'text': '核销提货码'}, {'type': '3', 'text': '联系客户'}, {'type': '4', 'text': '添加备注'}
            ],
            'cancelNotes': '',
            'orderNotes': []
          },
          {
            'id': '123123',
            'buyerName': '何明明',
            'orderType': '5',
            'orderStatus': '待收货',
            'orderTime': new Date("2017/7/10 10:00:00").getTime(),
            'orderDate': '2017-05-01   12:33:00',
            'orderNumber': '312789234897423',
            product: [
              {'image': 'static/images/y_02.png', 'name': '商品激励冲击波商品激励冲击波商品激励冲击波商品激励冲击波', 'size': 's', 'color': '白色', 'price': '500', 'number': '1'},
              {'image': 'static/images/y_02.png', 'name': '商品激励冲击波商品激励冲击波商品激励冲击波商品激励冲击波', 'size': 's', 'color': '白色', 'price': '500', 'number': '2'}
            ],
            'payMoney': '10000.00',
            'orderCount': '4',
            'opBtn': [
              {'type': '5', 'text': '物流追踪'}, {'type': '3', 'text': '联系客户'}, {'type': '4', 'text': '添加备注'}
            ],
            'cancelNotes': '',
            'orderNotes': []
          },
          {
            'id': '123123',
            'buyerName': '何明明',
            'orderType': '6',
            'orderStatus': '交易完成',
            'orderTime': new Date("2017/7/10 10:00:00").getTime(),
            'orderDate': '2017-05-01   12:33:00',
            'orderNumber': '312789234897423',
            product: [
              {'image': 'static/images/y_02.png', 'name': '商品激励冲击波商品激励冲击波商品激励冲击波商品激励冲击波', 'size': 's', 'color': '白色', 'price': '500', 'number': '1'},
              {'image': 'static/images/y_02.png', 'name': '商品激励冲击波商品激励冲击波商品激励冲击波商品激励冲击波', 'size': 's', 'color': '白色', 'price': '500', 'number': '2'}
            ],
            'payMoney': '10000.00',
            'orderCount': '4',
            'opBtn': [
              {'type': '5', 'text': '物流追踪'}, {'type': '3', 'text': '联系客户'}, {'type': '4', 'text': '添加备注'}
            ],
            'cancelNotes': '',
            'orderNotes': []
          },
          {
            'id': '123123',
            'buyerName': '何明明',
            'orderType': '7',
            'orderStatus': '交易关闭',
            'orderTime': new Date("2017/7/10 10:00:00").getTime(),
            'orderDate': '2017-05-01   12:33:00',
            'orderNumber': '312789234897423',
            product: [
              {'image': 'static/images/y_02.png', 'name': '商品激励冲击波商品激励冲击波商品激励冲击波商品激励冲击波', 'size': 's', 'color': '白色', 'price': '500', 'number': '1'},
              {'image': 'static/images/y_02.png', 'name': '商品激励冲击波商品激励冲击波商品激励冲击波商品激励冲击波', 'size': 's', 'color': '白色', 'price': '500', 'number': '2'},
              {'image': 'static/images/y_02.png', 'name': '商品激励冲击波商品激励冲击波商品激励冲击波商品激励冲击波', 'size': 's', 'color': '白色', 'price': '500', 'number': '2'},
              {'image': 'static/images/y_02.png', 'name': '商品激励冲击波商品激励冲击波商品激励冲击波商品激励冲击波', 'size': 's', 'color': '白色', 'price': '500', 'number': '2'},
              {'image': 'static/images/y_02.png', 'name': '商品激励冲击波商品激励冲击波商品激励冲击波商品激励冲击波', 'size': 's', 'color': '白色', 'price': '500', 'number': '2'}
            ],
            'payMoney': '10000.00',
            'orderCount': '4',
            'opBtn': [],
            'cancelNotes': '',
            'orderNotes': []
          },
          {
            'id': '123123',
            'buyerName': '何明明',
            'orderType': '8',
            'orderStatus': '申请售后',
            'orderTime': new Date("2017/7/10 10:00:00").getTime(),
            'orderDate': '2017-05-01   12:33:00',
            'orderNumber': '312789234897423',
            product: [
              {'image': 'static/images/y_02.png', 'name': '商品激励冲击波商品激励冲击波商品激励冲击波商品激励冲击波', 'size': 's', 'color': '白色', 'price': '500', 'number': '1'},
              {'image': 'static/images/y_02.png', 'name': '商品激励冲击波商品激励冲击波商品激励冲击波商品激励冲击波', 'size': 's', 'color': '白色', 'price': '500', 'number': '2'}
            ],
            'payMoney': '10000.00',
            'orderCount': '4',
            'opBtn': [
              {'type': '7', 'text': '查看申请单'}, {'type': '3', 'text': '联系客户'}, {'type': '4', 'text': '添加备注'}
            ],
            // 买家退货备注
            'cancelNotes': '买家申请退货：退货，不想要了',
            // 卖家 买家备注
            'orderNotes': [
              {'seller': '王小二', 'notes': '我有一句吓吓侬不知当讲不当讲'},
              {'buyer': '买家', 'notes': '周末老公不在家，没人搬上楼，防狼入室。请工作日送货。'}
            ]
          }
        ]

      }
    }
  },
  computed: {
  },
  methods: {
    lookmore(id) {
      console.log('查看详情' + id)
    }
  }
}
</script>
