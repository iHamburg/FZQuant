 <!-- 消息列表 -->
<style lang="scss" src="src/sass/mysms.scss" scoped></style>
<template>
  <div class="content">

    <bl-bar barStyle="bar-dark-linear">
      <div class="button" slot="left-button" >
        <div class="iconfont"></div>
      </div>
      <div slot="title">消息列表</div>
    </bl-bar>

    <ul class="sysmess1" v-for="item in msgGroupList">
        <li @click="onMyNews(item.msgGroupId)">
            <span class="sysl">
                <em class="pic">
                  <i v-show="item.badge > 0" :class="{'longMsg': item.badge > 99}">{{item.badge}}</i>
                  <img :src="item.icon">
                </em>
            </span>
            <div class="sysr">
                <i>{{item.lastDate | formatDate}}</i>
                <h1>{{item.title}}</h1>
                <p>{{item.lastContent}}</p>
            </div>
        </li>
    </ul>
    <ul class="sysmess mysms"></ul>
    <!-- 这里加个分割 -->

    <!--对话消息-->
    <ul class="sysmess" v-for="item in conversationList">
        <li @click="onMyMessage(item)">
            <span class="sysl">
                <em class="pic">
                  <i v-show="item.count > 0" :class="{'longMsg': item.count > 99}">{{item.count}}</i>
                  <img v-if="item.imgurl != ''" :src="item.imgurl">
                  <!--<img v-else src="static/images/defaultAvatar.png">-->
                  <img v-else src="http://img.iblimg.com/cloud-1/images/cloud/2016/12/1588078158.png" alt="">
                </em>
            </span>
            <div class="sysr">
                <i>{{item.time}}</i>
                <h1 v-if="item.name != ''">{{item.name}}</h1>
                <h1 v-else>{{item.receiver}}</h1>
                <p>{{item.value}}</p>
            </div>
        </li>
    </ul>

  </div>
</template>

<script>

  import uiMixin from 'src/mixins/uiMixin';
  export default {

    name: 'keepMysms',
    components: {

    },
    created() {
      var self = this
      console.log('注册消息列表')
      // 更新收到消息通知
      this.$jsbridgelib.registerHandler('handleIMGetNews', () => {
        console.log('消息列表收到IM消息更新')
        this.updateIMConversations();
        window.dispatchEvent(new Event("updateUnReadChartCount"));
      })
    },
    data () {
      return {

        isBrowser: false,
        conversationList: [],
        msgGroupList: [],

        queryParam: {
          dynamicId: null
        },

      }
    },
    mixins: [uiMixin],

    filters: {
      formatDate: function(value) {
        // console.log(new Date(parseInt(value) * 1000).toLocaleString())
        if (value) {
          return new Date(parseInt(value) * 1000).toLocaleString()
        } else {
          return ''
        }
      }
    },

    activated() {
      console.log('消息列表 activated');

      // 查询消息中心列表
      this.queryMessageGroupCenterList()
      this.updateIMConversations();
    },
    methods: {
      /**
       * 更新IM消息
       */
      updateIMConversations() {
        this.$jsbridgelib.bridgeIMGetConversationList((err, obj) => {
          console.log('err, obj', err, obj);
          if (err) {
            return this.$toast(err + '请重新登录')
          }
          this.conversationList = obj.list
        });
      },
      /**
       * 2015-查询消息中心消息列表
       */
      queryMessageGroupCenterList() {
        // console.log('获取消息组')
        this.$newslib.queryMessageGroupCenterList((err, obj) => {
          if (err) { this.$toast(err) }
          if (obj) {
            console.log('获取消息组', obj)
            this.msgGroupList = obj.msgGroupList
          }
        })
      },

      onMyMessage(item) {
        console.log('onMyMessage', item.receiver, item.name)
        let param = {
          receiver: item.receiver,
          username: item.name
        }
        this.$jsbridgelib.bridgeNamePushIM(param, (err, obj) => {
          if (err) {
            this.$toast('errMsg', err)
          }
          if (obj) {
            console.log('obj', obj)
          }
        });
      },
      //判断是不是浏览器
      isBrowsers: function () {
        return this.isBrowser;
      },
      /**
       *  跳转7.1.1 系统消息，交易消息，商品消息
       * @param  {[type]} msgGroupId [description]
       * @return {[type]}            [description]
       */
      onMyNews(msgGroupId) {
        this.$newslib.markMessageRead({msgGroupId}, (err, obj) => {
          if (err) { this.$toast(err) }
          if (obj) {
            console.log('11111', obj)
          }
        })
        console.log('onMyNews')
        this.$router.push({path: '/myNews/' + msgGroupId})
      },
      /**
       *
       *  跳转8.1聊天室页面.
       *
       */
      onChatRoom() {
        console.log('chatRoom')
        this.$router.push({path: '/chatRoom'})
      },

    }

  }
</script>
