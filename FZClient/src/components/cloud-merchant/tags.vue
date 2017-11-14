<template>
    <div class="tag">
        <div class="tagname">{{ tagname }} <span><b> + </b> {{ tagfun }}</span></div>
        <div class="tagarrs" v-if="tagover.length > 0">
            <p>新增</p>
            <span v-for="(item, index) in tagover" class="check" @touchstart.prevent="touchStart(item, index, 1)" @touchend.prevent="touchEnd(item, index, 1)">{{ item.name }}</span>
        </div>
        <div class="tagarrs">
            <p>推荐</p>
            <span v-for="(item, index) in tagarrs" :class="{'check' : item.state}" @touchstart.prevent="touchStart(item, index, 2)" @touchend.prevent="touchEnd(item, index, 2)">{{ item.name }}</span>
        </div>
        <p class="tip">{{ tip }}</p>
        <div class="line"></div>

        <mt-popup v-model="tagVisible" position="bottom" style="width: 100%;">
            <bl-actionsheet :actions="tagActions" v-model="tagVisible" @thisValue="tagVal"></bl-actionsheet>
        </mt-popup>

    </div>
</template>

<script>
export default {

  name: 'tags',
  props: {
    tagname: {
      type: String,
      default: '商品标签'
    },
    tagfun: {
      type: String,
      default: '添加新标签'
    },
    tagarrs: {
      type: Array,
      default: []
    },
    tip: {
      type: String,
      default: '(上限10个标签，长按可移除添加标签，默认标签不可移除)'
    }
  },
  data () {
    return {
      tagVisible: false,
      tagActions: [
        {
          name: '查看相关内容',
          key: '0'
        }, {
          name: '移除标签',
          key: '1'
        }
      ],
      tagNumber: 0,
      timer: null,
      itemID: null,
      tagover: [{state: false, name: '草爆款'}, {state: false, name: '草爆款'}, {state: false, name: '草爆款'}, {state: false, name: '草爆款'}],
      button: false,
      buttons: [{
        text: '取消',
        onClick: () => {
          this.$toast('取消')
        }
      }, {
        text: '确定',
        onClick: () => {
          this.$toast('确定')
        }
      }]
    }
  },
  mounted() {
    this.tagNumber = this.tagover.length
    console.log(this.tagNumber)
  },
  methods: {
    tagVal(val) {
      if (val == 1) {
        this.modal(this.itemID)
      }
    },
    touchStart(item, index, type) {
      var that = this
      this.timer = setTimeout(function() {
        that.itemID = index
      }, 1000)
      if (type === 1) {
        this.tagActions = [
          {
            name: '查看相关内容',
            key: '0'
          }, {
            name: '移除标签',
            key: '1'
          }
        ]
      }
      if (type === 2) {
        this.tagActions = [
          {
            name: '查看相关内容',
            key: '0'
          }
        ]
      }
    },
    touchEnd(item, index, type) {
      clearTimeout(this.timer)
      if (this.itemID === index) {
        this.tagVisible = true
        this.itemID = null
      }
      if (type === 2) {
        this.tag(item, index)
      }
    },
    modal(index) {
      this.$modal({
        title: '确定要移除该标签 ?',
        content: '所有使用该标签内容将不再使用',
        buttons: [{
          text: '取消',
          onClick: () => {
            this.itemID = null
            // this.$toast('取消')
          }
        }, {
          text: '确定',
          onClick: () => {
            // this.itemID = null
            this.tagNumber -= 1
            this.tagover.splice(index, 1)
          }
        }]
      })
    },
    tag(item, index) {
      let o = this.tagarrs[index];
      if (o.state == false) {
        if (this.tagNumber < 10) {
          o.state = true
          this.tagNumber += 1
        }
      } else {
        if (this.tagNumber > 0) {
          o.state = false
          this.tagNumber -= 1
        }
      }
    }
  },
  computed: {
  }
};
</script>

<style lang="scss" scoped>
  @import "src/sass/tobe/function";
  .tag{
    padding: 0 0 0 rem(30);
    background: #fff;
    .tagname{
      height: rem(96);
      line-height: rem(96);
      border-bottom: 1px solid #d9d9d9;
      color: #585858;
      font-size: rem(34);
      span{
        float: right;
        padding: 0 rem(30);
        color: #00A699;
        font-size: rem(26);
      }
    }
    .tagarrs{
      overflow: hidden;
      p{
        color: #888;
        font-size: rem(26);
        padding: rem(30) 0 rem(20) 0;
      }
      span{
        background: #F4F4F4;
        border-radius: rem(4);
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
    }
    .tip{
      color: #888;
      font-size: rem(24);
      padding: rem(20) 0 0 0;
    }
    .line{
      border-bottom: 1px solid #d9d9d9;
      padding: 0 0 rem(30) 0;
    }
  }

</style>
