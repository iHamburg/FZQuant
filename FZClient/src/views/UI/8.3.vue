<style lang="scss" src="src/sass/contacts.scss" scoped></style>
<template>
  <div class="contacts">

    <bl-bar barStyle="bar-dark-linear">
        <div class="button" slot="left-button" @click="$router.go(-1)">
          <div class="iconfont arrow-back"><i class="fback">返回</i></div>
        </div>
        <div slot="title">分组排序</div>
        <div slot="right-button" class="hrad-right">确定</div>
    </bl-bar>

    <p class="sort">拖动排序</p>

    <draggable :list="friends" :element="'div'">
      <bl-comli class="uset" v-for="(item, index) in friends">
        <div slot='left-text' class="left-box">{{ item.name }}</div>
        <div slot='right-text' class="right-box">
            <div class="right-r"><i class="right-u">{{ item.number }}</i></div>
            <em class="drop"></em>
        </div>
      </bl-comli>
    </draggable>

  </div> 
</template>

<script>
import draggable from 'vuedraggable'
export default {
  name: 'contacts',
  components: {
    'BlCustPicker': () => System.import('components/cloud-merchant/cust-picker'),
    draggable
  },
  mounted() {

  },

  data () {
    return {
      friends: [
        {"name": "我的客户", "number": 100},
        {"name": "高端客户大金主", "number": 90},
        {"name": "只买贵的不选对的", "number": 12},
        {"name": "超抠的", "number": 110},
        {"name": "打折才买的", "number": 100}
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
