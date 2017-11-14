<!-- 
  tagArray : 数组对象
  ifAdd: 添加按钮
  checked: 是否选择
 -->
<template>
    <div class="tagment">
        <span class="cbutton" v-for="(item, index) in tagArray" :class="{'check': item.state}" @touchstart.prevent="touchStart(item, index)" @touchend.prevent="touchEnd(item, index)">{{ item.name }}</span>
        <div class="add" v-if="ifAdd" @click="tagadd">+</div>
    </div>
</template>

<script>
export default {

  name: 'tag',
  props: {
    tagArray: {
      type: Array,
      default: []
    },
    ifAdd: {
      type: Boolean,
      default: false
    },
    checked: {
      type: Boolean
    }
  },
  data () {
    return {
      tap: false,
    }
  },
  mounted() {
  },
  methods: {
    touchStart(item, index) {
      var that = this
      let state = this.state
      this.timer = setTimeout(function() {
        that.tap = true
        that.$emit('tagcallback', index)
      }, 1000)
    },
    touchEnd(item, index) {
      clearTimeout(this.timer)
      if (!this.tap) {
        if (!this.checked) {
          (!this.tagArray[index].state) ? (this.tagArray[index].state = true) : (this.tagArray[index].state = false)
        }
        this.tap = false
        this.$emit('tagclick', index)
      } else {
        this.tap = false
      }
    },
    tagadd() {
      this.$emit('tagadd')
    }
  },
  computed: {
  }
};
</script>

<style lang="scss" scoped>
  @import "src/sass/tobe/function";
  .tagment{
    float: left;
    .cbutton{
      background: #F4F4F4;
      border-radius: 2px;
      float: left;
      font-size: rem(20);
      color: #666;
      padding: rem(12) rem(20);
      margin: 0 rem(20) rem(20) 0;
      border: 1px solid #f4f4f4;
    }
    .check{
      color: #333;
      border: 1px solid #00A699;
      background: #fff url(../../sass/base64/icheck.png) no-repeat bottom right;
      background-size: rem(30);
    }
    .add{
      width: rem(120);
      height: 0.6rem;
      line-height: 0.6rem;
      border: 1px solid #00A699;
      border-radius: 2px;
      text-align: center;
      padding: 0 rem(10);
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      font-size: 0.4rem;
      color: #00A699;
    }

  }

</style>
