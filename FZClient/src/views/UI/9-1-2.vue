<template>
  <div class="content">

    <bl-bar barStyle="bar-dark-linear">
        <div class="button" slot="left-button" @click="$router.go(-1)">
          <div class="iconfont arrow-back"><i class="fback">返回</i></div>
        </div>
        <div slot="title">订单详情</div>
        <div slot="right-button" class="hrad-right" @click="closeVisble = !closeVisble">关闭订单</div>
    </bl-bar>

    <div class="order-details">
        <div class="order-status">
            <dl><i></i>
                <dt>{{ orderData.status }}</dt>
                <dd>订单编号：{{ orderData.orderCode }}</dd>
                <dd>销售单号：{{ orderData.saleCode }}</dd>
            </dl>
            <button @click="isTicket = !isTicket">查看小票</button>
        </div>

        <div class="order-status">
            <dl><i></i>
                <dt>已完成</dt>
                <dd>订单编号：{{ orderData.orderCode }}</dd>
                <dd>销售单号：{{ orderData.saleCode }}</dd>
            </dl>
            <button>查看小票</button>
        </div>

        <div class="order-status">
            <dl><i></i>
                <dt>已发货</dt>
                <dd>订单编号：{{ orderData.orderCode }}</dd>
                <dd>销售单号：{{ orderData.saleCode }}</dd>
            </dl>
            <button>查看小票</button>
        </div>

        <div class="order-status">
            <dl><i></i>
                <dt>待发货</dt>
                <dd>订单编号：{{ orderData.orderCode }}</dd>
                <dd>销售单号：{{ orderData.saleCode }}</dd>
            </dl>
            <button>查看小票</button>
        </div>

        <div class="order-status">
            <dl><i></i>
                <dt>待提货</dt>
                <dd>订单编号：{{ orderData.orderCode }}</dd>
                <dd>销售单号：{{ orderData.saleCode }}</dd>
            </dl>
            <button>查看小票</button>
        </div>

        <div class="order-status">
            <dl><i></i>
                <dt>待支付  <span class="rtime">客户付款剩余时间 {{ blMinutes }}分{{ blSeconds }}秒</span></dt>
                <dd>订单编号：{{ orderData.orderCode }}</dd>
            </dl>
        </div>

        <div class="order-status">
            <dl><i></i>
                <dt>待开单  <span class="rtime">商家开单剩余时间 59分59秒</span></dt>
                <dd>订单编号：{{ orderData.orderCode }}</dd>
            </dl>
        </div>

        <div class="order-consignee">
            <dl><i></i>
                <dt>收货人：{{ orderData.name }}   <span class="tel">{{ orderData.tel }}</span></dt>

            </dl>
        </div>

        <div class="order-consignee">
            <dl><i></i>
                <dt>收货人：{{ orderData.name }}  {{ orderData.tel }}</dt>
                <dd>收货地址：{{ orderData.address }}</dd>
            </dl>
        </div>

        <div class="order-shop">
            <dl>
                <i></i>
                <dd>自提门店：{{ orderData.shopName }}</dd>
                <dd>门店地址：{{ orderData.shopAddress }}</dd>
            </dl>
        </div>

        <div class="order-post">
            <dl><i></i>
                <dt>已签收</dt>
                <dd>您的订单已被【王小明】签收，感谢您在百联购物，欢迎再次光临</dd>
                <dd class="time">2016-12-12 14:30</dd>
                <em class="iconfont arrow-back"></em>
            </dl>
        </div>

        <div class="order-post">
            <dl><i></i>
                <dt>配送中</dt>
                <dd><p>配送员【张小军】已出发，联系电话：<span class="phone">13391234567</span>，感谢您的耐心等待，参加评价还能赢取积分哟~</p></dd>
                <dd class="time">2016-12-12 14:30</dd>
                <em class="iconfont arrow-back"></em>
            </dl>
        </div>

        <div class="order-express">

            <div class="express" v-for="item in orderData.express">
                <blProgress :gressData="item" class="express-line"></blProgress>
                <dl>
                    <dt>{{ item.opName }} <span class="date">{{ item.opTime }}</span></dt>
                    <dd class="exp" v-if="item.opExp">{{ item.opExp }}</dd>
                    <dd>{{ item.opText }}</dd>
                    <dd class="rem" v-if="item.opRem">{{ item.opRem }}</dd>
                </dl>
            </div>

        </div>

        <div class="order-product">
            <div class="discount"><i>优惠</i>以下商品已满足 <em>满199减100</em></div>
            <div class="probox" v-for="item in orderData.product">
                <span class="picture"><img :src="item.image"></span>
                <dl>
                  <dt>{{ item.name }}</dt>
                  <dd>
                      <span class="pl">{{ item.size }}码  {{ item.color }} x{{ item.number }} </span>
                      <span class="pr">&yen;{{ item.price }}</span>
                  </dd>
                </dl>
            </div>
        </div>

        <ul class="order-pay">
          <li>
              <span>商品总额</span>
              <i>&yen;{{ Total }}</i>
          </li>
          <li>
              <span>优惠</span>
              <i>-&yen;{{ Discount }}</i>
          </li>
          <li>
              <span>运费</span>
              <i>&yen;{{ Postage }}</i>
          </li>
          <li class="pay">
              <span>应付</span>
              <i>&yen;{{ Pay }}</i>
          </li>
        </ul>

    </div>

    <div class="editgress" >
        <button class="red">去发货</button>
        <button>物流追踪</button>
        <button>联系客户</button>
        <button @click="isNotes = !isNotes">添加备注</button>
    </div>
    <bl-popup v-model="closeVisble" position="bottom" style="width: 100%;">
      <bl-picker :slots="slots" @change="" show-toolbar :visible-item-count="3" @cancel="cancel" @getValues="getValues">
      </bl-picker>
    </bl-popup>

    <bl-modal :buttons="buttons" v-if="isNotes">
      <div slot="inner">
          <h2>添加备注</h2>
          <textarea type="text" name="notes" placeholder="请输入您的备注" class="notes"></textarea>
      </div>
    </bl-modal>

    <bl-modal :buttons="Tickets" v-if="isTicket" class="tickets">
      <div slot="inner">
          <img src="static/images/barcode.png">
      </div>
    </bl-modal>

    <!-- 遮罩 -->
    <div v-if="closeVisble" @click="closeVisble = !closeVisble"><div class="modal-bg"></div></div>

  </div>
