<template>
  <div class="content">
    <bl-bar barStyle="bar-dark-linear">
      <div class="button" slot="left-button" @click="$router.go(-1)">
        <div class="iconfont">退出</div>
      </div>
      <div slot="title">Lemonblue_悖论</div>
    </bl-bar>
    <div class="head-li02">
      <div class="badge-left">
        <div class="listImg"><img src="/static/images/yd-index.png" alt=""><input type="file" name="upload" class="buttonInput"></div>
        <div class="head-title">
          <div class="title-name">王小狼<span :class="{'active': isActive}">店长</span></div>
          <div class="describe">店员ID：1237891</div>
          <div class="describe">商 &nbsp;&nbsp;&nbsp;户：Lemonblue_悖论</div>
          <div class="describe">门 &nbsp;&nbsp;&nbsp;店：百联全渠道线下旗舰店</div>
        </div>
      </div>
    </div>
    <div class="scratchableLatex">
      <ul>
        <homepageEntrance v-for="item in datas" :homePage="item"></homepageEntrance>
      </ul>
    </div>
  </div>

</template>

<script>
  import homepageEntrance from 'components/scratchable-latex/scratchableLatex';
  // import api from 'src/api/index';
export default {
    name: '',
    components: {
      homepageEntrance
    },
    data () {
      return {
        datas: [
          /*{"imgUrl": "../static/images/xpsx3.png", "describe": "商品上新","show":1},
            {"imgUrl": "../static/images/spgl3.png", "describe": "商品库","href":"goodsSales","show":1},
            {"imgUrl": "../static/images/spgl3.png", "describe": "商品管理","href":"goodsManage","show":1},
            {"imgUrl": "../static/images/ddgl3.png", "describe": "订单管理","show":1},
            {"imgUrl": "../static/images/hxq3.png", "describe": "核销券","show":1},

            {"imgUrl": "../static/images/xqls3.png", "describe": "测试jsbridge","show":1},
            {"imgUrl": "../static/images/zxgj3.png", "describe": "营销工具","href":"promotions","show":1},
            {"imgUrl": "../static/images/sq3.png", "describe": "授权管理","show":1},

            {"imgUrl": "../static/images/xqls3.png", "describe": "销券流水","href":"salesCoupon","show":1},*/
        ],
        data: [],
        isActive: true
      }
    },
}
</script>
