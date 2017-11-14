<style lang="scss" src="src/sass/promotion.scss" scoped></style>
<template>
    <div class="content-promo">
			<bl-bar barStyle="bar-dark-linear">
				<div class="button" slot="left-button" @click="$router.go(-1)">
				  <div class="iconfont arrow-back"></div><i class="fback">返回</i>
				</div>
				<div slot="title">促销活动详情</div>
			</bl-bar>

      <div class="promotion">
      		<p class="promotion-tip">活动信息</p>
		      <bl-comli class="bot">
						<div slot='left-text' class="left-box">活动标题</div>
						<div slot='right-text' class="right-box">
								<div class="right-l promotion-title">年中大促满额减年中大促满额减年中大促满额减</div>
						</div>
		      </bl-comli>

	        <bl-comli>
	            <div slot='left-text' class="left-box">开始时间</div>
	            <div slot='right-text' class="right-box" >
	                <div class="right-r">{{ startDate }}</div>
	                <div class="iconfont arrow-back"></div>
	            </div>
	        </bl-comli>
	        <bl-comli>
	            <div slot='left-text' class="left-box">结束时间</div>
	            <div slot='right-text' class="right-box" @click="openPicker('end')">
	                <div class="right-r">{{ endDate }}</div>
	                <div class="iconfont arrow-back"></div>
	            </div>
	        </bl-comli>

	        <p class="promotion-tip">规则信息</p>
	        <bl-comli>
	            <div slot='left-text' class="left-box">促销模版</div>
	            <div slot='right-text' class="right-box">
	                <div class="right-r">满额减</div>
	                <div class="iconfont arrow-back"></div>
	            </div>
	        </bl-comli>
	        <bl-comli class="bot">
	            <div slot='left-text' class="left-box">促销方式</div>
	            <div slot='right-text' class="right-box">
	                <div class="right-r">叠加</div>
	                <div class="iconfont arrow-back"></div>
	            </div>
	        </bl-comli>
	        <bl-comli>
	            <div slot='left-text' class="left-box">阶梯1</div>
	            <div slot='right-text' class="right-box">
	                <div class="right-l">满199 减20元</div>
	                <div class="iconfont arrow-back"></div>
	            </div>
	        </bl-comli>
	        <bl-comli>
	            <div slot='left-text' class="left-box">阶梯2</div>
	            <div slot='right-text' class="right-box">
	                <div class="right-l">满199 减20元</div>
	                <div class="iconfont arrow-back"></div>
	            </div>
	        </bl-comli>
	        <bl-comli>
	            <div slot='left-text' class="left-box">阶梯3</div>
	            <div slot='right-text' class="right-box">
	                <div class="right-l">满199 减20元</div>
	                <div class="iconfont arrow-back"></div>
	            </div>
	        </bl-comli>

	        <p class="promotion-tip">生成阶梯</p>
	        <bl-comli>
	            <div slot='left-text' class="left-box">阶梯1</div>
	            <div slot='right-text' class="right-box">
	                <div class="right-l">满199 减20元</div>
	                <div class="iconfont arrow-back"></div>
	            </div>
	        </bl-comli>
	        <bl-comli>
	            <div slot='left-text' class="left-box">阶梯2</div>
	            <div slot='right-text' class="right-box">
	                <div class="right-l">满199 减20元</div>
	                <div class="iconfont arrow-back"></div>
	            </div>
	        </bl-comli>

	        <p class="promotion-tip">活动商品</p>
	        <bl-comli class="bot">
	            <div slot='left-text' class="left-tit">绑定活动商品</div>
	            <div slot='right-text' class="right-box">
	                <div class="right-r">100</div>
	                <div class="iconfont arrow-back"></div>
	            </div>
	        </bl-comli>

	        <bl-comli>
	            <div slot='left-text' class="left-box">阶梯1</div>
	            <div slot='right-text' class="right-box">
	                <div class="right-l">满2件 享9折</div>
	                <div class="iconfont arrow-back"></div>
	            </div>
	        </bl-comli>
	        <bl-comli>
	            <div slot='left-text' class="left-box">阶梯2</div>
	            <div slot='right-text' class="right-box">
	                <div class="right-l">满3件 享8.5折</div>
	                <div class="iconfont arrow-back"></div>
	            </div>
	        </bl-comli>
	        <bl-comli>
	            <div slot='left-text' class="left-box">阶梯3</div>
	            <div slot='right-text' class="right-box">
	                <div class="right-l">满4件 享6折</div>
	                <div class="iconfont arrow-back"></div>
	            </div>
	        </bl-comli>

	        <bl-comli class="top">
	            <div slot='left-text' class="left-tit">活动商品</div>
	            <div slot='right-text' class="right-box">
	                <div class="right-r">直减100元</div>
	                <div class="iconfont arrow-back"></div>
	            </div>
	        </bl-comli>
	        <bl-comli>
	            <div slot='left-text' class="left-tit">活动商品</div>
	            <div slot='right-text' class="right-box">
	                <div class="right-r">8折</div>
	                <div class="iconfont arrow-back"></div>
	            </div>
	        </bl-comli>
      </div>


      <button class="promotion-button">撤下</button>
      <button class="promotion-button">编辑</button>
      <button class="promotion-button">立即开始</button>
      <button class="promotion-button">重新创建</button>
      <div class="promotion-button notpass">
      		<em class="not">审核不通过</em>
      		<em class="pass">审核通过</em>
      </div>


	</div>

</template>

<script>
  export default {
    name: 'salesPromotion',
    components: {
    },
    data () {
      return {
        startDate: '2017-1-17 10:00',
        endDate: '2017-7-22 11:00',
      }
    },
    methods: {
    }
  }
</script>
