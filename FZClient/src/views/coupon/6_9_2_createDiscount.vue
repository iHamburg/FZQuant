<style lang="scss" src="src/sass/promotion.scss" scoped></style>
<template>
    <div class="content-promo">
      <bl-bar barStyle="bar-dark-linear">
        <div class="button" slot="left-button" @click="goBack">
          <div class="iconfont arrow-back"></div>返回
        </div>
        <div slot="title">{{ title }}</div>
      </bl-bar>

      <div class="promotion" style="margin-bottom:1rem">
          <p class="promotion-tip">填写优惠券信息</p>
          <bl-comli class="bot">
            <div slot='left-text' class="left-box">优惠券名称</div>
            <div slot='right-text' class="right-box">
                <div class="right-r"><input  type="text" :readonly="flag1" placeholder="请输入优惠券名称" maxlength="15" v-model.trim="item.couponName"></div>
            </div>
          </bl-comli>

          <bl-comli>
              <div slot='left-text' class="left-box">开始时间</div>
              <div slot='right-text' class="right-box" @click="ShowOpenPicker('start')">
                  <div class="right-l" style="color:#b2b2b2;">{{ item.enableTimeFrom }}</div>
                  <div class="iconfont arrow-back" v-if="!flag1"></div>
              </div>
          </bl-comli>
          <bl-comli class="bot">
              <div slot='left-text' class="left-box">结束时间</div>
              <div slot='right-text' class="right-box" @click="ShowOpenPicker('end')">
                  <div class="right-l" style="color:#b2b2b2;">{{ item.enableTimeTo }}</div>
                  <div class="iconfont arrow-back" v-if="!flag1"></div>
              </div>
          </bl-comli>

          <section class="bot">
              <div class="mj">
                <span class="line">
                <em>满</em>
                 <currency-input ref = 'inputNumber1' inputWidth="width:53%" v-model="item.full" :readonly="flag1" placeholderStr="输入条件" inputType="2" maxlength="9" initStr=""></currency-input>
                 元
                 </span>
                <span>
                <em>{{ reduceContent }}</em>
                 <currency-input ref = 'inputNumber2' inputWidth="width:53%" v-model="item.cut" :readonly="flag1" placeholderStr="输入优惠" inputType="2" maxlength="9" initStr=""></currency-input>
                 元
                 </span>
              </div>
          </section>

          <bl-comli>
            <div slot='left-text' class="left-box">可发放总量</div>
            <div slot='right-text' class="right-box">
              <div class="right-r">
              <currency-input ref = 'inputNumber3' v-model="item.maxNum"  :readonly="flag2" placeholderStr="请输入此券总共可发的数量" inputType="2" initStr=""></currency-input>
              </div>
                <span>张</span>
            </div>
          </bl-comli>
          <bl-comli>
            <div slot='left-text' class="left-box">每人可领总量</div>
            <div slot='right-text' class="right-box">
                <div class="right-r">
                <currency-input ref = 'inputNumber4' v-model="item.maxNumPerUser"  :readonly="flag1" placeholderStr="请输入每人可领数量" inputType="2" initStr=""></currency-input>
               </div>
                <span>张</span>
            </div>
          </bl-comli>
          <bl-comli>
            <div slot='left-text' class="left-box">每人每天可领</div>
            <div slot='right-text' class="right-box">
                <div class="right-r">
                <currency-input ref = 'inputNumber5' v-model="item.maxNumPerUserDay"  :readonly="flag1" placeholderStr="请输入每人每天可领数量" inputType="2" initStr=""></currency-input>
                </div>
                <span>张</span>
            </div>
          </bl-comli>
          <bl-comli>
              <div slot='left-text' class="left-box">领取方式</div>
              <!-- 二期待做 -->
              <!-- <div slot='right-text' class="right-box" @click="acquireTypeVisible = !acquireTypeVisible"> -->
              <div slot='right-text' class="right-box">
                  <div class="right-l" style="color:#b2b2b2;">{{ acquireTypeStr }}</div>
                  <!-- <div class="iconfont arrow-back" v-if="!flag1"></div> -->
              </div>
          </bl-comli>
          <bl-comli>
              <div slot='left-text' class="left-box">适用商品</div>
              <div slot='right-text' class="right-box" @click="applyGoods">
                  <div class="right-l" style="color:#b2b2b2;">{{goodsNumBind}}</div>
                  <div class="iconfont arrow-back"></div>
              </div>
          </bl-comli>
          <bl-comli style="margin-bottom: 1.6rem;">
              <div slot='left-text' class="left-box">促销叠加</div>
              <div slot='right-text' class="right-box" @click="isSuperposeVisible = !flag1" >
                  <div class="right-l" style="color:#b2b2b2;">{{ isSuperposeStr }}</div>
                  <div class="iconfont arrow-back" v-if="!flag1"></div>
              </div>
          </bl-comli>
         <div style="height:1px;"></div>
      </div>

      <!-- 按钮 审核状态（1:提交审核、2：审核不通过、3：审核通过、4：已失效） -->
      <!-- <div class="promotion-button notpass" v-show="flag == 3">
          <em class="not" @click="updateStatus('2')">审核不通过</em>
          <em class="pass" @click="updateStatus('3')">审核通过</em>
      </div> -->
      <div class="editgress">
        <button  class="button2" @click="updateStatus('2')"  v-show="flag == 3" @touchstart="">审核不通过</button>
        <button class="button2" @click="updateStatus('3')"  v-show="flag == 3" @touchstart="">审核通过</button>
        <button class="button1" v-show="flag == 4 || flag == 1" @click="updateStatus('1')" @touchstart="">提交审核</button>
        <button class="button1" v-show="flag == 2" @click="updateStatus('')" @touchstart="">确认</button>
      </div>
      <!-- <button class="promotion-button" v-show="flag == 4 || flag == 1" @click="updateStatus('1')">提交审核</button>
      <button class="promotion-button"  v-show="flag == 2" @click="updateStatus('')">确认</button> -->

      <!-- 领取方式 -->
      <!--<mt-popup v-model="acquireTypeVisible" position="bottom" style="width: 100%;">
          <bl-actionsheet :actions="acquireTypeActions" v-model="acquireTypeVisible" @thisValue="acquireTypeVal"></bl-actionsheet>
      </mt-popup> -->

      <!-- 促销叠加 -->
      <mt-popup v-model="isSuperposeVisible" position="bottom" style="width: 100%;">
          <bl-actionsheet :actions="isSuperposeActions" v-model="isSuperposeVisible" @thisValue="isSuperposeVal"></bl-actionsheet>
      </mt-popup>

      <!-- 时间选择器 -->
      <bl-mtdate-picker ref="picker" class="saletime" type="datetime" :defaultDate="defaultDate" :toolbarSubText="toolbarSubText"
      year-format="{value}年"
      month-format="{value}月"
      date-format="{value}日" @confirm="returnDate" v-model="pickerValue">
      </bl-mtdate-picker>
  </div>

