<template>
  <div class="content">

    <bl-bar barStyle="bar-dark-linear">
        <div class="button" slot="left-button" @click="$router.go(-1)">
          <div class="iconfont arrow-back"><i class="fback">返回</i></div>
        </div>
        <div slot="title">我的消息</div>
        <div slot="right-button" class="hrad-right">联系人</div>
    </bl-bar>

    <ul class="sysmess">
        <li>
            <span class="sysl">
                <em class="sys1"><i></i></em>
            </span>
            <div class="sysr">
                <i>20:00</i>
                <h1>系统消息</h1>
                <p>您的信息不完善，请尽快完善得优惠券！</p>
            </div>
        </li>
        <li>
            <span class="sysl">
                <em class="sys2"><i></i></em>
            </span>
            <div class="sysr">
                <i>20:00</i>
                <h1>交易消息</h1>
                <p>您的信息不完善，请尽快完善得优惠券！</p>
            </div>
        </li>
        <li>
            <span class="sysl">
                <em class="sys3"><i></i></em>
            </span>
            <div class="sysr">
                <i>2017.03.04</i>
                <h1>商品消息</h1>
                <p>您的信息不完善，请尽快完善得优惠券！您的信息不完善，请尽快完善得优惠券！</p>
            </div>
        </li>
    </ul>

    <ul class="sysmess mysms">
        <li>
            <span class="sysl">
                <em class="pic">
                  <i>12</i>
                  <img src="static/images/xpsx3.png">
                </em>
            </span>
            <div class="sysr">
                <i>20:01</i>
                <h1>ZARA</h1>
                <p>5折无条件优惠券一张已掉入您的口袋！</p>
            </div>
        </li>
        <li>
            <span class="sysl">
                <em class="pic">
                  <i>1</i>
                  <img src="static/images/xpsx3.png">
                </em>
            </span>
            <div class="sysr">
                <i>20:23</i>
                <h1>ZARA</h1>
                <p>给您发送了一张图片！</p>
            </div>
        </li>
        <li>
            <span class="sysl">
                <em class="pic">
                  <i>23</i>
                  <img src="static/images/xpsx3.png">
                </em>
            </span>
            <div class="sysr">
                <i>20:55</i>
                <h1>商品消息</h1>
                <p>您的信息不完善，请尽快完善得优惠券！您的信息不完善，请尽快完善得优惠券！</p>
            </div>
        </li>
    </ul>

  </div>

</template>

<script>
// import api from 'src/api/index'
export default {
  name: 'mysms',

  components: {

  },
  mounted() {

  },
  data () {
    return {

    }
  },
  methods: {

  }

}
</script>
