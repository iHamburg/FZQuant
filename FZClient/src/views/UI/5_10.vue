<style lang="scss" src="src/sass/commodityAttribute.scss" scoped></style>
<template>
  <div>
    <div class="content">
      <bl-bar barStyle="bar-dark-linear">
          <div class="button" slot="left-button" @click="$router.go(-1)">
              <div class="iconfont arrow-back"></div><i class="fback">返回</i>
          </div>
          <div slot="title">商品上新</div>
      </bl-bar>
    </div>
    <bl-comli>
        <div slot='left-text' class="left-box">货号</div>
        <div slot='right-text' class="right-box">
          <div class="right-l">
            <input type="text" name="" placeholder="必填">
          </div>
          <div class="scan">
            <img src="../../assets/i/scan.png">
          </div>
        </div>
    </bl-comli>
    <bl-comli>
        <div slot='left-text' class="left-box">标准品名</div>
        <div slot='right-text' class="right-box">
          <div class="right-l">
            <input type="text" name="" placeholder="必填">
          </div>
        </div>
    </bl-comli>
    <bl-comli>
        <div slot='left-text' class="left-box">缩略品名</div>
        <div slot='right-text' class="right-box">
          <div class="right-l">
            <input type="text" name="" placeholder="必填">
          </div>
        </div>
    </bl-comli>
    <bl-comli>
        <div slot='left-text' class="left-box">分类</div>
        <div slot='right-text' class="right-box">
          <div class="right-l">
            <input type="text" name="" placeholder="选择商品分类" readonly="readonly">
          </div>
          <div class="iconfont arrow-back"></div>
        </div>
    </bl-comli>
    <bl-comli>
        <div slot='left-text' class="left-box">属性</div>
        <div slot='right-text' class="right-box">
          <div class="right-l">
            <input type="text" name="" placeholder="选择商品属性" readonly="readonly">
          </div>
          <div class="iconfont arrow-back"></div>
        </div>
    </bl-comli>
    <bl-comli>
        <div slot='left-text' class="left-box">大类码</div>
        <div slot='right-text' class="right-box">
          <div class="right-l">
            <input type="text" name="" placeholder="选择大类码" readonly="readonly">
          </div>
          <div class="iconfont arrow-back"></div>
        </div>
    </bl-comli>
    <bl-comli class="margin-b">
        <div slot='left-text' class="left-box">商品二维码</div>
        <div slot='right-text' class="btn-box">
          <button class="self-btn">查看二维码</button>
          <button class="self-btn">绑定</button>
        </div>
    </bl-comli>

    <bl-comli>
        <div slot='left-text' class="left-box">售价</div>
        <div slot='right-text' class="right-box">
          <div class="right-l">
            <input type="text" name="" placeholder="填写售价">
          </div>
        </div>
    </bl-comli>
    <bl-comli>
        <div slot='left-text' class="left-box">吊牌价格</div>
        <div slot='right-text' class="right-box">
          <div class="right-l">
            <input type="text" name="" placeholder="填写吊牌价格">
          </div>
        </div>
    </bl-comli>
    <bl-comli>
        <div slot='left-text' class="left-box">库存状态</div>
        <div slot='right-text' class="right-box">
          <div class="right-l">
            <input type="text" name="" placeholder="选择商品分类" readonly="readonly" value="有货">
          </div>
          <div class="iconfont arrow-back"></div>
        </div>
    </bl-comli>
    <bl-comli class="margin-b">
        <div slot='left-text' class="left-box">配送</div>
        <div slot='right-text' class="right-box">
          <div class="right-l">
            <input type="text" name="" placeholder="选择商品属性" readonly="readonly" value="自提">
          </div>
          <div class="iconfont arrow-back"></div>
        </div>
    </bl-comli>
    <upload :maxpic='10' :paths='paths' :name='"图片上传11"' class="margin-b"
     :remove="true" @clickImg='parentImg' :needmain='true' :mainpic='picindex'>
    </upload>
    <div class="watch-pic" ref='big' @click='hidebig'>
      <div class="pic-box">
        <img :src="siglepath">
      </div>
      <div class="set-main">
          设置为主图
      </div>
    </div>
    <bl-comli>
        <div slot='left-text' class="left-box">品牌</div>
        <div slot='right-text' class="right-box">
          <div class="right-l">
            <input type="text" name="" placeholder="选择品牌" readonly="readonly" >
          </div>
          <div class="iconfont arrow-back"></div>
        </div>
    </bl-comli>
    <bl-comli class="margin-b">
        <div slot='left-text' class="left-box">重量 (g)</div>
        <div slot='right-text' class="right-box">
          <div class="right-l">
            <input type="text" name="" placeholder="必填">
          </div>
        </div>
    </bl-comli>
    <div class="comit-btn">
       <bl-button v-if="btnshow">保存</bl-button>
       <bl-button disabled v-if="!btnshow">保存并提交审核</bl-button>
    </div>

  </div>
</template>
<script>
import upload from 'components/cloud-merchant/upload'
export default {

  name: 'goodinset',
  components: {
    upload
  },
  data() {
    return {
      picindex: -1,
      big: false,
      btnshow: true,
      siglepath: '',
      paths: [],
    };
  },
  methods: {
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

};
</script>
