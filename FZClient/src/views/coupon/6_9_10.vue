
<style lang="scss" src="src/sass/boundGoods.scss" scoped></style>
<template>
  <div class="content-bound"  :class="{'white': goodsList.length == 0, 'hidden':isHidden}">
    <bl-bar barStyle="bar-dark-linear">
    <div class="button" slot="left-button" @click="$router.go(-1)">
      <div class="iconfont arrow-back"></div>
      <i class="fback">返回</i>
    </div>
    <div slot="title">已绑定商品</div>
  </bl-bar>
        <div class="bound-box notop">
          <div class="check-content">
              <div class="checkbox" v-for="(item, index) in goodsList" @touchstart="touchStart(item, index)" @touchmove="touchMove(item, index)" @touchend="touchEnd(item, index)">
                  <div class="check-card check-pic">
                      <div class="picture">
                        <img :src="item.goodsImg">
                      </div>
                      <dl>
                          <dt>{{ item.goodsName }}</dt>
                          <dd>货号：{{ item.freightNo }}</dd>
                          <dd>吊牌价：&yen;{{ item.tagPrice}}</dd>
                          <dd>售价：&yen;{{ item.price }} </dd>
                      </dl>
                  </div>
                  <div class="btn">
                      <span @touchstart="removeAct(goodsList, index)">移出绑定列表</span>
                  </div>
              </div>

          </div>
          <dl class="nogoods" v-if="display">
              <dt></dt>
              <dd>暂无符合条件的商品</dd>
             <!--  <dd>
                <button >添加商品</button>
              </dd> -->
          </dl>
        </div>

    <div class="editbar-bound">
      <bl-button @click="submit()">添加绑定商品</bl-button>
    </div>


  </div>

</template>

<script>
import BlRightMenu from 'src/components/cloud-merchant/promotion-right-menu';
export default {
  name: 'boundGoods',

  components: {
    BlRightMenu
  },
  created() {
    //this.getCategoryTree();
    //this.pageType = this.$route.params.pageType;
    document.body.scrollTop = 0
  },
  mounted() {
    console.log('mounted');
    this.findBindGoods();
  },
  activated() {
    console.log('activated')
    this.findBindGoods();
  },
  data () {
    return {
      isHidden: false,
      menulist: false,
      isSlide: false,
      display: false,
      categoryData: [],
      pageType: 1, // 1为正常编辑页面，2为初始选择分类，3为初始选择商品。
      goodsList: [],
      bindGoodsList: null,
      nowRange: '',
      nowIndex: '',
      endRange: '',
      endIndex: '',
      queryParam: {
        merchantId: '',
        memberId: '',
        pageNo: 1,
        pageSize: 30,
        couponTemplateId: ''
      },
    }
  },
  methods: {
    touchStart(item, index) {
      var that = this
      var e = arguments
      var event = window.event || e.callee.caller.arguments[0]
      var touchEvent = event.touches[0]
      this.nowIndex = index
      this.nowRange = touchEvent.pageX
    },
    touchMove(item, index) {
      var e = arguments
      var event = window.event || e.callee.caller.arguments[0]
      var touchEvent = event.touches[0]
      if (index == this.nowIndex) {
        this.endIndex = index
        this.endRange = touchEvent.pageX
      }
    },
    touchEnd(item, index) {
      var e = arguments
      var event = window.event || e.callee.caller.arguments[0]
      var touchEvent = event.touches[0]
      if (index == this.nowIndex && (this.nowRange - this.endRange) > 100) {
        this.slideAnd('left', index)
      }
      if (index == this.nowIndex && (this.nowRange - this.endRange) < 100) {
        this.slideAnd('right', index)
      }
      this.endRange = 0
    },
    slideAnd(param, index) {
      if (param == 'left') {
        let box = document.querySelectorAll('.checkbox')
        let btn = document.querySelectorAll('.btn')
        btn[index].style.right = 0 + 'rem'
        box[index].style.marginLeft = -1.5 + 'rem'
      }
      if (param == 'right') {
        let box = document.querySelectorAll('.checkbox')
        let btn = document.querySelectorAll('.btn')
        btn[index].style.right = -1.5 + 'rem'
        box[index].style.marginLeft = 0 + 'rem'
      }
    },
    findBindGoods() {
      if (this.$utillib.storageGet("goodsList")) {
        this.bindGoodsList = this.$utillib.storageGet("goodsList");
        for (let key in this.bindGoodsList) {
          this.goodsList.push(this.bindGoodsList[key]);
        }
      }
      if (this.goodsList.length == 0) {
        this.display = true
      } else {
        this.display = false
      }
    },
    submit() {
      this.$router.push({name: '6.9.7'});
    },
    removeAct(item, index) {
      let self = this;
      self.$modal({
        content: '确定从券已绑商品列表中移出吗？',
        buttons: [
          {text: '取消', onClick: function () {}},
          {text: '确定移除',
            onClick: function () {
              self.slideAnd('right', index)
              //将禁止参活接口加入数组
              let obj = item
              console.log("移出活动" + obj[index].goodsId)
              delete self.bindGoodsList[item[index].goodsId];
              self.goodsList.splice(index, 1);
              self.$utillib.storageSet("goodsList", self.bindGoodsList);
            }}
        ]
      });
    },
  },
  computed: {
  }
}
</script>
