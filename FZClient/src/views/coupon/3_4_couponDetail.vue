<style lang="scss" src="src/sass/couponDetail.scss" scoped></style>
<template>
  <div id="app">
    <!-- header bar -->
    <bl-bar barStyle="bar-dark-linear">
      <div class="button" slot="left-button" @click="$router.go(-1)">
        <div class="iconfont arrow-back"></div>
      </div>
      <div slot="title">优惠券详情</div>
    </bl-bar>
    <div class="qrCode">
      <div>
        <qriously :value="CouponVal" :size="200" />
      </div>
    </div>
    <div class="content">
      <div class="coupon-list">
        <ul>
          <li>
            <div class="list-1">
              <div class="le-name">券名称</div>
              <div class="ri-yundian le-wd">
                <span>{{item.couponName}}</span>
              </div>
            </div>
            <div class="list-1 line">
              <div class="le-name">券描述</div>
              <div class="le-check-right le-wd">
                {{item.couponDesc}}
              </div>
            </div>
          </li>

          <li>
            <div class="list-1">
              <div class="le-name">领券期限</div>
              <div class="le-fonts">
                <span>{{item.openTimeFrom}} ~ {{item.openTimeTo}}</span>
              </div>
            </div>
            <div class="list-1 line">
              <div class="le-name">券有效期</div>
              <div class="le-fonts">
                <span>{{item.enableTimeFrom}} ~ {{item.enableTimeTo}}</span>
              </div>
            </div>
          </li>
          <li>
            <div class="list-1">
              <div class="le-name">最大发放数量</div>
              <div class="ri-yundian">{{item.maxNum}} 张</div>
            </div>
            <div class="list-1">
              <div class="le-name">每天限领(张)</div>
              <div class="ri-yundian">{{item.maxNumPerUser}} 张</div>
            </div>
            <div class="list-1 line">
              <div class="le-name">每人每天限领(张)</div>
              <div class="ri-yundian">{{item.maxNumPerUserDay}} 张</div>
            </div>
          </li>
          <li>
            <!--<div class="list-1 line">
                <div class="le-name">适用范围</div>
                <div class="ri-yundian"><span>{{item.scope}}</span></div>
            </div>-->
          </li>
        </ul>
      </div>
    </div>
     <div class="primaryDIV">
      <bl-button type="primary" @click="onSubmit" v-show="display">分配优惠券</bl-button>
     </div>
  </div>
</template>

<script>

  import networklib from 'src/libs/networklib';
  import uiMixin from 'src/mixins/uiMixin';

  export default {

    name: 'couponDetail',

    data () {
      return {
        CouponVal: '',
        item: {

        },
        queryParam: {couponTemplateId: null},
      };
    },

    mixins: [uiMixin],
    mounted() {
      this.queryParam.couponTemplateId = this.$route.params.couponTemplateId
      console.log('couponTemplateId :' + this.queryParam.couponTemplateId);
      this.CouponVal = 'https://m.st.bl.com/h5-web/member/view_login.html?couponId=' + this.queryParam.couponTemplateId
      this.startLoading();
      this.queryData(err => {
        this.stopLoading();
        if (err) {
          this.$toast({
            message: err,
          });
        }
      })
    },
    methods: {
      /**
       * 获取数据-查询券模版详情
       * @return {[type]} [description]
       */
      queryData: function (callback) {
        let apiId = 'CM1003'
        networklib.post(apiId, this.queryParam).then((obj) => {
          console.log('成功的回调', obj);
          this.item = obj
          callback();
        }).catch(err => {
          callback(err);
        })
      },

      onSubmit: function () {
        let couponTemplateId = this.$route.params.couponTemplateId
        let num = this.item.maxNum - this.item.assignNum
        console.log('跳转到分配券 couponTemplateId :' + couponTemplateId + '可分配数量 :' + num)
        //跳转到分配券
        this.$router.push({
          path: '/assignedTickets',
          query: {
            couponTemplateId: couponTemplateId,
            num: num
          }
        })
      },
    },

    computed: {
      display() {
        if (new Date(this.item.enableTimeTo) > new Date() && (this.item.maxNum - this.item.assignNum) > 0) {
          return true
        } else {
          return false
        }
      }
    }
  };
</script>
