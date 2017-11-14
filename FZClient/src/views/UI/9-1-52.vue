<template>
  <div class="content">

    <bl-bar barStyle="bar-dark-linear">
        <div class="button" slot="left-button" @click="$router.go(-1)">
          <div class="iconfont arrow-back"><i class="fback">返回</i></div>
        </div>
        <div slot="title">核销</div>
    </bl-bar>

    <div class="order-details">

        <div class="order-status">
            <dl><i></i>
                <dt>{{ orderData.status }}</dt>
                <dd>订单编号：{{ orderData.orderCode }}</dd>
                <dd>销售单号：{{ orderData.saleCode }}</dd>
            </dl>
            <button>查看小票</button>
        </div>

        <div class="order-product">
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

    <div class="editgress sureoff">
        <bl-button @click="isOff = !isOff">确认核销</bl-button>
    </div>

    <bl-modal :buttons="buttons" v-if="isOff">
      <div slot="inner">
          <h2>核销提货码</h2>
          <p>核销前请确认提货商品货品齐备，一旦核销视为双方交易完成</p>
      </div>
    </bl-modal>
        
  </div>

</template>

<script>
// import api from 'src/api/index'
export default {
  name: 'orderStatusProgress',
  components: {

  },
  mounted() {

  },

  data () {
    return {
      isOff: false,
      buttons: [{
        text: '取消',
        onClick: () => {
          this.isOff = false
          this.$toast('取消')
        }
      }, {
        text: '确认核销',
        onClick: () => {
          this.isOff = false
          this.$toast('确认核销')
        }
      }],
      // 订单
      orderData: {

        status: '待提货',
        orderCode: '123908129038',
        saleCode: '123908129',

        product: [
          {'image': 'static/images/y_02.png', 'name': '商品激励冲击波商品激励冲击波商品激励冲击波商品激励冲击波', 'size': 's', 'color': '白色', 'price': '500', 'number': '1'},
          {'image': 'static/images/y_02.png', 'name': '商品激励冲击波商品激励冲击波商品激励冲击波商品激励冲击波', 'size': 's', 'color': '白色', 'price': '500', 'number': '2'},
          {'image': 'static/images/y_02.png', 'name': '商品激励冲击波商品激励冲击波商品激励冲击波商品激励冲击波', 'size': 's', 'color': '白色', 'price': '500', 'number': '2'},
          {'image': 'static/images/y_02.png', 'name': '商品激励冲击波商品激励冲击波商品激励冲击波商品激励冲击波', 'size': 's', 'color': '白色', 'price': '500', 'number': '2'},
          {'image': 'static/images/y_02.png', 'name': '商品激励冲击波商品激励冲击波商品激励冲击波商品激励冲击波', 'size': 's', 'color': '白色', 'price': '500', 'number': '2'}
        ],
      },
      Total: '34590.00',
      Discount: '20.00',
      Postage: '20.00',
      Pay: '20590.00',

    }
  },
  computed: {
  },
  methods: {
  }
}
</script>
