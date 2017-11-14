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
              <dt>{{ Faddress.name }} <span class="tel"> {{ Faddress.tel }} </span></dt>
              <dd>{{ Faddress.address }}</dd>
            </dl>
        </div>

        <div class="take">
            <i></i>
            <dl>
              <dt>{{ Taddress.name }} <span class="tel">{{ Taddress.tel }}</span></dt>
              <dd>{{ Taddress.address }}</dd>
            </dl>
        </div>

        <div class="sendbox-middle">
            <div @click="popupName = !popupName">
                <span>物品名称</span>
                <b v-if="express.Gname.checkName">{{ express.Gname.checkName }}</b>
                <b class="none" v-else>未选择</b>
            </div>
            <div @click="popupWeight = !popupWeight">
                <span>物品重量</span>
                <b>{{ express.Gweight }}</b>
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
                <b>{{ express.Gment }}</b>
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
                <em class="mr">{{ express.Gtype.time }}之前送达</em>
            </p>
        </div>

        <div class="goodedit">
            <div class="checkbox">
                <p>预估费用  <span class="red">¥{{ express.theCost }}</span></p>
                <div class="checkradio" :class="{'check': isAgree}"><i @click="isAgree = !isAgree"></i>同意 <a>《快件契约条款》</a></div>
            </div>

            <button :disabled="!disabled">确认发货</button>
        </div>

    </section>

    <!-- 物品重量 -->
    <mt-popup v-model="popupWeight" position="bottom" class="mint-popup pop-weight" style="width:100%">
        <div class="title">物品重量 <span class="cancel" @click="popupWeight = !popupWeight">取消</span></div>
        <div class="box-content">
          <p>订单商品共计 {{ this.countWeight }}</p>
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
                  <input type="text" name="notes" placeholder="输入最多10个字（选填）" ref="GnoteVal">
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
              <span class="default" v-for="(key, val) in express.Gtime.time" :class="{'ontime': key.ischeck}" @click="checks(key, val, 3)" v-if="val <= 3">{{ key.name }}</span>
            </div>
          </div>
        </div>
        <p class="groom">下午</p>
        <div class="box-tag">
          <div class="line">
            <div class="tags">
              <span v-for="(key, val) in express.Gtime.time" :class="{'on': key.ischeck}" v-if="val > 3" @click="checks(key, val, 3)">{{ key.name }}</span>
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
                  <input type="text" name="names" placeholder="输入其他名称（选填）" ref="GnameVal">
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
  mounted() {
  },
  data () {
    return {
      isAgree: true,
      popupWeight: false,
      popupNote: false,
      popupDate: false,
      popupName: false,
      Faddress: {
        name: '西郊百联阿迪达斯专卖店',
        tel: '021-89887651',
        address: '上海上海市黄浦区四川南路26号四川南路26四川南路26号反正名字很长就是快乐'
      },
      Taddress: {
        name: '李狗蛋',
        tel: '18898898888',
        address: '唐朝上海市黄浦区四川南路26号'
      },
      countWeight: '2KG',
      countText: '重量是如何计算的说明文字重量是如何计算的说明文字重量是如何计算的说明文字重量是如何计算的',
      // 发货参数
      express: {
        Gname: {
          checkName: '',
          mentNames: [
            {name: '衣服饰品', ischeck: false},
            {name: '电子仪器', ischeck: false},
            {name: '生鲜产品', ischeck: false},
            {name: '信件', ischeck: false},
            {name: '家具', ischeck: false},
            {name: '汽车', ischeck: false}
          ]
        },
        Gweight: '1KG',
        Gpay: '寄件人付',
        Gtime: {
          checkDate: '',
          date: [
            {name: '今天', time: '5月24日', ischeck: false},
            {name: '明天', time: '5月25日', ischeck: false},
            {name: '后天', time: '5月26日', ischeck: false}
          ],
          time: [
            {'name': '9:00', ischeck: false},
            {'name': '10:00', ischeck: false},
            {'name': '11:00', ischeck: false},
            {'name': '12:00', ischeck: false},
            {'name': '13:00', ischeck: false},
            {'name': '14:00', ischeck: false},
            {'name': '15:00', ischeck: false},
            {'name': '16:00', ischeck: false},
            {'name': '17:00', ischeck: false},
            {'name': '18:00', ischeck: false},
            {'name': '19:00', ischeck: false}
          ]
        },
        Gment: '工作日双休日均可',
        Gnotes: {
          checkNote: '',
          mentNotes: [
            {name: '请带箱子', ischeck: false},
            {name: '请带箱子', ischeck: false},
            {name: '请带胶带', ischeck: false},
            {name: '请带胶带', ischeck: false},
            {name: '请带胶带', ischeck: false},
            {name: '请带胶带', ischeck: false}
          ]
        },
        Gtype: {
          name: '顺丰次日',
          time: '5月1日 12:00'
        },
        theCost: '20'
      },
      temparam: '',
      dateparam: '',
      timeparam: ''
    }
  },
  methods: {
    submitTemp(type) {
      if (type == 'popupName') {
        let val = this.$refs.GnameVal.value
        this.popupName = false
        if (val) {
          this.express.Gname.checkName = val
        } else {
          this.express.Gname.checkName = this.temparam
        }
        console.log('flag ', this.myFlag)
      }
      if (type == 'popupNote') {
        let val = this.$refs.GnoteVal.value
        this.popupNote = false
        if (val) {
          this.express.Gnotes.checkNote = val
        } else {
          this.express.Gnotes.checkNote = this.temparam
        }
      }
      if (type == 'popupDate') {
        this.popupDate = false
        if (this.dateparam || this.timeparam) {
          this.express.Gtime.checkDate = this.dateparam + '' + this.timeparam
        } else {
          this.express.Gtime.checkDate = ''
        }
      }
    },
    checks (key, val, type) {
      // 0:物品名称 1:小哥 2:日期 3:time
      if (type == 0) {
        let len = this.express.Gname.mentNames;
        for (let i = 0; i < len.length; i += 1) {
          len[i].ischeck = false
        }
        key.ischeck = true
        this.temparam = key.name
      }
      if (type == 1) {
        let len = this.express.Gnotes.mentNotes;
        for (let i = 0; i < len.length; i += 1) {
          len[i].ischeck = false
        }
        key.ischeck = true
        this.temparam = key.name
      }
      if (type == 2) {
        let len = this.express.Gtime.date;
        for (let i = 0; i < len.length; i += 1) {
          len[i].ischeck = false
        }
        key.ischeck = true
        this.dateparam = key.name
      }
      if (type == 3) {
        let len = this.express.Gtime.time;
        for (let i = 0; i < len.length; i += 1) {
          len[i].ischeck = false
        }
        key.ischeck = true
        this.timeparam = key.name
      }
    }
  },
  watch: {
    // 'express.Gname.checkName'(newValue) {
    //   if (this.express.Gname.checkName && this.express.Gnotes.checkNote && this) {
    //     this.disabled = false
    //   }
    // }
  },
  computed: {
    disabled () {
      return this.express.Gnotes.checkNote && this.express.Gtime.checkDate && this.express.Gname.checkName
    }
  },
  created() {
  }
}
</script>
