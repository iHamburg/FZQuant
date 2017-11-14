<style lang="scss" src="src/sass/actDetail.scss" scoped></style>
<template>
  <div class="content">

    <bl-bar barStyle="bar-dark-linear">
        <div class="button" slot="left-button" @click="$router.go(-1)">
          <div class="iconfont arrow-back"><i class="fback">返回</i></div>
        </div>
        <div slot="title">活动详情</div>
    </bl-bar>

    <p class="tips">待审核</p>

    <div class="act-detail notop">

        <div class="active">
            <span><img src="static/images/h_01.jpg"></span>
            <bl-comli>
                <div slot='left-text' class="left-box">活动标题</div>
                <div slot='right-text' class="right-box">假日狂欢满88返礼包活动</div>
            </bl-comli>
            <bl-comli>
                <div slot='left-text' class="left-box release">开始时间</div>
                <div slot='right-text' class="right-box">2017-5-31 10:00:00</div>
            </bl-comli>
            <bl-comli>
                <div slot='left-text' class="left-box release">结束时间</div>
                <div slot='right-text' class="right-box">2017-6-6 22:00:00</div>
            </bl-comli>
        </div>

        <div class="active-nav">
          <dl>
              <dt>活动规则</dt>
              <dd>
                  活动规则一、活动规则二、活动规则三、活动规则四、活动规则一、活动规则二、活动规则三、活动规则四、活动规则活动规则一、活动规则二、活动规则三、活动规则四四四…
              </dd>
          </dl>
          <dl>
              <dt>活动内容</dt>
              <dd>
                  活动规则一、活动规则二、活动规则三、活动规则四、活动规则一、活动规则二、活动规则三、活动规则四、活动规则活动规则一、活动规则二、活动规则三、活动规则四四四…
              </dd>
          </dl>
        </div>

        <bl-comli class="actbox">
            <div slot='left-text' class="left-box">活动跳转</div>
            <div slot='right-text' class="right-box">
                <div class="right-r"><div class="ellipsis">节目名称名称名称节目名称名称名称</div></div>
            </div>
        </bl-comli>


        <div class="rel-coupons">
            <bl-comli>
                <div slot='left-text' class="left-box">关联优惠券</div>
            </bl-comli>
            
            <bl-check-box class="check-content"  v-for="(item, index) in itemcards">
                <div slot="check-box" class="checkbox">
                    <div class="check-card">
                        <div class="card">
                          &yen;{{ item.price }}
                          <span>满 {{ item.toprice }} 可用</span>
                        </div>
                        <dl>
                            <dt>{{ item.title }}</dt>
                            <dd>券描述：{{ item.desc }}</dd>
                            <dd class="time"> 适用范围：{{ item.range }}</dd>
                            <dd>有效期：{{ item.term[0] }} - {{ item.term[1] }}</dd>
                        </dl>
                    </div>
                </div>
            </bl-check-box>
        </div>

        <bl-comli class="actbox">
            <div slot='left-text' class="left-box">活动页预览</div>
            <div slot='right-text' class="right-box">
                <button class="preview">点击预览</button>
            </div>
        </bl-comli>

    </div>

    <div class="act-editbar">
      <button class="default">审核不通过</button>
      <button class="output">审核通过并上线</button>
    </div>

  </div>

</template>

<script>
// import api from 'src/api/index'
export default {
  name: 'actDetail',

  components: {
    'BlCheckBox': () => System.import('components/cloud-merchant/check-box')

  },
  mounted() {

  },
  data () {
    return {
      itemcards: [
        {
          "price": "120",
          "toprice": "599",
          "title": "星爸爸马克杯券",
          "time": "2017.05.12 12:20:20",
          "desc": "在百联购物中心消费200元在百联购物中心消费200元",
          "state": "",
          "term": ["2017.05.22", "2017.09.30"],
          "range": "礼品券Test耶里夏利"
        },
        {
          "price": "120",
          "toprice": "599",
          "title": "星爸爸马克杯券",
          "time": "2017.05.12 12:20:20",
          "desc": "在百联购物中心消费200元在百联购物中心消费200元",
          "state": "",
          "term": ["2017.05.22", "2017.09.30"],
          "range": "礼品券Test耶里夏利"
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
