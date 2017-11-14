<style lang="scss" src="src/sass/promotion.scss" scoped></style>
<template>
    <div class="content-promo">
			<bl-bar barStyle="bar-dark-linear">
				<div class="button" slot="left-button" @click="$router.go(-1)">
				  <div class="iconfont arrow-back"></div>返回
				</div>
				<div slot="title">创建优惠券</div>
			</bl-bar>

      <div class="promotion" style="margin-bottom:1rem">
      		<p class="promotion-tip">填写优惠券信息</p>
		      <bl-comli class="bot">
						<div slot='left-text' class="left-box">优惠券名称</div>
						<div slot='right-text' class="right-box">
								<div class="right-r"><input type="text" placeholder="请输入优惠券名称"></div>
						</div>
		      </bl-comli>

	        <bl-comli>
	            <div slot='left-text' class="left-box">开始时间</div>
	            <div slot='right-text' class="right-box" @click="openPicker('start')">
	                <div class="right-l" style="color:#b2b2b2;">{{ startDate }}</div>
	                <div class="iconfont arrow-back"></div>
	            </div>
	        </bl-comli>
	        <bl-comli class="bot">
	            <div slot='left-text' class="left-box">结束时间</div>
	            <div slot='right-text' class="right-box" @click="openPicker('end')">
	                <div class="right-l" style="color:#b2b2b2;">{{ endDate }}</div>
	                <div class="iconfont arrow-back"></div>
	            </div>
	        </bl-comli>

          <section class="bot">
              <div class="mj">
                  <span class="line"><em>满</em> <input type="tel" name="" placeholder="输入条件(元)"></span>
                  <span><em>减</em> <input type="tel" name="" placeholder="输入优惠(元)"></span>
              </div>
          </section>

          <bl-comli>
            <div slot='left-text' class="left-box">可发总量</div>
            <div slot='right-text' class="right-box">
                <div class="right-r"><input type="text" placeholder="请输入此券总共可发的数量"></div>
            </div>
          </bl-comli>
          <bl-comli>
            <div slot='left-text' class="left-box">每人可领</div>
            <div slot='right-text' class="right-box">
                <div class="right-r"><input type="text" placeholder="请输入每人可领数量"></div>
            </div>
          </bl-comli>
          <bl-comli>
            <div slot='left-text' class="left-box">每天可领</div>
            <div slot='right-text' class="right-box">
                <div class="right-r"><input type="text" placeholder="请输入每天可领数量"></div>
            </div>
          </bl-comli>
          <bl-comli>
              <div slot='left-text' class="left-box">领取方式</div>
              <div slot='right-text' class="right-box" @click="sheetVisible = !sheetVisible">
                  <div class="right-l" style="color:#b2b2b2;">{{ Payment }}</div>
                  <div class="iconfont arrow-back"></div>
              </div>
          </bl-comli>
          <bl-comli>
              <div slot='left-text' class="left-box">适用商品</div>
              <div slot='right-text' class="right-box">
                  <div class="right-l" style="color:#b2b2b2;">绑定活动商品</div>
                  <div class="iconfont arrow-back"></div>
              </div>
          </bl-comli>
          <bl-comli>
              <div slot='left-text' class="left-box">促销叠加</div>
              <div slot='right-text' class="right-box">
                  <div class="right-l" style="color:#b2b2b2;">选择是否与促销活动叠加</div>
                  <div class="iconfont arrow-back"></div>
              </div>
          </bl-comli>


      </div>

      <div class="promotion-button" style="position:fixed;">
          <em class="not">审核不通过</em>
          <em>审核通过</em>
      </div>
      <button class="promotion-button" style="position:fixed;">提交审核</button>
      <button class="promotion-button btngray" style="position:fixed;" disabled="true">已失效</button>

      <mt-popup v-model="sheetVisible" position="bottom" style="width: 100%;">
      		<bl-actionsheet :actions="actions" v-model="sheetVisible" @thisValue="returnVal"></bl-actionsheet>
      </mt-popup>

	    <bl-mtdate-picker ref="picker" type="datetime" :toolbarSubText="toolbarSubText"
	    year-format="{value}年"
	    month-format="{value}月"
	    date-format="{value}日" @confirm="returnDate" v-model="pickerValue">
	    </bl-mtdate-picker>
	</div>

</template>

<script>
  export default {
    name: 'creactPromotion',
    components: {
      'BlMtdatePicker': () => System.import('components/cloud-merchant/mtdate-picker')
    },
    data () {
      return {
        toolbarSubText: '',
        startDate: '选择开始时间',
        endDate: '选择结束时间',
        pickerValue: false,
        sheetVisible: false,
        Payment: '请选择用户领券方式',
        actions: [{
          name: '直接领取',
          key: '0'
        }, {
          name: '发放领取',
          key: '1'
        }]
      }
    },
    methods: {
      openPicker(time) {
        (time === 'start') ? (this.toolbarSubText = '选择开始时间') : (this.toolbarSubText = '选择结束时间');
        if (time === 'start') {
          this.$refs.picker.open();
        } else {
          this.$refs.picker.open();
        }
        let body = document.querySelectorAll('.picker-slot')
        body[0].style.flex = '1 1 6%'
      },
      returnDate(param) {
        if (this.toolbarSubText === '选择开始时间') {
          (param instanceof Date) ? (this.startDate = param.getFullYear() + '-' + (param.getMonth() + 1) + '-' + param.getDate() + ' ' + param.getHours() + ':' + param.getMinutes() + ':' + param.getSeconds() + '0') : (this.startDate = '选择开始时间')
        }
        if (this.toolbarSubText === '选择结束时间') {
          (param instanceof Date) ? (this.endDate = param.getFullYear() + '-' + (param.getMonth() + 1) + '-' + param.getDate() + ' ' + param.getHours() + ':' + param.getMinutes() + ':' + param.getSeconds() + '0') : (this.endDate = '选择结束时间')
        }
      },
      returnVal(val) {
        if (val == 0) this.Payment = '直接领取'
        if (val == 1) this.Payment = '发放领取'
        console.log(val)
      }
    }
  }
</script>
