<!--创建促销活动-->
<style lang="scss" src="src/sass/promotion.scss" scoped></style>
<template>
    <div class="content-promo">
			<bl-bar barStyle="bar-dark-linear">
				<div class="button" slot="left-button" @click="$router.go(-1)">
				  <div class="iconfont arrow-back"></div><i class="fback">返回</i>
				</div>
				<div slot="title">创建促销活动</div>
			</bl-bar>

      <div class="promotion">
      		<p class="promotion-tip">活动信息</p>
		      <bl-comli class="bot">
						<div slot='left-text' class="left-box">活动标题</div>
						<div slot='right-text' class="right-box">
								<div class="right-r"><input type="text" placeholder="请输入活动标题"></div>
						</div>
		      </bl-comli>

	        <bl-comli>
	            <div slot='left-text' class="left-box">开始时间</div>
	            <div slot='right-text' class="right-box" @click="openPicker('start')">
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

	        <!-- 满额减 -->
	        <div>
			        <p class="promotion-tip">促销规则设置</p>
			        <bl-comli>
			            <div slot='left-text' class="left-box">促销模版</div>
			            <div slot='right-text' class="right-box">
			                <div class="right-r">满额减</div>
			                <div class="iconfont arrow-back"></div>
			            </div>
			        </bl-comli>
			        <bl-comli>
			            <div slot='left-text' class="left-box">促销方式</div>
			            <div slot='right-text' class="right-box" @click="pmode('sale')">
			                <div class="right-r">{{ modeSale }}</div>
			                <div class="iconfont arrow-back"></div>
			            </div>
			        </bl-comli>
			        <bl-comli>
			            <div slot='left-text' class="left-box">累计方式</div>
			            <div slot='right-text' class="right-box" @click="pmode('mj')">
			                <div class="right-r">{{ modeMJ }}</div>
			                <div class="iconfont arrow-back"></div>
			            </div>
			        </bl-comli>

			        <section v-if="modeMJ == '阶梯'">
				        	<div v-for="(item, index) in MJ">
				        		<p class="promotion-tip">阶梯{{ index + 1 }}  <em @click="ladderDel(MJ, index)"></em></p>
						        <div class="mj">
						        		<span class="line"><em>满</em> <input type="tel" name="m" placeholder="输入金额" v-model="item.m"></span>
						        		<span><em>减</em> <input type="tel" name="j" placeholder="输入金额"  v-model="item.j"></span>
						        </div>
						      </div>
					      	<div class="btn" v-if="ifMJ"><button @click="ladder('mj')">增加阶梯（{{ MJ.length + 1 }}/10）</button></div>
			        </section>

			        <section v-if="modeMJ == '叠加'">
					        <p class="promotion-tip">初始门槛金额</p>
					        <div class="mj">
					        		<span class="line"><em>每满</em> <input type="tel" name="" placeholder="输入金额"></span>
					        		<span><em>减</em> <input type="tel" name="" placeholder="输入金额"></span>
					        </div>
					        <bl-comli>
					            <div slot='left-text' class="left-tit">可叠加次数</div>
					            <div slot='right-text' class="right-box">
					                <div class="count">
					                    <em class="reduce" @click="reduce('mj')">-</em>
					                    <input type="tel" v-model="MJaddup">
					                    <em class="add" @click="add('mj')">+</em>
					                </div>
					            </div>
					        </bl-comli>
			        </section>
	        </div>


	        <p class="promotion-tip">活动商品</p>
	        <bl-comli>
	            <div slot='left-text' class="left-tit">绑定活动商品</div>
	            <div slot='right-text' class="right-box" @click="pmode('bound')">
	                <div class="right-r">{{ modeBound }}</div>
	                <div class="iconfont arrow-back"></div>
	            </div>
	        </bl-comli>

	        <!-- 满件折 -->
	        <div>
			        <p class="promotion-tip">促销规则设置 </p>
			        <bl-comli>
			            <div slot='left-text' class="left-box">促销模版</div>
			            <div slot='right-text' class="right-box">
			                <div class="right-r">满件折</div>
			                <div class="iconfont arrow-back"></div>
			            </div>
			        </bl-comli>
			        <section  class="bot">
			        		<div v-for="(item, index) in MJZ">
					        		<p class="promotion-tip">阶梯{{ index + 1 }}  <em @click="ladderDel(MJZ, index)"></em></p>
							        <bl-comli>
							            <div slot='left-text' class="left-box">满</div>
							            <div slot='right-text' class="right-box">
							                <div class="count">
							                    <em class="reduce" @click="reduce('mjz', index)">-</em>
							                    <input type="tel" v-model="item.v">
							                    <em class="add" @click="add('mjz', index)">+</em>
							                </div>
							            </div>
							        </bl-comli>
								      <bl-comli>
												<div slot='left-text' class="left-box">享</div>
												<div slot='right-text' class="right-box">
														<div class="right-r"><input type="text" placeholder="请输入折扣"></div>
												</div>
								      </bl-comli>
						      </div>
					        <div class="btn" v-if="ifMJZ"><button @click="ladder('mjz')">增加阶梯（{{ MJZ.length + 1 }}/10）</button></div>
			        </section>
	        </div>


	        <!-- 指定折 -->
	        <div>
			        <p class="promotion-tip">促销规则设置 </p>
			        <bl-comli>
			            <div slot='left-text' class="left-box">促销模版</div>
			            <div slot='right-text' class="right-box">
			                <div class="right-r">指定折</div>
			                <div class="iconfont arrow-back"></div>
			            </div>
			        </bl-comli>
			        <section>
			        		<div v-for="(item, index) in ZDZ">
					        		<p class="promotion-tip">阶梯{{ index + 1 }}  <em @click="ladderDel(ZDZ, index)"></em></p>
							        <bl-comli>
							            <div slot='left-text' class="left-box">满</div>
							            <div slot='right-text' class="right-box">
							                <div class="count">
							                    <em class="reduce" @click="reduce('zdz', index)">-</em>
							                    <input type="tel" v-model="item.v">
							                    <em class="add" @click="add('zdz', index)">+</em>
							                </div>
							            </div>
							        </bl-comli>
								      <bl-comli>
												<div slot='left-text' class="left-box">享</div>
												<div slot='right-text' class="right-box">
														<div class="right-r"><input type="text" placeholder="请输入折扣"></div>
												</div>
								      </bl-comli>
						      </div>
					        <div class="btn" v-if="ifZDZ"><button @click="ladder('zdz')">增加阶梯（{{ ZDZ.length + 1 }}/10）</button></div>
			        </section>
	        </div>


	        <!-- 限时直降 -->
	        <div>
			        <p class="promotion-tip">促销规则设置</p>
			        <bl-comli>
			            <div slot='left-text' class="left-box">促销模版</div>
			            <div slot='right-text' class="right-box">
			                <div class="right-r">限时直降</div>
			                <div class="iconfont arrow-back"></div>
			            </div>
			        </bl-comli>
			        <bl-comli>
			            <div slot='left-text' class="left-box">折扣方式</div>
			            <div slot='right-text' class="right-box" @click="pmode('discount')">
			                <div class="right-r">{{ modeDiscount }}</div>
			                <div class="iconfont arrow-back"></div>
			            </div>
			        </bl-comli>

				      <bl-comli class="bot" v-if="modeDiscount == '指定折扣'">
								<div slot='left-text' class="left-box">输入折扣</div>
								<div slot='right-text' class="right-box">
										<div class="right-r"><input type="text" placeholder="请输入折扣"></div>
								</div>
				      </bl-comli>
				      <bl-comli class="bot" v-if="modeDiscount == '直减金额'">
								<div slot='left-text' class="left-box">输入折扣</div>
								<div slot='right-text' class="right-box">
										<div class="right-r"><input type="text" placeholder="请输入直减金额"></div>
								</div>
				      </bl-comli>
	        </div>

      </div>

      <button class="promotion-button" >保存并提交审核</button>


      <mt-popup v-model="sheetVisible" position="bottom" style="width: 100%;">
      		<bl-actionsheet :actions="actions" v-model="sheetVisible" @thisValue="returnVal"></bl-actionsheet>
      </mt-popup>

	    <bl-mtdate-picker ref="picker" type="date-time" :toolbarSubText="toolbarSubText"
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
        modeSale: '普通促销',
        modeMJ: '叠加',
        modeBound: '请绑定',
        actions: [{
          name: '',
          key: '0'
        }, {
          name: '',
          key: '1'
        }],
        // 满减
        ifMJ: true,
        MJ: [
          {m: '', j: ''}
        ],
        MJaddup: 1,
        // 满件折
        ifMJZ: true,
        MJZ: [
          {m: '', j: '', v: 1}
        ],
        // 指定折
        ifZDZ: true,
        ZDZ: [
          {m: '', j: '', v: 1}
        ],
        // 限时直降
        modeDiscount: '指定折扣'
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
      pmode(type) {
        if (type == 'mj') {
          this.actions = [{
            name: '叠加',
            key: '0'
          }, {
            name: '阶梯',
            key: '1'
          }]
          this.sheetVisible = true
        }

        if (type == 'sale') {
          this.actions = [{
            name: '普通促销',
            key: '2'
          }, {
            name: '特殊促销',
            key: '3'
          }]
          this.sheetVisible = true
        }

        if (type == 'discount') {
          this.actions = [{
            name: '指定折扣',
            key: '4'
          }, {
            name: '直减金额',
            key: '5'
          }]
          this.sheetVisible = true
        }
        if (type == 'bound') {
          this.actions = [{
            name: '按品类选择',
            key: '6'
          }, {
            name: '指定部分商品',
            key: '7'
          }, {
            name: '全场商品',
            key: '8'
          }]
          this.sheetVisible = true
        }
      },
      ladder(type) {
        if (type == 'mj') {
          let tplMJ = {m: '', j: ''}
          this.MJ.push(tplMJ)
          if (this.MJ.length > 9) {
            this.ifMJ = false
          }
        }
        if (type == 'mjz') {
          let tplMJZ = {m: '', j: '', v: 1}
          this.MJZ.push(tplMJZ)
          if (this.MJZ.length > 9) {
            this.ifMJZ = false
          }
        }
        if (type == 'zdz') {
          let tplZDZ = {m: '', j: '', v: 1}
          this.ZDZ.push(tplZDZ)
          if (this.ZDZ.length > 9) {
            this.ifZDZ = false
          }
        }
      },
      ladderDel(item, index) {
        let array = item
        array.splice(index, 1)
      },
      returnVal(val) {
        switch (parseInt(val)) {
          case 0:
            this.modeMJ = '叠加'
            break
          case 1:
            this.modeMJ = '阶梯'
            break
          case 2:
            this.modeSale = '普通促销'
            break
          case 3:
            this.modeSale = '特殊促销'
            break
          case 4:
            this.modeDiscount = '指定折扣'
            break
          case 5:
            this.modeDiscount = '直减金额'
            break
          case 6:
            this.modeBound = '按品类选择'
            break
          case 7:
            this.modeBound = '指定部分商品'
            break
          case 8:
            this.modeBound = '全场商品'
            break
        }
      },
      add(type, index) {
        if (type == 'mj') {
          this.MJaddup ++
        }
        if (type == 'mjz') {
          this.MJZ[index].v ++
        }
        if (type == 'zdz') {
          this.ZDZ[index].v ++
        }
      },
      reduce(type, index) {
        if (type == 'mj') {
          (this.MJaddup > 1) ? (this.MJaddup--) : (this.MJaddup)
        }
        if (type == 'mjz') {
          (this.MJZ[index].v > 1) ? (this.MJZ[index].v--) : (this.MJZ[index].v)
        }
        if (type == 'zdz') {
          (this.ZDZ[index].v > 1) ? (this.ZDZ[index].v--) : (this.ZDZ[index].v)
        }
      }
    }
  }
</script>
