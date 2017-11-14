<style lang="scss" src="src/sass/promotion.scss" scoped></style>
<template>
    <div class="content-promo">
			<bl-bar barStyle="bar-dark-linear">
				<div class="button" slot="left-button" @click="$router.go(-1)">
				  <div class="iconfont arrow-back"></div><i class="fback">返回</i>
				</div>
				<div slot="title">促销活动列表</div>
			</bl-bar>
      <div class="promotion-list">
	        <div class="promotion-top">
		        <div class="header-menu">
		          <section>
		            <bl-navbar v-model="selected">
					        <bl-tab-item id="1">全部</bl-tab-item>
					        <bl-tab-item id="2">进行中</bl-tab-item>
					        <bl-tab-item id="3">待审核</bl-tab-item>
					        <bl-tab-item id="4">待开始</bl-tab-item>
					        <bl-tab-item id="5">审核不通过</bl-tab-item>
					        <bl-tab-item id="6">已失效</bl-tab-item>
		            </bl-navbar>
		          </section>
		        </div>
	        </div>

		      <bl-tab-container v-model="selected">
		        <bl-tab-container-item id="1">
			        	<div v-for="item in Promotion" :class="{bg: item.type == 5}">
			        		<dl>
			        				<dt>
			        					<i v-if="item.mold == 1">减</i>
			        					<i v-if="item.mold == 2">折</i>
			        					<i v-if="item.mold == 3" class="te">特</i><i v-if="item.mold == 3">指</i>
			        					<i v-if="item.mold == 4">直</i>
			        					<h2>{{ item.name }}</h2>
			        					<span v-if="item.type == 1" class="ing">进行中</span>
			        					<span v-if="item.type == 2" class="pending">待审核</span>
			        					<span v-if="item.type == 3" class="pending">待开始</span>
			        					<span v-if="item.type == 4" class="notpass">审核不通过</span>
			        					<span v-if="item.type == 5" class="expir">已失效</span>
			        				</dt>
			        				<dd>
			        						<div class="box">
				        						<span v-for="step in item.step">{{ step.name }}</span>
				        						<span v-for="list in item.list" class="none">{{ list.name }}</span>
			        						</div>
			        						<div class="iconfont arrow-back"></div>
			        				</dd>
			        				<dd>有效期：{{ item.startDate }} 至 {{ item.endDate }}</dd>
			        		</dl>
			        	</div>
		        </bl-tab-container-item>
		        <bl-tab-container-item id="2">
			        	<div v-for="item in Promotion" v-if="item.type == 1" :class="{bg: item.type == 5}">
			        		<dl>
			        				<dt>
			        					<i v-if="item.mold == 1">减</i>
			        					<i v-if="item.mold == 2">折</i>
			        					<i v-if="item.mold == 3" class="te">特</i><i v-if="item.mold == 3">指</i>
			        					<i v-if="item.mold == 4">直</i>
			        					<h2>{{ item.name }}</h2>
			        					<span v-if="item.type == 1" class="ing">进行中</span>
			        					<span v-if="item.type == 2" class="pending">待审核</span>
			        					<span v-if="item.type == 3" class="pending">待开始</span>
			        					<span v-if="item.type == 4" class="notpass">审核不通过</span>
			        					<span v-if="item.type == 5" class="expir">已失效</span>
			        				</dt>
			        				<dd>
			        						<div class="box">
				        						<span v-for="step in item.step">{{ step.name }}</span>
				        						<span v-for="list in item.list" class="none">{{ list.name }}</span>
			        						</div>
			        						<div class="iconfont arrow-back"></div>
			        				</dd>
			        				<dd>有效期：{{ item.startDate }} 至 {{ item.endDate }}</dd>
			        		</dl>
			        	</div>
		        </bl-tab-container-item>
		        <bl-tab-container-item id="3">
			        	<div v-for="item in Promotion" v-if="item.type == 2" :class="{bg: item.type == 5}">
			        		<dl>
			        				<dt>
			        					<i v-if="item.mold == 1">减</i>
			        					<i v-if="item.mold == 2">折</i>
			        					<i v-if="item.mold == 3" class="te">特</i><i v-if="item.mold == 3">指</i>
			        					<i v-if="item.mold == 4">直</i>
			        					<h2>{{ item.name }}</h2>
			        					<span v-if="item.type == 1" class="ing">进行中</span>
			        					<span v-if="item.type == 2" class="pending">待审核</span>
			        					<span v-if="item.type == 3" class="pending">待开始</span>
			        					<span v-if="item.type == 4" class="notpass">审核不通过</span>
			        					<span v-if="item.type == 5" class="expir">已失效</span>
			        				</dt>
			        				<dd>
			        						<div class="box">
				        						<span v-for="step in item.step">{{ step.name }}</span>
				        						<span v-for="list in item.list" class="none">{{ list.name }}</span>
			        						</div>
			        						<div class="iconfont arrow-back"></div>
			        				</dd>
			        				<dd>有效期：{{ item.startDate }} 至 {{ item.endDate }}</dd>
			        		</dl>
			        	</div>
		        </bl-tab-container-item>
		        <bl-tab-container-item id="4">
			        	<div v-for="item in Promotion" v-if="item.type == 3" :class="{bg: item.type == 5}">
			        		<dl>
			        				<dt>
			        					<i v-if="item.mold == 1">减</i>
			        					<i v-if="item.mold == 2">折</i>
			        					<i v-if="item.mold == 3" class="te">特</i><i v-if="item.mold == 3">指</i>
			        					<i v-if="item.mold == 4">直</i>
			        					<h2>{{ item.name }}</h2>
			        					<span v-if="item.type == 1" class="ing">进行中</span>
			        					<span v-if="item.type == 2" class="pending">待审核</span>
			        					<span v-if="item.type == 3" class="pending">待开始</span>
			        					<span v-if="item.type == 4" class="notpass">审核不通过</span>
			        					<span v-if="item.type == 5" class="expir">已失效</span>
			        				</dt>
			        				<dd>
			        						<div class="box">
				        						<span v-for="step in item.step">{{ step.name }}</span>
				        						<span v-for="list in item.list" class="none">{{ list.name }}</span>
			        						</div>
			        						<div class="iconfont arrow-back"></div>
			        				</dd>
			        				<dd>有效期：{{ item.startDate }} 至 {{ item.endDate }}</dd>
			        		</dl>
			        	</div>
		        </bl-tab-container-item>
		        <bl-tab-container-item id="5">
			        	<div v-for="item in Promotion" v-if="item.type == 4" :class="{bg: item.type == 5}">
			        		<dl>
			        				<dt>
			        					<i v-if="item.mold == 1">减</i>
			        					<i v-if="item.mold == 2">折</i>
			        					<i v-if="item.mold == 3" class="te">特</i><i v-if="item.mold == 3">指</i>
			        					<i v-if="item.mold == 4">直</i>
			        					<h2>{{ item.name }}</h2>
			        					<span v-if="item.type == 1" class="ing">进行中</span>
			        					<span v-if="item.type == 2" class="pending">待审核</span>
			        					<span v-if="item.type == 3" class="pending">待开始</span>
			        					<span v-if="item.type == 4" class="notpass">审核不通过</span>
			        					<span v-if="item.type == 5" class="expir">已失效</span>
			        				</dt>
			        				<dd>
			        						<div class="box">
				        						<span v-for="step in item.step">{{ step.name }}</span>
				        						<span v-for="list in item.list" class="none">{{ list.name }}</span>
			        						</div>
			        						<div class="iconfont arrow-back"></div>
			        				</dd>
			        				<dd>有效期：{{ item.startDate }} 至 {{ item.endDate }}</dd>
			        		</dl>
			        	</div>
		        </bl-tab-container-item>
		        <bl-tab-container-item id="6">
			        	<div v-for="item in Promotion" v-if="item.type == 5" :class="{bg: item.type == 5}">
			        		<dl>
			        				<dt>
			        					<i v-if="item.mold == 1">减</i>
			        					<i v-if="item.mold == 2">折</i>
			        					<i v-if="item.mold == 3" class="te">特</i><i v-if="item.mold == 3">指</i>
			        					<i v-if="item.mold == 4">直</i>
			        					<h2>{{ item.name }}</h2>
			        					<span v-if="item.type == 1" class="ing">进行中</span>
			        					<span v-if="item.type == 2" class="pending">待审核</span>
			        					<span v-if="item.type == 3" class="pending">待开始</span>
			        					<span v-if="item.type == 4" class="notpass">审核不通过</span>
			        					<span v-if="item.type == 5" class="expir">已失效</span>
			        				</dt>
			        				<dd>
			        						<div class="box">
				        						<span v-for="step in item.step">{{ step.name }}</span>
				        						<span v-for="list in item.list" class="none">{{ list.name }}</span>
			        						</div>
			        						<div class="iconfont arrow-back"></div>
			        				</dd>
			        				<dd>有效期：{{ item.startDate }} 至 {{ item.endDate }}</dd>
			        		</dl>
			        	</div>
		        </bl-tab-container-item>
		      </bl-tab-container>
      </div>

      <button class="promotion-button"><i></i><span>创建促销活动</span></button>

	</div>
