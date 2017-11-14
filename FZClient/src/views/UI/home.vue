<template>
  <div class="home">
    <keep-alive :include="/keep/">
      <router-view></router-view>
    </keep-alive>
    <homepageEntrance1 v-for="item in datas02" :tabIndex="item"></homepageEntrance1>
  </div>
</template>
<!-- <template>
  <div class="home">
    <router-view></router-view>
    <keep-alive>
      <homepageEntrance1 v-for="item in datas02" :tabIndex="item"></homepageEntrance1>
    </keep-alive>
  </div>
</template> -->

<script>
import homepageEntrance1 from 'components/scratchable-latex/tab-index';
export default {
  name: 'home',
  components: {
    homepageEntrance1
  },
  data () {
    return {
      datas02: [
          {"number": "8", "imgUrl1": "../static/images/gzt3.png", "workbench": "工作台", "path": "/ui/homepageEntrance", "imgUrl01": "../static/images/gzt03.png", "imgUrl2": "../static/images/xx3.png", "message": "消息", "path02": "/ui/message", "imgUrl02": "../static/images/xx03.png", "show": 1}
      ],
    }
  },
  props: {
    tabIndex: Object
  },
}
</script>
