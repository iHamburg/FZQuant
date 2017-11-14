<style lang="scss" src="src/sass/orderment.scss" scoped></style>

<template>
  <div class="content">

    <bl-bar barStyle="bar-dark-linear">
        <div class="button" slot="left-button" @click="$router.go(-1)">
          <div class="iconfont arrow-back"><i class="fback">返回</i></div>
        </div>
        <div slot="title">商品管理</div>
    </bl-bar>

    <!--<bl-comli class="otop" @click.native="onGridCall({'state': '5'})">-->
    <bl-comli class="otop" @click.native="onGridCall()">
        <div slot='left-text' class="left-box" >全部商品</div>
        <div slot='right-text' class="right-r" >
          <div class="iconfont arrow-back"></div>
        </div>
    </bl-comli>

    <div class="blcloudstoregrid">
      <ul>
        <!-- 10/20 替换为新九宫格组件 -->
        <BLCloudStoreGrid v-for="item in data" :itemData="item" @click.native="onGridCall(item)"></BLCloudStoreGrid>
      </ul>
    </div>
  </div>

</template>

<script>

import uiMixin from 'src/mixins/uiMixin';
import orderlib from 'src/libs/orderlib';
import networklib from 'src/libs/networklib'
import merchantlib from 'src/libs/merchantlib'
import BLCloudStoreGrid from 'components/bl-cloudstore-merchant/bl-cloudstore-grid'

export default {
  name: 'keeporderment',
  mixins: [uiMixin],
  components: {
    BLCloudStoreGrid
  },
  data () {
    return {
      // 0：草稿箱 1：待审核，2：已上架，3：已下架，4：审核不通过 5: 全部
      data: [
        {"number": "0", "state": "2", "describe": "已上架", "show": 1},
        {"number": "0", "state": "1", "describe": "待审核", "show": 1},
        {"number": "0", "state": "0", "describe": "草稿箱", "show": 1},
        {"number": "0", "state": "4", "describe": "审核不通过", "show": 1},
        // {"number": "0", "state": "3", "describe": "已下架", "show": 1},
        {"number": "0", "state": "6", "describe": "商户下架", "show": 1},
        {"number": "0", "state": "7", "describe": "门店下架", "show": 1},
      ],
    }
  },

  computed: {
  },

  activated() {
    this.queryCount();
  },
  methods: {
    //点击订单.
    onGridCall (item) {
      // item为空 =》 全部商品
      if (!item) {
        item = {
          state: 5,
          describe: '全部商品'
        }
      }
      console.log('item', item)
      // 0：草稿箱 1：待审核，2：已上架，3：已下架，4：审核不通过 5: 全部
      let state = item.state;
      console.log('订单状态 :', state)
      this.$utillib.storageSet("flag", 1);
      this.$router.push({name: '5.8', query: {goodsState: state, title: item.describe}})
    },
    /**
     * 查询九宫格数量
     */
    queryCount() {
      let apiId = '1014';
      let queryParam = {merchantId: merchantlib.getMerchantId()}
      networklib.post(apiId, queryParam).then((obj) => {
        console.log('成功的回调', obj.list);
        if (obj.list) {
          obj.list.map(item => {
            this.data.map(goodsType => {
              if (item.name == goodsType.state) {
                goodsType.number = item.num
              }
            })
          })
        }
      }).catch(err => {
        this.$toast(err)
      });
    }
  }
}
</script>
