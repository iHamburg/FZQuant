<!--http://echarts.baidu.com/demo.html#candlestick-sh-2015-->

<template>
  <div class="echarts">
    <IEcharts :option="bar" :loading="loading" @ready="onReady" @click="onClick" resizeable="true"></IEcharts>

  </div>
</template>

<script type="text/babel">

  import IEcharts from 'vue-echarts-v3/src/full.js';
  import talib from '../../libs/talib'

  export default {
    name: 'candlechart',
    components: {
      IEcharts
    },
    data() {
      return {
        loading: true,
        rawData: [],
        bar: {
          title: {
            text: 'Dow Jones'
          },
          xAxis: {
            type: 'category',
            data: this.dates,
            axisLine: { lineStyle: { color: '#8392A5' } }
          },
          yAxis: {
            scale: true,
            axisLine: { lineStyle: { color: '#8392A5' } },
            splitLine: { show: false }
          },
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              animation: false,
              type: 'cross',
              lineStyle: {
                color: '#376df4',
                width: 2,
                opacity: 1
              }
            }
          },
          animation: false,
          legend: {
            bottom: 10,
            left: 'center',
            data: ['Dow-Jones index', 'MA5', 'MA10', 'MA20', 'MA30']
          },
          dataZoom: [{
            textStyle: {
              color: '#8392A5'
            },
            handleIcon: 'M10.7,11.9v-1.3H9.3v1.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4v1.3h1.3v-1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7V23h6.6V24.4z M13.3,19.6H6.7v-1.4h6.6V19.6z',
            handleSize: '80%',
            dataBackground: {
              areaStyle: {
                color: '#8392A5'
              },
              lineStyle: {
                opacity: 0.8,
                color: '#8392A5'
              }
            },
            handleStyle: {
              color: '#fff',
              shadowBlur: 3,
              shadowColor: 'rgba(0, 0, 0, 0.6)',
              shadowOffsetX: 2,
              shadowOffsetY: 2
            }
          }, {
            type: 'inside'
          }],
          series: [
            {
              name: 'Dow-Jones index',
              type: 'candlestick',  // OCLH
              data: this.candleValues,
              itemStyle: {
                normal: {
                  color: '#FD1050',
                  color0: '#0CF49B',
                  borderColor: '#FD1050',
                  borderColor0: '#0CF49B'
                }
              }
            },
//            {
//              name: 'MA5',
//              type: 'line',
//              data: this.calculateMA5,
//              smooth: true,
//              showSymbol: false,
//              lineStyle: {
//                normal: {
//                  width: 1
//                }
//              }
//            },
          ]
        }
      }
    },
    created() {
      console.log('created');
      this.queryData()
    },
    methods: {
      queryData() {
        console.log('======== begin queryData ');
//        let self = this
//        datalib.getStock('002119?fromdate=2017-01-01', function(err, obj)  {
//          if (err) {
//            console.log('err ', err);
//          }
////          console.log('======== get stock', obj);
//          self.rawData = obj
//
//          let data = obj.map(item => {
////            console.log('item',item);
//            return item[1]
//          })
//          console.log('data', data);
//
//          let data2 = talib.sma(data,10)
//          console.log('sma', data2);
//          self.updateData()
//        })
      },
      updateData() {
        this.bar.series[0].data = this.candleValues
        this.bar.xAxis.data = this.dates
        this.bar.series.push(
          {
            name: 'MA5',
            type: 'line',
            data: this.calculateMA5,
            smooth: true,
            showSymbol: false,
            lineStyle: {
              normal: {
                width: 1
              }
            }
          }
        ),
        this.bar.series[1].data = this.calculateMA5
      },
      onReady(instance) {
        console.log('on ready');
        this.loading = false
//        console.log(instance);
      },
      onClick(event, instance, echarts) {
        console.log('onclick');
        console.log(arguments);
      },
      calculateMA(dayCount, data) {
        let result = [];
        for (let i = 0, len = data.length; i < len; i++) {
          if (i < dayCount) {
            result.push('-');
            continue;
          }
          let sum = 0;
          for (let j = 0; j < dayCount; j++) {
            sum += data[i - j][1];
          }
          result.push(sum / dayCount);
        }
        return result;
      }

    },
    computed: {
      dates: function() {
        return this.rawData.map(function (item) {
          return item[0];
        })
      },
      candleValues: function () {
        return this.rawData.map(function (item) {
          return [item[1], item[2], item[3], item[4]];
        })
      },
      calculateMA5: function () {
        let result = [];
        let data = this.candleValues
        let dayCount = 5
        for (let i = 0, len = data.length; i < len; i++) {
          if (i < dayCount) {
            result.push('-');
            continue;
          }
          let sum = 0;
          for (let j = 0; j < dayCount; j++) {
            sum += data[i - j][1];
          }
          result.push(sum / dayCount);
        }
        return result;
      },
    },
  };
</script>

<style scoped>
  .echarts {
    /*width: 400px;*/
    height: 400px;
  }
</style>
