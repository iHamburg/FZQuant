<style lang="scss" src="src/sass/setupSlide.scss" scoped></style>
<template>
	<div class="content">
		<bl-bar barStyle="bar-dark-linear">
			<div class="button" slot="left-button" @click="$router.go(-1)">
			  <div class="iconfont arrow-back"></div><i class="fback">返回</i>
			</div>
			<div slot="title">设置广告轮播图</div>
			<div slot="right-button" class="hrad-right">完成</div>
		</bl-bar>
		<p class="toptip">
			<span class="tl">轮播图</span>
			<span class="tr">长按拖动</span>
		</p>

		<div class="slide-box">
			<dl class="slide" v-for="(item, index) in slides" :class="{'light': item.light}">
				<dt><span>轮播图{{ index + 1 }}</span> <i class="hand" @touchstart.prevent="touchStart(index, slides)" @touchmove.prevent="touchMove(index, item)" @touchend.prevent="touchEnd(index, slides)"></i></dt>
				<dd>
					<div class="picture"><img :src="item.picture"></div>
					<i class="del" @click="delSlide(index)">删除</i>
				</dd>
			</dl>
		</div>

	</div>
</template>

<script>
  export default {
    name: 'setupSlide',
    data () {
      return {
        isLight: false,
        beginTouch: false,
        timer: null,
        startT: null,
        startY: null,
        endY: null,
        boxH: null,
        moveFuck: 0,
        slideFuck: 0,
        slides: [
          {id: 0, picture: 'static/images/h_01.jpg', light: false},
          {id: 1, picture: 'static/images/h_02.jpg', light: false},
          {id: 2, picture: 'static/images/p6_01.png', light: false},
          {id: 3, picture: 'static/images/p6_02.png', light: false}
        ],
        slideData: []
      }
    },
    mounted() {
      this.slideSort()
    },
    methods: {
      slideSort() {
        this.slideData = this.slides
        var box = document.querySelectorAll('.slide')
        var h = document.querySelector('.slide').offsetHeight
        document.querySelector('.slide-box').style.height = (h * this.slides.length) + 'px'
        this.boxH = h
        for (var i = 0; i < this.slides.length; i += 1) {
          box[i].style.top = h * i + 'px'
          // (function(i) {
          //   setTimeout(function() {
          //     box[i].style.top = h * i + 'px'
          //   }, 100 * i)
          // })(i)
        }
      },
      delSlide(index) {
        let array = this.slides
        array.splice(array[index], 1)
        this.slideSort()
      },
      touchStart(index, item) {
        var that = this
        var e = arguments
        var event = window.event || e.callee.caller.arguments[0]
        var touchEvent = event.touches[0]
        var cuurerBox = event.target.parentNode.parentNode
        this.startT = parseInt(cuurerBox.style.top)
        that.startY = touchEvent.pageY
        this.timer = setTimeout(function() {
          item[index].light = true
          if (that.startY == touchEvent.pageY) that.beginTouch = true
          cuurerBox.style.zIndex = 9
        }, 800)
      },
      touchMove(index, item) {
        var e = arguments
        var event = window.event || e.callee.caller.arguments[0]
        var touchEvent = event.touches[0]
        if (this.beginTouch) {
          var move = touchEvent.pageY - this.startY
          // var currerBox = event.target.parentNode.parentNode
          var box = document.querySelectorAll('.slide')
          if ((touchEvent.pageY - this.startY) > 0) {
            box[index].style.top = this.startT + (touchEvent.pageY - this.startY) + 'px'
            this.moveAnimation(move, index)
          } else if (index != 0) {
            box[index].style.top = this.startT + (touchEvent.pageY - this.startY) + 'px'
            this.moveAnimation(move, index)
          }
          this.endY = touchEvent.pageY
        }
      },
      touchEnd(index, item) {
        clearTimeout(this.timer)
        this.beginTouch = false
        item[index].light = false
        let box = document.querySelectorAll('.slide')
        box[index].style.zIndex = 1
        if (this.endY) {
          var key = Math.round((this.endY - this.startY) / this.boxH)
          if (key != 0) {
            console.log(this.slideData)
            let array = this.slideData
            let newD = array[index]
            array.splice(index, 1)
            array.splice(index + key, 0, newD)
          }
          this.slideSort()
        }
        this.endY = null
        this.moveFuck = 0
      },
      moveAnimation(move, index) {
        var box = document.querySelectorAll('.slide')
        var key = Math.round(move / this.boxH)
        if (this.moveFuck == 1) {
          let div = box[index + (key + 1)] || box[index + (key)]
          if (div) div.style.top = (this.boxH * (index + key) + this.boxH) + 'px'
        }
        if (this.moveFuck == 2) {
          let div = box[index + (key - 1)] || box[index + (key)]
          if (div) div.style.top = (this.boxH * (index + key) - this.boxH) + 'px'
        }
        if (key >= 1) {
          let div = box[index + key]
          if (div) {
            div.style.top = (this.boxH * (index + key) - this.boxH) + 'px'
            this.moveFuck = 1
          }
        }
        if (key < 0) {
          let div = box[index + key]
          if (div) div.style.top = (this.boxH * (index + key) + this.boxH) + 'px'
          this.moveFuck = 2
        }
        box = null
      }
    }
  }
</script>
