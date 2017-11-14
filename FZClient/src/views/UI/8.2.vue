<style lang="scss" src="src/sass/contacts.scss" scoped></style>
<template>
  <div class="contacts">

    <bl-bar barStyle="bar-dark-linear">
        <div class="button" slot="left-button" @click="$router.go(-1)">
          <div class="iconfont arrow-back"><i class="fback">返回</i></div>
        </div>
        <div slot="title">分组好友</div>
        <div slot="right-button" class="hrad-right">确定</div>
    </bl-bar>

    <bl-comli class="uset" @click.native="setName = !setName">
      <div slot='left-text' class="left-box">设置备注名</div>
      <div slot='right-text' class="right-box">
          <div class="right-r"></div>
          <div class="iconfont arrow-back"></div>
      </div>
    </bl-comli>

    <div class="brandname top">
        <div class="brand-list" ref="brand">
            <dl v-for="(item, index) in brands" class="scroll">
              <dd :class="item.state" @click="checks(item, index)">{{ item.name }} <i></i></dd>
            </dl>
        </div>
    </div>

    <mt-popup v-model="setName" position="bottom" style="width: 100%;">  
        <bl-cust-picker  show-toolbar @cancel="cancel" @getValues="getValues" :toolbarSubText="toolbarSubText">
            <div slot="content" class="setname">
              <input type="text" name="name" placeholder="分组名上限20个字" ref="name">
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
      toolbarSubText: '添加新的分组',
      brands: [
        {"name": "我的客户", "state": ""},
        {"name": "高端客户大金主", "state": ""},
        {"name": "只买贵的不选对的", "state": ""},
        {"name": "超抠的", "state": ""},
        {"name": "打折才买的", "state": ""}
      ]
    }
  },
  computed: {
  },
  methods: {
    checks (item, index) {
      var state = this.brands[index].state;
      if (!state) {
        this.brands[index].state = 'check';
      } else {
        this.brands[index].state = '';
      }
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
