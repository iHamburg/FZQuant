<template>
  <div class="container">
  	<h2>tickdata</h2>

    <ul>
      <li v-for="item in items">{{item}}</li>
    </ul>
  </div>
</template>

<script>


  export default {

    name: 'socketiovue',

    data () {
      return {
        items: [
          'aa',
          'bb',
          'cc'
        ]
      };
    },
    mounted: function(){

    },
  };
</script>
