<style lang="scss" src="src/sass/marketingTool.scss" scoped></style>
<template>
  <div class="content">
    <bl-bar barStyle="bar-dark-linear">
      <div class="button" slot="left-button" @click="$router.goHome()">
        <div class="iconfont arrow-back"><i class="fback">返回</i></div>
      </div>
      <div slot="title">{{title}}</div>
    </bl-bar>
    <div class="marketing">
      <!-- 促销活动 -->
      <div class="module" v-show="$accesslib.isPermitted('cloudom:promotion:activity')">
        <div class="marketing-title">促销活动</div>
        <ul v-for="item in items">
          <li @click="onClick(item)">
            <div class="left-fonts">{{item.title}}</div>
            <div class="right-fonts arrow" >
              <div class="iconfont arrow-back"></div>
            </div>
          </li>
        </ul>
      </div>
      <!-- 优惠券 -->
      <div class="module" v-show="$accesslib.isPermitted('cloudom:promotion:coupon')">
        <div class="marketing-title">优惠券</div>
        <ul v-for="item in items2">
          <li @click="onClick(item)">
            <div class="left-fonts">{{item.title}}</div>
            <div class="right-fonts arrow" >
              <div class="iconfont arrow-back"></div>
            </div>
          </li>
        </ul>
      </div>
      <!-- 停车券 -->
      <div class="module" v-show="$accesslib.isPermitted('cloudom:promotion:parking')">
        <div class="marketing-title">停车券</div>
        <ul v-for="item in items4">
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

  name: 'promotionsManagement',

  data () {
    return {
      title: '促销管理',
      items: [
        {title: '全部促销活动', name: '12.1'},
        { title: '创建促销活动', name: '12.2' },
        { title: '活动商品黑名单', name: '12.3' },
      ],
      // 优惠券
      items2: [
        {title: '创建优惠券', name: '6.9.1'},
        {title: '优惠券列表', name: '6.9.4'},
        {title: '分配券列表', name: '3.2'},
        {title: '券核销流水', name: '6.9.5', flag: '2'}
      ],
      // 停车券
      items4: [
        {title: '购买停车券', name: '6.10.1'},
        {title: '券订单', name: '6.10.3'},
        {title: '发券列表', name: '6.10.5'},
        {title: '券核销流水', name: '6.9.5', flag: '3'}
      ],
      isSuportSaleTikect: '', // 是否支持停车券 1 支持售券，0不支持
    };
  },

  created() {
    this.findSuportSaleTikect()
  },

  methods: {
    onClick(item) {
      console.log('click ', item.name, item.flag);
      this.$router.push({name: item.name, params: {flag: item.flag}});
    },

    findSuportSaleTikect() {
      let str = '';
      this.$merchantlib.isSuportSaleTikect((err, obj) => {
        console.log('isSuportSaleTikect obj:', JSON.stringify(obj), 'err:', err)
        if (err) { return this.$toast(err) }
        if (obj) {
          // 9/20 注释 暂时隐藏停车券
          this.isSuportSaleTikect = obj.isSuportSaleTikect
        }
      })
    }
  },
  watch: {

  },
  computed: {

  }

};
</script>

