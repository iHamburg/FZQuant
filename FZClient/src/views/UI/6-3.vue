<template>
  <div class="content">

    <bl-bar barStyle="bar-dark-linear">
        <div class="button" slot="left-button" @click="$router.go(-1)">
          <div class="iconfont arrow-back"><i class="fback">返回</i></div>
        </div>
        <div slot="title">已发布内容</div>

        <div slot="right-button" class="hrad-right" @click="isCheck = !isCheck" >编辑</div>
    </bl-bar>

    <div class="mark-box">
      <bl-navbar v-model="selected" :fixed="true">
        <bl-tab-item id="1">上新</bl-tab-item>
        <bl-tab-item id="2">活动</bl-tab-item>
        <bl-tab-item id="3">专题</bl-tab-item>
        <bl-tab-item id="4">单品</bl-tab-item>
        <bl-tab-item id="5">优惠券</bl-tab-item>
      </bl-navbar>
      <bl-tab-container v-model="selected">
        <bl-tab-container-item id="1">

            <bl-check-box class="check-content"  v-for="(item, index) in itemlist">
                <span slot="check" v-show="isCheck" class="checkicon"  :class="item.state" @click="chooseAttr(index, itemlist)">
                    <i></i>
                </span>
                <div slot="check-box" class="checkbox">
                    <ul>
                      <li v-for="(key, val) in item.pro">
                          <em><img :src="key.url"></em>
                          <div class="ptext">&yen; {{ key.price }}</div>
                      </li>
                    </ul>
                    <div class="bot">发布时间 {{ item.index}} <span>查看更多 <i class="iconfont arrow-back"></i></span></div>
                </div>
            </bl-check-box>

        </bl-tab-container-item>
        <bl-tab-container-item id="2">

            <div class="active" v-for="item in itemactivity">
              <span><img :src="item.face"></span>
              <bl-comli>
                  <div slot='left-text' class="left-box">{{ item.title }}</div>
              </bl-comli>
              <bl-comli>
                  <div slot='left-text' class="left-box release">发布时间 {{ item.date }}</div>
              </bl-comli>
            </div>

        </bl-tab-container-item>
        <bl-tab-container-item id="3">
            3
        </bl-tab-container-item>
        <bl-tab-container-item id="4">
            4
        </bl-tab-container-item>
        <bl-tab-container-item id="5">

            <bl-check-box class="check-content"  v-for="(item, index) in itemcards">
                <span slot="check" v-show="isCheck" class="checkicon"  :class="item.state" @click="chooseAttr(index, itemcards)">
                    <i></i>
                </span>
                <div slot="check-box" class="checkbox">
                    <div class="check-card">
                        <div class="card">
                          &yen{{ item.price }}
                          <span>满 {{ item.toprice }} 可用</span>
                        </div>
                        <dl>
                            <dt>{{ item.title }}</dt>
                            <dd>券描述：{{ item.desc }}</dd>
                            <dd>适用范围：{{ item.scope }}</dd>
                            <dd class="time">有效期： {{ item.term[0] }} - {{ item.term[1] }}</dd>
                        </dl>
                    </div>
                    <div class="bot">发布时间 {{ item.time}} </div>
                </div>
            </bl-check-box>

        </bl-tab-container-item>
      </bl-tab-container>
    </div>


    <div class="editbar" v-show="isCheck" :class="{check: isAllCheck}"  >
      <span class="checkicon alldel" @click="allCheck()">
          <i></i>全选
      </span>
      <div>
          <button class="default" :class="{'del': isDel}" :disabled="!isDel">删除</button>
      </div>
    </div>
  </div>

</template>

