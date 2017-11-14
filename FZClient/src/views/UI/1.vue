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
          <p><span>{{ nowYear }}</span> <span class="month">{{ nowMonth }}月</span>  <span style="float:right;margin: 0 .3rem;" @click="showToday">今天</span></p>
          <div class="calendar-body">
              <div class="calendar-box" id="calendar">
                  <ul class="calendar-body" :style="{width: calendarWidth + 'px'}" @touchstart="touchStart" @touchmove="touchMove" @touchend="touchEnd">
                     <li v-for="(Day, index) in Dates" :class="{'today': Day.today, 'curr': Day.selected, 'plan': Day.plan}">
                        <div @click="chooseWeek(index, Dates, $event)">
                          <i></i>
                          <span style="display:none">{{ Day.time }}</span>
                          <cite>{{ Day.week }}</cite>
                          {{ Day.date }}
                        </div>
                     </li>
                  </ul>
              </div>
              <div class="currentday" :class="{'plan': isPlan}"></div>
          </div>
      </section>

      <section class="dutyroster" v-if="personArray.length == 0">
          <div class="dutyroster-box">
              <p class="no">这天没有排班，请选择当班人</p>
          </div>
          <button class="bl" @click="personVisible = !personVisible">选择当班人</button>
          <button class="br" @click="yesterDays">与昨天一致</button>
          <!-- <p><span>2017</span> <span class="month">7月</span></p> -->
      </section>
      <section class="dutyroster" v-else>
          <div class="dutyroster-box">
              <p class="per"><span>当班员工</span></p>
              <ul class="dutyroster-person">
                <li v-for="item in personArray">
                    <em><img :src=item.head></em>
                    <span>{{ item.name }}</span>
                </li>
              </ul>
          </div>
          <button v-if="showButton" class="center" @click="editPerson">编辑当班人</button>
      </section>

      <!-- 选择当班人 -->
      <bl-popup v-model="personVisible" position="bottom" style="width:100%">
          <bl-cust-picker  show-toolbar @cancel="personVisible = !personVisible" @getValues="getPerson" :toolbarSubText="personTitle">
              <div slot="content" class="personitem">
                  <bl-check-box class="person-box" v-for="(item, index) in Person">
                          <span slot="check" class="checkicon" :class="{'check':item.state}" @click="chooseAttr(index, Person)">
                              <i></i>
                          </span>
                          <div slot="check-box" class="checkbox" :class="{'check':item.state}" @click="chooseAttr(index, Person)">
                              <span class="person-phone"><img :src=item.head></span>
                              <span class="person-name">{{ item.name }}</span>
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
        isTimer: false,
        isPlan: false,
        // iWeek: null,
        // iDay: null,
        personVisible: false,
        calendarWidth: '',
        showButton: true,
        personTitle: '选择当班人',
        nowYear: '',
        nowMonth: '',
        prevMonthDays: '',
        currentMonthDays: '',
        nextMonthDays: '',
        currentDay: new Date().getFullYear() + '-' + (new Date().getMonth() + 1) + '-' + new Date().getDate(),
        yesterday: new Date().getFullYear() + '-' + (new Date().getMonth() + 1) + '-' + (new Date().getDate() - 1),
        clickTime: '',
        weeks: ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'],
        Dates: [
          {'time': '2017-1-7', 'date': '11', 'week': '周一', 'today': false, 'selected': false, 'plan': false}
        ],
        BeonDutyPerson: [
          {'time': '2017-8-16', 'name': '刘德华'},
          {'time': '2017-7-29', 'name': '鹿晗,迪丽热巴'},
          {'time': '2017-8-1', 'name': '鹿晗,迪丽热巴,张曼玉'},
        ],
        personArray: [],
        Person: [
          {
            name: '刘德华',
            head: '../static/images/user.png',
            state: false
          },
          {
            name: '鹿晗',
            head: '../static/images/user.png',
            state: false
          },
          {
            name: '迪丽热巴',
            head: '../static/images/yd-index.png',
            state: false
          },
          {
            name: '张曼玉',
            head: '../static/images/user.png',
            state: false
          },
          {
            name: '西尔维斯特·史泰龙',
            head: '../static/images/user.png',
            state: false
          },
          {
            name: '阿诺德·施瓦辛格',
            head: '../static/images/user.png',
            state: false
          },
          {
            name: '大傻帽',
            head: '../static/images/user.png',
            state: false
          },
          {
            name: '贾跃亭',
            head: '../static/images/user.png',
            state: false
          }
        ]
      }
    },
    mounted() {
      this.Calendars()
    },
    computed: {
    },
    methods: {
      showToday() {
        var calendarLi = document.querySelector('.calendar li').offsetWidth + 4.6 // 容差
        let today = document.querySelector('.today').offsetLeft - calendarLi * 3
        document.getElementById('calendar').scrollLeft = today
      },
      Calendars() {
        var Calendar = new Date();
        var year = Calendar.getFullYear() //年
        var month = Calendar.getMonth()   //月
        var date = Calendar.getDate();    //日
        var day = Calendar.getDay();      //星期
        var days = [31, 28 + this.leapYear(year), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
        // 赋值
        this.nowYear = year
        this.nowMonth = month + 1
        // 计算
        this.Dates = []
        // var countDays = days[month - 1] + days[month] + days[month + 1]
        var countDays = days[this.checkMonthAndYear(year, month - 1)[1]] + days[this.checkMonthAndYear(year, month)[1]] + days[this.checkMonthAndYear(year, month + 1)[1]]
        var calendarLi = document.querySelector('.calendar li').offsetWidth + 4.6 // 容差
        this.calendarWidth = calendarLi * countDays
        // 模板
        // {'month': '1', 'date': '1', 'week': '周一', 'today': false, 'selected': false, 'plan': false}

        // 上个月
        let prevMonthLen = days[month - 1]
        this.prevMonthDays = prevMonthLen
        for (let i = 1; i <= prevMonthLen; i += 1) {
          let time = year + '-' + month + '-' + i
          let week = this.weekDays(year, month - 1, i)
          var DayTemplate1 = {'time': time, 'week': week, 'date': i, 'today': false, 'selected': false, 'plan': false}
          this.Dates.push(DayTemplate1)
        }

        // 当月
        let currentMonthLen = days[month]
        this.currentMonthDays = currentMonthLen
        for (let i = 1; i <= currentMonthLen; i += 1) {
          let time = year + '-' + (month + 1) + '-' + i
          let week = this.weekDays(year, month, i)
          var DayTemplate2
          if (date == i) {
            DayTemplate2 = {'time': time, 'week': week, 'date': i, 'today': true, 'selected': false, 'plan': false}
          } else {
            DayTemplate2 = {'time': time, 'week': week, 'date': i, 'today': false, 'selected': false, 'plan': false}
          }
          this.Dates.push(DayTemplate2)
        }

        // 下个月
        let nextMonthLen = days[month + 1]
        this.nextMonthDays = nextMonthLen
        for (let i = 1; i <= nextMonthLen; i += 1) {
          let time = year + '-' + (month + 2) + '-' + i
          let week = this.weekDays(year, month + 1, i)
          var DayTemplate3 = {'time': time, 'week': week, 'date': i, 'today': false, 'selected': false, 'plan': false}
          this.Dates.push(DayTemplate3)
        }
        for (let i = 0; i < this.BeonDutyPerson.length; i += 1) {
          let time = this.BeonDutyPerson[i].time
          for (let key in this.Dates) {
            if (this.Dates[key].time == time) {
              this.Dates[key].plan = true
            }
          }
        }
        setTimeout(function() {
          let today = document.querySelector('.today').offsetLeft - calendarLi * 3
          document.getElementById('calendar').scrollLeft = today
          document.querySelector('.calendar-body').style.visibility = 'visible'
          // console.log('todayLen', today, calendarLi * 3)
          // var i = 0
          // var len = calendarLi * 3
          // var timer = null
          // var speed = 17.8
          // clearInterval(timer)
          // timer = setInterval(function() {
          //   i += 17.8
          //   if (i < len) {
          //     console.log(i, calendarLi * 3)
          //     document.getElementById('calendar').scrollLeft = today - i
          //   } else {
          //     clearInterval(timer)
          //   }
          // }, 40)
        }, 200)
        // 当天判断
        this.arrayPush(this.currentDay)
        // console.log(year, month, date, this.weeks[day], this.weekDays(year, month, 1), this.Dates)
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
          this.nowMonth = month
        } else if (range >= next) {
          this.nowMonth = month + 2
        } else {
          this.nowMonth = month + 1
        }
        // console.log(month, range, prev, next)
      },
      touchEnd() {
        var scrollL = document.getElementById('calendar').scrollLeft
        var calendarLi = document.querySelector('.calendar li').offsetWidth + 4.6;
        var self = (scrollL % calendarLi)
        var round = self - parseInt(self)
        console.log(self, calendarLi / 2)
        if (self > calendarLi / 2) {
          document.getElementById('calendar').scrollLeft = scrollL - self
        }
        if (self < calendarLi / 2) {
          document.getElementById('calendar').scrollLeft = scrollL + self
        }
        // var timer = setInterval(function() {
        //   self -= 1
        //   if (self >= 0) {
        //     document.getElementById('calendar').scrollLeft = scrollL - self
        //   }
        // }, 10)
      },
      savePerson() {
        // save
        // this.personArray = []
        var saveTemp = {}
        saveTemp.time = this.currentDay
        var saveName = []
        for (let i = 0; i < this.personArray.length; i += 1) {
          saveName.push(this.personArray[i].name)
        }
        saveTemp.name = saveName.join()
        this.BeonDutyPerson.push(saveTemp)
        for (let i = 0; i < this.BeonDutyPerson.length; i += 1) {
          let time = this.BeonDutyPerson[i].time
          for (let key in this.Dates) {
            if (this.Dates[key].time == time) {
              this.Dates[key].plan = true
            }
          }
        }
      },
      arrayPush(checkTime) {
        console.log('arrayPush:', checkTime)
        this.personArray = []
        for (let i = 0; i < this.Person.length; i += 1) {
          this.Person[i].state = false
        }
        // 取下标
        var arrPerson = [];
        for (let i = 0; i < this.Person.length; i += 1) {
          arrPerson.push(this.Person[i].name)
        }
        var BeonDuty = this.BeonDutyPerson
        for (let key in BeonDuty) {
          if (BeonDuty[key].time == checkTime) {
            let item = BeonDuty[key].name.split(',')
            this.personArray = []
            for (let i = 0; i < item.length; i += 1) {
              let index = arrPerson.indexOf(item[i])
              this.Person[index].state = true
              this.personArray.push(this.Person[index])
            }
          }
        }
        console.log(this.personArray)
      },
      yesterDays() {
        var BeonDuty = this.BeonDutyPerson
        var toast = false
        var checkTime = this.yesterday
        for (let key in BeonDuty) {
          if (BeonDuty[key].time == checkTime) toast = true
        }
        if (toast) {
          this.arrayPush(checkTime)
          this.savePerson()
        } else {
          this.$toast('昨天没有排班！')
        }
      },
      chooseWeek(index, array, e) {
        this.selectItemScrollCenter(e.currentTarget.parentNode.offsetLeft);
        document.querySelector('.currentday').style.display = 'block'
        this.iWeek = array[index].week
        this.iDay = (array[index].time).split('-')[2]
        let plan = array[index].plan;
        (plan == false) ? (this.isPlan = false) : (this.isPlan = true)
        console.log(array[index].week)
        // for (let i = 0; i < array.length; i += 1) {
        //   array[i].selected = false
        // }
        // let state = array[index].selected;
        // if (state === false) {
        //   array[index].selected = true
        // } else {
        //   array[index].selected = false
        // }
        let checkTime = array[index].time
        this.arrayPush(checkTime)
        if (new Date(array[index].time) <= new Date()) {
          this.showButton = false
        } else {
          this.showButton = true
        }
        this.currentDay = array[index].time
        let yesterday = new Date(array[index].time).getTime() - 24 * 60 * 60 * 1000
        this.yesterday = (new Date(yesterday).getFullYear() + '-' + (new Date(yesterday).getMonth() + 1) + '-' + new Date(yesterday).getDate())
        // 点击时间
        this.clickTime = array[index].time
        console.log(array[index].time)
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
        console.log('zzz', leftOffsize)
        if (leftOffsize < 0) {
          document.getElementById('calendar').scrollLeft = 0;
        } else if (
          leftOffsize > this.calendarWidth - windowWidth / 2.0) {
          document.getElementById('calendar').scrollLeft = this.calendarWidth - calendarLi * 3;
        } else {
          document.getElementById('calendar').scrollLeft = leftOffsize;
        }
      },
      editPerson() {
        this.personVisible = !this.personVisible
      },
      getPerson() {
        this.personArray = []
        var array = this.Person
        var len = 0
        for (let i = 0; i < array.length; i += 1) {
          if (array[i].state == true) {
            this.personArray.push(array[i])
          }
          if (array[i].state == true) len += 1
        }
        if (len > 0) {
          this.savePerson()
        } else {
          var obj = this.BeonDutyPerson
          for (let x in obj) {
            if (obj[x].time == this.clickTime) obj.splice(x, 1)
            // console.log(x, obj[x].time)
          }
          var times = this.Dates
          for (let x in times) {
            if (times[x].time == this.clickTime) times[x].plan = false
          }
        }
        this.personVisible = false
      },
      chooseAttr(index, arrs) {
        let state = arrs[index].state;
        if (state === false) {
          arrs[index].state = true
        } else {
          arrs[index].state = false
        }
      }
    }
  }
</script>
