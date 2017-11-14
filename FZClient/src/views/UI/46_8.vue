<template>
  <div class="content">
    <bl-bar barStyle="bar-dark-linear">
        <div class="button" slot="left-button" @click="$router.go(-1)">
          <div class="iconfont arrow-back"><i class="fback">返回</i></div>
        </div>
        <div slot="title">发券二维码</div>
    </bl-bar>
    <div class="check-QRcode">
      <div class="QRcode-main">
        <div class="QRcode-title">
          <span><i></i>扫码领券</span>
        </div>
        <div class="QRcode-img"><img src="static/images/code-img.png"></div>
        <div class="QRcode-font"><a href="#">点击刷新</a></div>
      </div>
      <div class="QRcode-main mt20">
        <div class="QRcode-title">
          <span><i></i>券状态</span>
          <a href="#">查看详情</a>
        </div>
        <div class="state-ul">
          <ul>
            <li v-for="(item, index) in statelist" :class="{ on : item.state=='可发放' }">
              <span>{{ item.state }}</span>
              <i>{{ item.number }}</i>
            </li>
          </ul>
        </div>
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
      statelist: [{
        state: '已领取',
        number: '20张'
      },
      {
        state: '已核销',
        number: '220张'
      },
      {
        state: '已返还',
        number: '220张'
      },
      {
        state: '可发放',
        number: '230张'
      }]
    }
  },
  methods: {
    ranking() {
    }
  }
}
</script>
