<style lang="scss" src="src/sass/events.scss" scoped></style>
<template>
  <div class="events">

    <bl-bar barStyle="bar-dark-linear">
        <div class="button" slot="left-button" @click="$router.go(-1)">
          <div class="iconfont arrow-back"><i class="fback">返回</i></div>
        </div>
        <div slot="title">报名参加专题活动</div>
    </bl-bar>

    <bl-navbar v-model="selected" :fixed="true">
      <bl-tab-item id="1">待审核</bl-tab-item>
      <bl-tab-item id="2">审核未通过</bl-tab-item>
    </bl-navbar>

    <bl-tab-container v-model="selected">
      <bl-tab-container-item id="1">
          <div class="banner fixedtop" v-for="(item, index) in picture">
            <div class="banner-box">
              <h1>{{ item.title }}</h1>
              <p>{{ item.time }}</p>
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
      </bl-tab-container-item>

      <bl-tab-container-item id="2">
          <div class="banner fixedtop" v-for="(item, index) in picture">
            <div class="banner-box">
              <h1>{{ item.title }}</h1>
              <p>{{ item.time }}</p>
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
      </bl-tab-container-item>
    </bl-tab-container>




  </div> 
</template>

<script>
export default {
  name: 'eventTab',
  components: {
  },
  mounted() {
    // console.log(this.picture[0].pic)
  },

  data () {
    return {
      selected: '1',
      picture: [
        {
          image: '',
          title: '情人节某某女装9折大促销',
          time: '预计上线档期: 2017-03-15 ～ 2017-06-15',
          pic: [
            {url: 'static/images/p6_01.png'}, {url: 'static/images/p6_01.png'}, {url: 'static/images/p6_02.png'}, {url: 'static/images/p6_03.png'}, {url: 'static/images/p6_04.png'}
          ]
        },
        {
          image: 'static/images/h_02.jpg',
          title: '情人节某某女装9折大促销',
          time: '预计上线档期: 2017-03-15 ～ 2017-06-15',
          pic: [
            {url: 'static/images/p6_01.png'}
          ]
        },
        {
          image: '',
          title: '情人节某某女装9折大促销',
          time: '预计上线档期: 2017-03-15 ～ 2017-06-15',
          pic: [
            {url: 'static/images/p6_01.png'}, {url: 'static/images/p6_01.png'}, {url: 'static/images/p6_02.png'}, {url: 'static/images/p6_03.png'}, {url: 'static/images/p6_04.png'}
          ]
        },
        {
          image: '',
          title: '情人节某某女装9折大促销',
          time: '预计上线档期: 2017-03-15 ～ 2017-06-15',
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
