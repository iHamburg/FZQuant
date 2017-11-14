
<style lang="scss" src="src/sass/boundGoods.scss" scoped></style>
<template>
  <div class="content-bound"  :class="{'white': goodsList.length == 0, 'hidden':isHidden}">
    <!--右侧筛选栏-->
    <bl-popup v-model="menulist" position="right" class="menulist" >
      <bl-right-menu  ref="rightmenu" v-on:child-say="listenToMyBoy" :categoryData="categoryData"></bl-right-menu>
    </bl-popup>
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
              <div class="checkbox" v-for="(item, index) in goodsList" @touchstart="touchStart(item, index)" @touchmove="touchMove(item, index)" @touchend="touchEnd(item, index)">
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
                      <span class="no" @touchstart="removeAllAct(goodsList, index)">禁止参活</span>
                      <span @touchstart="removeAct(goodsList, index)">移出活动</span>
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
      <bl-button @click="submit()">添加参活商品</bl-button>
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
    this.getCategoryTree();
    this.pageType = this.$route.params.pageType;
    document.body.scrollTop = 0
  },
  mounted() {
    console.log('mounted');
    console.log("pro " + this.$route.params);
    if (this.$route.params.id) {
      this.queryParam.promotionId = this.$route.params.id;
      console.log("promotionId: " + this.queryParam.promotionId);
    }
    this.initialize();
    this.updateData();
  },
  activated() {
    console.log('activated')
    if (this.$route.params.id) {
      this.queryParam.promotionId = this.$route.params.id;
      console.log("promotionId: " + this.queryParam.promotionId);
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
      itemcards: [
        {
          "url": "static/images/s_01.png",
          "title": "CHOCOOLATE 拼色POLO衫 CHOCOOLATE 拼色POLO衫",
          "no": "3455567678889",
          "price": "366.00",
          "sale": "166.00",
          "state": true
        },
        {
          "url": "static/images/s_01.png",
          "title": "CHOCOOLATE 拼色POLO衫 CHOCOOLATE 拼色POLO衫",
          "no": "3455567678889",
          "price": "366.00",
          "sale": "166.00",
          "state": false
        },
        {
          "url": "static/images/s_02.png",
          "title": "CHOCOOLATE 拼色POLO衫 CHOCOOLATE 拼色POLO衫",
          "no": "3455567678889",
          "price": "366.00",
          "sale": "166.00",
          "state": false
        },
        {
          "url": "static/images/s_01.png",
          "title": "CHOCOOLATE 拼色POLO衫 CHOCOOLATE 拼色POLO衫",
          "no": "3455567678889",
          "price": "366.00",
          "sale": "166.00",
          "state": false
        },
        {
          "url": "static/images/s_01.png",
          "title": "CHOCOOLATE 拼色POLO衫 CHOCOOLATE 拼色POLO衫",
          "no": "3455567678889",
          "price": "366.00",
          "sale": "166.00",
          "state": false
        },
        {
          "url": "static/images/s_01.png",
          "title": "CHOCOOLATE 拼色POLO衫 CHOCOOLATE 拼色POLO衫",
          "no": "3455567678889",
          "price": "366.00",
          "sale": "166.00",
          "state": false
        }
      ],
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
        promotionId: ''
      },
      blackListParam: {
        merchantId: '',
        memberId: '',
        goodsList: [],
        type: 2
      },
      activityGoodsParam: {
        merchantId: '',
        memberId: '',
        goodsId: '',
        activityId: ''
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
    updateData(done) {
      //this.startLoading()
      this.$promotionlib.queryPromotionGoodsList(this.queryParam, (err, obj) => {
        //this.stopLoading()
        if (done) {
          done()
        }
        if (err) {
          return this.$toast(err)
        }
        this.totalPage = obj.totalPage;
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
        this.goodsList = this.goodsList.concat(obj.goodsList) // 追加数据
        console.log('goodsList ', JSON.stringify(obj));
        // 当数据为空时显示图片
        if (this.goodsList.length == 0) {
          this.display = true
        } else {
          this.display = false
        }
      })
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
    removeboundpromotionGoods() {
      this.activityGoodsParam.activityId = this.queryParam.promotionId;
      this.$promotionlib.removeboundpromotionGoods(this.activityGoodsParam, (err, obj) => {
        if (err) {
          return this.$toast(err)
        }
        return this.$toast("成功移出")
      })
    },
    removeAct(item, index) {
      let self = this;
      self.$modal({
        content: '确定从该活动商品列表中移出吗？',
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
              //调加入黑名单接口
              self.removeboundpromotionGoods();
            }}
        ]
      });
    },
    insertBlackList() {
      this.blackListParam.type = 0;
      this.$promotionlib.updatePromotionBlacklist(this.blackListParam, (err, obj) => {
        if (err) {
          return this.$toast(err)
        }
        return this.$toast("已放入活动黑名单商品列表");
      })
    },
    removeAllAct(item, index) {
      let self = this;
      self.$modal({
        content: '确定禁止该商品参与任何促销吗？禁止后需要解禁后才能再次绑定',
        buttons: [
          {text: '取消', onClick: function () {}},
          {text: '确定移除',
            onClick: function () {
              self.slideAnd('right', index)
              //将禁止参活接口加入数组
              let obj = item
              console.log("禁止参活" + obj[index].goodsId)
              self.blackListParam.goodsList = [];
              self.blackListParam.goodsList.push(item[index].goodsId);
              obj.splice(index, 1)
              //调加入黑名单接口
              self.insertBlackList();
            }}
        ]
      });
    },
    submit() {
      this.menulist = true;
      this.$refs.rightmenu.open();
      console.log('点弹出添加活动边框');
      this.isHidden = true
    },
    // 侧边栏返回方法。
    listenToMyBoy(data) {
      this.menulist = false;
      this.isHidden = false;
      if (data == null) {
        if (this.pageType == 2 || this.pageType == 3) {
          this.$router.go(-1);
        }
        return;
      }
      if (this.pageType == 2) {
        if (data.type == '1') {
          this.$router.go(-1);
          this.$toast('未选择分类')
        } else if (data.type == '2') {
          let param = {activityId: this.queryParam.promotionId, typeList: data.param, goodsList: [], bindingType: 1};
          this.$promotionlib.addBoundActivitiedGoods(param, (err, obj) => {
            if (err) {
              return this.$toast(err)
            }
            if (obj.count == 'undefined') {
              this.$toast('绑定分类商品成功')
            } else {
              this.$toast('绑定成功 ' + obj.count + ' 件')
            }
            this.$router.go(-1);
          });
        }
      } else if (this.pageType == 3) {
        if (data.type == '1') {
          this.$router.go(-1);
          this.$toast('未选择分类')
        } else if (data.type == '2') {
          let self = this;
          self.pageType = 1;
          window.setTimeout(function () {
            self.$router.push({name: '12.2.5.4', params: {categoryIds: data.param, activityId: self.queryParam.promotionId}});
          }, 300);
        }
      } else {
        if (data.type == '1') {
          this.$toast('您未选择任何分类')
        } else if (data.type == '2') {
          let self = this;
          window.setTimeout(function () {
            self.$router.push({name: '12.2.5.4', params: {categoryIds: data.param, activityId: self.queryParam.promotionId}});
          }, 300);
        }
      }
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
        if (this.pageType == 2 || this.pageType == 3) {
          this.submit();
        }
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
