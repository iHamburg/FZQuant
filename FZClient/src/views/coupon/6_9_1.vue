<style lang="scss" src="src/sass/marketingTool.scss" scoped></style>
<template>
  <div class="content">
    <bl-bar barStyle="bar-dark-linear">
      <div class="button" slot="left-button" @click="$router.go(-1)">
        <div class="iconfont arrow-back"><i class="fback">返回</i></div>
      </div>
      <div slot="title">选择券类型</div>
    </bl-bar>
    <div class="marketing">
      <!-- 优惠券 -->
      <div class="module">
        <div class="marketing-title">请选择优惠券类型</div>
        <ul v-for="item in items">
          <li @click="onClick(item)">
            <div class="left-fonts">{{item.title}}</div>
            <div class="right-fonts arrow" >
              <div class="iconfont arrow-back"></div>
            </div>
          </li>
        </ul>
      </div>

    </div>
  </div>
</template>

<script>
export default {
  name: '',

  data () {
    return {
      items: [
        { title: '满减优惠券', name: '6.9.2', typeId: '4', flag: '4' },
        { title: '礼品券', name: '3.1' },
        // { title: '折扣优惠券', name: '6.9.2'，typeId: '5', flag: '4' },
      ],

    };
  },
  created() {

  },
  mounted() {

  },
  activated() {

  },
  methods: {
    onClick(item) {
      console.log('点击：', JSON.stringify(item))
      this.$router.push({name: item.name, params: {typeId: item.typeId, flag: item.flag}});
    },

  },
  watch: {

  },
  computed: {

  }

};
</script>
