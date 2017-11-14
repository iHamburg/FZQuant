<template>
  <div class="modal-mask" @touchmove.prevent v-if="visible"  @change="onChange">
    <transition :name="currentTransition">
        <div v-show="currentValue" class="bl-popup" :class="[position ? 'bl-popup-' + position : '']">
            <div class="picker" :class="{ 'picker-3d': rotateEffect }"  :visible-item-count="5">
              <div class="picker-toolbar" v-if="showToolbar">
                  <div class="toolbar-head">
                    <span class="bl-datetime-action bl-datetime-cancel" @click="visible = false">{{ cancelText }}</span>
                    <span class="bl-datetime-action bl-datetime-confirm" @click="confirms">{{ confirmText }}</span>
                  </div>
              </div>
              <div class="picker-items">
                <poplayer-slot v-for="slot in slots" :values="slot.values || []" :text-align="slot.textAlign || 'center'" :visible-item-count="visibleItemCount" :class-name="slot.className" :flex="slot.flex" v-model="values[slot.valueIndex]" :rotate-effect="rotateEffect" :divider="slot.divider" :content="slot.content"></poplayer-slot>
                <div class="picker-center-highlight"></div>
              </div>
            </div>
        </div>
    </transition>
  </div>
</template>

<script type="text/babel">
  import Popup from 'vue-popup';
  import 'vue-popup/lib/popup.css';

  export default {
    name: 'bl-poplayer',

    mixins: [Popup],

    props: {
      cancelText: {
        type: String,
        default: '取消'
      },
      confirmText: {
        type: String,
        default: '确定'
      },
      showToolbar: {
        type: Boolean,
        default: false
      },
      visibleItemCount: {
        type: Number,
        default: 5
      },
      rotateEffect: {
        type: Boolean,
        default: false
      },

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

      popupTransition: {
        type: String,
        default: 'popup-slide'
      },

      position: {
        type: String,
        default: ''
      },

      slots: {
        type: Array
      },
      // showToolbar: {
      //   type: Boolean,
      //   default: false
      // },
      // visibleItemCount: {
      //   type: Number,
      //   default: 5
      // },
      // rotateEffect: {
      //   type: Boolean,
      //   default: false
      // }

    },

    data() {
      return {
        visible: false,
        currentValue: false,
        currentTransition: this.popupTransition
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

    beforeMount() {
      if (this.popupTransition !== 'popup-fade') {
        this.currentTransition = `popup-slide-${this.position}`;
      }
    },

    mounted() {
      if (this.value) {
        this.rendered = true;
        this.currentValue = true;
        this.open();
      }
    },

    created() {
      this.$on('slotValueChange', this.slotValueChange);
      var slots = this.slots || [];
      this.values = [];
      var values = this.values;
      var valueIndexCount = 0;
      slots.forEach(function(slot) {
        if (!slot.divider) {
          slot.valueIndex = valueIndexCount++;
          values[slot.valueIndex] = (slot.values || [])[slot.defaultIndex || 0];
        }
      });
    },
    methods: {
      open() {
        this.visible = true;
        this.currentValue = true
      },

      close() {
        this.visible = false;
      },
      confirms() {
        this.visible = false;
        this.$emit('confirms', this.values);
      },

      slotValueChange() {
        this.$emit('change', this, this.values);
      },
      onChange(picker) {
        console.log(888);
        let values = picker.$children.filter(child => child.currentValue !== undefined).map(child => child.currentValue);
        if (this.selfTriggered) {
          this.selfTriggered = false;
          return;
        }
        this.currentValue = this.getValue(values);
        this.handleValueChange();
      },

      getSlot(slotIndex) {
        var slots = this.slots || [];
        var count = 0;
        var target;
        var children = this.$children;

        slots.forEach(function(slot, index) {
          if (!slot.divider) {
            if (slotIndex === count) {
              target = children[index];
            }
            count++;
          }
        });

        return target;
      },
      getSlotValue(index) {
        var slot = this.getSlot(index);
        if (slot) {
          return slot.value;
        }
        return null;
      },
      setSlotValue(index, value) {
        var slot = this.getSlot(index);
        if (slot) {
          slot.currentValue = value;
        }
      },
      getSlotValues(index) {
        var slot = this.getSlot(index);
        if (slot) {
          return slot.mutatingValues;
        }
        return null;
      },
      setSlotValues(index, values) {
        var slot = this.getSlot(index);
        if (slot) {
          slot.mutatingValues = values;
        }
      },
      getValues() {
        return this.values;
      },
      setValues(values) {
        var slotCount = this.slotCount;
        values = values || [];
        if (slotCount !== values.length) {
          throw new Error('values length is not equal slot count.');
        }
        values.forEach((value, index) => {
          this.setSlotValue(index, value);
        });
      }
    },

    computed: {
      values() {
        var slots = this.slots || [];
        var values = [];
        slots.forEach(function(slot) {
          if (!slot.divider) values.push(slot.value);
        });

        return values;
      },
      slotCount() {
        var slots = this.slots || [];
        var result = 0;
        slots.forEach(function(slot) {
          if (!slot.divider) result++;
        });
        return result;
      }
    },

    components: {
      PoplayerSlot: require('./poplayer-slot.vue')
    }

  }
</script>

<style lang="css">
.bl-poplayer {
    width: 100%;
}
.bl-popup {
  position: fixed;
  background: #fff;
  width: 100%;
  top: 50%;
  left: 50%;
  -webkit-transform: translate3d(-50%, -50%, 0);
          transform: translate3d(-50%, -50%, 0);
  -webkit-backface-visibility: hidden;
          backface-visibility: hidden;
  -webkit-transition: .2s ease-out;
  transition: .2s ease-out;
  z-index: 999;
}
.bl-popup-top {
  top: 0;
  right: auto;
  bottom: auto;
  left: 50%;
  -webkit-transform: translate3d(-50%, 0, 0);
          transform: translate3d(-50%, 0, 0);
}
.bl-popup-right {
  top: 50%;
  right: 0;
  bottom: auto;
  left: auto;
  -webkit-transform: translate3d(0, -50%, 0);
          transform: translate3d(0, -50%, 0);
}
.bl-popup-bottom {
  top: auto;
  right: auto;
  bottom: 0;
  left: 50%;
  -webkit-transform: translate3d(-50%, 0, 0);
          transform: translate3d(-50%, 0, 0);
}
.bl-popup-left {
  top: 50%;
  right: auto;
  bottom: auto;
  left: 0;
  -webkit-transform: translate3d(0, -50%, 0);
          transform: translate3d(0, -50%, 0);
}
.popup-slide-top-enter, .popup-slide-top-leave-active {
  -webkit-transform: translate3d(-50%, -100%, 0);
          transform: translate3d(-50%, -100%, 0);
}
.popup-slide-right-enter, .popup-slide-right-leave-active {
  -webkit-transform: translate3d(100%, -50%, 0);
          transform: translate3d(100%, -50%, 0);
}
.popup-slide-bottom-enter, .popup-slide-bottom-leave-active {
  -webkit-transform: translate3d(-50%, 100%, 0);
          transform: translate3d(-50%, 100%, 0);
}
.popup-slide-left-enter, .popup-slide-left-leave-active {
  -webkit-transform: translate3d(-100%, -50%, 0);
          transform: translate3d(-100%, -50%, 0);
}
.popup-fade-enter, .popup-fade-leave-active {
  opacity: 0;
}

.picker {
  overflow: hidden;
}

.picker-toolbar {
  min-height: 48px;
}

.picker-items {
  display: flex;
  justify-content: center;
  padding: 0;
  text-align: right;
  font-size: 24px;
  position: relative;
}

.picker-center-highlight {
  height: 48px;
  box-sizing: border-box;
  position: absolute;
  left: 0;
  width: 100%;
  top: 50%;
  margin-top: -24px;
  pointer-events: none
}

.picker-center-highlight:before,
.picker-center-highlight:after {
  content: '';
  position: absolute;
  height: 1px;
  width: 100%;
  background-color: #eaeaea;
  display: block;
  z-index: 15;
  transform: scaleY(0.5);
}

.picker-center-highlight:before {
  left: 0;
  top: 0;
  bottom: auto;
  right: auto;
}

.picker-center-highlight:after {
  left: 0;
  bottom: 0;
  right: auto;
  top: auto;
}

.modal-mask{
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background-color: rgba(0,0,0,0.6);
  z-index: 10;
}
</style>
