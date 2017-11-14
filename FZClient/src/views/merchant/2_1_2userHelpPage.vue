<template>
  <div class="content-rule">

    <bl-bar barStyle="bar-dark-linear">

      <div class="button" slot="left-button" @click="$router.go(-1)">
        <div class="iconfont arrow-back"><i class="fback">返回</i></div>
      </div>
      <div slot="title">即市商户端使用说明</div>
    </bl-bar>

    <ul class="rule">
      <li class="supLi" v-for="(item, index) in data" @click="open(item, index)">
         <span>{{ item.name }}</span>
         <i class="iconfont arrow-back" :class="{'open':item.open}"></i>
         <ul class="rule-box" v-if="item.open">
           <li class="subLi" v-for="(item1, index1) in item.child" @click.stop="clickedItem(item1)">
             <div>{{ item1.title }}</div>
           </li>
         </ul>
      </li>
    </ul>

  </div>

</template>

<script>
export default {
  name: 'keepHelpPage',
  components: {
  },
  mounted() {

  },

  data () {
    return {
      data: [
        {name: '登陆', open: false, child: [{title: '登陆', images: ['Page_05']}]},
        {name: '1、商品上新', open: false, child: [{title: '1.1、首页入口', images: ['Page_06']}, {title: '1.2、扫描商品吊牌', images: ['Page_07']}, {title: '1.3、“商品上新”内容录入', images: ['Page_08']}]},
        {name: '2、商品管理', open: false, child: [{title: '2.1、首页入口', images: ['Page_09']}, {title: '2.2、商品列表', images: ['Page_10']}, {title: '2.3.、商品信息提交审核', images: ['Page_11']}, {title: '2.4、审核并上架商品', images: ['Page_12', 'Page_13']}, {title: '2.5、编辑商品', images: ['Page_14', 'Page_15', 'Page_16']}, {title: '2.6、下架商品', images: ['Page_17']}, {title: '2.7、恢复商品上架', images: ['Page_18']}]},
        {name: '3、订单管理', open: false, child: [{title: '3.1 首页入口', images: ['Page_19', 'Page_20']}, {title: '3.2 各状态订单入口', images: ['Page_21']}, {title: '3.3 全部订单列表', images: ['Page_22']}, {title: '3.4 待支付订单列表', images: ['Page_23']}, {title: '3.5 待开单订单列表', images: ['Page_24']}, {title: '3.6 开单', images: ['Page_25']}, {title: '3.7 待发货订单', images: ['Page_26', 'Page_27']}, {title: '3.8 待提货订单列表', images: ['Page_28', 'Page_29']}, {title: '3.9 待收货订单', images: ['Page_30']}, {title: '3.10 已完成订单列表', images: ['Page_31', 'Page_32']}, {title: '3.11 已关闭订单列表', images: ['Page_33']}]},
        {name: '4、客户服务', open: false, child: [{title: '4.1、在线客服', images: ['Page_34', 'Page_35']}, {title: '4.2、代客下单', images: ['Page_36', 'Page_37']}, {title: '4.3、客诉', images: ['Page_38']}, {title: '4.4、售后管理', images: ['Page_39', 'Page_40', 'Page_41', 'Page_42', 'Page_43']}]},
        {name: '5、营销工具（部分）', open: false, child: [{title: '5.1 发布上新', images: ['Page_44', 'Page_45']}, {title: '5.2、礼品券', images: ['Page_46', 'Page_47', 'Page_48']}, {title: '5.3、创建/发布活动', images: ['Page_49', 'Page_50', 'Page_51', 'Page_52']}]},
        {name: '6、促销管理', open: false, child: [{title: '6.1、创建促销活动', images: ['Page_53', 'Page_54', 'Page_55', 'Page_56', 'Page_57']}, {title: '6.2、查看管理促销活动', images: ['Page_58', 'Page_59', 'Page_60', 'Page_61', 'Page_62']}, {title: '6.3、商品活动黑名单', images: ['Page_63', 'Page_64']}]},
        {name: '7、店员管理', open: false, child: [{title: '7.1、考勤-排班表', images: ['Page_65', 'Page_66', 'Page_67']}]},
        {name: '8、品牌入场&退场', open: false, child: [{title: '8.1、品牌入场', images: ['Page_68']}]}
      ]
    }
  },
  computed: {
  },
  methods: {
    open(item, index) {
      let state = this.data[index].open
      if (this.data[index].open == true) {
        this.data[index].open = false
      } else {
        this.data[index].open = true
      }
    },
    clickedItem (item) {
      this.$router.push({name: '2.1.2.1', params: {'title': item.title, 'images': item.images}})
      console.log('-----', item.images);
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "src/sass/tobe/function";
  .content-rule{
      padding-top: rem(88);
      .fback{
          @include i-fback()
      }
      /*.bar.bar-dark-linear{*/
        /*background-color: #FCFCFC;*/
        /*border-bottom: 1px solid #d9d9d9;*/
      /*}*/
      /*.arrow-back{*/
        /*color: #000;*/
      /*}*/


      .rule{
        background-color: #fff;
        padding: 0 rem(30);
        li{
          clear: both;
          color: #333;
          overflow: hidden;
          line-height: rem(88);
          span{
            float: left;
            font-size: rem(32);
            font-weight:500;
          }
          div {
            border-bottom: 1px solid #E7E7E7;
            font-weight:300;
            font-size: rem(30);
          }
        }
        .subLi {
          padding-left: rem(20);
        }
        .subLi:last-child {
          div {
            border-bottom: 1px solid #fff;
          }
        }
        .subLi:first-child {
          border-top: 1px solid #E7E7E7;
        }
        .supLi{
          border-bottom: 1px solid #E7E7E7;
        }

        .arrow-back{
          color: #aaa;
          float: right;
          line-height: rem(88);
          transform: rotate(270deg);
        }
        .open{
          transform: rotate(90deg);
        }
      }
      .rule-box{
        li:last-child{
          border:0;
        }
      }

  }
</style>
