<!-- 消息列表 11-->
<style lang="scss" src="src/sass/sms.scss" scoped></style>
<style lang="css">

</style>
<template>
  <div class="content">

    <bl-bar barStyle="bar-dark-linear">
        <div class="button" slot="left-button" @click="$router.go(-1)">
          <div class="iconfont arrow-back"><i class="fback">返回</i></div>
        </div>
        <div slot="title">{{title}}</div>
    </bl-bar>

    <bl-scroll :enableRefresh="true" :onRefresh="onRefresh" :on-infinite="onInfinite" :enableInfinite="isLoading" v-scroll-record>
      <bl-sms-message v-for="(item, index) in items" :itemMessage="item" @click.native="onNews(item)">
        <div slot="messageContent">
          <!--二级标题 传奇用的字段 brandName  交易消息-->
          <h2 v-if="item.messageContent.brandName" :class="{light : item.messageContent.brandName}">
            {{ item.messageContent.brandName }}
          </h2>
          <!--二级标题 老谭用的字段  subtitle  商品消息，系统消息-->
          <h2 v-if="item.messageContent.subtitle" :class="{light : item.messageContent.brandName}">
            {{ item.messageContent.subtitle }}
          </h2>
          <h2 v-if="item.messageContent.message" :class="{light : item.messageContent.memberName}">
            {{ item.messageContent.message }}
          </h2>

          <p v-if="item.messageContent.additionalInfo">
            附加信息：{{ item.messageContent.content }}
          </p>
          <p v-if="item.messageContent.memberName">
            买家：{{ item.messageContent.memberName }}
          </p>
          <p v-if="item.messageContent.goodsNum">
            数量：{{ item.messageContent.goodsNum }}件
          </p>
          <span v-if="item.messageContent.price">
            &yen; {{ item.messageContent.price}}
          </span>
        </div>
        <div class="count" slot="count" v-if="item.messageContent.count">等其他{{ item.messageContent.count }}件商品</div>
      </bl-sms-message>
      <div v-if="items.length <= 0">
        <img src="static/images/Rectangle37@2x.png" class="nodata">
      </div>
    </bl-scroll>


  </div>
</template>

<script>
import utils from 'src/utils';
export default {

  name: 'sms',

  components: {
    'BlSmsMessage': () => System.import('components/cloud-merchant/sms-message')
  },

  data () {
    return {
      items: [],
      // isLoading: true,
      totalPage: 0,
      queryParam: {
        msgGroupId: 'all',
        pageNo: 1,
        pageSize: 20
      }
    };
  },

  created() {
    this.queryParam.msgGroupId = this.$route.params.msgGroupId
    console.log('created', this.queryParam.msgGroupId)

    this.updateData()
  },

  mounted() {

  },

  methods: {
    onNews(item) {
      console.log('点击消息', item)
      if (item.messageContent.orderNo) {
        this.$router.push({path: '/orders/' + item.messageContent.orderNo});
      }
      // if (item.messageContent.afterSalesOrderId) {
      //   this.$router.push({path: '/aftersales/' + item.messageContent.afterSalesOrderId});
      // } else {
      //   if (item.messageContent.orderNo) {
      //     this.$router.push({path: '/orders/' + item.messageContent.orderNo});
      //   }
      // }

      if (item.type === '3') {
        console.log('跳转到审核不通过', item.type)
        utils.storageSet('flag', item.type)
        this.$router.push({path: '/goodsManage'})
      } else if (item.type === '4') {
        console.log('跳转到商品待审核', item.type)
        utils.storageSet('flag', item.type)
        this.$router.push({path: '/goodsManage'})
      } else if (item.type === '8') {
        console.log('跳转到店员审核页')
        let memberId = item.messageContent.memberId
        this.$router.push({name: '11.2.1', params: {id: memberId}})
      } else if (item.type === '6') {
        this.$router.push({name: 'webPage', params: {header: '1', headerName: '用户使用手册', url: 'http://123.206.105.107/2017/10/17/商户端操作手册-登录购买提示/'}})
      }
    },
    onRefresh (done) {
      console.log('refresh 下拉刷新')
      this.initialize()
      this.updateData(done);
    },

    onInfinite (done) {
      console.log('infinite 加载更多  this.isLoading', this.isLoading)

      // DONE 没有数据时改为false
      console.log('比较结果', this.queryParam.pageNo, this.totalPage)

      if (this.queryParam.pageNo >= this.totalPage) {
        console.log('没有更多数据啦')
        this.$toast({
          message: '没有更多数据啦',
          position: 'bottom',
        })
        this.isLoading = false

        done()
      } else {
        this.queryParam.pageNo ++
        this.updateData(done);
      }
    },

    // 初始化数据: 清空列表，pageNo第一页
    initialize () {
      this.items = []; // 清空goodsList
      this.queryParam.pageNo = 1 // 默认查询第一页
    },

    /**
     * 查询消息列表
     */
    updateData(done) {
      this.$newslib.queryNewsList(this.queryParam, (err, obj) => {
        if (done) { done() }
        if (err) { console.log('查询消息列表失败', err) }
        console.log('查询消息列表:\n', obj)
        this.totalPage = obj.totalPage;
        console.log('this.totalPage:', this.totalPage)
        obj.messageList.map(item => {
          item.messageContent = JSON.parse(item.messageContent)
          // 系统消息 默认展示即市logo
          if (this.queryParam.msgGroupId == '0') item.img = "../static/images/img_logo.png"
        })
        this.items = this.items.concat(obj.messageList)
      })
    }

  },

  watch: {

  },

  computed: {
    title: function() {
      let title = ''
      if (this.queryParam.msgGroupId == '0') {
        title = '系统消息'
      } else if (this.queryParam.msgGroupId == '1') {
        title = '商品消息'
      } else if (this.queryParam.msgGroupId == '2') {
        title = '交易消息'
      }
      return title
    },
    isLoading() {
      console.log('totalPage:', this.totalPage)
      if (this.totalPage <= 1) {
        return false
      }
      if (this.queryParam.pageNo >= this.totalPage) {
        return false
      }
      return true
    },
  }

};
</script>
