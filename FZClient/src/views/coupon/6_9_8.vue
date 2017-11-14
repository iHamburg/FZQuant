
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
     <bl-scroll :enableRefresh="true" :onRefresh="onRefresh" :on-infinite="onInfinite" :enableInfinite="isLoading" v-scroll-record>
        <div class="bound-box notop">
          <div class="check-content">
              <div class="checkbox" v-for="(item, index) in goodsList">
                  <div class="check-card check-pic">
                    <!-- 新添加的无货标识 -->
                    <em class="tabicon" v-if="item.sbool" :class="item.style">{{ item.text }}</em>
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
                  <!-- <div class="btn">
                      <span class="no" @touchstart="removeAllAct(goodsList, index)">禁止参活</span>
                      <span @touchstart="removeAct(goodsList, index)">移出绑定列表</span>
                  </div> -->
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
    </bl-scroll>

  <!--   <div class="editbar-bound" v-if="false">
      <bl-button @click="submit()">添加绑定商品</bl-button>
    </div> -->


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
    console.log("pro " + this.$route.params);
    if (this.$route.params.id) {
      this.queryParam.couponTemplateId = this.$route.params.id;
      console.log("couponTemplateId: " + this.queryParam.couponTemplateId);
    }
    this.initialize();
    this.updateData();
  },
  activated() {
    console.log('activated')
    if (this.$route.params.id) {
      this.queryParam.couponTemplateId = this.$route.params.id;
      console.log("couponTemplateId: " + this.queryParam.couponTemplateId);
    }
    this.initialize();
    this.updateData();
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
      nowRange: '',
      nowIndex: '',
      endRange: '',
      totalPage: 1,
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
    //refresh 下拉刷新
    onRefresh (done) {
      console.log('refresh 下拉刷新')
      this.initialize()
      this.updateData(done);
    },
    //上拉更多
    onInfinite (done) {
      this.queryParam.pageNo ++
      this.updateData(done);
    },
    initialize () {
      this.goodsList = [] // 清空数据
      this.queryParam.pageNo = 1 // 默认查询第一页
    },
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
    updateData(done) {
      //this.startLoading()
      this.$couponlib.queryBindGoodsList(this.queryParam, (err, obj) => {
        //this.stopLoading()
        if (done) {
          done()
        }
        if (err) {
          return this.$toast(err)
        }
        this.totalPage = obj.totalPage;
        // goodsState：0：草稿箱 1：待审核，2：已上架，3：已下架，4：审核不通过
        // isMaxmara：0表示有货，1表示无货
        obj.list.forEach(item => (item.state = false));
        for (let i = 0; i < obj.list.length; i++) {
          if (obj.list[i].isMaxmara == 1) {
            obj.list[i].sbool = true;
            obj.list[i].text = '无货';
            obj.list[i].style = 'no-goods'
          } else if (obj.list[i].goodsState == 2 && obj.list[i].isMaxmara == 0) {
            obj.list[i].sbool = false;
          } else if (obj.list[i].goodsState == 1) {
            obj.list[i].sbool = true;
            obj.list[i].text = '待审核';
            obj.list[i].style = 'pend-goods'
          } else if (obj.list[i].goodsState == 0) {
            obj.list[i].sbool = true;
            obj.list[i].text = '草稿箱';
            obj.list[i].style = 'draft-goods'
          } else if (obj.list[i].goodsState == 3) {
            obj.list[i].sbool = true;
            obj.list[i].text = '已下架';
            obj.list[i].style = 'under-goods'
          } else if (obj.list[i].goodsState == 4) {
            obj.list[i].sbool = true;
            obj.list[i].text = '审核不通过';
            obj.list[i].style = 'audit-goods'
          }
        }
        this.goodsList = this.goodsList.concat(obj.list) // 追加数据
        console.log('goodsList ', JSON.stringify(obj));
        // 当数据为空时显示图片
        if (this.goodsList.length == 0) {
          this.display = true
        } else {
          this.display = false
        }
      })
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
              self.activityGoodsParam.goodsId = item[index].goodsId;
              obj.splice(index, 1)
            }}
        ]
      });
    },
  },
  computed: {
    isLoading() {
      console.log("this.totalPage:" + this.totalPage);
      if (this.totalPage == 1) {
        return false
      }
      if (this.queryParam.pageNo >= this.totalPage) {
        return false
      }
      return true
    },
  }
}
</script>
