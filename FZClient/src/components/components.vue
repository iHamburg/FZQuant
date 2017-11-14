<template>
<div class="demo">
  <bl-scroll :enableRefresh="true" :onRefresh="onRefresh" :on-infinite="onInfinite" :enableInfinite="isLoading">
    <div class="components" style="padding: 10px 20px;">
      <h2>js components</h2>
      <div class="toast-box">
        <h3>toast</h3>
        <bl-button type="other" size="middle" @click="toast">toast</bl-button>
        <bl-button type="other" size="middle" @click="toastLoading">toastLoading</bl-button>
        <!-- <toast :message="'hello'"></toast> -->
      </div>
      <div class="modal-box">
        <h3>modal</h3>
        <bl-button type="other" size="middle" @click="modal">modal</bl-button>
      </div>
      <br>
      <bl-slide effect="left">
        <bl-slide-item className="half">
          <a href="javascript:;"><img _src="http://placeholder.qiniudn.com/750x375" alt=""></a>
        </bl-slide-item>
        <bl-slide-item className="half">
          <a href="javascript:;"><img _src="http://placeholder.qiniudn.com/750x375" alt=""></a>
        </bl-slide-item>
      </bl-slide>
      <div class="bl-actionsheet-box">
        <h3>bl-actionsheet</h3>
        <bl-button type="other" size="middle" @click="sheetVisible = true">带取消按钮的actionsheet</bl-button>
        <bl-button type="other" size="middle" @click="sheetVisible2 = true">不带取消按钮的actionsheet</bl-button>
      </div>
      <div class="bl-popup-box">
        <h3>bl-popup</h3>
        <bl-button type="other" size="middle" @click="popupVisible1 = !popupVisible1">bl-pupup</bl-button>
      </div>
      <div class="bl-picker-box">
        <h3>bl-picker</h3>
        <bl-button type="other" size="middle" @click="confirm">bl-picker</bl-button>
      </div>

      <div class="bl-datetime-picker-box">
        <h3>bl-datetime-picker</h3>
        <bl-button type="other" size="middle" @click="openPicker">bl-datetime-picker</bl-button>
      </div>
      <div class="bl-address-picker-box">
        <h3>bl-address-picker</h3>
        <bl-button type="other" size="middle" @click="popupVisibleAddressPicker = !popupVisibleAddressPicker">bl-address-picker</bl-button>
      </div>
      <h2>css components</h2>
      <div class="button-box">
        <h3>button</h3>
        <div class="btn-box">
          <bl-button>主要按钮</bl-button>
          <bl-button disabled size="middle">主要按钮</bl-button>
          <bl-button type="secondary" size="small">次要按钮</bl-button>
          <bl-button type="other" size="small" @click="modal">其他按钮</bl-button>
          <br />
          <br />
          <bl-button type="primary" inline size="small" ref="pupupButton">主要按钮</bl-button>
          <bl-button inline size="small" disabled>禁用按钮</bl-button>
          <bl-button type="secondary" inline size="small">次要按钮</bl-button>
          <bl-button type="other" inline size="small">其他按钮</bl-button>
        </div>
      </div>
      <div class="swicth-box">
        <h3>switch</h3>
        <bl-switch v-model="values" type="pink"></bl-switch>{{ values }}
      </div>
      <div class="navbar-box">
        <h3>navbar</h3>
        <bl-navbar v-model="selected">
          <bl-tab-item id="1">已分配</bl-tab-item>
          <bl-tab-item id="2">可分配</bl-tab-item>
          <bl-tab-item id="3">已失效</bl-tab-item>
        </bl-navbar>
        <bl-tab-container :swipeable="true" v-model="selected">
          <bl-tab-container-item id="1">
            <!-- <bl-coupon-card></bl-coupon-card> -->
          </bl-tab-container-item>
          <bl-tab-container-item id="2">
            <div class="no-coupon">
              <div class="coupon-img flex-c-m">
                <img src="../assets/i/coupon-img.png" />
              </div>
              <div class="no-text">暂无优惠券</div>
            </div>
          </bl-tab-container-item>
          <bl-tab-container-item id="3">
          </bl-tab-container-item>
        </bl-tab-container>
      </div>

    </div>
  </bl-scroll>

  <bl-actionsheet :actions="actions" v-model="sheetVisible" @thisValue="val => a = val"></bl-actionsheet>
  <bl-actionsheet :actions="actions" v-model="sheetVisible2" cancelText=""></bl-actionsheet>

  <bl-popup v-model="popupVisible1" position="bottom" class="mint-popup-4" style="width: 100%;" :modal="true">
    <h1>popup</h1>
    <p>/ ˈpɑpˌʌp /</p>
    <p>n. 弹出式; [棒]内野飞球; 自动起跳式装置</p>
    <p>adj. 弹起的; 有自动起跳装置的</p>
  </bl-popup>

  <bl-popup v-model="popupVisible2" position="bottom" class="mint-popup-4" style="width: 100%;" ref="poplayer" @closeconfirm="closed">
    <bl-picker :slots="slots" @change="onValuesChange" show-toolbar>
      <div class="toolbar-head">
        <span class="bl-datetime-action bl-datetime-cancel" @click="popupVisible2 = false">{{ cancelText }}</span>
        <span class="bl-datetime-action bl-datetime-confirm" @click="closed">{{ confirmText }}</span>
      </div>
    </bl-picker>
  </bl-popup>

  <bl-datetime-picker
    ref="picker"
    type="date"
    year-format="{value}年"
    month-format="{value}月"
    date-format="{value}日"
    v-model="pickerValue">
  </bl-datetime-picker>

  <bl-popup v-model="popupVisibleAddressPicker" position="bottom" style="width: 100%;">
    <bl-picker ref="addressPicker" :slots="addressSlots" @change="onAddressChange" :visible-item-count="5"></bl-picker>
  </bl-popup>

  <bl-modal :buttons="buttons" >
    <div slot="inner">确定要解绑百联卡吗？<br />百联卡余额可用于支付订单</div>
  </bl-modal>

