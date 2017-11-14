<style lang="scss" src="src/sass/parkinglot.scss" scoped></style>
<template>
  <div class="content-parking write">

    <bl-bar barStyle="bar-dark-linear">
        <div class="button" slot="left-button" @click="$router.go(-1)">
          <div class="iconfont arrow-back"><i class="fback">返回</i></div>
        </div>
        <div slot="title">发券列表</div>
    </bl-bar>

    <div class="mark-box">
          <div class="check-content" v-for="(item, index) in itemcards">

              <div class="checkbox">
                  <div class="check-card">
                      <div class="card">{{ item.price }}
                        <span>{{ item.toprice }}</span>
                      </div>
                      <dl>
                          <dt>{{ item.title }}</dt>
                          <dd>已返还：{{ item.desc }}张</dd>
                          <dd>已核销：{{ item.scope }}张</dd>
                          <dd class="time">下单时间： {{ item.term[0] }}  {{ item.term[1] }}</dd>
                      </dl>
                  </div>
              </div>
              <div class="detail">
                <h2>用券规则</h2>
                <p>有效时间：领取后7天内可用</p>
                <p>门槛条件：无门槛</p>
                <p>使用范围：百联各大商城</p>
                <p>每人可领：1 张</p>
                <p>每天可领：100 张</p>

                <h2>订单详情</h2>
                <p>订单编号：1230894238049</p>
                <p>下单时间：2017-01-02</p>
                <p>应付总额：¥30.00</p>
                <p>购券张数：50 张</p>

              </div>
          </div>
    </div>

    <div class="editbar">
        <button>继续购买</button>
        <button>暂停发放</button>
        <button>立即发券</button>
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
          "term": ["2017-05-22", "23:00"],
          number: 1000,
          count: false
        }
      ],
    }
  },
  methods: {

  }

}
</script>
