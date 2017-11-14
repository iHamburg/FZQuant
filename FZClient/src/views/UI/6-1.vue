<template>
  <div class="content">

    <bl-bar barStyle="bar-dark-linear">
        <div class="button" slot="left-button" @click="$router.go(-1)">
          <div class="iconfont arrow-back"><i class="fback">返回</i></div>
        </div>
        <div slot="title">发布上新</div>
    </bl-bar>

    <p class="tips">您有多件新品已上架，发布上新到有逛平台！</p>

    <div class="issue-box notop">

        <bl-check-box class="check-content"  v-for="(item, index) in itemcards">
            <span slot="check" v-show="isCheck" class="checkicon"  :class="item.state" @click="chooseAttr(index, itemcards)">
                <i></i>
            </span>
            <div slot="check-box" class="checkbox">
                <div class="check-card check-pic">
                    <div class="picture">
                      <img :src="item.url">
                    </div>
                    <dl>
                        <dt>{{ item.title }}</dt>
                        <dd>货号：{{ item.no }}</dd>
                        <dd>吊牌价：&yen;{{ item.price}}</dd>
                        <dd>售价：&yen;{{ item.sale }} </dd>
                    </dl>
                </div>

            </div>
        </bl-check-box>

    </div>

    <div class="editbar" v-show="isCheck" :class="{check: isAllCheck}"  >
      <span class="checkicon alldel" @click="allCheck()">
          <i></i>全选
      </span>
      <div>
          <button class="default" :class="{'del': isDel}" @click="subCoupons()" :disabled="!isDel">一键发布</button>
      </div>
    </div>

    <!-- pop -->
    <bl-modal :buttons="buttons" v-if="isOK">
      <div slot="inner">
          <h4>您确定要发放所选商品</h4>
          <p>发布后信息会在有逛客户端门店首页以及您的商家动态中展示</p>
      </div>
    </bl-modal>

  </div>

</template>

<script>
// import api from 'src/api/index'
//  import xxx
export default {
  name: 'goodSales',

  components: {
    'BlCheckBox': () => System.import('components/cloud-merchant/check-box')

  },
  mounted() {

  },
  data () {
    return {
      isCheck: true,
      isType: true,
      delArr: 0,
      isOK: false,
      isAllCheck: false,
      isDel: false,

      buttons: [{
        text: '取消',
        onClick: () => {
          this.isOK = false
          this.$toast('取消')
        }
      }, {
        text: '确定发布',
        onClick: () => {
          this.isOK = false
          this.$toast('确定')
        }
      }],

      itemcards: [
        {
          "url": "static/images/s_01.png",
          "title": "CHOCOOLATE 拼色POLO衫 CHOCOOLATE 拼色POLO衫",
          "no": "3455567678889",
          "price": "366.00",
          "sale": "166.00",
          "state": "",
        },
        {
          "url": "static/images/s_01.png",
          "title": "CHOCOOLATE 拼色POLO衫 CHOCOOLATE 拼色POLO衫",
          "no": "3455567678889",
          "price": "366.00",
          "sale": "166.00",
          "state": "",
        },
        {
          "url": "static/images/s_02.png",
          "title": "CHOCOOLATE 拼色POLO衫 CHOCOOLATE 拼色POLO衫",
          "no": "3455567678889",
          "price": "366.00",
          "sale": "166.00",
          "state": "",
        },
        {
          "url": "static/images/s_01.png",
          "title": "CHOCOOLATE 拼色POLO衫 CHOCOOLATE 拼色POLO衫",
          "no": "3455567678889",
          "price": "366.00",
          "sale": "166.00",
          "state": "",
        },
        {
          "url": "static/images/s_01.png",
          "title": "CHOCOOLATE 拼色POLO衫 CHOCOOLATE 拼色POLO衫",
          "no": "3455567678889",
          "price": "366.00",
          "sale": "166.00",
          "state": "",
        },
        {
          "url": "static/images/s_01.png",
          "title": "CHOCOOLATE 拼色POLO衫 CHOCOOLATE 拼色POLO衫",
          "no": "3455567678889",
          "price": "366.00",
          "sale": "166.00",
          "state": "",
        }
      ]

    }
  },
  methods: {
    chooseAttr(index, arrs) {
      (arrs == this.itemlist) ? (arrs = this.itemlist) : (arrs = this.itemcards);

      let state = arrs[index].state;
      if (state == "check") {
        arrs[index].state = ""
        this.delArr -= 1
      } else {
        arrs[index].state = "check"
        this.delArr += 1
      }

      (this.delArr != 0) ? (this.isDel = true) : (this.isDel = false);
    },
    subCoupons() {
      this.isOK = true;
    },

    allCheck() {
      if (this.delArr > 0) {
        (this.isDel === true) ? (this.isDel = true) : (this.isDel = false);
      } else {
        (this.isDel === false) ? (this.isDel = true) : (this.isDel = false);
      }
      this.delArr = 0

      var checkall = this.itemcards;

      let check = this.isAllCheck;
      if (check == false) {
        this.isAllCheck = true
        checkall.forEach(function(item) {
          item.state = "check"
        })
      } else {
        this.isAllCheck = false
        checkall.forEach(function(item) {
          item.state = ""
        })
      }
    }

  }

}
</script>
