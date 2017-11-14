<template>
  <div id="index">
  	<h2>UI 页面索引 </h2>

    <p v-for="item in items" :id="item.id" @click="onClick(item.id)">{{item.title}}</p>

    <!-- <p><a href="/#/ui/homepageEntrance" target="_blank">2 商户首页 cloudStoreIndex</a></p>
        <p><a href="/#/ui/createGoods" target="_blank">5.1 新建商品 createGoods</a></p>
        <p><a href="/#/ui/goodsSKU" target="_blank">5.2 SKU属性管理 goodsSKU</a></p>
        <p><a href="/#/ui/goodsLarge" target="_blank">5.3 大类码选择 goodsLarge</a></p>
        <p><a href="/#/ui/goodsType" target="_blank">5.4 分类选择 goodsType</a></p>
        <p><a href="/#/ui/createGoods" target="_blank">5.5 编辑商品 editGoods</a></p>
        <p><a href="/#/ui/goods" target="_blank">5.6 显示商品详情 goods</a></p>
        <p><a href="/#/ui/goodsSales" target="_blank">5.7 商品库 goodsSales</a></p>
        <p><a href="/#/ui/goodsManage" target="_blank">5.8 商品管理 goodsManage</a></p>
        <p><a href="/#/ui/goodinset" target="_blank">5.10 商品sku库存 goodsSKUManage</a></p>
        <p><a href="/#/ui/goodsSource" target="_blank">5.11 商品产地 goodsSource</a></p>
    <p><a href="/#/ui/goodsQR" target="_blank">5.12 商品二维码 goodsQR</a></p>
    <p><a href="/#/ui/batchSubmitGoods" target="_blank">5.13 批量提审 batchSubmitGoods</a></p>
    <p><a href="/#/ui/batchAuditGoods" target="_blank">5.15 批量审核 batchAuditGoods</a></p>
    <p><a href="/#/ui/merSetting" target="_blank">商户设置 merSetting</a></p>
    <p><a href="/#/ui/listBrand" target="_blank">经营品牌 listBrand</a></p> -->

  </div>
</template>
<style lang="scss" scope>
#index{padding:1rem;
	h2{margin:0 0 .5rem;}
	p{padding:.1rem}
}

