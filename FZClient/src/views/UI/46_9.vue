<style lang="scss" src="src/sass/parkinglot.scss" scoped></style>
<template>
  <div class="content-parking">

    <bl-bar barStyle="bar-dark-linear">
        <div class="button" slot="left-button" @click="$router.go(-1)">
          <div class="iconfont arrow-back"><i class="fback">返回</i></div>
        </div>
        <div slot="title">购买停车券</div>
    </bl-bar>

    <div class="mark-box">
          <div class="check-content buybox" v-for="(item, index) in itemcards">
              <div class="checkbox">
                  <div class="check-card">
                      <div class="card">{{ item.price }}
                        <span>{{ item.toprice }}</span>
                      </div>
                      <dl>
                          <dt>{{ item.title }}</dt>
                          <dd>{{ item.desc }}</dd>
                          <dd class="countbox">
                              <div class="count">
                                  <em class="reduce" @touchstart="reduce(index)">-</em>
                                  <input type="tel" v-model="item.count">
                                  <em class="add" @touchstart="add(index)">+</em>
                              </div>
                              <div class="max">
                                <p class="blue">&yen;{{ item.money }}</p>
                                <p>最多购买{{ item.number }}张</p>
                              </div>
                          </dd>
                      </dl>
                  </div>
                  <div class="bot">
                      <i>停满5小时可用</i>
                      <i>限西郊百联 百联又一城</i>
                      <button v-if="item.number > 0" class="buy">立即购买</button>
                      <button v-else :disabled="true" class="buy">立即购买</button>
                  </div>
              </div>
          </div>
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
          "desc": "领取后7天有效",
          "money": "8600.00",
          "state": "",
          number: 1000,
          count: 0
        },
        {
          "price": "2小时",
          "toprice": "停车券",
          "title": "百联商城停车券",
          "desc": "领取后7天有效",
          "money": "8600.00",
          "state": "",
          number: 0,
          count: 0
        },
        {
          "price": "2小时",
          "toprice": "停车券",
          "title": "百联商城停车券",
          "desc": "领取后7天有效",
          "money": "0.00",
          "state": "",
          number: 1000,
          count: 0
        },
        {
          "price": "2小时",
          "toprice": "停车券",
          "title": "百联商城停车券",
          "desc": "领取后7天有效",
          "money": "8600.00",
          "state": "",
          number: 1000,
          count: 0
        },
        {
          "price": "2小时",
          "toprice": "停车券",
          "title": "百联商城停车券",
          "desc": "领取后7天有效",
          "money": "8600.00",
          "state": "",
          number: 1000,
          count: 0
        },
        {
          "price": "2小时",
          "toprice": "停车券",
          "title": "百联商城停车券",
          "desc": "领取后7天有效",
          "money": "100.00",
          "state": "",
          number: 1000,
          count: 0
        }
      ],
    }
  },
  methods: {
    add(index) {
      this.itemcards[index].count ++
    },
    reduce(index) {
      if (this.itemcards[index].count >= 1) {
        this.itemcards[index].count --
      }
    }
  }

}
</script>
