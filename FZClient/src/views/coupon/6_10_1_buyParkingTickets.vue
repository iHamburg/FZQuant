<style lang="scss" src="src/sass/parkinglot.scss" scoped></style>
<template>
  <div class="content-parking">

    <bl-bar barStyle="bar-dark-linear">
      <div class="button" slot="left-button" @click="$router.go(-1)">
        <div class="iconfont arrow-back"><i class="fback">返回</i></div>
      </div>
      <div slot="title">购买停车券</div>
    </bl-bar>

    <div class="mark-box" style="overflow-y: auto">
      <div class="check-content buybox" v-for="(item, index) in itemcards">
        <div class="checkbox">
          <div class="check-card">
            <div class="card">{{ item.couponValue }}{{ item.couponUnit }}
              <span>{{ item.couponType }}</span>
            </div>
            <dl>
              <dt>{{ item.couponTitle }}</dt>
              <dd>{{ item.effectDays }}</dd>
              <dd class="countbox">
                <div class="count">
                  <em class="reduce" @touchstart="reduce(index)">-</em>
                  <currency-input  v-model="item.count"  inputType="2" inputWidth="width:54%" maxNumber='1000' @blur.native="inputBlur(item)"></currency-input>
                  <!--<input type="tel" v-model="item.count">-->
                  <em class="add" @touchstart="add(index)">+</em>
                </div>
                <div class="max">
                  <p class="blue">&yen;{{ item.money }}</p>
                  <p>最多购买{{ item.couponMaxnum }}张</p>
                </div>
              </dd>
            </dl>
          </div>
          <div class="bot">
            <i>无门槛</i>
            <i>限{{ couponRestrictedStore }}</i>
            <button v-if="item.couponMaxnum > 0" class="buy" @click="buyParking(index)">立即购买</button>
            <button v-else :disabled="true" class="buy">立即购买</button>
          </div>
        </div>
      </div>
      <div>
        <img v-if="display" src="static/images/Rectangle37@2x.png" class="nodata">
      </div>
    </div>

  </div>

</template>


