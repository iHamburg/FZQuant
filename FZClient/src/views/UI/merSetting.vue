<template>
  <div class="content">

    <bl-bar barStyle="bar-dark-linear">
        <div class="button" slot="left-button" @click="$router.go(-1)">
          <div class="iconfont arrow-back"><i class="fback">返回</i></div>
        </div>
        <div slot="title">商户设置</div>
    </bl-bar>

    <div class="merset">
        <bl-comli>
            <div slot='left-text' class="left-box">商户logo</div>
            <div slot='right-text' class="right-box">
              <input type="file" name="upload" class="button-input" v-on:change="upload" ref="val">
              <div class="right-l">
                <div class="img-box" @click="popupVisible2 = true">
                    <img :src="paths">
                </div>
              </div>
              <div class="iconfont arrow-back"></div>
            </div>
        </bl-comli>

        <bl-comli class="moreli">
            <div slot='left-text' class="left-box">经营品牌</div>
              <div slot='right-text' class="right-box">
               <router-link to="/ui/listBrand">
                  <div class="right-l">
                      <div class="items">
                          <span v-for="data in brandList">{{ data.name }}</span>
                      </div>
                  </div>
                </router-link>
                <div class="iconfont arrow-back"></div>
              </div>

        </bl-comli>

        <bl-comli>
            <div slot='left-text' class="left-box">商户二维码</div>
            <div slot='right-text' class="right-box" @click="popupVisible = true">
              <div class="right-l">
                  <em class="qrcode"></em>
              </div>
              <div class="iconfont arrow-back"></div>
            </div>
        </bl-comli>
    </div>

    <!--遮罩-->
    <div class="modal-bg" v-if="popupVisible" @click="popupVisible = false">
      <span class="qimg">
        <qrcode :cls="qrCls" :value="qrText_elec" :size="280" :type="qrType" :padding="10"></qrcode>
      </span>
    </div>

    <div class="modal-bg" v-if="popupVisible2" @click="popupVisible2 = false">
      <span class="qimg">
        <img src="/static/images/p6_01.png">
      </span>
    </div>

  </div>
</template>

<script>
// import api from 'src/api/index'
import Qrcode from 'v-qrcode'
//  import xxx
export default {
  name: 'goodSales',

  components: {
    Qrcode
  },
  mounted() {

  },
  data () {
    return {
      qrText_elec: 'blcloudstore://cloudstore/page/ShopHomepage?shopCode=4a7693c804cc46dca757d4e22bdf783b',
      qrText_paper: null,
      qrCls: 'qrcode',
      qrLevel: 'Q',
      qrType: 'image',

      popupVisible: false,
      popupVisible2: false,
      paths: null,

      brandList: [
        {"name": "阿迪/耐克"},
        {"name": "阿迪/耐克"},
        {"name": "阿迪/耐克"},
        {"name": "阿迪/耐克"}
      ]

    }
  },
  methods: {
    upload(e) {
      console.log('上传图片')
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
    }

  }

}
</script>
