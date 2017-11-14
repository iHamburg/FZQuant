<template>
  <div id="index">
    <h2>header5</h2>
    <mt-header title="long long long long title">
      <router-link to="/" slot="left">
        <mt-button icon="back">back</mt-button>
      </router-link>
      <mt-button icon="more" slot="right"></mt-button>
    </mt-header>
    <mt-header title="multiple button">
      <router-link to="/" slot="left">
        <mt-button icon="back">back</mt-button>
        <mt-button >close</mt-button>
      </router-link>
      <mt-button icon="more" slot="right"></mt-button>
    </mt-header>


  </div>
</template>

<script>

//import utils from 'utils'
export default {

  name: 'index',

  data () {
    return {

    };
  },

};
</script>
