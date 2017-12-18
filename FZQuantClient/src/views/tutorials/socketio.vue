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
    name: 'socketiovue',
    sockets: {
      connect: function(){
        this.id = this.$socket.id,
        console.log('sockets connect');
//        this.$socket.emit('bbb', 'asss');
      },
      aaa: function (val) {
        console.log('aaa', val)
      },
      aaa_response: function (val) {
        console.log('listen aaa_rsponse', val);
        this.items.push(val)
      },
      tickDataNotification: function(data) {
        console.log('get 333 tickDataNotification from server', data);

        this.items.push(data)
      },
//      disconnect: () => {
//        console.log('sockets disconnect');
//      }

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
    mounted: function(){

    },
  };
</script>
