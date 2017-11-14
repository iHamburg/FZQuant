<style lang="scss" src="src/sass/issueCoupons.scss" scoped></style>
<template>
  <div class="content">
    <bl-bar barStyle="bar-dark-linear">
      <div class="button" slot="left-button" @click="$router.go(-1)">
        <div class="iconfont arrow-back"><i class="fback">返回</i></div>
      </div>
      <div slot="title">绑定活动商品</div>
    </bl-bar>
    <bl-scroll :enableRefresh="true" :onRefresh="onRefresh" :on-infinite="onInfinite" :enableInfinite="isLoading" v-scroll-record>
      <div class="issue-box">
        <bl-check-box class="check-content"  v-for="(item, index) in blackGoogsList">
              <span slot="check" class="checkicon" :class="item.state" @click="chooseAttr(index,item)">
                  <i></i>
              </span>
          <div slot="check-box" class="checkbox">
            <div class="check-card check-pic">
              <div class="picture">
                <img :src="item.goodsImg">
              </div>
              <dl>
                <dt>{{item.goodsName}}</dt>
                <dd>货号：{{item.freightNo}}</dd>
                <dd>吊牌价：{{item.tagPrice}}</dd>
                <dd>售价：{{item.price}}</dd>
              </dl>
            </div>
          </div>
        </bl-check-box>
        <dl class="nogoods" v-if="display">
          <dt></dt>
          <dd>暂无符合条件的商品</dd>
        </dl>
      </div>
    </bl-scroll>

    <div class="botbtn">
        <bl-button :disabled="isType" @click="submit()">确认<span v-if="!isType">（{{this.count}}）</span></bl-button>
    </div>
    <bl-modal :buttons="buttons" v-if="isOK">
      <div slot="inner">
        <p>确定要将已选商品加入活动吗？</p>
      </div>
    </bl-modal>
  </div>
</template>

<script>
  import networklib from 'src/libs/networklib';
  import merchantlib from 'src/libs/merchantlib';
  import uiMixin from 'src/mixins/uiMixin';
export default {

    name: 'promotionBlackList',
    components: {
      'BlCheckBox': () => System.import('components/cloud-merchant/check-box')
    },
    data () {
      return {
        blackGoogsList: [],
        typeList: [],
        display: false,
        isAllCheck: null,
        isType: true,
        isOK: false,
        count: 0,
        totalPage: 1,
        totalCount: 0,
        queryParam: {
          pageNo: 1,
          pageSize: 30,
          typeList: [],
          activityId: '',
        },
        buttons: [{
          text: '取消',
          onClick: () => {
            this.isOK = false
          }
        }, {
          text: '加入活动',
          onClick: () => {
            this.isOK = false
            this.btn_ok(this);
          }
        }],
      };
    },
    mixins: [uiMixin],
    mounted () {
      // 开启转菊花
      this.startLoading();
      this.queryParam.typeList = this.$route.params.categoryIds;
      this.queryParam.activityId = this.$route.params.activityId;
      this.initialize();
      // 5012-按分类查询可添加活动商品列表
      this.queryActivityGoogsList()
      console.log('进入活动商品选择列表');
    },
    methods: {
      //refresh 下拉刷新
      onRefresh (done) {
        console.log('refresh 下拉刷新')
        this.initialize()
        this.queryActivityGoogsList(done);
      },
      //上拉更多
      onInfinite (done) {
        this.queryParam.pageNo ++
        this.queryActivityGoogsList(done);
      },
      initialize () {
        this.blackGoogsList = [] // 清空数据
        this.queryParam.pageNo = 1 // 默认查询第一页
      },
      // 5012-按分类查询可添加活动商品列表
      queryActivityGoogsList(done) {
        if (this.queryParam.typeList.length == 0) {
          return;
        }
        this.$promotionlib.queryAllCanBindlist(this.queryParam, (err, obj) => {
//          console.log('allcan --返回 ');
          //关闭转菊花
          this.stopLoading();
          if (done) {
            done()
          }
          if (err) {
            return this.$toast(err)
          }
          if (obj) {
            console.log('allcan -- ', JSON.stringify(obj));
            this.totalCount = obj.count;
            this.totalPage = obj.totalPage;
            var tempList = obj.goodsList;
            if (tempList != null) {
              this.blackGoogsList = this.blackGoogsList.concat(tempList);
              //tempList.forEach(function (item) {
              // item.state = 'check';
              // })
            }
            // 当数据为空时显示图片
            if (this.blackGoogsList.length <= 0) {
              this.display = true
            } else {
              this.display = false
            }
            this.checkCount();
          }
        })
      },
      chooseAttr(index, item) { // 选中
        let state = item.state;
        if (state == "check") {
          item.state = ""
        } else {
          item.state = "check"
        }
        this.checkCount();
        console.log('选中:', index, 'goodsId:', item.goodsId, '状态:', item.state);
      },
      // 全选
      allCheck() {
        let check = this.isAllCheck;
        if (check == false) {
          this.isAllCheck = true
          this.blackGoogsList.forEach(function(item) {
            item.state = "check"
          })
        } else {
          this.isAllCheck = false
          this.blackGoogsList.forEach(function(item) {
            item.state = ""
          })
        }
        this.checkCount();
      },

      btn_ok(tab) {
        // 加入黑名单
        console.log('点击加入活动按钮');
        let goodsIdList = [];
        tab.blackGoogsList.forEach(function(item) {
          if (item.state == "check") {
            console.log('选中的goodsId：' + item.goodsId);
            goodsIdList.push(item.goodsId)
          }
        })
        let param = {activityId: this.queryParam.activityId, typeList: this.queryParam.typeList, goodsList: goodsIdList, bindingType: 2};
        //5014
        this.$promotionlib.addBoundActivitiedGoods(param, (err, obj) => {
          if (err) {
            return this.$toast(err)
          }
          console.log('绑定商品成功返回--', obj)
          if (obj.count == 'undefined') {
            this.$toast('绑定成功!')
          } else {
            this.$toast('绑定成功 ' + obj.count + ' 件')
          }
          this.$router.go(-1);
        });
      },
      // 统计被选中的商品数量
      checkCount() {
        let unSelectCount = 0;
        this.blackGoogsList.forEach(function(item) {
          if (item.state == "check") {
            unSelectCount++;
          }
        })
        this.count = unSelectCount;
        console.log('this.selectCount:' + this.count);
        this.count > 0 ? (this.isType = false) : (this.isType = true)
      },
      submit() {
        if (this.count > 0) {
          this.isOK = true;
        }
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
};
</script>
