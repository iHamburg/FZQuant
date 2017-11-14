<!--
  @ 参数
  @ :PictureRatio // 比率 1~2
  @ :PictureData  // base64
 -->
<template>
  <!-- 裁切 -->
  <div id="PictureCutting">
    <div class="cutbody" v-show="isCoverShow" ref="cutBody">
        <header class="header" ref="header" >
            <span class="cut-l" @click="cancel">取消</span>
            <span class="cut-r" @click="confirm">确定</span>
        </header>
        <img src="" alt="" class="cutimg" :style="imageStyle" ref="cutImage">

        <div class="cover" :style="{height: coverHeight + 'px'}" ></div>
        <div class="cutbox" @touchstart.prevent="touchStart" @touchmove.prevent="touchMove" @touchend.prevent="touchEnd" ref="cropBox" ></div>
        <div class="cover" :style="{height: coverHeight + 'px'}" ></div>
    </div>
    <input ref="file" type="file" accept="image/*" @change="readImage" class="cutfile">
  </div>
  <!-- 裁切 eof -->
</template>

<style lang="scss" scoped>
  .header{
    width: 100%;
    height: 44px;
    background-color: #fff;
    border-bottom: 1px solid #ccc;
    position: relative;
    text-align: right;
    .cut-r,.cut-l{
      height: 44px;
      line-height: 44px;
      padding: 0 20px;
      float: right;
      color: #333;
      /*background-color: red;*/
    }
    .cut-l{
      float: left;
    }
  }
  .cutfile{
    width:0;
    height:0;
    position:absolute;
    top:-1000px;
    left:-1000px;
    border:none;
    outline:none;
    opacity:0;
  }
  .cutimg{
    position: absolute;
    z-index: -1;
    width: auto;
  }
  .cutbody{
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 99990;
    background-color: #000;
    overflow: hidden;
  }
  .cover{
    background-color: rgba(0,0,0,0.6);
  }
  .cutbox{}
</style>


<script>
import exif from 'src/libs/exif'
import lrz from 'lrz';
const getDinstance = function (point0, point1) {
  return Math.sqrt(Math.pow(point0.pageY - point1.pageY, 2) + Math.pow(point0.pageX - point1.pageX, 2))
}

