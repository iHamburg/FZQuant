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
          <dl class="toptip">
          <!-- 活动状态(0:待审核 1:进行中 2:已过期 3:审核不通过 4:待进行) -->
            <dd style="text-align:center;color:#F76260;font-size:118%" v-if="detailData.activityStatus == 3">{{state}}</dd>
            <dd style="text-align:center;color:#00A699;font-size:118%" v-if="detailData.activityStatus == 1">{{state}}</dd>
            <dd style="text-align:center;color:#F68C6D;font-size:118%" v-if="detailData.activityStatus == 0">{{state}}</dd>
            <dd style="text-align:center;color:#999;font-size:118%" v-if="detailData.activityStatus == 2">{{state}}</dd>
            <dd style="text-align:center;color:#F68C6D;font-size:118%" v-if="detailData.activityStatus == 4">{{state}}</dd>
          </dl>
          <p class="promotion-tip">活动信息</p>
          <bl-comli class="bot">
            <div slot='left-text' class="left-box">活动标题</div>
            <div slot='right-text' class="right-box">
                <div class="right-l promotion-title">{{ detailData.title }}</div>
            </div>
          </bl-comli>

          <bl-comli>
              <div slot='left-text' class="left-box">开始时间</div>
              <div slot='right-text' class="right-box" >
                  <div class="right-r">{{ detailData.beginAt }}</div>
              </div>
          </bl-comli>
          <bl-comli>
              <div slot='left-text' class="left-box">结束时间</div>
              <div slot='right-text' class="right-box">
                  <div class="right-r">{{ detailData.endAt }}</div>
              </div>
          </bl-comli>

          <p class="promotion-tip">规则信息</p>
          <bl-comli>
              <div slot='left-text' class="left-box">促销模版</div>
              <div slot='right-text' class="right-box">
                <div class="right-r">{{ detailData.typeString }}</div>
              </div>
          </bl-comli>
          <bl-comli class="bot">
              <div slot='left-text' class="left-box">促销方式</div>
              <div slot='right-text' class="right-box">
                <div class="right-r">{{ getPromotionMode }}</div>
              </div>
          </bl-comli>
          <bl-comli v-if="detailData.typeId == 0 && detailData.ruleMode == 1">
              <div slot='left-text' class="left-box">初始门槛</div>
              <div slot='right-text' class="right-box">
                <div class="right-l">{{ detailData.rules[0].full }}元</div>
              </div>
          </bl-comli>
          <bl-comli v-if="detailData.typeId == 0 && detailData.ruleMode == 1">
              <div slot='left-text' class="left-box">叠加次数</div>
              <div slot='right-text' class="right-box">
                <div class="right-l">{{ detailData.rules.length }}次</div>
              </div>
          </bl-comli>
          <p class="promotion-tip" v-if="detailData.typeId == 0 && detailData.ruleMode == 1">生成阶梯</p>

            <!-- typeId 0:满额减 1：满件折 2：直降 3：指定折 -->
            <!-- ruleMode 规则模式（1叠加 2阶梯 3折扣 4减金额 (3和4只用于直降)） -->
          <bl-comli v-if="detailData.typeId == 0 && (detailData.ruleMode == 1 || detailData.ruleMode == 2)" v-for="(data,index) in detailData.rules">
              <div slot='left-text' class="left-box">阶梯{{ index+1 }}</div>
              <div slot='right-text' class="right-box">
                <div class="right-l">满{{ data.full }}元 减{{ data.off }}元</div>
              </div>
          </bl-comli>

          <bl-comli v-if="detailData.typeId == 1 && detailData.ruleMode == 2" v-for="(data,index) in detailData.rules">
              <div slot='left-text' class="left-box">阶梯{{ index+1 }}</div>
              <div slot='right-text' class="right-box">
                <div class="right-l">满{{ data.full }}件 享{{ data.off }}折</div>
              </div>
          </bl-comli>

          <bl-comli v-if="detailData.typeId == 3 && detailData.ruleMode == 2" v-for="(data,index) in detailData.rules">
              <div slot='left-text' class="left-box">阶梯{{ index+1 }}</div>
              <div slot='right-text' class="right-box">
                <div class="right-l">第{{ data.full }}件 享{{ data.off }}折</div>
              </div>
          </bl-comli>

          <bl-comli class="top" v-if="detailData.typeId == 2">
            <div slot='left-text' class="left-tit">{{ getTexts }}</div>
            <div slot='right-text' class="right-box">
              <div class="right-r">{{ detailData.plummetString }} {{ getText }}</div>
            </div>
          </bl-comli>

          <p class="promotion-tip">活动商品</p>
          <bl-comli class="bot" style="margin-bottom: 1.6rem;">
              <div slot='left-text' class="left-tit">绑定活动商品</div>
              <div slot='right-text' class="right-box" @click="tobingGoods()">
                <div class="right-r">{{ detailData.goodsCount }}件</div>
                <div class="iconfont arrow-back"></div>
              </div>
          </bl-comli>
          <div style="height:1px;"></div>
      </div>

      <!--  status 活动状态(0:待审核 1:审核通过 2:已过期 3:审核不通过) -->
      <!-- activityStatus 活动状态(0:待审核 1:进行中 2:已过期 3:审核不通过 4:待进行) -->
      <!-- <div class="promotion-button notpass" v-if="detailData.activityStatus == 0">
        <em class="not" @click="onSubmit('3')">审核不通过</em>
        <em class="pass" @click="onSubmit('1')">审核通过</em>
      </div>
      <button class="promotion-button" v-if="detailData.activityStatus != 2" @click="onSubmit('2')">撤下</button>
      <button class="promotion-button" v-if="detailData.activityStatus == 2" @click="toEdit('2')">重新创建</button>
      <button class="promotion-button" v-if="detailData.activityStatus == 3" @click="toEdit('3')">编辑</button>
      <button class="promotion-button" v-if="detailData.activityStatus == 4" @click="onSubmit('4')">立即开始</button> -->

      <!-- 新样式 底部按钮 -->
      <div class="editgress">
        <div v-if="detailData.activityStatus == 0">
          <button class="button3" @click="onSubmit('3')">审核不通过</button>
          <button class="button3" @click="onSubmit('1')">审核通过</button>
          <button class="button3" @click="onSubmit('2')">撤下</button>
        </div>
        <div v-if="detailData.activityStatus == 2">
          <button class="button1" @click="toEdit('2')">重新创建</button>
        </div>
        <div v-if="detailData.activityStatus == 3">
          <button class="button2" @click="toEdit('3')">编辑</button>
          <button class="button2" @click="onSubmit('2')">撤下</button>
        </div>
        <div v-if="detailData.activityStatus == 4">
          <button class="button2" @click="onSubmit('4')">立即开始</button>
          <button class="button2" @click="onSubmit('2')">撤下</button>
        </div>
        <div v-if="detailData.activityStatus == 1">
          <button class="button1" @click="onSubmit('2')">撤下</button>
        </div>
      </div>

      <!-- 按分类/指定部分/全部商品绑定 -->
      <!-- pageType: 1 // 1：正常编辑页面，2：初始选择分类，3：初始选择商品，0；全场商品 -->
      <bl-actionsheet :actions="typeActions" v-model="typeVisible" cancelText="取消" @thisValue="getPageType"></bl-actionsheet>
      <div v-if="typeVisible"><div class="modal-bg" @click="typeVisible=false"></div></div>
  </div>
