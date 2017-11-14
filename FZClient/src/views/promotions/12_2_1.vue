<style lang="scss" src="src/sass/promotion.scss" scoped></style>
<template>
  <div class="content-promo">
      <bl-bar barStyle="bar-dark-linear">
        <div class="button" slot="left-button" @click="$router.go(-1)">
          <div class="iconfont arrow-back"></div><i class="fback">返回</i>
        </div>
        <div slot="title">{{title}}</div>
      </bl-bar>

      <div class="promotion" style="margin-bottom: 1.6rem;">
          <p class="promotion-tip">活动信息</p>
          <bl-comli class="bot">
            <div slot='left-text' class="left-box">活动标题</div>
            <div slot='right-text' class="right-box">
              <div class="right-r">
                <input type="text" placeholder="请输入活动标题" maxlength="30" v-model.trim="promotion.title">
                <!-- <currency-input v-model="promotion.title" maxlength="3"></currency-input> -->
              </div>
            </div>
          </bl-comli>

          <bl-comli>
            <div slot='left-text' class="left-box">开始时间</div>
            <div slot='right-text' class="right-box" @click="openPicker('start')">
              <div class="right-r">{{ promotion.beginAt }}</div>
              <div class="iconfont arrow-back"></div>
            </div>
          </bl-comli>
          <bl-comli>
            <div slot='left-text' class="left-box">结束时间</div>
            <div slot='right-text' class="right-box" @click="openPicker('end')">
              <div class="right-r">{{ promotion.endAt }}</div>
              <div class="iconfont arrow-back"></div>
            </div>
          </bl-comli>

          <div>
            <p class="promotion-tip">促销规则设置</p>
            <bl-comli>
                <div slot='left-text' class="left-box">促销模版</div>
                <div slot='right-text' class="right-box">
                    <div class="right-r">{{ ruleNameStr }}</div>
                    <!-- <div class="iconfont arrow-back"></div> -->
                </div>
            </bl-comli>
            <bl-comli>
                <div slot='left-text' class="left-box">促销方式</div>
                <div slot='right-text' class="right-box" @click="promotionModeVisible = true">
                    <div class="right-r">{{ promotionModeStr }}</div>
                    <div class="iconfont arrow-back"></div>
                </div>
            </bl-comli>
            <div v-if="promotion.typeId == 2">
              <bl-comli >
                <div slot='left-text' class="left-box">折扣方式</div>
                <div slot='right-text' class="right-box" @click="zkVisible = true">
                    <div class="right-r">{{ ruleModeStr }}</div>
                    <div class="iconfont arrow-back"></div>
                </div>
              </bl-comli>
            </div>
            <div v-else>
              <bl-comli >
                <div slot='left-text' class="left-box">累计方式</div>
                <div slot='right-text' class="right-box" @click="if(promotion.typeId == 0){mjVisible = true}">
                    <div class="right-r">{{ ruleModeStr }}</div>
                    <div v-if="promotion.typeId == 0" class="iconfont arrow-back"></div>
                </div>
              </bl-comli>
            </div>
          </div>

          <!-- 满额减 -->
          <div v-if="promotion.typeId == 0">
            <section v-if="ruleModeStr == '阶梯'">
              <div v-for="(item, index) in jtRules">
                <p class="promotion-tip">
                  阶梯{{ index + 1 }}
                  <em @click="delLadder(jtRules, index)"></em>
                </p>
                <div class="mj">
                  <span class="line">
                    <em>满</em>
                    <!-- <input v-model.lazy="item.full" v-money="money"> -->
                    <currency-input v-model.lazy="item.full" inputWidth="width:60%"></currency-input>
                  </span>
                  <span>
                    <em>减</em>
                    <!-- <input type="number" placeholder="输入金额"  v-model.number="item.off"> -->
                    <!-- <input v-model.lazy="item.off" v-money="money" @keyup="init(jtRules, index)"> -->
                    <currency-input v-model.lazy="item.off" inputWidth="width:60%"></currency-input>
                  </span>
                </div>
              </div>
              <div class="btn" v-if="jtRules.length < 10">
                <button @click="addLadder()">增加阶梯（{{ jtRules.length }}/10）</button>
              </div>
            </section>

            <section v-if="ruleModeStr == '叠加'">
              <p class="promotion-tip">初始门槛金额</p>
              <div class="mj">
                <span class="line">
                  <em>每满</em>
                  <!-- <input type="number" placeholder="输入金额" v-model.number="djRules[0].full"> -->
                  <!-- <input v-model.lazy="djRules[0].full" v-money="money"> -->
                  <currency-input v-model="djRules[0].full" inputWidth="width:60%"></currency-input>
                </span>
                <span>
                  <em>减</em>
                  <!-- <input type="number" placeholder="输入金额" v-model.number="djRules[0].off"> -->
                  <!-- <input v-model.lazy="djRules[0].off" v-money="money"> -->
                  <currency-input v-model="djRules[0].off" inputWidth="width:60%"></currency-input>
                </span>
              </div>
              <bl-comli>
                <div slot='left-text' class="left-tit">可叠加次数</div>
                <div slot='right-text' class="right-box">
                  <div class="count">
                    <em class="reduce" @click="reduce('MJ')">-</em>
                    <input type="number" readonly="true" v-model.number="djRules.length">
                    <em class="add" @click="add('MJ')">+</em>
                  </div>
                </div>
              </bl-comli>
            </section>
          </div>

          <!-- 满件折 -->
          <div v-if="promotion.typeId == 1">
            <section  class="bot">
              <div v-for="(item, index) in jtRules">
                <p class="promotion-tip">
                  阶梯{{ index + 1 }}
                  <em @click="delLadder(jtRules, index)"></em>
                </p>
                <bl-comli>
                  <div slot='left-text' class="left-box">满</div>
                  <div slot='right-text' class="right-box">
                    <div class="count">
                      <em class="reduce" @click="reduce('MJZ', index)">-</em>
                      <input type="tel" v-model.number="item.full" @keyup="checkNum(index)" ref="init">
                      <!-- <input v-model.lazy="item.full" v-money="money"> -->
                      <em class="add" @click="add('MJZ', index)">+</em>
                    </div>
                  </div>
                  <div slot='right-text' class="left-box">件</div>
                </bl-comli>
                <bl-comli>
                  <div slot='left-text' class="left-box">享</div>
                  <div slot='right-text' class="right-box">
                   <!--  <div class="right-r"> -->
                    <div class="right-l" @click="onDiscount(index)">{{ item.off }} 折</div>
                      <!-- <input type="number" readonly="true" placeholder="请输入折扣" v-model.number="item.off" @click="onDiscount(index)"> -->

                      <!-- <input v-model.lazy="item.off" v-money="discount"> -->
                    <!-- </div> -->
                  </div>
                </bl-comli>
              </div>
              <div class="btn" v-if="jtRules.length < 10">
                <button @click="addLadder()">增加阶梯（{{ jtRules.length }}/10）</button>
              </div>
            </section>
          </div>

          <!-- 指定折 -->
          <div v-if="promotion.typeId == 3">
            <section>
              <div v-for="(item, index) in jtRules">
                <p class="promotion-tip">
                  阶梯{{ index + 1 }}
                  <em @click="delLadder(jtRules, index)"></em>
                </p>
                <bl-comli>
                  <div slot='left-text' class="left-box">满</div>
                  <div slot='right-text' class="right-box">
                    <div class="count">
                      <em class="reduce" @click="reduce('ZDZ', index)">-</em>
                      <input type="tel" v-model.number="item.full" @keyup="checkNum(index)" ref="init">
                      <em class="add" @click="add('ZDZ', index)">+</em>
                    </div>
                  </div>
                  <div slot='right-text' class="left-box">件</div>
                </bl-comli>
                <bl-comli>
                  <div slot='left-text' class="left-box">第 {{item.full}} 件享</div>
                  <div slot='right-text' class="right-box">
