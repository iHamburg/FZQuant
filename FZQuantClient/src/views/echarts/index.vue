<template>
  <div class="echarts">
    <ul><li v-for="item in items" :id="item.id" @click="onClick(item.id)">{{item.title}}

    </li></ul>
  </div>
</template>
<script>

//  import fs from 'fs'
  import da from '../../../static/dowjones-2015.json'
  import networklib from '../../libs/networklib'

  export default {

    name: 'index',

    data () {
      return {
        items: [
          {title: 'Demo1', id: 'echarts_1'},
          {title: 'Demo2', id: 'echarts_2'},
          {title: 'CandleStick', id: 'echarts_candlestick'},
        ],
      };
    },
    created() {
      console.log('created');
      console.log('print json', da);
      networklib.get('/datas/600191').then(objs => {
        console.log('obj', objs);
      }).catch(err => {
        console.log('err', err);
      })
    },
    methods: {
      onClick(id) {
        this.$router.push({name: id});
      }
    }
  };
</script>
