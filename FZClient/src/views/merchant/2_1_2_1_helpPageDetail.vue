<template>
  <div class="content-rule">

    <bl-bar barStyle="bar-dark-linear">

      <div class="button" slot="left-button" @click="$router.go(-1)">
        <div class="iconfont arrow-back"><i class="fback">返回</i></div>
      </div>
      <div slot="title">{{ title }}</div>
    </bl-bar>

    <ul class="imageDiv">
      <li v-for="(item, index) in images">
        <img :src="item" @click="clickImg(index)">
      </li>

    </ul>


  </div>

</template>

<script>
export default {
  name: 'keepHelpPageDetail',
  components: {
  },
  mounted() {

  },

  data () {
    return {
      title: '',
      images: [],
    }
  },
  computed: {
  },
  activated() {
    if (this.$route.params.title) {
      this.title = this.$route.params.title;
      var list = [];
      this.$route.params.images.forEach((item) => {
        list.push('static/images/userHelpImage/' + item + '.jpg');
      })
      this.images = list;
    }
    console.log("activated------ ", this.images);
  },
  methods: {
    open(item, index) {
      let state = this.data[index].open
      if (this.data[index].open == true) {
        this.data[index].open = false
      } else {
        this.data[index].open = true
      }
    },
    clickedItem (item) {
      console.log('-----', item.images)
    },
    clickImg(index) {
      console.log('index------ ', index)
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "src/sass/tobe/function";
  .content-rule{
      padding-top: rem(88);
      .fback{
          @include i-fback()
      }

     .imageDiv {
      img {
        width: 100%;
        height: auto;

      }
    }


  }
</style>
