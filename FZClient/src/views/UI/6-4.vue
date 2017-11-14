<style lang="scss" src="src/sass/createActivity.scss" scoped></style>
<template>
  <div class="content">

    <bl-bar barStyle="bar-dark-linear">
        <div class="button" slot="left-button" @click="$router.go(-1)">
          <div class="iconfont arrow-back"><i class="fback">返回</i></div>
        </div>
        <div slot="title">创建活动</div>
    </bl-bar>

    <div class="activity">
        <bl-comli>
            <div slot='left-text' class="left-box face">设置活动封面</div>
            <div slot='right-text' class="right-box upright">
              <input type="file" name="upload" class="button-input" v-on:change="upload" ref="val">
              <div class="right-l">
              
                <div v-if="!uploadImage" class="right-r">未设置</div>
                <div class="img-box" @click="popupVisible = true" v-else>
                    <img :src="paths">
                </div>
              </div>
              <div class="iconfont arrow-back"></div>
            </div>
        </bl-comli>

        <bl-comli class="actname">
            <div slot='left-text' class="left-box">活动标题</div>
              <div slot='right-text' class="right-box">
                <div class="right-r"><input type="text" placeholder="填写活动标题 (必填)" @keyup="init" ref="title"></div>
                <div class="del" v-if="isDel" @click="clearInit"></div>
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
        <bl-comli>
            <div slot='left-text' class="left-box">活动规则</div>
            <div slot='right-text' class="right-box">
                <div class="right-r">{{ actRule }}</div>
                <div class="iconfont arrow-back"></div>
            </div>
        </bl-comli>
        <bl-comli>
            <div slot='left-text' class="left-box">活动内容</div>
            <div slot='right-text' class="right-box">
                <div class="right-r">{{ actContent }}</div>
                <div class="iconfont arrow-back"></div>
            </div>
        </bl-comli>

        <div class="actup">
            <bl-comli>
                <div slot='left-text' class="left-box">活动跳转</div>
                <div slot='right-text' class="right-box" @click="jump = !jump">
                    <div class="right-r"><div class="ellipsis">{{ programName }}</div></div>
                    <div class="iconfont arrow-back"></div>
                </div>
            </bl-comli>
            <bl-comli>
                <div slot='left-text' class="left-box">关联优惠券</div>
                <div slot='right-text' class="right-box" @click="coupons = !coupons">
                    <div class="right-r">{{ relCoupon }}</div>
                    <div class="iconfont arrow-back"></div>
                </div>
            </bl-comli>
        </div>

    </div>

    <div class="bootedit">
        <bl-button :disabled="!disabled" @click="subAudit">提交审核</bl-button>
        <bl-button :disabled="isSave">存草稿</bl-button>
    </div>


    <!--  日期选择器 -->
    <bl-mtdate-picker ref="picker" type="date" :toolbarSubText="toolbarSubText"
    year-format="{value}年"
    month-format="{value}月"
    date-format="{value}日" @confirm="returnDate" v-model="pickerValue">
    </bl-mtdate-picker>

    <!-- 活动跳转 -->
    <mt-popup v-model="jump" position="bottom" class="mint-popup" style="width:100%">
        <bl-cust-picker  show-toolbar @cancel="jump = !jump" @getValues="getJump" :toolbarSubText="jumpTitle">
            <div slot="content" class="jumpbox">
                <div class="nav">
                    <span v-for="(tab, index) in tabs" @click="checktab(tabs, index)" :class="{'on':tab.check}">{{ tab.name }}</span>
                </div>
                <div class="navbox" ref="navbox">
                    <div class="box"></div>
                    <div class="box">
                        <bl-check-box class="check-coupon" v-for="(item, index) in program">
                            <span slot="check" class="checkicon" :class="{'check':item.state}" @click="chooseAttrs(index, program)">
                                <i></i>
                            </span>
                            <div slot="check-box" class="checkbox">
                                <div class="check-card program">
                                    <h2>{{ item.title }}</h2>
                                    <p>{{ item.date }} </p>
                                    <span class="program-name">网红名字</span>
                                </div>
                            </div>
                        </bl-check-box>
                    </div>
                    <div class="box"></div>
                    <div class="box">
                        <bl-comli class="activitybox">
                            <div slot='left-text' class="left-box">http://</div>
                              <div slot='right-text' class="right-box">
                                <div class="right-r"><input type="text" placeholder="链接地址" @keyup="inits" ref="titles"></div>
                                <div class="del" v-if="isDel2" @click="clearInits"></div>
                              </div>
                        </bl-comli>
                    </div>
                </div>
            </div>
        </bl-cust-picker>
    </mt-popup>

    <!-- 优惠券 -->
    <mt-popup v-model="coupons" position="bottom" class="mint-popup" style="width:100%">
        <bl-cust-picker  show-toolbar @cancel="coupons = !coupons" @getValues="getValues" :toolbarSubText="couponTitle">
          <div slot="content" class="coupons">
              <bl-check-box class="check-coupon"  v-for="(item, index) in itemcards">
                  <span slot="check" class="checkicon" :class="{'check':item.state}" @click="chooseAttr(index, itemcards)">
                      <i></i>
                  </span>
                  <div slot="check-box" class="checkbox">
                      <div class="check-card">
                          <h1>{{ item.discount }}</h1>
                          <h2>{{ item.title }}</h2>
                          <p>有效期: {{ item.date }} </p>
                      </div>
                  </div>
              </bl-check-box>
          </div>
        </bl-cust-picker>
    </mt-popup>

    <!--遮罩-->
    <div class="modal-bg" v-if="popupVisible" @click="popupVisible = false">
      <span class="qimg">
        <img :src="paths">
      </span>
    </div>
    <div class="modal-bg" v-if="bgVisible" @click="bgVisible = false"></div>


  </div>
