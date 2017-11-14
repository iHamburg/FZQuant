<!-- 聊天室 -->
<!--<style lang="scss" src="src/sass/room.scss" scoped></style>-->
<template>
<div id="content">
<div class="speak_window">
  <div class="speak_box">
    <div class="answer">
      <div class="heard_img left"><img src="../../../static/images/roomImage/dglvyou.jpg"></div>
      <div class="answer_text">
        <p>Hey，代客下单入口!</p>
        <i></i>
      </div>
    </div>
  </div>
</div>
<div class="saying">
<img src="../../../static/images/roomImage/saying.gif"/>
</div>
<div class="wenwen-footer">
  <!--
  <div class="wenwen_btn left" onClick="to_write()"><img src="../../static/images/roomImage/jp_btn.png"></div> -->
  <div class="wenwen_text center" style="text-align:center">
      <!--
      <div class="write_box">
          <input type="text" class="left" onKeyUp="keyup()" placeholder="请输入关键字" />
      </div>
      -->
      <div class="circle-button" id="wenwen" @click="onValetOrder()">
          代客 下单
      </div>
  </div>
  <div class="wenwen_text left" style="text-align:center">
      <div class="circle-button" id="wenwen" @click="onSendGoods()">
          发送 商品
      </div>
  </div>
  <div class="wenwen_text left" style="text-align:center">
      <div class="circle-button" id="wenwen" @click="$router.go(-1)">
          返回消息列表
      </div>
  </div>
  <div class="wenwen_help right">
      <button id="buttonId" onClick="up_say()" class="right">发送</button>
  </div>
  <div style="opacity:0;" class="clear"></div>
</div>
</div>
</template>
<script>
export default {

  name: '',

  data () {
    return {

    };
  },
  created() {

  },
  mounted() {

  },
  methods: {
    //代客下单，跳转到P9.3
    onValetOrder() {
      //this.$router.replace({name: '9.3', query: {brandIds: this.brandIdData}});
      this.$router.push({name: '9.3'});
    },
    onSendGoods() {
      this.$router.push({name: '8.1.4'});
    },

  },
  watch: {

  },
  computed: {

  }

};
</script>
