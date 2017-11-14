<style lang="scss" src="src/sass/events.scss" scoped></style>
<template>
  <div class="events">

    <bl-bar barStyle="bar-dark-linear">
        <div class="button" slot="left-button" @click="$router.go(-1)">
          <div class="iconfont arrow-back"><i class="fback">返回</i></div>
        </div>
        <div slot="title">报名参加专题活动</div>
    </bl-bar>

    <div class="banner" v-for="item in picture">
      <img v-if="item.image" :src="item.image">
      <img v-else src="static/images/banner.png">
      <div class="banner-box">
        <h1>{{ item.title }}</h1>
        <p>{{ item.time }}</p>
        <button>立刻报名</button>
      </div>
    </div>


  </div> 
</template>

<script>
export default {
  name: 'events',
  components: {
  },
  mounted() {

  },

  data () {
    return {
      picture: [
        {image: '', title: '情人节某某女装9折大促销', time: '预计上线档期: 2017-03-15 ～ 2017-06-15'},
        {image: '', title: '情人节某某女装9折大促销', time: '预计上线档期: 2017-03-15 ～ 2017-06-15'},
        {image: 'static/images/h_01.jpg', title: '情人节某某女装9折大促销', time: '预计上线档期: 2017-03-15 ～ 2017-06-15'},
        {image: 'static/images/h_01.jpg', title: '情人节某某女装9折大促销', time: '预计上线档期: 2017-03-15 ～ 2017-06-15'},
        {image: '', title: '情人节某某女装9折大促销', time: '预计上线档期: 2017-03-15 ～ 2017-06-15'}
      ]
    }
  },
  computed: {
  },
  methods: {
  }
}
</script>