</template>
<script>
  export default {
    name: 'salesPromotion',
    components: {
    },
    data() {
      return {
        promotionId: '',
        detailData: {},
        data: {},
        typeVisible: false,
        pageType: '',
        typeActions: [
          {
            name: '按品类选择',
            key: '2',
          },
          {
            name: '指定部分商品',
            key: '3',
          },
          {
            name: '全场商品',
            key: '0',
          },
        ]
      }
    },
    mounted() {
      this.promotionId = this.$route.params.id
      console.log('promotionId:', this.promotionId)
      this.queryPromotionDetail();
    },
    methods: {
      // 查询促销活动详情
      queryPromotionDetail() {
        let param = {promotionId: this.promotionId}
        this.$promotionlib.queryPromotionDetail(param, (err, obj) => {
          if (err) {
            this.$toast(err)
          }
          if (obj) {
            this.detailData = obj
            console.log('促销活动详情 obj：', JSON.stringify(this.detailData))
          }
        })
      },
      updateActivityStatus(status) {
        let param = {activityId: this.detailData.activityId, status: status}
        this.$promotionlib.updatePromotionStatus(param, (err) => {
          if (err) {
            return this.$toast(err)
          }
          this.$toast('更新促销活动状态成功')
          this.queryPromotionDetail();
        })
      },
      onSubmit(status) {
        if (this.detailData.goodsCount == 0 && status != '2' && status != '3') {
          return this.$toast('请至少绑定一个商品')
        }
        let content;
        let buttonText;
        //  活动状态(0:待审核 1:审核通过 2:已过期 3:审核不通过 4:立即上线)
        if (status == '1') {
          // <p>确定立即开始本次促销活动？</p>
          content = '确定通过审核？审核通过活动立即激活'
          buttonText = '确定通过'
          // messageText = '已通过审核'
        } else if (status == '2') {
          content = '确定要下线该活动吗？下线后活动即刻失效'
          buttonText = '确定下线'
          // messageText = '已下线'
        } else if (status == '3') {
          content = '确定不通过审核？'
          buttonText = '不通过'
          // messageText = '审核不通过'
        } else if (status == '4') {
          content = '确定立即开始本次促销活动？'
          buttonText = '立即开始'
          // mesText = '活动已开始'
        }
        this.$modal({
          content,
          buttons:
          [
            {text: '取消', onClick: () => {}},
            {text: buttonText,
              onClick: () => {
                this.updateActivityStatus(status, (err) => {
                  if (err) {
                    return this.$toast({
                      message: err
                    })
                  }
                  // 详情页刷新，并提示
                  // this.$toast({message: this.mesText})
                  this.queryPromotionDetail();
                })
              }
            }
          ]
        })
      },
      // 跳转到创建或者编辑页面12.2.1
      toEdit(status) {
        if (status == 2) {
          // 已过期则跳转至创建页面
          // let datas = {
          //   rules: this.detailData.rules,
          //   ruleMode: this.detailData.ruleMode,
          //   promotionMode: this.detailData.promotionMode,
          //   plummetString: this.detailData.plummetString,
          // }
          // console.log('id:', this.detailData.activityId)
          this.$router.replace({name: '12.2.1', params: {type: this.detailData.typeId, id: this.detailData.activityId}, query: {flag: 1}})
        }
        if (status == 3) {
          // 审核不通过则跳转至编辑页面
          this.$router.replace({name: '12.2.2', params: {id: this.detailData.activityId}, query: {flag: 2}})
        }
      },
      // 当绑定商品数量为0跳转到绑定页面，不为0时跳转至已绑定商品列表
      tobingGoods() {
        if (this.detailData.goodsCount == 0 && this.detailData.activityStatus != 2) {
          this.typeVisible = true
        }
        if (this.detailData.goodsCount != 0 && this.detailData.activityStatus != 2) {
          // pageType: 1 // 1：正常编辑页面，2：初始选择分类，3：初始选择商品，0；全场商品
          this.$router.push({name: '12.2.5.3', params: {id: this.detailData.activityId, pageType: 1}})
        }
      },
      getPageType(key) {
        console.log('key:', key)
        this.pageType = key
        console.log('pageType:', this.pageType)
        if (this.pageType != 0) {
          this.$router.push({name: '12.2.5.3', params: {id: this.detailData.activityId, pageType: this.pageType}})
        } else {
          // 调接口
          let param = {activityId: this.detailData.activityId, bindingType: 3, goodsList: [], typeList: []}
          this.$promotionlib.addBoundActivitiedGoods(param, (err, obj) => {
            if (err) {
              return this.$toast(err)
            }
            if (obj.count == 'undefined') {
              this.$toast('绑定全场商品成功!')
            } else {
              this.$toast('绑定成功 ' + obj.count + ' 件')
            }
            this.queryPromotionDetail()
          })
        }
      }
    },
    computed: {
      state: function() {
        //  活动状态(0:待审核 1:进行中 2:已过期 3:审核不通过 4:待进行)
        if (this.detailData.activityStatus == '0') {
          return '待审核'
        } else if (this.detailData.activityStatus == '1') {
          return '进行中'
        } else if (this.detailData.activityStatus == '2') {
          return '已失效'
        } else if (this.detailData.activityStatus == '3') {
          return '审核不通过'
        } else if (this.detailData.activityStatus == '4') {
          return '待开始'
        }
      },

      getPromotionMode: function() {
        // 0普通 1特殊
        if (this.detailData.promotionMode == 0) {
          return '普通促销'
        } else if (this.detailData.promotionMode == 1) {
          return '特殊促销'
        }
      },
      getText: function() {
        let textStr = ''
        if (this.detailData.typeId == 2) {
          if (this.detailData.ruleMode == 4) {
            textStr = '元'
            return textStr
          }
        }
        if (this.detailData.typeId == 2) {
          if (this.detailData.ruleMode == 3) {
            textStr = '折'
            return textStr
          }
        }
      },
      getTexts: function() {
        let textStr = ''
        if (this.detailData.typeId == 2) {
          if (this.detailData.ruleMode == 4) {
            textStr = '输入直减金额'
            return textStr
          }
        }
        if (this.detailData.typeId == 2) {
          if (this.detailData.ruleMode == 3) {
            textStr = '输入折扣'
            return textStr
          }
        }
      }
    }
  }
</script>
