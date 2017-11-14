<template>
  <div class="content">

    <bl-bar barStyle="bar-dark-linear">
        <div class="button" slot="left-button" @click="$router.go(-1)">
          <div class="iconfont arrow-back"><i class="fback">返回</i></div>
        </div>
        <div slot="title">上新广播</div>
    </bl-bar>

    <div class="newcast">
        <bl-product-box v-for="(item, index) in items" :itemData="item"></bl-product-box>
    </div>


  </div>

</template>

<script>
// import api from 'src/api/index'
//  import xxx
export default {
  name: 'goodSales',
  components: {
    'BlProductBox': () => System.import('components/cloud-merchant/product-box')

  },
  mounted() {

  },
  data () {
    return {

      items: [
        {
          "url": "static/images/p6_01.png",
          "title": "衣服衣服衣服衣服衣服衣服衣服衣服衣服衣服",
          "price": "339.00"
        },
        {
          "url": "static/images/xpsx3.png",
          "title": "星爸爸马克杯券",
          "price": "339.00"
        },
        {
          "url": "static/images/y_02.png",
          "title": "星爸爸马克杯券",
          "price": "339.00"
        },
        {
          "url": "static/images/354091595.jpg",
          "title": "衣服衣服衣服衣服衣服衣服衣服衣服衣服衣服",
          "price": "339.00"
        },
        {
          "url": "static/images/y_01.png",
          "title": "衣服衣服衣服衣服衣服衣服衣服衣服衣服衣服",
          "price": "339.00"
        }
      ]

    }
  },
  methods: {

  }

}
</script>
