<style lang="scss" src="src/sass/user.scss" scoped></style>
<template>
    <div class="user-content write">
      <bl-bar barStyle="bar-dark-linear">
          <div class="button" slot="left-button" @click="$router.go(-1)">
            <div class="iconfont arrow-back"><i class="fback">返回</i></div>
          </div>
          <div slot="title">操作失败</div>
      </bl-bar>

      <div class="logininfo">
          <em class="notices"></em>
          <h1>信息正在审核中</h1>
          <p>内容详情，根据实际情况来，如果换行则不超过规定长度，居中展现文字链接</p>

          <bl-button class="submit">确 定</bl-button>
      </div>

    </div>
</template>

<script type="text/babel">
  export default {
    name: 'userLogin',
    components: {
    },
    data () {
      return {
      }
    },
    mounted() {
    },
    computed: {
    },
    methods: {
    }
  }
</script>