</template>

<script>
// import api from 'src/api/index'
export default {
  name: 'activity',
  components: {
    'BlCustPicker': () => System.import('components/cloud-merchant/cust-picker'),
    'BlCheckBox': () => System.import('components/cloud-merchant/check-box'),
    'BlMtdatePicker': () => System.import('components/cloud-merchant/mtdate-picker')
  },
  mounted() {

  },
  data () {
    return {
      uploadImage: false,
      isSave: false,
      isDel: false,
      popupVisible: false,
      bgVisible: false,
      paths: null,
      pickerValue: false,
      startDate: '必选',
      endDate: '必选',
      toolbarSubText: '',
      actRule: '必选',
      actContent: '必选',
      // 跳转
      jump: false,
      jumpTitle: '选择页面',
      isDel2: false,
      programName: '必选',
      tabs: [
        {name: '商户主页', check: false},
        {name: '节目', check: false},
        {name: '上新Feed', check: false},
        {name: '外部链接', check: false}
      ],
      program: [
        {
          title: "节目名称名称名称节目名称名称名称",
          date: '2017.05.11 12:20:00',
          state: false
        },
        {
          title: "节目名称名称名称节目名称名称名称",
          date: '2017.05.11 12:20:00',
          state: false
        }
      ],
      // 优惠券
      couponTitle: '选择优惠券',
      coupons: false,
      couponCount: 0,
      relCoupon: '选填',
      itemcards: [
        {
          discount: '满减 全场满100减20',
          title: "元旦大促雅诗兰黛全部商品促销",
          date: '2016.11.23-2016.12.31',
          state: false
        },
        {
          discount: '满减 全场满100减20',
          title: "元旦大促雅诗兰黛全部商品促销",
          date: '2016.11.23-2016.12.31',
          state: false
        },
        {
          discount: '满减 全场满100减20',
          title: "元旦大促雅诗兰黛全部商品促销",
          date: '2016.11.23-2016.12.31',
          state: false
        },
        {
          discount: '满减 全场满100减20',
          title: "元旦大促雅诗兰黛全部商品促销",
          date: '2016.11.23-2016.12.31',
          state: false
        },
        {
          discount: '满减 全场满100减20',
          title: "元旦大促雅诗兰黛全部商品促销",
          date: '2016.11.23-2016.12.31',
          state: false
        }
      ]

    }
  },
  methods: {
    init() {
      (this.$refs.title.value.length > 0) ? (this.isDel = true) : (this.isDel = false)
    },
    clearInit() {
      this.$refs.title.value = ''
      this.isDel = false
    },
    inits() {
      (this.$refs.titles.value.length > 0) ? (this.isDel2 = true) : (this.isDel2 = false)
    },
    clearInits() {
      this.$refs.titles.value = ''
      this.isDel2 = false
    },
    openPicker(time) {
      (time === 'start') ? (this.toolbarSubText = '选择活动开始时间') : (this.toolbarSubText = '选择活动结束时间');
      if (time === 'start') {
        this.$refs.picker.open();
      } else {
        this.$refs.picker.open();
      }
    },
    returnDate(param) {
      if (this.toolbarSubText === '选择活动开始时间') {
        (param instanceof Date) ? (this.startDate = param.getFullYear() + '-' + ~~(param.getMonth() + 1) + '-' + param.getDate()) : (this.startDate = '必选')
      }
      if (this.toolbarSubText === '选择活动结束时间') {
        (param instanceof Date) ? (this.endDate = param.getFullYear() + '-' + ~~(param.getMonth() + 1) + '-' + param.getDate()) : (this.endDate = '必选')
      }
    },
    getValues() {
      (this.couponCount > 0) ? (this.relCoupon = '已选' + this.couponCount + '张优惠券') : (this.relCoupon = '选填');
      this.coupons = false
    },
    chooseAttr(index, arrs) {
      let state = arrs[index].state;
      if (state === false) {
        arrs[index].state = true
        this.couponCount += 1
      } else {
        arrs[index].state = false
        this.couponCount -= 1
      }
    },
    chooseAttrs(index, arrs) {
      for (let i = 0; i < arrs.length; i += 1) {
        arrs[i].state = false
      }
      let state = arrs[index].state;
      if (state === false) {
        arrs[index].state = true
        this.programName = arrs[index].title
      } else {
        arrs[index].state = false
        this.programName = arrs[index].title
      }
    },
    getJump() {
      let name = this.$refs.titles.value
      if (name) {
        this.programName = name
      }
      this.jump = false
    },
    checktab(item, index) {
      for (let i = 0; i < item.length; i += 1) {
        item[i].check = false
      }
      item[index].check = true
      let dom = this.$refs.navbox.querySelectorAll('.box');
      for (let k = 0; k < dom.length; k += 1) {
        dom[k].style.display = 'none'
      }
      dom[index].style.display = 'block'
      if (index === 0) {
        console.log('跳转 商户主页')
      }
      if (index === 2) {
        console.log('上新Feed 跳转')
      }
    },
    upload(e) {
      console.log('上传图片')
      let reader = new FileReader();
      let fileList = e.target.files;
      for (let i = 0; i < fileList.length; i++) {
        reader.readAsDataURL(fileList[i]);
        reader.onload = () => {
          var oReader = new FileReader();
          oReader.onload = (e) => {
            var image = new Image();
            image.src = e.target.result;
            this.paths = (image.src);
            this.$refs.val.value = "";
          };
          oReader.readAsDataURL(fileList[i]);
        }
      }
      this.uploadImage = true
    },
    subAudit() {
      let title = this.$refs.title.value = ''
      if (title == '') {
        this.$toast('请输入活动标题');
      }
    }
  },
  computed: {
    disabled () {
      return this.uploadImage && this.startDate != '必选' && this.endDate != '必选' && this.programName != '必选'
    }
  }
}
</script>

