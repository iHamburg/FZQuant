<style lang="scss" src="src/sass/aftersalesdetail.scss" scoped></style>

<template>
  <div class="content">

    <bl-bar barStyle="bar-dark-linear">
        <div class="button" slot="left-button" @click="onBack">
          <div class="iconfont arrow-back"><i class="fback">返回</i></div>
        </div>
        <div slot="title">售后单详情</div>
    </bl-bar>

    <div class="order-boxs">
      <dl class="order-buyer">
        <dt>
          <span>售后状态</span> <i style="color:red;">{{statusStr}}</i>
        </dt>

        <dt v-if="aftersalesInfo.status == 0 || aftersalesInfo.status == 1 || aftersalesInfo.status == 3 || aftersalesInfo.status == 4">{{titleString}}</dt>
        <!-- 理由 -->
        <dt v-if="aftersalesInfo.status == 2">
          理由：{{aftersalesInfo.refusalReasons}}，请联系客户协商解决
        </dt>

        <!-- <dt v-if="aftersalesInfo.denyReasonUrl.length > 0">
          <span v-for="(img, index) in aftersalesInfo.denyReasonUrl">
            <img :src="img" @click='parentImg(img)'>
          </span>
        </dt> -->

        <dl class="pingzheng" v-show="aftersalesInfo.denyReasonUrl">
          <dd>
            <span v-for="(img, index) in aftersalesInfo.denyReasonUrl">
              <img :src="img" @click='parentImg(index,1)'>
            </span>
          </dd>
        </dl>

      </dl>

      <div class="act-detail notop">
        <div class="active" >
          <bl-comli v-show="aftersalesInfo.logisticsCompanyName != null">
            <div slot='left-text' class="left-box">物流公司</div>
            <div slot='right-text' class="right-box">{{aftersalesInfo.logisticsCompanyName}}</div>
          </bl-comli>
          <bl-comli v-show="aftersalesInfo.trackingNumber != null">
            <div slot='left-text' class="left-box">物流单号</div>
            <div slot='right-text' class="right-box">{{aftersalesInfo.trackingNumber}}</div>
          </bl-comli>
        </div>
      </div>

      <dfn>申请的退货商品</dfn>
      <div class="order-product" @click="onOrder">
        <div class="probox" v-for="goods in aftersalesInfo.goodsList">
            <span class="picture"><img :src="goods.imgUrl"></span>
            <dl>
              <dt>{{ goods.goodsName }}</dt>
              <dd>
                  <span class="pl">{{ getSkuName(goods.skuName) }} x{{ goods.goodsNum }}</span>
                  <!-- 11/06 产品需求隐藏 -->
                  <!-- <span class="pr">&yen; {{ goods.goodsPrice }}</span> -->
              </dd>
            </dl>
        </div>
        <bl-comli>
          <div slot='right-text' class="right-box">
            <div class="right-r" style="color:#586C94" @click="">查看订单 </div>
            <div class="iconfont arrow-back"></div>
          </div>
       </bl-comli>
      </div>

      <div class="act-detail notop">
        <div class="active" >
          <bl-comli>
            <div slot='left-text' class="left-box">售后编号</div>
            <div slot='right-text' class="right-box">{{aftersalesInfo.saleAfterId}}</div>
          </bl-comli>
          <bl-comli>
            <div slot='left-text' class="left-box">申请类型</div>
            <div slot='right-text' class="right-box">{{typeStr}}</div>
          </bl-comli>
          <bl-comli>
            <div slot='left-text' class="left-box release">退货原因</div>
            <div slot='right-text' class="right-box">{{reasonStr}}</div>
          </bl-comli>
          <bl-comli>
            <div slot='left-text' class="left-box release">退货方式</div>
            <div slot='right-text' class="right-box">{{returnTypeStr}}</div>
          </bl-comli>
          <bl-comli>
            <div slot='left-text' class="left-box release">退货数量</div>
            <div slot='right-text' class="right-box">{{aftersalesInfo.count}}</div>
          </bl-comli>
          <!-- <bl-comli>
            <div slot='left-text' class="left-box release">问题描述</div>
            <div slot='right-text' class="right-box">{{aftersalesInfo.remark}}</div>
          </bl-comli> -->
        </div>
      </div>

      <bl-comli class="service-top" v-show="aftersalesInfo.isAll == '0'">
          <div slot='left-text' class="left-box">问题描述</div>
          <div slot='right-text' class="right-box">{{aftersalesInfo.remark}}</div>
          <!-- <div slot='right-text' class="right-box" @click="coupons = !coupons">
              <div class="right-r">请输入描述</div>
              <div class="iconfont arrow-back"></div>
          </div> -->
      </bl-comli>

      <dl class="pingzheng" v-show="aftersalesInfo.isAll == '0'">
        <dt>凭证
          <!-- <i>3/3</i> -->
        </dt>
        <dd>
          <span v-for="(img, index) in aftersalesInfo.imgList">
            <img :src="img" @click='parentImg(index,2)'>
          </span>
        </dd>
      </dl>

      <bigImage  :picPaths="aftersalesInfo.denyReasonUrl"  ref='big1'  ></bigImage>
      <bigImage  :picPaths="aftersalesInfo.imgList"  ref='big2'  ></bigImage>

      <bl-comli class="service-top">
          <div slot='left-text' class="left-box">店员备注</div>
          <div slot='right-text' class="right-box">
              <div class="right-r" @click="remarkVisible = true">
                <button class="add" >添加</button>
              </div>
          </div>
      </bl-comli>
      <!--<div style="height: 1.2rem; "></div>-->
      <div class="service-note">
        <dl v-for="item in aftersalesInfo.remarkList">
          <dt>{{ item.name }} <span class="time">{{ item.publishedAt }}</span></dt>
          <dd>{{ item.content }}</dd>
        </dl>
      </div>

    <!-- 申请中 -->
    <div class="editgress1 service-top" v-show="aftersalesInfo.status == '0'">
      <button class="red" @click="onCallCustomer">联系客户</button>
      <!-- <button v-if="aftersalesInfo.isTermination == 1" @click="popupVisible = !popupVisible">中止受理</button> -->
      <button v-if="aftersalesInfo.isTermination == 1" @click="onReject">中止受理</button>
      <button @click="onSubmit('1')">{{intheapplication}}</button>
    </div>

    <!-- 待退回 -->
    <div class="editgress1 service-top" v-show="aftersalesInfo.status == '1'">
      <button class="red" @click="onCallCustomer">联系客户</button>
      <!-- <button
        class="123"
        @click="popupVisible = !popupVisible"
        v-show="this.aftersalesInfo.returnType == '1' && aftersalesInfo.isTermination == 1">
        中止受理
      </button> -->
      <button
        class="123"
        @click="onReject"
        v-show="this.aftersalesInfo.returnType == '1' && aftersalesInfo.isTermination == 1">
        中止受理
      </button>
      <button @click="onSubmit1()" v-show="this.aftersalesInfo.returnType == '1'">确认申请</button>
    </div>

    <!-- 退货中 -->
    <div class="editgress1 service-top" v-show="aftersalesInfo.status == '3'">
      <button class="red" @click="onCallCustomer">联系客户</button>
      <!-- <button
        v-if="aftersalesInfo.isTermination == 1"
        @click="popupVisible = !popupVisible">
        中止受理
      </button> -->
      <button
        v-if="aftersalesInfo.isTermination == 1"
        @click="onReject">
        中止受理
      </button>
      <button @click="onConfirm()">确认退货</button>
    </div>

    <!-- 中止受理 退款中 已退款-->
    <div class="editgress1 service-top" v-show="aftersalesInfo.status == '2' || aftersalesInfo.status == '4' || aftersalesInfo.status == '5'">
      <button class="red" @click="onCallCustomer">联系客户</button>
    </div>

    </div>

    <bl-cust-pickers :buttons="buttons" v-if="remarkVisible">
      <div slot="inner">
          <h2>添加备注</h2>
          <textarea type="text" name="notes" maxlength="100" placeholder="请输入备注(上限100字)" class="notes" v-model.trim="content"></textarea>
      </div>
    </bl-cust-pickers>

    <bl-popup v-model="popupVisible" position="bottom" style="width: 100%;" >
      <bl-picker ref="returnType" :slots="slots" :visible-item-count="3" show-toolbar @cancel="cancel" @getValues="getValues" :toolbarSubText="endTitle"></bl-picker>
    </bl-popup>
    <bl-popup v-model="otherVisible" position="bottom" style="width: 100%;" >
        <bl-cust-picker  show-toolbar @cancel="otherVisible = !otherVisible" @getValues="getotherValues" :toolbarSubText="otherTitle">
          <div slot="content" class="comments">
              <textarea name="text" maxlength="20" placeholder="请输入理由(上限20字)" ref="notes"></textarea>
          </div>
        </bl-cust-picker>
    </bl-popup>
    <div class="modal-bg" v-if="popupVisible || otherVisible" @click="close"></div>

  </div>
