<style lang="scss" src="src/sass/parkinglot.scss" scoped></style>
<template>
	<div class="content-parking write">
		<bl-bar barStyle="bar-dark-linear">
			<div class="button" slot="left-button" @click="$router.go(-1)">
			  <div class="iconfont arrow-back"></div>返回
			</div>
			<div slot="title">核销明细</div>
		</bl-bar>

<!--     <bl-scroll :enableRefresh="true" :onRefresh="onRefresh" :on-infinite="onInfinite" :enableInfinite="isLoading" v-scroll-record>
    </bl-scroll> -->

    <dl class="table">
      <dt>
          <em @click="isDate = !isDate">日期 <i class="pcreen" v-bind:class="{dcreen:isDate}"></i></em>
          <em @click="isRep = !isRep" class="line">已返还 <i class="pcreen" v-bind:class="{dcreen:isRep}"></i></em>
          <em @click="isOff = !isOff">已核销 <i class="pcreen" v-bind:class="{dcreen:isOff}"></i></em>
      </dt>
      <dd v-for="item in table">
          <div class="list">
            <span>{{ item.date }}</span>
            <span>{{ item.rep }}张</span>
            <span>{{ item.off }}张</span>
            <div class="iconfont arrow-back"></div>
          </div>
      </dd>
    </dl>


	</div>
</template>

<script>
  export default {
    name: 'offflow',
    data () {
      return {
        isDate: false,
        isRep: false,
        isOff: false,
        table: [
          {date: '2017-09-21', rep: 2000, off: 1000},
          {date: '2017-09-21', rep: 2000, off: 1000},
          {date: '2017-09-21', rep: 2000, off: 1000},
          {date: '2017-09-21', rep: 2000, off: 1000},
          {date: '2017-09-21', rep: 2000, off: 1000},
          {date: '2017-09-21', rep: 2000, off: 1000},
          {date: '2017-09-21', rep: 2000, off: 1000},
          {date: '2017-09-21', rep: 2000, off: 1000},
          {date: '2017-09-21', rep: 2000, off: 1000},
          {date: '2017-09-21', rep: 2000, off: 1000},
          {date: '2017-09-21', rep: 2000, off: 1000},
          {date: '2017-09-21', rep: 2000, off: 1000},
          {date: '2017-09-21', rep: 2000, off: 1000},
          {date: '2017-09-21', rep: 2000, off: 1000},
          {date: '2017-09-21', rep: 2000, off: 1000},
          {date: '2017-09-21', rep: 2000, off: 1000},
          {date: '2017-09-21', rep: 2000, off: 1000},
          {date: '2017-09-21', rep: 2000, off: 1000},
          {date: '2017-09-21', rep: 2000, off: 1000},
          {date: '2017-09-21', rep: 2000, off: 1000},
          {date: '2017-09-21', rep: 2000, off: 1000},
          {date: '2017-09-21', rep: 2000, off: 1000},
          {date: '2017-09-21', rep: 2000, off: 1000}
        ]
      }
    },
    mounted() {
    },
    methods: {
    }
  }
</script>
