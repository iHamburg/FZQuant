<style lang="scss" src="src/sass/createActivity.scss" scoped></style>
<template>
  <div class="content">

    <bl-bar barStyle="bar-dark-linear">
      <div class="button" slot="left-button" @click="$router.go(-1)">
        <div class="iconfont arrow-back"><i class="fback">返回</i></div>
      </div>
      <div slot="title">{{title}}</div>
    </bl-bar>

    <div class="activity">
      <div class="actcontent">
        <textarea name="content" class="textarea" placeholder="预设内容" @keyup="init" ref="textarea"></textarea>
        <p class="init"><span :class="{'red':initText>200}">{{ initText }}</span>/{{ countNumber }}</p>
      </div>
    </div>

    <div class="bootedit">
      <bl-button :disabled="isPush" @click="onSubmit()">确定</bl-button>
    </div>

  </div>
</template>

<script>
  // import api from 'src/api/index'
  export default {
    name: 'actContent',
    components: {
    },
    mounted() {
      this.initializationData()
    },
    data () {
      return {
        isPush: true,
        countNumber: 0,
        initText: 0,
        title: '',
        text: '' // 输入的内容
      }
    },
    methods: {
      /**
       * 初始化数据 回显
       * @return {[type]} [description]
       */
      initializationData() {
        let title = this.$route.params.title
        let localActivity = this.$activitylib.getLocalActivity()
        if (title == 'rule') {
          this.title = '创建活动规则'
          this.countNumber = 1000
          this.$refs.textarea.value = localActivity.activityRule
        } else if (title == 'content') {
          this.title = '创建活动内容'
          this.countNumber = 500
          this.$refs.textarea.value = localActivity.activityContent
        }
        this.init()
      },

      init() {
        let val = this.$refs.textarea.value;
        if (val.length > 0) {
          this.isPush = false
          this.initText = val.length
        } else {
          this.isPush = true
          this.initText = 0
        }
        // console.log(val, val.length)
        this.text = val
      },

      onSubmit() {
        // console.log(this.$refs.textarea.value.length)
        if (this.$refs.textarea.value.length > this.countNumber) {
          return this.$toast('文字超出数量')
        }
        // console.log('输入的内容', this.text)
        // 把输入的内容放到localActivity
        let localActivity = this.$activitylib.getLocalActivity()
        if (this.$route.params.title == 'rule') {
          // console.log('rule')
          localActivity.activityRule = this.text
        } else if (this.$route.params.title == 'content') {
          // console.log('content')
          localActivity.activityContent = this.text
        }
        console.log('放入activitylib的localActivity', localActivity)
        this.$activitylib.updateLocalActivity(localActivity)
        // 返回上一页面
        this.$router.go(-1)
      }
    }

  }
</script>

