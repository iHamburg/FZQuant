<template>
  <div class="content">
    <bl-bar barStyle="bar-dark-linear">
        <div class="button" slot="left-button" @click="$router.go(-1)">
          <div class="iconfont arrow-back"><i class="fback">返回</i></div>
        </div>
        <div slot="title">退货单回录</div>
    </bl-bar>
    <upload :maxpic='10' :paths='paths' :name='"上传退货单照片"' class="margin-b otop"
     :remove="true" @clickImg='parentImg' :needmain='true' :mainpic='picindex'>
    </upload>
    <bl-tab-container>
      <bl-tab-container-item>
        <bl-comli class="otop">
          <div slot='left-text' class="left-box">退货单号</div>
          <div slot='right-text' class="right-box">
            <div class="right-l">
              <input type="text" placeholder="输入" ref="coCode" v-model="cText" @keyup="enterVal">
            </div>
            <i class="shao"></i>
          </div>
        </bl-comli>
      </bl-tab-container-item>
    </bl-tab-container>
    <bl-tab-container>
      <bl-tab-container-item>
        <bl-comli class="otop">
          <div slot='left-text' class="left-box">应退金额</div>
          <div slot='right-text' class="right-box">
            <div class="left-font">￥</div>
            <div class="right-l">
              <input type="text" placeholder="输入" ref="coCode" v-model="cText" @keyup="enterVal">
            </div>
          </div>
        </bl-comli>
      </bl-tab-container-item>
    </bl-tab-container>
    <div class="bl-prompt">请确认订单中该商品的金额和折扣后再填入</div>
    <bl-comli class="otop">
        <div slot='left-text' class="left-box1">退还订单运费</div>
        <div slot='right-text' class="right-box">
          <div class="right-r"></div>
          <span class="checkicon" v-bind:class="{ 'check' : condition }" @click="statebutton()"><i></i></span>
        </div>
    </bl-comli>
    <bl-comli class="otop">
        <div slot='left-text' class="left-box">查看订单</div>
        <div slot='right-text' class="right-box">
          <div class="right-r"></div>
          <div class="iconfont arrow-back"></div>
        </div>
    </bl-comli>
    <div class="button">
      <bl-button :disabled="isType" class="disabled">确认退货</bl-button>
      <bl-button class="frame-button">取 消</bl-button>
    </div>
  </div>
</template>

<script>
import upload from 'components/cloud-merchant/upload'
export default {
  name: 'returnGoods',
  components: {
    upload
  },
  mounted() {
  },
  data () {
    return {
      delArr: 0,
      condition: false
    }
  },
  methods: {
    parentImg(index) {
      console.log('上传图片')
      this.siglepath = this.paths[index];
      this.picindex = index;
      this.$refs.big.style.visibility = 'visible';
    },
    statebutton() {
      if (this.condition == true) {
        this.condition = false
      } else {
        this.condition = true
      }
    }
  }
}
</script>
