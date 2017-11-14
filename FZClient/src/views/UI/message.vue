<template>
  <div class="content">
  <bl-bar barStyle="bar-dark-linear">
    <div class="button" slot="left-button" @click="$router.go(-1)">
      <div class="iconfont">退出</div>
    </div>
    <div slot="title">消息</div>
  </bl-bar>
  222
  </div>

</template>

<script>
export default {
  name: '',
  components: {
  },
  data () {
    return {

    }
  },
}
</script>
