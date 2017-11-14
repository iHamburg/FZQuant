<style lang="scss" src="src/sass/issueCoupons.scss" scoped></style>
<style lang="scss" src="src/sass/order.scss" scoped></style>
<template>
  <div class="content">

    <bl-bar barStyle="bar-dark-linear">

      <div class="button" slot="left-button" @click="$router.go(-1)">
        <div class="iconfont arrow-back"></div>
      </div>
      <div slot="title">添加商品</div>
    </bl-bar>
    <div class="issue-box notop">
      <bl-check-box class="check-content"  v-for="(item, index) in goodsList">

        <div slot="check-box" class="checkbox">
          <div class="check-card check-pic">
            <div class="picture">
            <img :src="item.goodsImg">
            </div>
            <dl>
              <dt>{{ item.goodsName }}</dt>
              <dd>货号：{{ item.freightNo }}</dd>
              <dd>吊牌价：&yen;{{ item.tagPrice}}</dd>
              <dd>售价：&yen;{{ item.price }} </dd>
            </dl>
            <button class="orderbtn" @click="buteList(item, index)">加入</button>
          </div>
          
        </div>
      </bl-check-box>
    </div>

    <!--
    <div class="botbtn">
      <bl-button :disabled="!submitEnable" @click="onSubmit()">确定添加<span v-if="submitEnable">（{{this.checkedCount}}）</span></bl-button>
    </div>
    -->

    <div class="botbtn">
      <bl-button >返回代客下单</bl-button>
    </div>

    <!-- 属性弹出 -->
    <bl-popup v-model="popupBute" position="bottom" style="width: 100%;" class="butebox">
        <div class="butetop">
            <em><img :src="itemBute.goodsImg"></em>
            <div class="title">{{ itemBute.goodsName }}</div>
            <span><bdi>&yen;</bdi>{{ itemBute.price }}<bdi>.00</bdi></span>
            <del @click="cancelBute"></del>
        </div>
        <div class="scroll">
            <div class="butelist">
                <p>颜色</p>
                <section>
                    <span v-for="(color, key) in itemBute.color" :class="{select : color.select}" @click="checkColor(color.name, key)">{{ color.name }}</span>
                </section>
            </div>
            <div class="butelist">
                <p>尺码</p>
                <section>
                    <span v-for="(size, key) in itemBute.size" :class="{select : size.select}" @click="checkSize(size.name, key)">{{ size.name }}</span>
                </section>
            </div>
            <div class="butecount">
                <span>数量</span>
                <div class="count">
                    <em class="reduce" @click="reduce">-</em>
                    <input type="tel" v-model="itemBute.count" ref="init" @keyup="integer">
                    <em class="add" @click="add">+</em>
                </div>
            </div>
        </div>
        <bl-button @click="subBute(itemBute.key)">确认选择</bl-button>
    </bl-popup>
    <div v-if="popupBute" @click="popupBute = !popupBute"><div class="modal-bg"></div></div>
    

  </div>

</template>

