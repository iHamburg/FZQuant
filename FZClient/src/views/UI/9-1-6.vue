<template>
  <div class="content">

    <bl-bar barStyle="bar-dark-linear">
        <div class="button" slot="left-button" @click="$router.go(-1)">
          <div class="iconfont arrow-back"><i class="fback">返回</i></div>
        </div>
        <div slot="title">物流追踪</div>
    </bl-bar>

    <div class="order-details orderpost">
        <div class="order-number">
            <dl><i></i>
                <dd>订单编号：<em ref="number">23131359103510359015</em></dd>
                <dd>物流公司：顺丰</dd>
                <dd>运单编号：2354513413513144</dd>
            </dl>
            <span class="copy">复制</span>
        </div>
    </div>

    <div class="order-express expost">

        <div class="express" v-for="item in orderData.express">
            <blProgress :gressData="item" class="express-line"></blProgress>
            <dl>
                <dd class="exp" v-if="item.opExp">{{ item.opExp }}</dd>
                <dd>{{ item.opText }}</dd>
                <dd class="time">{{ item.opTime }}</dd>
            </dl> 
        </div>

    </div>


  </div>

</template>

<script>
// import api from 'src/api/index'
import blProgress from 'components/cloud-merchant/status-progress'
export default {
  name: 'orderment',
  components: {
    blProgress
  },
  mounted() {
  },

  data () {
    return {
      // 订单
      orderData: {

        // 快递信息
        express: [
          {'isCurrent': true, 'opTime': '2017-01-17  22:18:22', 'opExp': '感谢您在百联购物，欢迎您再次光临~'},
          {'isCurrent': false, 'opTime': '2017-01-17  18:12:20', 'opExp': '', 'opText': '顺丰配送员【张小军】已出发，联系电话：13391234567或13391234567，感谢您的耐心等待，参加评价还能赢取积分哟～'},
          {'isCurrent': false, 'opTime': '2017-01-17  15:05:00', 'opExp': '', 'opText': '您的订单在百联【陆家嘴接货舱】发货完成，准备发往【豫园分拣中心】'},
          {'isCurrent': false, 'opTime': '2017-01-17  13:22:11', 'opExp': '', 'opText': '您的订单在百联【陆家嘴接货舱】发货完成分拣完成'},
          {'isCurrent': false, 'opTime': '2017-01-17  12:22:23', 'opExp': '', 'opText': '订单清关完成，等待仓库发货'},
          {'isCurrent': false, 'opTime': '2017-01-17  12:22:23', 'opExp': '', 'opText': '订单提交成功，等待海关清关'},
          {'isCurrent': false, 'opTime': '2017-01-17  12:22:23', 'opExp': '', 'opText': '订单提交成功'}
        ]
      }
    }
  },
  computed: {
  },
  methods: {

  }
}
</script>
