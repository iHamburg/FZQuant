<style lang="scss" src="src/sass/issueCoupons.scss" scoped></style>
<template>
  <div class="content">
    <bl-bar barStyle="bar-dark-linear">
      <div class="button" slot="left-button" @click="$router.go(-1)">
        <div class="iconfont arrow-back"><i class="fback">关闭</i></div>
      </div>
      <div slot="title">选择商品</div>
    </bl-bar>
    <div class="issue-box">
      <bl-check-box class="check-content"  v-for="(item, index) in orderGoodsSku">
        <span v-if="item.skuStock == 1" slot="check" class="checkicon" :class="item.state" @click="chooseAttr(index,item)">
            <i></i>
        </span>
        <div slot="check-box" class="checkbox">
          <div class="check-card check-pic">
          <!-- 新添加的无货标识 -->
          <em class="tabicon" v-if="item.sbool" :class="item.style">{{ item.text }}</em>
            <div class="picture">
              <img :src="item.goodsImg">
            </div>
            <dl>
              <dt>{{item.goodsName}}</dt>
              <dd>{{item.skuNameList[0]}}  {{item.skuNameList[1]}}</dd>
             <!--  <dd>吊牌价：{{item.tagPrice}}</dd> -->
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
        <bl-button :disabled="isType" @click="submit()">置为无货<span v-if="!isType">（{{this.count}}）</span></bl-button>
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
        orderGoodsSku: [],
        isAllCheck: null,
        display: false,
        isType: true,
        isOK: false,
        queryParam: {
          orderNo: '',
        },
        updateParam: {
          goodsList: [],
        },
        count: 0,
      };
    },
    mixins: [uiMixin],
    mounted () {
      // 开启转菊花
      this.startLoading();
      this.queryParam.orderNo = this.$route.params.orderNo;
      // 5003-按分类查询可添加黑名单商品列表
      this.queryOrderGoogsSkuList()
    },
    methods: {
      // 5003-按分类查询可添加黑名单商品列表
      queryOrderGoogsSkuList() {
        this.$orderlib.findOrderGoodsSku(this.queryParam, (err, obj) => {
          //关闭转菊花
          this.stopLoading();
          if (err) {
            return this.$toast(err)
          }
          if (obj) {
            this.orderGoodsSku = obj.list
            // skuStock：0表示无货,1表示有货
            for (let i = 0; i < obj.list.length; i++) {
              if (obj.list[i].skuStock == 0) {
                obj.list[i].sbool = true;
                obj.list[i].text = '无货';
                obj.list[i].style = 'no-goods'
              } else {
                obj.list[i].sbool = false;
              }
            }
            console.log('----', this.orderGoodsSku)
          }
          this.orderGoodsSku.forEach(function(item) {
            item.skuNameList = item.skuName.split(",");
          })
          // 当数据为空时显示图片
          if (this.orderGoodsSku.length == 0) {
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
          this.orderGoodsSku.forEach(function(item) {
            item.state = "check"
          })
        } else {
          this.isAllCheck = false
          this.orderGoodsSku.forEach(function(item) {
            item.state = ""
          })
        }
        this.checkCount();
      },
      // 统计被选中的商品数量
      checkCount() {
        let i = 0;
        this.orderGoodsSku.forEach(function(item) {
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
          // this.isOK = true;
          let self = this;
          self.updateParam.goodsList = [];
          this.orderGoodsSku.forEach(function(item) {
            if (item.state == "check") {
              let aaa = {goodsId: item.goodsId, skuId: item.skuId, skuName: item.skuName};
              console.log('选中的goodsId：' + aaa);
              self.updateParam.goodsList.push(aaa);
            }
          })
          self.$orderlib.updateGoodsSkuStock(self.updateParam, (err, obj) => {
            if (err) {
              return this.$toast(err)
            }
            //跳转页面
            this.$toast("成功");
            this.$router.go(-1);
          })
        }
      },
    },
};
</script>
