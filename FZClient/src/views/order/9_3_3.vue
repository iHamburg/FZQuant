<!--促销列表-->
<style lang="scss" src="src/sass/promotion.scss" scoped></style>
<style lang="scss" src="src/sass/scrollList.scss" scoped></style>
<template>
    <div class="content-promo">
			<bl-bar barStyle="bar-dark-linear">
				<div class="button" slot="left-button" @click="$router.go(-1)">
				  <div class="iconfont arrow-back"></div><i class="fback">返回</i>
				</div>
				<div slot="title">选择优惠</div>
			</bl-bar>
      <div class="scrollList" style="padding-top:0;">
        <bl-comli v-show="!display" @click.native="noPromotion()">
            <div slot='left-text' class="left-box">不使用特殊促销规则</div>
            <div slot='right-text' class="right-box">
              <div class="iconfont arrow-back"></div>
            </div>
        </bl-comli>

    		<div v-for="item in promotionList" :class="" @click="pushPromotion(item)">
    			<dl>
    			    <dt>
    			        <i v-if="item.typeString == 0">减</i>
    			        <i v-if="item.typeString == 1">折</i>
    			        <i v-if="item.promotionMode == 1" class="te">特</i><i v-if="item.typeString == 3">指</i>
    			        <i v-if="item.typeString == 2">直</i>
    			        <h2>{{ item.title }}</h2>
    			    </dt>
    			    <dd>
    			        <div class="box">
    				       <!--  <span v-for="step in item.step">{{ step.name }}</span> -->
    				        <span v-if="item.content">{{ item.content }}</span>
    			        </div>
    			        <div class="iconfont arrow-back"></div>
    			    </dd>
    			    <dd>有效期：{{ item.beginAt }} 至 {{ item.endAt }}</dd>
    			</dl>
        </div>
        <div v-if="display" class="order-box">
          <img src="static/images/Rectangle37@2x.png" class="nodata">
        </div>
      </div>
     <!--  <button class="promotion-button"><i></i><span>创建促销活动</span></button> -->

	</div>
</template>

<script>
/*
type: 1进行中 2待审核 3待开始 4审核不通过 5失效
mold: 1减 2折 3特指 4直
*/
  export default {
    name: 'promotionList',
    mounted() {
      if (this.$route.params.customerId) {
        this.customerId = this.$route.params.customerId;
      }
      this.querySpecialPromotionByMerchant();
    },
    data () {
      return {
        customerId: '',
        display: false,
        selected: '1',
        promotionList: [],
        Promotion: [
          {'type': 1, 'mold': 1, 'name': '年中满额减1', 'step': [{'name': '199-30'}, {'name': '199-30'}], 'list': [{'name': '叠加，上限100次'}], 'startDate': '2017-11-01', 'endDate': '2017-12-31'},
          {'type': 2, 'mold': 1, 'name': '年中满额减2', 'step': [{'name': '199-30'}, {'name': '199-30'}], 'list': [{'name': '叠加，上限100次'}], 'startDate': '2017-11-01', 'endDate': '2017-12-31'},
          {'type': 3, 'mold': 1, 'name': '年中满额减3', 'step': [{'name': '199-30'}, {'name': '199-30'}], 'list': [{'name': '叠加，上限100次'}], 'startDate': '2017-11-01', 'endDate': '2017-12-31'},
          {'type': 4, 'mold': 2, 'name': '年中满额减4', 'step': [{'name': '199-30'}, {'name': '199-30'}], 'list': [{'name': '叠加，上限100次'}], 'startDate': '2017-11-01', 'endDate': '2017-12-31'},
          {'type': 5, 'mold': 3, 'name': '年中满额减5', 'step': [{'name': '199-30'}, {'name': '199-30'}], 'list': [{'name': '叠加，上限100次'}], 'startDate': '2017-11-01', 'endDate': '2017-12-31'},
          {'type': 1, 'mold': 4, 'name': '年中满额减6', 'step': [{'name': '199-30'}, {'name': '199-30'}], 'list': [{'name': '叠加，上限100次'}], 'startDate': '2017-11-01', 'endDate': '2017-12-31'},
          {'type': 2, 'mold': 1, 'name': '年中满额减7', 'step': [{'name': '199-30'}, {'name': '199-30'}], 'list': [{'name': '叠加，上限100次'}], 'startDate': '2017-11-01', 'endDate': '2017-12-31'}
        ]
      }
    },
    methods: {
      querySpecialPromotionByMerchant () {
        this.$promotionlib.querySpecialPromotionByMerchant((err, obj) => {
          if (err) {
            return this.$toast(err);
          }
          console.log('obj.promotionList ', JSON.stringify(obj.promotionList));
          this.promotionList = obj.promotionList;
          // 当数据为空时显示空图片
          if (this.promotionList.length <= 0) {
            this.display = true
          } else {
            this.display = false
          }
        });
      },
      pushPromotion(item) {
        //跳转到代客下单页面
        // alert("特殊活动Id：" + item.promotionId);
        //TODO 将活动Id传到代客下单页面
        this.$router.push({name: '9.3', params: {promotionId: item.promotionId, promotionName: item.title, customerId: this.customerId}});
      },

      noPromotion() {
        console.log('不使用特殊促销规则')
        this.$router.push({name: '9.3', params: {promotionId: 'noPromotion', promotionName: '请选择', customerId: this.customerId}});
      }
    }
  }
</script>
