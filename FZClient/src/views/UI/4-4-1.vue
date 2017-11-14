<template>
  <div class="audetail">
    <div class="content">
 	  <bl-bar barStyle="bar-dark-linear">
        <div class="button" slot="left-button" @click="$router.go(-1)">
        <div class="iconfont arrow-back"></div>返回
      </div>
      <div slot="title">主播详情</div>
    </bl-bar>
  </div>

  <bl-comli class="tips">
    <div slot='left-text'>申请状态</div>
    <div slot='right-text' class="red">待云店中台审核</div>
  </bl-comli>

  <div class="badge">
  	<div class="badge-head">
	  头像
	  <div class="head-img">
	  	<img :src="item.photoUrl">
	  </div>
  	</div>
  </div>
  <bl-comli>
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

  <bl-comli  class="margin-t">
  	<div slot='left-text'>申请角色</div>
  	<div slot='right-text'>营业员主播</div>
  </bl-comli>
  <bl-comli >
    <div slot='left-text'>真实姓名</div>
    <div slot='right-text'>{{item.employeeId}}</div>
  </bl-comli>
  <bl-comli >
    <div slot='left-text'>身份证号</div>
    <div slot='right-text'>{{item.personNo}}</div>
  </bl-comli>

  <upload :maxpic='paths1.length' :paths='paths1' :name='"身份证"' @clickImg='parentImg'></upload>
  <upload :maxpic='paths2.length' :paths='paths2' :name='"个人近照"' @clickImg='parentImg'></upload>
  <upload :maxpic='paths3.length' :paths='paths3' :name='"第三方社交平台主页截图"' @clickImg='parentImg'></upload>
  <div class="watch-pic" ref='big' @click='hidebig'>
    <div class="pic-box">
      <img :src="siglepath">
    </div>
  </div>

  <div class="fotbar">
      <button @click="isDay = !isDay">通过并设置天数</button>
      <button class="setday" @click="isPass = !isPass">不通过</button>
  </div>

  <bl-modal :buttons="buttons" v-if="isPass">
    <div slot="inner">
        <div>确认审核不通过吗？</div>
    </div>
  </bl-modal>

  <bl-modal :buttons="butday" v-if="isDay">
    <div slot="inner">
        <div>设置授权天数</div>
        <div class="setinit">
          <i class="reduce" @click="reduce">-</i>
          <input name="number" type="text" v-model="countDay" ref="getval">
          <i class="add" @click="add">+</i>
        </div>
    </div>
  </bl-modal>

</div>
</template>
<script>
// import utils from 'src/utils';
// import uiMixin from 'src/mixins/uiMixin';
// import networklib from 'src/libs/networklib';
// import merchantlib from 'src/libs/merchantlib';
import upload from 'components/cloud-merchant/upload';
export default {

  name: 'audDetail',
  components: {
    upload
  },
  data() {
    return {
      isDay: false,
      isPass: false,
      buttons: [{
        text: '我再想想',
        onClick: () => {
          this.isOff = false
          this.$toast('取消')
        }
      }, {
        text: '确认',
        onClick: () => {
          this.isOff = false
          this.$toast('确认')
        }
      }],
      butday: [{
        text: '取消',
        onClick: () => {
          this.isOff = false
          this.$toast('取消')
        }
      }, {
        text: '设置完成',
        onClick: () => {
          this.isOff = false
          this.$toast('设置完成')
        }
      }],
      countDay: 30,
      item: {
        photoUrl: 'static/images/yy.png',
        memberId: '234234565656723',
        memberPhone: '15866559988',
        surplusDays: '88',
        employeeId: '霍子俊',
        personNo: '2565987564556233222',
        income: '8000'

      },
      paths1: ["static/images/p6_02.png", "static/images/p6_02.png"],
      paths2: ["static/images/p6_02.png", "static/images/p6_02.png", "static/images/p6_02.png", "static/images/p6_02.png"],
      paths3: ["static/images/p6_02.png", "static/images/p6_02.png", "static/images/p6_01.png", "static/images/p6_02.png", "static/images/p6_02.png"],
      queryParam: {
        merchantId: null,
        memberId: null,
        roleId: null
      },
      siglepath: '',
    }
  },
  mounted() {

  },
  methods: {
    add() {
      this.countDay ++
    },
    reduce() {
      if (this.countDay > 1) {
        this.countDay --
      } else {
        this.countDay = 0
      }
    },
    parentImg(index) {
      this.siglepath = event.currentTarget.src;
      this.$refs.big.style.visibility = 'visible';
    },
    hidebig() {
      this.$refs.big.style.visibility = 'hidden';
    }
  }
};
</script>