</template>

<script>
/*
type: 1进行中 2待审核 3待开始 4审核不通过 5失效
mold: 1减 2折 3特指 4直
*/
  export default {
    name: 'promotionList',
    data () {
      return {
        selected: '1',
        Promotion: [
          {'type': 1, 'mold': 1, 'name': '年中满额减', 'step': [{'name': '199-30'}, {'name': '199-30'}], 'list': [{'name': '叠加，上限100次'}], 'startDate': '2017-11-01', 'endDate': '2017-12-31'},
          {'type': 2, 'mold': 1, 'name': '年中满额减', 'step': [{'name': '199-30'}, {'name': '199-30'}], 'list': [{'name': '叠加，上限100次'}], 'startDate': '2017-11-01', 'endDate': '2017-12-31'},
          {'type': 3, 'mold': 1, 'name': '年中满额减', 'step': [{'name': '199-30'}, {'name': '199-30'}], 'list': [{'name': '叠加，上限100次'}], 'startDate': '2017-11-01', 'endDate': '2017-12-31'},
          {'type': 4, 'mold': 2, 'name': '年中满额减', 'step': [{'name': '199-30'}, {'name': '199-30'}], 'list': [{'name': '叠加，上限100次'}], 'startDate': '2017-11-01', 'endDate': '2017-12-31'},
          {'type': 5, 'mold': 3, 'name': '年中满额减', 'step': [{'name': '199-30'}, {'name': '199-30'}], 'list': [{'name': '叠加，上限100次'}], 'startDate': '2017-11-01', 'endDate': '2017-12-31'},
          {'type': 1, 'mold': 4, 'name': '年中满额减', 'step': [{'name': '199-30'}, {'name': '199-30'}], 'list': [{'name': '叠加，上限100次'}], 'startDate': '2017-11-01', 'endDate': '2017-12-31'},
          {'type': 2, 'mold': 1, 'name': '年中满额减', 'step': [{'name': '199-30'}, {'name': '199-30'}], 'list': [{'name': '叠加，上限100次'}], 'startDate': '2017-11-01', 'endDate': '2017-12-31'}
        ]
      }
    }
  }
</script>
