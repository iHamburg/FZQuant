
<style lang="scss" src="src/sass/boundGoods.scss" scoped></style>
<template>
  <div class="content-bound"  :class="{'white': itemcards.length == 0}">

    <bl-bar barStyle="bar-dark-linear">
        <div class="button" slot="left-button" @click="$router.go(-1)">
          <div class="iconfont arrow-back"><i class="fback">返回</i></div>
        </div>
        <div slot="title">已绑定商品</div>
    </bl-bar>

    <div class="bound-box notop">

        <div class="check-content" v-if="itemcards.length > 0">

		        <div class="checkbox" v-for="(item, index) in itemcards" @touchstart="touchStart(item, index)" @touchmove="touchMove(item, index)" @touchend="touchEnd(item, index)">
				        <div class="check-card check-pic">
				            <div class="picture">
				              <img :src="item.url">
				            </div>
				            <dl>
				                <dt>{{ item.title }}</dt>
				                <dd>货号：{{ item.no }}</dd>
				                <dd>吊牌价：&yen;{{ item.price}}</dd>
				                <dd>售价：&yen;{{ item.sale }} </dd>
				            </dl>
				        </div>
				        <div class="btn">
				            <span class="no">禁止参活</span>
				            <span @click="removeAct(itemcards, index)">移出活动</span>
				        </div>
		        </div>

        </div>
    		<dl class="nogoods" v-else>
    				<dt></dt>
    				<dd>暂无符合条件的商品</dd>
    				<dd>
    					<button>添加商品</button>
    				</dd>
    		</dl>
    </div>

    <div class="editbar-bound">
    	<bl-button>添加参活商品</bl-button>	
    </div>


  </div>

</template>

<script>
export default {
  name: 'boundGoods',

  components: {
  },
  mounted() {

  },
  data () {
    return {
      isSlide: false,
      itemcards: [
        {
          "url": "static/images/s_01.png",
          "title": "CHOCOOLATE 拼色POLO衫 CHOCOOLATE 拼色POLO衫",
          "no": "3455567678889",
          "price": "366.00",
          "sale": "166.00",
          "state": true
        },
        {
          "url": "static/images/s_01.png",
          "title": "CHOCOOLATE 拼色POLO衫 CHOCOOLATE 拼色POLO衫",
          "no": "3455567678889",
          "price": "366.00",
          "sale": "166.00",
          "state": false
        },
        {
          "url": "static/images/s_02.png",
          "title": "CHOCOOLATE 拼色POLO衫 CHOCOOLATE 拼色POLO衫",
          "no": "3455567678889",
          "price": "366.00",
          "sale": "166.00",
          "state": false
        },
        {
          "url": "static/images/s_01.png",
          "title": "CHOCOOLATE 拼色POLO衫 CHOCOOLATE 拼色POLO衫",
          "no": "3455567678889",
          "price": "366.00",
          "sale": "166.00",
          "state": false
        },
        {
          "url": "static/images/s_01.png",
          "title": "CHOCOOLATE 拼色POLO衫 CHOCOOLATE 拼色POLO衫",
          "no": "3455567678889",
          "price": "366.00",
          "sale": "166.00",
          "state": false
        },
        {
          "url": "static/images/s_01.png",
          "title": "CHOCOOLATE 拼色POLO衫 CHOCOOLATE 拼色POLO衫",
          "no": "3455567678889",
          "price": "366.00",
          "sale": "166.00",
          "state": false
        }
      ],
      nowRange: '',
      nowIndex: '',
      endRange: '',
      endIndex: '',

    }
  },
  methods: {
    touchStart(item, index) {
      var that = this
      var e = arguments
      var event = window.event || e.callee.caller.arguments[0]
      var touchEvent = event.touches[0]
      this.nowIndex = index
      this.nowRange = touchEvent.pageX
    },
    touchMove(item, index) {
      var e = arguments
      var event = window.event || e.callee.caller.arguments[0]
      var touchEvent = event.touches[0]
      if (index == this.nowIndex) {
        this.endIndex = index
        this.endRange = touchEvent.pageX
      }
    },
    touchEnd(item, index) {
      var e = arguments
      var event = window.event || e.callee.caller.arguments[0]
      var touchEvent = event.touches[0]
      if (index == this.nowIndex && (this.nowRange - this.endRange) > 100) {
        this.slideAnd('left', index)
      }
      if (index == this.nowIndex && (this.nowRange - this.endRange) < 100) {
        this.slideAnd('right', index)
      }
      this.endRange = 0
    },
    slideAnd(param, index) {
      if (param == 'left') {
        let box = document.querySelectorAll('.checkbox')
        let btn = document.querySelectorAll('.btn')
        btn[index].style.right = 0 + 'rem'
        box[index].style.marginLeft = -1.5 + 'rem'
      }
      if (param == 'right') {
        let box = document.querySelectorAll('.checkbox')
        let btn = document.querySelectorAll('.btn')
        btn[index].style.right = -1.5 + 'rem'
        box[index].style.marginLeft = 0 + 'rem'
      }
    },
    removeAct(item, index) {
      this.slideAnd('right', index)
      let obj = item
      obj.splice(index, 1)
    }

  }

}
</script>
