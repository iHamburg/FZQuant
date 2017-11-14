<template>
  <div class="content">
    <bl-bar barStyle="bar-dark-linear">
        <div class="button" slot="left-button" @click="$router.go(-1)">
          <div class="iconfont arrow-back"><i class="fback">返回</i></div>
        </div>
        <div slot="title">过渡效果2</div>
    </bl-bar>

      <button @click="show = !show">
          Toggle
      </button>
      <transition name="fade">
          <p v-if="show">hello</p>
      </transition>
 </div>

</template>
<style lang="scss">
    /*.fade-enter-active, .fade-leave-active {*/
        /*transition: opacity .5s*/
    /*}*/
    /*.fade-enter, .fade-leave-active {*/
        /*opacity: 0*/
    /*}*/
</style>
<script>
// import api from 'src/api/index'
import networklib from 'src/libs/networklib';
// import merchantlib from 'src/libs/merchantlib';
import uiMixin from 'src/mixins/uiMixin';

//  import xxx
export default {
  name: 'merSetting',
  mixins: [uiMixin],
  components: {
  },
  mounted() {

  },
  data () {
    return {
      popupVisible: false,
      paths: null,
      items: {
        logoUrl: null,
        qrcode: null
      },
      brandListData: [],
      brandIdData: [],
      queryParam: {
        merchantId: null
      },
      show: true
    }
  },
  methods: {
    upload(e) {
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
    },

    gotoBrandList() {
      this.$router.replace({name: '2.1.1', query: {brandIds: this.brandIdData}});
    },

    /**
     * 查询商户设置 1023
     * @param callback
     */
    queryMerchantSettings(callback) {
      console.log('查询商户设置的 queryParam：', this.queryParam.merchantId)
      let apiId = '1023';
      let self = this;
      networklib.post(apiId, self.queryParam).then(obj => {
//        console.log('成功的回调', self.queryParam);
        self.items = obj;
        let arrslist = obj.brandList;
        let brandListData = JSON.parse(arrslist);
        console.log('brandListData:', brandListData)
        let brandIdData = []; //品牌idList
        // let brandNamedData = []; //品牌nameList
        brandListData.forEach(function(brandData) {
          brandIdData.push(brandData.brandId);
          // brandNamedData.push(brandData.brandName);
        })

        console.log('brandIdData', brandIdData);
        // console.log('brandNamedData',brandNamedData);

        self.stopLoading();
        // set logoUrl, brands, qrcode
      }).catch(err => {
        console.log('失败的回调', apiId, err);
        self.stopLoading();
      })
    },

  }

}
</script>
