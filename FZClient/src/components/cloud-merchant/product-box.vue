<template>
    <div class="product">
        <img :src="itemData.url">
        <h2>{{ itemData.title }}</h2>
        <span>&yen;{{ itemData.price }}</span>
    </div>
</template>



<script>

// import api from 'src/api/index';

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
