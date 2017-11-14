<template>
  <div class="content">

    <bl-bar barStyle="bar-dark-linear">
        <div class="button" slot="left-button" @click="$router.go(-1)">
          <div class="iconfont arrow-back"><i class="fback">返回</i></div>
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

    <div class="prolist">
      <div class="tip"><p >百联又一城 >  悦诗风吟服饰</p></div>
      <div class="discount"><i>优惠</i>以下商品已满足 <em>满199减100</em></div>
      <div class="probox" v-for="(item, key) in data" :class="{'left': item.del}" @touchstart="touchStart(item, key)" @touchmove="touchMove(item, key)" @touchend="touchEnd(item, key)">
          <em slot="check"><img :src="item.url"></em>
          <div slot="check-box" class="box">
            <h1>{{ item.title }}</h1>
            <!-- 
            <p>
                <i class="l">货号：{{ item.number }}</i>
                <span class="r">¥ {{ item.price }} <i>X {{ item.count }}</i></span>
            </p>
            -->

            <div class="bute choose" @click="buteList(item, key)">

                <span class="choose">
                  已选：{{item.count}}件<b v-for="color in colorFilter(item)">/{{color.name}}</b>
                  <b v-for="size in sizeFilter(item)">/{{size.name}}</b>
                </span>

                <i class="iconfont arrow-back"></i>
            </div>
            <div class="count">
                <div class="reduce" @click="reduces(item, key)">-</div>
                <input type="tel" v-model="item.count" ref="init">
                <div class="add" @click="adds(item, key)">+</div>
            </div>
            <div class="delbox" v-show="item.del"><div class="dele">删除商品</div></div>
          </div> 
      </div>

      <bl-button>添加商品</bl-button>
    </div>

    <bl-comli class="otop">
        <div slot='left-text' class="left-box">配送方式</div>
        <div slot='right-text' class="right-box">
          <div class="right-r">普通内容 </div>
          <div class="iconfont arrow-back"></div>
        </div>
    </bl-comli>

    <div class="code">
        <bl-comli>
            <div slot='left-text' class="left-box">大类码</div>
            <div slot='right-text' class="right-box">
              <div class="right-l" @click="popupDM = !popupDM"><input type="text" name="dCodeVal" ref="dCodeVal" placeholder="填写活动大类码" value=""></div>
            </div>
        </bl-comli>
        <bl-comli>
            <div slot='left-text' class="left-box">销售码</div>
            <div slot='right-text' class="right-box">
              <div class="right-l"><input type="text" name="" placeholder="填写销售码"></div>
            </div>
        </bl-comli>
    </div>

    <dl class="editmoney">
        <dt> <i class="edit" @click="popupMoney = !popupMoney">编辑金额</i> </dt>
        <dd><span class="ml">商品总额</span> <span class="mr"> &yen; {{ Total }} </span></dd>
        <dd><span class="ml">优惠</span> <span class="mr"> -&yen; {{ Discount }} </span></dd>
        <dd><span class="ml">运费</span> <span class="mr"> &yen; {{ Postage }} </span></dd>
        <dd class="pay"><span class="ml">应付</span> <span class="mr"> &yen; {{ Pay }} </span></dd>
    </dl>


    <div class="editbar" >
      <button class="default" @click="$router.go(-1)">返回聊天室</button>
      <button class="output" @click="linkSrc">生成链接</button>
    </div>


    <!-- components -->
    <!--
    <bl-popup v-model="popupAD" position="bottom" style="width: 100%;">
        <bl-cust-picker  show-toolbar @cancel="cancel" @getValues="getValues">
            <ul slot="content" class="address">
                <li class="line">
                  <span>物流配送</span>
                  <input type="text" name="address" placeholder="配送至顾客收货地址" ref="address">
                </li>
                <li>
                  <span>门店自提</span>
                  <input type="text" name="shop" placeholder="门店地址门店名称" ref="shop">
                </li>
            </ul>
        </bl-cust-picker>
    </bl-popup>
    -->

    <!-- 配送弹出 -->
    <bl-actionsheet :actions="actions" v-model="popupAD" @thisValue="returnVal"></bl-actionsheet>

    <!-- 属性弹出 -->
    <bl-popup v-model="popupBute" position="bottom" style="width: 100%;" class="butebox">
        <div class="butetop">
            <em><img :src="itemBute.url"></em>
            <div class="title">{{ itemBute.title }}</div>
            <span><bdi>&yen;</bdi>{{ itemBute.price }}<bdi>.00</bdi></span>
            <del @click="cancelBute"></del>
        </div>
        <div class="scroll">
            <div class="butelist">
                <p>颜色</p>
                <section>
                    <span v-for="(color, key) in itemBute.color" :class="{select : color.select}" @click="checkColor(color.name, key)">{{ color.name }}</span>
                </section>
            </div>
            <div class="butelist">
                <p>尺码</p>
                <section>
                    <span v-for="(size, key) in itemBute.size" :class="{select : size.select}" @click="checkSize(size.name, key)">{{ size.name }}</span>
                </section>
            </div>
            <!--             
            <div class="butecount">
                <span>数量</span>
                <div class="count">
                    <em class="reduce" @click="reduce">-</em>
                    <input type="tel" v-model="itemBute.count" ref="init" @keyup="integer">
                    <em class="add" @click="add">+</em>
                </div>
            </div> 
            -->
        </div>
        <bl-button @click="subBute(itemBute.key)">确认选择</bl-button>
    </bl-popup>

    <!-- 删除弹出 -->
    <bl-modal :buttons="buttons" v-if="isDel" class="bestpop">
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
        <bl-cust-picker  show-toolbar @cancel="cancel" @getValues="getValues" :toolbarSubText="toolbarSubText">
            <ul slot="content" class="money">
                <li class="line font">
                  <span>当前商品总额</span>
                  <span>{{Total}} 元</span>
                </li>
                <li>
                  <span>更改总额</span>
                  <input type="text" name="shop" placeholder="输入修改后的商品总额" ref="money">
                  <span>元</span>
                </li>
            </ul>
        </bl-cust-picker>
    </bl-popup>

    <!-- 遮罩 -->
    <div v-if="popupAD || popupDM || popupMoney || popupBute" @click="popupVisibleBG"><div class="modal-bg"></div></div>


  </div>

