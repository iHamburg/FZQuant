<style lang="scss" src="src/sass/actDetail.scss" scoped></style>
<template>
  <div class="content-act">

    <bl-bar barStyle="bar-dark-linear">
        <div class="button" slot="left-button" @click="$router.go(-1)">
          <div class="iconfont arrow-back"><i class="fback">返回</i></div>
        </div>
        <div slot="title">活动详情</div>
        <div class="button" slot="right-button" v-show="editBtn" @click="onEditBtn('2')">编辑</div>
    </bl-bar>
    <dl class="tips">
      <dd>{{stateName}}</dd>
      <dd style="text-align:center;color:red;font-size:100%" v-if="activityInfo.activityState == 3">理由：{{activityInfo.auditNote}}</dd>
    </dl>

    <div class="act-detail notop">

        <div class="active">
          <span><img :src="activityInfo.activityCover"></span>
          <upload :maxpic='9' :paths='activityInfo.activityImgList' :name='"活动图片"' class="margin-b" @clickImg='parentImg' :canEdit="false">
          </upload>
          <!-- 查看大图 -->
          <bigImage :picPaths="activityInfo.activityImgList"  ref='big'></bigImage>

          <bl-comli>
              <div slot='left-text' class="left-box">活动标题</div>
              <div slot='right-text' class="right-box">{{activityInfo.title}}</div>
          </bl-comli>
          <bl-comli>
              <div slot='left-text' class="left-box release">开始时间</div>
              <div slot='right-text' class="right-box">{{activityInfo.activityBeginDate}}</div>
          </bl-comli>
          <bl-comli>
              <div slot='left-text' class="left-box release">结束时间</div>
              <div slot='right-text' class="right-box">{{activityInfo.activityEndDate}}</div>
          </bl-comli>
        </div>

        <div class="active-nav">
          <dl>
              <dt>活动规则</dt>
              <dd>
                  {{activityInfo.activityRule}}
              </dd>
          </dl>
          <dl>
              <dt>活动内容</dt>
              <dd>
                  {{activityInfo.activityContent}}
              </dd>
          </dl>
        </div>

        <bl-comli class="actbox">
            <div slot='left-text' class="left-box">活动跳转</div>
            <div slot='right-text' class="right-box">
                <div class="right-r"><div class="ellipsis">{{jumpName}}</div></div>
            </div>
        </bl-comli>


        <div class="rel-coupons">
            <bl-comli>
                <div slot='left-text' class="left-box">关联优惠券</div>
                <div slot='right-text' class="right-box" v-if="itemcards.length == 0">
                    <div class="right-r"><div class="ellipsis">暂无关联优惠券</div></div>
                </div>
            </bl-comli>

            <bl-check-box class="check-content" v-if="itemcards.length > 0"  v-for="(item, index) in itemcards">
                <div slot="check-box" class="checkbox">
                    <div class="check-card">
                        <!-- <div class="card">
                          &yen;{{ item.price }}
                          <span>满 {{ item.toprice }} 可用</span>
                        </div> -->
                        <div class="card">
                          {{item.typeName}}
                        </div>
                        <dl>
                            <dt>{{ item.couponName }}</dt>
                            <dd>券描述：{{ item.couponDesc }}</dd>
                            <!-- <dd class="time"> 适用范围：{{ item.range }}</dd> -->
                            <dd>有效期：{{ item.enableTimeFrom }} - {{ item.enableTimeTo }}</dd>
                        </dl>
                    </div>
                </div>
            </bl-check-box>

        </div>

        <!-- 2017/7/17 隐藏活动预览 iOSApp审核不通过 -->
        <!-- <bl-comli class="actbox">
            <div slot='left-text' class="left-box">活动页预览</div>
            <div slot='right-text' class="right-box" @click="onPreview">
                <button class="preview">点击预览</button>
            </div>
        </bl-comli> -->

    </div>
    <div style="height:1px;"></div>

    <!-- 审核不通过 -->
    <bl-popup v-model="popupVisible" position="bottom" style="width: 100%;">
          <bl-cust-picker  show-toolbar @cancel="cancel" @getValues="getValues">
              <div slot="content"  class="cust">
                  <dl>
                      <dt>请选择审核不通过的理由</dt>
                      <dd v-for="(item, index) in reasonList" @click="chooseAttr(index, reasonList)">
                        <div class="line">
                          <span class="checkicon" :class="item.state">
                              <i></i>
                          </span>
                          <span>{{ item.name }}</span>
                        </div>
                      </dd>
                  </dl>
              </div>
          </bl-cust-picker>
      </bl-popup>

    <!--遮罩-->
    <div v-if="popupVisible" @click="popupVisible = !popupVisible">
      <div class="modal-bg"></div>
    </div>

    <!--  0：草稿，1：待审核,，2：上线中，3：审核不通过，4：已下线，5：已过期,6：待上线 -->
    <div class="editgress" v-if="btn_auth">
      <!-- 操作权限 店长 店员 -->
      <div v-show="activityInfo.activityState == '0'">
        <bl-button  @click="onSubmit('1')">提交审核</bl-button>
      </div>

      <!-- 操作权限 店长 -->
      <div v-show="activityInfo.activityState == '1'" v-if="roleId == '9'" >
        <button class="button2" @click="onAuditNotPass">审核不通过</button>
        <button class="button2" @click="onSubmit('2')">审核通过并上线</button>
      </div>

      <!-- 操作权限 店长 -->
      <div v-show="activityInfo.activityState == '2'" v-if="roleId == '9'">
        <bl-button class="button1" @click="onSubmit('4')">下线</bl-button>
      </div>

      <!-- 操作权限 店长 -->
      <div v-show="activityInfo.activityState == '4' || activityInfo.activityState == '5'"  v-if="roleId == '9'">
        <button class="button2" @click="onEditBtn('3')">再来一次</button>
        <button class="button2" @click="onSubmit('2')">恢复上线</button>
      </div>

      <div v-show="activityInfo.activityState == '6'" v-if="roleId == '9'" >
        <button class="button2" @click="onSubmit('4')">下线</button>
        <button class="button2" @click="onSubmit('7')">立即上线</button>
      </div>
    </div>

  </div>