</template>

<script>
  import blProgress from 'components/cloud-merchant/status-progress';
  import upload from 'components/cloud-merchant/upload'
  import BlCustPickers from 'components/cloud-merchant/merchant-modal';
  import bigImage from 'components/bl-cloudstore-merchant/bl-cloudStore-seeBigImage'

  export default {
    name: 'aftersalesDetails',
    components: {
      blProgress,
      upload,
      bigImage,
      'BlCustPicker': () => System.import('components/cloud-merchant/cust-picker'),
      BlCustPickers,
    },
    mixins: [],
    data() {
      return {
        siglepath: '',
        // picindex: -1,
        // paths: ['http://img.st.iblimg.com/cloud-1/1929673329.jpg'],
        popupVisible: false,
        otherVisible: false,
        endTitle: '请选择中止受理的理由',
        otherTitle: '其他理由',
        slots: [
          {
            flex: 1,
            values: [
              '不符合7天无理由退换规则',
              '超时',
              '顾客发回假冒商品',
              '商品发错',
              '缺少赠品/附件',
              '人为损坏',
              '其他理由',
            ],
            defaultIndex: 1,
            textAlign: 'center'
          }
        ],
        remarkVisible: false,
        buttons: [{
          text: '取消',
          onClick: () => {
            this.remarkVisible = false
          }
        }, {
          text: '确认',
          onClick: () => {
            this.addRemark()
            // this.ruleVisible = false;
            // this.contentVisible = false;
          }
        }],
        content: '', // 备注
        aftersalesInfo: {
          count: 0, // 退货数量
          expiredAt: '', // 过期时间
          goodsList: [
            {
              goodsId: '', // 商品Id
              goodsName: '', // 商品名称
              goodsNum: '', // 数量
              goodsPrice: '', // 单品售价
              imgUrl: '', // 商品主图
              skuName: '' // 属性值
            }
          ],
          imgList: [], // 凭证
          memberId: '', // 会员ID
          orderId: '', // 订单Id
          publishedAt: '', // 申请时间
          reasonId: '', // 退货理由id
          isAll: '', // 是否整单(0否 1是)
          logisticsCompanyName: '', // 物流公司名称
          trackingNumber: '', // 运单号
          remark: '', // 问题描述
          remarkList: [
            {
              content: '', // 内容
              memberId: '', // 会员ID
              name: '', // 会员名称
              publishedAt: '' // 发布时间
            }
          ],
          returnType: '', // 退货方式
          saleAfterId: '', // 售后单Id
          status: '', // 状态
          type: '' // 申请类型
        },

        denyReason: '非质量问题', // 终止理由
        saleAfterId: '', // 售后单ID
        titleString: '',
      };
    },
    created() {

    },
    mounted() {
      this.saleAfterId = this.$route.params.id
      this.updateData()
      setInterval(() => {
        // this.time = this.$utillib.countdowm(new Date(this.aftersalesInfo.expiredAt.replace(/-/g, "/")).getTime())
        this.titleString = this.$aftersaleslib.generateTitleString(this.aftersalesInfo)
        // console.log('titleString:', this.titleString)
      }, 1000)
      // console.log('mounted', this.saleAfterId, 'isAll', this.aftersalesInfo.isAll)
      setTimeout(function() {
        document.querySelector('.editgress').style.position = "fixed"
      }, 500)
    },
    methods: {
      parentImg(index, type) {
        //console.log('大图', index + ' --- ', type)
        if (type == 1) {
          this.$refs.big1.openBigImage(index);
        } else if (type == 2) {
          this.$refs.big2.openBigImage(index);
        }
      },
      //============//
      cancel() {
        this.popupVisible = false
      },
      getValues(val) {
        this.popupVisible = false
        let values = val[0];
        if (values == '其他理由') {
          this.otherVisible = true
        } else {
          console.log('不通过理由:', values)
          this.denyReason = values
          this.onSubmit('2')
        }
      },
      getotherValues() {
        let val = this.$refs.notes.value
        console.log('其他理由：', val.length)
        if (val.length <= 0) {
          return this.$toast('请输入理由')
        }
        this.denyReason = val
        this.onSubmit('2')
        this.otherVisible = false
      },
      close() {
        this.popupVisible = false
        this.otherVisible = false
      },
      onBack() {
        console.log('onBack');
        if (this.$route.query.from == 'device') {
          this.$jsbridgelib.bridgeNativeBack();
        } else {
          this.$router.go(-1);
        }
      },

      addRemark() {
        console.log('添加备注', this.content)
        let param = {
          afterSalesId: this.saleAfterId,
          content: this.content
        }
        if (this.content == null || this.content == '') {
          return this.$toast('请填写需要备注的内容')
        }
        this.remarkVisible = false
        this.$aftersaleslib.addRemark(param, (err, obj) => {
          if (err) {
            return this.$toast(err)
          }
          this.content = ''
          this.updateData()
        })
      },
      /**
       * 更新数据
       * @return {[type]} [description]
       */
      updateData() {
        this.queryAfterselesInfo((err, obj) => {
          if (err) {
            this.$toast('queryAfterselesInfo errMsg:' + err)
          }
          if (obj) {
            // console.log(obj)
            this.aftersalesInfo = obj
            this.maxRefunds = obj.maxRefunds
          }
        })
      },

      /**
       * 查询售后单详情
       * @return {[type]} [description]
       */
      queryAfterselesInfo(callback) {
        let param = {saleAfterId: this.saleAfterId}
        this.$aftersaleslib.queryAfterselesInfo(param, (err, obj) => {
          if (err) {
            if (callback) { callback(err) }
          }
          if (obj) {
            if (callback) { callback(null, obj) }
          }
        })
      },

      /**
       * 按钮触发
       * @return {[type]} [description]
       */
      onSubmit(status) {
        let param = {
          afterSalesId: this.saleAfterId,
          status: status,
        }
        if (status == '2') {
          console.log('不通过')
          param.denyReason = this.denyReason
        } else if (status == '1') {
          console.log('通过')
        }

        // 秦瑜要求：售后单申请中状态，如果为整单退直接跳转到回录页
        if (status == '1' && this.aftersalesInfo.isAll == '1') {
          console.log('通过 并且是整单退')
          return this.goToPage()
        }

        console.log('isAll', this.aftersalesInfo.isAll)
        this.$aftersaleslib.updateAftersalesState(param, (err) => {
          if (err) {
            return this.$toast('修改状态失败:' + err)
          }
          this.$toast('修改状态成功')
          this.$router.go(-1)
        })
      },

      /**
       * 待退回 确认按钮
       * @return {[type]} [description]
       */
      onSubmit1() {
        // console.log('待退回 确认按钮')
        if (this.aftersalesInfo.returnType == '1') {
          console.log('到店退')
          // this.$router.push({name: '10.2.4.1', params: {id: this.saleAfterId, orderNo: this.aftersalesInfo.orderId, isAll: this.aftersalesInfo.isAll}})
          this.goToPage()
        }
      },

      /**
       * 确认退货
       */
      onConfirm() {
        console.log('确认退货，跳转到退货单回录')
        // this.$router.push({name: '10.2.4.1', params: {id: this.saleAfterId, orderNo: this.aftersalesInfo.orderId, isAll: this.aftersalesInfo.isAll}})
        this.goToPage()
      },

      /**
       * 跳转回录页
       * @return {[type]} [description]
       */
      goToPage() {
        // let maxRefunds = 0
        // this.aftersalesInfo.goodsList.map(goods => {
        //   maxRefunds += this.aftersalesInfo.count * goods.goodsPrice
        // })

        // console.log('最大退款金额：', maxRefunds)
        this.$router.push({
          name: '10.2.4.1',
          params: {
            // isAll: this.aftersalesInfo.isAll,
            // orderNo: this.aftersalesInfo.orderId,
            id: this.saleAfterId,
            maxRefunds: this.maxRefunds,
            accountNumber: this.aftersalesInfo.accountNumber
          },
          query: {
            isAll: this.aftersalesInfo.isAll,
            orderNo: this.aftersalesInfo.orderId,
          }
        })
      },

      onOrder() {
        console.log('点击订单')
        this.$router.push({name: '9.1.2', params: {orderNo: this.aftersalesInfo.orderId}})
      },

      /**
       * 点击中止受理
       * @return {[type]} [description]
       */
      onReject() {
        console.log('点击中止受理')
        this.$router.push({name: '10.2.1.1', params: {id: this.aftersalesInfo.saleAfterId}})
      },

      /**
       * 联系客户
       * @return {[type]} [description]
       */
      onCallCustomer() {
        console.log('联系客户1')
        if (this.$route.query.from == 'device') {
          // 如果是device打开的，直接back回聊天室
          this.$jsbridgelib.bridgeNativeBack();
        } else {
          console.log('下面开始发送售后单')
          let param = this.$aftersaleslib.generateAftersaleForIMRemote(this.aftersalesInfo)
          // param.receiver = 'BL' + this.aftersalesInfo.memberId
          console.log('onCallCustomer para', JSON.stringify(param))
          this.$jsbridgelib.bridgeIMSendAftersale(param, (err) => {
            if (err) {
              console.log('bridgeIMSendAfterSales err', err);
              return this.$toast(err);
            }
            console.log('发送售后单到聊天室')

            this.$jsbridgelib.bridgePushIM('BL' + this.aftersalesInfo.memberId, (err) => {
              if (err) {
                console.log('bridgePushIM err:', err);
                return this.$toast(err);
              }
              console.log('跳转到IM')
            })
          })
        }
      },

      // SkuName名称截取.
      getSkuName(skuName) {
        if (skuName != null) {
          let skuNameIndex = skuName.indexOf(",");
          if (skuNameIndex > 0) {
            let sname = skuName.split(',');
            return sname[0] + '  ' + sname[1];
          } else {
            return skuName;
          }
        }
      },
    },
    watch: {

    },
    computed: {
      /**
       * 申请类型
       * @return {[type]} [description]
       */
      typeStr() {
        if (this.aftersalesInfo.type == '0') {
          return '退货退款'
        } else {
          return '无'
        }
      },

      /**
       * 状态
       * @return {[type]} [description]
       */
      statusStr() {
        if (this.aftersalesInfo.status == '0') {
          return '申请中'
        } else if (this.aftersalesInfo.status == '1') {
          return '待退回'
        } else if (this.aftersalesInfo.status == '2') {
          return '中止受理'
        } else if (this.aftersalesInfo.status == '3') {
          return '退货中'
        } else if (this.aftersalesInfo.status == '4') {
          return '退款中'
        } else if (this.aftersalesInfo.status == '5') {
          return '已退款'
        } else {
          return '异常'
        }
      },

      /**
       * 退货理由
       * @return {[type]} [description]
       */
      reasonStr() {
        if (this.aftersalesInfo.reasonId == '01') {
          return '七天无理由退货'
        } else if (this.aftersalesInfo.reasonId == '02') {
          return '做工粗糙／有瑕疵'
        } else if (this.aftersalesInfo.reasonId == '03') {
          return '质量问题'
        } else if (this.aftersalesInfo.reasonId == '04') {
          return '大小／尺寸与商品描述不符'
        } else if (this.aftersalesInfo.reasonId == '05') {
          return '颜色／图案／款式与商品描述不符'
        } else if (this.aftersalesInfo.reasonId == '06') {
          return '材质与商品描述不符'
        } else if (this.aftersalesInfo.reasonId == '07') {
          return '少发／漏件'
        } else if (this.aftersalesInfo.reasonId == '08') {
          return '卖家发错货'
        } else if (this.aftersalesInfo.reasonId == '09') {
          return '包装／商品破损／污渍／裂痕／变形'
        } else if (this.aftersalesInfo.reasonId == '10') {
          return '假冒品牌'
        } else {
          return '无'
        }
      },

      /**
       * 退货方式
       * @return {[type]} [description]
       */
      returnTypeStr() {
        if (this.aftersalesInfo.returnType == '0') {
          return '物流退回'
        } else if (this.aftersalesInfo.returnType == '1') {
          return '到店退回'
        } else {
          return '无'
        }
      },

      /*titleString() {
        let titleString = ''
        // console.log('sss ------------', this.time)
        if (this.time.indexOf('已超时') < 0) {
          if (this.aftersalesInfo.status == '0') { // 申请中
            titleString = '您还有' + `${this.time}` + '处理客户的申请'
          } else if (this.aftersalesInfo.status == '2') {
            // titleString = '中止受理理由：人为损害，不予退回'
          } else if (this.aftersalesInfo.status == '1' && this.aftersalesInfo.returnType == '0') { // 待退回 物流退回
            titleString = '客户还有' + `${this.time}` + '联系快递寄回商品'
          } else if (this.aftersalesInfo.status == '1' && this.aftersalesInfo.returnType == '1') { // 待退回 到店退回
            titleString = '客户还有' + `${this.time}` + '到店退回商品'
          } else if (this.aftersalesInfo.status == '3') { // 退货中
            titleString = '您还有' + `${this.time}` + '确认退货或中止受理'
          }
        } else {
          if (this.aftersalesInfo.status == '0') { // 申请中
            titleString = '您' + `${this.time}` + '未处理客户的申请，请及时处理！'
          } else if (this.aftersalesInfo.status == '2') {
            // titleString = '中止受理理由：人为损害，不予退回'
          } else if (this.aftersalesInfo.status == '1' && this.aftersalesInfo.returnType == '0') { // 待退回 物流退回
            titleString = '客户' + `${this.time}` + '未快递退回商品，请联系用户及时处理！'
          } else if (this.aftersalesInfo.status == '1' && this.aftersalesInfo.returnType == '1') { // 待退回 到店退回
            titleString = '客户' + `${this.time}` + '未到店退回商品，请联系用户及时处理！'
          } else if (this.aftersalesInfo.status == '3') { // 退货中
            titleString = '您' + `${this.time}` + '未处理客户的退货，请及时处理！'
          }
        }

        return titleString
      },*/
      /**
       * 申请中 按钮
       * @return {[type]} [description]
       */
      intheapplication() {
        if (this.aftersalesInfo.isAll == 1) {
          return '确认申请'
        } else {
          return '通过申请'
        }
      },
    }

  };
</script>
