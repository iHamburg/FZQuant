<!--
  tagArray : 数组对象
  ifAdd: 添加按钮
  checked: 是否选择
 -->
<template>
    <div class="tagment">
      <dl class="dl1">
      <dd class="dd1" v-for="(item, index) in tagArray">
      <div class="name1"  :class="item.state" @touchstart.prevent="touchStart(item, index)" @touchend.prevent="touchEnd(item, index)">
      {{item.skuName}}
      </div>
      </dd>
      <dd class="dd1">
      <div class="add1" @click="tagadd" v-if="ifAdd">
      +
      </div>
      </dd>
      </dl>
    </div>
</template>

<script>
export default {
  name: 'tag',
  props: {
    tagArray: { //数据源
      type: Array,
      default: []
    },
    ifAdd: {  // 是否显示添加按钮
      type: Boolean,
      default: false
    },
    index2: { //  父亲索引,
      type: Number,
      default: 0
    },
    index3: { // 祖父索引
      type: Number,
      default: 0
    },
    item2: { //父亲对象
      type: Object
    },
    checked: { // 是否选择效果
      type: Boolean,
      default: true
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
      var self = this
      this.timer = setTimeout(function() {
        self.tap = true
        self.$emit('tagcallback', self.index3, self.index2, index)
      }, 500)
    },
    touchEnd(item, index) {
      clearTimeout(this.timer)
      if (!this.tap) {
        console.log('------')
        if (this.checked) {
          (this.tagArray[index].state == 'select') ? (this.tagArray[index].state = 'disabled') : (this.tagArray[index].state = 'select')
        }
        this.tap = false
        this.$emit('tagclick', this.index3, this.index2, index)
      } else {
        this.tap = false
      }
    },
    tagadd() {
      this.$emit('tagadd', this.item2)
    }
  },
  computed: {
  }
};
</script>

<style lang="scss" scoped>
  @import "src/sass/tobe/function";
  .tagment{
  .dl1{
    width:100%;
    padding-bottom:rem(26);
    background:#fff;
    padding-right:rem(30);
  .dd1{
    width:25%;
    padding:rem(26) 0 0 rem(30);
    float:left;
    display:inline;
  .name1{
    width:100%;
    height:rem(60);
    line-height:rem(60);
    background:url("../../sass/base64/attribute-normal.png") no-repeat;
    background-size:100% 100%;
    text-align:center;
    padding:0 rem(10);
    overflow:hidden;
    text-overflow:ellipsis;
    white-space:nowrap;
    font-size:rem(26);
  }
  .select{
    background:url("../../sass/base64/attribute-select.png") no-repeat;
    background-size:100% 100%;
  }
  .disabled{
    background:url("../../sass/base64/attribute-disable.png") no-repeat;
    background-size:100% 100%;
  }
  .add1{
    width:100%;
    height:rem(60);
    line-height:rem(60);
    border:1px solid #00A699;
    border-radius:2px;
    text-align:center;
    padding:0 rem(10);
    overflow:hidden;
    text-overflow:ellipsis;
    white-space:nowrap;
    font-size:rem(40);
    color:#00A699;
  }
  }
  }
  }



</style>