</template>

<script>
// import api from 'src/api/index'
export default {
  name: 'order',
  components: {
    'BlCustPicker': () => System.import('components/cloud-merchant/cust-picker'),
    'BlCheckBox': () => System.import('components/cloud-merchant/check-box')
  },
  mounted() {

  },

  data () {
    return {
      nowRange: '',
      nowIndex: '',
      endRange: '',
      endIndex: '',

      // 配送
      popupAD: false,
      stockName: '请选择配送方式',
      actions: [{
        name: '物流配送',
        key: '0'
      }, {
        name: '门店自提',
        key: '1'
      }],

      // 大类码
      popupDM: false,
      dCode: false,
      dCodeVal: null,

      // 销售码
      popupSale: false,
      // 编辑金额
      toolbarSubText: '编辑金额',
      popupMoney: false,
      Total: '3000.00',
      Discount: '25.00',
      Postage: '20.00',
      Pay: '2800.00',

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
      datas: [
        {
          title: '以下商品已满足 满199减100',
          goods: [
            {
              "url": "static/images/p6_01.png",
              "title": "商品名称商品名称商品名称商品名称AS商品名称商品名称商品名称商品名称AS",
              "number": "09812093",
              "price": "500.00",
              "count": "3",
              "color": [
                  {'name': '白色', 'select': 0},
                  {'name': '黑金色', 'select': 0},
                  {'name': '黄色', 'select': 0},
                  {'name': '白色', 'select': 0},
                  {'name': '黑金色', 'select': 0},
                  {'name': '黄色', 'select': 0},
                  {'name': '黑色', 'select': 0}
              ],
              "size": [
                  {'name': '20cm*49cm*50cm', 'select': 1},
                  {'name': '2', 'select': 0}
              ]
            },
            {
              "url": "static/images/p6_02.png",
              "title": "2商品名称商品名称商品名称商品名称AS商品名称商品名称商品名称商品名称AS",
              "number": "09812093",
              "price": "8000.00",
              "count": "6",
              "color": [
                  {'name': '白色', 'select': 0},
                  {'name': '黑金色', 'select': 1},
                  {'name': '黄色', 'select': 0},
                  {'name': '黑色', 'select': 0}
              ],
              "size": [
                  {'name': '20cm*49cm*50cm', 'select': 1},
                  {'name': '1', 'select': 0}
              ]
            }
          ]
        }
      ],
      data: [
        {
          "url": "static/images/p6_01.png",
          "title": "商品名称商品名称商品名称商品名称AS商品名称商品名称商品名称商品名称AS",
          "number": "09812093",
          "price": "500.00",
          "count": "3",
          "color": [
              {'name': '白色', 'select': 0},
              {'name': '黑金色', 'select': 0},
              {'name': '黄色', 'select': 0},
              {'name': '白色', 'select': 0},
              {'name': '黑金色', 'select': 0},
              {'name': '黄色', 'select': 0},
              {'name': '黑色', 'select': 0}
          ],
          "size": [
              {'name': '20cm*49cm*50cm', 'select': 1},
              {'name': '2', 'select': 0}
          ],
          del: false
        },
        {
          "url": "static/images/p6_02.png",
          "title": "2商品名称商品名称商品名称商品名称AS商品名称商品名称商品名称商品名称AS",
          "number": "09812093",
          "price": "8000.00",
          "count": "6",
          "color": [
              {'name': '白色', 'select': 0},
              {'name': '黑金色', 'select': 1},
              {'name': '黄色', 'select': 0},
              {'name': '黑色', 'select': 0}
          ],
          "size": [
              {'name': '20cm*49cm*50cm', 'select': 1},
              {'name': '1', 'select': 0}
          ],
          del: false
        }
      ],

      itemBute: {
        'key': '',
        'title': '',
        'url': '',
        'price': '',
        'color': [],
        'size': [],
        'count': '1',
        'number': ''
      },

    }
  },
  computed: {
  },
  methods: {
    buteList(item, key) {
      this.popupBute = !this.popupBute
      this.itemBute.key = key
      this.itemBute.number = item.number
      this.itemBute.title = item.title
      this.itemBute.url = item.url
      this.itemBute.price = item.price
      this.itemBute.color = item.color
      this.itemBute.size = item.size
      this.itemBute.count = item.count
    },
    colorFilter: function(item) {
      return item.color.filter(function (color) {
        if (color.select === 1) {
          return color.name
        }
      })
    },
    sizeFilter: function(item) {
      return item.size.filter(function (size) {
        if (size.select === 1) {
          return size.name
        }
      })
    },
    add() {
      this.itemBute.count ++
    },
    reduce() {
      if (this.itemBute.count > 1) {
        this.itemBute.count --
      } else {
        this.isDel = true
      }
    },
    adds(item, key) {
      this.data[key].count ++
    },
    reduces(item, key) {
      if (this.data[key].count > 1) {
        this.data[key].count --
      }
    },
    cancelBute() {
      this.popupBute = false;
    },
    checkColor(color, key) {
      for (let i = 0, len = this.itemBute.color.length; i < len; i += 1) {
        this.itemBute.color[i].select = 0
      }
      this.itemBute.color[key].select = 1
      // (this.itemBute.color[key].select === 0) ? (this.itemBute.color[key].select = 1) : (this.itemBute.color[key].select = 0)
    },
    checkSize(size, key) {
      for (let i = 0, len = this.itemBute.size.length; i < len; i += 1) {
        this.itemBute.size[i].select = 0
      }
      this.itemBute.size[key].select = 1
    },
    subBute(key) {
      // this.data[key] = this.itemBute
      this.data[key].number = this.itemBute.number
      this.data[key].title = this.itemBute.title
      this.data[key].url = this.itemBute.url
      this.data[key].price = this.itemBute.price
      this.data[key].color = this.itemBute.color
      this.data[key].size = this.itemBute.size
      this.data[key].count = this.itemBute.count
      this.popupBute = false
      this.$toast('成功')
    },
    linkSrc() {
      let url = window.location.href;
      console.log(url);
    },

    returnVal(val) {
      if (val == '0') {
        this.stockName = '物流配送';
      } else if (val == '1') {
        this.stockName = '门店自提';
      } else {
        this.stockName = '请选择配送方式';
      }
    },
    cancel() {
      this.popupMoney = false;
    },
    getValues() {
      this.popupMoney = false;
      this.Pay = this.$refs.money.value
    },

    popupVisibleBG() {
      if (this.popupAD === true) { this.popupAD = false }
      if (this.popupDM === true) { this.popupDM = false }
      if (this.popupMoney === true) { this.popupMoney = false }
      if (this.popupBute === true) { this.popupBute = false }
    },
    codeInit() {
      if (this.$refs.dcode.value.length > 0) {
        this.dCode = true
      }
      this.$toast('输入错误')
    },
    clearInit() {
      this.dCode = false
      this.$refs.dcode.value = ''
    },
    subCode() {
      this.popupDM = false
      this.dCodeVal = this.$refs.dcode.value
      this.$refs.dCodeVal.value = this.dCodeVal
      // to do
    },
    integer() {
      let initVal = this.$refs.init.value
      this.itemBute.count = initVal.replace(/[^\d]/g, '')
    },
    touchStart(item, index) {
      var that = this
      var e = arguments
      var event = window.event || e.callee.caller.arguments[0]
      var touchEvent = event.touches[0]
      this.nowIndex = index
      this.nowRange = touchEvent.pageX
    },
    touchMove(item, index) {
      var e = arguments
      var event = window.event || e.callee.caller.arguments[0]
      var touchEvent = event.touches[0]
      if (index == this.nowIndex) {
        this.endIndex = index
        this.endRange = touchEvent.pageX
      }
    },
    touchEnd(item, index) {
      var e = arguments
      var event = window.event || e.callee.caller.arguments[0]
      var touchEvent = event.touches[0]
      if (index == this.nowIndex && this.endRange != 0 && (this.nowRange - this.endRange) > 100) {
        this.slideAnd('left', index)
        console.log(123, this.nowRange, this.endRange)
      }
      if (index == this.nowIndex && (this.nowRange - this.endRange) < 100) {
        this.slideAnd('right', index)
      }
      this.endRange = 0
    },
    slideAnd(param, index) {
      if (param == 'left') {
        this.data[index].del = true
      }
      if (param == 'right') {
        this.data[index].del = false
      }
    }
  }
}
</script>
