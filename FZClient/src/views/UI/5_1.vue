<style lang="scss" src="src/sass/merSetting.scss" scoped></style>
<template>
  <div class="content">

    <bl-bar barStyle="bar-dark-linear">
        <div class="button" slot="left-button" @click="$router.go(-1)">
          <div class="iconfont arrow-back"><i class="fback">返回</i></div>
        </div>
        <div slot="title">FUCKCUT</div>
    </bl-bar>

    <!-- 单图 -->
    <div class="merset">
        <bl-comli>
            <div slot='left-text' class="left-box">LOGO</div>
            <div slot='right-text' class="right-box">
              <div class="right-l">
                <div class="img-box" @click="popupVisible2 = true">
                    <img :src="paths">
                </div>
              </div>
              <div class="iconfont arrow-back" @click="getPicture"></div>
            </div>
        </bl-comli>
    </div>
    <div class="modal-bg" v-if="popupVisible2" @click="popupVisible2 = false">
      <span class="qimg">
        <img :src="paths" style="height:auto">
      </span>
    </div>
    <picture-cutting ref="PictureCut" :PictureData="getData" :PictureRatio=1></picture-cutting>
    <!-- 单图 eof -->

    <!-- 多图 -->
    <!--
    <upload2 :maxpic='9' :paths='item.goodsImgList' :name='"图片上传"' class="margin-b"
            :remove="true" @clickImg='parentImg' :needmain='true' :mainpic='picindex' @confirm='onGetGoodsImage' @deleteConfirm='deleteConfirm' :ratio= 1>
    </upload2>
    -->

    <upload :maxpic='20' :paths='itempaths' :name='"图片上传"' class=""
      @clickImg='parentImg' :needmain='true' :mainpic='picindex' :ratio=1 @confirm="getpic" :interfaceType="false" >
    </upload>
    <div class="watch-pic" ref='big' @click='hidebig'>
      <div class="pic-box">
        <img :src="siglepath">
      </div>
      <div class="set-main">
          设置为主图
      </div>
    </div>
    <!-- 多图 eof-->


  </div>
</template>

<script>
import upload from 'components/bl-cloudstore-merchant/bl-cloudStore-image-uploader'
import PictureCutting from 'components/cloud-merchant/PictureCutting'

export default {
  name: 'uploadPic',

  components: {
    upload,
    PictureCutting
  },
  mounted() {
  },
  data () {
    return {
      popupVisible: false,
      popupVisible2: false,
      picindex: -1,
      siglepath: '',
      paths: null,
      itempaths: []
    }
  },
  methods: {
    getPicture() {
      this.$refs.PictureCut.getImage()
    },
    getData(data) {
      console.log('get Data', data);
      this.paths = data
    },
    // 多图上传
    parentImg(index) {
      console.log('上传图片')
      this.siglepath = this.itempaths[index];
      this.picindex = index;
      this.$refs.big.style.visibility = 'visible';
    },
    hidebig() {
      this.$refs.big.style.visibility = 'hidden';
    },
    getpic(data) {
      this.itempaths.push(data.mediaCephUrl)
      console.log(1111, data)
    }
  }

}
</script>
