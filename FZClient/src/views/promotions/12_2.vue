<style lang="scss" src="src/sass/marketingTool.scss" scoped></style>
<template>
  <div class="content">
    <bl-bar barStyle="bar-dark-linear">
      <div class="button" slot="left-button" @click="$router.go(-1)">
        <div class="iconfont arrow-back"></div>
      </div>
      <div slot="title">{{title}}</div>
    </bl-bar>
    <div class="marketing">
      <!-- 内容发布 -->
      <div class="module">
        <div class="marketing-title">请选择需要创建的促销活动模版</div>
        <ul v-for="item in items">
          <li @click="onClick(item.name, item.type, item.flag)">
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
      title: '营销工具',
      items: [
        { title: '满额减', name: '12.2.1', type: '0', flag: '3' },
        { title: '满件折', name: '12.2.1', type: '1', flag: '3' },
        { title: '指定折', name: '12.2.1', type: '3', flag: '3' },
        { title: '限时直降', name: '12.2.1', type: '2', flag: '3' },
      ],
      check: 'check',
    };
  },
  created() {

  },

  methods: {
    onClick(name, type, flag) {
      console.log('click ' + name + ',type: ' + type + ',flag: ' + flag);
      this.$router.push({name, params: {type: type}, query: {flag: flag}});
    }
  },
  watch: {

  },
  computed: {

  }

};
</script>