<!--                     <div class="right-r">
                      <input type="number" readonly="true" placeholder="请输入折扣" v-model.number="item.off" @click="onDiscount(index)">
                    </div> -->
                    <div class="right-l" @click="onDiscount(index)">{{ item.off }} 折</div>
                  </div>
                </bl-comli>
              </div>
              <div class="btn" v-if="jtRules.length < 10">
                <button @click="addLadder()">增加阶梯（{{ jtRules.length }}/10）</button>
              </div>
            </section>
          </div>

          <!-- 限时直降 -->
          <div v-if="promotion.typeId == 2">
            <bl-comli class="bot" v-if="ruleModeStr == '指定折扣'">
              <div slot='left-text' class="left-box">输入折扣</div>
              <div slot='right-text' class="right-box">
      <!--             <div class="right-r">
                    <input type="number" readonly="true" placeholder="请输入折扣" v-model.number="zjRules.off" @click="onDiscount(index)">
                  </div> -->
                  <div class="right-l" @click="onDiscount(index)">{{ zjRules.off }}</div>
              </div>
            </bl-comli>
            <bl-comli class="bot" v-if="ruleModeStr == '直减金额'">
              <div slot='left-text' class="left-box">输入金额</div>
              <div slot='right-text' class="right-box">
                  <div class="right-r">
                    <!-- <input type="text" placeholder="请输入直减金额" v-model.trim="zjRules.off"> -->
                    <!-- <input v-model.lazy="zjRules.off" v-money="money"> -->
                    <currency-input v-model="zjRules.off" inputWidth="width:60%"></currency-input>
                  </div>
              </div>
            </bl-comli>
          </div>

          <!-- 绑定活动商品只在编辑下展示出来 -->
          <!-- <p class="promotion-tip">活动商品</p>
          <bl-comli>
            <div slot='left-text' class="left-tit">绑定活动商品</div>
            <div slot='right-text' class="right-box" @click="bindVisible = true">
              <div class="right-r">{{ modeBound }}</div>
              <div class="iconfont arrow-back"></div>
            </div>
          </bl-comli> -->

      </div>
      <div style="height:1px;"></div>

      <!-- <button class="promotion-button" @click="onSubmit">保存并提交审核</button> -->

      <!-- 新样式 底部按钮 -->
      <div class="editgress">
        <button class="button1" @click="onSubmit">保存并提交审核</button>
      </div>

      <!-- 促销方式 -->
      <mt-popup v-model="promotionModeVisible" position="bottom" style="width: 100%;">
          <bl-actionsheet :actions="promotionModeActions" v-model="promotionModeVisible" @thisValue="promotionModeVal"></bl-actionsheet>
      </mt-popup>

      <!-- 累计方式 -->
      <mt-popup v-model="mjVisible" position="bottom" style="width: 100%;">
          <bl-actionsheet :actions="mjActions" v-model="mjVisible" @thisValue="mjVal"></bl-actionsheet>
      </mt-popup>

      <!-- 折扣方式 -->
      <mt-popup v-model="zkVisible" position="bottom" style="width: 100%;">
          <bl-actionsheet :actions="zkActions" v-model="zkVisible" @thisValue="zkVal"></bl-actionsheet>
      </mt-popup>

      <!-- 绑定方式 -->
      <mt-popup v-model="bindVisible" position="bottom" style="width: 100%;">
          <bl-actionsheet :actions="bindActions" v-model="bindVisible" @thisValue="zkVal"></bl-actionsheet>
      </mt-popup>

      <!-- <mt-popup v-model="sheetVisible" position="bottom" style="width: 100%;">
          <bl-actionsheet :actions="actions" v-model="sheetVisible" @thisValue="returnVal"></bl-actionsheet>
      </mt-popup> -->

      <!-- 遮罩 -->
      <!--<div v-if="popupVisible" @click="popupVisibleBG"><div class="modal-bg"></div></div>-->

      <!-- 修改折扣 -->
      <mt-popup v-model="popupVisible" position="bottom" class="popup-discount" style="width: 100%;">
        <bl-picker :slots="slots" show-toolbar @getValues="getDiscount" @cancel="close">
        </bl-picker>
      </mt-popup>

      <bl-mtdate-picker class="saletime" ref="picker" type="datetime" :defaultDate="defaultDate"
      :toolbarSubText="toolbarSubText"
      year-format="{value}年"
      month-format="{value}月"
      date-format="{value}日" @confirm="returnDate" v-model="pickerValue">
      </bl-mtdate-picker>

  </div>
