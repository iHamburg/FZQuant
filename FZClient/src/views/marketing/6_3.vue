<!-- 6.3 已发布上新列表 -->
<style lang="scss" src="src/sass/marketing.scss" scoped></style>
<template>
  <div class="content">

    <bl-bar barStyle="bar-dark-linear">
      <div class="button" slot="left-button" @click="goBack()">
        <div class="iconfont arrow-back"><i class="fback">返回</i></div>
      </div>
      <div slot="title">已发布内容</div>

      <div slot="right-button" class="hrad-right" @click="isEditClick" >{{editName}}</div>
    </bl-bar>
    <!--navbar -->
    <div class="mark-box">
      <bl-navbar v-model="selected" :fixed="true">
        <!--<bl-tab-item id="1" @click.native="fetchData('1')">上新</bl-tab-item>-->
        <bl-tab-item id="3" @click.native="fetchData('3')">活动</bl-tab-item>
        <bl-tab-item id="5">专题</bl-tab-item>
        <section style="width: 25%"><bl-tab-item id="4" @click.native="fetchData('4')">推荐商品</bl-tab-item></section>
        <bl-tab-item id="2" @click.native="fetchData('2')">优惠券</bl-tab-item>
      </bl-navbar>
      <!--End of navbar-->

      <!-- container-->
      <bl-tab-container v-model="selected">
        <bl-tab-container-item :id="selected">
          <!-- 商品上新 -->
          <bl-check-box v-if="selected == 1" class="check-content"  :id=item.dynamicId  v-for="(item, index) in itemGoods" >
            <span slot="check" v-show="isEdit" class="checkicon" :class="item.state"  @click="chooseAttr(index, itemGoods)">
                <i></i>
            </span>

            <div slot="check-box" class="checkbox">
              <ul>
                <li v-for="(key, val) in item.goodsList" @click.stop="pushGoods(key.goodsId)">
                  <em><img :src="key.imgUrl"></em>
                  <div class="ptext">&yen; {{ key.price }}</div>
                </li>
              </ul>
              <div class="bot" @click="pushDynamic(item.dynamicId)">发布时间 {{ item.publishedAt}} <span>查看更多 <i class="iconfont arrow-back"></i></span></div>
            </div>
          </bl-check-box>
          <!-- 优惠券-->
          <bl-check-box v-if="selected == 2" class="check-content"  v-for="(item, index) in itemCoupons">
                <span slot="check" v-show="isEdit" class="checkicon"  :class="item.state" @click="chooseAttr(index, itemCoupons)">
                    <i></i>
                </span>
            <div slot="check-box" class="checkbox">
              <div class="check-card" @click="pushCoupon(item.couponList[0].couponTemplateId)">
                <div class="card">
                  优惠券
                </div>
                <dl>
                  <dt v-if="item.couponList.length > 0">{{item.couponList[0].couponName}}</dt>
                  <dd v-if="item.couponList.length > 0">券描述：{{item.couponList[0].couponDesc}}</dd>
                  <dd v-if="item.couponList.length > 0">
                    有效期：{{item.couponList[0].enableTimeFrom}} - {{item.couponList[0].enableTimeTo}}
                  </dd>
                </dl>

              </div>
              <div class="bot">发布时间 {{ item.publishedAt}} </div>
            </div>
          </bl-check-box>

          <div v-if="topicList.length > 0">
          </div>
          <div v-else></div>

          <!-- 活动列表 -->
          <bl-check-box v-if="selected == 3" class="check-content"   v-for="(item, index) in activityList" >
            <span slot="check" v-show="isEdit" class="checkicon" :class="item.state"  @click="chooseAttr(index, activityList)">
                <i></i>
            </span>

            <div slot="check-box" class="checkbox" @click="pushActivity(item.activity.activityId)">
   <!--            <ul>
                  <em><img :src="item.activity.imgUrl" style="width:300px;height:90px;"></em>
                  <div class="ptext">{{ item.activity.title }}</div>
              </ul> -->

              <bl-cell :item="item.activity"></bl-cell>
              <div class="bot" @click="">发布时间 {{ item.publishedAt}}</div>
            </div>
          </bl-check-box>


          <!-- 推荐商品 -->
          <bl-check-box v-if="selected == 4" class="check-content"  :id=item.dynamicId  v-for="(item, index) in itemList" >
            <span slot="check" v-show="isEdit" class="checkicon" :class="item.state"  @click="chooseAttr(index, itemList)">
                <i></i>
            </span>

            <div slot="check-box" class="checkbox">
              <ul>
                <li v-for="(key, val) in item.recommGoodsList" @click.stop="pushGoods(key.goodsId)">
                  <em><img :src="key.imgUrl"></em>
                  <div class="ptext">&yen; {{ key.price }}</div>
                </li>
              </ul>
              <div class="bot" @click="pushDynamic(item.dynamicId)">发布时间 {{ item.publishedAt}} <span>查看更多 <i class="iconfont arrow-back"></i></span></div>
            </div>
          </bl-check-box>

        </bl-tab-container-item>

      </bl-tab-container>
    </div>
    <!-- End of Container -->

    <div class="editbar" v-show="isEdit" :class="{check: isAllCheck}"  >
      <span class="checkicon alldel" @click="allCheck()">
          <i></i>全选
      </span>
      <div>
        <button class="default" :class="{'del': isDel}" :disabled="!isDel" @click="onSubmit()">删除</button>
      </div>
    </div>
  </div>

