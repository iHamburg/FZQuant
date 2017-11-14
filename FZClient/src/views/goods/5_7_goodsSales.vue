<template>
  <div class="content">

    <bl-bar barStyle="bar-dark-linear">
      <div class="button" slot="left-button" @click="gotoIndex">
        <div class="iconfont arrow-back"><i class="fback">返回</i></div>
      </div>
      <div slot="title" @click="onPopTopMenu">{{title}}<i></i></div>
      <i slot="right-button" class="icon iconfont more-v"></i>
    </bl-bar>

    <!--顶部menu下拉栏-->
    <bl-popup v-model="isTopMenuPopup" position="top" style="width: 100%;" v-for="item in items">
      <bl-top-menu @confirm="onTopMenuConfirm" :itemData="item"></bl-top-menu>
    </bl-popup>

    <!--右侧筛选栏-->
    <bl-popup v-model="menulist" position="right" class="menulist" >
      <bl-right-menu  ref="rightmenu" v-on:child-say="listenToMyBoy"></bl-right-menu>
    </bl-popup>

    <div class="navbar-box">
      <bl-navbar v-model="selected">
        <bl-tab-item id="1">最新</bl-tab-item>
        <!-- <bl-tab-item id="3">销量</bl-tab-item> -->
        <bl-tab-item id="2" @click.native="isCheckFunction">价格<div ><i class="pcreen" :class="{dcreen:isCheck}"></i></div></bl-tab-item>
        <div class="tab-item" @click="rightmenu()">
            <div class="tab-item-text hairline">筛选<i class="screen"></i></div>
        </div>
      </bl-navbar>
      <bl-scroll :enableRefresh="true" :onRefresh="onRefresh" :on-infinite="onInfinite" :enableInfinite="isLoading">
      <bl-tab-container v-model="selected">
        <bl-tab-container-item id="1">
            <div class="salescard" v-for="item in goodsList">
                <bl-batch-card :itemData="item" @click.native="findgoodsDetail(item)"></bl-batch-card>
            </div>
        </bl-tab-container-item>
        <bl-tab-container-item id="2">
            <div class="salescard" v-for="item in goodsList">
                <bl-batch-card :itemData="item" @click.native="findgoodsDetail(item)"></bl-batch-card>
            </div>
        </bl-tab-container-item>
        <bl-tab-container-item id="3">
            <div class="salescard" v-for="item in goodsList">
                <bl-batch-card :itemData="item" @click.native="findgoodsDetail(item)"></bl-batch-card>
            </div>
        </bl-tab-container-item>

      </bl-tab-container>
      </bl-scroll>
    </div>


  </div>
</template>

<script>
  //import utils from 'src/utils';
  import networklib from 'src/libs/networklib';
  import merchantlib from 'src/libs/merchantlib';
  import uiMixin from 'src/mixins/uiMixin';
  //import _ from 'underscore';

