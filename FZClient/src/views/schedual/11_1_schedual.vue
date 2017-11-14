<style lang="scss" src="src/sass/dutyRoster.scss" scoped></style>
<template>
    <div class="content">
      <bl-bar barStyle="bar-dark-linear">
          <div class="button" slot="left-button" @click="$router.go(-1)">
              <div class="iconfont arrow-back"></div><i class="fback">返回</i>
          </div>
          <div slot="title">排班表</div>
      </bl-bar>

      <section class="calendar">
          <p><span>{{ nowYear }}</span> <span class="month">{{ nowMonth }}月</span> <span style="float:right;margin: 0 .3rem;" @click="showToday">今天</span></p>
          <div class="calendar-box" id="calendar">
              <ul class="calendar-body" :style="{width: calendarWidth + 'px'}" @touchstart="touchStart" @touchmove="touchMove" @touchend="touchEnd">
                 <li v-for="(Day, index) in dates" :class="{'today': Day.today, 'curr': Day.selected, 'plan': Day.plan}">
                    <div @click="chooseWeek(index, dates, $event)">
                      <i></i>
                      <span style="display:none">{{ Day.time }}</span>
                      <cite>{{ Day.week }}</cite>
                      {{ Day.date }}
                    </div>
                 </li>
              </ul>
          </div>
      </section>

      <section class="dutyroster" v-if="personArray.length == 0">
          <div class="dutyroster-box">
              <!-- <p v-show="roleId == '9'" class="no">这天没有排班，请选择当班人</p> -->
              <p class="no">这天没有排班</p>
          </div>

          <button v-show="showButton" class="bl" @click="selectPerson">选择当班人</button>
          <button v-show="showButton" class="br" @click="yesterDays">与前一天一致</button>

          <!-- <p><span>2017</span> <span class="month">7月</span></p> -->
      </section>
      <section class="dutyroster" v-else>
          <div class="dutyroster-box">
              <p class="per"><span>当班员工</span></p>
              <ul class="dutyroster-person">
                <li v-for="item in personArray">
                    <em><img :src=item.avatarUrl></em>
                    <span>{{ item.realname }}</span>
                </li>
              </ul>
          </div>

          <button v-show="showButton" class="bl" @click="selectPerson">编辑当班人</button>
          <button v-show="showButton" class="br" @click="yesterDays">与前一天一致</button>
      </section>

      <!-- 选择当班人 -->
      <bl-popup v-model="personVisible" position="bottom" style="width:100%">
          <bl-cust-picker  show-toolbar @cancel="personVisible = !personVisible" @getValues="getPerson" :toolbarSubText="personTitle">
              <div slot="content" class="personitem">
                  <bl-check-box class="person-box" v-for="(item, index) in personList">
                          <span slot="check" class="checkicon" :class="{'check':item.state}" @click="chooseAttr(index, personList)">
                              <i></i>
                          </span>
                          <div slot="check-box" class="checkbox" :class="{'check':item.state}" @click="chooseAttr(index, personList)">
                              <span class="person-phone"><img :src=item.avatarUrl></span>
                              <span class="person-name">{{ item.realname }}</span>
                          </div>
                  </bl-check-box>
              </div>
          </bl-cust-picker>
      </bl-popup>
      <div class="modal-bg" v-if="personVisible" @click="personVisible = !personVisible"></div>

    </div>
</template>

