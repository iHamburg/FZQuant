<style lang="scss" src="src/sass/parkinglot.scss" scoped></style>
<template>
	<div class="content-parking write">
		<bl-bar barStyle="bar-dark-linear">
			<div class="button" slot="left-button" @click="$router.go(-1)">
			  <div class="iconfont arrow-back"></div>返回
			</div>
			<div slot="title">核销流水 </div>
		</bl-bar>

    <dl class="nobody">
      <!-- porders -->
      <dt class="pticket"></dt>
      <dd>抱歉，暂无核销流水</dd>
    </dl>

	</div>
</template>

<script>
  export default {
    name: 'offflow',
    data () {
      return {
      }
    },
    mounted() {
    },
    methods: {
    }
  }
</script>
