<template>
  <div id="index">
    <h2>header5</h2>
    <mt-header title="Form">
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
    <button @click="middlePopupVisible = !middlePopupVisible" class="mint-button mint-button--default mint-button--large"><!----> <label
      class="mint-button-text">点击弹出 中部Popup</label></button>

    <mt-actionsheet
      :actions="actions"
      v-model="sheetVisible">
    </mt-actionsheet>
    <mt-popup
      v-model="middlePopupVisible"
      position="right"
      modal=false

      popup-transition="popup-fade">
      <h2>l;fajsdlfkj</h2>
    </mt-popup>


  </div>
</template>

<script>


  import { Toast,Indicator,MessageBox,Actionsheet,Popup } from 'mint-ui';
export default {

  name: 'index',

  data () {
    return {
      sheetVisible : false,
      actions:[{name:'confirm',method:function () {
        console.log('onConfirm');
      }}],

      middlePopupVisible:false,
    };
  },
  methods: {
//    onToast () {
//      console.log('onToast');
//      Toast({
//        message: 'Upload Complete',
//        position: 'bottom',
//        iconClass: 'icon icon-success',
//        duration: 5000
//      });
//    },
//    onIndicator () {
//      Indicator.open({
//        text: 'Loading...',
//        spinnerType: 'fading-circle'
//      });
//      setTimeout(() => {
//        Indicator.close();
//      }, 2000);
//    },
//    onMessageBox(){
//      MessageBox({
//        title: 'Notice',
//        message: 'Are you sure?',
//        showCancelButton: true
//      }).then(action => {
//          console.log('confirm');
//      });
//    },
//    onActionsheet(){
//
//    },
//    onConfirm(){
//      console.log('onConfirm');
//    }
  },

};
</script>
