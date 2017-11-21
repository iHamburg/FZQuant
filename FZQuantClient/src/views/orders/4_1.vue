<template>
  <div class="container">

    <p> <input type="search" v-model="searchTerm" placeholder="标题关键词"><button class="btn btn-default" @click="onSearch">搜索</button></p>



    <!--<div v-for="item in items" @click="onPushDetails(item)">{{item.id}}-{{item.title}}</div>-->
    <b-table striped hover :items="items" :fields="fields" >

      <!--</template>-->
      <!--<template slot="isActive" scope="item">-->
        <!--{{item.value?'Yes :)':'No :('}}-->
      <!--</template>-->
      <template slot="actions" >
        <b-btn size="sm" @click="details(item.item)">Details</b-btn>
      </template>
    </b-table>
  </div>
</div>
</template>

<script>
import networklib from 'src/libs/networklib';
import adminnav from 'components/adminnav';

export default {
    name: 'orders',

    data () {
      return {
        items:[],
        title:'订单管理',
        searchTerm:null,
        searchAPI:'/adminapi/products/',

        fields:{
          orderNo:{label:'orderNo'},
          productTitle:{label:'商品名称'},
          receiverName:{label:'收货人'},
          actions: {
            label: 'Actions'
          }
        },
      }
    },
    components:{},
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
``
      },
      details(item){
        console.log('goto ',item);
        this.$router.push({name:'4.2',params:{id:111}});
      },
      onClick(){
        console.log('onClick');
      },

      fetchData(){

        networklib.get('/orders').then(obj=>{

//          console.log('obj',obj.rows[0]);
          this.items = obj.rows;


        }).catch(err=>{
          console.log('err',err);
        });
      }
    }
  };


</script>
