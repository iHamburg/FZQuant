<style lang="scss" src="src/sass/search.scss" scoped></style>
<template>
    <div class="content-search">
        <!-- 搜索 -->
        <bl-search :back=false :item=false :canel=true :text="'输入商品名称/货号'"></bl-search>

        <div class="navbar-box">
          <bl-navbar v-model="selected">
              <bl-tab-item id="1">默认</bl-tab-item>
              <bl-tab-item id="2">最新</bl-tab-item>
              <bl-tab-item id="3">销量</bl-tab-item>
              <bl-tab-item id="4"><div @click="price">价格<i class="pcreen" v-bind:class="{dcreen:isCheck, defaultp:isDefault}"></i></div></bl-tab-item>
              <div class="tab-item tab-line" @click="rightmenu">
                  <div class="tab-item-text hairline">筛选<i class="screen"></i></div>
              </div>
          </bl-navbar>
          <bl-tab-container v-model="selected">
            <bl-tab-container-item id="1">
                <div class="salescard-line" v-for="item in itemcards">
                    <bl-good-card :itemData="item"></bl-good-card>
                </div>
            </bl-tab-container-item>
            <bl-tab-container-item id="2">
                <div class="salescard-line" v-for="item in itemcards">
                    <bl-good-card :itemData="item"></bl-good-card>
                </div>
            </bl-tab-container-item>
            <bl-tab-container-item id="3">
                <div class="salescard-line" v-for="item in itemcards">
                    <bl-good-card :itemData="item"></bl-good-card>
                </div>
            </bl-tab-container-item>
            <bl-tab-container-item id="4">
                <div class="salescard-line" v-for="item in itemcards">
                    <bl-good-card :itemData="item"></bl-good-card>
                </div>
            </bl-tab-container-item>
          </bl-tab-container>
        </div>
        <bl-popup v-model="menulist" position="right" class="menulist" >
            <bl-right-menu  ref="rightmenu" v-on:child-say="listenToMyBoy"></bl-right-menu>
        </bl-popup>

        <!-- 历史搜索 -->
        <dl class="searchr" v-if="record.name">
          <dt>{{ record.name }}</dt>
          <dd v-for="item in record.history">{{ item.content }}</dd>
        </dl>
        <button v-if="this.record.history.length > 0" class="searchbtn" @click="clearHis">清空搜索历史</button>

        <!-- 订单搜索 -->
        <bl-orderbox v-for="item in orderData.orders" :item="item">
          <div slot="button" class="editbtn" v-if="item.opBtn != ''">
              <button v-for="button in item.opBtn" v-if="button.type != 4">{{ button.text }}</button>
              <button v-for="button in item.opBtn" v-if="button.type == 4">{{ button.text }}</button>
          </div>
        </bl-orderbox>

        <!-- 售后搜索 -->
        <bl-cell v-for="item in saleAfterList" :item="item" @click.native="pushDetails(item)"></bl-cell>

        <!-- 搜索联系人 -->
        <dl class="searchfriends">
          <dt>联系人</dt>
          <dd v-for="item in friends">
              <div class="line"><em><img :src="item.picture"></em> <span>{{ item.name }}</span></div>
          </dd>
        </dl>

    </div>
</template>

<script type="text/babel">
  export default {
    name: 'search',
    components: {
      'BlSearch': () => System.import('components/cloud-merchant/search'),
      'BlOrderbox': () => System.import('components/cloud-merchant/order-box'),
      'BlCell': () => System.import('components/cloud-merchant/aftersale-cell-new'),
      'BlGoodCard': () => System.import('components/cloud-merchant/good-card'),
      'BlRightMenu': () => System.import('components/cloud-merchant/right-menubox')
    },
    data () {
      return {
        selected: '1',
        isCheck: false,
        isDefault: true,
        menulist: false,
        record: {
          name: '历史搜索',
          history: [
            {content: '星球大战原力觉醒'},
            {content: '星球大战2016'}
          ]
        },
        friends: [
          {picture: 'static/images/p6_01.png', name: '马云'},
          {picture: 'static/images/p6_01.png', name: '张曼玉'},
          {picture: 'static/images/p6_01.png', name: '王海春'},
          {picture: 'static/images/p6_01.png', name: '刘德华'}
        ],
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
            }
          ]
        },

        saleAfterList: [
          {
            "expiredAt": "2017-08-26 14:24:34",
            "orderNo": "1110000198322597",
            "publishedAt": "2017-08-21 14:24:22",
            "saleAfterId": "1210000279818494",
            "status": "5",
            "isAll": "0",
            "returnType": "0",
            "orderStatus": "06",
            "distributionMode": "0",
            "goodsList": [
              {
                "goodsId": "347692782767882240",
                "goodsName": "爱慕 规划哈哈哈哈",
                "goodsNum": 1,
                "goodsPrice": 199.99,
                "imgUrl": "https://img.st.iblimg.com/cloud-1/1290547104.jpeg",
                "skuName": "34.5,黄色",
                "skuId": "20002102,335458769351737344"
              }
            ]
          }
        ],
        itemcards: [
          {sbool: true, txt: "无货", style: "no-goods", goodsImg: "static/images/dr.png", goodsName: "小狼的多浆植物", freightNo: "2665448662216632", tagPrice: "66.88", price: "50.00", discount: 5},
          {sbool: true, txt: "待审核", style: "pend-goods", goodsImg: "static/images/dr.png", goodsName: "小狼的多浆植物", freightNo: "2665448662216632", tagPrice: "66.88", price: "50.00", discount: 5},
          {sbool: true, txt: "草稿", style: "draft-goods", goodsImg: "static/images/dr.png", goodsName: "小狼的多浆植物", freightNo: "2665448662216632", tagPrice: "66.88", price: "50.00", discount: 5},
          {sbool: true, txt: "已下架", style: "under-goods", goodsImg: "static/images/dr.png", goodsName: "小狼的多浆植物", freightNo: "2665448662216632", tagPrice: "66.88", price: "50.00", discount: 5},
          {sbool: true, txt: "审核不通过", style: "audit-goods", goodsImg: "static/images/dr.png", goodsName: "小狼的多浆植物", freightNo: "2665448662216632", tagPrice: "66.88", price: "50.00", discount: 5}
        ]

      }
    },
    mounted() {

    },
    computed: {
    },
    methods: {
      price() {
        this.isDefault = false
        this.isCheck = !this.isCheck
      },
      clearHis() {
        console.log(123)
        this.record.name = ''
        this.record.history = ''
      },
      rightmenu() {
        console.log(123123)
        this.menulist = true;
        this.$refs.rightmenu.open();
      },
      listenToMyBoy(data) {
        this.menulist = data;
      }
    }
  }
</script>
