<template>
    <div class="product" @click="onToGoodsDetail(itemData.goodsId)">
        <img :src="itemData.imgUrl">
        <h2 v-if="itemData.normQualityName">{{ itemData.normQualityName }}</h2>
        <h2 v-else></br></h2>
        <span>&yen;{{ itemData.price }}</span>
    </div>
</template>



<script>

export default {

  name: 'checkbox',

  data () {
    return {

    };
  },
  props: {
    itemData: Object
  },
  mounted() {

  },
  methods: {
    //跳转到商品详情页面.
    onToGoodsDetail(goodsId) {
      console.log('goodsId:', goodsId);
      //this.$router.push({name:'5.6', query: {goodsId}});
      this.$router.push({path: '/goods/' + goodsId});
    }
  },
  computed: {

  }
};
</script>

<style lang="scss" scoped>
  @import "src/sass/tobe/function";
  .product{
    width: 50%;
    display: block;
    border-bottom: 1px solid #efeff4;
    border-right: 1px solid #efeff4;
    box-sizing: border-box;
    padding: rem(30);
    font-size: rem(28);
    float: left;
    overflow: hidden;
    background: #fff;
    text-align: center;
  img{
    width: auto;
    height: rem(300);
  }
  h2{
    font-size: rem(28);
    color: #353535;
    width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    font-weight: 100;
    margin: rem(20) 0 rem(10) 0;
  }
  span{
    font-weight: 600;
  }
  }
  .product:nth-child(2){
    border-right: 1px solid #fff;
  }
</style>
