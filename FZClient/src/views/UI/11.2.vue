<style lang="scss" src="src/sass/events.scss" scoped></style>
<template>
  <div class="events">

    <bl-bar barStyle="bar-dark-linear">
        <div class="button" slot="left-button" @click="$router.go(-1)">
          <div class="iconfont arrow-back"><i class="fback">返回</i></div>
        </div>
        <div slot="title">专题详情</div>
    </bl-bar>

    <p class="top">专题信息</p>
    <bl-comli>
        <div slot='left-text' class="left-box">专题方向</div>
        <div slot='right-text' class="right-box">
          <div class="right-l">
            情人节某某女装9折大促销
          </div>
        </div>
    </bl-comli>
    <bl-comli>
        <div slot='left-text' class="left-box">报名截止</div>
        <div slot='right-text' class="right-box">
          <div class="right-l">
            2017-09-28 00:00:00
          </div>
        </div>
    </bl-comli>
    <bl-comli>
        <div slot='left-text' class="left-box">拟上线</div>
        <div slot='right-text' class="right-box">
          <div class="right-l">
            2017-10-01 13:00:00
          </div>
        </div>
    </bl-comli>
    <bl-comli>
        <div slot='left-text' class="left-box">拟下线</div>
        <div slot='right-text' class="right-box">
          <div class="right-l red">
            2017-10-15 23:00:00
          </div>
        </div>
    </bl-comli>

    <p class="top">专题内容描述</p>
    <bl-comli>
        <div slot='left-text' class="left-box">内容描述</div>
        <div slot='right-text' class="right-box">
          <div class="right-l items">
            情人节9折大促销巴拉巴拉巴拉巴拉巴拉巴拉巴拉巴拉巴拉巴拉巴拉巴拉
          </div>
        </div>
    </bl-comli>

    <p class="top">提报商品要求</p>
    <bl-comli>
        <div slot='left-text' class="left-box">支持分类</div>
        <div slot='right-text' class="right-box">
          <div class="right-l items">
            男士衬衫、男士T恤、男士裤装、服饰配件
          </div>
        </div>
    </bl-comli>
    <bl-comli>
        <div slot='left-text' class="left-box">件数上限</div>
        <div slot='right-text' class="right-box">
          <div class="right-l red">
            10件
          </div>
        </div>
    </bl-comli>

    <p class="top">提报要求</p>
    <bl-comli>
        <div slot='left-text' class="left-box">要求1</div>
        <div slot='right-text' class="right-box">
          <div class="right-l items">
            商品上线期间段保证货源充足，商品不得少于 XX 商品。
          </div>
        </div>
    </bl-comli>
    <bl-comli>
        <div slot='left-text' class="left-box">要求2</div>
        <div slot='right-text' class="right-box">
          <div class="right-l items">
            商品上线期间段保证货源充足，商品不得少于 XX 商品。
          </div>
        </div>
    </bl-comli>
    <bl-comli>
        <div slot='left-text' class="left-box">要求3</div>
        <div slot='right-text' class="right-box">
          <div class="right-l items">
            商品上线期间段保证货源充足，商品不得少于 XX 商品。
          </div>
        </div>
    </bl-comli>

    <div class="bot">
      <bl-button>提报商品</bl-button>
    </div>
  </div> 
</template>

<script>
export default {
  name: 'events',
  components: {
  },
  mounted() {

  },

  data () {
    return {
      picture: [
        {image: '', title: '情人节某某女装9折大促销', time: '预计上线档期: 2017-03-15 ～ 2017-06-15'},
        {image: '', title: '情人节某某女装9折大促销', time: '预计上线档期: 2017-03-15 ～ 2017-06-15'},
        {image: 'static/images/h_01.jpg', title: '情人节某某女装9折大促销', time: '预计上线档期: 2017-03-15 ～ 2017-06-15'},
        {image: 'static/images/h_01.jpg', title: '情人节某某女装9折大促销', time: '预计上线档期: 2017-03-15 ～ 2017-06-15'},
        {image: '', title: '情人节某某女装9折大促销', time: '预计上线档期: 2017-03-15 ～ 2017-06-15'}
      ]
    }
  },
  computed: {
  },
  methods: {
  }
}
</script>
