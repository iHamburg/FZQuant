<style lang="scss" src="src/sass/serviceOrder.scss" scoped></style>
<template>
  <div class="content">

    <bl-bar barStyle="bar-dark-linear">
        <div class="button" slot="left-button" @click="$router.go(-1)">
          <div class="iconfont arrow-back"><i class="fback">返回</i></div>
        </div>
        <div slot="title">售后申请</div>
    </bl-bar>

    <div class="service">
        <dfn>申请的退货商品</dfn>

        <bl-comli class="number">
            <div slot='left-text' class="left-box">订单编号</div>
              <div slot='right-text' class="right-box">
                <div class="right-r">{{ orderNumber }}</div>
              </div>
        </bl-comli>


        <div class="item">
            <dl>
              <dt class="left-box"><img :src="itemOrder.picture"></dt>
              <dd class="name">{{ itemOrder.name }}</dd>
              <dd class="info">
                  <span v-for="item in itemOrder.item">{{ item.param }}</span>
              </dd>
            </dl>
        </div>
        <bl-comli class="look">
            <div slot='left-text' class="left-box">查看订单</div>
            <div slot='right-text' class="right-box">
                <div class="right-r"></div>
                <div class="iconfont arrow-back"></div>
            </div>
        </bl-comli>

        <bl-comli class="service-top">
            <div slot='left-text' class="left-box">申请类型</div>
            <div slot='right-text' class="right-box" @click="popupVisible = !popupVisible">
                <div class="right-r">{{ orderType }}</div>
                <div class="iconfont arrow-back"></div>
            </div>
        </bl-comli>
        <bl-comli>
            <div slot='left-text' class="left-box">退货原因</div>
            <div slot='right-text' class="right-box" @click="popupVisible2 = !popupVisible2">
                <div class="right-r">{{ orderCause }}</div>
                <div class="iconfont arrow-back"></div>
            </div>
        </bl-comli>
        <bl-comli>
            <div slot='left-text' class="left-box">退货方式</div>
            <div slot='right-text' class="right-box" @click="popupVisible3 = !popupVisible3">
                <div class="right-r"><div class="ellipsis">{{ orderMode }}</div></div>
                <div class="iconfont arrow-back"></div>
            </div>
        </bl-comli>
        <bl-comli class="service-init">
            <div slot='left-text' class="left-box">退货数量</div>
            <div slot='right-text' class="right-box">
                <div class="right-r">
                    <span class="init">
                      <i @click="reduce">-</i>
                      <input type="number" v-model="itemCount">
                      <i @click="add">+</i>
                    </span>
                </div>
            </div>
        </bl-comli>

        <bl-comli class="service-top">
            <div slot='left-text' class="left-box">问题描述</div>
            <div slot='right-text' class="right-box" @click="coupons = !coupons">
                <div class="right-r">请输入描述</div>
                <div class="iconfont arrow-back"></div>
            </div>
        </bl-comli>
        <upload :maxpic='3' :paths='paths' :name='"图片上传"' class="margin-b"
         :remove="true" @clickImg='parentImg' :mainpic='picindex'>
        </upload>
        <div class="watch-pic" ref='big' @click='hidebig'>
          <div class="pic-box">
            <img :src="siglepath">
          </div>
        </div>

        <bl-comli class="service-top">
            <div slot='left-text' class="left-box">店员备注</div>
            <div slot='right-text' class="right-box" @click="popupVisible4 = !popupVisible4">
                <div class="right-r"><button class="add">添加</button></div>
            </div>
        </bl-comli>
        <div class="service-note">
          <dl v-for="item in comments">
            <dt>{{ item.name }} <span class="time">{{ item.time }}</span></dt>
            <dd>{{ item.content }}</dd>
          </dl>
        </div>


    </div>
    <div class="bootedit">
        <bl-button :disabled="!disabled">申请售后</bl-button>
    </div>

    <bl-popup v-model="popupVisible" position="bottom" style="width: 100%;" >
      <bl-picker ref="returnType" :slots="slots" :visible-item-count="3" show-toolbar @cancel="cancel" @getValues="getValues"></bl-picker>
    </bl-popup>

    <bl-popup v-model="popupVisible2" position="bottom" style="width: 100%;" >
      <bl-picker ref="returnType2" :slots="slots2" :visible-item-count="3" show-toolbar @cancel="cancel2" @getValues="getValues2"></bl-picker>
    </bl-popup>

    <bl-popup v-model="popupVisible3" position="bottom" style="width: 100%;" >
      <bl-picker ref="returnType3" :slots="slots3" :visible-item-count="3" show-toolbar @cancel="cancel3" @getValues="getValues3"></bl-picker>
    </bl-popup>

    <bl-popup v-model="popupVisible4" position="bottom" style="width: 100%;" >
        <bl-cust-picker  show-toolbar @cancel="popupVisible4 = !popupVisible4" @getValues="getValues4" :toolbarSubText="notesTitle">
          <div slot="content" class="comments">
              <textarea name="text" ref="notes"></textarea>
          </div>
        </bl-cust-picker>
    </bl-popup>

    <!--遮罩-->
    <div class="modal-bg" v-if="picVisible" @click="picVisible = false">
      <span class="qimg">
        <img :src="imgPath">
      </span>
    </div>
    <div class="modal-bg" v-if="popupVisible || popupVisible2 || popupVisible3 || popupVisible4" @click="close"></div>

  </div>