</template>

<script>
import {VMoney} from 'v-money';
export default {
  name: 'createPromotion',

  components: {
    'BlMtdatePicker': () => System.import('components/cloud-merchant/mtdate-picker'),
    'currency-input': () => System.import('components/currency-input')
  },

  data () {
    return {
      toolbarSubText: '',
      pickerValue: false,
      sheetVisible: false,

      index: 0,
      promotionId: '',
      popupVisible: false,
      flag: '', // 1:重新创建 2：编辑 3：创建
      slots: [
        {
          // flex: 0.7,
          values: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'],
          textAlign: 'center',
          defaultIndex: 5 // 设置默认值index， 必须选0
        },
        {
          divider: true,
          content: '.',
          textAlign: 'center'
        },
        {
          // flex: 0.7,
          values: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'],
          textAlign: 'center',
          defaultIndex: 5
        },
        {
          // flex: 0.7,
          divider: true,
          content: '折',
          textAlign: 'center'
        },
      ],

      // 促销方式actions
      promotionModeVisible: false,
      promotionModeActions: [
        {
          name: '普通促销',
          key: '0'
        }, {
          name: '特殊促销',
          key: '1'
        }
      ],

      // 累计方式
      mjVisible: false,
      mjActions: [
        {
          name: '叠加',
          key: '1'
        }, {
          name: '阶梯',
          key: '2'
        }
      ],

      // 折扣方式
      zkVisible: false,
      zkActions: [
        {
          name: '指定折扣',
          key: '3'
        }, {
          name: '直减金额',
          key: '4'
        }
      ],

      // 绑定方式
      bindVisible: false,
      bindActions: [
        {
          name: '按品类选择',
          key: '3'
        }, {
          name: '指定部分商品',
          key: '4'
        }, {
          name: '全场商品',
          key: '4'
        }
      ],

      // 阶梯
      jtRules: [
        {
          full: 1,
          off: 1,
        },
      ],
      // 叠加
      djRules: [
        {
          full: 0,
          off: 0
        }
      ],
      // 限时直降
      zjRules: {
        off: 0
      },
      defaultDate: new Date(),
      bindingType: '', // 绑定类型

      // 促销item
      promotion: {
        beginAt: '选择开始时间',
        endAt: '选择结束时间',
        promotionMode: '0', //  0: 普通 1: 特殊
        ruleExpression: '',
        ruleMode: '', // 默认阶梯
        ruleName: '',
        title: '',
        typeId: '', // 0满额减｜1满件折｜2直降｜3指定折
      },
      // v-money 配置====== 弃用
      /*money: { // 金额
        precision: 2, // 小数点后2位
        masked: false
      },
      discount: { // 折扣
        precision: 1, // 小数点后1位
        suffix: '折',
        masked: false
      }*/
    };
  },

  directives: {money: VMoney},

  /*created() {

  },*/

  mounted() {
    console.log('flag：', this.$route.query.flag)
    this.flag = this.$route.query.flag
    // 重新创建/编辑
    if (this.flag == 1 || this.flag == 2) {
      console.log('促销活动id：', this.$route.params.id)
      this.promotionId = this.$route.params.id
      this.queryPromotion()
    }
    // 创建
    if (this.flag == 3) {
      // 初始化时间
      this.initDate();
      this.promotion.typeId = this.$route.params.type;
      console.log('promotion.typeId:', this.promotion.typeId)
      if (this.promotion.typeId == 2) { // 促销模版为限时直降，默认为指定折扣
        this.promotion.ruleMode = 3
      } else {
        this.promotion.ruleMode = 2
      }
    }
  },
  methods: {
    checkNum(index) {
      let val = this.$refs.init[index].value.replace(/[^\d]/g, '')
      // console.log('checkNum:', val)
      this.jtRules[index].full = val
      if (this.jtRules[index].full > 10000) {
        this.jtRules[index].full = 10000;
        return;
      } else if (this.jtRules[index].full < 1) {
        this.jtRules[index].full = '';
        return;
      }
    },
    /**
     * 初始化时间
     * 开始时间：默认当天 23:59:59 ；
     * 结束时间：默认日期部分在开始时间基础上＋30天；时间部分默认23:59:59
     * @return {[type]} [description]
     */
    initDate() {
      this.promotion.beginAt = this.$utillib.fmtDate(new Date(), 'yyyy-MM-dd 23:59:59')
      let fmtDate = new Date(this.promotion.beginAt.replace(/-/g, "/"));
      fmtDate.setDate((fmtDate.getDate() + 30));
      this.promotion.endAt = this.$utillib.fmtDate(fmtDate, 'yyyy-MM-dd 23:59:59');
    },
    openPicker(time) {
      (time === 'start') ? (this.toolbarSubText = '选择开始时间') : (this.toolbarSubText = '选择结束时间');
      if (time === 'start') {
        this.defaultDate = new Date(this.promotion.beginAt.replace(/-/g, "/"))
        this.$refs.picker.open();
      } else {
        this.defaultDate = new Date(this.promotion.endAt.replace(/-/g, "/"))
        this.$refs.picker.open();
      }
      let body = document.querySelectorAll('.saletime .picker-slot')
      body[0].style.flex = '1 1 6%'
    },
    returnDate(param) {
      console.log('returnDate:', param)
      if (this.toolbarSubText === '选择开始时间') {
        (param instanceof Date)
        ? (this.promotion.beginAt = this.$utillib.fmtDate(param, 'yyyy-MM-dd hh:mm:ss'))
        : (this.promotion.beginAt = '选择开始时间')
      }
      if (this.toolbarSubText === '选择结束时间') {
        (param instanceof Date)
        ? (this.promotion.endAt = this.$utillib.fmtDate(param, 'yyyy-MM-dd hh:mm:ss'))
        : (this.promotion.endAt = '选择结束时间')
      }
    },

    // 点击折扣选择
    onDiscount(index) {
      console.log('点击第' + index + '个')
      this.popupVisible = true;
      this.index = index
    },

    // 获取折扣率 确定按钮
    getDiscount(values) {
      console.log('getDiscount-values -- ', values);
      this.popupVisible = false
      if (!values[0]) {
        values[0] = this.slots[0].values[0];
      }
      let discountNum = values[0] + '.' + values[1];
      console.log('折扣率：', discountNum)

      // 满件折 指定折
      if (this.promotion.typeId == 1 || this.promotion.typeId == 3) {
        this.jtRules[this.index].off = discountNum
        console.log('获取折扣率', this.jtRules[this.index])
      }

      // 限时直降
      if (this.promotion.typeId == 2) {
        this.zjRules.off = discountNum
      }
    },
    // 获取折扣率 close
    close() {
      this.popupVisible = false
    },
    // 遮罩控制
    popupVisibleBG() {
      if (this.popupVisible === true) { this.popupVisible = false }
    },

    // 增加阶梯
    addLadder() {
      let temp = {full: 1, off: 1}
      // let temp = this.jtRules.pop()
      // console.log('最后一个', temp)
      this.jtRules.push(temp)
    },

    // 删除阶梯
    delLadder(item, index) {
      let array = item
      if (array.length <= 1) {
        return this.$toast('至少需要一个阶梯');
      }
      array.splice(index, 1)
    },

    // 促销方式 赋值
    promotionModeVal(val) {
      if (val) {
        this.promotion.promotionMode = val
      }
    },
    // 累计方式 赋值
    mjVal(val) {
      if (val) {
        this.promotion.ruleMode = val
      }
    },
    // 折扣方式 赋值
    zkVal(val) {
      if (val) {
        this.promotion.ruleMode = val
      }
    },
    // 绑定方式 赋值
    bindVal(val) {
      if (val) {
        this.bindingType = val
      }
    },

    // 数量 +
    add(type, index) {
      // console.log('点击数量+ ', type, index)
      if (type == 'MJ') {
        if (this.djRules.length == 10) return
        // 满额减的叠加 执行
        this.djRules.push(this.djRules[0])
      } else {
        // 其他
        console.log('除了满额减的叠加', this.jtRules[index].full)
        if (this.jtRules[index].full >= 10000) {
          this.jtRules[index].full = 10000;
          return;
        } else if (this.jtRules[index].full < 1) {
          this.jtRules[index].full = 1;
          return;
        }
        this.jtRules[index].full = parseInt(this.jtRules[index].full) + 1
      }
    },
    // 数量 —
    reduce(type, index) {
      // console.log('点击数量- ', type, index)
      if (type == 'MJ') {
        // 满额减的叠加 执行
        if (this.djRules.length == 1) return
        this.djRules.pop()
      } else {
        // 其他
        // console.log('除了满额减的叠加')
        if (this.jtRules[index].full > 10000) {
          this.jtRules[index].full = 10000;
          return;
        } else if (this.jtRules[index].full <= 1) {
          this.jtRules[index].full = 1;
          return;
        }
        this.jtRules[index].full = parseInt(this.jtRules[index].full) - 1
      }
    },

    // 数据校验
    validationData() {
      // console.log('validationData')
      let promotion = this.promotion;
      if (!promotion.title) {
        this.$toast('请输入活动标题')
        return false;
      }

      /**
       * 时间校验
       * @param  {[type]} promotion.beginAt >             promotion.endAt [description]
       * @return {[type]}                   [description]
       */
      if (promotion.endAt < this.$utillib.fmtDate(new Date(), 'yyyy-MM-dd hh:mm:ss')) {
        this.$toast('结束时间不能晚于当前时间')
        return false;
      }
      if (promotion.beginAt > promotion.endAt) {
        this.$toast('开始时间不能大于结束时间')
        return false;
      }

      // 除了限时直降 校验规则的长度
      if (!promotion.typeId == 2) {
        if (promotion.ruleExpression.rules.length == 0) {
          this.$toast('请设置促销规则')
          return false;
        }
      }

      /**
       * 满额减规则校验
       * 同阶梯内：门槛金额必须高于／等于减掉的金额；减免金额也必须低于／等于已设置的门槛金额
       * 不同的阶梯内：下一个阶梯中门槛金额和减免金额不可低于上一个阶梯；
       * @param  {[type]} promotion.typeId [description]
       * @return {[type]}                  [description]
       */
      if (promotion.typeId == 0) {
        for (let i = 0, len = promotion.ruleExpression.rules.length; i < len; i++) {
          let rule = promotion.ruleExpression.rules[i];
          let beforeRule;
          if (i >= 1) {
            beforeRule = promotion.ruleExpression.rules[i - 1];
          }
          console.log('rule：', rule, 'beforeRule:', beforeRule)
          // 非负校验
          if (Number(rule.full) >= 100000000 || Number(rule.off) >= 100000000) {
            if (i == 0) {
              this.$toast('门槛金额或者减免金额必须小于100000000！')
            } else {
              this.$toast('阶梯' + (i + 1).toString() + '门槛金额或者减免金额必须小于100000000！')
            }
            return false
          }
          if (Number(rule.full) <= 0 || Number(rule.off) <= 0) {
            if (i == 0) {
              this.$toast('门槛金额或者减免金额必须大于0！')
            } else {
              this.$toast('阶梯' + (i + 1).toString() + '门槛金额或者减免金额必须大于0！')
            }
            return false
          }
          if (beforeRule && promotion.ruleMode == 2) {
            if (Number(rule.full) <= Number(beforeRule.full)) {
              this.$toast('新阶梯的门槛金额不可低于上一个阶梯的门槛金额！')
              return false
            }
            if (Number(rule.off) <= Number(beforeRule.off)) {
              this.$toast('新阶梯的减免金额不可低于上一个阶梯的减免金额！')
              return false
            }
          }

          // 9/21 修改 门槛金额必须大于减免金额
          if (Number(rule.off) >= Number(rule.full)) {
            if (i == 0) {
              this.$toast('门槛金额必须大于减免金额！')
            } else {
              this.$toast('阶梯' + (i + 1).toString() + ':门槛金额必须大于减免金额！')
            }
            return false
          }
        }
      }
      /**
       * 满件折 指定折 校验规则
       * 折扣可支持0.0折到1.0折；
       * 可输入的最大门槛件数上限为10,000
       *  不同的阶梯内：每个阶梯必须由高到低去设置；下一个阶梯中门槛件数不可低于上一个阶梯；折扣不可高于下一个阶梯；
       */
      if (promotion.typeId == 1 || promotion.typeId == 3) {
        for (let i = 0, len = promotion.ruleExpression.rules.length; i < len; i++) {
          let rule = promotion.ruleExpression.rules[i];
          let beforeRule;
          if (i >= 1) {
            beforeRule = promotion.ruleExpression.rules[i - 1];
          }
          // 非负校验
          if (Number(rule.full) <= 0 || Number(rule.full) > 10000) {
            this.$toast('阶梯' + (i + 1).toString() + '门槛件数范围在0~10000之间！')
            return false
          }
          if (Number(rule.off) <= 0 || Number(rule.off) >= 10) {
            this.$toast('阶梯' + (i + 1).toString() + '折扣只支持0.1折到9.9折')
            return false
          }
          if (beforeRule) {
            if (Number(rule.full) <= Number(beforeRule.full)) {
              this.$toast('新阶梯的门槛件数不可低于上一个阶梯的门槛件数！')
              return false
            }
            if (Number(rule.off) >= Number(beforeRule.off)) {
              this.$toast('新阶梯的折扣不可高于上一个阶梯的折扣！')
              return false
            }
          }
        }
      }

      /**
       * 限时直降 规则校验
       * 减金额  减免金额必须大于0元
       * 折扣 折扣必须低于1折
       */
      if (promotion.typeId == 2) {
        if (promotion.ruleMode == 3) { // 折扣
          if (promotion.ruleExpression.off <= 0 || promotion.ruleExpression.off >= 10) {
            this.$toast('折扣只支持0.1折到9.9折')
            return false
          }
        }
        if (promotion.ruleMode == 4) { // 减金额
          if (Number(promotion.ruleExpression.off) == 0) {
            this.$toast('减免金额必须大于0元')
            return false;
          }
          if (Number(promotion.ruleExpression.off) > 100000000) {
            this.$toast('减免金额最大为100,000,000')
            return false;
          }
        }
      }
      return true
    },

    /**
     * 提交
     */
    onSubmit() {
      this.promotion.ruleName = this.ruleNameStr;
      // 促销模版 0满额减｜1满件折｜2直降｜3指定折
      let typeId = this.promotion.typeId;
      // 规则模式 1叠加 2阶梯 3折扣 4减金额 (3和4只用于直降)',
      let ruleMode = this.promotion.ruleMode;

      if (typeId == 0 && ruleMode == 1) { // 满额减 叠加
        console.log('满额减 叠加')
        // 处理规则
        let rules = [];
        for (let i = 0, len = this.djRules.length; i < len; i++) {
          let rule = {};
          rule.full = this.djRules[0].full * (i + 1);
          rule.off = this.djRules[0].off * (i + 1);
          console.log('第' + (i + 1) + '个 :', JSON.stringify(rule))
          rules.push(rule)
        }
        this.promotion.ruleExpression = {rules: rules}
      } else if (typeId == 0 && ruleMode == 2) { // 满额减 阶梯
        console.log('满额减 阶梯')
        this.promotion.ruleExpression = {rules: this.jtRules}
      } else if (typeId == 1 && ruleMode == 2) { // 满件折 阶梯
        console.log('满件折 阶梯')
        this.promotion.ruleExpression = {rules: this.jtRules}
      } else if (typeId == 3 && ruleMode == 2) { // 指定折 阶梯
        console.log('指定折 阶梯')
        this.promotion.ruleExpression = {rules: this.jtRules}
      } else if (typeId == 2 && ruleMode == 3) { // 限时直降 折扣
        console.log('限时直降 折扣')
        this.promotion.ruleExpression = this.zjRules
      } else if (typeId == 2 && ruleMode == 4) { // 限时直降 金额
        console.log('限时直降 金额')
        this.promotion.ruleExpression = this.zjRules
      }
      // console.log('ruleExpression', JSON.stringify(this.promotion.ruleExpression))
      // console.log('提交de promotion：', JSON.stringify(this.promotion));
      let b = this.validationData();
      console.log('校验结果：', b)
      if (!b) return
      /*this.$promotionlib.createPromotion(this.promotion, (err, obj) => {
        if (err) { return this.$toast(err) }
        this.$toast('创建成功')
        // this.$router.go(-1)
        // status: {0:待审核 1:进行中 2:已过期 3:审核不通过 4:待进行 all:全部}
        this.$router.push({name: '12.1', params: {status: '0'}})
      })*/
      if (this.flag == 1 || this.flag == 3) {
        this.createPromotionActivity()
      } else if (this.flag == 2) {
        this.updatePromotionActivity()
      }
    },
    /**
     * 查询促销活动
     */
    queryPromotion() {
      let param = {promotionId: this.promotionId}
      console.log('5007入参：', this.promotionId)
      this.$promotionlib.queryPromotionDetail(param, (err, obj) => {
        if (err) {
          this.$toast(err)
        }
        if (obj) {
          // console.log('ruleExpression', JSON.parse(obj.ruleExpression))
          console.log('查询促销详情 obj：', JSON.stringify(obj))
          if (obj.ruleMode == 1) {
            console.log('叠加')
            this.djRules = obj.rules
          } else if (obj.ruleMode == 2) {
            console.log('阶梯')
            this.jtRules = obj.rules
          } else if (obj.ruleMode == 3 || obj.ruleMode == 4) {
            console.log('限时折扣 || 限时减金额')
            this.zjRules = {"off": Number(obj.plummetString)}
          }
          this.promotion = obj
          if (this.flag == 1) {
            // 初始化时间
            this.initDate();
          }
        }
      })
    },

    /**
     * 5001 创建促销活动
     */
    createPromotionActivity() {
      this.$promotionlib.createPromotion(this.promotion, (err, obj) => {
        if (err) { return this.$toast(err) }
        this.$toast('创建成功')
        // this.$router.go(-1)
        // status: {0:待审核 1:进行中 2:已过期 3:审核不通过 4:待进行 all:全部}
        // this.$router.push({name: '12.1', params: {status: '0'}})
        this.$router.go(-2)
      })
    },

    /**
     * 5005-更新商品促销活动
     */
    updatePromotionActivity() {
      this.promotion.activityId = this.promotionId;
      this.$promotionlib.updatePromotionInfo(this.promotion, (err, obj) => {
        if (err) { return this.$toast(err) }
        this.$toast('更新成功')
        // this.$router.push({name: '12.1', params: {status: '0'}})
        this.$router.go(-2)
      })
    },
  },
  watch: {

  },
  computed: {
    title: function() {
      if (this.promotionId) {
        return '编辑促销活动'
      } else {
        return '创建促销活动'
      }
    },
    ruleNameStr: function() {
      let val = this.promotion.typeId;
      if (val == 0) {
        return '满额减'
      } else if (val == 1) {
        return '满件折'
      } else if (val == 2) {
        return '限时直降'
      } else if (val == 3) {
        return '指定折'
      }
    },
    promotionModeStr: function() {
      let val = this.promotion.promotionMode;
      if (val == 0) {
        return '普通促销'
      } else if (val == 1) {
        return '特殊促销'
      }
    },
    ruleModeStr: function() {
      let val = this.promotion.ruleMode;
      if (val == 1) {
        return '叠加'
      } else if (val == 2) {
        return '阶梯'
      } else if (val == 3) {
        return '指定折扣'
      } else if (val == 4) {
        return '直减金额'
      } else {
        return '阶梯'
      }
    },
    bindStr: function() {
      let val = this.bindingType;
      if (val == 1) {
        return ''
      } else if (val == 2) {
        return ''
      } else if (val == 3) {
        return ''
      }
    },
  }

};
</script>
