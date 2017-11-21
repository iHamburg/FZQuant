<template>
  <div>

    <br>
    <b-button @click="$router.push({name:3.2})">新建闪购</b-button>

    <br><br>


    <div v-for="item in items" @click="pushDetail(item.id)">
      <label >{{item.id}}-{{item.title}}</label>
    </div>

  </div>
</div>
</template>

<script>
import networklib from 'src/libs/networklib';
import adminnav from 'components/adminnav';

export default {
  name: 'keepflash',

  data () {
    return {
      items: [],

    }
  },

  created() {
    this.fetchData();
//    this.pushDetail
  },
  methods: {
    onClick() {
      console.log('onClick');
    },

    fetchData() {

      networklib.get('/productgroups').then(obj=>{
        this.items = obj.rows;
      }).catch(err=>{
        console.log('err',err);
        alert('err '+err);
      });
    },
    pushDetail(id) {
      console.log('push ',id);
      this.$router.push({name: '3.3', params: {id}})
    },

  }
};
</script>
