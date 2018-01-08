<!--用户列表-->
<template>
  <div>


    <p>股票指数</p>
    <br/><br/>

    <!--<p> <input type="search" v-model="searchTerm" placeholder="标题关键词"><button class="btn btn-default" @click="onSearch">搜索</button></p>-->



    <div v-for="item in items" @click="onPushDetails(item)">{{item.id}}: {{item.name}}</div>

    <div><button class="btn btn-default" type="submit">Button</button></div>

  </div>
</div>
</template>

<script>

import adminnav from 'components/adminnav';
import symbollib from 'src/libs/symbollib'

export default {
  name: 'productgroups',

  data () {
    return {
      items: [],
      title: '股票指数',

    }
  },
  components: {adminnav},
  created() {
//    this.queryData();
  },
  mounted() {
    console.log('indexes mounted');
    this.queryData();
//    this.querySymbols(17)
  },
  methods: {

    onPushDetails(item){
      console.log('goto stock index', item.id);

      this.$router.push({name: 'stock_index', params: {id: item.id}})

    },
    queryData() {
      symbollib.queryStockIndexes((err, list) => {
        if (err) {
          alert(err)
          return
        }

        this.items = list
      })
    },
  }
};

</script>
