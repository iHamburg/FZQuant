<style lang="scss" src="src/sass/orderment.scss" scoped></style>

<template>
  <div class="content">

    <bl-bar barStyle="bar-dark-linear">
        <div class="button" slot="left-button" @click="$router.go(-1)">
          <div class="iconfont arrow-back"><i class="fback">返回</i></div>
        </div>
        <div slot="title">订单管理</div>
    </bl-bar>

    <bl-comli class="otop" @click.native="onGridCall({'orderState': '0'})">
        <div slot='left-text' class="left-box" >全部订单</div>
        <div slot='right-text' class="right-r" >
          <div class="iconfont arrow-back"></div>
        </div>
    </bl-comli>

    <div class="blcloudstoregrid">
      <ul>
        <!-- 替换为新九宫格组件 -->
        <BLCloudStoreGrid v-for="item in data" :itemData="item" @click.native="onGridCall(item)"></BLCloudStoreGrid>
      </ul>
    </div>

  </div>

</template>

<script>
import uiMixin from 'src/mixins/uiMixin';
import orderlib from 'src/libs/orderlib';
import BLCloudStoreGrid from 'components/bl-cloudstore-merchant/bl-cloudstore-grid'

export default {
  name: 'keeporderment',
  mixins: [uiMixin],
  components: {
    BLCloudStoreGrid
  },
  data () {
    return {
      data: [
        {"number": "0", "orderState": "01", "describe": "待支付订单", "show": 1},
        {"number": "0", "orderState": "02", "describe": "待开单订单", "show": 1},
        {"number": "0", "orderState": "03", "describe": "待发货订单", "show": 1},
        {"number": "0", "orderState": "05", "describe": "待提货订单", "show": 1},
        {"number": "0", "orderState": "04", "describe": "待收货订单", "show": 1},
        {"number": "0", "orderState": "06", "describe": "交易完成", "show": 1},
        {"number": "0", "orderState": "07", "describe": "交易关闭", "show": 1},
        // {"number": "0", "orderState": "08", "describe": "待退款订单", "show": 1},
      ]
    }
  },

  computed: {
  },

  activated() {
//    console.log('activated orderManage 9.1')
    this.queryOrderCount();
  },

  // 初始化数据.
  mounted() {
    // 调用查询订单不同状态数量.
    // this.queryOrderCount();
    // console.log('mounted 进入订单管理页面 9.1 ');
  },
  methods: {
    //点击订单.
    onGridCall (item) {
      // console.log('item', item)
      let orderState = item.orderState;
      console.log('订单状态 :', orderState)
      this.$router.push({name: '9.1.1', params: {orderState}})
    },
    // 查询订单不同状态数量接口.
    queryOrderCount() {
      // 调接口前，数据初始化为0
      this.data.map(orderType => {
        orderType.number = 0
      })
      // 接口查询数量
      orderlib.queryOrderCount((err, obj) => {
        if (err) {
          this.$toast(err);
        }
        if (obj) {
          console.log('查询订单不同状态数量接口:', JSON.stringify(obj))
          // 遍历
          obj.orderTypeList.map(item => {
            // console.log('item:', item)
            this.data.map(orderType => {
              // orderType.number = 0
              if (item.orderType == orderType.orderState) {
                orderType.number = item.orderCount
              }
            })
          })
          console.log('this.data:', JSON.stringify(this.data))
        }
      });
    },
  }
}
</script>
