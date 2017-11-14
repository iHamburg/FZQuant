<!--商户购买提示-->
<style lang="scss" src="src/sass/merSetting.scss" scoped></style>
<template>
  <div class="content">

    <bl-bar barStyle="bar-dark-linear">
        <div class="button" slot="left-button" @click="$router.go(-1)">
          <div class="iconfont arrow-back"><i class="fback">返回</i></div>
        </div>
        <div slot="title">个人简介</div>
    </bl-bar>

    <div class="merset">
      <div class="shopContent">
          <textarea name="content" type="text" class="textarea" maxlength="60" placeholder="向您的客户更好地介绍自己吧" @keyup="init" ref="textarea" v-model.trim="resumeContent"></textarea>
          <p class="init"><span :class="{'red':initText>60}">{{ initText }}</span>/{{ countNumber }}</p>
      </div>
    </div>

    <div class="bootedit">
        <bl-button :disabled="isPush" @click="updateIndividualResume()">确定</bl-button>
    </div>


  </div>
</template>

<script>

export default {
  name: 'individualResume',

  components: {

  },

  mounted() {
    this.queryResumeContent();
    document.body.scrollTop = 0;
  },

  data () {
    return {
      isPush: true,
      countNumber: 60,
      initText: 0,
      resumeContent: '',
      shopContentFlag: '',
    }
  },

  methods: {
    // 1043-查询员工基础信息 findMemberBasicInfo
    queryResumeContent(callback) {
      this.$merchantlib.findMemberBasicInfo((err, obj) => {
        if (err) {
          this.$toast(err)
        }
        if (obj) {
          this.resumeContent = obj.personalProfile
        }
      })
    },
    init() {
      let param = this.resumeContent;
      // emoji表情包过滤
      this.resumeContent = this.$utillib.filterFace(param)
      console.log('个人简介内容：', 'this.resumeContent:', this.resumeContent, 'length:', this.resumeContent.length)
      let val = this.resumeContent;
      if (val.length > 0) {
        this.isPush = false
        this.initText = val.length
      } else if (val == '') {
        this.initText = 0
        this.isPush = true
      }
      console.log(val, val.length)
    },

    // 1041-更新商户个人信息接口
    updateIndividualResume() {
      let params = {
        individualResume: this.resumeContent
      }
      console.log('点击确定', JSON.stringify(params))
      this.$merchantlib.updateIndividualResume(params, (err, obj) => {
        if (err) {
          return this.$toast(err)
        }
        this.$toast('个人简介设置成功')
        this.$router.go(-1)
      })
    },
  },
  computed: {
  },

  watch: {
    resumeContent: function (val, oldVal) {
      console.log('newVal：', val, '，oldVal：', oldVal)
      this.init()
    }
  }

}
</script>
