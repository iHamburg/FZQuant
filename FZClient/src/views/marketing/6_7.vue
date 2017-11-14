<!--活动列表-->
<style lang="scss" src="src/sass/scrollList.scss" scoped></style>
<!--<style lang="scss" src="src/sass/allorders.scss" scoped></style>-->

<template>
  <div class="content">
    <bl-bar barStyle="bar-dark-linear">
    <div class="button" slot="left-button" @click="$router.go(-1)">
      <div class="iconfont arrow-back"><i class="fback">返回</i></div>
    </div>
    <div slot="title">全部活动</div>
    </bl-bar>
    <!-- End of Bar-->

    <div class="scrollList">
      <div class="top">
        <!-- header-menu -->
        <div class="header-menu">
          <!-- 手工设置tabbar的宽度， 动态影响到item的宽度-->
          <section style="width:160%">
            <bl-navbar v-model="tabIndex">
              <bl-tab-item v-for="item in tabItemData" :id="item.index">{{item.text}}</bl-tab-item>
            </bl-navbar>
          </section>
        </div>
      </div>
      <!-- tab-content -->
      <bl-scroll :enableRefresh="true" :onRefresh="onRefresh" :on-infinite="onInfinite" :enableInfinite="isLoading" v-scroll-record>
        <bl-tab-container v-model="tabIndex" class="tab-box">
          <!-- 动态载入一栏页面 -->
          <bl-tab-container-item :id="tabIndex">
            <bl-cell v-for="item in items" :item="item" @click.native="pushDetails(item)"></bl-cell>
            <div v-show="display">
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
    name: 'keepActivities',
    mixins: [uiMixin],
    components: {
      'BlCell': () => System.import('components/cloud-merchant/cell'),
    },
    data () {
      return {
        tabIndex: '0',  //0:草稿,1:带审核,2:上线中,3:审核不通过,4:已下线
        tabItemData: [
          {
            index: '0',
            text: '草稿'
          },
          {
            index: '1',
            text: '待审核'
          },
          {
            index: '6',
            text: '待上线'
          },
          {
            index: '2',
            text: '上线中'
          },
          {
            index: '3',
            text: '审核不通过'
          },
          {
            index: '4',
            text: '已下线'
          },
          {
            index: '5',
            text: '已过期'
          },
        ],
        totalPage: 0,
        pageNo: 1,
        pageSize: 10,
        items: [],
        display: false,
      };
    },
    created() {
      // this.tabIndex = 0;
    },
    activated() {
      console.log('activated:', this.tabIndex);
      // this.tabIndex = 0;
      this.initialize()
      this.updateData()
    },
    methods: {
      /**
       * 下拉刷新
       */
      onRefresh (done) {
        console.log('refresh 下拉刷新')
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
        console.log('查询this.tabIndex：', this.tabIndex)
        this.startLoading()
        let params = {
          pageNo: this.pageNo,
          pageSize: this.pageSize,
          activityState: this.tabIndex
        }

        console.log('params ', JSON.stringify(params));
        this.$activitylib.queryActivityList(params, (err, obj) => {
          this.stopLoading()
          if (done) {
            done()
          }
          if (err) {
            return this.$toast(err)
          }
          // 没有数据
          console.log('obj', obj);

          this.totalPage = obj.totalPage;
          this.items = this.items.concat(obj.activityList) // 追加数据
          if (this.items.length > 0) {
            this.display = false
          } else {
            this.display = true
          }
          console.log('活动列表 items ：', JSON.stringify(this.items));
        })
      },
      pushDetails(item) {
        this.$router.push({name: '6.5', params: {id: item.activityId}})
      }
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
//      },
    }

  };
</script>
