<template>
  <div class="content">

    <bl-bar barStyle="bar-dark-linear">
        <div class="button" slot="left-button" @click="$router.go(-1)">
          <div class="iconfont arrow-back"><i class="fback">返回</i></div>
        </div>
        <div slot="title">订单管理</div>
    </bl-bar>

    <bl-comli class="otop">
        <div slot='left-text' class="left-box">全部订单</div>
        <div slot='right-text' class="right-r">
          <div class="iconfont arrow-back"></div>
        </div>
    </bl-comli>

    <div class="ninebox">
      <ul>
        <BlnineBox v-for="item in data" :itemData="item"></BlnineBox>
      </ul>
    </div>

  </div>

</template>

<script>
// import api from 'src/api/index'
import BlnineBox from 'components/cloud-merchant/nine-box'

export default {
  name: 'orderment',
  components: {
    BlnineBox
  },
  mounted() {

  },

  data () {
    return {
      data: [
        {"number": "0", "describe": "待支付订单", "show": 1},
        {"number": "10", "describe": "待开单订单", "href": "goodsSales", "show": 1},
        {"number": "8", "describe": "待发货订单", "href": "goodsManage", "show": 1},
        {"number": "101", "describe": "待提货订单", "show": 1},
        {"number": "1022200", "describe": "售后订单", "show": 1},
        {"number": "78", "describe": "已发货订单", "show": 1}
      ]
    }
  },
  computed: {
  },
  methods: {
  }
}
</script>
