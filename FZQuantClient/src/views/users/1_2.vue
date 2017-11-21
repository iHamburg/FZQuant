<template>
  <div>
    <b-navbar toggleable type="inverse" variant="success">

      <b-nav-toggle target="nav_collapse"></b-nav-toggle>

      <b-link class="navbar-brand" to="/">
        <span>西葫芦管理台</span>
      </b-link>

      <b-collapse is-nav id="nav_collapse">

        <b-nav is-nav-bar>
          <b-nav-item @click="onClick">会员</b-nav-item>
          <b-nav-item>产品</b-nav-item>
          <b-nav-item>产品组</b-nav-item>
        </b-nav>

        <b-nav is-nav-bar class="ml-auto">

          <!-- Navbar dropdowns -->
          <b-nav-item-dropdown text="Lang" right-alignment>
            <b-dropdown-item to="#">EN</b-dropdown-item>
            <b-dropdown-item to="#">ES</b-dropdown-item>
            <b-dropdown-item to="#">RU</b-dropdown-item>
            <b-dropdown-item to="#">FA</b-dropdown-item>
          </b-nav-item-dropdown>

          <b-nav-item-dropdown right-alignment>

            <!-- Using text slot -->
            <template slot="text">
              <span style="font-weight: bold;">User</span>
            </template>

            <b-dropdown-item to="#">Profile</b-dropdown-item>
            <b-dropdown-item to="#">Signout</b-dropdown-item>
          </b-nav-item-dropdown>

        </b-nav>
      </b-collapse>
    </b-navbar>
    <a href="/admin/products/create" class="btn btn-primary">新建商品</a>  <br/><br/>
  <h2>商品详情</h2>

  </div>
</div>
</template>

<script>
import networklib from 'src/libs/networklib';

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

    created(){

      let self = this;
      networklib.get('1001').then(obj=>{
        // set logoUrl, brands, qrcode

//        console.log('obj',obj);
//        this.items = obj.rows;

      }).catch(err=>{
        console.log('err',err);
      });
    },
    methods: {

      onSearch:function () {
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
      onClick(){

      }
    }
  };


</script>
