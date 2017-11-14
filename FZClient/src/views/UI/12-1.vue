<style lang="scss" src="src/sass/promotion.scss" scoped></style>
<template>
    <div class="content">
			<bl-bar barStyle="bar-dark-linear">
				<div class="button" slot="left-button" @click="$router.go(-1)">
				  <div class="iconfont arrow-back"></div><i class="fback">返回</i>
				</div>
				<div slot="title">创建促销活动</div>
			</bl-bar>

			<p class="promotion-tip">请选择需要创建的促销活动模版</p>
      <bl-comli v-for="item in tpl">
          <div slot='left-text' class="left-box">{{ item.name }}</div>
          <div slot='right-text' class="right-box">
              <div class="iconfont arrow-back"></div>
          </div>
      </bl-comli>

	</div>
</template>

<script>
  export default {
    name: 'promotion',
    data () {
      return {
        tpl: [
          {name: '满额减'},
          {name: '满件折'},
          {name: '指定折'},
          {name: '限时直降'}
        ]
      }
    }
  }
</script>
