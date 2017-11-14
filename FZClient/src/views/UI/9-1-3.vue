<template>
  <div class="content">

    <bl-bar barStyle="bar-dark-linear">
        <div class="button" slot="left-button" @click="$router.go(-1)">
          <div class="iconfont arrow-back"><i class="fback">返回</i></div>
        </div>
        <div slot="title">开单</div>
    </bl-bar>

    <div class="billing">

      <bl-comli>
          <div slot='left-text' class="left-box">订单金额</div>
          <div slot='right-text' class="right-box">
            <div class="right-r red"> &yen;1756.00</div>
          </div>
      </bl-comli>

      <div class="order-product" v-if="!isallProduct">
          <div class="probox" v-for="(item, index) in orderData.product" v-if="index < 2">
              <span class="picture"><img :src="item.image"></span>
              <dl>
                <dt>{{ item.name }}</dt>
                <dd>
                    <span class="pl">{{ item.size }}码  {{ item.color }} x{{ item.number }} </span>
                    <span class="pr">&yen;{{ item.price }}</span>
                </dd>
              </dl>
          </div>
      </div>
      <div class="order-product" v-else>
          <div class="probox" v-for="(item, index) in orderData.product">
              <span class="picture"><img :src="item.image"></span>
              <dl>
                <dt>{{ item.name }}</dt>
                <dd>
                    <span class="pl">{{ item.size }}码  {{ item.color }} x{{ item.number }} </span>
                    <span class="pr">&yen;{{ item.price }}</span>
                </dd>
              </dl>
          </div>
      </div>
      <bl-comli>
          <div slot='left-text' class="left-box showall">更多商品（{{acountNum}}）</div>
          <div slot='right-text' class="right-box" @click="isallProduct = !isallProduct">
            <div class="right-r"></div>
            <div class="iconfont arrow-back" :class="{'arrow-up':isallProduct}"></div>
          </div>
      </bl-comli>

      <upload :maxpic='1' :paths='paths' :name='"请上传小票图片"' class="margin-b"
       :remove="true" @clickImg='parentImg' :needmain='false' :mainpic='picindex'>
      </upload>
      <div class="watch-pic" ref='big' @click='hidebig'>
        <div class="pic-box">
          <img :src="siglepath">
        </div>
      </div>

      <bl-comli class="otop">
          <div slot='left-text' class="left-box">销售单号</div>
          <div slot='right-text' class="right-box">
            <div class="right-l"> <input type="text" placeholder="必填"> </div>
            <i class="shao"></i>
          </div>
      </bl-comli>
      <p class="tips">请确保销售单内商品和金额与订单保持一致，且单号准确无误！</p>

      <div class="editgress sureoff">
          <bl-button>确认开单</bl-button>
      </div>

    </div>
  </div>

</template>

<script>
// import api from 'src/api/index'
import upload from 'components/cloud-merchant/upload'
export default {
  name: 'billing',
  components: {
    upload
  },
  mounted() {
    this.acountNum = this.orderData.product.length;
  },

  data () {
    return {
      isallProduct: false,
      acountNum: '',
      picindex: -1,
      siglepath: '',
      paths: [],
      // 订单
      orderData: {

        status: '待提货',
        orderCode: '123908129038',
        saleCode: '123908129',

        product: [
          {'image': 'static/images/y_02.png', 'name': '商品激励冲击波商品激励冲击波商品激励冲击波商品激励冲击波', 'size': 's', 'color': '白色', 'price': '500', 'number': '1'},
          {'image': 'static/images/y_02.png', 'name': '商品激励冲击波商品激励冲击波商品激励冲击波商品激励冲击波', 'size': 's', 'color': '白色', 'price': '500', 'number': '2'},
          {'image': 'static/images/y_02.png', 'name': '商品激励冲击波商品激励冲击波商品激励冲击波商品激励冲击波', 'size': 's', 'color': '白色', 'price': '500', 'number': '2'},
          {'image': 'static/images/y_02.png', 'name': '商品激励冲击波商品激励冲击波商品激励冲击波商品激励冲击波', 'size': 's', 'color': '白色', 'price': '500', 'number': '2'},
          {'image': 'static/images/y_02.png', 'name': '商品激励冲击波商品激励冲击波商品激励冲击波商品激励冲击波', 'size': 's', 'color': '白色', 'price': '500', 'number': '2'}
        ],
      }
    }
  },
  computed: {
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
  }
}
</script>
