<!--售后单列表-->
<style lang="scss" src="src/sass/allorders.scss" scoped></style>

<template>
  <div class="content">
    <bl-bar barStyle="bar-dark-linear">
      <div class="button" slot="left-button" @click="$router.go(-1)">
        <div class="iconfont arrow-back"><i class="fback">返回</i></div>
      </div>
      <div slot="title">全部售后单</div>
    </bl-bar>
    <!-- End of Bar-->
    <div class="allorder">
      <div class="top">
        <!-- header-menu -->
        <div class="header-menu" >
          <!-- 手工设置tabbar的宽度， 动态影响到item的宽度-->
          <section style="width:140%">
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
            <bl-cell v-for="item in items" :item="item" @click.native="pushDetails(item)"></bl-cell>
            <div v-if="display" class="order-box">
              <img src="static/images/Rectangle37@2x.png" class="nodata">
            </div>
          </bl-tab-container-item>
        </bl-tab-container>
      </bl-scroll>
    </div>
  </div>
</template>

<script>
  import uiMixin from 'src/mixins/uiMixin';
  export default {
    name: 'keepAftersalesList',
    mixins: [uiMixin],
    components: {
      'BlCell': () => System.import('components/cloud-merchant/aftersale-cell-new'),
    },
    data () {
      return {
        tabIndex: null,  //0:草稿,1:带审核,2:上线中,3:审核不通过,4:已下线
        tabItemData: [
          {
            index: '-1',
            text: '全部',
          },
          {
            index: '0',
            text: '申请中'
          },
          {
            index: '1',
            text: '待退回'
          },
          {
            index: '2',
            text: '中止受理'
          },
          {
            index: '3',
            text: '退货中'
          },
          {
            index: '4',
            text: '退款中'
          },
          {
            index: '5',
            text: '已退款'
          }
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
      let status = this.$route.params.status;
      console.log('status ', status);
      if (status) {
        this.tabIndex = status;
      } else {
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
        this.$aftersaleslib.queryList(params, (err, obj) => {
          if (done) {
            done()
          }
          if (err) {
            return this.$toast(err)
          }
          // 没有数据
          console.log('obj', JSON.stringify(obj));
          this.totalPage = obj.totalPage;
          this.items = this.items.concat(obj.saleAfterList) // 追加数据
          // 当数据为空时显示图片
          if (this.items.length <= 0) {
            this.display = true
          } else {
            this.display = false
          }
          // console.log('items ', this.items);
        })
      },
      pushDetails(item) {
        this.$router.push({name: '10.2.1', params: {id: item.saleAfterId}})
      }
    },
    watch: {
      tabIndex: function (newVal) {
        //修改了tab之后，数据重新刷新
        console.log('tabIndex is changed ', newVal);
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
