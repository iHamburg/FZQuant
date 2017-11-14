<template>
  <div class="picker" :class="{ 'picker-3d': rotateEffect }" >
    <div class="picker-toolbar" v-if="showToolbar">
      <div class="toolbar-head">
        <span class="bl-datetime-action bl-datetime-cancel" @click="cancel">{{ cancelText }}</span>
        <div class="toolbar-text hairline">{{ toolbarSubText }}</div>
        <span class="bl-datetime-action bl-datetime-confirm" @click="getValues">{{ confirmText }}</span>
      </div>
    </div>
    <div class="picker-items">
      <slot name="content"></slot>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .picker {
    overflow: hidden;
  }

  .picker-toolbar {
    min-height: 48px;
  }
  .bl-datetime-action {
      display: inline-block;
      text-align: center;
      line-height: 44px;
      font-size: 16px;
      color: #222222;
      padding: 0 15px;
  }
  .bl-datetime-cancel {
      float: left;
  }
  .bl-datetime-confirm {
      float: right;
  }
  .picker-items {
    display: flex;
    justify-content: center;
    padding: 0;
    text-align: right;
    font-size: 24px;
    position: relative;
  }
  .toolbar-head{
    overflow: hidden;
    height: 50px;
    border-bottom: solid 6px #EFEFF4;
  }
  .toolbar-text{
    height: 50px;
    width: 60%;
    margin:0 auto;
    line-height: 44px;
    text-align: center;
    font-size: 18px;
    color: #222222;
    position: absolute;
    top: 0;
    left: 20%;
  }

.money{
  font-size: .28rem;
  width: 100%;
  padding: .26rem 0 .26rem .30rem;
  color: #000;
  .line{
    border-bottom: 1px solid #d9d9d9;
  }
  li{
    line-height: .88rem;
    text-align: left;
    width: 100%;
    clear: both;
    overflow: hidden;
    span{
      float: left;
      margin: 0 .3rem 0 0;
    }
  }
  input{
    float: left;
    border:0;
    margin: 0 .2rem;
    width: 60%;
    line-height: .88rem;
  }
  .font{
    font-size: .28rem;
    color: #999;
  }
}


</style>

<script type="text/babel">
  export default {
    name: 'mt-picker',
    componentName: 'picker',

    props: {
      slots: {
        type: Array
      },
      showToolbar: {
        type: Boolean,
        default: true
      },
      visibleItemCount: {
        type: Number,
        default: 5
      },
      rotateEffect: {
        type: Boolean,
        default: false
      },
      cancelText: {
        type: String,
        default: '取消'
      },
      confirmText: {
        type: String,
        default: '确定'
      },
      toolbarSubText: {
        type: String,
        default: ''
      },
      visible: {
        type: Boolean,
      }

    },

    methods: {
      getValues() {
        this.$emit('getValues', null);
        this.$emit('done', null);
      },
      cancel() {
        this.$emit('cancel', null);
      },
      touchmove() {
      }
    }
  };
</script>
