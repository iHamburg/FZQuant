<template>
  <div class="container">
  	<h2>socket.io</h2>

    <ul>
      <li v-for="item in items">{{item}}</li>
    </ul>
  </div>
</template>

<script>

  export default {

    name: 'index',
    sockets: {
      connect: function(){
        this.id = this.$socket.id,
        console.log('sockets connect');
        this.$socket.emit('bbb', 'asss');
      },
      aaa: function (val) {
        console.log('aaa', val)
      },
      aaa_response: function (val) {
        console.log('listen aaa_rsponse', val);
        this.items.push(val)
      },
      dataFromPython: function (data) {
        console.log('on data from python', data);
        this.items.push(data)
      }
    },
    data () {
      return {
        items: [
          'aa',
          'bb',
          'cc'
        ]
      };
    },
    mounted:function(){

    },
  };
</script>