export default {
  name: 'PictureCutting',
  props: {
    PictureRatio: {
      type: Number,
      default: 1
    },
    PictureData: {
      type: Function,
      default () {}
    }
  },
  data() {
    return {
      isCoverShow: false,
      bodyHeight: 0,
      coverHeight: 0,
      imgInitTop: 0,
      isImageFlag: false, //记录图片加载完成
      imageOrientation: -1, // 图片的方向字段
      imageTemp1: 0, //保存转换后的图片
      clickConfirm: false, //点击了确认状态
      ratio: 2, //屏幕分辨率
      imageState: {
        left: 0,
        top: 0,
        scale: 1,
        width: 0,
        height: 0,
        originX: 0,
        originY: 0
      },
      distance: 0,
      imageStyle: {
        top: '0',
        transform: 'translate3d(0px, 0px, 0px) scale(1)',
        transformOrigin: 'left top'
      },
      cropBoxRect: {},
      touchPos: {
        x: 0,
        y: 0
      },
      minScale: 0
    }
  },
  watch: {
    'imageState': {
      handler (val) {
        // console.log(this.imageState.left)
        this.imageStyle.transform = 'translate3d(-' + val.left + 'px, -' + val.top + 'px, 0px) scale(' + val.scale + ')'
      },
      deep: true
    }
  },
  mounted() {
//    let bodyHeight = document.documentElement.clientHeight
//    this.bodyHeight = bodyHeight
    // console.log('h:' + document.documentElement.clientHeight)
  },
  methods: {
    getImage() {
      this.$refs.file.click()
    },
    // 裁切
    readImage(event) {
      var file = event.target.files[0]
      console.log('Picture Cutting 读取文件:', file)
      var reader = new FileReader()
      var self = this
      reader.onload = () => {
        console.log('reader onload 回调');
        //使用插件localResizeIMG压缩. github地址: https://github.com/think2011/localResizeIMG
        lrz(file)
          .then(function (rst) {
            // 处理成功会执行
            // let resultSize = null;
            console.log('lrz 压缩后的图片Object :', rst);
            let length = rst.fileLen
            let sizeimage = length / 1024
            console.log('lrz 图片压缩成功 && 压缩后的图片大小 :', sizeimage + 'KB');
            let imageUrlBase64 = rst.base64;
            if (imageUrlBase64 != null) {
              if (self.PictureRatio <= 0) {
                self.PictureData(imageUrlBase64)
                return;
              }
              self.$refs.cutImage.src = imageUrlBase64
              self.$refs.cutImage.onload = () => {
                if (!self.isImageFlag) {
                  self.readImageData(self.$refs.cutImage.naturalWidth, self.$refs.cutImage.naturalHeight);
                }
              }
            }
          }).catch(function (err) {
            // 处理失败会执行
            //this.$toast(err);
            console.log('lrz 图片压缩异常 ', err);
          }).always(function () {
            // 不管是成功失败，都会执行
            //console.log('lrz 不管是成功失败，都会执行 ');
          })
        if (self.PictureRatio > 0) {
          self.initCutting()
        }
      }
      reader.readAsDataURL(file)
    },
    initCutting() {
      console.log('initCutting 显示裁切界面  ');
      this.dataInit()
      // 显示裁切界面
      this.isCoverShow = true
      this.$nextTick(() => {
        //console.log('bodyDIV Height-- ' + this.$refs.cutBody.clientHeight + '--- ' + window.innerHeight)
        //if (this.$refs.cutBody.clientHeight < window.innerHeight) {
        this.$refs.cutBody.style.height = window.innerHeight + 'px';
        //}
        var ratio = this.PictureRatio
        if (ratio > 2 && ratio <= 0) ratio = 1
        this.PictureRatio = ratio
        let cutBody = this.$refs.cutBody
        let pageWidth = cutBody.clientWidth
        let pageHeight = cutBody.clientHeight
        let headerHeight = this.$refs.header.clientHeight
        console.log('主体:', cutBody)
        this.coverHeight = (pageHeight - headerHeight - pageWidth / ratio) / 2
        if (this.coverHeight < 0) {
          this.coverHeight = 0;
        }

        // let coverHeightTop = (pageHeight - headerHeight - pageWidth / ratio) / 2
        let cropBoxTop = this.coverHeight + headerHeight
        this.imageState.left = 0
        this.imageState.top = 0
        this.imageStyle.top = cropBoxTop + 'px'
        this.$refs.cropBox.style.height = (pageWidth / ratio) + 'px'
        this.cropBoxRect = {
          left: 0,
          top: cropBoxTop,
          width: pageWidth,
          height: pageWidth / ratio
        }
        console.log('初始化结束' + '---' + this.isImageFlag)
      })
    },
    readImageData(widthC, heightC) {  //读图片尺寸并做展示处理
      this.isImageFlag = false
      var width = 0;
      var height = 0;
      if (widthC > 0) {
        width = this.imageState.width = widthC;
        height = this.imageState.height = heightC;
      } else {
        let image = this.$refs.cutImage
        width = this.imageState.width = image.naturalWidth;
        height = this.imageState.height = image.naturalHeight;
      }
      //console.log('imageState ' + width + '---' + height)
      if (width == 0) {
        return;
      }
      this.isImageFlag = true
      //console.log('拿到图片' + '---' + this.isImageFlag + '---' + width + '---' + height)
      // console.log(this.cropBoxRect)
      // 计算imageState
      //console.log('this.imageState222 ' + this.imageState.top + '---' + this.imageState.left + '---' + this.imageState.scale + '---' + this.imageState.width + '---' + this.imageState.height)
      if (width / height > this.PictureRatio) {
        this.minScale = this.imageState.scale = this.cropBoxRect.height / height
        this.imageState.left = (width * this.imageState.scale - this.cropBoxRect.width) / 2
        //console.log('宽大  ' + this.PictureRatio)
      } else {
        this.minScale = this.imageState.scale = this.cropBoxRect.width / width
        this.imageState.top = (height * this.imageState.scale - this.cropBoxRect.height) / 2
        //console.log('高大  ' + this.PictureRatio)
      }
     // console.log('this.imageState ' + this.imageState.top + '---' + this.imageState.left + '---' + this.imageState.scale + '---' + this.imageState.width + '---' + this.imageState.height)
    },
    cancel() {
      this.isCoverShow = false
    },
    dataInit() {
      this.isImageFlag = false;
      this.imageState.top = 0;
      this.imageState.left = 0;
      this.imageState.scale = 1;
      this.imageState.width = 0;
      this.imageState.height = 0;
      this.imageState.originX = 0;
      this.imageState.originY = 0;
      this.imageStyle.top = '0';
      this.imageStyle.transform = 'translate3d(0px, 0px, 0px) scale(1)';
      //this.$refs.cutBody.style.height = '100%';
      this.imageStyle.transformOrigin = 'left top';
      this.imageTemp1 = null;
      this.clickConfirm = false;
      this.ratio = window.devicePixelRatio || 1;
      this.$refs.cutImage.src = '';
      this.imageLoaded = false;
    },
    imageLoad() {
    },
    confirm() {
      if (!this.isImageFlag) {
        return;
      }
//      this.clickConfirm = true;
      this.submitImage(this.$refs.cutImage, this.ratio);
    },
    submitImage(image, ratio) {
      //console.log('提交图片 --' + image.width + '---' + image.height)
      let imageState = this.imageState
      let cropBoxRect = this.cropBoxRect
      let scale = imageState.scale
      let height = cropBoxRect.height
      let width = cropBoxRect.width
      let canvas = document.createElement('canvas')
      canvas.width = cropBoxRect.width * ratio
      canvas.height = cropBoxRect.height * ratio
      let ctx = canvas.getContext('2d')
      ctx.drawImage(image, (imageState.left) / scale, (imageState.top) / scale, width / scale, height / scale, 0, 0, width * ratio, height * ratio)
      let data = canvas.toDataURL()
      // 调用处理函数
      //console.log('imageData-- ', data)
      this.PictureData(data)
      this.isCoverShow = false
    },
    getFocalPoint(point0, point1) {
      return {
        x: (point0.pageX + point1.pageX) / 2,
        y: (point0.pageY + point1.pageY) / 2
      }
    },
    touchStart(event) {
      //console.log('touchstart1' + this.isImageFlag + '---')
      var fingerCount = event.touches.length
      if (fingerCount) {
        // 记录触摸初始位置
        let touchEvent = event.touches[0]
        this.touchPos = {
          x: touchEvent.pageX,
          y: touchEvent.pageY
        }
      }
      if (fingerCount >= 2) {
        // 获取两点距离
        let point0 = event.touches[0]
        let point1 = event.touches[1]
        this.distance = getDinstance(point0, point1)
        this.touchPos = this.getFocalPoint(point0, point1)
      }
    },
    touchMove(event) {
      // 根据触摸点位移，移动图片，重置触摸点位置
      var fingerCount = event.touches.length
      var touchEvent = event.touches[0]
      if (fingerCount === 1) {
        let distX = touchEvent.pageX - this.touchPos.x
        let distY = touchEvent.pageY - this.touchPos.y
        let newX = this.imageState.left - distX
        let newY = this.imageState.top - distY
        let scale = this.imageState.scale
        let maxX = this.imageState.width * scale - this.cropBoxRect.width
        let maxY = this.imageState.height * scale - this.cropBoxRect.height
        this.imageState.left = newX < 0 ? 0 : (newX > maxX ? maxX : newX)
        this.imageState.top = newY < 0 ? 0 : (newY > maxY ? maxY : newY)
        this.touchPos.x = touchEvent.pageX
        this.touchPos.y = touchEvent.pageY
      } else if (fingerCount > 1) {
        let point0 = event.touches[0]
        let point1 = event.touches[1]
        let distance = getDinstance(point0, point1)
        let zoom = distance / this.distance
        let scale = zoom * this.imageState.scale
        let maxX = this.imageState.width * scale - this.cropBoxRect.width
        let maxY = this.imageState.height * scale - this.cropBoxRect.height
        let touchPos = this.getFocalPoint(point0, point1)
        let newX = zoom * (this.imageState.left + touchPos.x) - touchPos.x
        let newY = zoom * ((this.imageState.top - this.imgInitTop) + touchPos.y) - touchPos.y + this.imgInitTop
        // 限制缩放
        this.distance = distance
        if (scale < this.minScale) {
          this.imageState.scale = this.minScale
        } else {
          this.imageState.scale = scale
          this.imageState.left = newX < 0 ? 0 : (newX > maxX ? maxX : newX)
          this.imageState.top = newY < 0 ? 0 : (newY > maxY ? maxY : newY)
        }
        this.touchPos = touchPos
      }
    },
    touchEnd (event) {
      console.log('touchEnd')
    },
    touchStart1(event) {
    },
    touchMove1(event) {
    },
    touchEnd1 (event) {
      //console.log('touchEnd')
    }
  }
}
</script>

