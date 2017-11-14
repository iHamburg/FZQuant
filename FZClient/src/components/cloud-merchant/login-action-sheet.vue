<template>
  <transition name="actionsheet-float">
    <div class="actionsheet" v-show="currentValue" @touchmove.prevent>
      <ul class="actionsheet-list" :style="{ 'margin-bottom': cancelText ? '5px' : '0' }">
        <li class="actionsheet-listitem" v-for="item in actions" @click="itemClick(item, item.key, item.number)">{{ item.name }}</li>
      </ul>
      <a class="actionsheet-button" @click="currentValue = false;cancelVal()" v-if="cancelText">{{ cancelText }}</a>
    </div>
  </transition>
</template>

<style lang="scss">
  @import "src/sass/tobe/function";
  .actionsheet {
    position: fixed;
    background: #e0e0e0;
    width: 100%;
    text-align: center;
    bottom: 0;
    left: 50%;
    transform: translate3d(-50%, 0, 0);
    backface-visibility: hidden;
    transition: transform .2s ease-out;

    .actionsheet-list {
      list-style: none;
      padding: 0;
      margin: 0;
    }

    .actionsheet-listitem {
      @include hair(bottom, #e0e0e0);
    }

    .actionsheet-listitem, .actionsheet-button {
      display: block;
      width: 100%;
      height: 45px;
      line-height: 45px;
      font-size: 18px;
      color: #333;
      background-color: #fff;
      &:active {
         background-color: #f0f0f0;
      }
    }
  }

  .actionsheet-float-enter,
  .actionsheet-float-leave-active {
    transform: translate3d(-50%, 100%, 0);
  }
</style>

<script type="text/babel">
  /* eslint-disable */
  import Popup from 'vue-popup';
  import 'vue-popup/lib/popup.css';

  export default {
    name: 'mt-actionsheet',

    mixins: [Popup],

    props: {
      modal: {
        default: true
      },

      modalFade: {
        default: false
      },

      lockScroll: {
        default: false
      },

      closeOnClickModal: {
        default: true
      },

      cancelText: {
        type: String,
        default: '取消'
      },

      actions: {
        type: Array,
        default: () => []
      }
    },

    data() {
      return {
        currentValue: false,
      };
    },

    watch: {
      currentValue(val) {
        this.$emit('input', val);
      },

      value(val) {
        this.currentValue = val;
      }
    },

    methods: {
      itemClick(item, key, number) {
        if (item.method && typeof item.method === 'function') {
          item.method(key);
        }


        this.$emit('thisValue', key, number)
        this.currentValue = false;
      },
      cancelVal() {
        this.$emit('cancel', this.currentValue)
      }
    },

    mounted() {
      if (this.value) {
        this.rendered = true;
        this.currentValue = true;
        this.open();
      }
    }
  };
</script>