<script>
  import crypto from 'src/libs/cryptolib'
  export default {
    name: 'buyParking',

    components: {
      'BlCheckBox': () => System.import('components/cloud-merchant/check-box'),
      'currency-input': () => System.import('components/currency-input')
    },

    data () {
      return {
        couponRestrictedStore: '',
        itemcards: [
//          {
//            'couponTemplateId': '02131',  //券模版id
//            'couponTitle': '百联商城停车券',   //券名称
//            'couponType': '停车券',   //券类型
//            'couponTypeId': '1',  //券类型id
//            'couponUnit': '小时',   //券单位
//            'couponUnitPrice': '10',  //单张券价格
//            'couponValue': '2',  //券的面值
//            'couponMaxnum': '1000',  //最大库存
//            'couponMaxnumDay': '1000',  //每天最大购买量
//            'couponDesc': '领取后7天有效', //券描述
//            'count': 0, //购买数量
//            'money': '0', //购买的金额
//            'effectDays': '领取后7天有效',  //券领取后有效天数
//          }
        ],
      };
    },

    activated() {
    },
    created() {
      document.body.scrollTop = 0;
      this.couponRestrictedStore = this.$merchantlib.getStoreName();
      this.queryCanBuyparkingList();
    },

    methods: {
      add(index) {
        if (this.itemcards[index].count < 1000) {
          this.itemcards[index].count++
        } else {
          this.itemcards[index].count = 1000;
        }
      },
      reduce(index) {
        if (this.itemcards[index].count >= 1) {
          this.itemcards[index].count --
        }
      },
      inputBlur(item) {
        if (item.count < 1) {
          item.count = 0;
        }
      },
      buyParking(index) {
        console.log('index -- ', index)
        if (this.itemcards[index].count < 1) {
          return this.$toast('至少需要购买一张停车券');
        } else if (this.itemcards[index].count > 1000) {
          return this.$toast('最多只能购买1000张！');
        }
        var params = {'couponTempId': this.itemcards[index].couponTemplateId, 'hours': this.itemcards[index].couponValue, 'num': this.itemcards[index].count}
        params['amt'] = this.itemcards[index].money;
        this.creatParkingCouponOrder(params, this.itemcards[index].money);
      },
      // 能购买的停车券列表
      queryCanBuyparkingList() {
        this.$orderlib.shopCanBuyParkingTemplateList({'pageNum': '1', 'pageSize': '1000'}, (err, obj) => {
          if (err) {
            // return this.$toast(err)
          }
          // console.log('obj list:', obj)
          if (obj) {
            var dataList = [];
            obj.list.forEach((item) => {
              var data = {'couponTemplateId': item.couponTemplateId, 'couponTitle': item.couponTitle, 'couponType': item.couponType, 'couponTypeId': item.couponTypeId, 'couponValue': item.couponValue, 'couponMaxnum': '1000', 'couponMaxnumDay': item.couponMaxnumDay, 'count': 0, 'money': '0'};
              data.couponUnitPrice = item.couponUnitPrice;
//              data.couponUnitPrice = '4.5';
              if (item.couponUnit == '0') {
                data.couponUnit = '小时';
              } else {
                data.couponUnit = '元';
              }
              //console.log('item -- ', item)
              if (item.effectDays && item.effectDays > 0) {
                data.effectDays = '领取后' + item.effectDays + '天有效'
              } else {
                data.effectDays = '领取后0天有效'
              }
              dataList.push(data);
            });
            this.itemcards = dataList;
          }
        });
      },
      //创建购买停车券订单
      creatParkingCouponOrder(param, amt) {
        this.$orderlib.queryCreatParkingOrder(param, (err, obj) => {
          if (err) {
            return this.$toast(err)
          }
          console.log('creatParkingCouponOrder--- ', obj)  //obj.orderCode SIT482801445264
          if (!obj) {
            return
          }
          this.payOrder({'MerOrderNo': obj.orderCode, 'OrderAmt': amt})
          //this.payOrder({'MerOrderNo': 'SIT482801445264', 'OrderAmt': '92.8'})
        })
      },
      //订单付款
      payOrder(param) {
//        param.TranDate = '20170928';
//        param.TranTime = '151019';
        param.TranDate = this.$utillib.getLocalDate('');
        param.TranTime = this.$utillib.getLocalTime('');
        param.MerId = '000090150504239'
        param.memberId = this.$merchantlib.getMemberId();
//        param.MerId = '000090150504231'
//        param.memberId = '100000002714184';
        param.DiscountAmt = param.OrderAmt
        param.orderExpiryEndTime = '120'
        param.MarAfterUrl = '/blomni-o2o/oms/parkOrder/paymentCall?orderNo=' + param.MerOrderNo
        param.orderUrl = '/coupon/buyParking/result?result=0&orderNo=' + param.MerOrderNo + '&price=' + param.OrderAmt
        //param.passwordUrl = '//m.st.bl.com/h5-web/member/forgetPassword.do'
        param.mainUrl = '/'
        param.MarFrontUrl = '/coupon/buyParking/result?result=1&orderNo=' + param.MerOrderNo + '&price=' + param.OrderAmt
        param.MarAfterUrl = this.$utillib.getMarAfterUrlHOST() + param.MarAfterUrl
        param.orderUrl = this.$utillib.getHOST() + param.orderUrl
        param.mainUrl = this.$utillib.getHOST() + param.mainUrl
        param.MarFrontUrl = this.$utillib.getHOST() + param.MarFrontUrl

        var dddd = crypto.encryptSignPark(param, param.TranDate + param.TranTime)
        console.log('---- ss  ', dddd)
        param.Signature = dddd
        //param.Signature = 'bb6168835c7ad5f6'
        var httpHost = this.$utillib.getParkPayHOST();

        param.MarAfterUrl = this.$utillib.parkPayUrlEncode(param.MarAfterUrl)
        param.orderUrl = this.$utillib.parkPayUrlEncode(param.orderUrl)
        param.mainUrl = this.$utillib.parkPayUrlEncode(param.mainUrl)
        param.MarFrontUrl = this.$utillib.parkPayUrlEncode(param.MarFrontUrl)
        //param.passwordUrl = this.$utillib.parkPayUrlEncode(param.passwordUrl)

        var encode = crypto.getSignPlaintext(param, '&')
        console.log('encode', encode)
        httpHost = httpHost + encode;
        console.log('http --', httpHost)
        window.location.href = httpHost;
      },
    },
    watch: {
      itemcards: {
        //注意：当观察的数据为对象或数组时，curVal和oldVal是相等的，因为这两个形参指向的是同一个数据对象
        handler(curVal) {
         // console.log(curVal, '-------')
          curVal.forEach((item) => {
            if (item.count < 1) {
              item.money = '0.00'
            } else {
              var money = (item.count * item.couponUnitPrice).toString();
              if (money.indexOf('.') == -1) {
                item.money = money + '.00';
              } else {
                //console.log('---- ' + money.indexOf('.') + '---- ' + money.length)
                if (money.indexOf('.') == money.length - 2) {
                  item.money = money + '0';
                } else {
                }
              }
            }
          })
        },
        deep: true
      }
    },
    computed: {
      display: function() {
        if (this.itemcards.length <= 0) {
          return true
        } else {
          return false
        }
      }
    }

  }
</script>
