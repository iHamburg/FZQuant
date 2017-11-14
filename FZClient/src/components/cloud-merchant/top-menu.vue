<template>
    <ul class="topmenu" @touchmove.prevent="touchStart">
      <li @click="confirm('1', '待审核')">待审核（{{itemData.state1}}）</li>
      <li @click="confirm('4', '审核不通过')">审核不通过（{{itemData.state4}}）</li>
      <li @click="confirm('2', '已上架')">已上架（{{itemData.state2}}）</li>
      <li @click="confirm('6', '商户下架')">商户下架（{{itemData.state6}}）</li>
      <li @click="confirm('7', '门店下架')">门店下架（{{itemData.state7}}）</li>
      <li @click="confirm('5', '全部商品')">全部商品（{{itemData.state5}}）</li>
      <li @click="confirm('0', '草稿箱')">草稿箱 （{{itemData.state0}}）</li>
    </ul>
</template>

<script>
export default {

  name: 'batch-card',

  data () {
    return {

    };
  },
  props: {
    itemData: Object,
    testData: '',
  },
  methods: {
    confirm: function (id, title) {
      //console.log('组件内部 confirm ',id,title);
      this.$emit('confirm', {id, title});
    },
    touchStart() {
    }
  }
};
</script>

<style lang="scss">
  @import "src/sass/tobe/function";
  .topmenu{
      padding:0 0 0 rem(30);
      background: #fff;
      font-size: 14px;
      color: #666;
      overflow: hidden;
      li{
        border-bottom: 1px solid #d9d9d9;
        padding: rem(30) 0;
      }
  }
</style>
