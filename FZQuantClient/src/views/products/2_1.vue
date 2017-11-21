<template>
  <div class="container">
    <h1>Hello </h1>
    <br>
    <b-button @click="$router.push({name:2.2})">新建商品</b-button>
    <!--<b-btn v-b-modal.modal1>Show Modal</b-btn>-->
    <br><br>
    <p> <input type="search" v-model="searchTerm" placeholder="标题关键词"><button class="btn btn-default" @click="onSearch">搜索</button></p>

    <div v-for="item in items" @click="onPushDetails(item)">{{item.id}}-{{item.title}}</div>
    <b-modal id="modal1" title="Title: Submit your name" @ok="submit" @shown="">

      <h2>lkjfsdklf</h2>
      <!--<form @submit.stop.prevent="submit">-->
        <!--<b-form-input type="text" placeholder="Enter your name" v-model="name"></b-form-input>-->
      <!--</form>-->

    </b-modal>
  </div>
</template>

<script>

export default {
//  商品列表
  name: 'keepProducts',

  data () {
    return {
      items: [],
      title: '商品列表',
      searchTerm: null,
      searchAPI: '/adminapi/products/',
      message: 'init message',
      name: null,
    }
  },
  activated() {
    console.log(this.title, 'activated');
    this.$productlib.queryList(null, (err, items) => {
      if (err) {
        return alert(err)
      }

      this.items = items;
    })
  },
  methods: {
    submit(e) {
      console.log('submit .e', e);
//      if (!this.name) {
//        alert('Please enter your name');
//        return e.cancel();
//      }

//      this.names.push(this.name);
      this.name = '';
    },
    onSearch () {
//      console.log('search', this.searchTerm);
//      var url = this.searchAPI + '?search=' + this.searchTerm;
//
//      this.$http.get(url).then(function (response) {
//        console.log(response.body);
//        // 更新商品
//        this.items = response.body.obj.rows;
//      }).catch(function (error) {
//        console.log(error);
//      });
    },
    onPushDetails(item) {
//      console.log('goto ',item.id);
      this.$router.push({name: '2.2', params: {id: item.id}})
    },
  },
  computed: {
    title() {
      return this.$route.meta.title
    }
  }
};

</script>
