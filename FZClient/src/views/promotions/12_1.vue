<!--促销活动列表-->
<style lang="scss" src="src/sass/promotion.scss" scoped></style>
<style lang="scss" src="src/sass/scrollList.scss" scoped></style>
<template>
  <div class="content-promo">
    <bl-bar barStyle="bar-dark-linear">
      <div class="button" slot="left-button" @click="$router.go(-1)">
        <div class="iconfont arrow-back"></div><i class="fback">返回</i>
      </div>
      <div slot="title">促销活动列表</div>
    </bl-bar>

    <div class="scrollList">
      <div class="top">
        <!-- header-menu -->
        <div class="header-menu" >
          <!-- 手工设置tabbar的宽度， 动态影响到item的宽度-->
          <section>
            <bl-navbar v-model="tabIndex">
              <bl-tab-item v-for="item in tabItemData" :id="item.index">{{item.text}}</bl-tab-item>
            </bl-navbar>
          </section>
        </div>
      </div>
      <!-- tab-content -->
      <bl-scroll :enableRefresh="true" :onRefresh="onRefresh" :on-infinite="onInfinite" :enableInfinite="isLoading" v-scroll-record>
        <bl-tab-container v-model="tabIndex">
          <!-- 动态载入一栏页面 -->
          <bl-tab-container-item :id="tabIndex">
            <dl v-for="item in items" @click="pushDetails(item)">
              <dt>
                <i v-if="item.promotionType == 1" class="te" >特</i>
                <!--0满额减｜1满件折｜2直降｜3指定折 ）-->
                <i v-if="item.typeId == 0">减</i>
                <i v-if="item.typeId == 1">折</i>
                <i v-if="item.typeId == 2">直</i>
                <i v-if="item.typeId == 3">指</i>
              <h2 >{{ item.title }}</h2>
              <!-- {0:待审核 1:进行中 2:已过期 3:审核不通过 4:待进行 all:全部}-->
              <span v-if="item.status == 1" class="ing">进行中</span>
              <span v-if="item.status == 0" class="pending">待审核</span>
              <span v-if="item.status == 4" class="pending">待开始</span>
              <span v-if="item.status == 3" class="notpass">审核不通过</span>
              <span v-if="item.status == 2" class="expir">已失效</span>
              </dt>
              <dd>
                <div class="box">{{ item.content }}
                </div>
                <div class="iconfont arrow-back"></div>
              </dd>
              <dd>有效期：{{ item.beginAt }} 至 {{ item.endAt }}</dd>
            </dl>
            <div v-if="display" class="order-box">
              <img src="static/images/Rectangle37@2x.png" class="nodata">
            </div>
          </bl-tab-container-item>
        </bl-tab-container>
      </bl-scroll>
      <button class="promotion-button" @click="$router.push({name:'12.2'})" style="position:absolute"><i></i><span>创建促销活动</span></button>
    </div>
  </div>
</template>

<script>
  import uiMixin from 'src/mixins/uiMixin';
  export default {
    name: 'keepPromotionList',
    mixins: [uiMixin],
    components: {
      'BlCell': () => System.import('components/cloud-merchant/aftersale-cell-new'),
    },
    data () {
      return {
        tabIndex: 'all',  //status: {0:待审核 1:进行中 2:已过期 3:审核不通过 4:待进行 all:全部}
        tabItemData: [
          {
            index: 'all',
            text: '全部',
          },
          {
            index: '1',
            text: '进行中'
          },
          {
            index: '0',
            text: '待审核'
          },
          {
            index: '4',
            text: '待开始'
          },
          {
            index: '3',
            text: '不通过'
          },
          {
            index: '2',
            text: '已失效'
          },
        ],
        totalPage: 0,
        pageNo: 1,
        pageSize: 10,
        items: [],
        display: false,
      };
    },
    activated() {
      console.log('===========activated');
      document.body.scrollTop = 0

      let status = Number(this.$route.params.status);
      console.log('status ', status);
      if (status) {
        // console.log('if 通过')
        this.tabIndex = status;
      } else {
        // console.log('if 不通过')
        this.initialize()
        this.updateData();
      }
    },
    methods: {
      /**
       * 下拉刷新
       */
      onRefresh (done) {
        this.initialize()
        this.updateData(done);
      },
      /** 上拉更多
       */
      onInfinite (done) {
        this.pageNo ++
        this.updateData(done);
      },
      /**
       * 初始化数据
       */
      initialize () {
        this.items = [] // 清空数据
        this.pageNo = 1 // 默认查询第一页
      },
      /**
       * 获取数据，插入
       */
      updateData(done) {
        console.log('======更新数据')
        let params = {
          pageNo: this.pageNo,
          pageSize: this.pageSize,
        }

        if (this.tabIndex != -1) {
          params.status = this.tabIndex;
        }
        this.$promotionlib.queryPromotionList(params, (err, obj) => {
          if (done) {
            done()
          }
          if (err) {
            return this.$toast(err)
          }
          // 没有数据
//          console.log('obj', JSON.stringify(obj));
          this.totalPage = obj.totalPage;
          obj.list.map(item => {
            item.beginAt = this.$utillib.fmtDate(new Date(item.beginAt.replace(/-/g, "/")), 'yyyy-MM-dd');
            item.endAt = this.$utillib.fmtDate(new Date(item.endAt.replace(/-/g, "/")), 'yyyy-MM-dd');
          })
          this.items = this.items.concat(obj.list) // 追加数据

          // 当数据为空时显示空图片
          if (this.items.length <= 0) {
            this.display = true
          } else {
            this.display = false
          }
        })
      },
      pushDetails(item) {
        this.$router.push({name: '12.2.1.2', params: {id: item.activityId}})
      },
    },
    watch: {
      tabIndex: function (newVal) {
        //修改了tab之后，数据重新刷新
        this.tabIndex = newVal;
        this.initialize()
        this.updateData();
      },

    },
    computed: {
      isLoading() {
        if (this.totalPage == 1) {
          return false
        }
        if (this.pageNo >= this.totalPage) {
          return false
        }
        return true
      },
//      displayedItems() {
//        let arr = this.$_.map(this.items, (item) => {
//          return item
//        })
//        console.log('displayed items ', arr);
//      }
    }

  };
</script>
