<template>
  <div class="content-rule">

    <bl-bar barStyle="bar-dark-linear">
        <div class="button" slot="left-button" @click="$router.go(-1)">
          <div class="iconfont arrow-back"><i class="fback"></i></div>
        </div>
        <div slot="title" style="color:#000">百联通会员章程</div>
    </bl-bar>

    <ul class="rule">
      <li v-for="(item, index) in data" @click="open(item, index)">
         <span>{{ item.name }}</span>
         <i class="iconfont arrow-back" :class="{'open':item.open}"></i>
         <ul class="rule-box" v-if="item.open">
           <li v-for="title in item.child">{{ title.title }}</li>
         </ul>
      </li>
    </ul>

  </div>

</template>

<script>
export default {
  name: 'rules',
  components: {
  },
  mounted() {

  },

  data () {
    return {
      data: [
        {name: '会员等级', open: false, child: [{title: 1}, {title: 2}, {title: 3}]},
        {name: '会员等级', open: false, child: [{title: 888}, {title: 2}, {title: 3}]},
        {name: '会员等级', open: false, child: [{title: 888}, {title: 2}, {title: 3}]},
        {name: '会员等级', open: false, child: [{title: 888}, {title: 2}, {title: 3}]},
        {name: '会员等级', open: false, child: [{title: 888}, {title: 2}, {title: 3}]},
        {name: '会员等级', open: false, child: [{title: 888}, {title: 2}, {title: 3}]},
        {name: '会员等级', open: false, child: [{title: 888}, {title: 2}, {title: 3}]},
        {name: '会员等级', open: false, child: [{title: 888}, {title: 2}, {title: 3}]},
        {name: '会员等级', open: false, child: [{title: 888}, {title: 2}, {title: 3}]},
        {name: '会员等级', open: false, child: [{title: 888}, {title: 2}, {title: 3}]}
      ]
    }
  },
  computed: {
  },
  methods: {
    open(item, index) {
      let state = this.data[index].open
      if (this.data[index].open == true) {
        this.data[index].open = false
      } else {
        this.data[index].open = true
      }
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
      .bar.bar-dark-linear{
        background-color: #FCFCFC;
        border-bottom: 1px solid #d9d9d9;
      }
      .arrow-back{
        color: #000;
      }
      .rule{
        background-color: #fff;
        padding: 0 rem(30);
        li{
          clear: both;
          color: #333;
          overflow: hidden;
          line-height: rem(88);
          border-bottom: 1px solid #E7E7E7;
          span{
            float: left;
            font-size: rem(28);
          }
        }
        .arrow-back{
          color: #aaa;
          float: right;
          line-height: rem(88);
          transform: rotate(270deg);
        }
        .open{
          transform: rotate(90deg);
        }
      }
      .rule-box{
        li:last-child{
          border:0;
        }
      }
  }
</style>
