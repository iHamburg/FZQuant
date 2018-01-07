<!--用户列表-->
<template>
  <div>


    <h1>股票指数</h1>
    <br/><br/>

    <!--<p> <input type="search" v-model="searchTerm" placeholder="标题关键词"><button class="btn btn-default" @click="onSearch">搜索</button></p>-->

    <div><button class="btn btn-default" type="submit">Button</button></div>

    <!--<div v-for="item in items" @click="onPushDetails(item)">{{item.id}}-{{item.title}}</div>-->
  </div>
</div>
</template>

<script>
//import networklib from 'src/libs/networklib';
import adminnav from 'components/adminnav';
import symbollib from 'src/libs/symbollib'
export default {
//  name: 'productgroups',

  data () {
    return {
      items: [],
      title: '股票指数',

    }
  },
  components: {adminnav},
  created() {
    this.fetchData();
  },
  methods: {

//    onSearch () {
//      console.log('search',this.searchTerm);
//
//      var url = this.searchAPI + '?search='+this.searchTerm;
//      this.$http.get(url).then(function (response) {
//        console.log(response.body);
//
//        // 更新商品
//        this.items = response.body.obj.rows;
//
//      }).catch(function (error) {
//        console.log(error);
//      });
//
//    },
//    onPushDetails(item){
//      console.log('goto ',item.id);
//      this.$router.push('/products/'+item.id);
//    },
//    onClick(){
//      console.log('onClick');
//    },
    fetchData() {
      console.log('fetch data');
      symbollib.get_stock_indexes().then(obj => {
        // set logoUrl, brands, qrcode

        console.log('obj',obj);
        this.items = obj.rows;
      }).catch(err => {
        console.log('err', err);
      });
    }
  }
};


</script>
