<style lang="scss" src="src/sass/createActivity.scss" scoped></style>
<template>
  <div class="content">

    <bl-bar barStyle="bar-dark-linear">
      <!--<div class="button" slot="left-button" @click="$router.go(-1)">-->
        <!--<div class="iconfont arrow-back"><i class="fback">返回</i></div>-->
      <!--</div>-->
      <div slot="title">{{popupTitle}}</div>
    </bl-bar>

    <div class="activity">
      <div class="actcontent">
        <textarea name="content" class="textarea" placeholder="预设内容" @keyup="getTextNum" ref="textarea" v-model="text"></textarea>
        <p class="init">
          <span :class="{'red':textNum > countNumber}">{{ textNum }}</span>
          /{{ countNumber }}</p>
      </div>
    </div>

    <div class="bootedit">
      <!--<bl-button :disabled="isPush" @click="onSubmit()">确定</bl-button>-->
      <bl-button :disabled="isPush" @click="onSubmit()">确定</bl-button>
    </div>

  </div>
</template>

<script>

  export default {
    name: 'multi-input',
    components: {

    },
    props: ['countNumber', 'inputText', 'popupTitle'],
    mounted() {
      // console.log('mounted')
      this.getTextNum()
    },
    data () {
      return {
        isPush: true,
        // countNumber: 0,
        textNum: 0,
        text: this.inputText, // 输入的内容,
        // inputText1: 'sss',
      }
    },
    methods: {

      getTextNum() {
        // let val = this.$refs.textarea.value
        let val = this.text;
        // console.log('init里面', this.text)
        // console.log('输入的text：', val, '长度', val.length)
        if (val.length > 0) {
          this.isPush = false
          this.textNum = val.length
        } else {
          this.isPush = true
          this.textNum = 0
        }
        // this.text = val
        // this.inputText = val
      },

      onSubmit() {
        // console.log('输入', this.inputText);
        if (this.$refs.textarea.value.length > this.countNumber) {
          return this.$toast('文字超出数量')
        }
        // this.inputText = this.text
        this.$emit('input', this.text);
      }
    },
    watch: {
      inputText(val) {
        console.log('bian le', val)
        this.text = val
        this.getTextNum()
      },
      text() {
        this.getTextNum()
      },
    },
  }
</script>

