<style lang="scss" src="src/sass/createActivity.scss" scoped></style>
<template>
  <div class="content">

    <bl-bar barStyle="bar-dark-linear">
        <div class="button" slot="left-button" @click="$router.go(-1)">
          <div class="iconfont arrow-back"><i class="fback">返回</i></div>
        </div>
        <div slot="title">创建活动内容</div>
    </bl-bar>

    <div class="activity">
        <div class="actcontent">
            <textarea name="content" class="textarea" placeholder="预设内容" @keyup="init" ref="textarea"></textarea>
            <p class="init"><span :class="{'red':initText>200}">{{ initText }}</span>/{{ countNumber }}</p>
        </div>
    </div>

    <div class="bootedit">
        <bl-button :disabled="isPush">确定</bl-button>
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

  },
  data () {
    return {
      isPush: true,
      countNumber: 200,
      initText: 0
    }
  },
  methods: {
    init() {
      let val = this.$refs.textarea.value;
      if (val.length > 0) {
        this.isPush = false
        this.initText = val.length
      } else {
        this.initText = 0
        this.isPush = true
      }
      console.log(val, val.length)
    }
  }

}
</script>

