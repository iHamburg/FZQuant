<!--中止受理-->
<style lang="scss" src="src/sass/merSetting.scss" scoped></style>
<template>
  <div class="content">
    <bl-bar barStyle="bar-dark-linear">
        <div class="button" slot="left-button" @click="$router.go(-1)">
          <div class="iconfont arrow-back"><i class="fback">返回</i></div>
        </div>
        <div slot="title">中止受理</div>
    </bl-bar>

    <div class="merset">
      <bl-comli @click.native="popupVisible = !popupVisible">
        <div slot='left-text' class="left-box">中止理由</div>
        <div slot='right-text' class="right-box">
          <div class="right-l">
              <span>{{ denyReason }}</span>
          </div>
          <div class="iconfont arrow-back"></div>
        </div>
      </bl-comli>
    </div>

    <upload :maxpic='3' :paths='denyReasonUrl' :name='"上传照片凭证（选填）"' class="margin-b"  @clickImg='parentImg' @confirm='onGetGoodsImage' @deleteConfirm='deleteConfirm' :ratio="0">
    </upload>
    <div class="watch-pic" ref='big' @click='hidebig'>
      <div class="pic-box">
        <img :src="siglepath">
      </div>
    </div>

    <bl-popup v-model="popupVisible" position="bottom" style="width: 100%;" >
      <bl-picker ref="returnType" :slots="slots" :visible-item-count="3" show-toolbar @cancel="cancel" @getValues="getValues"></bl-picker>
    </bl-popup>
    <bl-popup v-model="otherVisible" position="bottom" style="width: 100%;" >
      <bl-cust-picker  show-toolbar @cancel="otherVisible = !otherVisible" @getValues="getotherValues" :toolbarSubText="otherTitle">
        <div slot="content" class="comments">
            <textarea name="text" maxlength="20" placeholder="请输入理由(上限20字)" ref="notes"></textarea>
        </div>
      </bl-cust-picker>
    </bl-popup>

    <div class="modal-bg" v-if="popupVisible || otherVisible" @click="close"></div>

    <div class="shopbtn">
      <bl-button :disabled="!disabled" @click="onSubmit">中止受理</bl-button>
    </div>

  </div>
</template>

<script>
import upload from 'components/bl-cloudstore-merchant/bl-cloudStore-image-uploader'
export default {
  name: 'rejectAfterSales',

  components: {
    upload,
    'BlCustPicker': () => System.import('components/cloud-merchant/cust-picker')
  },

  data () {
    return {
      popupVisible: false,
      otherVisible: false,
      endTitle: '请选择中止受理的理由',
      otherTitle: '其他理由',
      siglepath: '',
      // 理由选项
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
      saleAfterId: '',

      denyReason: '', // 选中的中止受理理由
      denyReasonUrl: [], // 图片
    };
  },

  mounted() {
    this.saleAfterId = this.$route.params.id;
    console.log('saleAfterId:', this.saleAfterId)
  },

  methods: {
    // 取消
    cancel() {
      this.popupVisible = false
    },

    close() {
      this.popupVisible = false
      this.otherVisible = false
    },

    // 选择理由
    getValues(val) {
      this.popupVisible = false
      let values = val[0];
      if (values == '其他理由') {
        this.otherVisible = true
      } else {
        console.log('不通过理由:', values)
        this.denyReason = values
      }
    },

    // 填写其他理由
    getotherValues() {
      let val = this.$refs.notes.value = this.$refs.notes.value.trim()
      console.log('其他理由：', val.length)
      if (val.length <= 0) {
        return this.$toast('请输入理由')
      }
      this.denyReason = val
      this.otherVisible = false
    },

    // 多图上传
    parentImg(index) {
      this.siglepath = this.denyReasonUrl[index];
      this.$refs.big.style.visibility = 'visible';
    },
    hidebig() {
      this.$refs.big.style.visibility = 'hidden';
    },

    //回调获取商品上传图片.
    onGetGoodsImage(data) {
      this.picindex = 0;
      this.denyReasonUrl.push(data.mediaCephUrl);
    },

    //图片回调删除方法:deleteConfirm data.index
    deleteConfirm(data) {
      this.denyReasonUrl.splice(data.index, 1);
    },

    // 确定
    onSubmit() {
      console.log('dianjiqueding ')

      let param = {
        afterSalesId: this.saleAfterId,
        status: 2,
        denyReason: this.denyReason,
        denyReasonUrl: this.denyReasonUrl
      }
      console.log('中止受理', JSON.stringify(param))

      this.$aftersaleslib.updateAftersalesState(param, (err) => {
        if (err) {
          return this.$toast('修改状态失败:' + err)
        }
        this.$toast('修改状态成功')
        this.$router.go(-1)
      })
    },
  },

  computed: {
    disabled () {
      return this.denyReason != ''
    }
  }
};
</script>
