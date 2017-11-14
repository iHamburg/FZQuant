<template>
  <div class="home">
    <keep-alive :include="/keep/">
      <router-view></router-view>
    </keep-alive>
    <tab v-for="item in datas02" :tabIndex="item"></tab>
  </div>
</template>

<script>
  import tab from 'components/scratchable-latex/tab-index';
  export default {
    name: 'keephome',
    components: {
      tab
    },
    mixins: [],
    data () {
      return {
        unReadSystemCount: 0, // 未读系统通知消息数量
        unReadChartCount: 0, // 未读聊天室消息数量
        datas02: [
          {
            "number": "0",
            "imgUrl1": "../static/images/gzt3.png",
            "workbench": "工作台",
            "path": "/cloudStoreIndex",
            "imgUrl01": "../static/images/gzt03.png",
            "imgUrl2": "../static/images/xx3.png",
            "message": "消息",
            "path02": "/message",
            "imgUrl02": "../static/images/xx03.png",
            "show": 1
          }
        ],
      }
    },
    props: {
      tabIndex: Object
    },
    created() {
      // 更新收到消息通知
      var self = this
      window.addEventListener("updateUnReadChartCount", function(e) {
        console.log('更新unReadChartCount1');
        self.unreadChartMessageCount();
      }, false);
      window.addEventListener("IMLoginFinish", function(e) {
        console.log('IMLoginFinish -- unReadChartCount1');
        self.unreadChartMessageCount();
      }, false);
    },
    activated() {
      var self = this
      // 读取未读消息数
      this.updateUnreadMessageCount((err, count) => {
        console.log('更新message未读数量', count);
        if (err) {
          return self.$toast(err)
        }
        self.unReadSystemCount = count;
        self.datas02[0].number = self.unReadSystemCount + self.unReadChartCount
      });
      console.log('聊天室未读数量', this.unReadChartCount);
      window.setTimeout(() => {
        self.unreadChartMessageCount();
      }, 800)
    },
    methods: {
      updateUnreadMessageCount(callback) {
        // 查询系统消息
        this.$newslib.queryUnReadMessageCount({}, (err, obj) => {
          if (err) {
            if (callback) callback(err)
            return;
          }
          var count = obj;
          console.log('查询系统消息', count);
          callback(null, count)
        })
      },
     // 查询IM未读数量
      unreadChartMessageCount() {
        var self = this;
        // 查询IM未读数量
        this.$jsbridgelib.bridgeIMQueryUnreadCount((err, obj) => {
          console.log('查询Im消息', obj, err);
          if (err) {
//             if (callback) callback(err);
            return;
          }
          var count = obj.count || 0;
            // 更新未读消息数数量
          self.unReadChartCount = count;
          self.datas02[0].number = self.unReadSystemCount + self.unReadChartCount
        })
      }
    }
  }
</script>
