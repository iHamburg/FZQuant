<!--创建活动, 编辑活动-->
<style lang="scss" src="src/sass/createActivity.scss" scoped></style>
<template >
  <div class="content" id ="content">

    <bl-bar barStyle="bar-dark-linear">
        <div class="button" slot="left-button" @click="onBack()">
          <div class="iconfont arrow-back"><i class="fback">返回</i></div>
        </div>
        <div slot="title">{{title}}</div>
    </bl-bar>

    <div class="activity">
        <bl-comli>
            <div slot='left-text' class="left-box face">设置活动封面</div>
            <div slot='right-text' class="right-box upright" @click="getPicture">
              <!-- <input type="file" name="upload" class="button-input" v-on:change="upload" ref="val"> -->
              <div class="right-l">
                <div v-if="!uploadImageVisible" class="right-r">未设置</div>
                <div class="img-box"  v-else>
                    <img :src="activityInfo.activityCover" @click.stop="parentSingleImg">
                </div>
              </div>
              <div class="iconfont arrow-back"></div>
            </div>
        </bl-comli>

        <upload :maxpic='9' :paths='activityInfo.activityImgList' :name='"活动图片"' class="margin-b"  @clickImg='parentImg' @confirm='onGetGoodsImage' @deleteConfirm='deleteConfirm' :ratio=0>
        </upload>
        <div class="watch-pic" ref='big' @click='hidebig' @touchmove.prevent>
          <div class="pic-box">
            <img :src="siglepath">
          </div>
        </div>

        <bigImage :sigleImagePath="activityInfo.activityCover" :showImageType="1" ref='big1'></bigImage>
        <bigImage :picPaths="activityInfo.activityImgList"  ref='big2'></bigImage>

        <bl-comli class="actname">
          <div slot='left-text' class="left-box">活动标题</div>
          <div slot='right-text' class="right-box">
            <div class="right-r"><input type="text" placeholder="填写活动标题 (必填)" v-model.trim="activityInfo.title" maxlength="20"></div>
            <div class="del" v-if="isDel" @click="clearInit"></div>
          </div>
        </bl-comli>

        <bl-comli>
          <div slot='left-text' class="left-box">开始时间</div>
          <div slot='right-text' class="right-box" @click="openPicker('start')">
            <div class="right-r">{{ activityInfo.activityBeginDate }}</div>
            <div class="iconfont arrow-back"></div>
          </div>
        </bl-comli>
        <bl-comli>
          <div slot='left-text' class="left-box">结束时间</div>
          <div slot='right-text' class="right-box" @click="openPicker('end')">
            <div class="right-r">{{ activityInfo.activityEndDate }}</div>
            <div class="iconfont arrow-back"></div>
          </div>
        </bl-comli>
        <bl-comli @click.native="onActivityPopup(0)">
          <div slot='left-text' class="left-box">活动规则</div>
          <div slot='right-text' class="right-box">
            <div class="right-r">{{ activityInfo.activityRule }}</div>
            <div class="iconfont arrow-back"></div>
          </div>
        </bl-comli>
        <bl-comli @click.native="onActivityPopup(1)">
            <div slot='left-text' class="left-box">活动内容</div>
            <div slot='right-text' class="right-box">
              <div class="right-r">{{ activityInfo.activityContent }}</div>
              <div class="iconfont arrow-back"></div>
            </div>
        </bl-comli>

        <div class="actup">
            <bl-comli>
                <div slot='left-text' class="left-box">活动跳转</div>
                <div slot='right-text' class="right-box" @click="onJump()">
                    <div class="right-r"><div class="ellipsis">{{ jumpName }}</div></div>
                    <div class="iconfont arrow-back"></div>
                </div>
            </bl-comli>
            <bl-comli style="margin-bottom: 2rem;">
                <div slot='left-text' class="left-box">关联优惠券</div>
                <div slot='right-text' class="right-box" @click="onCoupons">
                    <div class="right-r">{{ relCoupon }}</div>
                    <div class="iconfont arrow-back"></div>
                </div>
            </bl-comli>
          <div style="height:1px;"></div>
        </div>

    </div>

    <!-- <div class="bootedit">
        <bl-button :disabled="!disabled" @click="subAudit(1)">提交审核</bl-button>
        <bl-button :disabled="!disabled" @click="subAudit(0)">存草稿</bl-button>
    </div> -->

    <!-- 新样式 底部按钮 -->
    <div class="editgress">
      <button class="button2" @click="subAudit(1)">提交审核</button>
      <button class="button2" @click="subAudit(0)">存草稿</button>
    </div>
    <!-- 9/28 根据产品需求，封面裁切比例调整为1:1 -->
    <!-- <picture-cutting ref="PictureCut" :PictureData="getData" :PictureRatio=1></picture-cutting> -->

    <!-- 单图上传 -->
    <div >
      <upload ref="uploadSingle" :maxpic='1'   @clickImg='parentImg' @confirm='onGetSingleImage' @deleteConfirm='deleteConfirm'  :ratio=1 :interfaceType="false">
      </upload>
    </div>


    <!-- 活动规则 -->
    <bl-modal :buttons="buttons" v-if="ruleVisible">
      <div slot="inner">
        <h2>活动规则</h2>
        <textarea type="text" maxlength="1000" placeholder="请输入活动规则(上限1000字)" v-model.trim="activityInfo.activityRule"></textarea>
      </div>
    </bl-modal>

    <!-- 活动内容 -->
    <bl-modal :buttons="buttons" v-if="contentVisible">
      <div slot="inner">
        <h2>活动内容</h2>
        <textarea type="text" maxlength="500" placeholder="请输入活动内容(上限500字)" v-model.trim="activityInfo.activityContent"></textarea>
      </div>
    </bl-modal>

    <!--  日期选择器 -->
    <bl-mtdate-picker ref="picker" type="date" :defaultDate="defaultDate"
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
                <!-- 节目 -->
                <div class="navbox" ref="navbox">
                    <div class="box"></div>
                    <div class="box">
                        <bl-check-box class="check-coupon" v-for="(item, index) in programList">
                            <span slot="check" class="checkicon" :class="{'check':item.state}" @click="chooseAttrs(index, programList)">
                                <i></i>
                            </span>
                            <div slot="check-box" class="checkbox">
                                <div class="check-card program">
                                    <h2>{{ item.title }}</h2>
                                    <p>{{ item.date }} </p>
                                    <span class="program-name">{{ item.name }}</span>
                                </div>
                            </div>
                        </bl-check-box>
                    </div>
                    <!-- 上新feed   暂时没有 -->
                    <div class="box"></div>
                    <!-- 外部链接 -->
                    <div class="box">
                        <bl-comli class="activitybox">
                            <!-- <div slot='left-text' class="left-box">http://</div> -->
                              <div slot='right-text' class="right-box">
                                <div class="right-r right-r1">
                                <input  type="text" placeholder="链接地址" @keyup="inits" ref="titles" v-model.trim="externalLink" v-on:focus="inputFocus"></div>
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
              <bl-check-box class="check-coupon"  v-for="(item, index) in couponList">
                  <span slot="check" class="checkicon" :class="{'check':item.state}" @click="chooseAttr(index, couponList)">
                      <i></i>
                  </span>
                  <div slot="check-box" class="checkbox">
                      <div class="check-card">
                          <h1>{{ item.couponName }}</h1>
                          <h2>{{ item.couponDesc }}</h2>
                          <p>有效期: {{ item.enableTimeFrom }} - {{item.enableTimeTo}} </p>
                      </div>
                  </div>
              </bl-check-box>
          </div>
        </bl-cust-picker>
    </mt-popup>

    <div class="modal-bg" v-if="bgVisible" @click="bgVisible = false" @touchmove.prevent></div>


  </div>