<script type="text/babel">
  export default {
    name: 'dutyRoster',
    components: {
      'BlCustPicker': () => System.import('components/cloud-merchant/cust-picker'),
      'BlCheckBox': () => System.import('components/cloud-merchant/check-box')
    },
    data () {
      return {
        personVisible: false,
        calendarWidth: '',
        personTitle: '选择当班人',
        nowYear: '',
        nowMonth: '',
        prevMonthDays: '',
        currentMonthDays: '',
        nextMonthDays: '',
        currentDay: new Date().getFullYear() + '-' + (new Date().getMonth() + 1) + '-' + new Date().getDate(),
        yesterday: new Date().getFullYear() + '-' + (new Date().getMonth() + 1) + '-' + (new Date().getDate() - 1),
        weeks: ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'],
        dates: [
          {
            'time': '2017-1-7',
            'date': '11',
            'week': '周一',
            'today': false,
            'selected': false,
            'plan': false
          }
        ],
        showButton: false,
        roleId: '',
        // 查询参数
        queryParam: {
          beginAt: '',
          endAt: ''
        },
        // 设置排班表参数
        params: {
          date: '', //  排班时间
          id: '', //  排班表Id
          memberIdList: [] // 排班人员Id- list
        },

        // 排班人员信息
        beonDutyPerson: [],
        personArray: [], // 存放当天值班人员数组
        schedualId: '', // 排班Id 修改时需要

        // 全部人员
        personList: []
      }
    },

    mounted() {
      this.roleId = this.$merchantlib.getRoleId()
      this.calendars()
      this.queryAllsalers()

      // console.log('登陆人角色：', this.$merchantlib.getRoleId())
      // this.updateData()
    },

    methods: {
      showToday() {
        var calendarLi = document.querySelector('.calendar li').offsetWidth + 4.6 // 容差
        let today = document.querySelector('.today').offsetLeft - calendarLi * 3
        document.getElementById('calendar').scrollLeft = today
      },
      // 查询商户所有店员
      queryAllsalers() {
        this.$scheduallib.queryAllsalers((err, obj) => {
          if (err) {
            this.$toast(err)
          }
          if (obj) {
            console.log('查询商户所有店员：', JSON.stringify(obj))
            obj.map(person => {
              person.state = false
            })
            this.personList = obj
          }
        })
      },

      // 查询排班表
      querySchedulingInfo(callback) {
        this.$scheduallib.queryScheduals(this.queryParam, (err, obj) => {
          if (err) {
            this.$toast(err)
            callback(err)
          }
          if (obj) {
            callback(null, obj)
          }
        })
      },

      // 更新数据
      updateData() {
        console.log('============更新数据============')
        this.querySchedulingInfo((err, obj) => {
          if (err) { this.$toast(err) }
          if (obj) {
            this.beonDutyPerson = obj
            console.log('排班表信息：', JSON.stringify(this.beonDutyPerson))
            let beonDutyDateList = []
            this.beonDutyPerson.map(beonDuty => {
              let bDate = this.$utillib.fmtDate(new Date(beonDuty.date.replace(/-/g, "/")), 'yyyy-MM-dd')
              beonDutyDateList.push(bDate)
            })
            this.dates.map(date => {
              if (beonDutyDateList.indexOf(date.time) != -1) {
                date.plan = true
              } else {
                date.plan = false
              }
            })
            this.arrayPush(this.$utillib.fmtDate(new Date(this.currentDay.replace(/-/g, "/")), 'yyyy-MM-dd'))
          }
        })
      },

      // 1036-设置排班表
      setSchedual() {
        console.log('设置排班表')
        this.$scheduallib.queryGoodsDetails(this.params, (err, obj) => {
          if (err) {
            return this.$toast(err)
          }
          this.$toast('设置成功')
        })
      },
      selectPerson() {
        this.personVisible = !this.personVisible
      },

      // 生成日历
      calendars() {
        var calendar = new Date();
        var year = calendar.getFullYear() //年
        var month = calendar.getMonth()   //月
        var date = calendar.getDate();    //日
        var day = calendar.getDay();      //星期
        var days = [31, 28 + this.leapYear(year), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
        // 赋值
        this.nowYear = year
        this.nowMonth = month + 1
        // 计算
        this.dates = []
        var countDays = days[this.checkMonthAndYear(year, month - 1)[1]] + days[this.checkMonthAndYear(year, month)[1]] + days[this.checkMonthAndYear(year, month + 1)[1]]
        var calendarLi = document.querySelector('.calendar li').offsetWidth + 4.6 // 容差
        this.calendarWidth = calendarLi * countDays
        // 模板
        // {'month': '1', 'date': '1', 'week': '周一', 'today': false, 'selected': false, 'plan': false}
        var tempArr = this.checkMonthAndYear(year, month - 1);
        var tempYear = tempArr[0];
        var tempMonth = tempArr[1];
        var isShopkeeper = false;
        if (this.roleId == '9') {
          isShopkeeper = true;
        }

        // 上个月
        let prevMonthLen = days[tempMonth]
        this.prevMonthDays = prevMonthLen
        for (let i = 1; i <= prevMonthLen; i += 1) {
          let time = tempYear + '-' + (tempMonth + 1) + '-' + i
          time = this.$utillib.fmtDate(new Date(time.replace(/-/g, "/")), 'yyyy-MM-dd')
          let week = this.weekDays(tempYear, tempMonth + 1, i)
          var DayTemplate1 = {'time': time, 'week': week, 'date': i, 'today': false, 'selected': false, 'plan': false, 'showEnditBtn': false && isShopkeeper}
          this.dates.push(DayTemplate1)
        }

        tempArr = this.checkMonthAndYear(year, month);
        tempYear = tempArr[0];
        tempMonth = tempArr[1];
        // 当月
        let currentMonthLen = days[tempMonth]
        this.currentMonthDays = currentMonthLen
        for (let i = 1; i <= currentMonthLen; i += 1) {
          let time = tempYear + '-' + (tempMonth + 1) + '-' + i
          time = this.$utillib.fmtDate(new Date(time.replace(/-/g, "/")), 'yyyy-MM-dd')
          let week = this.weekDays(tempYear, tempMonth, i)
          var DayTemplate2
          if (date == i) {
            DayTemplate2 = {'time': time, 'week': week, 'date': i, 'today': true, 'selected': true, 'plan': false, 'showEnditBtn': true && isShopkeeper}
          } else if (date > i) {
            DayTemplate2 = {'time': time, 'week': week, 'date': i, 'today': false, 'selected': false, 'plan': false, 'showEnditBtn': false && isShopkeeper}
          } else if (date < i) {
            DayTemplate2 = {'time': time, 'week': week, 'date': i, 'today': false, 'selected': false, 'plan': false, 'showEnditBtn': true && isShopkeeper}
          }
          this.dates.push(DayTemplate2)
        }
        this.showButton = isShopkeeper;

        tempArr = this.checkMonthAndYear(year, month + 1);
        tempYear = tempArr[0];
        tempMonth = tempArr[1];
        // 下个月
        let nextMonthLen = days[tempMonth]
        this.nextMonthDays = nextMonthLen
        for (let i = 1; i <= nextMonthLen; i += 1) {
          let time = tempYear + '-' + (tempMonth + 1) + '-' + i
          time = this.$utillib.fmtDate(new Date(time.replace(/-/g, "/")), 'yyyy-MM-dd')
          let week = this.weekDays(tempYear, tempMonth + 1, i)
          var DayTemplate3 = {'time': time, 'week': week, 'date': i, 'today': false, 'selected': false, 'plan': false, 'showEnditBtn': true && isShopkeeper}
          this.dates.push(DayTemplate3)
        }

        this.queryParam.beginAt = this.dates[0].time;
        this.queryParam.endAt = this.dates[this.dates.length - 1].time;
        // 更新数据
        this.updateData()

        setTimeout(function() {
          let today = document.querySelector('.today').offsetLeft - calendarLi * 3
          document.getElementById('calendar').scrollLeft = today
          document.querySelector('.calendar-body').style.visibility = 'visible'
          // console.log('today:', today)
        }, 200)
        // console.log(year, month, date, this.weeks[day], this.weekDays(year, month, 1), this.dates)
      },
      //核对年份月份是否需要修改
      checkMonthAndYear(year, month) {
        if (month < 0) { //前年
          return [year - 1, 12 + month];
        } else if (month > 11) { //明年
          return [year + 1, month - 12];
        } else {
          return [year, month]
        }
      },
      //返回日期相应的星期
      weekDays(year, weekmonth, weekday) {
        let week = new Date(year, weekmonth, weekday)
        let weekDay = week.getDay()
        return this.weeks[weekDay]
      },
      //计算是否为润年
      leapYear(year) {
        if (((year % 4) == 0) && ((year % 100) != 0) || ((year % 400) == 0)) {
          return 1
        } else {
          return 0
        }
      },

      touchStart() {

      },

      touchMove(event) {
        let calendarLi = document.querySelector('.calendar li').offsetWidth + 4.6
        let range = document.getElementById('calendar').scrollLeft + calendarLi * 3// 容差
        let prev = this.prevMonthDays * calendarLi
        let next = prev + this.currentMonthDays * calendarLi
        var month = new Date().getMonth()   //月
        if (range <= prev) {
          this.checkShowMouth(1);
        } else if (range >= next) {
          this.checkShowMouth(this.prevMonthDays + this.currentMonthDays + 1);
        } else {
          this.checkShowMouth(this.prevMonthDays + 1);
        }
      },

      touchEnd() {

      },
      //更新展示的年和月
      checkShowMouth(index) {
        let timeArr = this.dates[index].time.split('-');
        this.nowYear = timeArr[0];
        this.nowMonth = timeArr[1];
      },

      // 保存人员
      savePerson() {
        // save
        // this.personArray = []
        var saveTemp = {}
        saveTemp.date = this.$utillib.fmtDate(new Date(this.currentDay.replace(/-/g, "/")), 'yyyy-MM-dd 00:00:00')
        var memberIdList = []
        console.log('this.personArray:', this.personArray)
        for (let i = 0; i < this.personArray.length; i += 1) {
          memberIdList.push(this.personArray[i].memberId)
        }
        saveTemp.memberIdList = memberIdList

        console.log('保存人员：', JSON.stringify(saveTemp))
        this.$scheduallib.installSchedulingInfo(saveTemp, (err, obj) => {
          if (err) { return this.$toast(err) }
          console.log('设置排班表成功', obj)
          this.updateData()
        })
      },

      // 点击日期 给相应当班人赋值
      arrayPush(checkTime) {
        console.log('arrayPush  checkTime:', checkTime)
        this.personArray = []
        for (let i = 0; i < this.personList.length; i += 1) {
          // console.log(this.personList[i])
          this.personList[i].state = false
        }
        // 取下标
        var arrPerson = [];
        for (let i = 0; i < this.personList.length; i += 1) {
          arrPerson.push(this.personList[i].realname)
        }
        console.log('名称arrPerson:', JSON.stringify(arrPerson))

        this.beonDutyPerson.map(beonDuty => {
          // console.log('每一天的排班信息', JSON.stringify(beonDuty.date))
          beonDuty.date = this.$utillib.fmtDate(new Date(beonDuty.date.replace(/-/g, "/")), 'yyyy-MM-dd')
          if (beonDuty.date == checkTime) {
            console.log('匹配checkTime')
            let item = beonDuty.memberList
            this.personArray = []
            for (let i = 0; i < item.length; i += 1) {
              // 回显 全部人员列表
              let index = arrPerson.indexOf(item[i].realname)
              // console.log('index:', index)
              this.personArray.push(item[i])
              if (index == -1) continue
              this.personList[index].state = true
            }
          }
        })
        console.log('======personArray:', JSON.stringify(this.personArray))
      },

      // 与昨天一致 按钮
      yesterDays() {
        var beonDuty = this.beonDutyPerson
        var toast = false
        var checkTime = this.yesterday
        console.log('与昨天一致 按钮:', beonDuty)
        for (let key in beonDuty) {
          if (beonDuty[key].date == checkTime) toast = true
        }
        if (toast) {
          this.arrayPush(checkTime)
          this.savePerson()
        } else {
          this.$toast('昨天没有排班！')
        }
      },

      // 选择日期
      chooseWeek(index, array, e) {
        this.selectItemScrollCenter(e.currentTarget.parentNode.offsetLeft);
        this.checkShowMouth(index);
        console.log('选择日期  index:', index, 'array:', JSON.stringify(array[index]))
        for (let i = 0; i < array.length; i += 1) {
          array[i].selected = false
        }
        this.showButton = array[index].showEnditBtn;
        array[index].selected = true

        let checkTime = array[index].time
        this.arrayPush(checkTime)
        this.currentDay = array[index].time
        let yesterday = new Date(array[index].time.replace(/-/g, "/")).getTime() - 24 * 60 * 60 * 1000
        // this.yesterday = (new Date(yesterday).getFullYear() + '-' + (new Date(yesterday).getMonth() + 1) + '-' + new Date(yesterday).getDate())
        this.yesterday = this.$utillib.fmtDate(new Date(yesterday), 'yyyy-MM-dd')
        // console.log('currentDay:', this.currentDay, 'yesterday:', this.yesterday)
      },
      //将选择的元素滚动到屏幕中间
      selectItemScrollCenter(liElement) {
        if (liElement == null) {
          return;
        }
        let windowWidth = window.innerWidth;
        //元素宽度
        let calendarLi = document.querySelector('.calendar li').offsetWidth + 4.6;
        //计算元素居中前面应该滚动的距离
        let leftOffsize = liElement - calendarLi * 3;
        if (leftOffsize < 0) {
          document.getElementById('calendar').scrollLeft = 0;
        } else if (
          leftOffsize > this.calendarWidth - windowWidth / 2.0) {
          document.getElementById('calendar').scrollLeft = this.calendarWidth - calendarLi * 3;
        } else {
          document.getElementById('calendar').scrollLeft = leftOffsize;
        }
      },

      // 选择当班人 的确定按钮
      getPerson() {
        console.log('确定')
        this.personArray = []
        var array = this.personList
        // console.log('确定this.personList：', this.personList)
        var len = 0
        for (let i = 0; i < array.length; i += 1) {
          if (array[i].state == true) {
            this.personArray.push(array[i])
          }
          if (array[i].state == true) len += 1
        }
        console.log('确定personArray：', this.personArray)
        if (len >= 0) this.savePerson()
        this.personVisible = false
      },

      // 点击当班人
      chooseAttr(index, arrs) {
        console.log('点击当班人')
        let state = arrs[index].state;
        if (state === false) {
          arrs[index].state = true
        } else {
          arrs[index].state = false
        }
      }
    },

    computed: {
      // 编辑当班人
//       editVisible() {
// //        let now = this.$utillib.fmtDate(new Date(), 'yyyy-MM-dd')
// //        if (this.roleId == '9' && this.currentDay >= now) {
// //          return true
// //        } else {
// //          return false
// //        }
//         return this.showButton;
//       },
    },
  }
</script>
