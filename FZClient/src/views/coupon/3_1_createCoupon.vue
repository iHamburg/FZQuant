<style lang="scss" src="src/sass/createCoupon.scss" scoped></style>
<template>
  <div id="app">
    <bl-bar barStyle="bar-dark-linear">
      <div class="button" slot="left-button" @click="$router.go(-1)">
        <div class="iconfont arrow-back"><i class="fback">返回</i></div>
      </div>
      <div slot="title">{{title}}</div>
    </bl-bar>

    <div class="content">
        <div class="coupon-list">
            <ul>
                <li>
                    <div class="list-1">
                        <div class="le-name">券名称</div>
                        <div class="ri-yundian le-wd">
                          <input type="text" placeholder="20个字符可包括中文/字母/数字" v-model.trim="item.couponName">
                        </div>
                    </div>
                    <div class="list-1 line">
                        <div class="le-name">券描述</div>
                        <div class="le-fonts le-wd">
                          <textarea placeholder="请输入描述券用途" v-model.trim="item.couponDesc"></textarea>
                        </div>
                    </div>
                </li>

                <li>
                    <div class="list-1">
                        <div class="le-name">券有效期开始时间</div>
                        <div class="le-check-right" @click="openPicker('start')">
                            <span>{{ startDate }}</span>
                            <i class="iconfont arrow-back"></i>
                        </div>
                    </div>
                    <div class="list-1 line">
                        <div class="le-name">券有效期结束时间</div>
                        <div class="le-check-right" @click="openPicker('end')">
                            <span>{{ endDate }}</span>
                            <i class="iconfont arrow-back"></i>
                        </div>
                    </div>
                </li>
                <li>
                    <div class="list-1">
                        <div class="le-name">最大发放数量(张)</div>
                        <div class="ri-yundian">
                          <!-- <input type="number" placeholder="输入张数" v-model.trim="item.maxNum"> -->
                          <currency-input v-model="item.maxNum" placeholder="请输入张数" inputType="2"></currency-input>
                        </div>
                    </div>
                    <div class="list-1">
                        <div class="le-name">每人限领总数(张)</div>
                        <div class="ri-yundian">
                          <!-- <input type="number" placeholder="输入张数" v-model.trim="item.maxNumPerUser"> -->
                          <currency-input placeholder="请输入张数" v-model="item.maxNumPerUser" inputType="2"></currency-input>
                        </div>
                    </div>
                    <div class="list-1 line">
                        <div class="le-name">每人每天限领(张)</div>
                        <div class="ri-yundian">
                          <!-- <input type="number" placeholder="输入张数" v-model.trim="item.maxNumPerUserDay"> -->
                          <currency-input placeholder="请输入张数" v-model="item.maxNumPerUserDay" inputType="2"></currency-input>
                        </div>
                    </div>
                </li>
            </ul>
        </div>
    </div>

    <!-- 组件 -->
<!--     <bl-actionsheet :actions="actions" v-model="sheetVisible" @thisValue="returnVal" @cancel="returnSheet"></bl-actionsheet> -->

    <!--  日期选择器 -->
<!--    <bl-datetime-picker ref="picker" type="date" :toolbarSubText="toolbarSubText"
    year-format="{value}年"
    month-format="{value}月"
    date-format="{value}日"
    v-model="item.date" @confirm="returnDate">
    </bl-datetime-picker> -->
    <!-- 时间选择器 -->
    <bl-mtdate-picker ref="picker" class="saletime" type="date" :toolbarSubText="toolbarSubText"
    year-format="{value}年"
    month-format="{value}月"
    date-format="{value}日" @confirm="returnDate" v-model="pickerValue">
    </bl-mtdate-picker>
