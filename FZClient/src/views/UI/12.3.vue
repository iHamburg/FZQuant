<style lang="scss" src="src/sass/tag.scss" scoped></style>
<template>
  <div class="tag">

    <bl-bar barStyle="bar-dark-linear">
        <div class="button" slot="left-button" @click="$router.go(-1)">
          <div class="iconfont arrow-back"><i class="fback">取消</i></div>
        </div>
        <div slot="title" class="title">{{ title }}</div>
         <div slot="right-button" class="hrad-right">完成</div>
    </bl-bar>

    <div class="tagitem">
        <div class="tagname">
          <form action="javascript:;">
             <input type="search" name="search" placeholder="搜索标签" class="init" v-model="message" @keyup="init">
          </form>
          <ul v-show="ifUl" class="iful">
            <li v-for="item in searchs" @click="pushtag(item)">{{ item.name }}</li>
          </ul>
        </div>
        <p class="count">标签数 <span>{{ tagNumber }}</span>/{{ tagCount }}</p>
        <div class="tagarrs" v-if="tagover.length > 0">
            <p>新增</p>
            <span v-for="(item, index) in tagover" @touchstart.prevent="touchStart(item, index, 0)" @touchend.prevent="touchEnd(item, index, 0)" class="check">{{ item.name }}</span>
        </div>
        <div class="tagarrs">
            <p>推荐</p>
            <span v-for="(item, index) in tag" :class="{'check' : item.state}" @touchstart.prevent="touchStart(item, index, 1)" @touchend.prevent="touchEnd(item, index, 1)">{{ item.name }}</span>
        </div>
        <div class="line"></div>
    </div>

    <bl-button v-press="tagVisible">长按</bl-button>

    <mt-popup v-model="tagVisible" position="bottom" style="width: 100%;">
        <bl-actionsheet :actions="tagActions" v-model="tagVisible" @thisValue="tagVal"></bl-actionsheet>
    </mt-popup>

  </div> 
</template>

<script>
import Vue from 'vue'
import press from 'src/directives/press';
Vue.directive('press', press);

export default {
  name: 'newTag',
  components: {
    'BlTag': () => System.import('components/cloud-merchant/tag')
  },
  mounted() {

  },
  created() {
    var that = this
    document.onkeydown = function (e) {
      let key = window.event.keyCode
      if (key == 13) {
        that.keycode = 13
        let val = document.querySelector('input[type=search]').value
        if (that.tagNumber < that.tagCount) {
          that.tagNumber += 1
          let arr = {state: true, name: val}
          if (val) that.tagover.push(arr)
        }
        document.querySelector('input[type=search]').value = ''
        that.message = ''
        that.ifUl = false
      }
    }
  },
  data () {
    return {
      title: '添加新标签',
      message: '',
      ifUl: false,
      keycode: null,
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
      searchs: [],
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
    long(c) {
      console.log('callback', c)
    },
    init() {
      if (this.keycode === 13) {
        this.ifUl = false
        this.keycode = null
      } else {
        this.ifUl = true
      }
      this.searchs = []
      this.searchs.push({name: '女神很嗨呦 女神漂亮耶'}, {name: '女神很嗨呦 包夜什么价格'})
    },
    pushtag(item) {
      if (this.tagNumber < this.tagCount) {
        this.tagNumber += 1
        this.tagover.push(item)
      }
      this.ifUl = false
      this.message = ''
    },
    tagVal(val) {
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
              this.itemID = null
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
      if (type === 0) {
        this.itemID = 'a';
        this.tagActions = [
          {
            name: '查看相关内容',
            key: '0'
          }, {
            name: '移除标签',
            key: '1'
          }
        ]
      } else {
        this.itemID = 'b';
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
      if (type === 1) {
        if (this.itemID === index) {
          console.log(this.itemID)
          this.tagVisible = true;
          (type === 0) ? (this.itemType = 0) : (this.itemType = 1)
        } else {
          let o = this.tag[index];
          if (o.state == false) {
            if (this.tagNumber < this.tagCount) {
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
      } else {
        if (this.itemID === index) {
          this.tagVisible = true;
          (type === 0) ? (this.itemType = 0) : (this.itemType = 1)
        }
      }
    }
  }
}
</script>
