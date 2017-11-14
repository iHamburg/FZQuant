<!--发货-->
<style lang="scss" src="src/sass/sendgoods.scss" scoped></style>
<template>
  <div class="content">

    <bl-bar barStyle="bar-dark-linear">
        <div class="button" slot="left-button" @click="$router.go(-1)">
          <div class="iconfont arrow-back"><i class="fback">返回</i></div>
        </div>
        <div slot="title">发货</div>
    </bl-bar>

    <section class="sendgood">

        <div class="send">
            <i></i>
            <dl>
              <dt>{{ storeName }} <span class="tel"> {{ queryParam.j_tel }} </span></dt>
              <dd>{{ queryParam.j_address }}</dd>
            </dl>
        </div>

        <div class="take">
            <i></i>
            <dl>
              <dt>{{ queryParam.d_contact }} <span class="tel">{{ queryParam.d_tel | plusXing-util}}</span></dt>
              <!-- <dd>{{ queryParam.d_address  }}</dd> -->
            </dl>
        </div>

        <div class="sendbox-middle">
            <div @click="popupWeight = !popupWeight">
              <span>物品重量</span>
              <b v-if="queryParam.weight == null">0KG</b>
              <b v-else>{{ showWeight }}KG</b>
            </div>
            <div @click="popupName = !popupName">
              <span>物品名称</span>
              <b v-if="express.Gname.checkName">{{ express.Gname.checkName }}</b>
              <b class="none" v-else>未选择</b>
            </div>
        </div>

        <div class="sendbox">
            <div>
                <span>付款方式</span>
                <b>{{ express.Gpay }}</b>
            </div>
            <div @click="popupDate = !popupDate">
                <span>揽件时间</span>
                <b class="none" v-if="express.Gtime.checkDate">{{ express.Gtime.checkDate }}</b>
                <b class="none" v-else>未选择</b>
            </div>
            <div>
                <span>客户派件时间要求</span>
                <b>{{ sendRequire }}</b>
            </div>
            <div @click="popupNote = !popupNote">
                <span>对小哥说</span>
                <b v-if="express.Gnotes.checkNote">{{ express.Gnotes.checkNote }}</b>
                <b class="none" v-else>选填</b>
            </div>
        </div>

        <div class="sendbox-date">
            <span>配送类型</span>
            <p>
                <em class="ml">{{ express.Gtype.name }}</em>
            </p>
        </div>

        <div class="goodedit">
            <div class="checkbox">
                <p>预估费用  <span class="red">¥{{ carriageMoney }}</span></p>
                <!-- <div class="checkradio" :class="{'check': isAgree}"><i @click="isAgree = !isAgree"></i>同意 <a>《快件契约条款》</a></div> -->
            </div>

            <button :disabled="!disabled" @click="deliverGoods()">确认发货</button>
        </div>

    </section>

    <!-- 物品重量 -->
    <mt-popup v-model="popupWeight" position="bottom" class="mint-popup pop-weight" style="width:100%">
        <div class="title">物品重量 <span class="cancel" @click="popupWeight = !popupWeight">取消</span></div>
        <div class="box-content">
          <p v-if="queryParam.weight == null">订单商品共计 0KG</p>
          <p v-else>订单商品共计 {{ queryParam.weight }}KG</p>
          {{ this.countText }}
        </div>
    </mt-popup>

    <!-- 对小哥说 -->
    <mt-popup v-model="popupNote" position="bottom" class="mint-popup" style="width:100%">
        <div class="title">对小哥说 <span class="cancel" @click="popupNote = !popupNote">取消</span></div>
          <p class="groom">常用</p>
          <div class="box-tag">
            <div class="line">
              <div class="tags">
                <span v-for="(key, val) in express.Gnotes.mentNotes" :class="{'on': key.ischeck}" @click="checks(key, val, 1)">{{ key.name }}</span>
              </div>
            </div>
          </div>
          <bl-comli>
              <div slot='left-text' class="left-box">其他要求</div>
              <div slot='right-text' class="right-box">
                <div class="right-l">
                  <input type="text" name="notes" maxlength="10" placeholder="输入最多10个字（选填）" ref="GnoteVal" v-model="otherRemark">
                </div>
              </div>
          </bl-comli>
          <bl-button  @click="submitTemp('popupNote')">确定</bl-button>
    </mt-popup>

    <!-- 揽件时间 -->
    <mt-popup v-model="popupDate" position="bottom" class="mint-popup" style="width:100%">
        <div class="title" style="margin:0">揽件时间 <span class="cancel" @click="popupDate = !popupDate">取消</span></div>
        <div class="box-tag">
          <div class="line">
            <div class="tags">
              <span class="day" v-for="(key, val) in express.Gtime.date" :class="{'on': key.ischeck}" @click="checks(key, val, 2)">
                  {{ key.name }}<div>{{ key.time }}</div>
              </span>
            </div>
          </div>
        </div>
        <p class="groom">上午</p>
        <div class="box-tag">
          <div class="line">
            <div class="tags">
              <span v-for="(key, val) in express.Gtime.time" v-bind:class="{'default': key.isdefault, 'on': key.ischeck}" @click="checks(key, val, 3)" v-if="val <= 3">{{ key.name }}</span>
            </div>
          </div>
        </div>
        <p class="groom">下午</p>
        <div class="box-tag">
          <div class="line">
            <div class="tags">
              <span v-for="(key, val) in express.Gtime.time" :class="{'default': key.isdefault, 'on': key.ischeck}" v-if="val > 3" @click="checks(key, val, 3)">{{ key.name }}</span>
            </div>
          </div>
        </div>
        <bl-button @click="submitTemp('popupDate')">确定</bl-button>
    </mt-popup>

    <!-- 物品名称 -->
    <mt-popup v-model="popupName" position="bottom" class="mint-popup" style="width:100%">
        <div class="title">物品名称 <span class="cancel" @click="popupName = !popupName">取消</span></div>
          <p class="groom">推荐以下名称</p>
          <div class="box-tag">
            <div class="line">
              <div class="tags">
                <span v-for="(key, val) in express.Gname.mentNames" :class="{'on': key.ischeck}" @click="checks(key, val, 0)">{{ key.name }}</span>
              </div>
            </div>
          </div>
          <bl-comli>
              <div slot='left-text' class="left-box">其他名称</div>
              <div slot='right-text' class="right-box">
                <div class="right-l">
                  <input type="text" name="names" maxlength="10" placeholder="输入其他名称（最多10个字）" ref="GnameVal" v-model="goodsName">
                </div>
              </div>
          </bl-comli>
          <bl-button @click="submitTemp('popupName')">确定</bl-button>
    </mt-popup>
  </div>
