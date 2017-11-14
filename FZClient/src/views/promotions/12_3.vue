<style lang="scss" src="src/sass/boundGoods.scss" scoped></style>
<template>
  <div class="content-bound" :class="{'white': goodsList.length == 0, 'hidden':isHidden}" >
      <!--右侧筛选栏-->
      <bl-popup v-model="menulist" position="right" class="menulist" >
        <bl-right-menu  ref="rightmenu" v-on:child-say="listenToMyBoy" :categoryData="categoryData"></bl-right-menu>
      </bl-popup>

      <bl-bar barStyle="bar-dark-linear">
          <div class="button" slot="left-button" @click="$router.go(-1)">
            <div class="iconfont arrow-back"><i class="fback">返回</i></div>
          </div>
          <div slot="title">活动商品黑名单</div>
      </bl-bar>

     <bl-scroll :enableRefresh="true" :onRefresh="onRefresh" :on-infinite="onInfinite" :enableInfinite="isLoading" v-scroll-record>
        <div class="bound-box notop">
          <div class="check-content">
              <div class="checkbox" v-for="(item, index) in goodsList" @touchstart="touchStart(item, index, $event)" @touchmove="touchMove(item, index, $event)" @touchend="touchEnd(item, index, $event)">
                  <div class="check-card check-pic">
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
                  <div class="btn">
                      <!-- <span class="no" @click="removeAllAct(goodsList, index)">禁止参活</span> -->
                      <span @touchstart="removeBlackList(goodsList, index)">移出黑名单</span>
                  </div>
              </div>

          </div>
          <dl class="nogoods" v-if="display">
              <dt></dt>
              <dd>暂无符合条件的商品</dd>
              <!-- <dd>
                <button>添加商品</button>
              </dd> -->
          </dl>
        </div>
    </bl-scroll>

    <div class="editbar-bound">
      <bl-button @click="submit()">添加不参加活动商品推荐</bl-button>
    </div>


  </div>

