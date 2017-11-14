<style lang="scss" src="src/sass/parkinglot.scss" scoped></style>
<template>
  <div class="content-parking write">

    <bl-bar barStyle="bar-dark-linear">
        <div class="button" slot="left-button" @click="$router.go(-1)">
          <div class="iconfont arrow-back"><i class="fback">返回</i></div>
        </div>
        <div slot="title">核销记录</div>
    </bl-bar>

    <div class="mark-box">
      <bl-navbar v-model="selected" :fixed="true">
        <bl-tab-item id="1">停车券</bl-tab-item>
        <bl-tab-item id="2">礼品券</bl-tab-item>
        <bl-tab-item id="3">优惠券</bl-tab-item>
      </bl-navbar>
      <bl-tab-container v-model="selected">
        <bl-tab-container-item id="1">

            <bl-check-box class="check-content"  v-for="(item, index) in itemcards">
                <div slot="check-box" class="checkbox">
                    <div class="check-card">
                        <div class="card">{{ item.price }}
                          <span>{{ item.toprice }}</span>
                        </div>
                        <dl>
                            <dt>{{ item.title }}</dt>
                            <dd>已返还：{{ item.desc }}张</dd>
                            <dd class="over">已核销：{{ item.scope }}张</dd>
                            <dd class="time">下单时间： {{ item.term[0] }}  {{ item.term[1] }}</dd>
                        </dl>
                    </div>
                    <!-- <div class="bot">发布时间 {{ item.time}} </div> -->
                </div>
            </bl-check-box>

        </bl-tab-container-item>
        <bl-tab-container-item id="2">
        2
        </bl-tab-container-item>
        <bl-tab-container-item id="3">
            <div class="check-content number-card"  v-for="(item, index) in shopcards">
                <div class="checkbox">
                    <div class="check-card">
                        <div class="card">{{ item.price }}
                          <span>{{ item.toprice }}</span>
                        </div>
                        <dl>
                            <dt>{{ item.title }}</dt>
                            <dd>{{ item.desc }}</dd>
                            <dd>{{ item.scope }}</dd>
                            <dd class="time">{{ item.shop }}</dd>
                        </dl>
                    </div>
                </div>
                <div class="number">
                    <span>已领取1000张</span>
                    <span>已核销1000张</span>
                </div>
            </div>
        </bl-tab-container-item>
      </bl-tab-container>
    </div>

  </div>

</template>

<script>
export default {
  name: 'parkingRecord',

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

      itemcards: [
        {
          "price": "2小时",
          "toprice": "停车券",
          "title": "百联商城停车券",
          "desc": "500",
          "scope": "3000",
          "state": "",
          "term": ["2017-05-22", "23:00"]
        },
        {
          "price": "2小时",
          "toprice": "停车券",
          "title": "百联商城停车券",
          "desc": "500",
          "scope": "3000",
          "state": "",
          "term": ["2017-05-22", "23:00"]
        },
        {
          "price": "2小时",
          "toprice": "停车券",
          "title": "百联商城停车券",
          "desc": "500",
          "scope": "3000",
          "state": "",
          "term": ["2017-05-22", "23:00"]
        },
        {
          "price": "2小时",
          "toprice": "停车券",
          "title": "百联商城停车券",
          "desc": "500",
          "scope": "3000",
          "state": "",
          "term": ["2017-05-22", "23:00"]
        },
        {
          "price": "2小时",
          "toprice": "停车券",
          "title": "百联商城停车券",
          "desc": "500",
          "scope": "3000",
          "state": "",
          "term": ["2017-05-22", "23:00"]
        },
        {
          "price": "2小时",
          "toprice": "停车券",
          "title": "百联商城停车券",
          "desc": "500",
          "scope": "3000",
          "state": "",
          "term": ["2017-05-22", "23:00"]
        }
      ],

      shopcards: [
        {
          "price": "50元",
          "toprice": "抵用券",
          "title": "ZARA优惠券",
          "desc": "无门槛",
          "scope": "领取后7天有效",
          "state": "",
          "shop": "限西郊百联，百联又一城"
        },
        {
          "price": "50元",
          "toprice": "抵用券",
          "title": "ZARA优惠券",
          "desc": "无门槛",
          "scope": "领取后7天有效",
          "state": "",
          "shop": "限西郊百联，百联又一城"
        },
        {
          "price": "50元",
          "toprice": "抵用券",
          "title": "ZARA优惠券",
          "desc": "无门槛",
          "scope": "领取后7天有效",
          "state": "",
          "shop": "限西郊百联，百联又一城"
        },
        {
          "price": "50元",
          "toprice": "抵用券",
          "title": "ZARA优惠券",
          "desc": "无门槛",
          "scope": "领取后7天有效",
          "state": "",
          "shop": "限西郊百联，百联又一城"
        },
        {
          "price": "50元",
          "toprice": "抵用券",
          "title": "ZARA优惠券",
          "desc": "无门槛",
          "scope": "领取后7天有效",
          "state": "",
          "shop": "限西郊百联，百联又一城"
        },
        {
          "price": "50元",
          "toprice": "抵用券",
          "title": "ZARA优惠券",
          "desc": "无门槛",
          "scope": "领取后7天有效",
          "state": "",
          "shop": "限西郊百联，百联又一城"
        },
      ],
    }
  },
  methods: {

  }

}
</script>
