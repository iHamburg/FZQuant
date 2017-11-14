<template>
  <div class="upload">
    <div class="up-title">
      <div>{{name}}</div>
      <div class="up-num">{{paths.length}}/{{maxpic}}</div>
    </div>
    <div class="up-imgs">
       <div class="img-box" v-for="(src,index) in paths">
         <img :src="src" @click='imgclick(index)'>
         <div class="remove-item" @click='removeitem(index)' v-if='remove'>
            <img src="../../assets/i/remove.png" >
         </div>
         <div v-show='index==mainpic' v-if='needmain' class="mainpic">主图</div>
       </div>
       <div class="up-button" v-show='paths.length!=maxpic'>
         <input type="file" name="" class="button-input" v-on:change="srcinput" ref="val">
         <img src="../../assets/i/add.png" class="add-show">
       </div>
    </div>
  </div>
</template>
<script>
export default {

  name: 'upload',

  data () {
    return {
    };
  },
  props: {
    maxpic: Number,
    name: String,
    mainpic: Number,
    needmain: {
      type: Boolean,
      default: false
    },
    remove: {
      type: Boolean,
      default: false
    },
    paths: {
      type: Array,
      default: () => []
    }
  },
  methods: {
    srcinput (e) {
      let reader = new FileReader();
      let fileList = e.target.files;
      for (let i = 0; i < fileList.length; i++) {
        reader.readAsDataURL(fileList[i]);
        reader.onload = () => {
          var oReader = new FileReader();
          oReader.onload = (e) => {
            var image = new Image();
            image.src = e.target.result;
            this.paths.push(image.src);
            this.$refs.val.value = "";
          };
          oReader.readAsDataURL(fileList[i]);
        }
      }
    },
    removeitem(index) {
      this.paths.splice(index, 1);
    },
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
          color:#888888;
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
    @include display(flex);
    @include align-items(center);
    @include justify-content(center);
    img{
      max-height:100%;
      max-width:100%;
      width:auto;
      height:auto;
      display:block;
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
  color: #ffffff;
  font-size:rem(24);
}
</style>

