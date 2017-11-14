<!--商户购买提示-->
<style lang="scss" src="src/sass/merSetting.scss" scoped></style>
<template>
  <div class="content">

    <bl-bar barStyle="bar-dark-linear">
        <div class="button" slot="left-button" @click="$router.go(-1)">
          <div class="iconfont arrow-back"><i class="fback">返回</i></div>
        </div>
        <div slot="title">商品购买提示</div>
    </bl-bar>

    <div class="badge-li" >
      <div class="leftContent" >
        <div style="font-size: 16px;">开启提示
          <div style="color: #999999; font-size: 12px;" v-if="">{{ contentText }}</div>
        </div>
      </div>
      <div  class="rightContent">
        <div class="attribute-button" v-bind:class="{ 'on' : shopContentFlag }" @click="statebutton()">
          <button></button>
        </div>
      </div>
    </div>

    <div class="merset">
      <div class="shopContent">
          <textarea name="content" class="textarea" placeholder="请填写本商户需要用户特别注意的声明，例如退换货规则等信息" @keyup="init" ref="textarea" v-model.trim="shopContent"></textarea>
          <p class="init"><span :class="{'red':initText>200}">{{ initText }}</span>/{{ countNumber }}</p>
      </div>
    </div>

    <div class="bootedit">
        <bl-button :disabled="isPush" @click="updateShopContent()">确定</bl-button>
    </div>


  </div>
</template>

<script>

export default {
  name: 'actContent',

  components: {

  },

  mounted() {
    this.queryShopContent()
    document.body.scrollTop = 0;
  },

  data () {
    return {
      isPush: true,
      countNumber: 200,
      initText: 0,
      shopContent: '',
      shopContentFlag: '',
    }
  },

  methods: {
    init() {
      let param = this.shopContent;
      // emoji表情包过滤
      this.shopContent = this.$utillib.filterFace(param)
      let val = this.shopContent;
      if (val.length > 0) {
        this.isPush = false
        this.initText = val.length
      } else {
        this.initText = 0
        this.isPush = true
      }
      // console.log(val, val.length)
    },

    // 查询商品购买提示
    queryShopContent() {
      this.$merchantlib.queryMerchantInfoSite((err, obj) => {
        if (err) {
          this.$toast(err)
        }
        if (obj) {
          console.log('obj:', JSON.stringify(obj))
          this.shopContent = obj.shopContent
          if (obj.shopContentFlag == '0') {
            this.shopContentFlag = true
          } else {
            this.shopContentFlag = false
          }
        }
      })
    },

    // 修改商品购买提示
    updateShopContent() {
      let param = {
        updateType: 3,
        shopContent: this.shopContent
      }
      console.log('点击确定', JSON.stringify(param))
      this.$merchantlib.updateMerchantInfo(param, (err, obj) => {
        if (err) {
          return this.$toast(err)
        }
        this.$router.go(-1)
      })
    },

    //购买提示开关按钮[true/false].
    statebutton: function() {
      let flag = this.shopContentFlag
      if (this.shopContent != '') {
        if (flag == true) {
          // 0表示开，1表示关
          flag = '1'
        } else {
          flag = '0'
        }
        //updateType  0:修改品牌 1:修改提货地址 2:修改退货地址，3：修改购买提示 默认0
        let param = {shopContentFlag: flag, updateType: '3'}
        this.$merchantlib.updateMerchantInfo(param, (err) => {
          if (err) {
            return this.$toast({
              message: '服务器载入失败:' + err,
            });
          }
          this.$toast('购买提示开关状态更新成功');
          // this.queryMerchantSetting();
          //更新成功后,改变按钮样式.
          if (this.shopContentFlag == false) {
            this.shopContentFlag = true;
          } else {
            this.shopContentFlag = false;
          }
        });
      } else {
        this.$toast('请输入购买提示内容')
      }
    },

  },
  computed: {
    // 0表示开，1表示关
    contentText: function() {
      if (this.shopContentFlag == '1') {
        return '已开启，用户可在确认订单时看到该提示'
      } else if (this.shopContentFlag == '0') {
        return '已关闭，需要用户在确认订单时看到请开启'
      }
    },
  },

  watch: {
    shopContent: function (val, oldVal) {
      // console.log('newVal：', val, '，oldVal：', oldVal)
      this.init()
    }
  }

}
</script>
