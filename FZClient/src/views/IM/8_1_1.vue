<!--查询用户历史查询商品列表-->
<style lang="scss" src="src/sass/issueCoupons.scss" scoped></style>
<template>
  <div class="content">

    <bl-bar barStyle="bar-dark-linear">

      <div class="button" slot="left-button" @click="$router.go(-1)">
        <div class="iconfont arrow-back"></div>
      </div>
      <div slot="title">历史咨询商品</div>
    </bl-bar>
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

    <div class="botbtn">

      <bl-button :disabled="!submitEnable" @click="onSubmit()">确定添加<span v-if="submitEnable">（{{this.checkedCount}}）</span></bl-button>
    </div>
  </div>

</template>

<script>

  import orderlib from 'src/libs/orderlib';
  import uiMixin from 'src/mixins/uiMixin';
  export default {
    name: 'consultGoods',
    mixins: [uiMixin],
    components: {
      'BlCheckBox': () => System.import('components/cloud-merchant/check-box')
    },
    data () {
      return {
        release: '',
        isCheck: true,
        isAllCheck: false,
        goodsList: [],
        customerId: '11111111',
      }
    },
    computed: {
      /**
       * 根据选中的数量，计算出是否能点击提交按钮
       * @return {boolean}
       */
      submitEnable() {
        return this.checkedCount > 0;
      },

      /**
       * 根据goodsList中state的状态，计算出选中的数量
       * @return {*|number}
       */
      checkedCount() {
        let count = this.$_.countBy(this.goodsList, function(item) {
          return item.state == "check";
        }).true || 0;
        return count;
      }
    },

    mounted() {
      if (this.$route.params.customerId) {
        this.customerId = this.$route.params.customerId;
      }
      this.startLoading();
      orderlib.findConsultGoods(this.customerId, (err, items) => {
        console.log(items);
        this.stopLoading();
        if (err) {
          return this.$toast(err);
        }
        items = this.$_.compact(items);
        items.forEach(item => (item.state = " "));

        this.goodsList = items;
      });
    },

    methods: {

      onSubmit() {
        // 获得 check的商品列表
        let itemList = this.$_.filter(this.goodsList, (item) => { return item.state == 'check' });

        this.$orderlib.addGoodsGroupListToLocalOrder(itemList)

        /*orderlib.addGoodsListToLocalOrder(itemList, (err) => {
          if (err) console.log(err)
          this.$router.go(-1)
        })*/
      },

      chooseAttr(index, item) { // 选中
        let state = item.state;
        if (state == "check") {
          item.state = ""
        } else {
          item.state = "check"
        }
      },
    }

  }
</script>
