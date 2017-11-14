<style lang="scss" src="src/sass/orderment.scss" scoped></style>

<template>
  <div class="content">

    <bl-bar barStyle="bar-dark-linear">
        <div class="button" slot="left-button" @click="$router.go(-1)">
          <div class="iconfont arrow-back"><i class="fback">返回</i></div>
        </div>
        <div slot="title">售后管理</div>
    </bl-bar>

    <bl-comli class="otop" @click.native="onGridCall({'orderState': '-1'})">
        <div slot='left-text' class="left-box" >全部售后单</div>
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
        {"number": "0", "orderState": "0", "describe": "申请中", "show": 1},
        {"number": "0", "orderState": "1", "describe": "待退回", "show": 1},
        {"number": "0", "orderState": "2", "describe": "中止受理", "show": 1},
        {"number": "0", "orderState": "3", "describe": "退货中", "show": 1},
        /*{"number": "0", "orderState": "4", "describe": "退款中", "show": 1},*/
        {"number": "0", "orderState": "5", "describe": "已退款", "show": 1},
        // {"number": "0", "orderState": "6", "describe": "异常", "show": 1},
      ]
    }
  },

  computed: {
  },
  activated() {
    console.log('activated 10.1')
    this.queryOrderStatsNum();
  },
  methods: {
    //点击售后单.
    onGridCall (item) {
      // console.log('item', item)
      let orderState = item.orderState;
//      console.log('售后单状态 :', orderState)
      this.$router.push({name: '10.2', params: {status: orderState}})
    },
    queryOrderStatsNum() {
      this.startLoading();
      this.$aftersaleslib.queryOrderStatsNum((err, obj) => {
        this.stopLoading();
        if (err) {
          this.$toast(err);
        }
        if (obj) {
          let list = obj.orderNumList
          // 遍历
          list.map(item => {
            // console.log('item:', item)
            this.data.map(orderType => {
              if (item.orderStatusTitle == orderType.orderState) {
                orderType.number = item.orderNum
              }
            })
          })
        }
      });
    },
  }
}
</script>