<script>

  import goodslib from 'src/libs/goodslib';
  import orderlib from 'src/libs/orderlib';
  import uiMixin from 'src/mixins/uiMixin';
  import jsbridge from 'src/mixins/jsbridge';
  export default {
    name: 'goods',
    mixins: [uiMixin, jsbridge],
    components: {
      'BlCheckBox': () => System.import('components/cloud-merchant/check-box')
    },
    data () {
      return {
        release: '发布上新',
        isCheck: true,
        isAllCheck: false,
        popupBute: false,
        itemBute: {
          'key': '',
          'goodsName': '',
          'goodsImg': '',
          'price': '',
          'tagPrice': '',
          'color': [],
          'size': [],
          'count': '1',
          'freightNo': ''
        },
        goodsList: [
          {
            "goodsImg": "static/images/p6_01.png",
            "goodsName": "商品名称商品名称商品名称商品名称AS商品名称商品名称商品名称商品名称AS",
            "freightNo": "09812093",
            "tagPrice": "500.00",
            price: '400.00',
            "count": "3",
            "color": [
                {'name': '白色', 'select': 0},
                {'name': '黑金色', 'select': 0},
                {'name': '黄色', 'select': 0},
                {'name': '白色', 'select': 0},
                {'name': '黑金色', 'select': 0},
                {'name': '黄色', 'select': 0},
                {'name': '黑色', 'select': 0}
            ],
            "size": [
                {'name': '20cm*49cm*50cm', 'select': 1},
                {'name': '2', 'select': 0}
            ],
            del: false
          },
          {
            "goodsImg": "static/images/p6_02.png",
            "goodsName": "2商品名称商品名称商品名称商品名称AS商品名称商品名称商品名称商品名称AS",
            "freightNo": "09812093",
            "tagPrice": "8000.00",
            price: '40020.00',
            "count": "6",
            "color": [
                {'name': '白色', 'select': 0},
                {'name': '黑金色', 'select': 1},
                {'name': '黄色', 'select': 0},
                {'name': '黑色', 'select': 0}
            ],
            "size": [
                {'name': '20cm*49cm*50cm', 'select': 1},
                {'name': '1', 'select': 0}
            ],
            del: false
          }
        ],
        queryParam: {
          merchantId: '',
          goodsState: 2,
          sortord: 1,
          pageSize: 9999
        },

      }
    },
    computed: {
      /**
       * 根据选中的数量，计算出是否能点击提交按钮
       * @return {boolean}
       */
      submitEnable() {
        return this.checkedCount > 0;
      },

      /**
       * 根据goodsList中state的状态，计算出选中的数量
       * @return {*|number}
       */
      checkedCount() {
        let count = this.$_.countBy(this.goodsList, function(item) {
          return item.state == "check";
        }).true || 0;
        return count;
      }
    },

    mounted() {
/*      this.startLoading();
      goodslib.queryGoodsList(this.queryParam, (err, items) => {
        this.stopLoading();
        if (err) {
          return this.$toast(err);
        }

        items.forEach(item => (item.state = " "));
        // console.log('query goodsList ', items);
        this.goodsList = items;
      });*/
    },

    methods: {
      buteList(item, key) {
        this.popupBute = !this.popupBute
        this.itemBute.key = key
        this.itemBute.freightNo = item.freightNo
        this.itemBute.goodsName = item.goodsName
        this.itemBute.goodsImg = item.goodsImg
        this.itemBute.price = item.price
        this.itemBute.color = item.color
        this.itemBute.size = item.size
        this.itemBute.count = item.count
      },
      cancelBute() {
        this.popupBute = false;
      },
      checkColor(color, key) {
        for (let i = 0, len = this.itemBute.color.length; i < len; i += 1) {
          this.itemBute.color[i].select = 0
        }
        this.itemBute.color[key].select = 1
        // (this.itemBute.color[key].select === 0) ? (this.itemBute.color[key].select = 1) : (this.itemBute.color[key].select = 0)
      },
      checkSize(size, key) {
        for (let i = 0, len = this.itemBute.size.length; i < len; i += 1) {
          this.itemBute.size[i].select = 0
        }
        this.itemBute.size[key].select = 1
      },
      subBute(key) {
        // this.data[key] = this.itemBute
        // this.data[key].number = this.itemBute.number
        // this.data[key].title = this.itemBute.title
        // this.data[key].url = this.itemBute.url
        // this.data[key].price = this.itemBute.price
        // this.data[key].color = this.itemBute.color
        // this.data[key].size = this.itemBute.size
        // this.data[key].count = this.itemBute.count
        this.popupBute = false
        this.$toast('成功')
      },
      add() {
        this.itemBute.count ++
      },
      reduce() {
        if (this.itemBute.count > 1) {
          this.itemBute.count --
        } else {
          this.isDel = true
        }
      },
      integer() {
        let initVal = this.$refs.init.value
        this.itemBute.count = initVal.replace(/[^\d]/g, '')
      },
      onSubmit() { // 发送商品链接
        // 获得 check的商品列表
        let itemList = this.$_.filter(this.goodsList, (item) => { return item.state == 'check' });
//        console.log('before addgoods to local item list ', itemList);
//        orderlib.addGoodsListToLocalOrder(itemList, (err) => {
//          if (err) console.log(err)
//          this.$router.go(-1)
//        })

        // orderlib.addGoodsListToLocalOrder(itemList)
        orderlib.addGoodsGroupListToLocalOrder(itemList)
        // orderlib.addGoodsListToLocalOrder(itemList)
        this.$router.go(-1)
      },

      chooseAttr(index, item) { // 选中
        let state = item.state;
        if (state == "check") {
          item.state = ""
        } else {
          if (this.checkedCount >= 6) {
            this.$toast('发送商品最多只能选择6件商品')
          } else {
            item.state = "check"
          }
        }
      },
    }

  }
</script>
