<!-- @ 多图上传裁切组件 -->
<template>
  <div class="upload" ref="main">
    <div class="up-title" v-if="interfaceType">
      <div>{{name}}</div>
      <div v-if="canEdit" class="up-num">{{paths.length}}/{{maxpic}}</div>
      <div v-else class="up-num">{{paths.length}} 张</div>
    </div>
    <div class="up-imgs" v-if="interfaceType">
       <div class="img-box" v-for="(src,index) in paths">
         <div class="picture-box"><img :src="src" @click='imgclick(index)'></div>
         <div class="remove-item" @click='removeitem(index)' v-if='remove&&canEdit'>
            <img src="../../assets/i/remove.png" >
         </div>
         <div v-show='index==mainpic' v-if='needmain' class="mainpic">主图</div>
       </div>
       <div class="up-button" v-show='paths.length!=maxpic&&canEdit' @click="getPicture">
         <img src="../../assets/i/add.png" class="add-show">
       </div>
    </div>
    <picture-cutting ref="PictureCut" :PictureData="getData" :PictureRatio="ratio"></picture-cutting>
  </div>
</template>
<script>

import uiMixin from 'src/mixins/uiMixin';
import networklib from 'src/libs/networklib';
//import jsbridge from 'src/mixins/jsbridge';
import lrz from 'lrz';
export default {

  name: 'upload',
  components: {
    PictureCutting: require('components/cloud-merchant/PictureCutting')
  },
  data () {
    return {
      mediaCephUrl: null
    }
  },
  props: {
    maxpic: Number, //最多能选择的图片张数
    name: String,  //选择多图时页面的title
    mainpic: Number, // 主图下标
    needmain: {   // 是否展示主图
      type: Boolean,
      default: false
    },
    remove: {  // 是否展示删除按钮 .当编辑时可以关闭删除
      type: Boolean,
      default: true
    },
    paths: {  //已经选择的图片数组
      type: Array,
      default: () => []
    },
    ratio: {  //图片裁切比例， 宽／高  。不裁切填写0
      type: Number,
      default: 1
    },
    interfaceType: {  //页面类型，0为不展示页面。  1为多选展示页面
      type: Boolean,
      default: true
    },
    canEdit: {  //页面类型，true 能编辑（展示加号）
      type: Boolean,
      default: true
    }
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
        console.log('jsbridgelib 上传')
        this.$jsbridgelib.bridgeGetPhotos(params, (err, obj) => {
          if (err) {
            console.log('bridge get native immage', err);
            return self.$toast(err)
          }
          if (obj) {
            if (!(obj instanceof Array)) {
              return;
            }
            var temp = [];
            obj.forEach((item) => {
              temp.push(item.mediaCephUrl);
              this.confirm(item.mediaCephUrl);
            })
            //this.$emit("selectedMutilateImage", temp);
//            console.log('bridge obj --- ', JSON.stringify(obj));
//            console.log('this.item.goodsImgList --- ', this.item.goodsImgList.length);
          }
        })
      } else {
        console.log('H5 上传')
        this.$refs.PictureCut.getImage()
      }
    },
    getData(data) {
      let self = this;
      console.log('当前图片大小:' + data.length / 1024 + 'KB');
      lrz(data)
        .then(function (rst) {
          // 处理成功会执行
          // let resultSize = null;
          console.log('lrz 压缩后的图片Object :', rst);
          let length = rst.fileLen
          let sizeimage = length / 1024
          console.log('lrz 图片压缩成功 && 压缩后的图片大小 :', sizeimage + 'KB');
          let imageUrlBase64 = rst.base64;
          let imageBase64 = imageUrlBase64.split(",")[1];
          if (imageBase64 != null) {
            self.getMediaCephUrl(imageBase64);
          }
        }).catch(function (err) {
          // 处理失败会执行
          //this.$toast(err);
          console.log('lrz 图片压缩异常 ', err);
        }).always(function () {
          // 不管是成功失败，都会执行
          //console.log('lrz 不管是成功失败，都会执行 ');
        })
    },
    //图片上传接口
    getMediaCephUrl(base64Content) {
      this.startLoading();
      let base64Con = base64Content;
      let mediaType = "jpg";
      let self = this;
      let apiId = '1001';
      let queryParam = { base64Content: base64Con, mediaType: mediaType };
      networklib.post(apiId, queryParam).then((obj) => {
        this.stopLoading();
//        console.log('成功的回调', obj);
        self.mediaCephUrl = obj.mediaCephUrl;
        //调用confirm.
        self.confirm(self.mediaCephUrl);
        //this.$toast('上传图片成功');
        console.log("调用图片上传接口成功 && 当前上传图片返回数据:" + self.mediaCephUrl);
      }).catch((err) => {
        this.stopLoading();
        setTimeout(function() {
          self.$toast(err);
        }, 500);
        console.log('失败的回调', apiId, err);
      })
    },
    //上传图片confirm回调.
    confirm: function (mediaCephUrl) {
      console.log('confirm', mediaCephUrl);
      this.$emit('confirm', {mediaCephUrl});
    },
    //删除数组中图片
    removeitem(index) {
      this.paths.splice(index, 1);
    },
    //点击图片放大
    imgclick(index) {
      this.$emit("clickImg", index);
    }
  }
};
</script>
<style lang="scss" scoped>
@import "src/sass/tobe/function";
.upload{
  background:#ffffff;
  padding:0 rem(30);
  .up-title{
    height:rem(88);
    font-size:rem(34);
    @include display(flex);
        @include align-items(center);
        @include justify-content(space-between);
        .up-num{
          font-size: rem(24);
          color:#888;
        }
  }
}
.up-imgs{
  padding-top:rem(30);
  overflow:hidden;
  .img-box{
    width:rem(120);
    height:rem(120);
    background:#ebebeb;
    float:left;
    position:relative;
    margin-bottom:rem(30);
    margin-right:rem(20);
    .picture-box{
      width:rem(120);
      height:rem(120);
      overflow: hidden;
      @include display(flex);
      @include align-items(center);
      @include justify-content(center);
      img{
        max-width:100%;
        max-width: 100%;
        /*width:auto;*/
        /*height:auto;*/
        display:block;
      }
    }
    .remove-item{
      width: rem(30);
      height: rem(30);
      position:absolute;
      top: rem(-10);
      right: rem(-10);
      line-height: 1;
    }
  }
  .img-box:nth-child(5n){
    margin-right:0;
  }
  .up-button{
    width:rem(120);
    height:rem(120);
    background:#ebebeb;
    float:left;
    margin-bottom:rem(30);
    position:relative;
    @include display(flex);
    @include align-items(center);
    @include justify-content(center);
    .button-input{
      width:100%;
      height:100%;
      position:absolute;
      top:0;
      left:0;
      border:none;
      outline:none;
      opacity:0;
    }
    .add-show{
      width:rem(60);
      height:rem(60);
    }
  }
}
.mainpic{
  position:absolute;
  left: 0;
  right:0;
  bottom: 0;
  height:rem(32);
  line-height:rem(32);
  background: rgba(0,0,0,0.50);
  text-align: center;
  color: #fff;
  font-size:rem(24);
}
</style>

