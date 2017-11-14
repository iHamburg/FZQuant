<!--品牌-->
<style lang="scss" src="src/sass/goodsType.scss" scoped></style>

<template>
  <div class="ticketlist">
    <div class="content">
      <bl-bar barStyle="bar-dark-linear">
        <div class="button" slot="left-button" @click="$router.go(-1)">
          <div class="iconfont arrow-back"></div><i class="fback">返回</i>
        </div>
        <div slot="title">品牌 </div>
      </bl-bar>
    </div>
  <div class="content">
    <div class="coupon-list">
      <ul>
        <li>
          <div class="list-1" v-for="item in items" @click="returnBefore(item.brandId,item.brandName)">
            <div class="le-name">{{item.brandName}} {{item.brandEnglishName}} </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
  </div>
</template>
<script>
  import utils from 'src/utils';
  import uiMixin from 'src/mixins/uiMixin';
  import networklib from 'src/libs/networklib';
  import merchantlib from 'src/libs/merchantlib';
  export default {

    name: 'brands',
    data() {
      return {
        items: [],
        flag: null
      };
    },
    mixins: [ uiMixin ],
    methods: {
      //查询品牌列表
      queryBrandsList() {
        let queryParam = {merchantId: this.merchantId};
        let self = this;
        let apiId = '1007';
        this.startLoading();
        networklib.post(apiId, queryParam).then((obj) => {
          this.stopLoading();
          self.items = obj.brandList;
          console.log('成功的回调', obj);
        }).catch(err => {
          this.stopLoading();
          console.log('失败的回调', apiId, err);
        });
      },
      returnBefore(brandId, brandName) {
        console.log("品牌id：" + brandId)
        console.log("品牌名称：" + brandName)
        var flag = this.flag;
        console.log(" 选择分类成功 && 返回原页面的flag标识为:" + flag)
        if (flag == 1) {
          let cachedItem = utils.storageGet('createdItem');
          console.log("上新缓存：" + cachedItem);
          if (cachedItem != null) {
            cachedItem.brandId = brandId;
            cachedItem.brandName = brandName;
            utils.storageSet('createdItem', cachedItem);
          }
          // this.$router.replace({path: '/createGoods'});
          this.$router.go(-1)
        } else {
          let editedCachedItem = utils.storageGet('editedItem');
          console.log("编辑缓存：" + editedCachedItem);
          if (editedCachedItem != null) {
            editedCachedItem.brandId = brandId;
            editedCachedItem.brandName = brandName;
            utils.storageSet('editedItem', editedCachedItem);
          }
          // this.$router.replace({path: '/editGoods/' + this.goodsId});
          this.$router.go(-1)
        }
      }
    },
    mounted() {
      //从缓存取 用户登陆相关信息.
      this.goodsId = this.$route.query.goodsId;
      this.merchantId = merchantlib.getMerchantId();
      console.log("商户id：" + this.merchantId);
      this.flag = this.$route.query.flag;
      console.log("flag：" + this.flag);
      this.queryBrandsList();
    }

  };

</script>

