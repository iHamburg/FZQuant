<style lang="scss" src="src/sass/parkinglot.scss" scoped></style>
<template>
  <div class="content-parking write">

    <bl-bar barStyle="bar-dark-linear">
        <div class="button" slot="left-button" @click="$router.go(-1)">
          <div class="iconfont arrow-back"><i class="fback">返回</i></div>
        </div>
        <div slot="title">发券列表</div>
    </bl-bar>

    <div class="mark-box">
         <bl-scroll :enableRefresh="true" :onRefresh="onRefresh" :on-infinite="onInfinite" :enableInfinite="isLoading" v-scroll-record>
           <div class="check-content" v-for="(item, index) in parkingList">
                <div class="checkbox">
                    <div class="check-card">
                        <div class="card">{{ item.hours }}小时
                          <span>停车券</span>
                        </div>
                        <dl>
                            <dt>{{ item.couponTitle }}</dt>
                            <dd>无门槛</dd>
                            <dd v-if="!(item.effectDays==null||item.effectDays==0)">领取后{{item.effectDays}}日内失效</dd>
                            <dd v-if="(item.effectDays==null||item.effectDays==0)">{{item.couponBegintime}}-{{item.couponEndtime}}</dd>
                            <dd>限{{ item.storeName }}</dd>
                        </dl>
                    </div>
                    <div class="bot">剩余可发： {{ item.couponNum-item.couponReceivenum<0?0:item.couponNum-item.couponReceivenum}}  <button :disabled="item.couponNum-item.couponReceivenum<=0" @click="releasePacking(item)">立即发券</button></div>
                </div>
            </div>
             <div>
              <img v-if="display" src="static/images/Rectangle37@2x.png" class="nodata" >
            </div>
         </bl-scroll>
    </div>

  </div>

</template>

<script>
export default {
  name: 'parkingRecord',

  components: {
    'BlCheckBox': () => System.import('components/cloud-merchant/check-box')
  },
  mounted() {
    this.initialize();
    this.canReleaseParkingTemplateList();
  },
  data () {
    return {
      parkingList: [],
      totalPage: 1,
      // display: false,
      queryParam: {
        merchantId: '',
        pageNum: 1,
        pageSize: 30,
      },
      itemcards: [
        {
          "price": "2小时",
          "toprice": "停车券",
          "title": "百联商城停车券",
          "desc": "500",
          "scope": "3000",
          "state": "",
          "term": ["2017-05-22", "23:00"],
          number: 1000,
          count: false
        },
        {
          "price": "2小时",
          "toprice": "停车券",
          "title": "百联商城停车券",
          "desc": "500",
          "scope": "3000",
          "state": "",
          "term": ["2017-05-22", "23:00"],
          number: 0,
          count: true
        }
      ],
    }
  },
  methods: {
    initialize () {
      this.parkingList = [] // 清空数据
      this.queryParam.pageNum = 1 // 默认查询第一页
    },
    //refresh 下拉刷新
    onRefresh (done) {
      console.log('refresh 下拉刷新')
      this.initialize()
      this.canReleaseParkingTemplateList(done);
    },
    //上拉更多
    onInfinite (done) {
      this.queryParam.pageNum ++
      this.canReleaseParkingTemplateList(done);
    },
    canReleaseParkingTemplateList(done) {
      this.$orderlib.canReleaseParkingTemplateList(this.queryParam, (err, obj) => {
        if (done) {
          done()
        }
        if (err) {
          // return this.$toast(err);
        }
        this.totalPage = obj.totalPage;
        this.parkingList = this.parkingList.concat(obj.list) // 追加数据
        console.log('2204-发券列表', JSON.stringify(obj));
      });
    },
    releasePacking(item) {
      if (item.couponBuynum == item.couponReceivenum) {
        return
      }
      //跳转6.10.6页面
      this.$router.push({'name': '6.10.6', params: {id: item.couponTemplateId}});
    }

  },
  computed: {
    isLoading() {
      console.log("this.totalPage:" + this.totalPage);
      if (this.totalPage == 1) {
        console.log("isLoading: false")
        return false
      }
      if (this.queryParam.pageNum >= this.totalPage) {
        console.log("isLoading: false");
        return false
      }
      console.log("isLoading: true");
      return true
    },

    display() {
      if (this.parkingList.length <= 0) {
        return true
      }
      return false
    },
  }

}
</script>
