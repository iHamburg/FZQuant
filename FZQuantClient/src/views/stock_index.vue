<!--用户列表-->
<template>
  <div>


    <p>股票</p>
    <br/><br/>

    <!--<p> <input type="search" v-model="searchTerm" placeholder="标题关键词"><button class="btn btn-default" @click="onSearch">搜索</button></p>-->



    <div v-for="item in items" @click="onPushDetails(item)">{{item.name}}</div>

    <div><button class="btn btn-default" type="submit">Button</button></div>

  </div>
</div>
</template>

<script>
import adminnav from 'components/adminnav';
import symbollib from 'src/libs/symbollib'
export default {
  name: 'keep_stock_index',

  data () {
    return {
      id: null,
      items: [],
      title: '股票指数',

    }
  },
  components: {adminnav},
  created() {
    console.log('id', this.$route.params.id);
//    this.queryData();

  },
  mounted() {

    this.id = this.$route.params.id
    console.log('mounted', this.id);
//    symbollib.get
//    this.querySymbols(this.id)
    this.queryDailyPrice(this.id)

  },
  methods: {

    onPushDetails(item) {
      console.log('goto stock index', item.id);
//      this.$router.push('/products/'+item.id);
    },
    queryDailyPrice(symbolId) {
      symbollib.queryDailyPrices(symbolId, (err, list) => {
        console.log('list', list);
      })
    },
    querySymbols(id) {
      // 查询指数下的所有股票
      symbollib.get_symbols_by_group_id(id, (err, list) => {
//        console.log(err, list);
        if (err) {
          return
        }

        this.items = list
      })
    }
  }
};


</script>
