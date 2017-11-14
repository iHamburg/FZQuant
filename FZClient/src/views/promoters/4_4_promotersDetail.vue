<style lang="scss" src="src/sass/promotersDetail.scss" scoped></style>
<template>
  <div class="ticketlist">
    <div class="content">
 	  <bl-bar barStyle="bar-dark-linear">
        <div class="button" slot="left-button" @click="$router.go(-1)">
        <div class="iconfont arrow-back"></div><i class="fback">返回</i>
      </div>
      <div slot="title">主播详情</div>
    </bl-bar>
  </div>
  <div class="badge">
  	<div class="badge-head">
	  头像
	  <div class="head-img">
	  	<img :src="item.photoUrl">
	  </div>
  	</div>
  </div>
  <bl-comli >
  	<div slot='left-text'>账户ID</div>
  	<div slot='right-text'>{{item.memberId}}</div>
  </bl-comli>
  <bl-comli >
    <div slot='left-text'>手机号</div>
    <div slot='right-text'>{{item.memberPhone}}</div>
  </bl-comli>
  <bl-comli class="margin-t">
  	<div slot='left-text'>授权天数</div>
  	<div slot='right-text'>{{item.surplusDays}} 天</div>
  </bl-comli>
  <bl-comli @click.native="gotoCouponList()">
  	<div slot='left-text'>Ta的券</div>
  	<div slot='right-text' class="right-text">{{item.couponCount}} 张 <div class="iconfont arrow-back"></div></div>
  </bl-comli>
   <bl-comli  class="margin-t">
  	<div slot='left-text'>Ta的角色</div>
  	<div slot='right-text' v-show='index==0'>促销员</div>
    <div slot='right-text' v-show='index==1'>商户网红</div>
  </bl-comli>
  <bl-comli >
    <div slot='left-text'>员工ID</div>
    <div slot='right-text'>{{item.employeeId}}</div>
  </bl-comli>
  <bl-comli >
    <div slot='left-text'>身份证号</div>
    <div slot='right-text'>{{item.personNo | plusXing-util}}</div>
  </bl-comli>
  <upload :maxpic='paths1.length' :paths='paths1' :name='"身份证"'></upload>

  <upload :maxpic='paths2.length' :paths='paths2' :name='name[index]' class='margin-t'></upload>
  <upload :maxpic='paths3.length' :paths='paths3' :name='"第三方社交平台页面截图"' v-show='index==1' class='margin-t'></upload>
  <bl-comli class="margin-t" v-show='index==0'>
    <div slot='left-text'>月收入</div>
    <div slot='right-text'>{{item.income}}</div>
  </bl-comli>
</div>
</template>
<script>
// import utils from 'src/utils';
import uiMixin from 'src/mixins/uiMixin';
import networklib from 'src/libs/networklib';
import merchantlib from 'src/libs/merchantlib';
import upload from 'components/cloud-merchant/upload';
export default {

  name: 'promotersDetail',
  components: {
    upload
  },
  data() {
    return {
      item: {},
      paths1: [],
      paths2: [],
      paths3: [],
      name: ['员工证', '个人近照'],
      index: 0,
      queryParam: {
        merchantId: null,
        memberId: null,
        roleId: null
      }
    };
  },
  mixins: [uiMixin],
  mounted() {
    this.queryParam.merchantId = merchantlib.getMerchantId(); // 商户id
    this.queryParam.memberId = this.$route.query.memberId; // 网红/销售员id
    this.queryParam.roleId = this.$route.query.roleId;
    console.log('roleId:', this.$route.query.roleId)
    console.log('memberId:', this.$route.query.memberId)
    this.startLoading();
    let self = this;
    this.queryMemberDetail(function(err) {
      self.stopLoading();
      if (err) {
        self.$toast({
          message: '服务器载入失败:' + err,
        });
      }
    });
  },
  methods: {
    queryMemberDetail (callback) {
      let apiId = 'CM1104';
      networklib.post(apiId, this.queryParam).then((obj) => {
//        console.log('成功的回调', obj);
        this.item = obj;
        this.paths1 = obj.personImg.split(',');
        this.paths2 = obj.personNoImg.split(',');
        this.paths3 = obj.screenShotsImg.split(',');
        this.index = obj.role;
        callback();
      }, (err) => {
        this.stopLoading();
        callback(err);
        console.log('失败的回调', apiId, err);
      })
    },

    gotoCouponList () {
      console.log('跳转到TA的券详情')
      this.$router.push({name: '4.5', query: {memberId: this.queryParam.memberId}})
    }
  }
};
</script>
