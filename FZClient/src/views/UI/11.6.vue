<style lang="scss" src="src/sass/events.scss" scoped></style>
<template>
  <div class="events">

    <bl-bar barStyle="bar-dark-linear">
        <div class="button" slot="left-button" @click="$router.go(-1)">
          <div class="iconfont arrow-back"><i class="fback">返回</i></div>
        </div>
        <div slot="title">已入选的专题</div>
    </bl-bar>


    <div class="banner fixedtop" v-for="(item, index) in picture">
      <div class="banner-box">
        <h1>{{ item.title }}</h1>
        <p>{{ item.time }}</p>
        <span class="green" v-if="item.state == '上线中'">{{ item.state }}</span>
        <span class="orange" v-if="item.state == '待上线'">{{ item.state }}</span>
        <span class="red" v-if="item.state == '已下线'">{{ item.state }}</span>
      </div>
      <img v-if="item.image" :src="item.image">
      <img v-else src="static/images/banner.png">

      <div class="pic-box" >
          <div class="rbox">
            <img v-for="(pic, key) in item.pic" :src="pic.url" v-if="key < 4">
          </div>
          <div class="sis" v-if="item.pic.length > 4"></div>
          <div class="iconfont arrow-back"></div>
      </div>
    </div>




  </div> 
</template>

<script>
export default {
  name: 'eventAlready',
  components: {
  },
  mounted() {
  },

  data () {
    return {
      selected: '1',
      picture: [
        {
          image: '',
          title: '情人节某某女装9折大促销',
          time: '预计上线档期: 2017-03-15 ～ 2017-06-15',
          state: '上线中',
          pic: [
            {url: 'static/images/p6_01.png'}, {url: 'static/images/p6_01.png'}, {url: 'static/images/p6_02.png'}, {url: 'static/images/p6_03.png'}, {url: 'static/images/p6_04.png'}
          ]
        },
        {
          image: 'static/images/h_02.jpg',
          title: '情人节某某女装9折大促销',
          time: '预计上线档期: 2017-03-15 ～ 2017-06-15',
          state: '待上线',
          pic: [
            {url: 'static/images/p6_01.png'}
          ]
        },
        {
          image: '',
          title: '情人节某某女装9折大促销',
          time: '预计上线档期: 2017-03-15 ～ 2017-06-15',
          state: '上线中',
          pic: [
            {url: 'static/images/p6_01.png'}, {url: 'static/images/p6_01.png'}, {url: 'static/images/p6_02.png'}, {url: 'static/images/p6_03.png'}, {url: 'static/images/p6_04.png'}
          ]
        },
        {
          image: '',
          title: '情人节某某女装9折大促销',
          time: '预计上线档期: 2017-03-15 ～ 2017-06-15',
          state: '已下线',
          pic: [
            {url: 'static/images/p6_01.png'}, {url: 'static/images/p6_01.png'}, {url: 'static/images/p6_02.png'}, {url: 'static/images/p6_03.png'}, {url: 'static/images/p6_04.png'}
          ]
        }
      ]
    }
  },
  computed: {
  },
  methods: {
  }
}
</script>
