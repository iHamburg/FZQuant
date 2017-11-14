<template>
  <div class="picker" :class="{ 'picker-3d': rotateEffect }">
    <div class="picker-toolbar" v-if="showToolbar">
      <div class="toolbar-head"@touchmove.prevent="touchStart">
        <span class="bl-datetime-action bl-datetime-cancel" @click="cancel">{{ cancelText }}</span>
        <div class="toolbar-texts1" >{{ toolbarSubText }}</div>
        <span class="bl-datetime-action bl-datetime-confirm" @click="getValues">{{ confirmText }}</span>
      </div>
    </div>
    <div class="picker-items"  @touchmove.prevent="touchStart">
      <picker-slot v-for="slot in slots" :values="slot.values || []" :text-align="slot.textAlign || 'center'" :visible-item-count="visibleItemCount" :class-name="slot.className" :flex="slot.flex" v-model="values[slot.valueIndex]" :rotate-effect="rotateEffect" :divider="slot.divider" :content="slot.content"></picker-slot>
      <div class="picker-center-highlight"></div>
    </div>
  </div>
</template>

<style>
  .picker {
    overflow: hidden;

  }
  .toolbar-head{
    position: relative;

  }
  .toolbar-texts1{
    height: 50px;
    width: 200px;
    margin:0 auto;
    line-height: 44px;
    text-align: center;
    font-size: 18px;
    color: #222222;
    position: absolute;
    left: 50%;
    top: 0;
    margin-left: -100px;
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
    top: 2px;
  }
  .picker .picker-item{
    height: 48px;
    line-height: 48px;
  }

  .picker .picker-center-highlight {
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

</style>

<script type="text/babel">
  export default {
    name: 'mt-picker',

    componentName: 'picker',
    data () {
      return {
        valuesTemp: [],
      }
    },

    props: {
      slots: {
        type: Array
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
      }
    },

    created() {
      this.$on('slotValueChange', this.slotValueChange);
      var slots = this.slots || [];
      //this.values = [];
      var values = this.values;
      var valueIndexCount = 0;
      slots.forEach(function(slot) {
        if (!slot.divider) {
          slot.valueIndex = valueIndexCount++;
          values[slot.valueIndex] = (slot.values || [])[slot.defaultIndex || 0];
        }
      });
      values.forEach((itme) => {
        this.valuesTemp.push(itme);
      });
      //console.log('values' + JSON.stringify(values) + JSON.stringify(this.valuesTemp));
    },

    methods: {
      slotValueChange() {
        this.$emit('change', this, this.values);
        //console.log('slotValueChange-values' + JSON.stringify(this.values));
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
      touchStart() {
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
        //console.log('getValues-values' + JSON.stringify(this.values) + JSON.stringify(this.valuesTemp));
        for (var i = 0; i < this.values.length; i++) {
          if (this.values[i] == null) {
            this.values[i] = this.valuesTemp[i]
          }
        }
        this.$emit('getValues', this.values);
      },
      cancel() {
        this.$emit('cancel', null);
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
      values() { //第一行如果没有选会是null
        var slots = this.slots || [];
        var values = [];
        slots.forEach(function(slot) {
          //console.log('computed-slot ', JSON.stringify(slot));
          if (!slot.divider) values.push(slot.values);
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
      PickerSlot: require('./picker-slot.vue')
    }
  };
</script>
