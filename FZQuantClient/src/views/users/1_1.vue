<!--用户列表-->
<template>
  <div>



    <br/><br/>

    <p> <input type="search" v-model="searchTerm" placeholder="标题关键词"><button class="btn btn-default" @click="onSearch">搜索</button></p>

    <div><button class="btn btn-default" type="submit">Button</button></div>

    <div v-for="item in items" @click="onPushDetails(item)">{{item.id}}-{{item.title}}</div>
  </div>
</div>
</template>

<script>
import networklib from 'src/libs/networklib';
import adminnav from 'components/adminnav';

export default {
    name: 'productgroups',

    data () {
      return {
        items:[],
        title:'商品组列表',
        searchTerm:null,
        searchAPI:'/adminapi/products/',
        message:'init message',
      }
    },
    components:{adminnav},
    created(){

      this.fetchData();
    },
    methods: {

      onSearch () {
        console.log('search',this.searchTerm);

        var url = this.searchAPI + '?search='+this.searchTerm;
        this.$http.get(url).then(function (response) {
          console.log(response.body);

          // 更新商品
          this.items = response.body.obj.rows;

        }).catch(function (error) {
          console.log(error);
        });

      },
      onPushDetails(item){
        console.log('goto ',item.id);
        this.$router.push('/products/'+item.id);
      },
      onClick(){
        console.log('onClick');
      },
      fetchData(){

        networklib.get('1001').then(obj=>{
          // set logoUrl, brands, qrcode

//          console.log('obj',obj);
          this.items = obj.rows;

        }).catch(err=>{
          console.log('err',err);
        });
      }
    }
  };


</script>