</div>
</template>
<script>
import address from "../../static/address.json"
export default {

  name: 'components',

  components: {
    'BlCouponCard': () => System.import('components/cloud-merchant/coupon-card')
  },

  data() {
    return {
      cancelText: '取消',
      confirmText: '确定',
      a: 0,
      buttons: [{
        text: '取消',
        onClick: () => {
          this.$toast('取消')
        }
      }, {
        text: '确定',
        onClick: () => {
          this.$toast('确定')
        }
      }],
      values: false,
      actions: [{
        name: '1'
      }, {
        name: '2'
      }],
      sheetVisible: false,
      sheetVisible2: false,

      buttonBottom: 0,
      popupVisible1: false,
      popupVisible2: false,
      popupVisible3: false,

      popupVisibleAddressPicker: false,
      isLoading: true,
      pickerValue: 0,
      selected: '1',
      slots: [{
        flex: 1,
        values: ['2015-01', '2015-02', '2015-03', '2015-04', '2015-05', '2015-06'],
        className: 'slot1',
        textAlign: 'center'
      }, {
        divider: true,
        content: '-',
        className: 'slot2'
      }, {
        flex: 1,
        values: ['2015-01', '2015-02', '2015-03', '2015-04', '2015-05', '2015-06'],
        className: 'slot3',
        textAlign: 'center'
      }],
      addressSlots: [
        {
          flex: 1,
          values: Object.keys(address),
          className: 'slot1',
          textAlign: 'center'
        }, {
          divider: true,
          content: '-',
          className: 'slot2'
        }, {
          flex: 1,
          values: ['北京', '地球'],
          className: 'slot3',
          textAlign: 'center'
        }
      ],
      addressProvince: '北京',
      addressCity: '北京'
    };
  },
  methods: {

    confirm() {
      this.popupVisible2 = true;
      // this.$emit('confirm', this.currentValue);
      this.$refs.poplayer.open();
    },

    closed() {
      this.popupVisible2 = false;
      this.$refs.poplayer.close();
    },
    returnData(param) {
      console.log(param);
    },

    toast() {
      this.$toast({
        position: 'bottom',
        message: 'hello'
      })
    },
    toastLoading() {
      let toastd = this.$toast({
        iconClass: 'preloader white',
        message: '加载中',
        duration: 'loading'
      })
      setTimeout(() => toastd.close(), 3000)
    },
    modal() {
      this.$modal({
        title: '提示',
        content: '操作成功'
      })
    },
    onchange(val) {
      this.sheetVisible = val
    },
    onValuesChange(picker, values) {
      if (values[0] > values[1]) {
        picker.setSlotValue(1, values[0]);
      }
    },
    openPicker() {
      this.$refs.picker.open();
    },
    openPoplayer() {
      this.$refs.poplayer.open();
    },
    onAddressChange(picker, values) {
      console.log('onAddressChange ', values);
      // 联动应在组件内
      picker.setSlotValues(1, address[values[0]]);
      this.addressProvince = values[0];
      this.addressCity = values[1];
    },
    onRefresh (done) {
      console.log('refresh')
      setTimeout(() => {
        done();
      }, 2000)
    },
    onInfinite (done) {
      console.log('infinite')
      setTimeout(() => {
        this.isLoading = false
      }, 2000)
    }
  },
  mounted() {
    this.buttonBottom = this.$refs.pupupButton.$el.getBoundingClientRect().bottom;
  },
  watch: {
    pickerValue: function (newVal) {
      console.log('pickerValue newValue ', newVal);
    }
  }
};
</script>
<style lang="scss">
.components h3 {
  text-align: center;
  padding: 10px;
  color: #801e2f;
}

.components h2 {
  margin: 20px auto;
  text-align: center;
}

.components {
  .bl-button {
    margin-top: 10px;
  }
}

.components .btn-box {
  .bl-button {
    margin-top: 10px;
  }
}

.mint-popup-1 {
  width: 200px;
  border-radius: 8px;
  padding: 10px;
  transform: translate(-50%, 0);
  h1 {
    font-size: 20px;
    color: #26a2ff;
  }
  p {
    margin-bottom: 10px;
  }
}


</style>
