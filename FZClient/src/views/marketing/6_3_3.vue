<style lang="scss" src="src/sass/newcast.scss" scoped></style>
<template>
  <div class="content">
    <bl-bar barStyle="bar-dark-linear">
      <div class="button" slot="left-button" @click="$router.go(-1)">
        <div class="iconfont arrow-back"><i class="fback">返回</i></div>
      </div>
      <div slot="title">推荐商品</div>
    </bl-bar>

    <div class="newcast">
      <bl-product-box v-for="(item, index) in items" :itemData="item">

      </bl-product-box>
    </div>
  </div>
</template>

<script>
  import networklib from 'src/libs/networklib';
  //import merchantlib from 'src/libs/merchantlib';
  import uiMixin from 'src/mixins/uiMixin';

  export default {

    name: 'dynamicDetails',
    components: {
      'BlProductBox': () => System.import('components/cloud-merchant/new-product-box')

    },

    data () {
      return {

        items: [],
        queryParam: {
          dynamicId: null
        },

      }
    },
    mixins: [uiMixin],
    mounted() {
      let self = this;
      // 查询已发布推荐商品详情方法.
//      let dynamicId = this.$route.query.dynamicId;
      let dynamicId = this.$route.params.id;

      console.log('dynamicsId ', dynamicId);
      if (dynamicId != null) {
        this.queryParam.dynamicId = dynamicId;
        console.log('接收传过来的dynamicId;', dynamicId)
      } else {
        this.queryParam.dynamicId = '1111';
      }
      this.queryData(function (err) {
        if (err) {
          self.$toast({ message: '服务器载入失败:' + err, });
        } else {
          console.log('查询推荐商品详情成功.');
        }
      });
    },
    methods: {
      // 查询已发布推荐商品详情接口方法.
      queryData(callback) {
        console.log('接口入参queryParam:', this.queryParam);
        this.startLoading();
        let apiId = '1031';
        networklib.post(apiId, this.queryParam).then((obj) => {
          console.log('成功的回调', obj);
          this.stopLoading();
          this.items = obj.recommGoodsList;
          callback();
        }, (err) => {
          console.log('失败的回调', apiId);
          this.stopLoading();
          callback(err);
        });
      },
      //跳转到商品详情页面.
      onToGoodsDetail(goodsId) {
        console.log('goodsId:', goodsId);
        //this.$router.push({name:'5.6', query: {goodsId}});
        this.$router.push({path: '/editGoods/' + goodsId});
      }
    }

  }
</script>
