<template>
  <div class="content parking-bg">
    <bl-bar barStyle="bar-dark-linear">
        <div class="button" slot="left-button" @click="$router.go(-1)">
          <div class="iconfont arrow-back"><i class="fback">返回</i></div>
        </div>
        <div slot="title">购买停车券</div>
    </bl-bar>
    <div class="parking-main">
      <div class="padking-icon-1"></div>
      <div class="parking-font">支付失败</div>
      <div class="parking-list-font">订单编号：312798247189274<br>订单金额：¥50.00</div>
      <div class="parking-button">
        <bl-button class="mt30">重新支付</bl-button>
        <bl-button type="other" class="mt30">看看其他</bl-button>
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
