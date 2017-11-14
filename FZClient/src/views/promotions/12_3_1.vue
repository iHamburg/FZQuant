<style lang="scss" src="src/sass/issueCoupons.scss" scoped></style>
<template>
  <div class="content">
    <bl-bar barStyle="bar-dark-linear">
      <div class="button" slot="left-button" @click="$router.go(-1)">
        <div class="iconfont arrow-back"><i class="fback">返回</i></div>
      </div>
      <div slot="title">可选黑名单商品</div>
    </bl-bar>
    <div class="issue-box">
      <bl-check-box class="check-content"  v-for="(item, index) in blackGoogsList">
            <span slot="check" class="checkicon" :class="item.state" @click="chooseAttr(index,item)">
                <i></i>
            </span>
        <div slot="check-box" class="checkbox">
          <div class="check-card check-pic">
            <div class="picture">
              <img :src="item.imgUrl">
            </div>
            <dl>
              <dt>{{item.normQualityName}}</dt>
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

    <div class="botbtn">
        <bl-button :disabled="isType" @click="submit()">加入黑名单<span v-if="!isType">（{{this.count}}）</span></bl-button>
    </div>
    <bl-modal :buttons="buttons" v-if="isOK">
      <div slot="inner">
        <p>确定要将已选商品加入黑名单吗？</p>
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
        isAllCheck: null,
        display: false,
        isType: true,
        isOK: false,
        count: 0,
        buttons: [{
          text: '取消',
          onClick: () => {
            this.isOK = false
          }
        }, {
          text: '加入黑名单',
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
      this.typeList = this.$route.params.categoryIds;
      // 5003-按分类查询可添加黑名单商品列表
      this.queryblackGoogsList()
    },
    methods: {
      // 5003-按分类查询可添加黑名单商品列表
      queryblackGoogsList() {
        if (this.typeList.length == 0) {
          return;
        }
        let param = {typeList: this.typeList}
        this.$promotionlib.queryGoodsListForBlacklist(param, (err, obj) => {
          //关闭转菊花
          this.stopLoading();
          if (err) {
            return this.$toast(err)
          }
          if (obj) {
            this.blackGoogsList = obj
          }
          // 当数据为空时显示图片
          if (this.blackGoogsList.length == 0) {
            this.display = true
          } else {
            this.display = false
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
        console.log('点击加入黑名单按钮');
        let goodsIdList = [];
        tab.blackGoogsList.forEach(function(item) {
          if (item.state == "check") {
            console.log('选中的goodsId：' + item.goodsId);
            goodsIdList.push(item.goodsId)
          }
        })
        if (goodsIdList.length > 0) {
          // type 0：增、1：删
          let param = {goodsList: goodsIdList, type: '0'};
          //加入黑名单
          this.$promotionlib.updatePromotionBlacklist(param, (err, obj) => {
            if (err) {
              return this.$toast(err)
            }
            this.$toast('加入黑名单成功')
            // 重新加载按分类查询可添加黑名单商品列表
            this.queryblackGoogsList()
          })
        }
      },
      // 统计被选中的商品数量
      checkCount() {
        let i = 0;
        this.blackGoogsList.forEach(function(item) {
          if (item.state == "check") {
            i++;
          }
        })
        this.count = i;
        console.log('this.count:' + this.count);
        this.count > 0 ? (this.isType = false) : (this.isType = true)
      },
      //提交
      submit() {
        if (this.count > 0) {
          this.isOK = true;
        }
      },
    },
};
</script>
