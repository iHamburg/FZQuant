


<template>
  <div class="content">

    <bl-bar barStyle="bar-dark-linear">
        <div class="button" slot="left-button" @click="$router.go(-1)">
          <div class="iconfont arrow-back"><i class="fback">返回</i></div>
        </div>
        <div slot="title">系统消息</div>
    </bl-bar>


    <bl-sms-message v-for="(item, index) in items" :itemMessage="item">
        <div slot="messageContent">
            <h2 :class="{light : item.messageContent.name}">{{ item.messageContent.message }}</h2>
            <p v-if="item.messageContent.name">买家：{{ item.messageContent.name }}</p>
            <p v-if="item.messageContent.number">数量：{{ item.messageContent.number }}件</p>
            <span v-if="item.messageContent.price">&yen; {{ item.messageContent.price}} </span>
        </div>
        <div class="count" slot="count" v-if="item.messageContent.count">等其他{{ item.messageContent.count }}件商品</div>
    </bl-sms-message>


  </div>

</template>

<script>
// import api from 'src/api/index'
export default {
  name: 'sms',

  components: {
    'BlSmsMessage': () => System.import('components/cloud-merchant/sms-message')
  },
  mounted() {

  },
  data () {
    return {

      items: [
        {'status': '1', 'time': '今天 上午09:40', 'title': '发布上新提醒', 'img': 'static/images/sms.png', 'message': '您有多件上新商品未发布，是否发布到有逛平台？', 'name': '', 'number': '', 'price': '', 'messageContent': {'message': 'Nike夏季新款！全气垫酷黑色慢跑鞋鞋鞋鞋鞋鞋胸罩胸罩胸罩胸罩', 'name': '天朝王小猫', 'number': '3', 'price': '1599.00'}
        },
        {'status': '0', 'time': '', 'title': '商品审核通过', 'img': 'static/images/sms.png', 'messageContent': {'message': '恭喜！您的商品审核通过', 'name': '', 'number': '', 'price': ''}},
        {'status': '1', 'time': '今天 上午09:40', 'title': '发布上新提醒', 'img': 'static/images/sms.png', 'messageContent': {'message': '您有多件上新商品未发布，是否发布到有逛平台？', 'name': '', 'number': '', 'price': ''}},
        {'status': '0', 'time': '', 'title': '商品审核通过', 'img': 'static/images/sms.png', 'messageContent': {'message': '恭喜！您的商品审核通过', 'name': '', 'number': '', 'price': ''}},
        {'status': '0', 'time': '', 'title': '开单提醒', 'img': 'static/images/sms.png', 'messageContent': {'message': 'Nike夏季新款！全气垫酷黑色慢跑鞋鞋鞋鞋鞋鞋胸罩胸罩胸罩胸罩', 'name': '天朝王小猫', 'number': '3', 'price': '1599.00'}},
        {'status': '0', 'time': '', 'title': '开单提醒', 'img': 'static/images/sms.png', 'messageContent': {'message': 'Nike夏季新款！全气垫酷黑色慢跑鞋鞋鞋鞋鞋鞋胸罩胸罩胸罩胸罩', 'name': '天朝王小猫', 'number': '3', 'price': '1599.00'}},
        {'status': '1', 'time': '今天 上午11:40', 'title': '发货提醒', 'img': 'static/images/sms.png', 'messageContent': {'message': 'Nike夏季新款！胸罩胸罩胸罩胸罩胸罩胸罩胸罩胸罩', 'name': '天朝王小猫', 'number': '3', 'price': '1599.00', 'count': '5'}}
      ]

    }
  },
  methods: {

  }

}
</script>