</template>


<script>
import uiMixin from 'src/mixins/uiMixin';
export default {
  name: 'keepCreateDiscount',

  components: {
    'BlMtdatePicker': () => System.import('components/cloud-merchant/mtdate-picker'),
    'currency-input': () => System.import('components/currency-input')
  },
  mixins: [uiMixin],
  data () {
    return {
      toolbarSubText: '',
      pickerValue: false,
      acquireTypeVisible: false,
      flag1: true,
      flag2: false,
      // 领取方式actions
      acquireTypeActions: [
        {
          name: '直接领取',
          key: '0'
        }, {
          name: '发放领取',
          key: '1'
        }
      ],

      // 是否和促销活动叠加标识 (0:叠加、1：不叠加)
      isSuperposeVisible: false,
      isSuperposeActions: [
        {
          name: '是',
          key: '0'
        }, {
          name: '否',
          key: '1'
        }
      ],
      defaultDate: new Date(),
      couponTemplateId: '', // 券模板Id
      status: '', // 优惠券状态
      flag: '', // flag=1(审核不通过编辑) flag=2(发放中编辑) flag=3(审核) flag=4(创建) flag=5(详情)
      goGoodsPage: false,
      goodsNum: '-1', // 商品数量
      maxNumber: '', // 可发总张数
      id: '', // 券id
      // 优惠券item
      item: {
        couponName: '', // 优惠券名称
        enableTimeFrom: '请选择开始时间', // 开始时间
        enableTimeTo: '请选择结束时间', // 结束时间
        maxNum: -1, // 最大发放数量
        maxNumPerUser: -1, // 每人最大领取数量
        maxNumPerUserDay: -1, // 每人每天限领数量
        cut: -1, // 减
        full: -1, // 满
        goodsList: [], // 使用商品id列表
        isSuperpose: '', // 是否与促销活动叠加（0 否 1是）
        offerMethod: '', // 优惠方式（满减还是折扣）
        acquireType: '3', // 领取方式 （3:直接领取，发放领取）
        couponDesc: '' // 满full可用 （帮传奇拼字段）
      },
    };
  },
  activated() {
    console.log('this.item----:', JSON.stringify(this.item), '---' + JSON.stringify(this.$route.params))
    if (this.$route.params.flag) {
      this.flag = this.$route.params.flag
      console.log('this.flag：', this.$route.params.flag)
      this.flashInputState();
    } else {
      if (this.goGoodsPage) {
        this.goGoodsPage = false;
      } else {
        this.flag = 4;
        this.flashInputState();
        this.initDate();
      }
    }
    if (this.$route.params.couponTemplateId) {
      this.couponTemplateId = this.$route.params.couponTemplateId
      console.log('券模板id：', this.couponTemplateId)
      // 查询优惠券详情接口
      this.queryFullCutCouponDetail()
    }
    // 创建
    if (this.$route.params.flag == 4 && this.$route.params.typeId) {
      // 初始化时间
      this.initDate();
      // this.initParams();
      this.item.offerMethod = this.$route.params.typeId;
      console.log('优惠方式（满减还是折扣）：' + this.item.offerMethod);
    }
    if (this.$utillib.storageGet("goodsList")) {
      let bindGoodsList = this.$utillib.storageGet("goodsList");
      this.item.goodsList = []
      for (let key in bindGoodsList) {
        this.item.goodsList.push(key);
      }
    }
    // console.log('activated--', JSON.stringify(this.item.goodsList), '---' + this.$refs.inputNumber1)
  },
  beforeRouteLeave(to, from, next) {
    console.log('离开6-9-2页面');
    next()
  },
  methods: {
    /**
     * 初始化时间
     * 开始时间：默认当天 23:59:59 ；
     * 结束时间：默认日期部分在开始时间基础上＋30天；时间部分默认23:59:59
     * @return {[type]} [description]
     */
    initDate() {
      this.item.enableTimeFrom = this.$utillib.fmtDate(new Date(), 'yyyy-MM-dd 23:59:59')
      let fmtDate = new Date(this.item.enableTimeFrom.replace(/-/g, "/"));
      fmtDate.setDate((fmtDate.getDate() + 30));
      this.item.enableTimeTo = this.$utillib.fmtDate(fmtDate, 'yyyy-MM-dd 23:59:59');
    },
    initParams() {
      this.item = {
        'couponName': '', // 优惠券名称
        'enableTimeFrom': '请选择开始时间', // 开始时间
        'enableTimeTo': '请选择结束时间', // 结束时间
        'maxNum': -1, // 最大发放数量
        'maxNumPerUser': -1, // 每人最大领取数量
        'maxNumPerUserDay': -1, // 每人每天限领数量
        'cut': -1, // 减
        'full': -1, // 满
        'goodsList': [], // 使用商品id列表
        'isSuperpose': '', // 是否与促销活动叠加（0 是 1否）
        'offerMethod': '', // 优惠方式（满减还是折扣）
        'acquireType': '3', // 领取方式 （直接领取，发放领取）
        'couponDesc': '' // 满full可用 （帮传奇拼字段）
      };
      this.goodsNum = '-1';
    },
    //刷新输入框状态（可输入和不可输入）
    flashInputState() {
      if (this.flag == 1 || this.flag == 4) { //输入框都可编辑
        this.flag1 = false;
        this.flag2 = false;
      } else if (this.flag == 2) {  //输入框部分可编辑
        this.flag1 = true;
        this.flag2 = false;
      } else { //输入框全部不可编辑
        this.flag1 = true;
        this.flag2 = true;
      }
    },
    ShowOpenPicker(time) {
      if (this.flag == 2 || this.flag == 3 || this.flag == 5) {
        return false
      } else {
        this.openPicker(time)
      }
    },
    openPicker(time) {
      (time === 'start') ? (this.toolbarSubText = '请选择开始时间') : (this.toolbarSubText = '请选择结束时间');
      if (time === 'start') {
        this.defaultDate = new Date(this.item.enableTimeFrom.replace(/-/g, "/"))
        this.$refs.picker.open();
      } else {
        this.defaultDate = new Date(this.item.enableTimeTo.replace(/-/g, "/"))
        this.$refs.picker.open();
      }
      let body = document.querySelectorAll('.saletime .picker-slot')
      body[0].style.flex = '1 1 6%'
    },
    returnDate(param) {
      console.log('returnDate:', param)
      if (this.toolbarSubText === '请选择开始时间') {
        (param instanceof Date)
        ? (this.item.enableTimeFrom = this.$utillib.fmtDate(param, 'yyyy-MM-dd hh:mm:ss'))
        : (this.item.enableTimeFrom = '请选择开始时间')
      }
      if (this.toolbarSubText === '请选择结束时间') {
        (param instanceof Date)
        ? (this.item.enableTimeTo = this.$utillib.fmtDate(param, 'yyyy-MM-dd hh:mm:ss'))
        : (this.item.enableTimeTo = '请选择结束时间')
      }
    },

    // 领取方式 赋值
    acquireTypeVal(val) {
      if (val) {
        console.log('val', val)
        this.item.acquireType = val
      }
    },
    // 是否参加叠加活动 赋值
    isSuperposeVal(val) {
      if (val) {
        this.item.isSuperpose = val
      }
    },

    // 数据校验
    validationData() {
      if (this.item.couponName == '') {
        this.$toast('请输入优惠券名称')
        return false;
      }

     //时间校验
      if (this.item.enableTimeFrom == '请选择开始时间') {
        this.$toast('请选择开始时间')
        return false;
      }

      if (this.item.enableTimeTo == '请选择结束时间') {
        this.$toast('请选择结束时间')
        return false;
      }
      if (this.item.enableTimeFrom < this.$utillib.fmtDate(new Date(), 'yyyy-MM-dd hh:mm:ss')) {
        this.$toast('开始时间须晚于当前系统时间')
        return false;
      }

      if (this.item.enableTimeFrom >= this.item.enableTimeTo) {
        this.$toast('结束时间须晚于开始时间')
        return false;
      }

      // 非负校验
      if (Number(this.item.full) >= 100000000 || Number(this.item.cut) >= 100000000) {
        this.$toast('门槛金额或者减免金额必须小于100000000！')
        return false
      }

      if (this.item.full == -1) {
        this.$toast('请输入门槛金额')
        return false
      }
      // 10/31 放开
      if (this.item.full == 0) {
        this.$toast('输入的门槛金额必须要大于0')
        return false
      }
      if (this.item.cut == -1 || this.item.cut == 0) {
        this.$toast('请输入减免金额')
        return false
      }

      if (Number(this.item.full) > 0 && (Number(this.item.cut) > Number(this.item.full))) {
        this.$toast('减免金额不可高于门槛金额！')
        return false
      }
      if (this.item.enableTimeTo < this.$utillib.fmtDate(new Date(), 'yyyy-MM-dd hh:mm:ss')) {
        this.$toast('结束时间须晚于当前系统时间')
        return false;
      }

      if (this.item.maxNum === -1 || this.item.maxNum == 0) {
        this.$toast('请输入可发放总量');
        return false;
      }
      if (this.item.maxNumPerUser === -1 || this.item.maxNumPerUser == 0) {
        this.$toast('请输入每人可领总量');
        return false;
      }
      if (this.item.maxNumPerUserDay == -1 || this.item.maxNumPerUserDay == 0) {
        this.$toast('请输入每人每天可领总量');
        return false;
      }

      if (Number(this.item.maxNumPerUser) < Number(this.item.maxNumPerUserDay)) {
        this.$toast('每人每天可领须小于等于每人可领总量');
        return false;
      }

      if (Number(this.item.maxNumPerUser) > Number(this.item.maxNum)) {
        this.$toast('每人可领总量须小于等于可发总量');
        return false;
      }

      if (Number(this.item.maxNum) < Number(this.item.maxNumPerUserDay)) {
        this.$toast('每人每天可领须小于等于可发总量');
        return false;
      }

      if (this.flag == 4) {
        if (this.item.goodsList.length == 0) {
          this.$toast('请绑定活动商品');
          return false;
        }
      }
      if (this.item.isSuperpose == '选择是否与促销活动叠加') {
        this.$toast('请选择是否与促销活动叠加');
        return false;
      }
      return true;
    },

    /**
     * 6005-查询优惠券详情
     */
    queryFullCutCouponDetail() {
      let param = {couponTemplateId: this.couponTemplateId}
      this.$couponlib.queryFullCutCouponDetail(param, (err, obj) => {
        if (err) {
          this.$toast(err)
        }
        if (obj) {
          console.log('查询优惠券详情 obj：', JSON.stringify(obj))
          obj.full = Number(obj.full)
          obj.cut = Number(obj.cut)
          this.item = obj
          this.item.goodsList = [];
          this.goodsNum = obj.goodsNum
          this.id = obj.id
          this.status = obj.status
          this.maxNumber = obj.maxNum
        }
      })
    },

    /**
     * 6001 创建优惠券接口
     */
    createFullCutCoupon() {
      this.item.couponDesc = '满' + this.item.full + '可用' // 满full可用
      this.$couponlib.createFullCutCoupon(this.item, (err, obj) => {
        console.log('创建优惠券入参', JSON.stringify(this.item))
        if (err) {
          this.$toast(err)
          return false
        } else {
          this.$toast('创建成功')
          this.initParams();
          // 清空适用商品id缓存
          if (this.$utillib.storageGet("goodsList")) {
            this.$utillib.storageRemove("goodsList")
          }
          // 跳转至优惠券列表页
          this.$router.push({name: '6.9.4'})
        }
      })
    },

    // 6003-更新优惠券接口
    updateTemplateBaseInfo() {
      let param = this.item
      param.id = this.id
      param.currentState = this.status
      param.couponTemplateId = this.couponTemplateId
      console.log('更新优惠券接口入参', JSON.stringify(param))
      this.$couponlib.updateFullCutCoupon(param, (err, obj) => {
        if (err) {
          return this.$toast(err)
        } else {
          this.$toast('操作成功')
          this.initParams();
          // 跳转至优惠券列表页
          this.$router.go(-1)
        }
      })
    },

    /**
     * 6004-更新优惠券状态
     */
    updateFullCutCouponStatus(statu) {
      let param = {couponTemplateId: this.couponTemplateId, currentState: this.status, status: statu}
      this.$couponlib.updateFullCutCouponStatus(param, (err, obj) => {
        if (err) {
          return this.$toast(err)
        } else {
          this.$toast('操作成功')
          this.initParams();
          this.$router.go(-1)
        }
      })
    },
    //  审核状态（1:提交审核、2：审核不通过、3：审核通过、4：已失效）
    updateStatus(statu) {
      let content;
      let buttonText;
      if (statu == '1') {
        let result = this.validationData();
        console.log('校验结果：', result)
        if (!result) return
        content = '确定要提交审核？'
        buttonText = '确定'
      } else if (statu == '') {
        console.log('this.item.maxNum：', this.item.maxNum)
        console.log('this.maxNumber', this.maxNumber)
        if (Number(this.item.maxNum) <= this.maxNumber) {
          this.$toast('可发放总量必须大于上一次填写的数量')
          return false
        }
        content = '确定要修改吗？'
        buttonText = '确定'
      } else if (statu == '2') {
        content = '确定不通过审核？'
        buttonText = '不通过'
      } else if (statu == '3') {
        content = '确定通过审核？'
        buttonText = '确定通过'
      }
      this.$modal({
        content,
        buttons:
        [
          {text: '取消', onClick: () => {}},
          {text: buttonText,
            onClick: () => {
              // flag=1(审核不通过编辑) flag=2(发放中编辑) flag=3(审核) flag=4(创建) flag=5(详情)
              if (this.flag == 1 || this.flag == 2) {
                // 6003-更新优惠券接口
                this.updateTemplateBaseInfo()
              } else if (statu == '1') {
                // 6001-创建
                this.createFullCutCoupon()
              } else {
                // 6004-更新优惠券状态
                this.updateFullCutCouponStatus(statu)
              }
            }
          }
        ]
      })
    },
    // 跳转选择适用商品列表
    applyGoods() {
      this.goGoodsPage = true;
      if (this.flag == 4) {
        // 选择适用商品
        this.$router.push({name: '6.9.10'})
      } else if (this.flag == 5 || this.flag == 3) {
        // 查看已绑定商品
        this.$router.push({name: '6.9.8', params: {id: this.couponTemplateId}})
      }
    },
    // 返回清空缓存
    goBack() {
      if (this.flag == 1 || this.flag == 2 || this.flag == 4) {
        this.$modal({
          content: '您确定要返回吗？',
          buttons: [
            {text: '取消', onClick: function () {}},
            {text: '确定',
              onClick: () => {
                if (this.$utillib.storageGet("goodsList")) {
                  this.$utillib.storageRemove("goodsList")
                }
                this.initParams()
                this.$router.go(-1)
              }
            }
          ]
        })
      } else {
        this.initParams()
        this.$router.go(-1)
      }
    }
  },

  computed: {
    title: function() {
      if (this.flag == 1 || this.flag == 2) {
        return '编辑优惠券'
      } else if (this.flag == 4) {
        return '创建优惠券'
      } else {
        return '优惠券详情'
      }
    },
    reduceContent: function() {
      let val = this.item.offerMethod;
      if (val == 4 || val == 23) {
        return '减'
      } else if (val == 5) {
        return '折'
      }
    },

    // 直接领取，发放领取
    acquireTypeStr: function() {
      let val = this.item.acquireType;
      // console.log('领取方式：', this.item.acquireType)
      return '直接领取'
      // TODO 二期
      // if (val == 3) {
      //   return '直接领取'
      // } else if (val == 1) {
      //   return '发放领取'
      // } else {
      //   return '请选择用户领券方式'
      // }
    },
    // 绑定商品
    goodsNumBind: function() {
      // this.goodsNum
      if (this.goodsNum >= 0) {
        return '绑定' + this.goodsNum + '件商品'
      }
      console.log('goodsList--', JSON.stringify(this.item.goodsList))
      if (this.item.goodsList.length > 0) {
        return '已选择' + this.item.goodsList.length + '件商品'
      } else {
        return '请绑定活动商品'
      }
    },
    isSuperposeStr: function() {
      let val = this.item.isSuperpose;
      if (val == '0') {
        return '是'
      } else if (val == '1') {
        return '否'
      } else {
        this.item.isSuperpose = '选择是否与促销活动叠加'
        return '选择是否与促销活动叠加'
      }
    },
  }
};
</script>
