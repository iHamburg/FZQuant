<style lang="scss" scoped>
  @import "src/sass/tobe/function";
  .largeSpan{
    margin-left: 0.2cm;
  }
  .batch-card{
    padding: rem(40) 0;
    clear: both;
    border-bottom: 1px solid #d9d9d9;
    position: relative;
    dl{
      font-size: 12px;
      dd{
        color: #888;
        h2{
            color: #000;
            font-weight: 100;
            font-size: 14px;
          }
      }

    }
  .tabicon{
    font-style: normal;
    font-size: 12px;
    position: absolute;
    left: - rem(50);
    top: rem(40);
    padding: 0 rem(15) 0 rem(35);
    color: #fff;
    border-radius: rem(5);
    }
  }
</style>
<template>
  <div class="content">
    <h1></h1>
    <bl-bar barStyle="bar-dark-linear">
      <div class="button" slot="left-button" @click="$router.go(-1)">
        <div class="iconfont arrow-back"></div>
      </div>
      <div slot="title">大类码</div>
    </bl-bar>
    <div class="batch-card">
      <i class="tabicon"></i>
      <dl v-for="item in items" :categorydata="item"  @click="selectedCategory(item)">
        <dd>&nbsp;名称:{{item.largeName}}</dd>
        <dd>&nbsp;编号:{{item.largeNo}}</dd>
        <dd>&nbsp;价格:￥{{item.largePrice}}</dd>
      </dl>
    </div>



</div>
</template>
<script>
//import allocationbond from 'components/choose-coupons/distribution';
import networklib from 'src/libs/networklib';
import utils from 'src/utils';
import uiMixin from 'src/mixins/uiMixin';

export default {
  name: 'goodsLarge',
  components: {
    'BlBatchCard': () => System.import('components/cloud-merchant/batch-card'),
  },
  data () {
    return {
      items: [{ }],
      flag: null
    }
  },
  mixins: [uiMixin],
  mounted() {
    //从缓存取 用户登陆相关信息.
    let dataBase = utils.storageGet('data');
    if (dataBase) {
      this.merchantId = dataBase.telantId;//商户id
    }
    console.log("商户id为:" + this.merchantId);
    this.queryLargeList();
    this.flag = this.$route.query.flag;
  },

  methods: {
    //1009-查询大类码列表
    queryLargeList() {
      // this.startLoading();
      let apiId = '1009';
      let queryParam = {merchantId: this.merchantId};
      networklib.post(apiId, queryParam).then((obj) => {
        // this.stopLoading();
//        console.log('成功的回调', obj);
        var self = this;
        self.items = obj.largeList;
      }).catch(err => {
        // this.stopLoading();
        console.log('失败的回调', apiId, err);
      })
    },
    //选中跳转到商品上新页面.
    selectedCategory(item) {
      this.largeNo = item.largeNo;
      this.largeName = item.largeName;
      var flag = this.flag;
      if (flag == 1) {
        let cachedItem = utils.storageGet('createdItem');
        console.log("上新缓存：" + cachedItem);
        if (cachedItem != null) {
          cachedItem.largeId = this.largeNo;
          cachedItem.largeName = this.largeName;
          utils.storageSet('createdItem', cachedItem);
        }
        this.$router.push({path: '/createGoods'});
      } else {
        let editedCachedItem = utils.storageGet('editedItem');
        console.log("编辑缓存：" + editedCachedItem);
        if (editedCachedItem != null) {
          editedCachedItem.largeId = this.largeNo;
          editedCachedItem.largeName = this.largeName;
          utils.storageSet('editedItem', editedCachedItem);
        }
        this.$router.push({path: '/editGoods'});
      }
    }
  },

}
</script>
