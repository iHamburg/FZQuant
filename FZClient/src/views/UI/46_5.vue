<template>
  <div class="content">
    <bl-bar barStyle="bar-dark-linear">
        <div class="button" slot="left-button" @click="$router.go(-1)">
          <div class="iconfont arrow-back"><i class="fback">返回</i></div>
        </div>
        <div slot="title">核销明细</div>
    </bl-bar>
    <div class="check-catalog">
      <ul>
        <li @click="ranking()">日期<i></i></li>
        <li @click="ranking()">已返还<i></i></li>
        <li @click="ranking()">已核销<i></i></li>
      </ul>
    </div>
    <div class="check-main">
      <ul>
        <li v-for="(item, index) in checklist">
          <div class="number">{{ item.time }}</div>
          <div class="number number-center">{{ item.listreturn }}</div>
          <div class="number number-center">{{ item.destroy }}</div>
          <i></i>
        </li>
      </ul>
    </div>
    <div class="check-more"><span>下拉加载更多</span></div>
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
      checklist: [{
        time: '2017-09-21',
        listreturn: '2000张',
        destroy: '1000张'
      },
      {
        time: '2017-09-21',
        listreturn: '5000张',
        destroy: '2300张'
      },
      {
        time: '2017-09-21',
        listreturn: '6700张',
        destroy: '1220张'
      },
      {
        time: '2017-09-21',
        listreturn: '3200张',
        destroy: '300张'
      },
      {
        time: '2017-09-21',
        listreturn: '8300张',
        destroy: '236张'
      },
      {
        time: '2017-09-21',
        listreturn: '6700张',
        destroy: '4700张'
      },
      {
        time: '2017-09-21',
        listreturn: '1000张',
        destroy: '230张'
      },
      {
        time: '2017-09-21',
        listreturn: '7500张',
        destroy: '230张'
      },
      {
        time: '2017-09-21',
        listreturn: '56000张',
        destroy: '2000张'
      },
      {
        time: '2017-09-21',
        listreturn: '33000张',
        destroy: '1000张'
      },
      {
        time: '2017-09-21',
        listreturn: '3200张',
        destroy: '300张'
      },
      {
        time: '2017-09-21',
        listreturn: '8300张',
        destroy: '236张'
      },
      {
        time: '2017-09-21',
        listreturn: '6700张',
        destroy: '4700张'
      },
      {
        time: '2017-09-21',
        listreturn: '1000张',
        destroy: '230张'
      },
      {
        time: '2017-09-21',
        listreturn: '7500张',
        destroy: '230张'
      },
      {
        time: '2017-09-21',
        listreturn: '56000张',
        destroy: '2000张'
      },
      {
        time: '2017-09-21',
        listreturn: '33000张',
        destroy: '1000张'
      },
      {
        time: '2017-09-21',
        listreturn: '3200张',
        destroy: '300张'
      },
      {
        time: '2017-09-21',
        listreturn: '8300张',
        destroy: '236张'
      },
      {
        time: '2017-09-21',
        listreturn: '6700张',
        destroy: '4700张'
      },
      {
        time: '2017-09-21',
        listreturn: '1000张',
        destroy: '230张'
      },
      {
        time: '2017-09-21',
        listreturn: '7500张',
        destroy: '230张'
      },
      {
        time: '2017-09-21',
        listreturn: '56000张',
        destroy: '2000张'
      },
      {
        time: '2017-09-21',
        listreturn: '33000张',
        destroy: '1000张'
      }]
    }
  },
  methods: {
    ranking() {
      var l = event.currentTarget.className;
      l == "upper" ? event.currentTarget.className = "lower" : l == "lower" ? event.currentTarget.className = "" : event.currentTarget.className = "upper";
    }
  }
}
</script>
