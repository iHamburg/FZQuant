<template>
  <div class="content">

    <bl-bar barStyle="bar-dark-linear">
        <div class="button" slot="left-button" @click="$router.go(-1)">
          <div class="iconfont arrow-back"><i class="fback">返回</i></div>
        </div>
        <div slot="title">发放优惠券</div>
    </bl-bar>

    <div class="issue-box">
        <bl-check-box class="check-content"  v-for="(item, index) in itemcards">
            <span slot="check" v-show="isCheck" class="checkicon"  :class="item.state" @click="chooseAttr(index, itemcards)">
                <i></i>
            </span>
            <div slot="check-box" class="checkbox">
                <div class="check-card">
                    <div class="card">
                      &yen;{{ item.price }}
                      <span>满 {{ item.toprice }} 可用</span>
                    </div>
                    <dl>
                        <dt>{{ item.title }}</dt>
                        <dd>{{ item.desc }}</dd>
                        <dd>{{ item.term[0] }} - {{ item.term[1] }}</dd>
                        <dd class="time"> 发放数 <i>{{ item.number[0] }}</i>  已发放 <i>{{ item.number[1] }}</i> </dd>
                    </dl>
                </div>
            </div>
        </bl-check-box>

    </div>

    <div class="botbtn">
        <bl-button :disabled="isType" @click="subCoupons()">发放优惠券 ({{ delArr }})</bl-button>
    </div>

    <bl-modal :buttons="buttons" v-if="isOK">
      <div slot="inner">
          <h4>确定要发放所选优惠券</h4>
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
          "price": "120",
          "toprice": "599",
          "title": "星爸爸马克杯券",
          "time": "2017.05.12 12:20:20",
          "desc": "在百联购物中心消费200元在百联购物中心消费200元",
          "state": "",
          "term": ["2017.05.22", "2017.09.30"],
          "number": ["200", "120"]
        },
        {
          "price": "120",
          "toprice": "599",
          "title": "星爸爸马克杯券",
          "time": "2017.05.12 12:20:20",
          "desc": "在百联购物中心消费200元在百联购物中心消费200元",
          "state": "",
          "term": ["2017.05.22", "2017.09.30"],
          "number": ["200", "120"]
        },
        {
          "price": "120",
          "toprice": "599",
          "title": "星爸爸马克杯券",
          "time": "2017.05.12 12:20:20",
          "desc": "在百联购物中心消费200元在百联购物中心消费200元",
          "state": "",
          "term": ["2017.05.22", "2017.09.30"],
          "number": ["200", "120"]
        },
        {
          "price": "120",
          "toprice": "599",
          "title": "星爸爸马克杯券",
          "time": "2017.05.12 12:20:20",
          "desc": "在百联购物中心消费200元在百联购物中心消费200元",
          "state": "",
          "term": ["2017.05.22", "2017.09.30"],
          "number": ["200", "120"]
        },
        {
          "price": "120",
          "toprice": "599",
          "title": "星爸爸马克杯券",
          "time": "2017.05.12 12:20:20",
          "desc": "在百联购物中心消费200元在百联购物中心消费200元",
          "state": "",
          "term": ["2017.05.22", "2017.09.30"],
          "number": ["200", "120"]
        },
        {
          "price": "120",
          "toprice": "599",
          "title": "星爸爸马克杯券",
          "time": "2017.05.12 12:20:20",
          "desc": "在百联购物中心消费200元",
          "scope": "礼品券TEST耶里夏丽羊肉串",
          "state": "",
          "term": ["2017.05.22", "2017.09.30"],
          "number": ["220", "100"]
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

      (this.delArr > 0) ? (this.isType = false) : (this.isType = true);
    },
    subCoupons() {
      this.isOK = true;
    }
  }

}
</script>
