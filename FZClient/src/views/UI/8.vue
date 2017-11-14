<style lang="scss" src="src/sass/contacts.scss" scoped></style>
<template>
  <div class="contacts">

    <bl-bar barStyle="bar-dark-linear">
        <div class="button" slot="left-button" @click="$router.go(-1)">
          <div class="iconfont arrow-back"><i class="fback">返回</i></div>
        </div>
        <div slot="title">我的联系人</div>
        <i slot="right-button" class="icon iconfont more-v"></i>
    </bl-bar>

    <ul class="rule">
      <li v-for="(item, index) in data" @click="open(item, index, $event)">
         <span>{{ item.name }}</span>
         <em>{{ item.child.length }}</em>
         <i class="iconfont arrow-back" :class="{'open':item.open}"></i>
         <ul class="rule-box" v-if="item.open" @click="stop($event)">
           <li v-for="u in item.child"><i class="head"><img :src="u.head"></i> {{ u.title }}</li>
         </ul>
      </li>
    </ul>

  </div>

</template>

<script>
export default {
  name: 'contacts',
  components: {
  },
  mounted() {

  },

  data () {
    return {
      data: [
        {name: '我的客户', open: false, child: [{title: '潜力客户A', head: 'static/images/yy.png'}, {title: 2, head: 'static/images/yy.png'}, {title: 3, head: 'static/images/yd-index.png'}]
        },
        {name: '潜力客户', open: false, child: [{title: 888}, {title: 2}, {title: 3}, {title: 2}, {title: 3}]},
        {name: '我的客户', open: false, child: [{title: 888}, {title: 2}, {title: 3}]},
        {name: '我的客户', open: false, child: [{title: 888}, {title: 2}, {title: 3}]},
        {name: '我的客户', open: false, child: [{title: 888}, {title: 2}, {title: 3}]},
        {name: '我的客户', open: false, child: [{title: 888}, {title: 2}, {title: 3}]},
        {name: '我的客户', open: false, child: [{title: 888}, {title: 2}, {title: 3}]},
        {name: '我的客户', open: false, child: [{title: 888}, {title: 2}, {title: 3}]},
        {name: '我的客户', open: false, child: [{title: 888}, {title: 2}, {title: 3}]},
        {name: '普通客户', open: false, child: [{title: 888}, {title: 2}, {title: 3}]}
      ]
    }
  },
  computed: {
  },
  methods: {
    open(item, index, e) {
      // for (let i = 0; i < this.data.length; i += 1) {
      //   this.data[i].open = false
      // }
      let state = this.data[index].open
      if (this.data[index].open == true) {
        this.data[index].open = false
      } else {
        this.data[index].open = true
      }
      e.stopPropagation()
    },
    stop(e) {
      e.stopPropagation()
    }
  }
}
</script>
