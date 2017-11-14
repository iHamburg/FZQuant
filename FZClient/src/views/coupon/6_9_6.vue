<style lang="scss" src="src/sass/check.scss" scoped></style>
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

    <bl-scroll :enableRefresh="true" :onRefresh="onRefresh" :on-infinite="onInfinite" :enableInfinite="isLoading" v-scroll-record>
      <div class="check-main">
        <ul>
          <li v-for="(item, index) in checklist">
            <div @click="onClick(item)">
              <div class="number">{{ item.time }}</div>
              <div class="number number-center">{{ item.listreturn }}</div>
              <div class="number number-center">{{ item.destroy }}</div>
              <i></i>
            </div>
          </li>
        </ul>
      </div>
    </bl-scroll>

  </div>
</template>

<script>
export default {
  name: 'check',

  data () {
    return {
      isLoading: true,
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
    };
  },
  created() {

  },
  mounted() {

  },
  activated() {

  },
  methods: {
    ranking() {
      var l = event.currentTarget.className;
      l == "upper" ? event.currentTarget.className = "lower" : l == "lower" ? event.currentTarget.className = "" : event.currentTarget.className = "upper";
    },

    onRefresh (done) {
      console.log('refresh')
      this.updateData(done);
    },
    onInfinite (done) {
      console.log('infinite')
      this.updateData(done);
    },

    updateData(done) {
      if (done) { done() }
    },

    onClick(item) {
      console.log('click:', JSON.stringify(item))
    },
  },
  watch: {

  },
  computed: {

  }

};
</script>
