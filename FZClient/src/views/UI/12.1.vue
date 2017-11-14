<style lang="scss" src="src/sass/tag.scss" scoped></style>
<template>
  <div class="tag">

    <bl-bar barStyle="bar-dark-linear">
        <div class="button" slot="left-button" @click="$router.go(-1)">
          <div class="iconfont arrow-back"><i class="fback">返回</i></div>
        </div>
        <div slot="title" class="title">{{ title }}</div>
    </bl-bar>

    <bl-tags :tagarrs=tags></bl-tags>

    <div style="padding:.3rem">
      <p>单个标签组件</p><br/>
      <bl-tag :tagArray=tag :checked=false :ifAdd=true @tagcallback="tagtap" @tagclick="tagclick" @tagadd="tagadd"></bl-tag>
    </div>

  </div> 
</template>

<script>
export default {
  name: 'events',
  components: {
    'BlTags': () => System.import('components/cloud-merchant/tags'),
    'BlTag': () => System.import('components/cloud-merchant/tag')
  },
  mounted() {

  },

  data () {
    return {
      title: '标签组件',
      tags: [
        {state: false, name: '气质百搭'},
        {state: false, name: '新款镇店之宝'},
        {state: false, name: '限量'},
        {state: false, name: '明星同款'},
        {state: false, name: '店主推荐时尚时尚最时尚的'},
        {state: false, name: '存货不多'},
        {state: false, name: '限量'}
      ],
      tag: [
        {state: false, name: '爆款'},
        {state: false, name: '马云'},
        {state: true, name: '刘强东'},
        {state: false, name: '苍井空'},
        {state: false, name: '大波妹'}
      ]
    }
  },
  computed: {
  },
  methods: {
    tagtap(index) {
      console.log('tap', index)
    },
    tagclick(index) {
      console.log('click', index)
    },
    tagadd() {
      console.log('add')
    }
  }
}
</script>
