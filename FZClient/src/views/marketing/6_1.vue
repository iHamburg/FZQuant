<style lang="scss" src="src/sass/issueCoupons.scss" scoped></style>
<template>
  <div class="content">

    <bl-bar barStyle="bar-dark-linear">
        <div class="button" slot="left-button" @click="$router.go(-1)">
          <div class="iconfont arrow-back"><i class="fback">返回</i></div>
        </div>
        <div slot="title">发布上新</div>
    </bl-bar>

    <p class="tips" v-if="this.goodsList.length == 0">您暂时没有待发布的已上架新品！</p>
    <p class="tips" v-if="this.goodsList.length > 0">您有多件新品已上架，发布上新到有逛平台！</p>

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

    <div class="editbar" v-show="isCheck" :class="{check: isAllCheck}" v-if="this.goodsList.length > 0">
      <span class="checkicon alldel" @click="allCheck()">
          <i></i>全选
      </span>
      <div>
          <button class="default" :class="{'del': isDel}" @click='subCoupons()'>{{release}}({{count}})</button>
      </div>
    </div>

    <!--<div class="botbtn">-->
      <!--<bl-button :disabled="!isType" @click="submit()">{{release}}<span v-if="!isType">（{{this.count}}）</span></bl-button>-->
    <!--</div>-->

    <!-- pop -->
    <bl-modal :buttons="buttons" v-if="isOK">
      <div slot="inner">
          <h4>您确定要发放所选商品</h4>
          <p>发布后信息会在有逛客户端门店首页以及您的商家动态中展示</p>
      </div>
    </bl-modal>
  </div>

</template>

<script>
  import networklib from 'src/libs/networklib';
  import merchantlib from 'src/libs/merchantlib';
  import uiMixin from 'src/mixins/uiMixin';

export default {
    name: 'promotionGoods',
    mixins: [uiMixin],
    components: {
      'BlCheckBox': () => System.import('components/cloud-merchant/check-box')
    },
    data () {
      return {
        release: '发布上新',
        count: 0,
        isCheck: true,
        isType: true,
        delArr: 0,
        isOK: false,
        isAllCheck: false,
        isDel: false,
        publish: '一键发布',
        issue: '发布上新',
        buttons: [{
          text: '取消',
          onClick: () => {
            this.isOK = false
            // this.$toast('取消')
          }
        }, {
          text: '确定发布',
          onClick: () => {
            this.isOK = false
            this.btn_ok();
          }
        }],
        goodsList: [],
        queryParam: {
          merchantId: '',
          memberId: '',
          goodsList: []
        }
      }
    },
    mounted () {
      this.queryParam.merchantId = merchantlib.getMerchantId(); // 商户id
      this.queryParam.memberId = merchantlib.getMemberId(); // 会员id
      console.log('this.queryParam.merchantId:', this.queryParam.merchantId);
      let self = this;
      self.findNewGoodsList(function(err) {
        if (err) {
          self.$toast({
            message: '服务器载入失败:' + err
          });
        }
      });
    },

    methods: {
      //1025-查询可上新商品列表
      findNewGoodsList(callback) {
        this.startLoading();
        let apiId = '1025';
        networklib.post(apiId, this.queryParam).then((obj) => {
          this.stopLoading();
          let arrs = obj.list;
          arrs.forEach(function(item) {
            item.state = ""
          })
          this.goodsList = arrs;
          console.log('长度：', this.goodsList.length)
          callback();
        }, (err) => {
          this.stopLoading();
          console.log('失败的回调：', apiId + this.queryParam);
          callback(err);
        });
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
        this.queryParam.goodsIdList = goodsIdList;
        console.log('选中的商品goodsIdList：', goodsIdList);
        //TODO 发布优惠券内容
        let apiId = '1026';
        networklib.post(apiId, this.queryParam).then((obj) => {
          console.log('成功的回调', obj);
          this.$toast('发布成功');
          let self = this;
          setTimeout(function() { self.$router.push({name: '6'}) }, 1000);
        }, (err) => {
          console.log('失败的回调', apiId + err);
          this.$toast('发布失败:' + err);
        });
      },

      chooseAttr(index, item) {
        let state = item.state;

        if (state == "check") {
          item.state = ""
          this.delArr -= 1
          this.count --
        } else {
          item.state = "check"
          this.delArr += 1
          this.count ++
        }
        if (this.count == this.goodsList.length) {
          console.log('当前的数量：', this.count)
          this.isAllCheck = true;
          this.release = this.publish;
        } else {
          this.isAllCheck = false;
          this.release = this.issue;
        }
        console.log('数量：', this.count)
        console.log('选中:', index, '货号:', item.freightNo, '状态:', item.state);
        // (this.delArr != 0) ? (this.isDel = true) : (this.isDel = false);
      },
      subCoupons() {
        if (this.count > 0) {
          this.isOK = true;
        }
      },

      allCheck() {
        console.log('全选！');
        var checkall = this.goodsList;

        let check = this.isAllCheck;
        if (check == false) {
          this.isAllCheck = true
          checkall.forEach(function(item) {
            item.state = "check"
          })
          this.release = this.publish;
          this.count = this.goodsList.length
          // this.isDel = true;
        } else {
          this.isAllCheck = false
          checkall.forEach(function(item) {
            item.state = ""
          })
          this.release = this.issue;
          this.count = 0
          // this.isDel = false
        }
      }
    },
    watch: {
      count: function(newValue) {
        (newValue > 0) ? (this.isDel = true) : (this.isDel = false)
      }
    }

}
</script>