<!--     <bl-datetime-picker ref="picker2" type="date" :toolbarSubText="toolbarSubText"
                        year-format="{value}年"
                        month-format="{value}月"
                        date-format="{value}日"
                        v-model="enableTimeTo" @confirm="returnDate">
    </bl-datetime-picker> -->

    <!-- <bl-button type="primary" @click="onSubmit">提交</bl-button> -->
    <!-- 底部按钮 -->
    <div class="editgress">
      <button class="button1" @click="onSubmit" @touchstart="">提交</button>
    </div>
  </div>
</template>
<script>
  import utils from 'src/utils';
  import networklib from 'src/libs/networklib';
  import merchantlib from 'src/libs/merchantlib';
  export default {
    name: 'createCoupon',
    components: {
      'BlMtdatePicker': () => System.import('components/cloud-merchant/mtdate-picker'),
      'currency-input': () => System.import('components/currency-input')
    },

    data () {
      return {
        title: '创建礼品券',
        startDate: '请选择开始时间',
        endDate: '请选择结束时间',
        // typeCoupon: '请选择',
        pickerValue: false,
        // currentValue: false,
        // sheetVisible: false,
        toolbarSubText: '',
        actions: [{
          name: '礼品券'
        }, {
          name: '优惠券'
        }],
        // enableTimeFrom: '',
        // enableTimeTo: '',
        item: {
          commercialCode: null, // 业态编码
          commercialName: null, // 业态名称
          storeCode: null, // 门店编码
          storeName: null, // 门店名称
          merchantId: null, // 商户id
          merchantName: null, // 商户名称
          couponName: '',
          couponDesc: '',
          enableTimeFrom: '',
          enableTimeTo: '',
          maxNum: null,
          maxNumPerUser: null,
          maxNumPerUserDay: null
        }
      }
    },
    mounted() {
      // 用户登陆相关信息.
      this.item.commercialCode = merchantlib.getCommercialCode(); // 业态编码
      this.item.commercialName = merchantlib.getCommercialName();// 业态名称
      this.item.merchantId = merchantlib.getMerchantId();// 商户id
      this.item.merchantName = merchantlib.getMerchantName();// 商户名称
      this.item.storeCode = merchantlib.getStoreCode();// 门店编码
      this.item.storeName = merchantlib.getStoreName();// 门店名称
//      console.log('建券商户id:', this.item.merchantId)
      console.log('this.startDate:', this.startDate)
      console.log('this.endDate:', this.endDate)
    },
    methods: {
      openPicker(time) {  // 打开
        (time === 'start') ? (this.toolbarSubText = '选择券有效开始时间') : (this.toolbarSubText = '选择券有效结束时间');
        if (time === 'start') {
          this.$refs.picker.open();
        } else {
          this.$refs.picker.open();
        }
        let body = document.querySelectorAll('.saletime .picker-slot')
        body[0].style.flex = '1 1 6%'
      },
      // returnSheet(parameter) {
      //   (parameter === false) ? (this.typeCoupon = '请选择') : (this.typeCoupon)
      // },
      // returnVal(parameter) {
      //   (parameter !== undefined) ? (this.typeCoupon = parameter) : (this.typeCoupon = '请选择')
      // },
      // closeInit(e, param) {
      //   if (e.currentTarget.value.length > 0) {
      //     (param === 'ifname') ? (this.ifName = true) : (this.ifName);
      //     (param === 'ifdesc') ? (this.ifDesc = true) : (this.ifDesc);
      //   }
      // },
      // clearInit(e, param) {
      //   if (param === 'ifname') {
      //     this.ifName = false;
      //     this.initVals.name = '';
      //   }
      //   if (param === 'ifdesc') {
      //     this.ifDesc = false;
      //     this.initVals.desc = '';
      //   }
      // },
      returnDate(param) {
        console.log('时间param:', param)
        if (this.toolbarSubText === '选择券有效开始时间') {
          // (param instanceof Date) ? (this.startDate = param.getFullYear() + '-' + ~~(param.getMonth() + 1) + '-' + param.getDate()) : (this.startDate = '请选择')
          (param instanceof Date) ? (this.startDate = this.$utillib.fmtDate(param, 'yyyy-MM-dd')) : (this.startDate = '请选择开始时间')
        }
        console.log('时间startDate:', this.startDate)
        if (this.toolbarSubText === '选择券有效结束时间') {
          // (param instanceof Date) ? (this.endDate = param.getFullYear() + '-' + ~~(param.getMonth() + 1) + '-' + param.getDate()) : (this.endDate = '请选择')
          (param instanceof Date) ? (this.endDate = this.$utillib.fmtDate(param, 'yyyy-MM-dd')) : (this.endDate = '请选择结束时间')
        }
        console.log('时间endDate:', this.endDate)
      },
      // 提交
      onSubmit() {
        if (this.item.couponName === "") {
          this.$toast('请输入券名称')
          return false
        }

        if (this.item.couponDesc === "") {
          this.$toast('请输入描述券用途')
          return false
        }

        if (this.startDate == '请选择开始时间') {
          this.$toast('请选择开始时间')
          return false
        }
        if (this.endDate == '请选择结束时间') {
          this.$toast('请选择结束时间')
          return false
        }

        if (this.startDate > this.endDate) {
          this.$toast('券有效期结束时间必须大于开始时间');
          return false;
        }

        let now_Date = utils.fmtDate(new Date(), 'yyyy-MM-dd');
        if (this.startDate < now_Date) {
          this.$toast('券有效期开始时间必须晚于当前时间');
          return false;
        }

        if (this.endDate < now_Date) {
          this.$toast('结束时间不能早于当前时间');
          return false;
        }

        if (this.item.maxNum === null) {
          this.$toast('请输入最大发放数量')
          return false;
        }

        if (this.item.maxNumPerUser === null) {
          this.$toast('请输入每人限领总数')
          return false;
        }

        if (this.item.maxNumPerUserDay === null) {
          this.$toast('请输入每人每天限领数')
          return false;
        }

        if (this.item.maxNumPerUser < this.item.maxNumPerUserDay) {
          this.$toast('每人每天限领张数不能大于每人限领总张数');
          return false;
        }

        if (this.item.maxNumPerUser > this.item.maxNum) {
          // console.log('this.item.maxNumPerUser:', typeof (this.item.maxNumPerUser))
          // console.log('this.item.maxNum:', typeof (this.item.maxNum))
          this.$toast('每人限领总数不能大于最大发放数量');
          return false;
        }

        if (this.item.maxNum < this.item.maxNumPerUserDay) {
          this.$toast('每人每天限领张数不能大于最大发放数量');
          return false;
        }
        // this.item.enableTimeFrom = start + ' 00:00:00';
        // this.item.enableTimeTo = end + ' 23:59:59';
        // console.log('start:', start)
        // console.log('end:', end)
        // if (this.item.couponName === "" || this.item.couponDesc === "" || this.item.enableTimeFrom === "NaN-aN-aN 00:00:00" ||
        //   this.item.enableTimeTo === "NaN-aN-aN 23:59:59" || this.item.maxNum === "" || this.item.maxNumPerUser === "" ||
        //   this.item.maxNumPerUserDay === "") {
        //   this.$toast('请输入完整信息');
        //   return;
        // }
        // 日期格式化
        this.item.enableTimeFrom = utils.fmtDate(new Date(this.startDate.replace(/-/g, "/")), 'yyyy-MM-dd 00:00:00');
        this.item.enableTimeTo = utils.fmtDate(new Date(this.endDate.replace(/-/g, "/")), 'yyyy-MM-dd 23:59:59');

        console.log('建券入参 ', JSON.stringify(this.item));
        let apiId = 'CM1005';
        networklib.post(apiId, this.item).then((obj) => {
//          console.log('成功的回调', obj);
          var self = this;
          self.$toast('创建成功')
          window.setTimeout(function() {
            self.$router.push({path: '/coupons/assignList'});
          }, 2000);
        }, (err) => {
          this.$toast('创建失败')
          console.log('失败的回调', apiId, err);
        })
      }
    }

  }
</script>