<script>
// import api from 'src/api/index'
//  import xxx
export default {
  name: 'marketing',

  components: {
    'BlCheckBox': () => System.import('components/cloud-merchant/check-box')
  },
  mounted() {

  },
  data () {
    return {
      selected: '1',
      isCheck: false,
      isAllCheck: false,
      isDel: false,
      nowCheck: '1',
      delArr: 0,

      itemlist: [
        {
          "time": "2017.05.12 12:20:20",
          "state": "",
          "pro": [
            {"url": "static/images/p6_01.png", "price": "1972.00"},
            {"url": "static/images/p6_02.png", "price": "19721.00"},
            {"url": "static/images/p6_03.png", "price": "366.88"},
            {"url": "static/images/p6_04.png", "price": "366.88"},
            {"url": "static/images/p6_05.png", "price": "366.88"}
          ]
        },
        {
          "time": "2017.05.12 12:20:20",
          "state": "",
          "pro": [
            {"url": "static/images/p6_01.png", "price": "322.88"},
            {"url": "static/images/p6_02.png", "price": "366.88"},
            {"url": "static/images/p6_03.png", "price": "366.88"},
            {"url": "static/images/p6_04.png", "price": "366.88"},
            {"url": "static/images/p6_05.png", "price": "366.88"}
          ]
        },
        {
          "time": "2017.05.12 12:20:20",
          "state": "",
          "pro": [
            {"url": "static/images/p6_01.png", "price": "322.88"},
            {"url": "static/images/p6_02.png", "price": "366.88"},
            {"url": "static/images/p6_03.png", "price": "366.88"},
            {"url": "static/images/p6_04.png", "price": "366.88"},
            {"url": "static/images/p6_05.png", "price": "366.88"}
          ]
        },
        {
          "time": "2017.05.12 12:20:20",
          "state": "",
          "pro": [
            {"url": "static/images/p6_01.png", "price": "322.88"},
            {"url": "static/images/p6_02.png", "price": "366.88"},
            {"url": "static/images/p6_03.png", "price": "366.88"},
            {"url": "static/images/p6_04.png", "price": "366.88"},
            {"url": "static/images/p6_05.png", "price": "366.88"}
          ]
        },
        {
          "time": "2017.05.12 12:20:20",
          "state": "",
          "pro": [
            {"url": "static/images/p6_01.png", "price": "322.88"},
            {"url": "static/images/p6_02.png", "price": "366.88"},
            {"url": "static/images/p6_03.png", "price": "366.88"},
            {"url": "static/images/p6_04.png", "price": "366.88"},
            {"url": "static/images/p6_05.png", "price": "366.88"}
          ]
        },
        {
          "time": "2017.05.12 12:20:20",
          "state": "",
          "pro": [
            {"url": "static/images/p6_01.png", "price": "322.88"},
            {"url": "static/images/p6_02.png", "price": "366.88"},
            {"url": "static/images/p6_03.png", "price": "366.88"},
            {"url": "static/images/p6_04.png", "price": "366.88"},
            {"url": "static/images/p6_05.png", "price": "366.88"}
          ]
        }
      ],

      itemcards: [
        {
          "price": "120",
          "toprice": "599",
          "title": "星爸爸马克杯券",
          "time": "2017.05.12 12:20:20",
          "desc": "在百联购物中心消费200元在百联购物中心消费200元",
          "scope": "礼品券TEST耶里夏丽羊肉串礼品券TEST耶里夏丽羊肉串",
          "state": "",
          "term": ["2017.05.22", "2017.09.30"]
        },
        {
          "price": "120",
          "toprice": "599",
          "title": "星爸爸马克杯券",
          "time": "2017.05.12 12:20:20",
          "desc": "在百联购物中心消费200元",
          "scope": "礼品券TEST耶里夏丽羊肉串",
          "state": "",
          "term": ["2017.05.22", "2017.09.30"]
        },
        {
          "price": "120",
          "toprice": "599",
          "title": "星爸爸马克杯券",
          "time": "2017.05.12 12:20:20",
          "desc": "在百联购物中心消费200元",
          "scope": "礼品券TEST耶里夏丽羊肉串",
          "state": "",
          "term": ["2017.05.22", "2017.09.30"]
        },
        {
          "price": "120",
          "toprice": "599",
          "title": "星爸爸马克杯券",
          "time": "2017.05.12 12:20:20",
          "desc": "在百联购物中心消费200元",
          "scope": "礼品券TEST耶里夏丽羊肉串",
          "state": "",
          "term": ["2017.05.22", "2017.09.30"]
        },
        {
          "price": "120",
          "toprice": "599",
          "title": "星爸爸马克杯券",
          "time": "2017.05.12 12:20:20",
          "desc": "在百联购物中心消费200元",
          "scope": "礼品券TEST耶里夏丽羊肉串",
          "state": "",
          "term": ["2017.05.22", "2017.09.30"]
        },
        {
          "price": "120",
          "toprice": "599",
          "title": "星爸爸马克杯券",
          "time": "2017.05.12 12:20:20",
          "desc": "在百联购物中心消费200元",
          "scope": "礼品券TEST耶里夏丽羊肉串",
          "state": "",
          "term": ["2017.05.22", "2017.09.30"]
        }
      ],

      itemactivity: [
        {face: 'static/images/h_01.jpg', title: '假日狂欢，满88返礼包活动标题', date: '2017.03.15 12:33:21'},
        {face: 'static/images/h_02.jpg', title: '假日狂欢，满88返礼包活动标题', date: '2017.03.15 12:33:21'},
        {face: 'static/images/h_01.jpg', title: '假日狂欢，满88返礼包活动标题', date: '2017.03.15 12:33:21'},
        {face: 'static/images/h_02.jpg', title: '假日狂欢，满88返礼包活动标题假日狂欢，满88返礼包活动标题假日狂欢，满88返礼包活动标题', date: '2017.03.15 12:33:21'}
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

    allCheck() {
      if (this.delArr > 0) {
        (this.isDel === true) ? (this.isDel = true) : (this.isDel = false);
      } else {
        (this.isDel === false) ? (this.isDel = true) : (this.isDel = false);
      }
      this.delArr = 0
      var checkall = null
      if (this.selected == 1) {
        checkall = this.itemlist;
      }
      if (this.selected == 5) {
        checkall = this.itemcards;
      }

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
