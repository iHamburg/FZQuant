<style lang="scss" src="src/sass/goodsManage.scss" scoped></style>
<template>
  <div class="content">

    <bl-bar barStyle="bar-dark-linear" style="z-index:9999;">
      <div class="button" slot="left-button" @click="onBack()">
        <div class="iconfont arrow-back"><i class="fback">返回</i></div>
      </div>
      <div slot="title" @click="onPopTopMenu">{{title}}<i></i></div>
      <div v-if="isBatchAuditGoods" slot="right-button" class="button" @click="onBatch(queryParam.goodsState)">
        <p>批量审核</p>
      </div>
      <div v-if="isBatchSubmitGoods" slot="right-button" class="button" @click="onBatch(queryParam.goodsState)">
        <p>批量提审</p>
      </div>
      <div v-if="isBatchDeleteGoods" slot="right-button" class="button" @click="onBatch(queryParam.goodsState)">
        <p>批量删除</p>
      </div>
    </bl-bar>

    <!--顶部menu下拉栏-->
    <mt-popup v-model="isTopMenuPopup" position="top" style="width: 100%;top: 0.88rem;" v-for="item in items">
      <bl-top-menu @confirm="onTopMenuConfirm" :itemData="item"></bl-top-menu>
    </mt-popup>

    <!--右侧筛选栏-->
    <bl-popup v-model="menulist" position="right" class="menulist" >
      <bl-right-menu  ref="rightmenu" v-on:child-say="listenToMyBoy"></bl-right-menu>
    </bl-popup>

    <div class="navbar-box" v-if="itemcards">

      <bl-navbar v-model="selected">
        <bl-tab-item id="1">最新</bl-tab-item>
        <bl-tab-item id="2" @click.native="isCheckFunction">价格<div ><i class="pcreen" :class="{dcreen:isCheck}"></i></div></bl-tab-item>
        <!--<div class="tab-item" @click="rightmenu()">-->
          <!--<div class="tab-item-text hairline">筛选<i class="screen"></i></div>-->
        <!--</div>-->
      </bl-navbar>

      <bl-scroll :enableRefresh="true" :onRefresh="onRefresh" :on-infinite="onInfinite" :enableInfinite="isLoading" v-scroll-record>
          <bl-tab-container v-model="selected">
            <bl-tab-container-item id="1">
              <div class="salescard" v-for="item in itemcards" >
                <bl-mbatch-card v-if="isManager" :itemData="item" @click.native="pushGoodsDetail(item)"></bl-mbatch-card>
                <bl-batch-card v-else :itemData="item" @click.native="pushGoodsDetail(item)"></bl-batch-card>
              </div>
            </bl-tab-container-item>

            <bl-tab-container-item id="2">
              <div class="salescard" v-for="item in itemcards">
                <bl-mbatch-card v-if="isManager" :itemData="item" @click.native="pushGoodsDetail(item)"></bl-mbatch-card>
                <bl-batch-card v-else :itemData="item" @click.native="pushGoodsDetail(item)"></bl-batch-card>
              </div>
            </bl-tab-container-item>
          </bl-tab-container>

        <div v-if="display">
          <img src="static/images/Rectangle37@2x.png" class="nodata">
        </div>
      </bl-scroll>

    </div>
    <!--<div class="modal-bg" v-if="isTopMenuPopup" @click="isTopMenuPopup = !isTopMenuPopup"></div>-->
  </div>

</template>

<script>
  import networklib from 'src/libs/networklib';
  import merchantlib from 'src/libs/merchantlib';
  import uiMixin from 'src/mixins/uiMixin';
  import utils from 'src/utils';
  import BlRightMenu from 'src/components/cloud-merchant/right-menu';
