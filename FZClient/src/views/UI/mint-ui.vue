<template>
  <div class="content">
  <bl-bar barStyle="bar-dark-linear">
    <div class="button" slot="left-button" @click="$router.go(-1)">
      <div class="iconfont">退出</div>
    </div>
    <div slot="title">Mint</div>
  </bl-bar>

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