</template>

<script>
  // import marketinglib from 'src/libs/marketinglib';
  import utillib from 'src/libs/utillib';
  import uiMixin from 'src/mixins/uiMixin';
export default {
    name: 'keepdynamics',
    components: {
      'BlCheckBox': () => System.import('components/cloud-merchant/check-box'),
      'BlCell': () => System.import('components/cloud-merchant/cell'),
    },
    data () {
      return {
        title: '已发布上新内容',
        selected: '1',
        goodsList: [],
        couponList: [],
        topicList: [], // 专题列表
        activityList: [],
        isEdit: false,
        isAllCheck: false, // 是否全选状态
        delArr: 0,
        itemGoods: [],
        itemCoupons: [],
        itemList: [],
      };
    },
    mixins: [uiMixin],
    created() {
      this.fetchData('1');
      this.fetchData('2');
    },

    methods: {
       //监听返回按钮 $router.go(-1)
      isEditClick() {
        this.isEdit = !this.isEdit;
        this.isAllCheck = false;
        this.delArr = 0;
        let checkall = null;
        if (this.selected == 1) {
          checkall = this.itemGoods;
        }
        if (this.selected == 2) {
          checkall = this.itemCoupons;
        }
        if (this.selected == 3) {
          checkall = this.activityList;
        }
        if (this.selected == 4) {
          checkall = this.itemList;
        }
        if (checkall === null || checkall.length === 0) {
          return;
        }
        checkall.forEach(function(item) {
          item.state = ""
        })
      },
      goBack () {
          //返回上一个页面时,清空cookie. 为什么要清空cookie？
        if (document.cookie.match(/scrollTop=([^;]+)(;|$)/) != null) {
          console.log('存在cookie :', document.cookie);
          this.deleteCookie(document.cookie);
        } else {
          console.log('不存在cookie');
        }
        this.isEdit = false;
        this.$router.go(-1);
      },

       //清楚cookie方法:为了删除指定名称的cookie，可以将其过期时间设定为一个过去的时间
      deleteCookie(name) {
        var date = new Date();
        date.setTime(date.getTime() - 10000);
        document.cookie = name + "=a; expires=" + date.toGMTString();
      },

      /**
       * 获取数据
       */
      fetchData(templateId) {
        console.log('点击', templateId)
        this.delArr = 0;
        this.isAllCheck = false;
        this.startLoading();
        this.$marketinglib.queryDynamics(templateId, (err, items) => {
          this.stopLoading();
          if (err) {
            return this.$toast(err);
          }

          items.forEach(function(item) {
            item.state = ""
          });

          if (templateId === '1') {
           // console.log('items ',items);
            items.map(function (item) {
              item.goodsList.splice(5)
            })
            this.itemGoods = items;
          } else if (templateId === '2') {
            this.itemCoupons = items;
            console.log('this.itemCoupons obj:', JSON.stringify(this.itemCoupons))
          } else if (templateId === '3') {
            this.activityList = items;
          } else if (templateId === '4') {
            // console.log('items ',items);
            items.map(function (item) {
              item.recommGoodsList.splice(5)
            })
            this.itemList = items;
          }
        });
      },

      /**
       * 跳转发布详情页
       *
       * @param id
       */
      pushDynamic(id) {
        console.log('push dynamic detail ', id);
        let scrollPos;
        if (typeof window.pageYOffset != 'undefined') {
          scrollPos = window.pageYOffset;
        } else if (typeof document.body != 'undefined') {
          scrollPos = document.getElementById(id).scrollTop;
        }
        document.cookie = "scrollTop=" + scrollPos;
        if (this.selected === '1') {
          this.$router.push({name: '6.3.1', params: {id}})
        } else if (this.selected === '4') {
          this.$router.push({name: '6.3.3', params: {id}})
        }
      },

      /**
       * 跳转商品详情页
       * @param goodsId
       */
      pushGoods(goodsId) {
        this.$router.push({name: '5.6', params: {goodsId}})
      },
      /**
       * 跳转券详情页
       **/
      pushCoupon(couponTemplateId) {
        this.$router.push({name: '3.4', params: { couponTemplateId }})
      },
      /**
       * 跳转活动详情
       **/
      pushActivity(activityId) {
        console.log('push activityId', activityId);
        this.$router.push({name: '6.5', params: { id: activityId }})
      },
      /**
       * 删除发布
      */
      onSubmit() {
        let self = this
        console.log('点击删除');
        this.$modal({
          content: '您确定删除所选内容？',
          buttons: [
            {text: '取消', onClick: function () {}},
            {text: '确定',
              onClick: function () {
                let dynamicIdList = [];
                let itemList = [];
                if (self.selected === '1') {
                  itemList = self.itemGoods;
                } else if (self.selected === '2') {
                  itemList = self.itemCoupons;
                } else if (self.selected === '3') {
                  itemList = self.activityList;
                } else if (self.selected === '4') {
                  itemList = self.itemList;
                }
                itemList.forEach(function(item) {
                  if (item.state == "check") {
                    dynamicIdList.push(item.dynamicId)
                  }
                })
                self.startLoading();
                self.$marketinglib.removeDynamics(dynamicIdList, (err) => {
                  self.stopLoading();
                  if (err) {
                    return self.$toast(err);
                  }
                  self.fetchData(self.selected);
                });
              }}

          ]
        })
      },
      /**
       * 勾选
       *
       * @param index
       * @param arrs
       */
      chooseAttr(index, arrs) {
        let state = arrs[index].state;
        if (state == "check") {
          arrs[index].state = ""
          this.delArr -= 1
        } else {
          arrs[index].state = "check"
          this.delArr += 1
        }

        //(this.delArr > 0) ? (this.isDel = true) : (this.isDel = false);
        (this.delArr === arrs.length) ? (this.isAllCheck = true) : (this.isAllCheck = false);
      },

      allCheck() {
        // if (this.delArr > 0) {
        //   (this.isDel === true) ? (this.isDel = true) : (this.isDel = false);
        // } else {
        //   (this.isDel === false) ? (this.isDel = true) : (this.isDel = false);
        // }
        // this.delArr = 0
        var checkall = null;
        if (this.selected == 1) {
          checkall = this.itemGoods;
        }
        if (this.selected == 2) {
          checkall = this.itemCoupons;
        }
        if (this.selected == 3) {
          checkall = this.activityList;
        }
        if (this.selected == 4) {
          checkall = this.itemList;
        }
        if (checkall === null || checkall.length === 0) {
          return;
        }
        let check = this.isAllCheck;

        if (check == false) {
          this.isAllCheck = true
          //this.isDel = true;
          checkall.forEach(function(item) {
            item.state = "check"
          })
          this.delArr = checkall.length;
        } else {
          this.isAllCheck = false
          //this.isDel = false;
          checkall.forEach(function(item) {
            item.state = ""
          })
          this.delArr = 0;
        }
      }
    },
    watch: {

    },

    // filters: {
    //   fmtDate: function (value) {
    //     // let str = utillib.fmtDate(new Date(value), 'yyyy-MM-dd')
    //     return utillib.fmtDate(new Date(value.replace(/-/g, "/")), 'yyyy-MM-dd')
    //   }
    // },

    computed: {
      editName () {
        console.log(this.isEdit)
        if (this.isEdit) {
          return '完成'
        } else {
          return '编辑'
        }
      },
      isDel () {
        return this.delArr > 0;
      }
    },
    activated() {
      console.log('activated');
      this.fetchData('1');
      this.fetchData('2');
      //判断是否存在cookie.
      if (document.cookie.match(/scrollTop=([^;]+)(;|$)/) != null) {
        let arr = document.cookie.match(/scrollTop=([^;]+)(;|$)/);
        console.log('页面定位的位置:', arr[1]);
        setTimeout(function() {
          window.scrollTo(0, arr[1])
        }, 100);
      }
    },

};
</script>
