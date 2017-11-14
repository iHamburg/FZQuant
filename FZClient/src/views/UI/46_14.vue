<template>
  <div class="content parking-bg">
    <bl-bar barStyle="bar-dark-linear">
        <div class="button" slot="left-button" @click="$router.go(-1)">
          <div class="iconfont arrow-back"><i class="fback">返回</i></div>
        </div>
        <div slot="title">购买停车券</div>
    </bl-bar>
    <div class="parking-main">
      <div class="padking-icon-2"></div>
      <div class="parking-font">支付成功</div>
      <div class="parking-list-font">订单编号：312798247189274<br>支付金额：¥1800.00</div>
      <div class="parking-button">
        <bl-button class="mt30">继续购买</bl-button>
        <bl-button type="other" class="mt30">查看券详情</bl-button>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'check',
  components: {
  },
  mounted() {
  },
  data () {
    return {
    }
  },
  methods: {
    ranking() {
    }
  }
}
</script>
