<style lang="scss" src="src/sass/issueCoupons.scss" scoped></style>
<template>
  <div class="content">
    <bl-bar barStyle="bar-dark-linear">
      <div class="button" slot="left-button" @click="$router.go(-1)">
        <div class="iconfont arrow-back"><i class="fback">返回</i></div>
      </div>
      <div slot="title">发放优惠券</div>
    </bl-bar>
    <div class="issue-box">
      <bl-check-box class="check-content"  v-for="(item, index) in couponcards">
            <span slot="check" class="checkicon" :class="item.state" @click="chooseAttr(index,item)">
                <i></i>
            </span>
        <div slot="check-box" class="checkbox">
          <div class="check-card">
            <div class="card">
              {{item.couponType}}
              <span></span>
            </div>
            <dl>
              <dt>{{item.couponName}}</dt>
              <dd>{{item.couponDesc}}</dd>
              <dd>{{item.enableTimeFrom}} - {{item.enableTimeTo}}</dd>
            </dl>
          </div>
        </div>
      </bl-check-box>

    </div>
    <div style="height:1px;"></div>

    <div class="botbtn">
        <bl-button :disabled="isType" @click="submit()">发放优惠券<span v-if="!isType">（{{this.count}}）</span></bl-button>
    </div>
    <bl-modal :buttons="buttons" v-if="isOK">
      <div slot="inner">
        <h4>确定要发放所选优惠券</h4>
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

    name: 'promotionCoupons',
    components: {
      'BlCheckBox': () => System.import('components/cloud-merchant/check-box')
    },
    data () {
      return {
        merchantId: '',
        memberId: null,
        couponcards: [],
        queryParam: null,
        isAllCheck: null,
        isType: true,
        isOK: false,
        count: 0,
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
            this.btn_ok(this);
            // this.$toast('确定')
          }
        }],
      };
    },
    mixins: [uiMixin],
    created () {
      this.merchantId = merchantlib.getMerchantId();
      this.memberId = merchantlib.getMemberId();
    },

    mounted () {
      this.queryCouponList();
    },
    methods: {
      chooseAttr(index, item) { // 选中
        let state = item.state;
        if (state == "check") {
          item.state = ""
        } else {
          item.state = "check"
        }
        this.checkCount();
        console.log('选中:', index, 'couponTemplateId:', item.couponTemplateId, '状态:', item.state);
      },
      allCheck() { // 全选
        let check = this.isAllCheck;
        if (check == false) {
          this.isAllCheck = true
          this.couponcards.forEach(function(item) {
            item.state = "check"
          })
        } else {
          this.isAllCheck = false
          this.couponcards.forEach(function(item) {
            item.state = ""
          })
        }
        this.checkCount();
      },

      // 1027 查询可发放优惠券列表
      queryCouponList() {
        this.startLoading();
        this.$couponlib.selectCouponList((err, obj) => {
          this.stopLoading();
          if (err) {
            this.$toast(err)
          }
          if (obj) {
            let arrs = obj.couponList;
            arrs.forEach(function(item) {
              item.enableTimeFrom = item.enableTimeFrom.replace(/-/g, '.');
              item.enableTimeTo = item.enableTimeTo.replace(/-/g, '.');
              item.state = ""
            })
            this.couponcards = arrs;
            // console.log('couponList', this.couponList)
          }
        })
      },

      btn_ok(tab) { // 发放优惠券
        console.log('发放优惠券');
        let couponTemplateIdList = [];
        let merchantId = tab.merchantId;
        let memberId = tab.memberId;

        tab.couponcards.forEach(function(item) {
          if (item.state == "check") {
            console.log('选中的couponTemplateId：' + item.couponTemplateId);
            couponTemplateIdList.push(item.couponTemplateId)
          }
        })
        if (couponTemplateIdList.length > 0) {
          let params = {memberId: memberId, merchantId: merchantId, couponTemplateIdList: couponTemplateIdList};
          //TODO 发布优惠券内容
          let apiId = '1028';
          networklib.post(apiId, params).then((obj) => {
            console.log('成功的回调');
            this.$router.go(-1)
            // this.$router.push({title: '营销工具', name: '6'});
          }, (err) => {
            console.log('失败的回调', apiId + err);
            this.$toast(err)
          });
        }
      },
      // 统计被选中的券的数量
      checkCount() {
        let i = 0;
        this.couponcards.forEach(function(item) {
          if (item.state == "check") {
            i++;
          }
        })
        this.count = i;
        console.log('this.count:' + this.count);
        this.count > 0 ? (this.isType = false) : (this.isType = true)
      },
      submit() {
        if (this.count > 0) {
          this.isOK = true;
        }
      },
    },
    watch: {

    },
    computed: {

    }

};
</script>
