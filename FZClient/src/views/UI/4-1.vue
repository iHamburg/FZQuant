<template>
  <div class="content management">
    <bl-bar barStyle="bar-dark-linear">
        <div class="button" slot="left-button" @click="$router.go(-1)">
          <div class="iconfont arrow-back"><i class="fback">返回</i></div>
        </div>
        <div slot="title">授权管理</div>
    </bl-bar>


    <bl-button>查询申请授权的用户</bl-button>

    <bl-button>查询已授权用户</bl-button>

  </div>

</template>

<script>
// import api from 'src/api/index'
export default {
  name: 'management',

  components: {
  },
  mounted() {

  },
  data () {
    return {

    }
  },
  methods: {

  }

}
</script>