</template>

<script>
export default {
  name: 'sendgood',

  components: {
  },
  data () {
    return {
      storeName: null, //门店名称
      carriageMoney: null, // 运费
      myTime: null, //时分
      otherRemark: '', // 其他要求(备注)
      goodsName: '', // 其他要求(物品名称)
      queryParam: {
        d_address: null,      // 收货地址
        d_contact: null,      // 收件人
        d_tel: null,          // 收件人电话
        deliveryClaim: null,  // 收货要求
        deliveryType: '顺丰',   // 配送类型
        goodName: null,       // 物品名称
        j_address: null,      // 寄件地址
        j_tel: null,          // 商家电话
        orderNo: null,        // 订单号
        remark: null,         // 对小哥说
        sendstarttime: null,  // 揽件时间
        weight: 0,
      },
      isAgree: true,
      popupWeight: false,
      popupNote: false,
      popupDate: false,
      popupName: false,
      countText: '温馨提示：物品重量是指该订单的预估重量，由单个商品的重量乘件数后加总得出。通过该重量和用户的地址估出的“预估费用”仅做参考，实际快递费用以物流揽件员实际收取的为准。该费用不向客户展示，仅做内部参考。',
      // 发货参数
      express: {
        Gname: {
          checkName: '',
          mentNames: [
            {name: '男装', ischeck: false},
            {name: '女装', ischeck: false},
            {name: '男鞋', ischeck: false},
            {name: '女鞋', ischeck: false},
            {name: '内衣', ischeck: false},
            {name: '袜子', ischeck: false},
            {name: '配饰', ischeck: false},
            {name: '箱包', ischeck: false},
          ]
        },
        Gpay: '寄件人付',
        Gtime: {
          checkDate: '',
          date: [
            {name: '今天', time: '5月24日', ischeck: false},
            {name: '明天', time: '5月25日', ischeck: false},
            {name: '后天', time: '5月26日', ischeck: false}
          ],
          time: [
            {'name': '09:00', ischeck: false, isdefault: false},
            {'name': '10:00', ischeck: false, isdefault: false},
            {'name': '11:00', ischeck: false, isdefault: false},
            {'name': '12:00', ischeck: false, isdefault: false},
            {'name': '13:00', ischeck: false, isdefault: false},
            {'name': '14:00', ischeck: false, isdefault: false},
            {'name': '15:00', ischeck: false, isdefault: false},
            {'name': '16:00', ischeck: false, isdefault: false},
            {'name': '17:00', ischeck: false, isdefault: false},
            {'name': '18:00', ischeck: false, isdefault: false},
          ]
        },
        Gnotes: {
          checkNote: '',
          mentNotes: [
            {name: '请带箱子', ischeck: false},
            {name: '请带胶带', ischeck: false},
            {name: '请带运单', ischeck: false},
            {name: '需要爬楼', ischeck: false},
            {name: '大件物品', ischeck: false},
            {name: '易碎物品', ischeck: false}
          ]
        },
        Gtype: {
          name: '顺丰',
        },
      },
      dateparam: '',
      timeparam: '',
      currentTime: '', //当前系统时间：时分
      showWeight: '', // 单位kg
    }
  },
  mounted() {
    this.queryParam.orderNo = this.$route.params.orderNo
    this.storeName = this.$merchantlib.getStoreName() //门店名称
    // 查询订单详情
    this.queryOrderDetail(this.queryParam.orderNo)
    let self = this
    this.express.Gtime.date.map(function(val, index) {
      if (index == 0) {
        val.time = self.getSystemTime(0, 0)
      }
      if (index == 1) {
        val.time = self.getSystemTime(1, 0)
      }
      if (index == 2) {
        val.time = self.getSystemTime(2, 0)
      }
    })

    if (this.express.Gname.checkName != '') {
      this.disabled = false
    }
  },
  methods: {
    queryOrderDetail(orderNo) {
      this.$orderlib.queryOrder(orderNo, (err, obj) => {
        if (err) {
          this.$toast(err)
        }
        if (obj) {
          this.queryParam.d_tel = obj.consigneePhone //收件人电话
          this.queryParam.d_contact = obj.consigneeName // 收件人
          this.queryParam.d_address = obj.consigneeAddress // 收货地址
          this.showWeight = obj.goodAllWeight / 1000 // 重量
          this.queryParam.deliveryClaim = obj.deliveryTime  // 收货要求
          this.carriageMoney = obj.carriageMoney //运费
          // 获取商户寄件地址(和提货地址为同一个)
          this.queryParam.j_address = this.$merchantlib.getMerchantPickupAddress()
          this.queryParam.j_tel = this.$merchantlib.getMerchantMercPhone() // 商家电话
        }
      })
    },
    //获取向前推的日期 AddDayCount：向前推进天数 flag：用于区分用途 0：返回月日 1：返回年月日
    getSystemTime(AddDayCount, flag) {
      let myDate = new Date();
      myDate.setDate(myDate.getDate() + AddDayCount)
      let fullYear = myDate.getFullYear();
      let myMonth = myDate.getMonth() + 1;
      let myDay = myDate.getDate();
      let myHours = myDate.getHours();
      let myMinutes = myDate.getMinutes();
      this.myTime = myHours + ':' + myMinutes
      this.currentTime = this.$utillib.fmtDate(myDate, 'hh:mm')
      if (flag == 0) {
        return myMonth + '月' + myDay + '日'
      }
      if (flag == 1) {
        return fullYear + '-' + myMonth + '-' + myDay
      }
    },

    submitTemp(type) {
      if (type == 'popupName') {
        let val = this.queryParam.goodName
        this.popupName = false
        if (val) {
          this.express.Gname.checkName = val + this.goodsName
        } else {
          if (this.express.Gname.checkName == null || this.express.Gname.checkName == '') {
            this.popupName = true
            this.$toast('请输入物品名称')
          }
        }
      }
      if (type == 'popupNote') {
        let len = this.express.Gnotes.mentNotes;
        let str = ''
        for (let i = 0; i < len.length; i += 1) {
          if (len[i].ischeck == true) {
            console.log()
            str += len[i].name
          }
        }
        this.queryParam.remark = str + this.otherRemark
        this.express.Gnotes.checkNote = this.queryParam.remark
        console.log('对小哥说选项：', str, '对小哥说其他要求：', this.express.Gnotes.checkNote)
        this.popupNote = false
        if (this.queryParam.remark == '') {
          this.popupNote = true
          this.$toast('请输入对小哥说')
        }
      }
      if (type == 'popupDate') {
        if (this.dateparam == '') {
          this.$toast('请选择日期')
          this.popupDate = true
        } else if (this.timeparam == '') {
          this.$toast('请选择时间点')
          this.popupDate = true
        } else if (this.dateparam || this.timeparam) {
          this.express.Gtime.checkDate = this.dateparam + '' + this.timeparam
          if (this.dateparam == '今天') {
            this.getSendstarttime(0, 1)
          }
          if (this.dateparam == '明天') {
            this.getSendstarttime(1, 1)
          }
          if (this.dateparam == '后天') {
            this.getSendstarttime(2, 1)
          }
          this.popupDate = false
        } else {
          this.express.Gtime.checkDate = ''
        }
      }
    },
    // 获取揽件时间
    getSendstarttime(addCount, flag) {
      this.queryParam.sendstarttime = this.getSystemTime(addCount, flag) + ' ' + this.timeparam + ':00'

      return this.queryParam.sendstarttime
    },
    checks (key, val, type) {
      // 0:物品名称 1:小哥 2:日期 3:time
      if (type == 0) {
        let len = this.express.Gname.mentNames;
        for (let i = 0; i < len.length; i += 1) {
          len[i].ischeck = false
        }
        key.ischeck = true
        this.queryParam.goodName = key.name
      }
      if (type == 1) {
        console.log('key', key)
        let len = this.express.Gnotes.mentNotes;
        if (key.ischeck) {
          key.ischeck = false
        } else {
          key.ischeck = true
        }
        this.queryParam.remark = key.name
      }
      // 2：日期
      if (type == 2) {
        let len = this.express.Gtime.date;
        for (let i = 0; i < len.length; i += 1) {
          len[i].ischeck = false
        }
        key.ischeck = true
        if (key.name == this.dateparam) {
          return
        }
        this.dateparam = key.name
        if (this.dateparam == '今天') {
          let time = this.currentTime
          if (time == this.currentTime) {
            this.checkTime(key)
          }
        } else {
          this.init()
        }
        this.timeparam = ''
      }
      // 3: 时间点
      if (type == 3) {
        console.log('key', 'key.ischeck', key.ischeck, 'key.isdefault', key.isdefault)
        let len = this.express.Gtime.time;
        if (key.isdefault) {
          return
        }
        for (let i = 0; i < len.length; i += 1) {
          len[i].ischeck = false
        }
        key.ischeck = true
        this.timeparam = key.name
      }
    },
    // 判断时间点是否小于当前系统时间，如果小于置灰并且不能选择
    checkTime(key) {
      console.log('key', key)
      let len = this.express.Gtime.time;
      for (let i = 0; i < len.length; i += 1) {
        if (len[i].name < this.currentTime) {
          //置灰
          len[i].isdefault = true
        } else {
          len[i].isdefault = false
        }
      }
    },
    // 初始化  清空揽件时间点
    init() {
      let len = this.express.Gtime.time;
      for (let i = 0; i < len.length; i += 1) {
        len[i].isdefault = false
        len[i].ischeck = false
      }
    },
    // 确认发货
    deliverGoods() {
      if (this.queryParam.weight == null) {
        this.queryParam.weight = 0
      }
      this.queryParam.weight = this.showWeight * 1000
      console.log('queryParam ', this.queryParam);
      this.$orderlib.orderDelivery(this.queryParam, (err, obj) => {
        console.log('发货参数：', JSON.stringify(this.queryParam))
        if (err) {
          this.$toast('发货失败', err)
        } else {
          this.$toast('发货成功')
          // 延长两秒再去跳转
          setTimeout(() => {
            this.$router.go(-1)
          }, 2000)
        }
      })
    },
  },
  computed: {
    disabled () {
      //&& this.express.Gnotes.checkNote   对小哥说   暂时不是必填字段
      console.log('发货参数揽件时间：', this.express.Gtime.checkDate, '发货参数物品名称：', this.express.Gname.checkName)
      return this.express.Gtime.checkDate && this.express.Gname.checkName
    },
    //用于展示 客户派件时间要求  0-双休日工作日均可 1-双休日 2-工作日
    sendRequire() {
      if (this.queryParam.deliveryClaim == 0) {
        return '双休日工作日均可'
      }
      if (this.queryParam.deliveryClaim == 1) {
        return '双休日'
      }
      if (this.queryParam.deliveryClaim == 2) {
        return '工作日'
      }
    },
  },
}
</script>
