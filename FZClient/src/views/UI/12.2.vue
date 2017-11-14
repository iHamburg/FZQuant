<style lang="scss" src="src/sass/tag.scss" scoped></style>
<template>
  <div class="tag">

    <bl-bar barStyle="bar-dark-linear">
        <div class="button" slot="left-button" @click="$router.go(-1)">
          <div class="iconfont arrow-back"><i class="fback">返回</i></div>
        </div>
        <div slot="title" class="title">{{ title }}</div>
    </bl-bar>

    <div class="tagitem">
        <div class="tagname"> 推荐标签 <i>(上限7个标签)</i></div>
        <div class="tagbox"> 
            <span v-for="(item, index) in tagover" @touchstart.prevent="touchStart(item, index, 0)" @touchend.prevent="touchEnd(item, index, 0)" class="check">{{ item.name }}</span>
            <div class="number">标签数 {{ tagNumber }}/{{ tagCount }} </div> 
        </div>
    </div>

    <div class="tagitem tagshop">
        <div class="tagname"> 本店标签 <i>(点击添加到推荐标签，长按查看相关内容)</i></div>
        <button class="button"> <b>+</b>  补充标签</button>
        <div class="tagbox"> 
            <span v-for="(item, index) in tag" @touchstart.prevent="touchStart(item, index, 1)" @touchend.prevent="touchEnd(item, index, 1)">{{ item.name }}</span>
        </div>
    </div>

    <mt-popup v-model="tagVisible" position="bottom" style="width: 100%;">
        <bl-actionsheet :actions="tagActions" v-model="tagVisible" @thisValue="tagVal"></bl-actionsheet>
    </mt-popup>

  </div> 
</template>

<script>
export default {
  name: 'tagManage',
  components: {},
  mounted() {

  },
  created() {
  },
  data () {
    return {
      title: '标签管理',
      itemType: 1,
      tagCount: 5,
      tagover: [],
      tagNumber: 0,
      timer: null,
      itemID: null,
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
      tag: [
        {state: false, name: '气质百搭'},
        {state: false, name: '新款镇店之宝'},
        {state: false, name: '限量'},
        {state: false, name: '明星同款'},
        {state: false, name: '店主推荐时尚时尚最时尚的'},
        {state: false, name: '存货不多'},
        {state: false, name: '么么哒'}
      ]
    }
  },
  computed: {
  },
  methods: {
    tagVal(val) {
      console.log(val, this.itemID, this.itemType)
      if (val == 1) {
        this.modal(this.itemID)
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
            if (this.itemType === 0) {
              console.log(this.itemNumber)
              this.tagNumber -= 1
              this.tagover.splice(index, 1)
            } else {
              this.tag.splice(index, 1)
            }
          }
        }]
      })
    },
    touchStart(item, index, type) {
      var that = this
      this.timer = setTimeout(function() {
        that.itemID = index
      }, 1000)
    },
    touchEnd(item, index, type) {
      clearTimeout(this.timer)
      if (this.itemID === index) {
        this.tagVisible = true;
        this.itemID = null;
        (type === 0) ? (this.itemType = 0) : (this.itemType = 1)
      } else {
        if (type === 0) {
          let o = this.tagover[index];
          if (this.tagNumber > 0) {
            this.tagNumber -= 1;
            this.tagover.splice(index, 1);
            this.tag.push(o);
          }
        }
        if (type === 1) {
          let o = this.tag[index];
          if (this.tagNumber < this.tagCount) {
            this.tagNumber += 1
            this.tag.splice(index, 1)
            this.tagover.push(o)
          }
        }
      }
    }
  }
}
</script>
