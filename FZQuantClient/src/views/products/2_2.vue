<template>
  <div class="container">


    <br>
    <div v-show="product.id">
      <h3>{{product.title}}</h3>
      <p>编号: {{product.id}}</p>
      <img :src="product.imgUrl" height="100" />
    </div>

    <form class="form-horizontal well">

      <div class='form-group'>
        <label class="control-label ">名称 Title <span class="text-danger"> * </span></label>
        <input type="text" name="title"  class="form-control"  v-model="product.title" />
      </div>
      <div class="form-group col-sm-6">
        <label class="control-label">商家 *</label>
        <input type="text" class="form-control" v-model.lazy="product.shopTitle" />
      </div>
      <div class="row">
        <div class="form-group col-sm-3">
          <label class="control-label" for="selCategory">类型</label>
          <select name="categoryId" id="selCategory" v-model="product.categoryId">

            <option v-for="item in categories" :value="item.id">{{item.title}}</option>

          </select>
        </div>
        <div class="form-group col-sm-3">
          <label class="control-label" for="selCountry">国家</label>
          <select name="countryId" id="selCountry" v-model="product.countryId">
            <option v-for="item in countrys" :value="item.id">{{item.title}}</option>
          </select>
        </div>
        <div class="form-group col-sm-3">
          <label class="control-label">货币 {{currencySel.currency}}</label>
          <select id="selCurrency" v-model="currencySel">
            <option :value="{ currency: 6.87,title:'美元' }">美元</option>
            <option :value="{ currency: 7.37,title:'欧元' }">欧元</option>
            <option :value="{ currency: 0.061,title:'日币' }">日币</option>
            <option :value="{ currency: 5.18,title:'澳币' }">澳币</option>
            <option :value="{ currency: 4.94,title:'新西兰元' }">新西兰元</option>
            <option :value="{ currency: 1,title:'人民币' }">人民币</option>
          </select>
        </div>
        <div class="form-group col-sm-3">
          <label class="control-label">平台</label>
          <select v-model="product.mallId">
            <option v-for="mall in malls" :value="mall.id">
              {{ mall.title }}
            </option>
          </select>
        </div>
      </div>

      <div class="row">
        <div class="form-group col-sm-3">
          <label class="control-label">邮寄方式</label>
          <select name="countryId" id="selShipping" v-model="product.shipping">
            <option value="0">直邮</option>
            <option value="1">转运</option>
          </select>
        </div>
        <div class="form-group col-sm-3">
          <label class="control-label">退换货政策</label>
          <select id="selReturn" v-model="product.returnPolicy">
            <option value="-1">不退换</option>
            <option value="0">不确定</option>
            <option value="7">7天</option>
            <option value="10">10天</option>
            <option value="14">14天</option>
            <option value="15">15天</option>
            <option value="30">30天</option>
          </select>
        </div>

        <div class="form-group col-sm-3">
          <label class="control-label">重量单位 {{weightUnit}}</label>
          <select  v-model="weightUnit">
            <option >克</option>
            <option >磅</option>
            <option >盎司</option>
          </select>
        </div>
      </div>

      <div class='form-group row'>
        <div class="col-sm-6">
          <label class="control-label">商品描述 desc<span class="text-danger"> * </span></label>
          <textarea  name="desc"  class="form-control"  rows="10" v-model="product.desc"></textarea>

        </div>

        <div  class="col-sm-6">
          <label class="control-label">温馨提示 discount</label>
          <textarea  name="discount"  class="form-control"  rows="10" v-model="product.discount"></textarea>
        </div>
        <div class="col-sm-6">
          <label class="control-label">预计到中国的时间（天数）：</label>
          <input type="text"  class="form-control" v-model="product.deliveryDays" placeholder="7-12个工作日"/>
        </div>
        <div class="col-sm-6">
          <label class="control-label">商品标签（使用场景描述，用#号隔开）</label>
          <input type="text"  class="form-control" v-model="product.tags" />
        </div>
      </div>

      <div class="form-group row">

        <div class="col-sm-4">
          <label class="control-label">售价价格({{currencySel.title}}) * = RMB: {{product.sellPrice/100}} </label>
          <input type="number" class="form-control" v-model.lazy="sellPrice_for" />
        </div>
        <div class="col-sm-4">
          <label class="control-label">优惠价({{currencySel.title}}) = RMB: {{product.promotionPrice/100}} </label>
          <input type="number"   class="form-control" v-model.lazy="promotionPrice_for"  />
        </div>

        <div class="row" v-if="product.shipping == 0">

          <div class="col-sm-6">
            <label class="control-label">直邮运费({{currencySel.title}})  = RMB: {{product.deliveryPrice/100}} </label>
            <input type="number" name="deliveryCharge"  class="form-control"
                   v-model.lazy="deliveryPrice_for" />
          </div>
          <div class="col-sm-6">
            <label class="control-label">直邮税费({{currencySel.title}}) = RMB: {{product.taxPrice/100}} </label>
            <input type="number" name="taxCharge"  class="form-control"  v-model.lazy="taxPrice_for" />
          </div>
        </div>
        <div class="row" v-else>

          <div class="col-sm-6">
            <label class="control-label">转运境外运费({{currencySel.title}}) = RMB: {{product.aboardDeliveryPrice/100}} </label>
            <input type="number" name="shipCharge"  class="form-control" v-model.lazy="aboardDeliveryPrice_for" />
          </div>
          <div class="col-sm-6">
            <label class="control-label">发货重量（shipping weight): {{weight}}{{weightUnit}} -
              {{product.weight}}克
              国内运费:{{deliveryPrice_rmb/100 | fix2f}}元</label>
            <input type="number"  class="form-control" v-model.lazy="weight" />

          </div>
        </div>
        <div class="col-sm-12">
          <label class="control-label">总额 RMB（Price x 1.1 ＋运税费）：{{totalPrice | fix2f}}元</label>
        </div>
      </div>
      <div class="form-group row">
        <hr/>
        <div class="col-sm-6">
          <label class="control-label">商品在实际商户的url(amazon) *<span class="text-danger"> * </span></label>
          <input type="text" name="shop_url"  class="form-control" v-model="product.shop_url" />
        </div>
        <div class="col-sm-6">
          <label for="source_url" class="control-label">平台地址(什么值得买)</label>
          <input type="text" id="source_url" name="source_url"  class="form-control" v-model="product.source_url" />
        </div>
        <div class="form-group col-sm-6">
          <label class="control-label">商品视频地址</label>
          <input name="videoUrl"  class="form-control" v-model="product.videoUrl"/>
        </div>
        <div class="col-sm-12">
          <label class="control-label">商品图片列表，用逗号分开 *</label>

          <textarea  name="img_urls"  class="form-control"  rows="2" v-model="product.img_urls"></textarea>
        </div>

        <div class="col-sm-12">
          <label class="control-label">商品注释, 只在管理平台看的到</label>

          <textarea  name="memo"  class="form-control"  rows="2" v-model="product.memo"></textarea>
        </div>
      </div>

      <div class="form-group checkbox">
        <label class="col-sm-2">
          <input type="checkbox" name="status" id="status" v-model="product.status">
          发布
        </label>
        <label class="col-sm-2">
          <input type="checkbox" name="is_expired" id="is_expired" v-model="product.is_expired">
          售罄
        </label>
        <label class="col-sm-2">
          <input type="checkbox" name="is_top" id="is_top" v-model="product.is_top">
          置顶
        </label>
      </div>

      <br>

      <div class="form-group ">
        <div v-if="product.id">
          <input type="submit" name="" value="更新" class="btn btn-primary"
                 @click.stop.prevent="onUpdate" />
          <button class="btn btn-danger" @click.prevent="onDelete">删除</button>
        </div>
        <input v-else type="submit" name="" value="新建" class="btn btn-primary" @click.prevent="onCreate" />

      </div>
    </form>

  </div>