export default {
    name: 'keepGoodSales',
    components: {
      'BlCouponCard': () => System.import('components/cloud-merchant/coupon-card'),
      'BlBatchCard': () => System.import('components/cloud-merchant/batch-card'),
      'BlTopMenu': () => System.import('components/cloud-merchant/top-menu'),
      'BlRightMenu': () => System.import('components/cloud-merchant/right-menu')
    },

    data () {
      return {

        merchantId: null,
        title: '全部商品',
        items: [
            {state0: '', state1: '', state2: '', state3: '', state4: '', state5: ''}
        ],
        selected: '1',
        menulist: false,
        isCheck: false,
        goodsList: [], // 商品列表
        isTopMenuPopup: false,
        isLoading: true,

        queryParam: {
          // goodsState:null,
          merchantId: '',
          sortord: '1',
          pageSize: 20,
          pageNo: 1,
        },
        count: 0,
        totalPage: 0,
      }
    },

    created() {
      this.merchantId = merchantlib.getMerchantId();
      this.queryParam.merchantId = merchantlib.getMerchantId();
    },

    activated() {
      // console.log('activated');
      this.updateData();
    },

    mounted() {

      // console.log('mounted');

    },

    mixins: [uiMixin],

    methods: {

      onRefresh (done) {
        console.log('refresh 下拉刷新')

        this.initialize()
        this.updateData();
        done();
      },

      onInfinite (done) {
        console.log('infinite 加载更多  this.isLoading', this.isLoading)

        // DONE 没有数据时改为false
        if (this.queryParam.pageNo >= this.totalPage) {
          console.log('没有更多数据啦')
          this.$toast({
            message: '没有更多数据啦',
            position: 'bottom',
          })
          this.isLoading = false
          done()
        } else {
          this.queryParam.pageNo ++;

          this.updateData(done);
        }
      },

      // 初始化数据
      initialize () {
        this.goodsList = []; // 清空goodsList
        this.queryParam.pageNo = 1 // 默认查询第一页
      },

      findgoodsDetail(item) {
        console.log('跳转到商品详情:' + item.goodsId);
        this.$router.push({path: '/goods', query: {goodsId: item.goodsId}});
      },

      rightmenu() { // 筛选按钮
        this.menulist = true;
        this.$refs.rightmenu.open();
      },

      listenToMyBoy(data) {
        this.menulist = data;
      },

    /**
     * 打开topmenu
     */
      onPopTopMenu() {
        // console.log('点击i顶部按钮');
        this.isTopMenuPopup != this.isTopMenuPopup;
        if (this.isTopMenuPopup) {
          let self = this;
          this.startLoading();
          this.queryMenuCount(function (err) {
            self.stopLoading();
            if (err) {
              self.$toast({
                message: '服务器载入失败:' + err,
              });
            }
          });
        }
      },

      /**
       * 更新数据
       * UI + Data
       */
      updateData(done) {
        let self = this;
        this.queryData(done, function (err) {
          if (err) {
            self.isLoading = false
            self.$toast({
              message: err,
            });
          }
        });
      },

      /**
       *
       * 点击价格排序
       */
      isCheckFunction() {
        this.isCheck != this.isCheck;
        if (this.isCheck) {
          this.queryParam.sortord = 3;
        } else {
          this.queryParam.sortord = 2;
        }
        // 初始化数据
        this.initialize()

        this.updateData();
      },

      /**
       *
       * 用户点击顶部menubar，切换商品状态
       *
       * @param data {id: "5", title: "全部商品"}
       */
      onTopMenuConfirm(data) {
        console.log('点击顶部menubar', data);
        // 初始化数据
        this.initialize()

        this.title = data.title;
        this.isTopMenuPopup != this.isTopMenuPopup;

        this.queryParam.goodsState = data.id;

        //如果全部商品，需要删除接口入参的goodsState键值
        if (this.queryParam.goodsState == '5') {
          delete (this.queryParam.goodsState);
        }
        console.log('点击顶部menubar,查询入参', this.queryParam)
        this.updateData();
      },

      /**
       * 获取商品数量
       */
      queryMenuCount(callback) {
        let apiId = '1014';
        let queryParam = { merchantId: this.merchantId };
        networklib.post(apiId, queryParam).then((obj) => {
          console.log('成功的回调', obj);
          let item = obj.list;
          for (let i = 0; i < 6; i++) {
            if (item[i].name == '0') {
              this.items[0].state0 = item[i].num;
            } else if (item[i].name == '1') {
              this.items[0].state1 = item[i].num;
            } else if (item[i].name == '2') {
              this.items[0].state2 = item[i].num;
            } else if (item[i].name == '3') {
              this.items[0].state3 = item[i].num;
            } else if (item[i].name == '4') {
              this.items[0].state4 = item[i].num;
            } else if (item[i].name == '5') {
              this.items[0].state5 = item[i].num;
            }
          }
          callback();
        }, (err) => {
          console.log('失败的回调', apiId, err);
          callback('服务器访问失败' + err);
        });
      },

      /**
       * 获取数据
       * @param callback
       */
      queryData(done, callback) {
        this.startLoading();
        console.log('queryParam ', this.queryParam);
        let apiId = '1011'
        networklib.post(apiId, this.queryParam).then((obj) => {
          console.log('成功的回调', obj);
          this.stopLoading();
          if (done) {
            done()
          }
          if (this.queryParam.pageNo == 1) {
            console.log('===============', this.queryParam.pageNo)
            this.isLoading = true
          }

          this.count = obj.count;
          this.goodsList = this.goodsList.concat(obj.list);
          callback();
        }, (err) => {
          this.stopLoading();
          if (done) {
            done()
          }
          console.log('失败的回调 1011', err);
          callback('连接超时，请稍后再试');
        });
      },
      gotoIndex() {
        this.$router.push({path: '/cloudStoreIndex'})
      }
    },

    watch: {
      selected: function (newVal) {
        console.log('点击navbar ', newVal);
        if (newVal == '1') {
          //最新
          this.queryParam.sortord = '1';
          this.updateData();
        }
      },
      count: function (newVal) {
        // console.log('总数更新了',newVal)
        // console.log('结果总数：',this.count)
        if (newVal > 0) {
          //this.totalPage = (this.count + this.queryParam.pageSize -1 ) / this.queryParam.pageSize;
        }
      // console.log('总页数',this.totalPage)
      },
    },

    computed: {
      source() {
        return 'source';
      },
    },

    beforeRouteEnter (to, from, next) {
      next(vm => {
        // 通过 `vm` 访问组件实例
        // console.log('before Route Enter from',from,' to ',to);
        if (from.name == '2') {
          console.log('从首页进来的');
          if (vm.queryParam.goodsState == '5') {
            delete (vm.queryParam.goodsState);
          }
          // 默认展示
          // vm.selected = '1'
          // vm.title = '123456'
          //vm.updateData()
        }
      })
    },

}
</script>
