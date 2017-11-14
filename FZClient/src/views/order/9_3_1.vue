<style lang="scss" src="src/sass/issueCoupons.scss" scoped></style>
<template>
  <div class="content">

    <bl-bar barStyle="bar-dark-linear">

      <div class="button" slot="left-button" @click="$router.go(-1)">
        <div class="iconfont arrow-back"></div>
      </div>
      <div slot="title">添加商品</div>
    </bl-bar>
    <div class="issue-box notop">
      <bl-check-box class="check-content"  v-for="(item, index) in goodsList">
            <span slot="check" v-show="isCheck" class="checkicon"  :class="item.state" @click="chooseAttr(index,item)">
                <i></i>
            </span>
        <div slot="check-box" class="checkbox">
          <!-- 新添加的无货标识 -->
          <div class="check-card check-pic">
            <em class="tabicon no-goods" v-if="item.stockState == '3'">无货</em>
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

  // import goodslib from 'src/libs/goodslib';
  // import orderlib from 'src/libs/orderlib';
  import uiMixin from 'src/mixins/uiMixin';
  export default {
    name: 'goods',
    mixins: [uiMixin],
    components: {
      'BlCheckBox': () => System.import('components/cloud-merchant/check-box')
    },
    data () {
      return {
        release: '发布上新',
        isCheck: true,
        isAllCheck: false,
        goodsList: [],
        queryParam: {
          merchantId: '',
          goodsState: 2,
          sortord: 1,
          pageSize: 9999
        },

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
      this.startLoading();
      this.$goodslib.queryGoodsList(this.queryParam, (err, items) => {
        this.stopLoading();
        if (err) {
          return this.$toast(err);
        }

        items.forEach(item => (item.state = " "));
        console.log('query goodsList ：', JSON.stringify(items));
        this.goodsList = items;
      });
    },

    methods: {

      onSubmit() { // 发送商品链接
        // 获得 check的商品列表
        let itemList = this.$_.filter(this.goodsList, (item) => { return item.state == 'check' });

        this.$orderlib.addGoodsGroupListToLocalOrder(itemList)
        this.$router.go(-1)
      },

      chooseAttr(index, item) { // 选中
        let state = item.state;
        if (state == "check") {
          item.state = ""
        } else {
          if (this.checkedCount >= 600) {
            this.$toast('发送商品最多只能选择6件商品')
          } else {
            item.state = "check"
          }
        }
      },
    }

  }
</script>
