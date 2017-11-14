<!--优惠券列表-->
<style lang="scss" src="src/sass/couponListCell.scss" scoped></style>
<style lang="scss" src="src/sass/scrollList.scss" scoped></style>
<template>
  <div class="content">
    <bl-bar barStyle="bar-dark-linear">
      <div class="button" slot="left-button" @click="$router.go(-1)">
        <div class="iconfont arrow-back"></div><i class="fback">返回</i>
      </div>
      <div slot="title">券列表</div>
    </bl-bar>

    <div class="scrollList">
      <div class="top">
        <!-- header-menu -->
        <div class="header-menu" >
          <!-- 手工设置tabbar的宽度， 动态影响到item的宽度-->
          <section style="width:100%">
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
            <bl-check-box class="check-content" v-for="(item, index) in items">
              <div slot="check-box" class="checkbox cardlist">
                <div class="tip"><em>{{ item.couponModeString }}</em> {{ item.couponName }}
                  <span v-if="item.state == 0" class="f">发放中</span>
                  <span v-if="item.state == 1" class="d">待审核</span>
                  <span v-if="item.state == 2" class="s">审核失败</span>
                  <span v-if="item.state == 3" class="y">已失效</span>
                </div>
                <div class="check-card"  @click="pushDetails(item, 5)">
                  <div class="card">{{ item.offerAmount }}元
                    <span>{{ item.couponModeString }}</span>
                  </div>
                  <dl>
                    <dd>满{{ item.applicableAmount }}元</dd>
                    <dd class="over">{{ item.enableTimeFrom }} - {{ item.enableTimeTo}}</dd>
                    <dd>限 {{ $merchantlib.getMerchantName() }}</dd>
                  </dl>
                </div>
                <div class="edit">
                  <span>共{{item.maxNum}}张</span> <span class="gray">已发{{item.alreadyCount}}张</span>
                  <!--1:待审核、2：审核不通过、3：发放中、4：已失效-->
                  <!--不是已失效都能编辑-->
                  <!--审核不通过状态下的编辑按钮 flag=1  发放中状态下的编辑按钮 flag=2-->
                  <button v-show="item.status == 2 " @click="pushDetails(item, 1)">编辑</button>
                  <button v-show="item.status == 3 " @click="pushDetails(item, 2)">编辑</button>
                  <button v-show="item.status == 3 " @click="onStopCoupon(item)" style="padding:0">停止发放</button>
                  <!--审核按钮  flag=3-->
                  <button v-show="item.status == 1 " @click="pushDetails(item, 3)">审核</button>


                </div>
              </div>
            </bl-check-box>
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
    name: 'keepCouponList',
    mixins: [uiMixin],
    components: {
      'BlCheckBox': () => System.import('components/cloud-merchant/check-box')
    },
    data () {
      return {
        tabIndex: '0',  //status: 全部：0、1:待审核、2：审核不通过、3：发放中、4：已失效
        tabItemData: [
          {
            index: '0',
            text: '全部',
          },
          {
            index: '1',
            text: '待审核'
          },
          {
            index: '2',
            text: '审核失败'
          },
          {
            index: '3',
            text: '发放中'
          },
          {
            index: '4',
            text: '失效券'
          },
        ],
        totalPage: 0,
        pageNo: 1,
        pageSize: 10,
        items: [],
        display: false,
        selectedItem: null,
      };
    },
    activated() {
      document.body.scrollTop = 0
      let status = Number(this.$route.params.status);
//      console.log('status ', status);
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

        params.status = this.tabIndex;

        this.$couponlib.queryCouponListNew(params, (err, obj) => {
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
            item.enableTimeFrom = this.$utillib.fmtDate(new Date(item.enableTimeFrom.replace(/-/g, "/")), 'yyyy-MM-dd');
            item.enableTimeTo = this.$utillib.fmtDate(new Date(item.enableTimeTo.replace(/-/g, "/")), 'yyyy-MM-dd');
          })
          this.items = this.items.concat(obj.list) // 追加数据

          console.log('obj ', obj.list);

          // 当数据为空时显示空图片
          if (this.items.length <= 0) {
            this.display = true
          } else {
            this.display = false
          }
        })
      },
      pushDetails(item, flag) {
        if (flag == 1 || flag == 2) {
          this.$router.push({name: '6.9.2.1', params: {couponTemplateId: item.couponTemplateId, flag: flag}})
        } else {
          this.$router.push({name: '6.9.3', params: {couponTemplateId: item.couponTemplateId, flag: flag}})
        }
      },
      /**
       * 停止发放
       * @param item
       */
      onStopCoupon(item) {
        console.log('stopCoupon', item);
        this.selectedItem = item;
        this.$modal({
          content: '您确定停止发放该优惠券？',
          buttons: [
            {text: '取消', onClick: function () {}}, //返回商品库
            {text: '确定', onClick: this.stopCoupon,
            }
          ]
        });
      },
      /**
       * 停止发放优惠券
       */
      stopCoupon() {
        // 需要停止的优惠券
        let item = this.selectedItem
        console.log('to stop coupon', item);
        let params = {
          couponTemplateId: item.couponTemplateId,
          currentState: item.status,
          status: "4"
        }

        console.log('params ', params);
        this.$couponlib.updateFullCutCouponStatus(params, (err) => {
          if (err) {
            return this.$toast(err)
          }
          this.$toast('操作成功')
          this.initialize()
          this.updateData();
        })
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
