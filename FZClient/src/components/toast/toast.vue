<template>
  <div class="ant-transparent" v-if="visible">
    <div class="ant-toast" :class="position" :style="{ 'padding': iconClass === '' ? '10px' : '15px 30px' }">
      <i class="ant-icon" :class="iconClass" v-if="iconClass !== ''"></i>
      <span class="ant-toast-text">{{ message }}</span>
    </div>
  </div>
</template>

<style lang="scss">
  @import "src/sass/tobe/function";
  /* toast */
  .ant-toast {
    position: fixed;
    max-width: 80%;
    border-radius: 5px;
    background: rgba(0, 0, 0, 0.7);
    color: #fff;
    box-sizing: border-box;
    text-align: center;
    z-index: 99999;
    .ant-icon{
      display: block;
      font-size: 56px;
      text-align: center;
      margin: 0 auto 10px;
    }
    .ant-toast-text{
      font-size: 14px;
      display: block;
      text-align: center;
      line-height: 1.2;
    }
    &.top{
      top: 50px;
      left: 50%;
      transform: translate(-50%, 0);
    }
    &.middle{
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
    &.bottom{
      bottom: 50px;
      left: 50%;
      transform: translate(-50%, 0);
    }
  }
</style>

<script>
export default {

  name: 'toast',

  data () {
    return {
      visible: false
    };
  },
  props: {
    message: String,
    iconClass: {
      type: String,
      default: ''
    },
    position: {
      type: String,
      default: 'middle'
    }
  }
};
</script>
