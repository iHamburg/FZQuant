<!-- @ 查看大图组件 -->
<template>
  <div class="watch-pic1" :class="{'backTransparent1': backTransparent, 'backTransparent': !backTransparent}"  @click='closeBigImage' v-if="isShow" @touchmove.prevent>
    <div class="pic-box1" :class="{'noMainBtn':!needmain}">
      <img :src="siglepath">
    </div>
    <div class="set-main1" @click='setMainImg()' v-if="needmain">
      {{mainPicStr}}
    </div>
  </div>
</template>
<script>

import uiMixin from 'src/mixins/uiMixin';
export default {

  name: 'seeBigImage',
  components: {
    PictureCutting: require('components/cloud-merchant/PictureCutting')
  },
  data () {
    return {
      siglepath: '',  //展示大图的地址
      isShow: false,  //是否展示大图
      clickedPicIndex: 0,  //点击放大的图片的index
    }
  },
  props: {
    needmain: {   // 是否展示主图btn
      type: Boolean,
      default: false
    },
    backTransparent: {   // 背景是否需要半透明
      type: Boolean,
      default: false
    },
    showImageType: {   // 显示照片的类型，1为单图放大，无主图按钮。 2为多图放大，可选主图按钮
      type: String,
      default: '2'
    },
    picPaths: {  // 需要展示的图片(url)
      type: Array,
      default: () => []
    },
    mainPicStr: {  //设置主图按钮文字
      type: String,
      default: "设置为主图"
    },
    sigleImagePath: {   // 显示单张图片的图片地址
      type: String,
      default: ''
    },
  },
  mixins: [uiMixin],
  methods: {
    getPicture() {
      console.log('距离顶部--' + this.$refs.main.parentNode.offsetTop);
     //flag 为1 调用本地拿图片 为0调用H5
      var flag = this.$utillib.isAppSupport({'2': '1.2.0'});
      console.log('---  flag ', flag)
      var params
      if (this.ratio <= 0) {
        params = {maxNum: this.maxpic - this.paths.length};
      } else {
        params = {maxNum: this.maxpic - this.paths.length, ratio: this.ratio};
      }
      if (flag) {
      } else {
      }
    },
    openBigImage(index) {
      if (this.showImageType == '1') {
        this.siglepath = this.sigleImagePath;
        this.needmain = false;
        this.isShow = true;
      } else if (this.showImageType == '2') {
        this.siglepath = this.picPaths[index]
        this.clickedPicIndex = index;
        this.isShow = true;
      }
      console.log('clicke open ', this.siglepath)
    },
    closeBigImage() {
      this.isShow = false;
    },
    setMainImg() {
      this.$emit('setMainImg', this.clickedPicIndex)
      console.log('--- 点击了设置主图')
    }
  }
};
</script>
<style lang="scss" scoped>
@import "src/sass/tobe/function";
.watch-pic1{
  position:fixed;
  top:0;
  left:0;
  bottom:0;
  right:0;
/*background: red;*/
  z-index:1000;
  padding-top:1.3rem;
  /*visibility:hidden*/
}

.pic-box1{
  /*background: #ffffff;*/
  height: 85%;
  margin-top: -0.5rem;
  text-align: center;
  @include display(flex);
  @include align-items(center);
  @include justify-content(center);
  img {
  max-height: 100%;
  width: auto;
  height: auto;
  max-width: 100%;
  }
}
.noMainBtn{
  height: 95%;
}
.backTransparent{
  background: #000;
}

.backTransparent1{
  background:rgba(0,0,0,0.6);
}
.set-main1{
  margin: rem(80) auto 0;
  width: rem(360);
  height: rem(70);
  line-height: rem(70);
  background: #ffffff;
  text-align: center;
  border-radius: rem(4);
  font-size: rem(32);
}

</style>

