
import {Indicator} from 'mint-ui'

// console.log('========= init ui mixin===========');

export default {
  created() {
    // console.log('uimixin created');
  },
  activated() {
    // console.log('uimixin activated');
  },
  methods: {
    startLoading() {
      // console.log('start loading');

    //先关闭上一个菊花，再开始新的一个
    //   if(toastd) toastd.close();
    //   toastd = this.$toast({
    //     iconClass: 'preloader white',
    //     message: '加载中...',
    //     duration: 'loading'
    //   });
    //   Indicator.open();
    //   Indicator.open({
    //     text: '加载中...',
    //     spinnerType: 'fading-circle'
    //   });

      Indicator.open();
    },
    stopLoading() {
      // console.log('stop loading', Indicator);
      Indicator.close();
    },

    // startDataLoading(){
    //   //先关闭上一个菊花，再开始新的一个
    //   if(toastd) toastd.close();
    //
    //   toastd = this.$toast({
    //     iconClass: 'preloader white',
    //     message: '数据处理中...',
    //     duration: 'loading'
    //   });
    // },
    // stopDataLoading(){
    //   if(toastd) toastd.close();
    //
    // }

  }
};