</template>

<script>
// import api from 'src/api/index'
import blProgress from 'components/cloud-merchant/status-progress'

export default {
  name: 'orderStatusProgress',
  components: {
    blProgress
  },
  mounted() {
    this.$nextTick(() => {
      setInterval(() => {
        this.countTime()
      }, 1000);
    })
  },

  data () {
    return {
      closeVisble: false,
      cancelText: '取消',
      confirmText: '确定',
      isNotes: false,
      isTicket: false,
      // countDown
      blMinutes: '00',
      blSeconds: '00',

      slots: [{
        flex: 1,
        values: ['没货了', '用户确定不要', '商品问题暂时不销售', '恶意下单', '用户操作错误'],
        className: 'closeorder',
        textAlign: 'center'
      }],
      buttons: [{
        text: '取消',
        onClick: () => {
          this.isNotes = false
          this.$toast('取消')
        }
      }, {
        text: '确认',
        onClick: () => {
          this.isNotes = false
          this.$toast('确认')
        }
      }],
      Tickets: [{
        text: '取消',
        onClick: () => {
          this.isTicket = false
        }
      }],
      // 订单
      orderData: {
        name: '洋洋',
        tel: '18516158003',
        address: '上海上海市黄浦区四川南路26号四川南路26四川南路26号',

        status: '交易关闭',
        orderCode: '123908129038',
        saleCode: '123908129',

        shopName: '百联中环购物广场',
        shopAddress: '上海上海市普陀区3858号19楼309上海上海市',

        // 快递信息
        express: [
          {'isCurrent': true, 'opName': '店员老狼', 'opTime': '2017-01-17  22:18:22', 'opExp': '交易关闭', 'opRem': '店员备注：没货了', 'opText': ''},
          {'isCurrent': false, 'opName': '店员老狼', 'opTime': '2017-01-17  18:12:20', 'opExp': '', 'opRem': '', 'opText': '开单成功成功 等待店员发货'},
          {'isCurrent': false, 'opName': '顾客小樱', 'opTime': '2017-01-17  15:05:00', 'opExp': '', 'opRem': '', 'opText': '支付成功 等待店员开单'},
          {'isCurrent': false, 'opName': '顾客小樱', 'opTime': '2017-01-17  13:22:11', 'opExp': '', 'opRem': '买家备注：红色没有就给我拿绿色的，谢谢', 'opText': '创建订单 等待顾客支付'},
          {'isCurrent': false, 'opName': '店员王小明', 'opTime': '2017-01-17  12:22:23', 'opExp': '', 'opRem': '', 'opText': '创建订单 等待顾客支付'}
        ],

        product: [
          {'image': 'static/images/y_02.png', 'name': '商品激励冲击波商品激励冲击波商品激励冲击波商品激励冲击波', 'size': 's', 'color': '白色', 'price': '500', 'number': '1'},
          {'image': 'static/images/y_02.png', 'name': '商品激励冲击波商品激励冲击波商品激励冲击波商品激励冲击波', 'size': 's', 'color': '白色', 'price': '500', 'number': '2'}
        ],
      },
      Total: '34590.00',
      Discount: '20.00',
      Postage: '20.00',
      Pay: '20590.00',
      // 模拟时间戳数据
      endTime: new Date("2017/6/10 12:00:00").getTime()
    }
  },
  computed: {
  },
  methods: {
    getValues(value) {
      this.closeVisble = false;
      console.log(value[0])
    },
    cancel() {
      this.closeVisble = false;
    },
    sortMent(n) {
      var time = n < 10 ? '0' + n : n
      return time
    },
    countTime() {
      var startTime = new Date();
      var endTime = this.endTime;
      // 转化成秒
      var countDown = (endTime - startTime.getTime()) / 1000;
      // 剩余：天/小时/分钟/秒
      // var surpDay = parseInt(countDown / (24 * 60 * 60));
      // var surpHours = parseInt(countDown / (60 * 60) % 24);
      var surpMinutes = parseInt(countDown / 60 % 60)
      var surpSeconds = parseInt(countDown % 60)
      this.blMinutes = this.sortMent(surpMinutes)
      this.blSeconds = this.sortMent(surpSeconds)
      if (countDown < 0) {
        this.blMinutes = '00';
        this.blSeconds = '00';
        console.log('time over');
      }
    }
  }
}
</script>