//  import jsbridge from 'src/mixins/jsbridge';

  export default {
    name: 'keepGoodsManage',

    components: {
      BlRightMenu,
      'BlCouponCard': () => System.import('components/cloud-merchant/coupon-card'),
      'BlMbatchCard': () => System.import('components/cloud-merchant/mbatch-card'),
      'BlBatchCard': () => System.import('components/cloud-merchant/batch-card'),
      'BlTopMenu': () => System.import('components/cloud-merchant/top-menu')
    },

    data () {
      return {
        count: 0,
        totalPage: 0,
        isLoading: true,
        isTopMenuPopup: false,
        display: false,
        isCheck: false,
        menulist: false,
        selected: '1',
        title: '待审核',
        state: '',
        items: [
          {state0: '', state1: '', state2: '', state3: '', state4: '', state5: ''}
        ],
        itemcards: [],  // 商品列表数据

        queryParam: {
          goodsState: 1,
          merchantId: '',
          sortord: '1',
          pageSize: '20',
          pageNo: '1',

        },
        merchantId: null,
        loading: true,
        routerName: '5.8',
        isManager: true,
        fromName: 0,
      }
    },
    created() {
      console.log('==============create');
      if (this.$route.query.goodsState) {
        this.queryParam.goodsState = this.$route.query.goodsState;
      }
      if (this.$route.query.title) {
        this.title = this.$route.query.title;
      }
      document.body.scrollTop = 0
    },
    // 商详页返回，刷数据
    activated() {
      console.log('==============actived');
      let flag = utils.storageGet('flag');
      // console.log('storageGet', flag)
      if (flag === '1') {
        utils.storageRemove('flag');
        console.log('从首页进来或商品back')
        if (merchantlib.getRoleId() == 8) {
          console.log('店员登入 ：', merchantlib.getRoleId(), merchantlib.getMerchantId())
          this.title = '全部商品'
          this.queryParam.goodsState = '5'
        } else {
          console.log('店长登入', merchantlib.getRoleId(), merchantlib.getMerchantId())
          this.title = '待审核'
          this.queryParam.goodsState = '1'
        }
        if (this.$route.query.goodsState) {
          this.queryParam.goodsState = this.$route.query.goodsState;
        }

        if (this.$route.query.title) {
          this.title = this.$route.query.title;
        }

        if (!this.queryParam.goodsState) {
          this.queryParam.goodsState = 5;
        }
      } else if (flag === '4') {
        this.title = '待审核'
        this.queryParam.goodsState = '1'
      } else if (flag === '3') {
        this.title = '审核不通过'
        this.queryParam.goodsState = '4'
      }

      this.isManager = merchantlib.isManager()
      this.merchantId = merchantlib.getMerchantId();
      this.queryParam.merchantId = merchantlib.getMerchantId();

      this.initialize();
      console.log("flag: " + flag);

      // if (this.$route.query.goodsState) {
      //   this.queryParam.goodsState = this.$route.query.goodsState;
      // }

      // if (this.$route.query.title) {
      //   this.title = this.$route.query.title;
      // }

      // if (!this.queryParam.goodsState) {
      //   this.queryParam.goodsState = 5;
      // }
      if (!this.queryParam.goodsState) {
        this.queryParam.goodsState = '5';
      }

      let param = {id: this.queryParam.goodsState, title: this.title}
      console.log("=====" + this.queryParam.goodsState);
      this.onTopMenuCreate(param);
    },
    mixins: [ uiMixin ],

    methods: {
      onBack() {
        console.log('onBack');
        this.$router.go(-1)
      },
      // 批量审核
      onBatch (goodsState) {
        console.log('onBatch', this.title)

        this.$router.push({'name': '5.9', params: {goodsState: goodsState}})
      },

      onRefresh (done) {
        this.initialize()
        this.updateData(done);
      },

      onInfinite (done) {
        console.log('infinite 加载更多  this.isLoading', this.isLoading)

        // DONE 没有数据时改为false
        // console.log('比较结果', this.queryParam.pageNo, this.totalPage)

        if (this.queryParam.pageNo >= this.totalPage) {
          console.log('没有更多数据啦')
          this.$toast({
            message: '没有更多数据啦',
            position: 'bottom',
          })
          this.isLoading = false

          done()
        } else {
//          console.log('before pageNo :',this.queryParam.pageNo);
          this.queryParam.pageNo ++
          this.updateData(done);
        }
      },

      /**
       * 打开topmenu
       */
      onPopTopMenu() {
        this.isTopMenuPopup = !this.isTopMenuPopup;
      },

      rightmenu() {
        this.menulist = true;
        this.$refs.rightmenu.open();
      },
      listenToMyBoy(data) {
        this.menulist = data;
      },

      /**
       *
       * 用户点击顶部menubar，切换商品状态
       *
       * @param data {id: "5", title: "全部商品"}
       */
      onTopMenuConfirm(data) {
        this.initialize();
        //console.log('页面外部 view has callback', data);
        this.title = data.title;

        this.isTopMenuPopup = !this.isTopMenuPopup;

        this.queryParam.goodsState = data.id;

        //如果全部商品，需要删除接口入参的goodsState键值
        if (this.queryParam.goodsState == '5') {
          delete (this.queryParam.goodsState);
        }
        this.updateData();
      },

      onTopMenuCreate(data) {
        this.initialize();
        //console.log('页面外部 view has callback', data);
        this.title = data.title;
        this.queryParam.goodsState = data.id;

        //如果全部商品，需要删除接口入参的goodsState键值
        if (this.queryParam.goodsState == '5') {
          delete (this.queryParam.goodsState);
        }

        this.updateData();
      },

      // 初始化数据: 清空列表，pageNo第一页
      initialize () {
        this.itemcards = []; // 清空goodsList
        this.queryParam.pageNo = 1 // 默认查询第一页
      },

    /**
     *
     * 点击价格排序
     */

      isCheckFunction() {
        this.initialize();
        this.isCheck = !this.isCheck;
        if (this.isCheck) {
          this.queryParam.sortord = 3;
        } else {
          this.queryParam.sortord = 2;
        }
        this.updateData();
      },
      /**
       * 跳转到商品详情
       * @param item
       */
      pushGoodsDetail(item) {
        console.log('跳转到商品详情:' + item.goodsId);
        this.$router.push({path: '/goods/' + item.goodsId});
      },

      /**
       * 更新数据
       * UI + Data
       */
      updateData(done) {
        this.queryData((err, obj) => {
          if (done) done();

          if (err) {
            this.isLoading = false
            this.$toast({
              message: '服务器载入失败:' + err,
            });
          }
          if (obj) {
            // console.log('before add property ');

            if (this.queryParam.pageNo == 1) {
              this.isLoading = true
            }
            this.count = obj.count;
            this.totalPage = obj.totalPage;
            if (this.totalPage == 0) {
              // 当数据为空时显示图片
              this.display = true
              this.isLoading = false
            } else {
              this.display = false
            }

            if (this.totalPage == 1) {
              this.isLoading = false
            }

            this.itemcards = Object.freeze(this.itemcards.concat(obj.list))
          }
        });

        this.queryMenuCount((err, obj) => {
          if (err) {
            this.$toast({
              message: '服务器载入失败:' + err,
            });
          }
          if (obj) {
            let item = obj.list;
            for (let i = 0; i < 8; i++) {
              if (item[i].name == '0') {
                this.items[0].state0 = item[i].num;
              } else if (item[i].name == '1') {
                this.items[0].state1 = item[i].num;
              } else if (item[i].name == '2') {
                this.items[0].state2 = item[i].num;
              } else if (item[i].name == '6') {
                this.items[0].state6 = item[i].num;
              } else if (item[i].name == '7') {
                this.items[0].state7 = item[i].num;
              } else if (item[i].name == '4') {
                this.items[0].state4 = item[i].num;
              } else if (item[i].name == '5') {
                this.items[0].state5 = item[i].num;
              }
            }
          }
        });
      },

      /**
       * 获取数据
       * @param fcn callback {err,obj}
       */
      queryData(callback) {
        let apiId = '1011';
        console.log('查询商品列表 queryParam：\n', JSON.stringify(this.queryParam))
        networklib.post(apiId, this.queryParam).then((obj) => {
          // console.log('查询商品列表 obj:\n', JSON.stringify(obj));
          callback(null, obj);
        }).catch(err => {
          callback(err);
        })
      },

      /**
       * 获取商品数量
       */
      queryMenuCount(callback) {
        let apiId = '1014';
        let queryParam = {merchantId: this.merchantId}
        networklib.post(apiId, queryParam).then((obj) => {
            // console.log('成功的回调', obj);
          callback(null, obj);
        }).catch(err => {
          console.log('失败的回调', apiId, err);
          callback(err);
        });
      },

      gotoIndex() {
        this.$router.push({path: '/cloudStoreIndex'})
      }
    },
    watch: {
      selected: function (newVal) {
        console.log('selectedTab ', newVal);
        if (newVal == '1') {
          //最新
          this.queryParam.sortord = '1';
          this.initialize()
          this.updateData();
        }
      },
    },
    computed: {
      /**
       * 判断是否是待审核
       * @return {boolean}
       */
      isBatchAuditGoods() {
        let result = true;
        (this.title == '待审核' && this.$merchantlib.getRoleId() == 9) ? result = true : result = false
        return result
      },
      isBatchSubmitGoods() {
        let result = true;
        (this.title == '草稿箱') ? result = true : result = false
        return result
      },
      isBatchDeleteGoods() {
        let result = true;
        ((this.title == '商户下架' || this.title == '门店下架') && this.$merchantlib.getRoleId() == 9)
         ? result = true
         : result = false
        console.log('isBatchDeleteGoods:', result)
        return result
      },
    },

    beforeRouteEnter (to, from, next) {
      next(vm => {
        // 通过 `vm` 访问组件实例
        // console.log('before Route Enter from',from,' to ',to);
        // vm.fromName = from.name
        // vm.routerName = to.name; // routerName 赋值

      })
    },

  }
</script>
