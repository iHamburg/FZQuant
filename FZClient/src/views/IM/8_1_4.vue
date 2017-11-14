<style lang="scss" src="src/sass/issueCoupons.scss" scoped></style>
<!--发送商品连接-->
<template>
  <div class="content">

    <bl-bar barStyle="bar-dark-linear">

      <div class="button" slot="left-button" @click="bridgeNativeBack()">
        <div class="iconfont arrow-back"></div>
      </div>
      <div slot="title">发送商品链接</div>
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
      <bl-button :disabled="!submitEnable" @click="onSubmit()">发送<span v-if="submitEnable">（{{this.checkedCount}}）</span></bl-button>
    </div>
  </div>

</template>

<script>

  import goodslib from 'src/libs/goodslib';
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
          sortord: 4,
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
      goodslib.queryGoodsList(this.queryParam, (err, items) => {
        this.stopLoading();
        if (err) {
          return this.$toast(err);
        }
        items.forEach(item => (item.state = " "));
        this.goodsList = items;
      });
    },

    methods: {

      onSubmit() { // 发送商品链接
        console.log('on submit');
        // 获得选中的商品列表
        let itemList = this.$_.filter(this.goodsList, (item) => { return item.state == 'check' })
        let newItemList = []

        itemList.map(item => {
          let newItem = {
            productId: item.goodsId,
            goodsPrice: item.price,
            goodsImgUrl: item.goodsImg,
            goodsStandaName: item.goodsName,
          }
          newItemList.push(newItem)
        })

        console.log('发送 adapter的 itemlist', newItemList);
        // 传给IM聊天
        this.$jsbridgelib.bridgeIMSendGoods({list: newItemList}, err => {
          console.log('err ', err);
          if (err) {
            return this.$toast(err);
          }
        });
        this.$jsbridgelib.bridgeNativeBack();
      },

      chooseAttr(index, item) { // 选中
        let state = item.state;
        if (state == "check") {
          item.state = ""
        } else {
          if (this.checkedCount >= 6) {
            this.$toast('发送商品最多只能选择6件商品')
          } else {
            item.state = "check"
          }
        }
      },
    }

  }
</script>