</template>
<script>
import BlRightMenu from 'src/components/cloud-merchant/promotion-right-menu';
export default {
  name: 'keepBoundGoods',
  components: {
    BlRightMenu
  },
  created() {
    this.getCategoryTree();
  },
  mounted() {
//    this.initialize();
//    this.updateData();
  },
  activated() {
    console.log('activated')
    this.initialize();
    this.updateData();
  },
  data () {
    return {
      isHidden: false,
      isSlide: false,
      menulist: false,
      display: false,
      categoryData: [],
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
        pageSize: 30
      },
      param: {
        merchantId: '',
        memberId: '',
        goodsList: [],
        type: 2
      },

    }
  },
  methods: {
    notouch(e) {
      if (this.isHidden) e.preventDefault()
    },
    //refresh 下拉刷新
    onRefresh (done) {
      console.log('refresh 下拉刷新')
      this.initialize()
      this.updateData(done);
    },
    //上拉更多\
    onInfinite (done) {
      console.log('onInfinite 上拉更多')
      this.queryParam.pageNo ++
      this.updateData(done);
    },
    initialize () {
      this.goodsList = [] // 清空数据
      this.queryParam.pageNo = 1 // 默认查询第一页
    },
    updateData(done) {
      console.log('params ', JSON.stringify(this.queryParam));
      this.$promotionlib.queryPromotionBlacklist(this.queryParam, (err, obj) => {
        if (done) {
          done()
        }
        if (err) {
          return this.$toast(err)
        }
        this.totalPage = obj.totalPage;
        // console.log('obj.list ', JSON.stringify(obj.goodsList));
        obj.goodsList.forEach(item => (item.state = false));
        for (let i = 0; i < obj.goodsList.length; i++) {
          if (obj.goodsList[i].goodsState == 2 && obj.goodsList[i].isMaxmara == 1) {
            obj.goodsList[i].sbool = true;
            obj.goodsList[i].text = '无货';
            obj.goodsList[i].style = 'no-goods'
          } else if (obj.goodsList[i].goodsState == 2 && obj.goodsList[i].isMaxmara == 0) {
            obj.goodsList[i].sbool = false;
          } else if (obj.goodsList[i].goodsState == 1) {
            obj.goodsList[i].sbool = true;
            obj.goodsList[i].text = '待审核';
            obj.goodsList[i].style = 'pend-goods'
          } else if (obj.goodsList[i].goodsState == 0) {
            obj.goodsList[i].sbool = true;
            obj.goodsList[i].text = '草稿箱';
            obj.goodsList[i].style = 'draft-goods'
          } else if (obj.goodsList[i].goodsState == 3) {
            obj.goodsList[i].sbool = true;
            obj.goodsList[i].text = '已下架';
            obj.goodsList[i].style = 'under-goods'
          } else if (obj.goodsList[i].goodsState == 4) {
            obj.goodsList[i].sbool = true;
            obj.goodsList[i].text = '审核不通过';
            obj.goodsList[i].style = 'audit-goods'
          }
        }
        console.log('obj.list ', JSON.stringify(obj.goodsList));
        this.goodsList = this.goodsList.concat(obj.goodsList) // 追加数据
        // 当数据为空时显示图片
        if (this.goodsList.length == 0) {
          this.display = true
        } else {
          this.display = false
        }
      })
    },
    submit() {
      this.menulist = true;
      this.$refs.rightmenu.open();
      console.log('点弹出边框 ');
      this.isHidden = true
    },
    listenToMyBoy(data) {
      this.menulist = false;
      this.isHidden = false;
      if (data == null) {
        return;
      }
      if (data.type == '1') {
        this.$toast('您未选择任何分类')
      } else if (data.type == '2') {
        let self = this;
        window.setTimeout(function () {
          self.$router.push({name: '12.3.1', params: {categoryIds: data.param}});
        }, 300);
      }
    },
    touchStart(item, index, e) {
      var that = this
      // var e = arguments
      // var event = window.event || e.callee.caller.arguments[0]
      var touchEvent = e.touches[0]
      this.nowIndex = index
      this.nowRange = touchEvent.pageX
    },
    touchMove(item, index, e) {
      // var e = arguments
      // var event = window.event || e.callee.caller.arguments[0]
      var touchEvent = e.touches[0]
      if (index == this.nowIndex) {
        this.endIndex = index
        this.endRange = touchEvent.pageX
      }
    },
    touchEnd(item, index, e) {
      // var e = arguments
      // var event = window.event || e.callee.caller.arguments[0]
      var touchEvent = e.touches[0]
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
    deleteBlackList() {
      this.param.type = 1;
      this.$promotionlib.updatePromotionBlacklist(this.param, (err, obj) => {
        if (err) {
          return this.$toast(err)
        }
        return this.$toast("移出成功！")
      })
    },
    removeBlackList(item, index) {
      let self = this;
      self.$modal({
        content: '确定要移出黑名单吗？',
        buttons: [
          {text: '取消', onClick: function () {}},
          {text: '确定移除',
            onClick: function () {
              self.slideAnd('right', index)
              //将禁止参活接口加入数组
              let obj = item
              console.log("移出黑名单:" + item[index].goodsId);
              self.param.goodsList = [];
              self.param.goodsList.push(item[index].goodsId);
              obj.splice(index, 1)
              //调加入黑名单接口
              self.deleteBlackList();
            }}
        ]
      });
    },
    //获取分类树
    getCategoryTree() {
      let self = this;
      this.$promotionlib.queryGoodsTypeList((err, obj) => {
        if (err) {
          return this.$toast(err)
        }
        this.categoryData = obj.typeList;
        //console.log('data -- ', JSON.stringify(obj));
      });
    },
  },
  computed: {
    isLoading() {
      console.log("this.totalPage:" + this.totalPage);
      if (this.totalPage == '1') {
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
