<template>
  <div class="content">
    <bl-bar barStyle="bar-dark-linear">
        <div class="button" slot="left-button" @click="$router.go(-1)">
          <div class="iconfont arrow-back"><i class="fback">返回</i></div>
        </div>
        <div slot="title">过渡效果</div>
    </bl-bar>

      <div>
      <button @click="show = !show">
          Toggle
      </button>
      <transition name="fade">
          <p v-show="show">hello</p>
      </transition>
      </div>
      <div>
          <button @click="show1 = !show1">
              Toggle render
          </button>
          <transition name="slide-fade">
              <p v-show="show1">hello</p>
          </transition>
      </div>
      <!--<div>-->
          <!--<button @click="show2 = !show2">-->
              <!--Toggle js 钩子-->
          <!--</button>-->
          <!--<transition-->

                        <!--@enter="enter"-->
                        <!--@leave="leave">-->
                        <!--&lt;!&ndash;@after-enter="afterEnter"&ndash;&gt;-->
                        <!--&lt;!&ndash;@enter-cancelled="enterCancelled">&ndash;&gt;-->
                        <!--&lt;!&ndash;v-on:before-leave="beforeLeave"&ndash;&gt;-->

                        <!--&lt;!&ndash;v-on:after-leave="afterLeave"&ndash;&gt;-->
                        <!--&lt;!&ndash;v-on:leave-cancelled="leaveCancelled">&ndash;&gt;-->

              <!--<p v-show="show2">js</p>-->
          <!--</transition>-->
      <!--</div>-->
      <div>
          <button @click="show3 = !show3">
              Toggle appear
          </button>
          <transition appear name="fade">
              <p v-show="show3">js</p>
          </transition>
      </div>

      <h2>列表过滤</h2>
      <div id="list-demo" class="demo">
          <button @click="add">Add</button>
          <button @click="remove">Remove</button>
          <transition-group name="list" tag="p">
            <span v-for="item in items" v-bind:key="item" class="list-item">
              {{ item }}
            </span>
          </transition-group>
      </div>

 </div>

</template>
<!--<style lang="css" scoped>-->
    <!--.fade-enter-active, .fade-leave-active {-->
        <!--transition: opacity 1s-->
    <!--}-->
    <!--.fade-enter, .fade-leave-active {-->
        <!--opacity: 0-->
    <!--}-->
    <!--/* show1 */-->
    <!--.slide-fade-enter-active {-->
        <!--transition: all .3s ease;-->
    <!--}-->
    <!--.slide-fade-leave-active {-->
        <!--/*transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);*/-->
        <!--transition: all .8s ease;-->
    <!--}-->
    <!--.slide-fade-enter, .slide-fade-leave-active {-->
        <!--transform: translateX(20px);-->
        <!--opacity: 0;-->
    <!--}-->
<!--/*列表过渡*/-->
    <!--.list-item {-->
        <!--display: inline-block;-->
        <!--margin-right: 10px;-->
    <!--}-->
    <!--.list-enter-active, .list-leave-active {-->
        <!--transition: all 1s;-->
    <!--}-->
    <!--.list-enter, .list-leave-active {-->
        <!--opacity: 0;-->
        <!--transform: translateY(30px);-->
    <!--}-->
<!--</style>-->
<script>
// import api from 'src/api/index'
// import networklib from 'src/libs/networklib';
// import merchantlib from 'src/libs/merchantlib';
import uiMixin from 'src/mixins/uiMixin';

//  import xxx
export default {
  name: 'merSetting',
  mixins: [uiMixin],
  components: {
  },
  mounted() {

  },
  data () {
    return {
      show: true,
      show1: true,
      show2: true,
      show3: true,
      show4: true,
      show5: true,
      items: [1, 2, 3, 4, 5, 6, 7, 8, 9],
      nextNum: 10,
    }
  },
  methods: {
    enter(el, done) {
      console.log('enter', el);
      done();
    },

    leave(el) {
      console.log('leave', el);
    },

    randomIndex: function () {
      return Math.floor(Math.random() * this.items.length)
    },

    add: function () {
      this.items.splice(this.randomIndex(), 0, this.nextNum++)
    },

    remove: function () {
      this.items.splice(this.randomIndex(), 1)
    },
  }

}
</script>