</template>

<script>
// import api from 'src/api/index'
import uiMixin from 'src/mixins/uiMixin';
//import jsbridge from 'src/mixins/jsbridge';
import upload from 'components/bl-cloudstore-merchant/bl-cloudStore-image-uploader';
import bigImage from 'components/bl-cloudstore-merchant/bl-cloudStore-seeBigImage';
export default {
  name: 'actDetail',
  mixins: [uiMixin],
  components: {
    upload,
    bigImage,
    'BlCustPicker': () => System.import('components/cloud-merchant/cust-picker'),
    'BlCheckBox': () => System.import('components/cloud-merchant/check-box'),
  },
  mounted() {
    // setTimeout(function() {
    //   document.querySelector('.act-editbar').style.position = "fixed"
    // }, 3000)

    this.roleId = this.$merchantlib.getRoleId();
    this.activityId = this.$route.params.id
    console.log(this.activityId)
    this.queryActivityDetail()
    // this.queryCoupons()
  },
  data () {
    return {
      roleId: '',
      activityId: '',
      activityInfo: {
        // activityBeginDate: '2017-5-31 10:00:00',
        // activityEndDate: '2017-6-6 22:00:00',
        // activityContent: '活动规则一、活动规则二、活动规则三、活动规则四、活动规则一、活动规则二、活动规则三、活动规则四、活动规则活动规则一、活动规则二、活动规则三、活动规则四四四…',
        // activityCover: '',
        // activityId: '',
        // activityLink: '',
        // activityRule: '活动规则一、活动规则二、活动规则三、活动规则四、活动规则一、活动规则二、活动规则三、活动规则四、活动规则活动规则一、活动规则二、活动规则三、活动规则四四四…',
        // couponTemplateIdList: '',
        // title: '假日狂欢满88返礼包活动',
        // type: '',
        // activityState: '5'
      },

      itemcards: [
        /*{
          "price": "120",
          "toprice": "5999",
          "couponName": "星爸爸马克杯券",
          "couponDesc": "在百联购物中心消费200元在百联购物中心消费200元",
          "state": "",
          "term": ["2017.05.22", "2017.09.30"],
          "range": "礼品券Test耶里夏利"
        },
        {
          "price": "120",
          "toprice": "599",
          "couponName": "星爸爸马克杯券",
          "couponDesc": "在百联购物中心消费200元在百联购物中心消费200元",
          "state": "",
          "term": ["2017.05.22", "2017.09.30"],
          "range": "礼品券Test耶里夏利"
        }*/
      ],
      reasonList: [
        {'name': '品名错误', 'state': ''},
        {'name': '规格错误', 'state': ''},
        {'name': '图片错误', 'state': ''},
        {'name': '品牌错误', 'state': ''},
        {'name': '重量错误', 'state': ''},
        {'name': '其他原因，请与审核人确认', 'state': ''}
      ],
      popupVisible: false,
      auditNote: '', // 审核不通过理由
      picindex: -1,
      siglepath: '',

    }
  },
  methods: {
    onAuditNotPass() {
      console.log('审核不通过')
      this.popupVisible = !this.popupVisible
    },

    cancel() {
      this.popupVisible = false;
    },

    chooseAttr(index, arrs) {
      let state = this.reasonList[index].state;
      if (state == "check") {
        arrs[index].state = ""
      } else {
        arrs[index].state = "check"
      }
    },

    //图片放大.
    parentImg(index) {
      // this.siglepath = this.activityInfo.activityImgList[index];
      // this.$refs.big.style.visibility = 'visible';
      // this.mainImgIndex = index;
      this.$refs.big.openBigImage(index);
    },
    //图片缩小.
    hidebig() {
      this.$refs.big.style.visibility = 'hidden';
    },

    /**
     * 选择审核不通过理由
     * @return {[type]} [description]
     */
    getValues() {
      let self = this;
      self.reasonList.forEach((key, val) => {
        if (key.state == 'check') {
          this.auditNote += key.name + ';';
        }
      })
      this.popupVisible = false
      if (this.auditNote == '') {
        return this.$toast('请选择审核不通过的理由')
      } else {
        // 选择了理由，调接口改变状态
        this.updateActivityState('3', (err, obj) => {
          if (err) {
            return this.$toast({message: '操作失败:' + err})
          }
          this.$router.go(-1)
        })
      }

      console.log(this.auditNote);
    },

    onEditBtn(flag) {
      if (flag == '2') {
        console.log('点击编辑')
        this.$router.push({name: '6.5.1', params: {id: this.activityId, flag: flag}})
      } else if (flag == '3') {
        console.log('再来一次')
        this.$router.push({name: '6.4', params: {id: this.activityId, flag: flag}})
      }
      // this.$router.push({path: '/activities/edit/' + this.activityId})
    },

    /**
     * 查询关联优惠券
     */
    queryCoupons() {
      console.log('查询关联优惠券')
      let couponTemplateIdList = this.activityInfo.couponTemplateIdList
      if (couponTemplateIdList == null || couponTemplateIdList.length <= 0) { return }
      // console.log('couponTemplateIdList', this.activityInfo.couponTemplateIdList)
      let itemcards = []
      for (var i = 0; i < couponTemplateIdList.length; i++) {
        console.log(couponTemplateIdList[i])
        // 查询礼品券
        this.$couponlib.queryCouponDetail(couponTemplateIdList[i], (err, obj) => {
          if (err) { console.log(err) }
          if (obj) {
            console.log('查询礼品券 coupon:', JSON.stringify(obj))
            obj.typeName = '礼品券'
            itemcards.push(obj)
          }
        })
        // 查询满减券
        this.$couponlib.queryFullCutCouponDetail({'couponTemplateId': couponTemplateIdList[i]}, (err, obj) => {
          if (err) { console.log(err) }
          if (obj) {
            console.log('查询满减券 coupon:', JSON.stringify(obj))

            obj.typeName = '满减券'
            obj.couponDesc = '满' + obj.full + '减' + obj.cut
            obj.enableTimeFrom = this.$utillib.fmtDate(new Date(obj.enableTimeFrom), 'yyyy-MM-dd')
            obj.enableTimeTo = this.$utillib.fmtDate(new Date(obj.enableTimeTo), 'yyyy-MM-dd')
            itemcards.push(obj)
          }
        })
      }
      this.itemcards = itemcards
    },

    /**
     * 查询活动详情
     * @return {[type]} [description]
     */
    queryActivityDetail() {
      this.startLoading()
      let param = {
        activityId: this.activityId
      }
      this.$activitylib.queryActivityDetail(param, (err, obj) => {
        this.stopLoading()
        if (err) {
          this.$toast(err)
        }
        if (obj != null) {
          console.log('结果', JSON.stringify(obj))
          this.activityInfo = obj
          this.queryCoupons()
        } else {
          console.log('暂无活动信息，请稍后再试')
          this.$toast('暂无活动信息，请稍后再试')
        }
      })
    },

    onPreview() {
      // C端分享落地页
//      let url = 'http://120.136.161.164:9000/page/share/activityDetail/' + this.activityId
//      console.log('点击预览', url)

      this.$servicelib.getShareUrl(this.activityId, (err, obj) => {
        if (err) {
          return this.$toast(err)
        }
        console.log('getShareUrl', obj)
        this.$jsbridgelib.bridgeOpenUrl(obj, (err, obj) => {
          if (err) {
            console.log(err)
            this.$toast(err)
          }
          if (obj) {
            console.log(obj)
          }
        })
      })

      // window.location.href = url
    },

    onSubmit(activityState) {
      let self = this
      let content;
      let sureButton;
      console.log('点击按钮,更新活动状态：', activityState)
      if (activityState == '1') { // 待审核
        content = '是否确认提交审核？'
        sureButton = '确认提交'
      }
      if (activityState == '2') { // 上线
        content = '是否确认审核通过并上线？'
        sureButton = '确认'
      }
      if (activityState == '3') { // 上线
        content = '是否确认审核不通过？'
        sureButton = '确认'
      }
      if (activityState == '4') { // 下线
        content = '是否确认下线？下线后活动网页内容将不可访问。'
        sureButton = '确认下线'
      }
      if (activityState == '7') { // 立即上线
        content = '是否确认立即上线？'
        sureButton = '确认上线'
      }

      self.$modal({
        content,
        buttons:
        [
          {text: '取消', onClick: function () {}}, //返回商品库
          {text: sureButton,
            onClick: function () {
              console.log('更新活动状态', activityState)
              self.updateActivityState(activityState, (err) => {
                if (err) {
                  return self.$toast({
                    message: '操作失败:' + err,
                  });
                }
                self.$router.go(-1)
                console.log('返回')
              });
            }
          }
        ]
      });
    },

    /**
     * 更新活动状态
     * @return {[type]} [description]
     */
    updateActivityState(activityState, callback) {
      // console.log('更新活动状态', activityState)
      let param = {
        activityId: this.activityId,
        auditNote: this.auditNote,
        activityState: activityState
      }
      this.$activitylib.updateActivityState(param, (err, obj) => {
        if (err) {
          callback(err)
        } else {
          // 更新成功 obj 为 null
          callback(null, obj)
        }
      })
    },

  },
  computed: {
    jumpName() {
      let str = ''
      let jumpType = this.activityInfo.jumpType
      console.log('jumpType', jumpType)
      if (jumpType == 0) {
        str = '商户主页'
      } else if (jumpType == 3) {
        str = this.activityInfo.activityLink
      } else if (jumpType == 2) {
        str = '上新Feed'
      } else if (jumpType == 1) {
        str = '节目'
      }
      return str
    },
    stateName() {
      // 0:草稿,1:带审核,2:上线中,3:审核不通过,4:已下线，5：已过期
      let activityState = this.activityInfo.activityState
      // console.log('activityState', activityState)
      if (activityState == '0') {
        return '草稿'
      } else if (activityState == '1') {
        return '待审核'
      } else if (activityState == '2') {
        return '上线中'
      } else if (activityState == '3') {
        return '审核不通过'
      } else if (activityState == '4') {
        return '已下线'
      } else if (activityState == '5') {
        return '已过期'
      } else if (activityState == '6') {
        return '待上线'
      }
    },

    editBtn() {
      let activityState = this.activityInfo.activityState
      if (activityState == '0' || activityState == '3') {
        return true
      } else {
        return false
      }
    },

    btn_auth() {
      let activityState = this.activityInfo.activityState;
      let roleId = this.roleId;
      if (activityState != '0' && roleId == '8') {
        return false
      }
      return true
    },
  },

}
</script>
