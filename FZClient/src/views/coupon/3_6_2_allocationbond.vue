<style lang="scss" src="src/sass/allocationbond.scss" scoped></style>
<template>
  <div class="content">
    <bl-modal :buttons="buttons" v-if="modalShow">
      <div slot="inner">确认要将券分配给{{memberName}}吗？</div>
    </bl-modal>
    <bl-modal :buttons="buttons2" v-if="modalShow2">
      <div slot="inner">分配券成功</div>
    </bl-modal>
    <bl-bar barStyle="bar-dark-linear">
      <div class="button" slot="left-button" @click="$router.go(-1)">
        <div class="iconfont arrow-back"></div>
      </div>
      <div slot="title">分配券</div>
    </bl-bar>
    <allocationbond1 :isActive="isActive" ></allocationbond1>
    <div class="badge">
      <allocationbond v-for="item in data" :coupondata="item">
        <div class="badge-right" slot='switch' @click="assignCoupon(item)"><div class="distribute-button"><a>分配</a></div></div>
      </allocationbond>
    </div>
  </div>

</template>

<script>
  import networklib from 'src/libs/networklib';
  import merchantlib from 'src/libs/merchantlib';
  import allocationbond1 from 'components/choose-coupons/choose';
  import allocationbond from 'components/choose-coupons/distribution';
  import uiMixin from 'src/mixins/uiMixin';
export default {
    name: 'distribution',
    components: {
      allocationbond1,
      allocationbond
    },
    data() {
      return {
        memberName: null,
        modalShow: false,
        modalShow2: false,
        memberId: null,
        couponTemplateId: null,
        buttons2: [{
          text: '查看分配列表',
          onClick: () => {
            this.modalShow2 = false;
            // 跳转到 3.3 页面
            this.$router.push({path: '/ticketlist', query: { couponTemplateId: this.couponTemplateId }});
          }
        }, {
          text: '确定',
          onClick: () => {
            this.$router.push({path: '/coupons/assignList'});
          }
        }],
        buttons: [{
          text: '取消',
          onClick: () => {
            this.modalShow = false;
          }
        },
        {
          text: '确定',
          onClick: () => {
            let param = {userToken: '1111', memberId: this.memberId, couponTemplateId: this.$route.query.couponTemplateId, assignNum: this.$route.query.num};
            let self = this;
            let apiId = 'CM1001';
            networklib.post(apiId, param).then((obj) => {
//              console.log('成功的回调', obj);
              self.modalShow2 = true;
            }, (err) => {
              self.modalShow = false;
              self.$toast('分配券失败 :' + err);
//              console.log('失败的回调', apiId, err);
            })
          }
        }],
        items: [{
        }],
        data: [],
        isActive: false
      }
    },
    mixins: [uiMixin],
    mounted() {
      this.startLoading();
      this.couponTemplateId = this.$route.query.couponTemplateId;
      let param = {merchantId: merchantlib.getMerchantId(), userToken: '1111111'};
      let self = this;
      let apiId = 'CM1106';
      networklib.post(apiId, param).then((obj) => {
        self.stopLoading();
        console.log('成功的回调', obj);
        if (obj != null) {
          self.data = obj.list;
        }
      }, (err) => {
        self.stopLoading();
        console.log('失败的回调', apiId, err);
      })
    },
    methods: {
      assignCoupon(item) {
        this.modalShow = true;
        console.log(this.modalShow);
        this.memberName = item.memberName;
        this.memberId = item.memberId;
        console.log(this.memberName);
        console.log(this.$route.query.couponTemplateId);
        console.log(this.$route.query.num);
      }
    }
}
</script>
