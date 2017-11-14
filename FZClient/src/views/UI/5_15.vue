<template>
  <div class="content">

    <bl-bar barStyle="bar-dark-linear">
      <div class="button" slot="left-button" @click="$router.go(-1)">
        <div class="iconfont arrow-back"><i class="fback">返回</i></div>
      </div>
      <div slot="title" @click="popup = !popup">待审核<i></i></div>
      <i slot="right-button" class="icon iconfont more-v" @click="rightmenu()"></i>
    </bl-bar>

    <bl-popup v-model="popup" position="top" style="width: 100%;">
        <bl-top-menu></bl-top-menu>
    </bl-popup>

    <bl-popup v-model="menulist" position="right" class="menulist" >
        <bl-right-menu  ref="rightmenu" v-on:child-say="listenToMyBoy"></bl-right-menu>
    </bl-popup>

    <div class="batch-list">
        <ul>
            <li v-for="(item, index) in itemcards">
                <bl-batch-card :itemData="item">
                    <span slot="check" class="checkicon" :class="item.state" @click="chooseAttr(index)">
                        <i></i>
                    </span>
                </bl-batch-card>
            </li>
        </ul>
    </div>

    <div class="editbar">
      <span class="checkicon" :class="{check: isAllCheck}"  @click="allCheck()">
          <i></i>全选
      </span>
      <div>
          <button class="no">审核不通过</button>
          <button class="ok">通过并上架</button>
      </div>
    </div>
  </div>

</template>

<script>

// import api from 'src/api/index'
//  import xxx
export default {
  name: 'batchAuditGoods',
  components: {
    'BlBatchCard': () => System.import('components/cloud-merchant/batch-card'),
    'BlTopMenu': () => System.import('components/cloud-merchant/top-menu'),
    'BlRightMenu': () => System.import('components/cloud-merchant/right-menu')
  },
  mounted() {

  },
  data () {
    return {
      popup: false,
      isAllCheck: false,
      menulist: false,

      itemcards: [
        {"url": "static/weui/images/dr.png", "title": "小狼的多浆植物", "number": "2665448662216632", "price": "66.88", "sale": "50.00", "rate": "3", "bool": true, "state": ""},
        {"url": "static/weui/images/dr.png", "title": "小狼的多浆植物", "number": "2665448662216632", "price": "66.88", "sale": "50.00", "rate": "3", "bool": false, "state": ""},
        {"url": "static/weui/images/dr.png", "title": "小狼的多浆植物", "number": "2665448662216632", "price": "66.88", "sale": "50.00", "rate": "3", "bool": true, "state": ""},
        {"url": "static/weui/images/dr.png", "title": "小狼的多浆植物", "number": "2665448662216632", "price": "66.88", "sale": "50.00", "rate": "3", "bool": true, "state": ""},
        {"url": "static/weui/images/dr.png", "title": "小狼的多浆植物", "number": "2665448662216632", "price": "66.88", "sale": "50.00", "rate": "3", "bool": true, "state": ""},
        {"url": "static/weui/images/dr.png", "title": "小狼的多浆植物", "number": "2665448662216632", "price": "66.88", "sale": "50.00", "rate": "3", "bool": true, "state": ""},
        {"url": "static/weui/images/dr.png", "title": "小狼的多浆植物", "number": "2665448662216632", "price": "66.88", "sale": "50.00", "rate": "3", "bool": true, "state": ""},
        {"url": "static/weui/images/dr.png", "title": "小狼的多浆植物", "number": "2665448662216632", "price": "66.88", "sale": "50.00", "rate": "3", "bool": true, "state": ""}
      ],

      couponTemplateId: null,
    }
  },
  methods: {
    chooseAttr(index) {
      let state = this.itemcards[index].state;
      if (state == "check") {
        this.itemcards[index].state = ""
      } else {
        this.itemcards[index].state = "check"
      }
    },
    allCheck() {
      let check = this.isAllCheck;
      if (check == false) {
        this.isAllCheck = true
        this.itemcards.forEach(function(item) {
          item.state = "check"
        })
      } else {
        this.isAllCheck = false
        this.itemcards.forEach(function(item) {
          item.state = ""
        })
      }
    },
    rightmenu() {
      this.menulist = true;
      this.$refs.rightmenu.open();
    },
    listenToMyBoy(data) {
      this.menulist = data;
    }
  }

}
</script>
