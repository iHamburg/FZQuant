<style lang="scss" src="src/sass/user.scss" scoped></style>
<template>
    <div class="user-content write">
      <bl-bar barStyle="bar-dark-linear">
          <div class="button" slot="left-button" @click="$router.go(-1)">
            <div class="iconfont arrow-back"><i class="fback">返回</i></div>
          </div>
          <div slot="title">审核结果</div>
      </bl-bar>

      <div class="logininfo">
          <em class="notices"><img :src="avatar"></img></em>
          <h1><div v-if='auditingFlag==0'>注册信息正在审核中...</div><div v-if='auditingFlag==2'>注册信息审核不通过</div></h1>
          <p >
        <div style="padding: 0 .3rem;" v-if='auditingFlag==0'>您提交的注册信息，当前正在等待 店长 的审核，请密切关注</div>
        <div style="padding: 0 .3rem;" v-if='auditingFlag==2'>您提交的注册信息，因 {{denyReason}} 审核不通过，请重新提交注册信息</div>
        </p>

          <bl-button class="submit" v-if="auditingFlag==2" @click="anewPerfectInfo">重新提交注册信息</bl-button>
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
        avatar: '',
        memberId: '',
        roleName: '',
        auditingFlag: '',
        denyReason: ''
      }
    },
    mounted() {
      console.log("mounted");
      this.avatar = this.$route.query.avatar
      this.memberId = this.$route.query.memberId
      this.roleName = this.$route.query.roleName
      this.auditingFlag = this.$route.query.auditingFlag
      this.denyReason = this.$route.query.denyReason
      console.log("avatar:" + this.avatar + ",memberId:" + this.memberId + ",roleName:" + this.roleName + ",auditingFlag:" + this.auditingFlag + ",denyReason:" + this.denyReason);
    },
    // activated() {
    //   console.log("activated");
    //   this.avatar = this.$route.query.avatar
    //   this.memberId = this.$route.query.memberId
    //   this.roleName = this.$route.query.roleName
    //   this.auditingFlag = this.$route.query.auditingFlag
    //   this.denyReason = this.$route.query.denyReason
    //   console.log("avatar:" + this.avatar + ",memberId:" + this.memberId + ",roleName:" + this.roleName + ",auditingFlag:" + this.auditingFlag + ",denyReason:" + this.denyReason);
    // },
    computed: {
    },
    methods: {
      anewPerfectInfo() {
        if (this.auditingFlag == 2) {
          this.$router.push({name: '1.2.1', params: {memberId: this.memberId}})
        }
      },
    }
  }
</script>
