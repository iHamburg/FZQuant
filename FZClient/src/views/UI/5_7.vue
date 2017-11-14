<template>
  <div class="content">

    <bl-bar barStyle="bar-dark-linear">
        <div class="button" slot="left-button" @click="$router.go(-1)">
          <div class="iconfont arrow-back"><i class="fback">返回</i></div>
        </div>
        <div slot="title" @click="popup = !popup">全部商品<i></i></div>
        <i slot="right-button" class="icon iconfont more-v"></i>
    </bl-bar>

    <bl-popup v-model="popup" position="top" style="width: 100%;">
        <bl-top-menu></bl-top-menu>
    </bl-popup>

    <bl-popup v-model="menulist" position="right" class="menulist" >
        <bl-right-menu  ref="rightmenu" v-on:child-say="listenToMyBoy"></bl-right-menu>
    </bl-popup>

    <div class="navbar-box">
      <bl-navbar v-model="selected">
        <bl-tab-item id="1">最新</bl-tab-item>
        <bl-tab-item id="3">销量</bl-tab-item>
        <bl-tab-item id="2">价格<div @click="isCheck = !isCheck"><i class="pcreen" v-bind:class="{dcreen:isCheck}"></i></div></bl-tab-item>
        <div class="tab-item" @click="rightmenu()">
            <div class="tab-item-text hairline">筛选<i class="screen"></i></div>
        </div>
      </bl-navbar>
      <bl-tab-container v-model="selected">
        <bl-tab-container-item id="1">
            <div class="salescard" v-for="item in itemcards">
                <bl-batch-card :itemData="item"></bl-batch-card>
                <div class="salepad"><a href="javascript:;" class="rline dcolor">SKU属性管理</a>  <a href="javascript:;" class="rline">添加商品二维码</a>  <a href="javascript:;">编辑商品</a></div>
            </div>
        </bl-tab-container-item>
        <bl-tab-container-item id="2">
            <div class="salescard" v-for="item in itemcards">
                <bl-batch-card :itemData="item"></bl-batch-card>
                <div class="salepad"><a href="javascript:;" class="rline dcolor">SKU属性管理</a>  <a href="javascript:;" class="rline">添加商品二维码</a>  <a href="javascript:;">编辑商品</a></div>
            </div>
        </bl-tab-container-item>
        <bl-tab-container-item id="3">
            <div class="salescard" v-for="item in itemcards">
                <bl-batch-card :itemData="item"></bl-batch-card>
                <div class="salepad"><a href="javascript:;" class="rline dcolor">SKU属性管理</a>  <a href="javascript:;" class="rline">添加商品二维码</a>  <a href="javascript:;">编辑商品</a></div>
            </div>
        </bl-tab-container-item>
      </bl-tab-container>
    </div>


  </div>

</template>

<script>

//  import xxx
export default {
  name: 'goodSales',

  components: {
    'BlCouponCard': () => System.import('components/cloud-merchant/coupon-card'),
    'BlBatchCard': () => System.import('components/cloud-merchant/batch-card'),
    'BlTopMenu': () => System.import('components/cloud-merchant/top-menu'),
    'BlRightMenu': () => System.import('components/cloud-merchant/right-menu')
  },
  mounted() {

  },
  data () {
    return {
      popup: false,
      menulist: false,
      isCheck: false,
      modalFade: {
        default: true
      },
      selected: '1',

      itemcards: [
        /*{"sbool": true,"txt":"无货","style": "no-goods", "url": "static/weui/images/dr.png","title": "小狼的多浆植物","number": "2665448662216632", "price": "66.88", "sale": "50.00"},
        {"sbool": false,"txt":" ","style": "no-goods", "url": "static/weui/images/dr.png","title": "小狼的多浆植物","number": "2665448662216632", "price": "66.88", "sale": "50.00"},
        {"sbool":true,"txt":"待审核","style": "pend-goods", "url": "static/weui/images/dr.png","title": "小狼的多浆植物","number": "2665448662216632", "price": "66.88", "sale": "50.00"},
        {"sbool":true,"txt":"已下架","style": "under-goods", "url": "static/weui/images/dr.png","title": "小狼的多浆植物","number": "2665448662216632", "price": "66.88", "sale": "50.00"},
        {"sbool":true,"txt":"审核不通过","style": "audit-goods", "url": "static/weui/images/dr.png","title": "小狼的多浆植物","number": "2665448662216632", "price": "66.88", "sale": "50.00"},
        {"sbool":true,"txt":"草稿","style": "draft-goods", "url": "static/weui/images/dr.png","title": "小狼的多浆植物","number": "2665448662216632", "price": "66.88", "sale": "50.00"}*/
      ],

      couponTemplateId: null,
    }
  },
  methods: {
    rightmenu() {
      this.menulist = true;
      this.$refs.rightmenu.open();
    },
    listenToMyBoy(data) {
      this.menulist = data;
    }
  }

}
</script>
