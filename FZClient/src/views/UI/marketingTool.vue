<template>
  <div class="content">

    <bl-bar barStyle="bar-dark-linear">
        <div class="button" slot="left-button" @click="$router.go(-1)">
          <div class="iconfont arrow-back"><i class="fback">返回</i></div>
        </div>
        <div slot="title">营销工具</div>
    </bl-bar>

    <div class="marketing">
     <div class="module">
      <div class="marketing-title">内容发布</div>
      <ul>
        <li>
          <div class="left-fonts">发布上新广播</div>
          <div class="right-fonts arrow">
            <div class="iconfont arrow-back"></div>
          </div>
        </li>
        <li>
          <div class="left-fonts">发布优惠券广播</div>
          <div class="right-fonts arrow">
            <div class="iconfont arrow-back"></div>
          </div>
        </li>
        <li>
          <div class="left-fonts">发布上新广播</div>
          <div class="right-fonts arrow">
            <div class="iconfont arrow-back"></div>
          </div>
        </li>
      </ul>
     </div>

     <div class="module">
        <div class="marketing-title">优惠券</div>
        <ul>
          <li>
            <div class="left-fonts">创建礼品券</div>
            <div class="right-fonts arrow">
              <div class="iconfont arrow-back"></div>
            </div>
          </li>
          <li>
            <div class="left-fonts">券列表</div>
            <div class="right-box arrow">
              <div class="iconfont arrow-back"></div>
            </div>
          </li>
          <li>
            <div class="left-fonts">券合销流水</div>
            <div class="right-box arrow">
              <div class="iconfont arrow-back"></div>
            </div>
          </li>
        </ul>
     </div>

     <div class="module">
        <div class="marketing-title">专题</div>
        <ul>
          <li>
            <div class="left-fonts">报名参加专题活动</div>
            <div class="right-fonts arrow">
              <div class="iconfont arrow-back"></div>
            </div>
          </li>
          <li>
            <div class="left-fonts">已报名的专题</div>
            <div class="right-box arrow">
              <div class="iconfont arrow-back"></div>
            </div>
            <div class="right-box arrow no">6个</div>
          </li>
          <li>
            <div class="left-fonts">已入选的专题</div>
            <div class="right-box arrow">
              <div class="iconfont arrow-back"></div>
            </div>
            <div class="right-box arrow no">3个</div>
          </li>
        </ul>
     </div>

    </div>
  </div>
</template>

<script>
// import api from 'src/api/index'
//  import xxx
export default {
  name: 'marketingTool',
  components: {
  },

  data () {
    return {

    }
  },

}
</script>
