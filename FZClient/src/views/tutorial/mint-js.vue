<template>
  <div id="index">

    <mt-header title="Mint-UI js">
      <router-link to="/" slot="left">
        <mt-button icon="back">back</mt-button>
      </router-link>
      <mt-button icon="more" slot="right"></mt-button>
    </mt-header>
    <br>
    <button @click="onToast" class="mint-button mint-button--default mint-button--large"><!----> <label
      class="mint-button-text">点击弹出
      Toast</label></button>
    <br>
    <button @click="onIndicator" class="mint-button mint-button--default mint-button--large"><!----> <label
      class="mint-button-text">点击弹出 Indicator</label></button>
    <br>
    <button @click="onMessageBox" class="mint-button mint-button--default mint-button--large"><!----> <label
      class="mint-button-text">点击弹出 Message Box</label></button>
    <br>
    <button @click="sheetVisible = !sheetVisible" class="mint-button mint-button--default mint-button--large"><!----> <label
      class="mint-button-text">点击弹出 Actionsheet</label></button>
    <br>
    <button @click="middlePopupVisible = !middlePopupVisible" class="mint-button mint-button--default mint-button--large">
      <label class="mint-button-text">点击弹出 中部Popup</label>
    </button>
    <br>
    <button @click="popupVisible = !popupVisible" class="mint-button mint-button--default mint-button--large">
      <label class="mint-button-text">底部弹出picker2</label>
    </button>
    <br>
    <button @click="pickerVisible = !pickerVisible" class="mint-button mint-button--default mint-button--large">
      <label class="mint-button-text">底部弹出Datetime picker</label>
    </button>
    <br>

    <!-- 隐藏组件 -->
    <mt-popup v-model="popupVisible" position="bottom" style="width: 100%;">
      <BlCustPicker show-toolbar @cancel="onCancel" @done="onDone" :toolbarSubText="toolbarSubText">
        <mt-picker ref="myPicker" :slots="slots2" slot="content"></mt-picker>
      </BlCustPicker>
    </mt-popup>

    <mt-actionsheet
      :actions="actions"
      v-model="sheetVisible">
    </mt-actionsheet>

    <mt-popup
      v-model="middlePopupVisible"
      position="right"
      modal=false
      popup-transition="popup-fade">
      <h2>asdfsdf</h2>
    </mt-popup>

    <mt-datetime-picker
      v-model="pickerVisible"
      @confirm="handleConfirm">
    </mt-datetime-picker>
  </div>
</template>

<script>

  import { Toast, Indicator, MessageBox, Actionsheet, Popup, Picker, DatetimePicker } from 'mint-ui';

  export default {

    name: 'index',
    components: {
      'BlCustPicker': () => System.import('components/cloud-merchant/cust-picker'),
    },

    data () {
      return {
        toolbarSubText: '标题',
        pickerVisible: false,
        popupVisible: false,
        sheetVisible: false,
        actions: [{ name: 'confirm',
          method: function () {
            console.log('onConfirm');
          }
        }],

        middlePopupVisible: false,
        slots: [
          {
            flex: 1,
            values: ['2015-01', '2015-02', '2015-03', '2015-04', '2015-05', '2015-06'],
            className: 'slot1',
            textAlign: 'right'
          }, {
            divider: true,
            content: '-',
            className: 'slot2'
          }, {
            flex: 1,
            values: ['2015-01', '2015-02', '2015-03', '2015-04', '2015-05', '2015-06'],
            className: 'slot3',
            textAlign: 'left'
          }
        ],
        slots2: [{
          values: ['2015-01', '2015-02', '2015-03', '2015-04', '2015-05', '2015-06'],
        }]

      };
    },
    methods: {
      onCancel(flag) {
        if (flag == 'picker') { // picker
          this.popupVisible = false
        } else { // cancel all
          this.popupVisible = false
        }
      },
      onDone() {
        //        this.popupVisible = false
        console.log('picker 0', this.$refs.myPicker.getValues(0)[0]);
      },
      handleConfirm() {
        console.log('confirm');
      },
      onToast () {
        Toast({
          message: 'Upload Complete',
          position: 'bottom',
          iconClass: 'icon icon-success',
          duration: 2000
        });
      },
      onIndicator () {
        Indicator.open({
          text: 'Loading...',
          spinnerType: 'fading-circle'
        });
        setTimeout(() => {
          Indicator.close();
        }, 2000);
      },
      onMessageBox() {
        MessageBox({
          title: 'Notice',
          message: 'Are you sure?',
          showCancelButton: true
        }).then(action => {
          console.log('confirm');
        });
      },
      onActionsheet() {

      },
      onConfirm() {
        console.log('onConfirm');
      },
    },

};
</script>
