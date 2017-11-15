<style lang="css">

</style>
<template>
  <div id="">
    <!--<div v-for="host in hostList">-->
      <!--<h2>{{host.key}} {{host.host}} </h2>-->
      <!--<div v-for="api in apiList">-->
        <!--<p>{{api}}</p>-->
      <!--</div>-->
    <!--</div>-->
    <h2>DEV 接口 120.136.161.163:3000</h2>
    <div v-for="item in statusDevList">
      <p>{{item.api}} - {{item.status}}</p>
      <p v-if="item.api == '/api/service/shareurl'">===shareurl==={{item.obj}}</p>
    </div>
    <br>
    <h2>SIT 接口 10.202.169.19:8080</h2>
    <!--<p>/api/coupons/1027 状态: {{statusSitList[0]}} </p>-->
    <div v-for="item in statusSitList">
      <p>{{item.api}} - {{item.status}}</p>
      <p v-if="item.api == '/api/service/shareurl'">===shareurl==={{item.obj}}</p>
    </div>

  <br>
    <h2>PRE 接口 cloudom.ut.bl.com</h2>
    <div v-for="item in statusPreList">
      <p>{{item.api}} - {{item.status}}</p>
      <p v-if="item.api == '/api/service/shareurl'">===shareurl==={{item.obj}}</p>
    </div>
    <br>
    <h2>PRD 接口 cloudom.bl.com</h2>
    <div v-for="item in statusPrdList">
      <p>{{item.api}} - {{item.status}}</p>
    </div>

  </div>
</template>

<script>
  import VueResource from 'vue-resource'
  import Vue from 'vue'
  export default {
    name: 'cms',

    data () {
      return {
        hostList: [
          {key: 'DEV', host: 'http://120.136.161.163:3000'},
          {key: 'SIT', host: 'http://10.202.169.19:8080'},
          {key: 'PRE', host: 'http://cloudom.ut.bl.com'},
          {key: 'PRD', host: 'http://cloudom.bl.com'},
        ],
        apiList: [
          {api: '/api/coupons/1027'},
          {api: '/api/goods/1002'},
          {api: '/api/goods/1003'},
          {api: '/api/goods/1005'},
          {api: '/api/goods/1006'},
          {api: '/api/merchant/1001'},
          {api: '/api/promotions/1025'},
          {api: '/api/order/2001'},
          {api: '/api/activity/3001'},
          {api: '/api/coupons/createCoupon'},
          {api: '/api/service/shareurl'},
          {api: '/api/order/2017'},
          {api: '/api/coupons/6010'},
        ],
        statusDevList: [],
        statusSitList: [],
        statusPreList: [],
        statusPrdList: [],

      };
    },
    created() {
      console.log('start api test');

      this.hostList.map(obj => {
        let host = obj.host;
        this.apiList.map(apiItem => {
          let api = apiItem.api;
          let url = host + api;
          let param = apiItem.param;
//          console.log('url ', url);
          Vue.http.post(url, param).then(response => {
            var data = response.body || {};
//            console.log('obj.key ', obj.key, 'data ', data);
            if (obj.key == 'DEV') {
              this.statusDevList.push({api, status: data.resCode, obj: data.obj});
            } else if (obj.key == 'SIT') {
              this.statusSitList.push({api, status: data.resCode, obj: data.obj});
            } else if (obj.key == 'PRE') {
              this.statusPreList.push({api, status: data.resCode, obj: data.obj});
            } else if (obj.key == 'PRD') {
              this.statusPrdList.push({api, status: data.resCode, obj: data.obj});
            }
          }).catch(() => {
            if (obj.key == 'DEV') {
              this.statusDevList.push({api, status: '404网络错误'});
            } else if (obj.key == 'SIT') {
              this.statusSitList.push({api, status: '404网络错误'});
            } else if (obj.key == 'PRE') {
              this.statusPreList.push({api, status: '404网络错误'});
            } else if (obj.key == 'PRD') {
              this.statusPrdList.push({api, status: '404网络错误'});
            }
          })
        });
      });
    },
    mounted() {

    },
    methods: {

    },
    watch: {

    },
    computed: {

    }

  };
</script>
