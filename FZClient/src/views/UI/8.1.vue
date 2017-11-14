<style lang="scss" src="src/sass/contacts.scss" scoped></style>
<template>
  <div class="contacts">

    <bl-bar barStyle="bar-dark-linear">
        <div class="button" slot="left-button" @click="$router.go(-1)">
          <div class="iconfont arrow-back"><i class="fback">返回</i></div>
        </div>
        <div slot="title">详细资料</div>
        <i slot="right-button" class="icon iconfont more-v"></i>
    </bl-bar>

    <div class="people">
        <em></em>
        <h1>用户昵称</h1>
        <p>百联卡等级：银卡</p>
    </div>

    <bl-comli class="uset" @click.native="setName = !setName">
      <div slot='left-text' class="left-box">设置备注名</div>
      <div slot='right-text' class="right-box">
          <div class="right-r"></div>
          <div class="iconfont arrow-back"></div>
      </div>
    </bl-comli>
    <bl-comli class="uset">
      <div slot='left-text' class="left-box">客户分组</div>
      <div slot='right-text' class="right-box">
          <div class="right-r">请设置</div>
          <div class="iconfont arrow-back"></div>
      </div>
    </bl-comli>


    <bl-button class="message">发消息</bl-button>


    <mt-popup v-model="setName" position="bottom" style="width: 100%;">  
        <bl-cust-picker  show-toolbar @cancel="cancel" @getValues="getValues" :toolbarSubText="toolbarSubText">
            <div slot="content" class="setname">
              <input type="text" name="name" placeholder="备注名上限12个字" ref="name">
            </div>
        </bl-cust-picker>
    </mt-popup>

  </div>
</template>

<script>
export default {
  name: 'contacts',
  components: {
    'BlCustPicker': () => System.import('components/cloud-merchant/cust-picker')
  },
  mounted() {

  },

  data () {
    return {
      setName: false,
      toolbarSubText: '设置备注名',
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
      for (let i = 0; i < this.data.length; i += 1) {
        this.data[i].open = false
      }
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
    },
    cancel() {
      this.setName = false;
    },
    getValues() {
      this.setName = false;
      console.log(this.$refs.name.value)
    }
  }
}
</script>
