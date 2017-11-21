<template>
  <div>

    <br>
    <b-button @click="$router.push({name:3.2})">新建商品组</b-button>

    <br><br>

    <div v-for="item in items" @click="pushDetail(item.id)">
      <label >{{item.id}}-{{item.title}}</label>
    </div>

  </div>
</div>
</template>

<script>

  export default {
//    商品组列表
    name: 'keepProductgroups',

    data () {
      return {
        items: [],

      }
    },
    activated() {
      this.fetchData();
    },
    methods: {
      fetchData() {
        this.$networklib.get('/productgroups').then(obj => {
          this.items = obj.rows;
        }).catch(err => {
          alert('err ' + err);
        });
      },

      pushDetail(id) {
        console.log('push ', id);
        this.$router.push({name: '3.3', params: {id}})
      },

    }
  };
</script>
