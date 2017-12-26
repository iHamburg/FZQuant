<template>
  <div class="echarts">
    <IEcharts :option="bar" :loading="loading" @ready="onReady" @click="onClick" resizeable="true"></IEcharts>
    <button @click="doRandom">Random</button>
  </div>
</template>

<script type="text/babel">
  import IEcharts from 'vue-echarts-v3/src/full.js';
//  import IEcharts from 'echarts/lib/chart/bar';
  export default {
    name: 'view',
    components: {
      IEcharts
    },
    props: {
    },
    data() {
      return {
        loading: true,
        myData:  [5, 20, 36, 10, 10, 20],
        bar: {
          title: {
            text: 'ECharts Hello World'
          },
          tooltip: {},
          xAxis: {
            data: ['Shirt', 'Sweater', 'Chiffon Shirt', 'Pants', 'High Heels', 'Socks']
          },
          yAxis: {},
          series: [{
            name: 'Sales',
            type: 'bar',
            data: []
          }]
        }
      }
    },
    created() {
      this.bar.series[0].data = this.myData
    },
    methods: {
      doRandom() {
        const that = this;
        let data = [];
        for (let i = 0, min = 5, max = 99; i < 6; i++) {
          data.push(Math.floor(Math.random() * (max + 1 - min) + min));
        }
        that.loading = !that.loading;
        that.bar.series[0].data = data;
      },
      onReady(instance) {
        console.log('on ready');
        this.loading = false
        console.log(instance);
      },
      onClick(event, instance, echarts) {
        console.log('onclick');
        console.log(arguments);
      }
    }
  };
</script>

<style scoped>
  .echarts {
    /*width: 400px;*/
    height: 400px;
  }
</style>