</div>
</template>
<script>

export default {
  name: 'keepProduct',

  data () {
    return {
      searchTerm: null,
      searchAPI: '/adminapi/products/',

      apiUrl: '/adminapi/products/',
      backUrl: '/admin/products/',
      product: {
        categoryId: 0,
        countryId: 0,
        shipping: 0,
        returnPolicy: 0,
        title: '',
        marketPrice: 0,
        sellPrice: 0,
        promotionPrice: 0,
        taxPrice: 0,
        aboardDeliveryPrice: 0,
        deliveryPrice: 0,
        status: 'active',
        mallId: 0, //一定要初始化!!
      },

      currencySel: { //外币汇率, 默认是人民币
        currency: 1,
        title: '人民币',
      },
      weight: 0,
      weightUnit: '克',
      countrys: [],
      malls: [],
      categories: [],

    }
  },

  created() {
    console.log('created');

    this.fetchCategories();
    this.fetchCountrys();
    this.fetchMalls();
  },
  activated() {
    console.log(this.title, 'activated');
    let id = this.$route.params.id;

    if (id) {
      this.fetchData(id);
    } else {
      this.toast('没有商品id')
    }
  },
  methods: {
    validate: function () {
      let product = this.product;
      if (!product.shopTitle || !product.shop_url || !product.img_urls) {
        return false;
      }
      return true;
    },

    /**
     * 获取产品数据
     * @param id
     */
    fetchData(id) {
      this.$productlib.query(id, (err, obj) => {
        if (err) { return alert(err) }
        this.product = obj;
      })
    },
    /**
     * 获取所有分类
     */
    fetchCategories() {
      this.$utillib.queryCategorys((err, rows) => {
        if (err) { return alert(err) }
        this.categories = rows
      })
    },

    /**
     * 获取所有国家
     */
    fetchCountrys() {
      this.$utillib.queryCountrys((err, rows) => {
        if (err) { return alert(err) }
        this.countrys = rows
      })
    },
    /**
     * 获取所有商城
     */
    fetchMalls() {
      this.$utillib.queryMalls((err, rows) => {
        if (err) { return alert(err) }
        this.malls = rows
      })
    },

    /**
     * 新建商品
     */
    onCreate: function () {
      if (!this.validate()) { return this.toast('参数没有填全'); }

      this.$productlib.create(this.product, err => {
        if (err) {
          return this.toast(err)
        }
        this.toast('操作成功')
      })
    },

    /**
     * 更新商品
     */
    onUpdate: function () {
      if (!window.confirm('确定要更新商品?')) { return }

      if (!this.validate()) { return alert('参数没有填全'); }

      this.$productlib.update(this.product.id, this.product, err => {
        if (err) {
          return this.toast(err)
        }
        this.toast('操作成功')
      })
    },
    /**
     * 删除商品
     */
    onDelete: function () {
      if (!window.confirm('确定要删除商品?')) { return }

      this.$productlib.remove(this.product.id, err => {
        if (err) {
          return this.toast(err)
        }
        this.toast('操作成功')
      })
    },

    /**
     * 根据汇率转换price成国外货币
     * @param int price
     * @returns double
     */
    toForeignPrice: function (price) {
      return parseFloat(price / 100 / this.currency).toFixed(2);
    },
  },

  computed: {
    title() {
      return this.$route.meta.title
    },
    currency: function () {  // 汇率
      return this.currencySel.currency;
    },

    sellPrice_for: { //外币
      get: function () {
        return this.toForeignPrice(this.product.sellPrice);
      },
      set: function (newVal) {
        this.product.sellPrice = parseInt(newVal * this.currency * 100);
      }
    },
    promotionPrice_for: { //外币
      get: function () {
        return this.toForeignPrice(this.product.promotionPrice);
      },
      set: function (newVal) {
        this.product.promotionPrice = parseInt(newVal * this.currency * 100);
      }
    },
    taxPrice_for: { //外币
      get: function () {
        return this.toForeignPrice(this.product.taxPrice);
      },
      set: function (newVal) {
        this.product.taxPrice = parseInt(newVal * this.currency * 100);
      }
    },
    aboardDeliveryPrice_for: { //外币
      get: function () {
        return this.toForeignPrice(this.product.aboardDeliveryPrice);
      },
      set: function (newVal) {
        this.product.aboardDeliveryPrice = parseInt(newVal * this.currency * 100);
      }
    },
    deliveryPrice_for: { //外币

      get: function () {
        return this.toForeignPrice(this.product.deliveryPrice);
      },
      set: function (newVal, oldVal) {
        this.product.deliveryPrice = parseInt(newVal * this.currency * 100);
      }
    },
    deliveryPrice_rmb: { //RMB, 分为单位

      get: function () {
        let price = 4900;
        let w = this.product.weight;
        if (w > 500) {
          price += (w - 500) * 6.9;
        }

        price *= 1.1;

        return price;
      },
    },

    totalPrice: function () {
      let p1 = this.product.promotionPrice ? this.product.promotionPrice : this.product.sellPrice;
      p1 *= 1.1; //商品价格 * 1。1

      let p2 = 0;
      if (this.product.shipping == 0) { // 直邮
        p2 = this.product.taxPrice + this.product.deliveryPrice;
      } else { // 转运
        p2 = this.product.aboardDeliveryPrice + this.deliveryPrice_rmb;
      }

      return ((p1 + p2) / 100);
    },

  },
  filters: {
    fix2f: function (value) {
      return parseFloat(value).toFixed(2);
    },
  },
  watch: {

    weight: function (newVal) { // 修改product.weight
      console.log('weight # ', newVal);

      if (this.weightUnit == '克') {
        this.product.weight = newVal;
      } else if (this.weightUnit == '磅') {
        this.product.weight = newVal * 454;
      } else if (this.weightUnit == '盎司') {
        this.product.weight = newVal * 28;
      }
    }
  },
};
</script>
