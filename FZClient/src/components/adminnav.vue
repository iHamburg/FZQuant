<template>
  <b-navbar toggleable type="inverse" variant="success">

    <b-nav-toggle target="nav_collapse"></b-nav-toggle>

    <b-link class="navbar-brand" to="/">
      <span>西葫芦管理台</span>
    </b-link>

    <b-collapse is-nav id="nav_collapse">

      <b-nav is-nav-bar>
        <b-nav-item v-for="item in items" @click="$router.push({name:item.to})" :key="item.name">{{item
          .name}}</b-nav-item>
      </b-nav>

      <b-nav is-nav-bar class="ml-auto">

        <!-- Navbar dropdowns -->
        <!--<b-nav-item-dropdown text="Lang" right-alignment>-->
          <!--<b-dropdown-item to="#">EN</b-dropdown-item>-->
          <!--<b-dropdown-item to="#">ES</b-dropdown-item>-->
          <!--<b-dropdown-item to="#">RU</b-dropdown-item>-->
          <!--<b-dropdown-item to="#">FA</b-dropdown-item>-->
        <!--</b-nav-item-dropdown>-->

        <!--<b-nav-item-dropdown right-alignment>-->

          <!--&lt;!&ndash; Using text slot &ndash;&gt;-->
          <!--<template slot="text">-->
            <!--<span style="font-weight: bold;">User</span>-->
          <!--</template>-->

          <!--<b-dropdown-item to="#">Profile</b-dropdown-item>-->
          <!--<b-dropdown-item to="#">Signout</b-dropdown-item>-->
        <!--</b-nav-item-dropdown>-->

      </b-nav>
    </b-collapse>
  </b-navbar>

</template>

<script>

  export default {
    name: 'keepNav',

    data () {
      return {
        items: [
          {name: '会员', to: '1.1'}, // 会员列表
          {name: '商品', to: '2.1'},  // 商品列表
          {name: '商品组', to: '3.1'},
          {name: '闪购', to: '7.1'},
          {name: '订单', to: '4.1'},
          {name: '工具', to: ''},
        ],
      }
    },
    methods: {
      onClick(item) {
        console.log('click ', item.to);
      }
    },
  };

</script>