</template>

<script>

import Vue from 'vue';
import BLMultiInput from 'components/cloud-merchant/multi-input';
import { Popup, DatetimePicker, Toast } from 'mint-ui';
import uiMixin from 'src/mixins/uiMixin';
import upload from 'components/bl-cloudstore-merchant/bl-cloudStore-image-uploader';
import bigImage from 'components/bl-cloudstore-merchant/bl-cloudStore-seeBigImage'

export default {
  name: 'activity',
  mixins: [uiMixin],
  components: {
    upload,
    BLMultiInput,
    DatetimePicker,
    Toast,
    bigImage,
    'BlCustPicker': () => System.import('components/cloud-merchant/cust-picker'),
    'BlCheckBox': () => System.import('components/cloud-merchant/check-box'),
    'BlMtdatePicker': () => System.import('components/cloud-merchant/mtdate-picker')
  },
  created() {
    // console.log('created', this.defaultDate);
    let flag = this.$route.params.flag || this.$utillib.storageGet('marketingActivitiesFlag');
    this.$utillib.storageSet('marketingActivitiesFlag', flag)
    console.log('created 首次进入页面，保存marketingActivitiesFlag：', flag)
  },
  mounted() {
    this.flag = this.$utillib.storageGet('marketingActivitiesFlag')
    console.log('mounted 取出marketingActivitiesFlag的值：', this.flag)
    // 创建 1
    if (this.flag == 1) {

    }
    // 编辑 2 || 重新创建 3
    if (this.flag == 2 || this.flag == 3) {
      this.activityId = this.$route.params.id
    }

    this.initializationData()
    this.queryCouponList()
    this.initDate()
  },
  /*activated() {
    // console.log('activate');
    this.flag = this.$utillib.storageGet('marketingActivitiesFlag')
    console.log('activated 取出marketingActivitiesFlag的值：', this.flag)
    // 创建 1
    if (this.flag == 1) {

    }
    // 编辑 2 || 重新创建 3
    if (this.flag == 2 || this.flag == 3) {
      this.activityId = this.$route.params.id
    }

    this.initializationData()
    this.queryCouponList()
    this.initDate()
  },*/
  data () {
    return {
      flag: '',
      title: this.$route.meta.title,
      activityId: null,
      activityInfo: {
        activityCover: null, // 活动封面
        title: null, // 活动标题
        type: null, // 活动类型
        activityImgList: [], // 活动图片
        activityBeginDate: '必选', // 活动开始时间
        activityEndDate: '必选', // 活动结束时间
        activityRule: '', // 活动规则
        activityContent: '', // 活动内容
        jumpType: null, // 活动跳转类型
        activityLink: null, // 活动跳转链接
        couponTemplateIdList: [], // 关联优惠券
        activityState: null, // 活动状态
      },
      siglepath: '', // 点击放大的图片路径

      /*活动跳转*/
      programId: '', // 节目Id
      feedId: '', // feedId
      externalLink: '', // 外部链接

      // dateTime pick
      defaultDate: new Date(),

      // popup
      popupTitle: '',
      // inputText: '',
      countNumber: 0,
      ruleVisible: false,
      contentVisible: false,
      ruleText: '',
      contentText: '',
      buttons: [{
        text: '取消',
        onClick: () => {
          this.ruleVisible = false;
          this.contentVisible = false;
        }
      }, {
        text: '确认',
        onClick: () => {
          this.ruleVisible = false;
          this.contentVisible = false;
        }
      }],

      uploadImageVisible: false,
      // isSave: false,
      isDel: false,
      bgVisible: false,
      pickerValue: false,
      toolbarSubText: '',
      // 跳转
      jump: false,
      jumpTitle: '选择页面',
      isDel2: false,
      jumpName: '必选',
      tabs: [
        {name: '商户主页', check: false, jumpType: 0},
        {name: '节目', check: false, jumpType: 1},
        {name: '上新Feed', check: false, jumpType: 2},
        {name: '外部链接', check: false, jumpType: 3}
      ],
      programList: [
        {
          id: '1111111111111111',
          title: "节目名称名称名称节目名称名称名称",
          date: '2017.05.11 12:20:00',
          state: false,
          name: 123
        },
        {
          id: '2222222222222',
          title: "节目名称名称名称节目名称名称名称",
          date: '2017.05.11 12:20:00',
          state: false,
          name: 456
        }
      ],
      // 优惠券
      couponTitle: '选择优惠券',
      coupons: false,
      couponCount: 0,
      relCoupon: '选填',
      couponList: [], // 优惠券列表
    }
  },

  methods: {
    open(picker) {
      this.$refs[picker].open();
    },
    handleChange(value) {
      Toast({
        message: '已选择 ' + value.toString(),
        position: 'bottom'
      });
    },

    getPicture() {
      console.log('上传')
      this.$refs.uploadSingle.getPicture()
    },

    // 10/10 组件合并后删除
    getData(data) {
      let mediaType = "jpg";
      this.$imagelib.lrzImage(data, (err, imageBase64) => {
        if (err) {
          return this.$toast(err);
        }
        this.uploadImage(imageBase64, mediaType);
      });
    },

    // 单图点击放大
    parentSingleImg() {
      console.log('单图点击放大')
      this.$refs.big1.openBigImage(0);
    },

    // 多图点击放大
    parentImg(index) {
      console.log('点击放大')
      // this.siglepath = this.activityInfo.activityImgList[index];
      // this.$refs.big.style.visibility = 'visible';
      // this.mainImgIndex = index;
      this.$refs.big2.openBigImage(index);
    },

    //回调获取商品上传图片.
    onGetGoodsImage(data) {
      this.picindex = 0;
      console.log('onGetGoodsImage:', this.activityInfo)
      this.activityInfo.activityImgList.push(data.mediaCephUrl);
      console.log('this.activityInfo.activityImgList', this.activityInfo.activityImgList);
    },

    // 单图上传
    onGetSingleImage(data) {
      this.uploadImageVisible = true
      this.picindex = 0;
      console.log('onGetSingleImage:', data)
      this.activityInfo.activityCover = data.mediaCephUrl;
      // console.log('this.activityInfo.activityImgList', this.activityInfo.activityImgList);
    },
    selectedSingleImage(images) {
      this.uploadImageVisible = true
      this.picindex = 0;
      images.forEach((item) => {
        console.log('单图上传：', item)
        this.activityInfo.activityCover = item;
      })
    },
    //图片回调删除方法:deleteConfirm data.index
    deleteConfirm(data) {
      this.activityInfo.activityImgList.splice(data.index, 1);
    },
    hidebig() {
      this.$refs.big.style.visibility = 'hidden';
    },

    //1001-图片上传接口
    // 组件合并后删除
    uploadImage(base64Content, mediaType) {
      this.startLoading();
      let self = this;

      let type = '2';
      this.$imagelib.uploadGoodsImages(base64Content, mediaType, (err, mediaCephUrl) => {
        this.stopLoading();

        if (err) {
          return this.$toast(err);
        }
        console.log('mediaCephUrl:', mediaCephUrl)
        this.activityInfo.activityCover = mediaCephUrl
        this.uploadImageVisible = true
        // self.updateMerchantInfo(mediaCephUrl, type);
      });
    },

    onBack() {
      let self = this
      this.$modal({
        content: '您确定要离开吗？若离开，已输入的内容将丢失。',
        buttons: [
          {text: '取消', onClick: function () {}},
          {text: '确定离开',
            onClick: function () {
              self.$activitylib.clearLocalActivity()
              self.$utillib.storageRemove('marketingActivitiesFlag')
              self.$router.go(-1)
            }}
        ]
      });
    },
    // 活动规则
    onInputRule(val) {
      console.log('onInput 活动规则 ', val);
      this.activityInfo.activityRule = val;
      this.ruleVisible = false;
    },
    // 活动内容
    onInputContent(val) {
      console.log(' onInput 活动内容 ', val);
      this.activityInfo.activityContent = val;
      this.contentVisible = false;
    },

    /**
     * 查询活动详情
     * @return {[type]} [description]
     */
    queryActivityDetail(callback) {
      let param = {
        activityId: this.activityId
      }
      // console.log('queryActivityDetail', param)
      this.$activitylib.queryActivityDetail(param, (err, obj) => {
        if (err) {
          if (callback) { callback(err) }
        }
        if (obj) {
          // console.log('查询的', obj)

          if (callback) { callback(null, obj) }
        }
      })
    },
    /**
     * 初始化数据
     * @return {[type]} [description]
     */
    initializationData() {
      let localActivity = this.$activitylib.getLocalActivity()
      console.log('initializationData', JSON.stringify(localActivity))
      if (this.activityId != null) {
        // console.log('编辑活动页面', localActivity.activityId)
        if (!localActivity.activityId) {
          console.log('没有activityId,调接口查')
          this.queryActivityDetail((err, obj) => {
            if (err) {}
            if (obj) {
              this.couponCount = obj.couponTemplateIdList == null ? 0 : obj.couponTemplateIdList.length
              this.getValues()
              localActivity = obj
              console.log('查询的obj3333', localActivity)
              this.$activitylib.updateLocalActivity(localActivity)

              this.echoParam(obj)
              this.activityInfo = obj
            }
          })
        }
      }
      this.echoParam(localActivity)
      this.activityInfo = localActivity
    },

    initDate() {
      // console.log(this.activityInfo.activityBeginDate)
      if (this.activityInfo.activityBeginDate == '必选') {
        // console.log(this.$utillib.fmtDate(new Date(), 'yyyy-MM-dd 00:00:00'))
        this.activityInfo.activityBeginDate = this.$utillib.fmtDate(new Date(), 'yyyy-MM-dd 00:00:00')
      }
      if (this.activityInfo.activityEndDate == '必选') {
        // console.log(this.activityInfo.activityBeginDate)
        let fmtDate = new Date(this.activityInfo.activityBeginDate.replace(/-/g, "/"))
        fmtDate.setDate((fmtDate.getDate() + 30))
        this.activityInfo.activityEndDate = this.$utillib.fmtDate(fmtDate, 'yyyy-MM-dd 23:59:59')
      }
    },

    /**
     * 用于数据回显
     * @param  {[type]} obj [description]
     * @return {[type]}     [description]
     */
    echoParam(obj) {
      if (obj.activityCover) {
        this.uploadImageVisible = true
      }

      if (obj.jumpType == 0) {
        this.jumpName = '商户主页'
      } else if (obj.jumpType == 1) {

      } else if (obj.jumpType == 2) {

      } else if (obj.jumpType == 3) {
        this.externalLink = obj.activityLink
        this.jumpName = obj.activityLink
      }
    },

    /**
     * 查询可用优惠券列表
     * @return {[type]} [description]
     */
    queryCouponList() {
      this.$couponlib.selectCouponList((err, obj) => {
        if (err) {
          this.$toast(err)
        }
        if (obj) {
          let arrs = obj.couponList;
          arrs.forEach(function(item) {
            item.enableTimeFrom = item.enableTimeFrom.replace(/-/g, '.');
            item.enableTimeTo = item.enableTimeTo.replace(/-/g, '.');
            item.state = false
          })
          this.couponList = arrs;
          // console.log('couponList', this.couponList)
        }
      })
    },

    // 点击活动规则/活动内容 输入
    onActivityPopup(val) {
      if (val === 0) {
        console.log('点击活动规则', val)
        // this.ruleVisible = true
        this.$router.push({name: '6.4.1', params: {title: 'rule'}})
      } else if (val === 1) {
        console.log('点击活动内容', val)
        // this.contentVisible = true
        this.$router.push({name: '6.4.1', params: {title: 'content'}})
      }
    },

    init() {
      (this.$refs.title.value.length > 0) ? (this.isDel = true) : (this.isDel = false)
      this.activityInfo.title = this.$refs.title.value
      // console.log('活动标题', this.activityInfo.title)
    },

    clearInit() {
      this.$refs.title.value = ''
      this.isDel = false
    },

    /**
     * 外部链接
     * @return {[type]} [description]
     */
    inits() {
      let match = /^((ht|f)tps?):\/\/([\w\-]+(\.[\w\-]+)*\/)*[\w\-]+(\.[\w\-]+)*\/?(\?([\w\-\.,@?^=%&:\/~\+#]*)+)?/;
      console.log('结果', match.test(this.$refs.titles.value));
      document.body.scrollTop = 99999;
      this.$refs.titles.value = this.$refs.titles.value.replace(/\s/g, '');
      (this.$refs.titles.value > 0) ? (this.isDel2 = true) : (this.isDel2 = false)
      this.activityInfo.activityLink = this.$refs.titles.value
    },

    clearInits() {
      this.$refs.titles.value = ''
      this.isDel2 = false
    },

    openPicker(time) {
      let beginDate = this.activityInfo.activityBeginDate.replace(/-/g, "/");
      let endDate = this.activityInfo.activityEndDate.replace(/-/g, "/");
      (time === 'start') ? (this.toolbarSubText = '选择活动开始时间') : (this.toolbarSubText = '选择活动结束时间');
      if (time === 'start') {
        if (beginDate != '必选') {
          this.defaultDate = new Date(beginDate)
        }
        this.$refs.picker.open();
      } else {
        if (beginDate == '必选') {
          return this.$toast('请先选择活动开始时间')
        } else {
          if (endDate == '必选') {
            // 没有活动时间，默认为开始时间+30天
            let fmtDate = new Date(beginDate)
            fmtDate.setDate((fmtDate.getDate() + 30))
            // console.log('没有活动结束时间', fmtDate)
            this.defaultDate = fmtDate
          } else {
            // 有活动时间
            // console.log('有活动时间', new Date(endDate))
            this.defaultDate = new Date(endDate)
          }
        }
        this.$refs.picker.open();
      }
    },

    returnDate(param) {
      // console.log(param)
      if (this.toolbarSubText === '选择活动开始时间') {
        // console.log('选择活动开始时间', param);
        (param instanceof Date) ? (this.activityInfo.activityBeginDate = param.getFullYear() + '-' + ~~(param.getMonth() + 1) + '-' + param.getDate()) : (this.activityInfo.activityBeginDate = '必选')
        // console.log('格式化前', this.activityInfo.activityBeginDate)
        this.activityInfo.activityBeginDate = this.$utillib.fmtDate(new Date(this.activityInfo.activityBeginDate.replace(/-/g, "/")), 'yyyy-MM-dd 00:00:00')
        // console.log('开始时间：', this.activityInfo.activityBeginDate)
      }
      if (this.toolbarSubText === '选择活动结束时间') {
        // console.log('选择活动开始时间', param);
        (param instanceof Date) ? (this.activityInfo.activityEndDate = param.getFullYear() + '-' + ~~(param.getMonth() + 1) + '-' + param.getDate()) : (this.activityInfo.activityEndDate = '必选')
        this.activityInfo.activityEndDate = this.$utillib.fmtDate(new Date(this.activityInfo.activityEndDate.replace(/-/g, "/")), 'yyyy-MM-dd 23:59:59')
      }
    },

    /**
     * 点击 活动跳转
     * @return {[type]} [description]
     */
    onJump() {
      console.log('点击活动跳转')
      if (this.activityInfo.jumpType) {
        // console.log('11111', this.activityInfo.jumpType)
        this.tabs.map(tab => {
          // console.log(tab.jumpType)
          if (tab.jumpType == this.activityInfo.jumpType) {
            tab.check = true
          }
        })
      }
      this.jump = true
    },

    inputFocus() {
      console.log('键盘弹起')
      setTimeout(() => {
        document.body.scrollTop = 99999;
      }, 500);
    },

    /**
     * 获取跳转名称
     * @return {[type]} [description]
     */
    getJump() {
      // 跳转链接
      if (this.activityInfo.jumpType == 0) {
        this.activityInfo.activityLink = this.$merchantlib.getMerchantId()
        this.jumpName = '商户主页'
        console.log('选择了 商户主页 :' + this.activityInfo.activityLink)
      } else if (this.activityInfo.jumpType == 1) {
        console.log('选择了 节目')
      } else if (this.activityInfo.jumpType == 2) {
        console.log('选择了 上新feed')
      } else if (this.activityInfo.jumpType == 3) {
        let match = /^((ht|f)tps?):\/\/([\w\-]+(\.[\w\-]+)*\/)*[\w\-]+(\.[\w\-]+)*\/?(\?([\w\-\.,@?^=%&:\/~\+#]*)+)?/;
        console.log('结果', match.test(this.$refs.titles.value));
        if (!match.test(this.externalLink)) {
          return this.$toast('请输入合法的链接地址')
        }
        this.externalLink = this.externalLink.replace(/\s/g, '');
        this.activityInfo.activityLink = this.jumpName = this.externalLink
        console.log('选择了 外部链接 :' + this.activityInfo.activityLink)
      }
      this.jump = false
    },

    /**
     * 关联优惠券 huixian
     * @return {[type]} [description]
     */
    onCoupons() {
      console.log('关联优惠券')
      this.coupons = !this.coupons
      let couponTemplateIdList = this.activityInfo.couponTemplateIdList
      this.couponCount = couponTemplateIdList.length
      console.log(couponTemplateIdList.length)
      if (couponTemplateIdList.length > 0) {
        couponTemplateIdList.map((couponTemplateId) => {
          // console.log(couponTemplateId)
          this.couponList.map(coupon => {
            if (coupon.couponTemplateId == couponTemplateId) {
              // console.log(coupon)
              coupon.state = true
            }
          })
        })
      }
    },

    getValues() {
      (this.couponCount > 0) ? (this.relCoupon = '已选' + this.couponCount + '张优惠券') : (this.relCoupon = '选填');
      this.coupons = false
    },

    /**
     * 选择优惠券
     * @param  {[type]} index [description]
     * @param  {[type]} arrs  [description]
     * @return {[type]}       [description]
     */
    chooseAttr(index, arrs) {
      // console.log(index, arrs)
      let state = arrs[index].state;
      if (state === false) {
        if (this.couponCount >= 10) {
          console.log('选中数量', this.couponCount)
          return this.$toast('关联优惠券，上限10张')
        }
        arrs[index].state = true
        this.couponCount += 1
        this.activityInfo.couponTemplateIdList.push(arrs[index].couponTemplateId)
        console.log('选中', arrs[index].couponTemplateId)
      } else {
        arrs[index].state = false
        this.couponCount -= 1
        console.log('取消选中', arrs[index].couponTemplateId)
        let delIndex = Vue.$_.indexOf(this.activityInfo.couponTemplateIdList, arrs[index].couponTemplateId)
        this.activityInfo.couponTemplateIdList.splice(delIndex, 1)
      }
      // console.log('couponTemplateIdList:', this.activityInfo.couponTemplateIdList)
    },

    /**
     * 选择节目
     * @param  {[type]} index [description]
     * @param  {[type]} arrs  [description]
     * @return {[type]}       [description]
     */
    chooseAttrs(index, arrs) {
      for (let i = 0; i < arrs.length; i += 1) {
        arrs[i].state = false
      }
      let state = arrs[index].state;
      console.log('选择节目:', JSON.stringify(arrs[index]))
      if (state === false) {
        // 选中的节目
        arrs[index].state = true
        this.jumpName = arrs[index].title // 节目名称
        this.programId = arrs[index].title // 节目Id
      } else {
        arrs[index].state = false
        this.jumpName = arrs[index].title
      }
    },

    /**
     * 校验
     * @return {[type]} [description]
     */
    validation() {
      console.log('进入校验')
      if (this.activityInfo.activityCover == '' || this.activityInfo.activityCover == null) {
        this.$toast('请设置活动封面！')
        return false
      }
      if (this.activityInfo.activityImgList.length == 0) {
        this.$toast('请设置活动图片！')
        return false
      }
      // let title = this.activityInfo.title
      if (this.activityInfo.title == '' || this.activityInfo.title == null) {
        this.$toast('请输入活动标题！');
        return false
      }
      if (this.activityInfo.activityBeginDate > this.activityInfo.activityEndDate) {
        this.$toast('结束时间不能早于开始时间！')
        return false
      }
      // console.log('结束时间：', new Date(this.activityInfo.activityEndDate), '当前时间：', new Date(), '结束时间是否小于当前时间：', new Date(this.activityInfo.activityEndDate) < new Date())
      if (new Date(this.activityInfo.activityEndDate) < new Date()) {
        this.$toast('结束时间不能早于当前时间！')
        return false
      }
      if (this.activityInfo.activityLink == null || this.activityInfo.activityLink == '') {
        this.$toast('请选择活动跳转！')
        return false
      }
      return true;
    },

    /**
     * 选择活动跳转
     * @param  {[type]} item  [description]
     * @param  {[type]} index [description]
     * @return {[type]}       [description]
     */
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
      // console.log('点击的Item', item)
      if (index === 0) {
        // this.activityInfo.activityLink = this.$merchantlib.getMerchantId()
        // this.jumpName = '商户主页'
        console.log('点击 商户主页')
      }
      if (index === 1) {
        console.log('点击 节目')
      }
      if (index === 2) {
        console.log('点击 上新Feed 跳转')
      }
      if (index === 3) {
        // this.activityInfo.activityLink = ''
        console.log('点击 外部链接')

        // this.$refs.titles.value = this.activityInfo.activityLink
      }
      this.activityInfo.jumpType = item[index].jumpType
      // console.log(JSON.stringify(this.activityInfo))
    },

    /**
     * 提交
     * @return {[type]} [description]
     */
    subAudit(activityState) {
      let self = this
      if (!this.validation()) {
        return
      }
      console.log('通过校验')
      let content;
      if (activityState == 1) {
        content = '是否确认提交审核？'
      }
      if (activityState == 0) {
        content = '是否确认保存草稿？'
      }
      this.$modal({
        content: content,
        buttons:
        [
          {text: '取消', onClick: function () {}}, //返回商品库
          {text: '确定',
            onClick: function () {
              if (self.flag == '1' || self.flag == '3') {
                console.log('新增活动')
                self.insertActivityInfo(activityState, function (err) {
                  if (err) {
                    return self.$toast({
                      message: '操作失败:' + err,
                    });
                  }
                  self.$activitylib.clearLocalActivity()
                  self.$utillib.storageRemove('marketingActivitiesFlag')
                  self.$router.go(-1)
//                  self.$router.replace({name: '6.7'})
                });
              } else {
                console.log('编辑活动')
                self.updateActivityInfo(activityState, function (err) {
                  if (err) {
                    return self.$toast({
                      message: '操作失败:' + err,
                    });
                  }
                  self.$activitylib.clearLocalActivity()
                  self.$utillib.storageRemove('marketingActivitiesFlag')
//                  self.$router.replace({name: '6.7'})
                  self.$router.go(-1)
                });
              }
            }
          }
        ]
      });
    },

    /**
     * 提交审核 存草稿
     * @param  {[type]}   activityState [description]
     * @param  {Function} callback      [description]
     * @return {[type]}                 [description]
     */
    insertActivityInfo(activityState, callback) {
      this.activityInfo.activityState = activityState
      console.log(this.activityInfo.activityState)
      this.activityInfo.type = 0 // 默认活动类型

      this.$activitylib.insertActivityInfo(this.activityInfo, (err, obj) => {
        if (err) {
          // this.$toast(err)
          callback(err)
        }
        callback(null, obj)
        // this.$router.push({path: '/activities/'})
      })
    },

    /**
     * 编辑活动信息
     * @return {[type]} [description]
     */
    updateActivityInfo(activityState, callback) {
      this.activityInfo.activityState = activityState
      this.activityInfo.activityId = this.activityId
      this.$activitylib.updateActivityInfo(this.activityInfo, (err, obj) => {
        if (err) {
          // this.$toast(err)
          callback(err)
        }
        callback(null, obj)
      })
    }
  },
  computed: {
    singleImg() {
      let arr = [];
      arr.push(this.activityInfo.activityCover)
      return arr;
    },
    /**
     * 非空校验
     * @return {[type]} [description]
     */
    disabled () {
      // console.log('this.uploadImage:', this.uploadImage, 'tactivityBeginDate:', this.activityInfo.activityBeginDate != '必选', 'activityEndDate:', this.activityInfo.activityEndDate != '必选', 'activityLink', this.activityInfo.activityLink != null)
      return this.uploadImageVisible && this.activityInfo.title && this.activityInfo.activityBeginDate != '必选' && this.activityInfo.activityEndDate != '必选' && this.activityInfo.activityLink != null && this.activityInfo.activityImgList.length > 0
    }
  }
}
</script>

