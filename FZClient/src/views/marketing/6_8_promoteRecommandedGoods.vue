<style lang="scss" src="src/sass/issueCoupons.scss" scoped></style>
<template>
  <div class="content">

    <bl-bar barStyle="bar-dark-linear">
        <div class="button" slot="left-button" @click="$router.go(-1)">
          <div class="iconfont arrow-back"><i class="fback">返回</i></div>
        </div>
        <div slot="title">发布商品推荐</div>
       <!--  <div slot="right-button" class="button" @click="checkAll()">取消选择</div> -->
    </bl-bar>
    <bl-scroll :enableRefresh="true" :onRefresh="onRefresh" :on-infinite="onInfinite" :enableInfinite="isLoading" v-scroll-record>
      <div class="issue-box notop">
        <bl-check-box class="check-content"  v-for="(item, index) in goodsList">
            <span slot="check" v-show="isCheck" class="checkicon"  :class="item.state" @click="chooseAttr(index,item)">
                <i></i>
            </span>
            <div slot="check-box" class="checkbox">
                <div class="check-card check-pic">
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
            </div>
        </bl-check-box>
    </div>
    <div v-if="display" class="check-content">
      <img src="static/images/Rectangle37@2x.png" class="nodata">
    </div>
    </bl-scroll>
    <div class="editbar" v-show="isCheck" :class="{check: isAllCheck}" v-if="this.goodsList.length > 0">
      <!-- 2017/7/20 页面有分页，去掉全选按钮 -->
      <!-- <span class="checkicon alldel" @click="allCheck()">
          <i></i>全选
      </span> -->
      <div>
          <button class="default" :class="{'del': submitEnable}" @click='subCoupons()'>{{release}}({{this.checkedCount}})</button>
      </div>
    </div>

    <!-- pop -->
    <bl-modal :buttons="buttons" v-if="isOK">
      <div slot="inner">
          <h4>您确定需要发布所选商品？</h4>
          <p>发布后信息会在有逛客户端门店首页以及您的商家动态中展示</p>
      </div>
    </bl-modal>
  </div>

</template>

<script>
  import uiMixin from 'src/mixins/uiMixin';

export default {
    name: 'promoteRecommandedGoods',
    mixins: [uiMixin],
    components: {
      'BlCheckBox': () => System.import('components/cloud-merchant/check-box')
    },
    data () {
      return {
        release: '发布商品推荐',
        count: 0,
        isCheck: true,
        isType: true,
        delArr: 0,
        display: false,
        // checkedCount: 0,
        isOK: false,
        isAllCheck: false,
        isDel: false,
        publish: '一键发布',
        issue: '发布上新',
        totalPage: 0,
        buttons: [{
          text: '取消',
          onClick: () => {
            this.isOK = false
            this.$toast('取消')
          }
        }, {
          text: '确定发布',
          onClick: () => {
            this.isOK = false
            this.btn_ok();
            this.$toast('发布成功');
            let self = this;
            setTimeout(function() { self.$router.push({name: '6'}) }, 1000);
          }
        }],
        goodsList: [],
        queryParam: {
          merchantId: '',
          memberId: '',
          pageNo: 1,
          pageSize: 30
        },
        param: {
          goodsIdList: []
        }
      }
    },
    mounted () {
      this.initialize();
      this.updateData();
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
        this.queryParam.pageNo ++
        this.updateData(done);
      },
      initialize () {
        this.goodsList = [] // 清空数据
        this.queryParam.pageNo = 1 // 默认查询第一页
      },
      updateData(done) {
        //this.startLoading()
        console.log('params ', this.queryParam);
        this.$goodslib.findRecommendedGoodsList(this.queryParam, (err, obj) => {
          //this.stopLoading()
          if (done) {
            done()
          }
          if (err) {
            return this.$toast(err)
          }
          this.totalPage = obj.pages;
          obj.list.forEach(item => (item.state = ""));
          this.goodsList = this.goodsList.concat(obj.list) // 追加数据
          if (this.goodsList.length <= 0) {
            this.display = true
          } else {
            this.display = false
          }
        })
      },
      btn_ok() { // 发布上新
        console.log('发布上新');
        let goodsIdList = [];
        // let self = this;
        this.goodsList.forEach(function(item) {
          if (item.state == "check") {
            goodsIdList.push(item.goodsId)
          }
        })
        this.param.goodsIdList = goodsIdList;
        console.log('选中的商品goodsIdList：', goodsIdList);
        //TODO 发布优惠券内容
        this.$goodslib.releaseRecommendedGoods(this.param, (err, obj) => {
          if (err) {
            return this.$toast(err)
          }
        })
      },

      chooseAttr(index, item) {
        let state = item.state;
        if (state == "check") {
          item.state = ""
        } else {
          console.log(this.checkedCount);
          if (this.checkedCount > 99) {
            this.$toast('发送商品最多只能选择100件商品')
          } else {
            item.state = "check"
          }
        }
        (this.checkedCount === this.goodsList.length) ? (this.isAllCheck = true) : (this.isAllCheck = false);
      },
      subCoupons() {
        if (this.checkedCount > 0) {
          this.isOK = true;
        }
      },

      allCheck() {
        console.log('全选！');
        let check = this.isAllCheck;
        if (check === false) {
          this.isAllCheck = true;
          for (let i = 0; i < this.goodsList.length; i++) {
            if (i < 99) {
              this.goodsList[i].state = "check";
            }
          }
        } else {
          this.isAllCheck = false
          this.goodsList.forEach(function(item) {
            item.state = ""
          })
        }
      },
      checkAll() {
        this.goodsList.forEach(function(item) {
          item.state = ""
        });
        (this.checkedCount === this.goodsList.length) ? (this.isAllCheck = true) : (this.isAllCheck = false);
      },
    },
    computed: {
      isLoading() {
        if (this.queryParam.totalPage == 1) {
          return false
        }
        if (this.queryParam.pageNo >= this.totalPage) {
          return false
        }
        return true
      },
      checkedCount() {
        let count = this.$_.countBy(this.goodsList, function(item) {
          return item.state == "check";
        }).true || 0;

        return count;
      },
      submitEnable() {
        return this.checkedCount > 0;
      },
    }
}
</script>