</template>

<script>
import upload from 'components/cloud-merchant/upload'
export default {
  name: 'serviceOrder',
  components: {
    upload,
    'BlCustPicker': () => System.import('components/cloud-merchant/cust-picker')
  },
  mounted() {

  },
  data () {
    return {
      orderNumber: '357906456578899',
      itemCount: 1,
      picVisible: false,
      popupVisible: false,
      popupVisible2: false,
      popupVisible3: false,
      popupVisible4: false,
      bgVisible: false,
      orderType: '请选择退货类型',
      itemOrder: {
        name: '商品名称商品名称商品名称商品名称商品名称商品名称商品名称商品名称商品名称商品名称商品名称商品名称',
        picture: 'static/images/p6_04.png',
        item: [{'param': 'S 码'}, {'param': '白色'}, {'param': 'x1'}]
      },
      slots: [
        {
          flex: 1,
          values: ['退款', '退货退款', '退货'],
          className: 'slot1',
          textAlign: 'center'
        }
      ],
      orderCause: '请选择退货原因',
      slots2: [
        {
          flex: 1,
          values: ['七天无理由退货', '做工粗糙/有瑕疵', '质量问题'],
          className: 'slot1',
          textAlign: 'center'
        }
      ],
      orderMode: '请选择退货方式',
      slots3: [
        {
          flex: 1,
          values: ['到店退货', '物流寄回', '爱退不退'],
          className: 'slot1',
          textAlign: 'center'
        }
      ],
      siglepath: '',
      picindex: -1,
      paths: [],
      notesTitle: '添加备注',
      comments: [
        {'name': '苏小妹', 'time': '2015.09.14 01:02:21', 'content': '由各种物质组成的巨型球状天体，叫做星球。星球有一定的形状，有自己的运行轨道。'},
        {'name': '苏小妹', 'time': '2015.09.14 01:02:21', 'content': '由各种物质组成的巨型球状天体，叫做星球。星球有一定的形状，有自己的运行轨道。'}
      ]
    }
  },
  methods: {
    add() {
      this.itemCount ++
    },
    reduce() {
      if (this.itemCount > 1) {
        this.itemCount --
      }
    },
    cancel() {
      this.popupVisible = false
    },
    getValues(val) {
      this.orderType = val[0];
      this.popupVisible = false
    },
    cancel2() {
      this.popupVisible2 = false
    },
    getValues2(val) {
      this.popupVisible2 = false
      this.orderCause = val[0];
    },
    cancel3() {
      this.popupVisible3 = false
    },
    getValues3(val) {
      this.orderMode = val[0];
      this.popupVisible3 = false
    },
    getValues4() {
      let val = this.$refs.notes.value
      this.popupVisible4 = false
    },
    close() {
      this.popupVisible = false
      this.popupVisible2 = false
      this.popupVisible3 = false
      this.popupVisible4 = false
    },
    parentImg(index) {
      console.log('上传图片')
      this.siglepath = this.paths[index];
      this.picindex = index;
      this.$refs.big.style.visibility = 'visible';
    },
    hidebig() {
      this.$refs.big.style.visibility = 'hidden';
    }
  },
  computed: {
    disabled () {
      return this.orderType != '请选择退货类型' && this.orderCause != '请选择退货原因' && this.orderMode != '请选择退货方式'
    }
  }
}
</script>