</style>
<script>
export default {

  name: 'index',

  data () {
    return {
      items: [
        {title: '2 商户首页 cloudStoreIndex', id: 'ui/homepageEntrance'},
        {title: '5.1 新建商品 createGoods', id: 'ui/5.10'},
        {title: '5.2 SKU属性管理 goodsSKU', id: 'ui/5.2'},

        {title: '5.7 商品库 goodsSales', id: 'ui/5.7'},
        {title: '5.8 商品管理 goodsManage', id: 'ui/5.8'},
        {title: '5.10 商品sku库存 goodsSKUManage', id: 'commodityAttribute'},
        {title: '5.15 批量审核 batchAuditGoods', id: 'ui/5.15'},
        {title: '2.1 商户设置 merSetting', id: 'ui/2.1'},
        {title: '2.1.1 经营品牌 listBrand', id: 'ui/2.1.1'},

        {title: '6 营销工具 marketingTool', id: 'ui/marketingTool'},
        {title: '6.3 已发布内容商品 marketing', id: 'ui/6.3'},
        {title: '6.3.1 上新广播 newcast', id: 'ui/6.3.1'},
        {title: '6.2 发放优惠券 issueCoupons', id: 'ui/6.2'},
        {title: '6.1 发布上新 newRelease', id: 'ui/6.1'},
        {title: '5.12 商品二维码 goodsQR', id: 'ui/5.12'},

        {title: '7.1.3 系统消息 sms', id: 'ui/7.1.3'},
        {title: '7.1 我的消息 mysms', id: 'ui/7.1'},
        {title: '7.3 代客下单 order', id: 'ui/7.3'},
        {title: '9.1 订单管理 orderment', id: 'ui/9.1'},
        {title: '9.1.2 订单详情 orderStatus', id: 'ui/9.1.2'},

        {title: '9.1.6 物流追踪 orderStatus', id: 'ui/9.1.6'},
        {title: '9.1.52 核销 writeOff', id: 'ui/9.1.52'},
        {title: '9.1.51 销码 pinCode', id: 'ui/9.1.51'},
        {title: '9.1.3 开单 billing', id: 'ui/9.1.3'},
        {title: '9.1.1 全部订单 allorders', id: 'ui/9.1.1'},

        {title: '4.1 审核授权 management', id: 'ui/4.1'},
        {title: '4.2 查询申请授权 queryAuth', id: 'ui/4.2'},
        {title: '4.4.1 待审核商户详情 audDetail', id: 'ui/4.4.1'},
        {title: '9.1.4 发货 sendgoods', id: 'ui/9.1.4'},
        {title: '6.4 创建活动 createActivity', id: 'ui/6.4'},
        {title: '6.4.1 活动内容 actContent', id: 'ui/6.4.1'},
        {title: '6.5 活动详情 actDetail', id: 'ui/6.5'},
        {title: '10.2.4.1 退货单回录 returnGoods', id: 'ui/10.2.4.1'},
        {title: '10.1 售后申请 serviceOrder', id: 'ui/10.1'},
        {title: '2.1.5 设置常用属性 commonAttributes', id: 'ui/2.1.5'},
        {title: '12 排班表 dutyRoster', id: 'ui/1'},

        {title: '6.8 设置广告轮播图 dragSlide', id: 'ui/6.8'},
        {title: '6.9 设置广告轮播图 setupSlide', id: 'ui/6.9'},

        {title: '12.1 促销活动模板 tplPromotion', id: 'ui/12.1'},
        {title: '12.2 促销活动详情 salesPromotion', id: 'ui/12.2'},
        {title: '12.3 创建促销活动 editPromotion', id: 'ui/12.3'},
        {title: '12.4 促销活动列表 listPromotion', id: 'ui/12.4'},
        {title: '12.5 绑定活动商品 boundGoods', id: 'ui/12.5'},

        {title: '46.5 核销明细 check', id: 'ui/46.5'},
        {title: '46.8 发券二维码 check_QRcode', id: 'ui/46.8'},
        {title: '46.13 购买停车券 parking', id: 'ui/46.13'},
        {title: '46.14 购买停车券 parking1', id: 'ui/46.14'},

        {title: '46.1 核销流水 offflow', id: 'ui/46.1'},
        {title: '46.2 核销记录 parkingRecord', id: 'ui/46.2'},
        {title: '46.3 发券列表 parkingList', id: 'ui/46.3'},
        {title: '46.6 订单详情 parkingOrder', id: 'ui/46.6'},
        {title: '46.7 券订单 parkingCouponorder', id: 'ui/46.7'},
        {title: '46.9 购买停车券 parkingBuy', id: 'ui/46.9'},

        {title: '46.10 券列表 couponList', id: 'ui/46.10'},
        {title: '46.11 创建优惠券 createCoupon', id: 'ui/46.11'},

        {title: '3 搜索 searchPage', id: 'ui/3'},
        {title: '6 章程 rules', id: 'ui/6'},
        {title: '7.3.1 代客下单订单 addorder', id: 'ui/7.3.1'},

        {title: '0 登录 userLogin', id: 'ui/0'},
        {title: '0.1 快速登录 sendsms', id: 'ui/0.1'},
        {title: '0.2 忘记密码 forgetPass', id: 'ui/0.2'},
        {title: '0.3 快速注册 register', id: 'ui/0.3'},
        {title: '0.4 完善商户信息 shopinfo', id: 'ui/0.4'},
        {title: '0.5 信息正在审核中 toExamine', id: 'ui/0.5'},

        {title: '8 我的联系人 contacts', id: 'ui/8'},
        {title: '8.1 详细资料 contactsPeople', id: 'ui/8.1'},
        {title: '8.2 分组好友 groupFriend', id: 'ui/8.2'},
        {title: '8.3 分组排序 groupSort', id: 'ui/8.3'},
      ],

    };
  },
  methods: {
    onClick(id) {
      this.$router.push({name: id});
    }
  }
};
</script>
